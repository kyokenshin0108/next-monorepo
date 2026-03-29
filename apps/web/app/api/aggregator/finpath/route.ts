/**
 * GET /api/aggregator/finpath
 *
 * Scrapes analysis reports from Finpath.vn using Puppeteer and upserts
 * them into the market_analysis table.
 *
 * ⚠️  Vercel deployment: this route requires puppeteer-core +
 *     @sparticuz/chromium. For local/Node use, plain puppeteer works.
 *
 * Returns: { success, fetched, new, duplicates }
 */

import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

export const runtime = "nodejs"
export const maxDuration = 60

// ── helpers ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 120)
}

function makeHash(parts: string[]): string {
  return createHash("sha256").update(parts.join("|")).digest("hex").slice(0, 32)
}

function mapRecommendation(raw: string): string {
  const normalized = raw.trim().toUpperCase()
  if (normalized.includes("MUA") || normalized === "BUY") return "BUY"
  if (normalized.includes("BÁN") || normalized.includes("BAN") || normalized === "SELL") return "SELL"
  if (normalized.includes("TRUNG LẬP") || normalized.includes("TRUNG LAP") || normalized === "HOLD") return "HOLD"
  return normalized || "HOLD"
}

function mapSentiment(rec: string): string {
  if (rec === "BUY") return "bullish"
  if (rec === "SELL") return "bearish"
  return "neutral"
}

function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.,]/g, "").replace(",", ".")
  const val = parseFloat(cleaned)
  return isNaN(val) ? null : val
}

function parseUpside(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.,-]/g, "").replace(",", ".")
  const val = parseFloat(cleaned)
  return isNaN(val) ? null : val
}

function parseDate(raw: string): string {
  // Finpath uses dd/mm/yyyy or dd-mm-yyyy
  const match = raw.trim().match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (match) {
    const d = match[1] ?? "01"
    const m = match[2] ?? "01"
    const y = match[3] ?? "2026"
    return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T08:00:00+07:00`).toISOString()
  }
  const fallback = new Date(raw.trim())
  return isNaN(fallback.getTime()) ? new Date().toISOString() : fallback.toISOString()
}

// ── scraper ────────────────────────────────────────────────────────────────

interface ScrapedReport {
  ticker: string
  published_at: string
  title: string
  source_name: string
  recommendation: string
  target_price: number | null
  upside_percent: number | null
  source_url: string
}

async function scrapeFinpath(): Promise<ScrapedReport[]> {
  // Dynamic import so the module is only loaded at runtime (not at build time)
  const puppeteer = await import("puppeteer")
  const browser = await puppeteer.default.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  })

  const TARGET = "https://finpath.vn/y-tuong?tab=bao-cao-phan-tich"
  const reports: ScrapedReport[] = []

  try {
    const page = await browser.newPage()
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    await page.setViewport({ width: 1280, height: 900 })

    // Block images/fonts to speed up load
    await page.setRequestInterception(true)
    page.on("request", (req) => {
      const type = req.resourceType()
      if (["image", "font", "media", "stylesheet"].includes(type)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.goto(TARGET, { waitUntil: "networkidle2", timeout: 30_000 })

    // Wait for the table body (try several possible selectors)
    const tableSelector = await Promise.race([
      page.waitForSelector("table tbody tr", { timeout: 10_000 }).then(() => "table tbody tr"),
      page.waitForSelector("[class*='table'] tbody tr", { timeout: 10_000 }).then(() => "[class*='table'] tbody tr"),
      page.waitForSelector("[class*='report'] tr", { timeout: 10_000 }).then(() => "[class*='report'] tr"),
    ]).catch(() => null)

    if (!tableSelector) {
      console.error("[finpath] Could not find table rows — page may have changed structure")
      return []
    }

    // Allow dynamic content to settle
    await new Promise((r) => setTimeout(r, 2_000))

    const rows = await page.evaluate((sel: string) => {
      const trs = Array.from(document.querySelectorAll(sel))
      return trs.map((tr) => {
        const cells = Array.from(tr.querySelectorAll("td")).map((td) => td.innerText?.trim() ?? "")
        // Try to extract the report link from any anchor in the row
        const anchor = tr.querySelector("a")
        const href = anchor?.getAttribute("href") ?? ""
        return { cells, href }
      })
    }, tableSelector)

    const pageUrl = page.url()
    const base = new URL(pageUrl).origin

    for (const { cells, href } of rows) {
      // Expected column order: Mã CK | Ngày KN | Tiêu đề | Nguồn KN | Khuyến nghị | Giá mục tiêu | % Upside
      if (cells.length < 5) continue

      const tickerRaw = cells[0] ?? ""
      const dateRaw   = cells[1] ?? ""
      const titleRaw  = cells[2] ?? ""
      const sourceRaw = cells[3] ?? ""
      const recRaw    = cells[4] ?? ""
      const priceRaw  = cells[5] ?? ""
      const upsideRaw = cells[6] ?? ""

      const ticker = tickerRaw.trim().toUpperCase()
      const title = titleRaw.trim()
      if (!title || !ticker) continue

      const sourceUrl = href
        ? href.startsWith("http") ? href : `${base}${href.startsWith("/") ? "" : "/"}${href}`
        : `${base}/y-tuong?tab=bao-cao-phan-tich`

      reports.push({
        ticker,
        published_at: parseDate(dateRaw),
        title,
        source_name: sourceRaw.trim(),
        recommendation: mapRecommendation(recRaw),
        target_price: parsePrice(priceRaw),
        upside_percent: parseUpside(upsideRaw),
        source_url: sourceUrl,
      })
    }
  } finally {
    await browser.close()
  }

  return reports
}

// ── route handler ──────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Disable in production until Chromium setup complete
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return Response.json(
      { message: "Scraper temporarily disabled in production", status: "maintenance" },
      { status: 503 }
    )
  }

  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get("authorization")
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  let scraped: ScrapedReport[] = []
  try {
    scraped = await scrapeFinpath()
  } catch (err) {
    console.error("[finpath] Scrape failed:", err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Scrape error" },
      { status: 500 }
    )
  }

  if (scraped.length === 0) {
    return NextResponse.json({ success: true, fetched: 0, new: 0, duplicates: 0 })
  }

  const supabase = createServiceClient()
  let inserted = 0
  let duplicates = 0

  for (const report of scraped) {
    const contentHash = makeHash([report.title, report.source_name, report.published_at])
    const slug = slugify(report.title) + "-" + contentHash.slice(0, 6)
    const recommendation = report.recommendation
    const row = {
      title: report.title,
      slug,
      source_name: report.source_name,
      source_type: "broker_report",
      source_url: report.source_url,
      content_hash: contentHash,
      ticker: report.ticker || null,
      recommendation,
      target_price: report.target_price,
      upside_percent: report.upside_percent,
      category: "stock_picks",
      subcategory: report.ticker || null,
      sentiment: mapSentiment(recommendation),
      published_at: report.published_at,
      fetched_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from("market_analysis")
      .insert(row)

    if (error) {
      if (error.code === "23505") {
        // Unique constraint — duplicate
        duplicates++
      } else {
        console.error("[finpath] Insert error:", error.message, row.title)
      }
    } else {
      inserted++
    }

    // Polite rate-limit: 50 ms between inserts
    await new Promise((r) => setTimeout(r, 50))
  }

  console.log(`[finpath] fetched=${scraped.length} new=${inserted} duplicates=${duplicates}`)

  return NextResponse.json({
    success: true,
    fetched: scraped.length,
    new: inserted,
    duplicates,
  })
}

export async function POST(req: NextRequest) {
  return GET(req)
}
