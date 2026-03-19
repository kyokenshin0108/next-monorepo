/**
 * GET /api/youtube-debug
 * Diagnostic endpoint — tests all YouTube data sources and reports status.
 * Dev: open. Prod: requires ?secret=<CRON_SECRET>
 */
import { NextRequest, NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY
const VIDEOS_BASE = "https://www.googleapis.com/youtube/v3/videos"
const PLAYLIST_BASE = "https://www.googleapis.com/youtube/v3/playlistItems"
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const secret = req.nextUrl.searchParams.get("secret")
    if (!secret || secret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")
  const report: Record<string, unknown> = {
    config: {
      CHANNEL_ID,
      uploadsPlaylistId,
      RSS_URL,
      API_KEY_SET: !!API_KEY,
      API_KEY_PREVIEW: API_KEY ? `${API_KEY.slice(0, 12)}...` : null,
      timestamp: new Date().toISOString(),
    },
  }

  // ── Test 1: RSS feed (0 quota units) ────────────────────────────────────────
  try {
    const rssRes = await fetch(RSS_URL, { cache: "no-store" })
    const xml = await rssRes.text()
    const videoIds = [...xml.matchAll(/<yt:videoId>(.*?)<\/yt:videoId>/g)].map(m => m[1] ?? "")
    const titles = [...xml.matchAll(/<title>([\s\S]*?)<\/title>/g)]
      .slice(1) // skip feed-level <title>
      .slice(0, 5)
      .map(m => (m[1] ?? "").trim())

    report.rss = {
      httpStatus: rssRes.status,
      ok: rssRes.ok,
      videoCount: videoIds.length,
      firstVideoIds: videoIds.slice(0, 5),
      firstTitles: titles,
      error: rssRes.ok ? null : `HTTP ${rssRes.status}`,
      shortsDetectionNote: "Shorts detected via <link href='/shorts/'> in RSS — no API needed",
    }
  } catch (err) {
    report.rss = { error: String(err) }
  }

  // ── Test 2: playlistItems.list (1 quota unit) ────────────────────────────────
  if (!API_KEY) {
    report.api = { error: "YOUTUBE_API_KEY not set in environment" }
  } else {
    try {
      const plRes = await fetch(
        `${PLAYLIST_BASE}?part=contentDetails,snippet&playlistId=${uploadsPlaylistId}&maxResults=5&key=${API_KEY}`,
        { cache: "no-store" }
      )
      const plData = await plRes.json()
      const quotaError = plData.error?.errors?.[0]?.reason === "quotaExceeded"

      report.playlistItems = {
        httpStatus: plRes.status,
        quotaExceeded: quotaError,
        error: plData.error ? `[${plData.error.errors?.[0]?.reason}] ${plData.error.message}` : null,
        itemCount: plData.items?.length ?? 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: (plData.items ?? []).slice(0, 3).map((i: any) => ({
          videoId: i.contentDetails?.videoId,
          title: i.snippet?.title,
        })),
      }

      // ── Test 3: videos.list (1 quota unit) ────────────────────────────────────
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ids = (plData.items ?? []).map((i: any) => i.contentDetails?.videoId).filter(Boolean).join(",")
      if (ids && !quotaError) {
        const vRes = await fetch(
          `${VIDEOS_BASE}?part=snippet,contentDetails,liveStreamingDetails&id=${ids}&key=${API_KEY}`,
          { cache: "no-store" }
        )
        const vData = await vRes.json()
        report.videos = {
          httpStatus: vRes.status,
          error: vData.error ? `[${vData.error.errors?.[0]?.reason}] ${vData.error.message}` : null,
          itemCount: vData.items?.length ?? 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items: (vData.items ?? []).map((v: any) => ({
            videoId: v.id,
            title: v.snippet?.title?.slice(0, 60),
            liveBroadcastContent: v.snippet?.liveBroadcastContent,
            duration: v.contentDetails?.duration,
            durationSec: (() => {
              const iso: string = v.contentDetails?.duration ?? ""
              const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
              if (!m) return 0
              return parseInt(m[1] ?? "0") * 3600 + parseInt(m[2] ?? "0") * 60 + parseInt(m[3] ?? "0")
            })(),
            isShort: (() => {
              const iso: string = v.contentDetails?.duration ?? ""
              const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
              if (!m) return false
              const sec = parseInt(m[1] ?? "0") * 3600 + parseInt(m[2] ?? "0") * 60 + parseInt(m[3] ?? "0")
              return sec < 60
            })(),
            isLivestream: v.liveStreamingDetails != null,
          })),
        }
      }
    } catch (err) {
      report.playlistItems = { error: String(err) }
    }
  }

  // ── Diagnosis ────────────────────────────────────────────────────────────────
  const apiQuotaExceeded = (report.playlistItems as Record<string, unknown> | undefined)?.quotaExceeded === true
  const rssOk = (report.rss as Record<string, unknown> | undefined)?.ok === true

  report.diagnosis = {
    apiQuotaExceeded,
    rssAvailable: rssOk,
    activeSource: apiQuotaExceeded ? "rss (fallback)" : "api",
    quotaResetTime: "Midnight Pacific Time (~07:00 UTC / 14:00 Vietnam)",
    optimizedDailyUsage: "~576 units/day (2 units × 288 cache periods at 5-min TTL)",
    quotaLimit: "10,000 units/day (free tier)",
    recommendation: apiQuotaExceeded
      ? rssOk
        ? "API quota exhausted but RSS fallback is active — videos ARE showing from RSS. Quota resets at midnight Pacific Time."
        : "API quota exhausted AND RSS is failing. Check network connectivity."
      : "API key is working correctly.",
  }

  return NextResponse.json(report, { status: 200 })
}
