import { cleanText } from "@/lib/news/html-entities"
import type { EventImportance } from "./types"

interface RawInvestingEvent {
  source: "investing"
  event_date: string       // 'YYYY-MM-DD'
  event_time: string | null
  title: string
  country: string
  importance: EventImportance
  actual: string | null
  forecast: string | null
  previous: string | null
  url: string | null
}

// Investing.com uses full underscore-separated country names in ceFlags CSS class
const COUNTRY_NAME_MAP: Record<string, string> = {
  United_States:  "Mỹ",
  United_Kingdom: "Anh",
  Germany:        "EU",        // ECB/Euro-zone events show under Germany
  Euro_Zone:      "EU",
  European_Union: "EU",
  Japan:          "Nhật Bản",
  China:          "Trung Quốc",
  Vietnam:        "Việt Nam",
}

function mapImportance(level: string): EventImportance {
  if (level === "3") return "high"
  if (level === "2") return "medium"
  return "low"
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function extractTextContent(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Extract attribute value from an HTML tag.
 * e.g. extractAttr('<tr data-event-datetime="2025/06/10 08:30:00">', 'data-event-datetime')
 */
function extractAttr(tag: string, attr: string): string | null {
  const re = new RegExp(`${attr}=["']([^"']+)["']`, "i")
  return tag.match(re)?.[1] ?? null
}

export async function fetchInvestingEvents(): Promise<RawInvestingEvent[]> {
  try {
    const now = new Date()
    const future = new Date(now)
    future.setDate(future.getDate() + 14)

    const dateFrom = formatDate(now)
    const dateTo = formatDate(future)

    // Country IDs on Investing.com:
    //   5=United States | 4=Germany(EU) | 17=United Kingdom | 35=Japan | 37=China
    const body =
      "country%5B%5D=5&country%5B%5D=4&country%5B%5D=17&country%5B%5D=35&country%5B%5D=37" +
      "&importance%5B%5D=3&importance%5B%5D=2" +
      `&timeZone=0&dateFrom=${dateFrom}&dateTo=${dateTo}` +
      "&currentTab=custom&limit_from=0"

    const res = await fetch(
      "https://www.investing.com/economic-calendar/service/getCalendarFilteredData",
      {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Referer: "https://www.investing.com/economic-calendar/",
          Origin: "https://www.investing.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body,
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!res.ok) {
      console.warn(`[fetch-investing] HTTP ${res.status} — returning []`)
      return []
    }

    // Response is JSON with a "data" field containing HTML
    const json = (await res.json()) as { data?: string }
    const html: string = json.data ?? ""

    if (!html) return []

    const events: RawInvestingEvent[] = []

    // Split on <tr class="js-event-item"
    const rows = html.split(/<tr[^>]*class="[^"]*js-event-item[^"]*"/)
    // First element is before any row — skip it
    for (let i = 1; i < rows.length; i++) {
      const rowHtml = rows[i]
      if (!rowHtml) continue

      // Get the opening <tr ...> tag attributes from the split remnant
      // The split removed the <tr opening — grab everything up to the first >
      // Actually the split already removed the <tr part so we need to reconstruct
      // Let's extract from the raw content

      // Extract data-event-datetime from remaining text (it was on the <tr> tag)
      // Since we split on the tr opening, the attributes are lost.
      // Re-approach: use regex on the full html to find each row
      void rowHtml // suppress unused warning
    }

    // Better approach: use regex to find each tr.js-event-item block
    const trRegex = /<tr[^>]*class="[^"]*js-event-item[^"]*"([^>]*)>([\s\S]*?)<\/tr>/gi
    let match: RegExpExecArray | null
    trRegex.lastIndex = 0

    while ((match = trRegex.exec(html)) !== null) {
      const trAttrs = match[1] ?? ""
      const trContent = match[2] ?? ""

      // Extract datetime
      const datetimeRaw = extractAttr(`x ${trAttrs}`, "data-event-datetime")
      if (!datetimeRaw) continue

      // datetimeRaw: "2025/06/10 08:30:00"
      const dtParts = datetimeRaw.split(" ")
      const datePart = dtParts[0]?.replace(/\//g, "-") ?? null  // YYYY-MM-DD
      const timePart = dtParts[1]?.slice(0, 5) ?? null           // HH:MM

      if (!datePart) continue

      // Importance level
      const levelRaw = extractAttr(`x ${trAttrs}`, "event_attr_level") ?? "1"
      const importance = mapImportance(levelRaw)

      // Country from .ceFlags class — Investing.com uses full names e.g. "ceFlags United_States"
      let country: string | null = null
      const flagMatch = trContent.match(/class="[^"]*ceFlags\s+([A-Za-z_]+)[^"]*"/)
      if (flagMatch?.[1]) {
        country = COUNTRY_NAME_MAP[flagMatch[1]] ?? flagMatch[1].replace(/_/g, " ")
      }
      if (!country) continue   // skip events with unrecognised country

      // Title from .event cell
      const eventCellMatch = trContent.match(/<td[^>]*class="[^"]*\bevent\b[^"]*"[^>]*>([\s\S]*?)<\/td>/)
      const rawTitle = eventCellMatch?.[1] ?? ""
      const title = cleanText(rawTitle)
      if (!title) continue

      // Actual / forecast / previous
      const actMatch = trContent.match(/<td[^>]*class="[^"]*\bact\b[^"]*"[^>]*>([\s\S]*?)<\/td>/)
      const foreMatch = trContent.match(/<td[^>]*class="[^"]*\bfore\b[^"]*"[^>]*>([\s\S]*?)<\/td>/)
      const prevMatch = trContent.match(/<td[^>]*class="[^"]*\bprev\b[^"]*"[^>]*>([\s\S]*?)<\/td>/)

      const actual = actMatch?.[1] ? extractTextContent(actMatch[1]) || null : null
      const forecast = foreMatch?.[1] ? extractTextContent(foreMatch[1]) || null : null
      const previous = prevMatch?.[1] ? extractTextContent(prevMatch[1]) || null : null

      events.push({
        source: "investing",
        event_date: datePart,
        event_time: timePart,
        title,
        country,
        importance,
        actual: actual || null,
        forecast: forecast || null,
        previous: previous || null,
        url: "https://www.investing.com/economic-calendar/",
      })
    }

    console.log(`[fetch-investing] Parsed ${events.length} events`)
    return events
  } catch (err) {
    console.error("[fetch-investing] Error:", err instanceof Error ? err.message : err)
    return []
  }
}
