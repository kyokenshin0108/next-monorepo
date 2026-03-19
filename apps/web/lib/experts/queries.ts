import { createAnonClient } from "@/lib/supabase/server"

export interface ExpertTag {
  label: string
  color: string
}

export interface Expert {
  id: string
  name: string
  role: string
  experience_years: number | null
  description: string | null
  avatar_url: string | null
  tags: ExpertTag[]
  facebook_url: string | null
  youtube_url: string | null
  tiktok_url: string | null
  followers_count: string | null
  rating: string | null
  live_schedule: string | null
  is_featured: boolean
  sort_order: number
}

const SELECT_COLS =
  "id, name, role, experience_years, description, avatar_url, tags, facebook_url, youtube_url, tiktok_url, followers_count, rating, live_schedule, is_featured, sort_order"

export async function getAllExperts(): Promise<Expert[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("experts")
    .select(SELECT_COLS)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Failed to fetch experts:", error.message)
    return []
  }
  return (data ?? []) as Expert[]
}

export async function getFeaturedExperts(limit = 4): Promise<Expert[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("experts")
    .select(SELECT_COLS)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Failed to fetch featured experts:", error.message)
    return []
  }
  return (data ?? []) as Expert[]
}
