import { createAnonClient } from "@/lib/supabase/server"

export interface KnowledgePost {
  id: string
  type: "video" | "article" | "podcast" | "learning_path"
  title: string
  author: string | null
  category: string | null
  description: string | null
  thumbnail_url: string | null
  content_url: string | null
  duration: string | null
  read_time_minutes: number | null
  level: string | null
  icon: string | null
  color_class: string | null
  view_count: number
  is_featured: boolean
  published_at: string
}

export async function getPublishedPosts(): Promise<KnowledgePost[]> {
  const supabase = createAnonClient()
  const { data, error } = await supabase
    .from("knowledge_posts")
    .select(
      "id, type, title, author, category, description, thumbnail_url, content_url, duration, read_time_minutes, level, icon, color_class, view_count, is_featured, published_at"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch knowledge_posts:", error.message)
    return []
  }
  return (data ?? []) as KnowledgePost[]
}
