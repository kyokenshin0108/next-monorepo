import { cleanText } from "@/lib/news/html-entities"
import type { EventImportance } from "./types"

interface RawGsoEvent {
  source: "gso"
  event_date: string    // 'YYYY-MM-DD'
  event_time: null
  title: string
  country: "Việt Nam"
  importance: EventImportance
  actual: null
  forecast: null
  previous: null
  url: string | null
}

const HIGH_KEYWORDS = ["GDP", "CPI"]
const MEDIUM_KEYWORDS = ["Xuất khẩu", "Nhập khẩu", "Công nghiệp", "Xuất nhập khẩu"]
const RELEVANT_KEYWORDS = [
  "Báo cáo",
  "Chỉ số",
  "GDP",
  "CPI",
  "Xuất nhập khẩu",
  "Xuất khẩu",
  "Nhập khẩu",
  "Lao động",
  "Công nghiệp",
  "Thống kê",
  "Kinh tế",
]

function inferImportance(title: string): EventImportance {
  if (HIGH_KEYWORDS.some((kw) => title.includes(kw))) return "high"
  if (MEDIUM_KEYWORDS.some((kw) => title.includes(kw))) return "medium"
  return "low"
}

/**
 * Try to parse date from various Vietnamese formats:
 * - DD/MM/YYYY
 * - DD-MM-YYYY
 * - YYYY-MM-DD
 * Returns 'YYYY-MM-DD' or null
 */
function parseDate(raw: string): string | null {
  const dmy = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (dmy?.[1] && dmy[2] && dmy[3]) {
    return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`
  }
  const iso = raw.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/)
  if (iso?.[1] && iso[2] && iso[3]) {
    return `${iso[1]}-${iso[2]}-${iso[3]}`
  }
  return null
}

export async function fetchGsoEvents(): Promise<RawGsoEvent[]> {
  try {
    const res = await fetch("https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "https://www.gso.gov.vn/",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      console.warn(`[fetch-gso] HTTP ${res.status} — returning []`)
      return []
    }

    const html = await res.text()
    if (!html || html.length < 200) {
      console.warn("[fetch-gso] Empty response — returning []")
      return []
    }

    const events: RawGsoEvent[] = []
    const today = new Date().toISOString().slice(0, 10)

    // Strategy 1: Look for <article> or <li> news item blocks
    const articleRegex = /<(?:article|li)[^>]*>([\s\S]*?)<\/(?:article|li)>/gi
    let aMatch: RegExpExecArray | null

    while ((aMatch = articleRegex.exec(html)) !== null) {
      if (events.length >= 20) break
      const block = aMatch[1] ?? ""

      // Extract title from <a> or <h2/h3/h4>
      const titleMatch =
        block.match(/<(?:h[2-4])[^>]*>([\s\S]*?)<\/(?:h[2-4])>/) ??
        block.match(/<a[^>]*>([\s\S]*?)<\/a>/)
      const rawTitle = titleMatch?.[1] ?? ""
      const title = cleanText(rawTitle)

      if (!title || title.length < 10) continue

      // Must match at least one relevant keyword
      const isRelevant = RELEVANT_KEYWORDS.some((kw) => title.includes(kw))
      if (!isRelevant) continue

      // Extract date
      const dateRaw =
        block.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/) ??
        block.match(/(\d{4}[\/\-]\d{2}[\/\-]\d{2})/)
      const isoDate = dateRaw?.[1] ? parseDate(dateRaw[1]) : today

      // Extract URL
      const urlMatch = block.match(/href=["']([^"']+)["']/)
      let url: string | null = urlMatch?.[1] ?? null
      if (url && !url.startsWith("http")) {
        url = `https://www.gso.gov.vn${url}`
      }

      events.push({
        source: "gso",
        event_date: isoDate ?? today,
        event_time: null,
        title,
        country: "Việt Nam",
        importance: inferImportance(title),
        actual: null,
        forecast: null,
        previous: null,
        url,
      })
    }

    // Strategy 2: If no articles found, look for any <a> links with relevant titles
    if (events.length === 0) {
      const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
      let lMatch: RegExpExecArray | null
      linkRegex.lastIndex = 0

      while ((lMatch = linkRegex.exec(html)) !== null) {
        if (events.length >= 20) break
        const href = lMatch[1] ?? ""
        const rawTitle = lMatch[2] ?? ""
        const title = cleanText(rawTitle)

        if (!title || title.length < 10) continue
        const isRelevant = RELEVANT_KEYWORDS.some((kw) => title.includes(kw))
        if (!isRelevant) continue

        let url: string | null = href || null
        if (url && !url.startsWith("http")) {
          url = `https://www.gso.gov.vn${url}`
        }

        events.push({
          source: "gso",
          event_date: today,
          event_time: null,
          title,
          country: "Việt Nam",
          importance: inferImportance(title),
          actual: null,
          forecast: null,
          previous: null,
          url,
        })
      }
    }

    console.log(`[fetch-gso] Parsed ${events.length} events`)
    return events.slice(0, 20)
  } catch (err) {
    console.error("[fetch-gso] Error:", err instanceof Error ? err.message : err)
    return []
  }
}
