import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = createServiceClient()

    // Delete news articles older than 3 weeks
    const articleCutoff = new Date()
    articleCutoff.setDate(articleCutoff.getDate() - 21)

    const { count: articlesDeleted, error: articlesError } = await supabase
      .from("news_articles")
      .delete({ count: "exact" })
      .lt("published_at", articleCutoff.toISOString())

    if (articlesError) throw articlesError

    // Delete articles with no content (failed crawls from previous runs)
    const { count: emptyDeleted, error: emptyError } = await supabase
      .from("news_articles")
      .delete({ count: "exact" })
      .is("content", null)

    if (emptyError) throw emptyError

    // Delete economic events older than 7 days
    const eventCutoff = new Date()
    eventCutoff.setDate(eventCutoff.getDate() - 7)
    const eventCutoffDate = eventCutoff.toISOString().slice(0, 10)

    const { count: eventsDeleted, error: eventsError } = await supabase
      .from("economic_events")
      .delete({ count: "exact" })
      .lt("event_date", eventCutoffDate)

    if (eventsError) throw eventsError

    return NextResponse.json({
      ok: true,
      articlesDeleted: articlesDeleted ?? 0,
      emptyArticlesDeleted: emptyDeleted ?? 0,
      eventsDeleted: eventsDeleted ?? 0,
    })
  } catch (err) {
    console.error("[cron/cleanup]", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
