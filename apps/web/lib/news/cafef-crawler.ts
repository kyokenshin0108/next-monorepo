import { cleanText } from "./html-entities"

/**
 * Crawl the full article text from a CafeF article URL.
 * Uses the data-role="content" container → extract <p> tags.
 */
export async function crawlCafefArticle(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Encoding": "identity",
        "Accept-Language": "vi-VN,vi;q=0.9",
      },
    })

    if (!res.ok) return null

    const html = await res.text()

    // Find data-role="content" block
    const contentMatch = /data-role=["']content["'][^>]*>([\s\S]*?)<\/div>/i.exec(html)
    if (!contentMatch?.[1]) return null

    const contentHtml = contentMatch[1]

    // Extract all <p> tags
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
    const paragraphs: string[] = []
    let m: RegExpExecArray | null

    while ((m = pRegex.exec(contentHtml)) !== null) {
      const raw = m[1]
      if (!raw) continue
      const text = cleanText(raw)
      if (text.length > 20) {
        paragraphs.push(text)
      }
    }

    return paragraphs.length > 0 ? paragraphs.join("\n\n") : null
  } catch {
    return null
  }
}
