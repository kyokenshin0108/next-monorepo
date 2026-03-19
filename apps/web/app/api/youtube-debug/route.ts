/**
 * GET /api/youtube-debug
 *
 * Diagnostic endpoint — shows raw YouTube API responses and quota status.
 * Only accessible in non-production or with ?secret= matching CRON_SECRET.
 *
 * Usage:
 *   http://localhost:3000/api/youtube-debug
 *   https://yourdomain.com/api/youtube-debug?secret=stockhunter123
 */
import { NextRequest, NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY
const VIDEOS_BASE = "https://www.googleapis.com/youtube/v3/videos"
const PLAYLIST_BASE = "https://www.googleapis.com/youtube/v3/playlistItems"
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(req: NextRequest) {
  // Simple auth: allow in dev, require ?secret= in prod
  const isProd = process.env.NODE_ENV === "production"
  if (isProd) {
    const secret = req.nextUrl.searchParams.get("secret")
    if (!secret || secret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")
  const results: Record<string, unknown> = {
    config: {
      CHANNEL_ID,
      uploadsPlaylistId,
      API_KEY_SET: !!API_KEY,
      API_KEY_PREVIEW: API_KEY ? `${API_KEY.slice(0, 10)}...` : null,
      timestamp: new Date().toISOString(),
    },
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "YOUTUBE_API_KEY not set", ...results }, { status: 500 })
  }

  // Test 1: playlistItems.list (1 quota unit)
  try {
    const r = await fetch(
      `${PLAYLIST_BASE}?part=contentDetails,snippet&playlistId=${uploadsPlaylistId}&maxResults=5&key=${API_KEY}`,
      { cache: "no-store" }
    )
    const data = await r.json()
    results.playlistItems = {
      httpStatus: r.status,
      error: data.error ?? null,
      itemCount: data.items?.length ?? 0,
      firstVideoId: data.items?.[0]?.contentDetails?.videoId ?? null,
      firstTitle: data.items?.[0]?.snippet?.title ?? null,
    }

    // Test 2: videos.list for first 5 IDs (1 quota unit)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ids = (data.items ?? []).map((i: any) => i.contentDetails?.videoId).filter(Boolean).join(",")
    if (ids) {
      const vr = await fetch(
        `${VIDEOS_BASE}?part=snippet,contentDetails,liveStreamingDetails&id=${ids}&key=${API_KEY}`,
        { cache: "no-store" }
      )
      const vdata = await vr.json()
      results.videos = {
        httpStatus: vr.status,
        error: vdata.error ?? null,
        itemCount: vdata.items?.length ?? 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: (vdata.items ?? []).map((v: any) => ({
          videoId: v.id,
          title: v.snippet?.title,
          liveBroadcastContent: v.snippet?.liveBroadcastContent,
          duration: v.contentDetails?.duration,
          hasLiveStreamingDetails: v.liveStreamingDetails != null,
        })),
      }
    }
  } catch (err) {
    results.playlistItems = { error: String(err) }
  }

  // Diagnosis
  const playlistError = (results.playlistItems as Record<string, unknown>)?.error
  const videosError = (results.videos as Record<string, unknown> | undefined)?.error

  results.diagnosis = {
    quotaExceeded:
      (playlistError as Record<string, unknown> | null)?.code === 403 ||
      (videosError as Record<string, unknown> | null)?.code === 403,
    recommendation: (() => {
      if ((playlistError as Record<string, unknown> | null)?.code === 403) {
        return "API key quota is exhausted (10,000 units/day). Quota resets at midnight Pacific Time. With the optimized route (no search.list), daily usage is now ~576 units — well within limit after reset."
      }
      if (!API_KEY) return "Set YOUTUBE_API_KEY in .env.local"
      return "API key is working correctly."
    })(),
    quotaUsagePerDay: "~576 units (2 units × 288 cache-miss periods/day at 5-min TTL)",
    quotaLimit: "10,000 units/day (free tier)",
  }

  return NextResponse.json(results, { status: 200 })
}
