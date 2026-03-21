/**
 * POST /api/cron/fetch-reports
 *
 * Cron entry-point called by Vercel every 4 hours.
 * Delegates to the Finpath scraper and returns a summary.
 */

import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function GET(req: NextRequest) {
  return POST(req)
}

export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Call the finpath aggregator on the same origin
    const origin =
      process.env.NEXT_PUBLIC_APP_URL ??
      (req.headers.get("x-forwarded-host")
        ? `https://${req.headers.get("x-forwarded-host")}`
        : "http://localhost:3000")

    const res = await fetch(`${origin}/api/aggregator/finpath`, {
      method: "GET",
      headers: { authorization: `Bearer ${cronSecret}` },
    })

    const data = await res.json()

    console.log("[cron/fetch-reports] result:", data)
    return NextResponse.json({ ok: true, ...data })
  } catch (err) {
    console.error("[cron/fetch-reports]", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
