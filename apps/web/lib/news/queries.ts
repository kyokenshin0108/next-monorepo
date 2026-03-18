import { createAnonClient } from "@/lib/supabase/server"
import type { NewsArticle, NewsSource } from "./types"

export async function getArticleById(id: string): Promise<NewsArticle | null> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("id", id)
    .single()
  if (error || !data) return null
  return data as NewsArticle
}

export async function getRelatedArticles(article: NewsArticle, limit = 4): Promise<NewsArticle[]> {
  const supabase = createAnonClient()
  const { data } = await supabase
    .from("news_articles")
    .select("*")
    .eq("source", article.source)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(limit)
  return (data ?? []) as NewsArticle[]
}

const PAGE_SIZE = 12

export interface NewsQueryResult {
  articles: NewsArticle[]
  total: number
  page: number
  totalPages: number
}

export async function getNewsArticles(options: {
  category?: string
  source?: NewsSource
  page?: number
  featured?: boolean
}): Promise<NewsQueryResult> {
  const supabase = createAnonClient()
  const page = options.page ?? 1
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from("news_articles")
    .select("*", { count: "exact" })
    .order("published_at", { ascending: false })
    .range(from, to)

  if (options.category && options.category !== "all") {
    query = query.eq("category", options.category)
  }
  if (options.source) {
    query = query.eq("source", options.source)
  }
  if (options.featured) {
    query = query.eq("is_featured", true)
  }

  const { data, count, error } = await query

  if (error) throw error

  return {
    articles: (data ?? []) as NewsArticle[],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  }
}

export async function getFeaturedArticle(): Promise<NewsArticle | null> {
  const supabase = createAnonClient()

  // Prefer the most recent article that has both an image and full content
  const { data: rich } = await supabase
    .from("news_articles")
    .select("*")
    .not("image_url", "is", null)
    .not("content", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .single()

  if (rich) return rich as NewsArticle

  // Fallback: simply the latest article regardless of content
  const { data: latest } = await supabase
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(1)
    .single()

  return (latest as NewsArticle) ?? null
}

export async function getLatestBySource(source: NewsSource, limit = 4): Promise<NewsArticle[]> {
  const supabase = createAnonClient()
  const { data } = await supabase
    .from("news_articles")
    .select("*")
    .eq("source", source)
    .order("published_at", { ascending: false })
    .limit(limit)

  return (data ?? []) as NewsArticle[]
}
