import { cleanText } from "@/lib/news/html-entities"

interface RawHoseEvent {
  source: "hose"
  event_date: string    // 'YYYY-MM-DD'
  event_time: string | null
  title: string
  country: string
  importance: "medium"
  actual: null
  forecast: null
  previous: null
  url: string | null
}

/**
 * Convert DD/MM/YYYY → YYYY-MM-DD
 */
function parseDMY(dmy: string): string | null {
  const parts = dmy.trim().split("/")
  if (parts.length !== 3) return null
  const [d, m, y] = parts
  if (!d || !m || !y) return null
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
}

export async function fetchHoseEvents(): Promise<RawHoseEvent[]> {
  try {
    const res = await fetch("https://www.hsx.vn/Modules/Listed/Web/NewKH", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "https://www.hsx.vn/",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      console.warn(`[fetch-hose] HTTP ${res.status} — returning []`)
      return []
    }

    const html = await res.text()

    if (!html || html.length < 200) {
      console.warn("[fetch-hose] Empty or too-short response — returning []")
      return []
    }

    const events: RawHoseEvent[] = []

    // Look for <tr> rows that contain a date in DD/MM/YYYY format
    // Try table rows first
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let trMatch: RegExpExecArray | null

    while ((trMatch = trRegex.exec(html)) !== null) {
      const rowHtml = trMatch[1] ?? ""

      // Date pattern DD/MM/YYYY inside a <td>
      const dateMatch = rowHtml.match(/(\d{2}\/\d{2}\/\d{4})/)
      if (!dateMatch?.[1]) continue

      const isoDate = parseDMY(dateMatch[1])
      if (!isoDate) continue

      // Extract all <td> text values
      const cells: string[] = []
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
      let tdMatch: RegExpExecArray | null
      tdRegex.lastIndex = 0
      while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
        const text = cleanText(tdMatch[1] ?? "")
        if (text) cells.push(text)
      }

      // We need at least a date and a title-like cell
      if (cells.length < 2) continue

      // Find the longest cell text as the event title (skip the date cell)
      const titleCandidates = cells.filter((c) => !/^\d{2}\/\d{2}\/\d{4}$/.test(c))
      const title = titleCandidates.sort((a, b) => b.length - a.length)[0]
      if (!title || title.length < 5) continue

      events.push({
        source: "hose",
        event_date: isoDate,
        event_time: null,
        title,
        country: "Việt Nam",
        importance: "medium",
        actual: null,
        forecast: null,
        previous: null,
        url: "https://www.hsx.vn/Modules/Listed/Web/NewKH",
      })
    }

    // Fallback: look for list items with dates if table approach returned nothing
    if (events.length === 0) {
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let liMatch: RegExpExecArray | null
      liRegex.lastIndex = 0

      while ((liMatch = liRegex.exec(html)) !== null) {
        const liHtml = liMatch[1] ?? ""
        const dateMatch = liHtml.match(/(\d{2}\/\d{2}\/\d{4})/)
        if (!dateMatch?.[1]) continue

        const isoDate = parseDMY(dateMatch[1])
        if (!isoDate) continue

        const title = cleanText(liHtml)
        if (!title || title.length < 5) continue

        events.push({
          source: "hose",
          event_date: isoDate,
          event_time: null,
          title,
          country: "Việt Nam",
          importance: "medium",
          actual: null,
          forecast: null,
          previous: null,
          url: "https://www.hsx.vn/Modules/Listed/Web/NewKH",
        })
      }
    }

    console.log(`[fetch-hose] Parsed ${events.length} events`)
    return events
  } catch (err) {
    console.error("[fetch-hose] Error:", err instanceof Error ? err.message : err)
    return []
  }
}
