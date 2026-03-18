import { NextRequest, NextResponse } from "next/server"
import { ingestAllEventSources } from "@/lib/events/ingest-events"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const results = await ingestAllEventSources()
    const summary = results.map((r) => ({
      source: r.source,
      fetched: r.fetched,
      inserted: r.inserted,
      errorCount: r.errors.length,
      firstError: r.errors[0] ?? null,
    }))

    return NextResponse.json({ ok: true, results: summary })
  } catch (err) {
    console.error("[cron/fetch-events]", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
