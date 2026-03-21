import { NextRequest, NextResponse } from "next/server"
import { ingestAllSources } from "@/lib/news/ingest"

export const runtime = "nodejs"
export const maxDuration = 60

export async function GET(req: NextRequest) {
  return POST(req)
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const results = await ingestAllSources()
    const summary = results.map((r) => ({
      source: r.source,
      fetched: r.fetched,
      inserted: r.inserted,
      crawled: r.crawled,
      errorCount: r.errors.length,
      firstError: r.errors[0] ?? null,
    }))

    return NextResponse.json({ ok: true, results: summary })
  } catch (err) {
    console.error("[cron/fetch-news]", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
