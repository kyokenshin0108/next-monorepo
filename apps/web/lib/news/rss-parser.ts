import type { RawRssItem } from "./types"
import { cleanText, fixBrokenEntities } from "./html-entities"

function extractTag(xml: string, tag: string): string {
  const cdataMatch = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i").exec(xml)
  if (cdataMatch?.[1] != null) return cdataMatch[1].trim()
  const plainMatch = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(xml)
  if (plainMatch?.[1] != null) return cleanText(plainMatch[1])
  return ""
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const match = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["']`, "i").exec(xml)
  return match?.[1] ?? ""
}

function extractImage(itemXml: string): string | null {
  let m = /media:content[^>]+url=["']([^"']+)["']/i.exec(itemXml)
  if (m?.[1]) return m[1]
  m = /media:thumbnail[^>]+url=["']([^"']+)["']/i.exec(itemXml)
  if (m?.[1]) return m[1]
  m = /enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i.exec(itemXml)
  if (m?.[1]) return m[1]
  m = /<image[^>]*>[\s\S]*?<url[^>]*>([\s\S]*?)<\/url>/i.exec(itemXml)
  if (m?.[1]) return cleanText(m[1])
  m = /<img[^>]+src=["']([^"']+)["']/i.exec(itemXml)
  if (m?.[1]) return m[1]
  return null
}

export async function fetchRssItems(rssUrl: string): Promise<RawRssItem[]> {
  const res = await fetch(rssUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
      "Accept-Encoding": "identity",
    },
    cache: "no-store",
  })

  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${rssUrl}`)

  let xml = await res.text()
  xml = fixBrokenEntities(xml)

  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  const items: RawRssItem[] = []
  let match: RegExpExecArray | null

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1] ?? ""
    const title = extractTag(itemXml, "title")
    const link =
      extractTag(itemXml, "link") || extractAttr(itemXml, "link", "href")
    const description = extractTag(itemXml, "description")
    const pubDate =
      extractTag(itemXml, "pubDate") || extractTag(itemXml, "dc:date")
    const imageUrl = extractImage(itemXml)

    if (title && link) {
      items.push({ title, link, description, pubDate, imageUrl })
    }
  }

  return items
}
