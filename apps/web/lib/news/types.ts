export type NewsSource = "cafef" | "vneconomy" | "vnexpress"

export interface RawRssItem {
  title: string
  link: string
  description: string
  pubDate: string
  imageUrl: string | null
}

export interface NewsArticle {
  id: string
  source: NewsSource
  category: string
  title: string
  summary: string | null
  content: string | null
  url: string
  image_url: string | null
  published_at: string
  fetched_at: string
  is_featured: boolean
}

export interface SourceConfig {
  id: NewsSource
  name: string
  rssUrl: string
  category: string
  canCrawl: boolean
}
