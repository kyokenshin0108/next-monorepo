import { createAnonClient } from "@/lib/supabase/server"

export interface MarketAnalysis {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  source_name: string
  source_type: string
  source_url: string | null
  report_pdf_url: string | null
  author: string | null
  ticker: string | null
  recommendation: string | null
  target_price: number | null
  upside_percent: number | null
  category: string
  subcategory: string | null
  tags: string[] | null
  summary: string | null
  key_points: string[] | null
  sentiment: string | null
  quality_score: number | null
  featured_image_url: string | null
  published_at: string
  fetched_at: string
  is_featured: boolean
  view_count: number
  created_at: string
}

export async function getAnalysisBySlug(slug: string): Promise<MarketAnalysis | null> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("market_analysis")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) return null
  return data as MarketAnalysis
}

export async function getRelatedAnalysis(
  post: MarketAnalysis,
  limit = 3
): Promise<MarketAnalysis[]> {
  const supabase = createAnonClient()
  // Prefer same ticker, fall back to same category
  const { data: byTicker } = post.ticker
    ? await supabase
        .from("market_analysis")
        .select("*")
        .eq("ticker", post.ticker)
        .neq("id", post.id)
        .order("published_at", { ascending: false })
        .limit(limit)
    : { data: [] }

  if ((byTicker ?? []).length >= limit) return (byTicker ?? []) as MarketAnalysis[]

  const { data: byCategory } = await supabase
    .from("market_analysis")
    .select("*")
    .eq("category", post.category)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(limit)

  return (byCategory ?? []) as MarketAnalysis[]
}

export async function getAllAnalysis(): Promise<MarketAnalysis[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("market_analysis")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(60)

  if (error) {
    console.error("Failed to fetch market_analysis:", error.message)
    return []
  }
  return (data ?? []) as MarketAnalysis[]
}

export async function getFeaturedAnalysis(limit = 3): Promise<MarketAnalysis[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("market_analysis")
    .select("*")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Failed to fetch featured market_analysis:", error.message)
    return []
  }
  return (data ?? []) as MarketAnalysis[]
}
