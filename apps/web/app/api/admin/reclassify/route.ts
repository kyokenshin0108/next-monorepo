import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { classifyArticle } from "@/lib/news/categorize"

const BATCH_SIZE = 50

export async function POST(request: Request) {
  // Protect with CRON_SECRET
  const auth = request.headers.get("authorization") ?? ""
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServiceClient()
  let updated = 0
  let errors = 0
  let offset = 0

  while (true) {
    const { data: articles, error } = await supabase
      .from("news_articles")
      .select("id, title, summary, content")
      .range(offset, offset + BATCH_SIZE - 1)
      .order("published_at", { ascending: false })

    if (error || !articles || articles.length === 0) break

    for (const article of articles) {
      const category = classifyArticle(
        article.title ?? "",
        article.summary ?? null,
        article.content ?? null
      )

      const { error: updateError } = await supabase
        .from("news_articles")
        .update({ category })
        .eq("id", article.id)

      if (updateError) {
        errors++
      } else {
        updated++
      }
    }

    if (articles.length < BATCH_SIZE) break
    offset += BATCH_SIZE
  }

  return NextResponse.json({ updated, errors })
}
