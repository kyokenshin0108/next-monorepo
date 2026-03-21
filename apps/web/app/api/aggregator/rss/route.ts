import { NextRequest, NextResponse } from "next/server"
import { ingestAllSources } from "@/lib/news/ingest"

export const runtime = "nodejs"
export const maxDuration = 60

/**
 * GET /api/aggregator/rss
 *
 * Manually trigger RSS ingestion from all configured Vietnamese sources.
 * Called by Vercel cron (via Authorization: Bearer <CRON_SECRET>) or
 * directly for testing (no auth required when CRON_SECRET is not set).
 *
 * Returns: { success, fetched, inserted, crawled, sources }
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  // When CRON_SECRET is configured, require it via Authorization header
  if (cronSecret) {
    const auth = req.headers.get("authorization")
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const results = await ingestAllSources()

    const totals = results.reduce(
      (acc, r) => ({
        fetched: acc.fetched + r.fetched,
        inserted: acc.inserted + r.inserted,
        crawled: acc.crawled + r.crawled,
        errors: acc.errors + r.errors.length,
      }),
      { fetched: 0, inserted: 0, crawled: 0, errors: 0 }
    )

    return NextResponse.json({
      success: true,
      fetched: totals.fetched,
      new: totals.inserted,
      crawled: totals.crawled,
      errors: totals.errors,
      sources: results.map((r) => ({
        source: r.source,
        fetched: r.fetched,
        inserted: r.inserted,
        crawled: r.crawled,
        errors: r.errors.slice(0, 3),
      })),
    })
  } catch (err) {
    console.error("[aggregator/rss]", err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/aggregator/rss
 * Same as GET but accepts Bearer token in body for compatibility.
 */
export async function POST(req: NextRequest) {
  return GET(req)
}
