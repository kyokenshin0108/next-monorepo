import { createAnonClient } from "@/lib/supabase/server"

export interface MarketAnalysis {
  id: string
  type: "video" | "article" | "short"
  title: string
  category: string | null
  author: string | null
  excerpt: string | null
  thumbnail_url: string | null
  content_url: string | null
  duration: string | null
  view_count: number
  is_featured: boolean
  published_at: string
}

const SELECT_COLS =
  "id, type, title, category, author, excerpt, thumbnail_url, content_url, duration, view_count, is_featured, published_at"

export async function getAllAnalysis(): Promise<MarketAnalysis[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("market_analysis")
    .select(SELECT_COLS)
    .eq("is_published", true)
    .order("published_at", { ascending: false })

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
    .select(SELECT_COLS)
    .eq("is_published", true)
    .eq("type", "article")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Failed to fetch featured market_analysis:", error.message)
    return []
  }
  return (data ?? []) as MarketAnalysis[]
}
