import { cleanText, cleanContent } from "./html-entities"
import type { NewsSource } from "./types"

const CONTENT_ATTRS: Record<NewsSource, string[]> = {
  cafef: ['data-role="content"', 'class="detail-content"', 'class="cms-body"'],
  vneconomy: [
    'data-field="body"',
    'class="zone__content"',
  ],
  vnexpress: [
    'class="fck_detail ',
    'class="fck_detail"',
    'class="description"',
  ],
}

/**
 * Extract the inner HTML of the first element whose opening tag contains `attr`,
 * correctly handling arbitrary nesting depth.
 */
function extractBlock(html: string, attr: string): string | null {
  const attrIdx = html.indexOf(attr)
  if (attrIdx === -1) return null

  const openStart = html.lastIndexOf("<", attrIdx)
  if (openStart === -1) return null

  const tagMatch = /^<([a-z][a-z0-9]*)/i.exec(html.slice(openStart))
  if (!tagMatch?.[1]) return null
  const tag = tagMatch[1].toLowerCase()

  const openEnd = html.indexOf(">", attrIdx)
  if (openEnd === -1) return null

  const openTag = `<${tag}`
  const closeTag = `</${tag}`
  let depth = 1
  let pos = openEnd + 1

  while (pos < html.length && depth > 0) {
    const nextOpen = html.indexOf(openTag, pos)
    const nextClose = html.indexOf(closeTag, pos)
    if (nextClose === -1) break
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++
      pos = nextOpen + openTag.length
    } else {
      depth--
      if (depth === 0) return html.slice(openEnd + 1, nextClose)
      pos = nextClose + closeTag.length
    }
  }

  return html.slice(openEnd + 1, openEnd + 50000)
}

/** Extract src from an <img> tag string. */
function extractImgSrc(imgTag: string): string | null {
  // Prefer data-src (lazy-load) over src
  let m = /data-src=["']([^"']+)["']/i.exec(imgTag)
  if (m?.[1] && m[1].startsWith("http")) return m[1]
  m = /\bsrc=["']([^"']+)["']/i.exec(imgTag)
  if (m?.[1] && m[1].startsWith("http")) return m[1]
  return null
}

/** Returns true for small icons/avatars/ads we don't want to show. */
function isContentImage(src: string): boolean {
  if (!src) return false
  const lower = src.toLowerCase()
  // Skip tracking pixels, icons, ads
  if (lower.includes("tracking") || lower.includes("pixel") || lower.includes("avatar")) return false
  if (lower.includes("icon") && lower.includes("16")) return false
  // Must look like an article image (jpg/jpeg/png/webp/gif)
  return /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(lower) || lower.includes("cafef") || lower.includes("vneconomy") || lower.includes("vnexpress")
}

/**
 * Walk through the content block HTML in document order, extracting paragraphs and
 * images as a sequence. Images are stored as `[image:URL]` markers so the detail page
 * can render them inline without any DB schema change.
 */
function extractContentBlocks(blockHtml: string): string[] {
  const blocks: string[] = []
  const seenImgs = new Set<string>()

  // Combined regex: matches <p>...</p> or <img ...>
  const tokenRe = /(<img[^>]*\/?>|<p[^>]*>[\s\S]*?<\/p>)/gi
  let m: RegExpExecArray | null

  while ((m = tokenRe.exec(blockHtml)) !== null) {
    const token = m[1] ?? ""

    if (/^<img/i.test(token)) {
      const src = extractImgSrc(token)
      if (src && isContentImage(src) && !seenImgs.has(src)) {
        seenImgs.add(src)
        blocks.push(`[image:${src}]`)
      }
    } else {
      // It's a <p> block — strip inner tags and clean
      const inner = token.replace(/^<p[^>]*>/i, "").replace(/<\/p>$/i, "")
      // Skip if the paragraph itself is just an image
      if (/^<img/i.test(inner.trim())) {
        const src = extractImgSrc(inner)
        if (src && isContentImage(src) && !seenImgs.has(src)) {
          seenImgs.add(src)
          blocks.push(`[image:${src}]`)
        }
        continue
      }
      const text = cleanText(inner)
      if (text.length > 20) blocks.push(text)
    }
  }

  return blocks
}

function extractMainImage(html: string): string | null {
  let m = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html)
  if (m?.[1]) return m[1]
  m = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html)
  if (m?.[1]) return m[1]
  return null
}

export async function crawlArticle(
  url: string,
  source: NewsSource
): Promise<{ content: string | null; image: string | null }> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Encoding": "identity",
        "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
        Referer: new URL(url).origin,
      },
    })

    if (!res.ok) return { content: null, image: null }

    const html = await res.text()
    const image = extractMainImage(html)

    const attrs = CONTENT_ATTRS[source] ?? []
    for (const attr of attrs) {
      const block = extractBlock(html, attr)
      if (!block) continue
      const blocks = extractContentBlocks(block)
      // Need at least one text paragraph (not just images)
      if (blocks.some((b) => !b.startsWith("[image:"))) {
        return { content: cleanContent(blocks.join("\n\n")), image }
      }
    }

    return { content: null, image }
  } catch {
    return { content: null, image: null }
  }
}
