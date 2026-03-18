/**
 * VnEconomy emits broken entities like #225; instead of &#225;
 * Fix by inserting the missing ampersand.
 */
export function fixBrokenEntities(text: string): string {
  return text.replace(/(?<!&)#(\d+);/g, "&#$1;")
}

/** Decode all standard HTML entities to plain text characters. */
export function decodeHtmlEntities(text: string): string {
  return (
    text
      // Named entities (order matters: &amp; must come last to avoid double-decoding)
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&lsquo;/g, "\u2018")
      .replace(/&rsquo;/g, "\u2019")
      .replace(/&ldquo;/g, "\u201C")
      .replace(/&rdquo;/g, "\u201D")
      .replace(/&ndash;/g, "\u2013")
      .replace(/&mdash;/g, "\u2014")
      .replace(/&hellip;/g, "\u2026")
      .replace(/&bull;/g, "\u2022")
      .replace(/&copy;/g, "\u00A9")
      .replace(/&reg;/g, "\u00AE")
      // Numeric decimal entities  &#225; → á
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
      // Numeric hex entities  &#xE0; → à
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      // &amp; last — after other entities so (&amp;lt; → &lt; not <)
      .replace(/&amp;/g, "&")
  )
}

/** Strip all HTML/XML tags from a string. */
function stripTags(text: string): string {
  // Remove <script>...</script> and <style>...</style> blocks entirely
  return text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
}

/** Collapse redundant whitespace: multiple spaces/tabs → one space, 3+ newlines → two. */
function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")           // normalize CRLF
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")          // collapse horizontal whitespace
    .replace(/\n{3,}/g, "\n\n")       // max two consecutive newlines
    .replace(/ *\n */g, "\n")         // trim spaces around newlines
    .trim()
}

/**
 * Full pipeline: fix broken entities → decode entities → strip tags → normalize whitespace.
 * Apply to every text field before storing in the database.
 */
export function cleanText(text: string): string {
  return normalizeWhitespace(stripTags(decodeHtmlEntities(fixBrokenEntities(text))))
}

/**
 * Clean multi-paragraph content (keeps paragraph breaks as double newlines).
 * Same pipeline as cleanText but preserves intentional paragraph structure.
 */
export function cleanContent(text: string): string {
  // Replace block-level closing tags with newlines before stripping
  const withBreaks = text
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
  return normalizeWhitespace(stripTags(decodeHtmlEntities(fixBrokenEntities(withBreaks))))
}
