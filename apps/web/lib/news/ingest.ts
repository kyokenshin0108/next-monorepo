import { createServiceClient } from "@/lib/supabase/server"
import { fetchRssItems } from "./rss-parser"
import { crawlArticle } from "./crawl-article"
import { cleanText, cleanContent } from "./html-entities"
import { SOURCE_CONFIGS } from "./source-configs"
import type { NewsSource } from "./types"

const MAX_CRAWL_PER_RUN = 15

export interface IngestResult {
  source: NewsSource
  fetched: number
  inserted: number
  crawled: number
  errors: string[]
}

export async function ingestAllSources(): Promise<IngestResult[]> {
  const supabase = createServiceClient()
  const results: IngestResult[] = []

  for (const config of SOURCE_CONFIGS) {
    const result: IngestResult = {
      source: config.id,
      fetched: 0,
      inserted: 0,
      crawled: 0,
      errors: [],
    }

    try {
      const items = await fetchRssItems(config.rssUrl)
      result.fetched = items.length

      // Get existing URLs to skip already-crawled articles
      const urls = items.map((i) => i.link)
      const { data: existing } = await supabase
        .from("news_articles")
        .select("url")
        .in("url", urls)

      const existingUrls = new Set((existing ?? []).map((r: { url: string }) => r.url))

      let crawlCount = 0

      for (const item of items) {
        const isNew = !existingUrls.has(item.link)
        let content: string | null = null
        let imageUrl = item.imageUrl

        // Crawl full content for new articles — skip if no content extracted
        if (config.canCrawl && isNew && crawlCount < MAX_CRAWL_PER_RUN) {
          const crawled = await crawlArticle(item.link, config.id)
          content = crawled.content
          if (crawled.image) imageUrl = crawled.image
          if (content) crawlCount++
        }

        // Skip articles without content
        if (!content) continue

        const publishedAt = item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString()

        const { error } = await supabase.from("news_articles").insert({
          source: config.id,
          category: config.category,
          title: cleanText(item.title),
          summary: item.description ? cleanText(item.description) : null,
          content: content ? cleanContent(content) : null,
          url: item.link,
          image_url: imageUrl,
          published_at: publishedAt,
          fetched_at: new Date().toISOString(),
          is_featured: false,
        })

        if (!error) {
          result.inserted++
        } else if (error.code !== "23505") {
          result.errors.push(error.message)
        }
      }

      result.crawled = crawlCount
    } catch (err) {
      result.errors.push(err instanceof Error ? err.message : String(err))
    }

    results.push(result)
  }

  return results
}
