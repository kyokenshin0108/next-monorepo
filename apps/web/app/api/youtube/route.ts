import { NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY
const VIDEOS_BASE = "https://www.googleapis.com/youtube/v3/videos"
const PLAYLIST_BASE = "https://www.googleapis.com/youtube/v3/playlistItems"

export interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  channelTitle: string
}

export interface YouTubeStatus {
  isLive: boolean
  liveVideo: YouTubeVideo | null
  latestVideo: YouTubeVideo | null
  upcomingStreams: YouTubeVideo[]
  recentVideos: YouTubeVideo[]
}

// ── Node.js in-memory cache ───────────────────────────────────────────────────
// Prevents repeated API calls in dev (where Next.js data cache is disabled).
// Each cache miss costs ~2 quota units; 5-min TTL → ≤576 units/day.
let cachedStatus: YouTubeStatus | null = null
let cacheExpiresAt = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

/** Parse ISO 8601 duration (e.g. "PT1M30S") to total seconds */
function parseDurationSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  return (
    parseInt(m[1] ?? "0") * 3600 +
    parseInt(m[2] ?? "0") * 60 +
    parseInt(m[3] ?? "0")
  )
}

/**
 * Check if the channel is currently live.
 *
 * Cost: playlistItems.list (1 unit) + videos.list (1 unit) = 2 units.
 * Previously used search.list (100 units) — 50× cheaper.
 */
async function getLiveStatus(): Promise<{ isLive: boolean; liveVideo: YouTubeVideo | null }> {
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")

  const playlistRes = await fetch(
    `${PLAYLIST_BASE}?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=1&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const playlistData = await playlistRes.json()

  if (playlistData.error) {
    console.error("[YouTube] getLiveStatus › playlistItems error:", JSON.stringify(playlistData.error))
    return { isLive: false, liveVideo: null }
  }

  const latestVideoId = playlistData.items?.[0]?.contentDetails?.videoId as string | undefined
  if (!latestVideoId) return { isLive: false, liveVideo: null }

  const videoRes = await fetch(
    `${VIDEOS_BASE}?part=snippet,liveStreamingDetails&id=${latestVideoId}&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const videoData = await videoRes.json()

  if (videoData.error) {
    console.error("[YouTube] getLiveStatus › videos error:", JSON.stringify(videoData.error))
    return { isLive: false, liveVideo: null }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const video = videoData.items?.[0] as any
  if (!video) return { isLive: false, liveVideo: null }

  const isLive = video.snippet?.liveBroadcastContent === "live"
  if (!isLive) return { isLive: false, liveVideo: null }

  return {
    isLive: true,
    liveVideo: {
      videoId: video.id as string,
      title: video.snippet?.title ?? "",
      description: video.snippet?.description ?? "",
      thumbnail:
        video.snippet?.thumbnails?.high?.url ||
        video.snippet?.thumbnails?.medium?.url ||
        "",
      publishedAt: video.snippet?.publishedAt ?? "",
      channelTitle: video.snippet?.channelTitle ?? "",
    },
  }
}

/**
 * Fetch up to `limit` regular (non-Short, non-livestream) videos from the channel.
 *
 * Cost: playlistItems.list (1 unit) + videos.list batch (1 unit) = 2 units total.
 * Filters: liveStreamingDetails present → skip (was/is livestream), duration < 60 s → skip (Short).
 */
async function getRecentRegularVideos(limit = 7): Promise<YouTubeVideo[]> {
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")

  const playlistRes = await fetch(
    `${PLAYLIST_BASE}?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const playlistData = await playlistRes.json()

  if (playlistData.error) {
    console.error("[YouTube] getRecentRegularVideos › playlistItems error:", JSON.stringify(playlistData.error))
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playlistItems: any[] = playlistData.items ?? []
  if (playlistItems.length === 0) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ids = playlistItems.map((item: any) => item.contentDetails?.videoId as string).filter(Boolean)
  if (ids.length === 0) return []

  const detailsRes = await fetch(
    `${VIDEOS_BASE}?part=snippet,contentDetails,liveStreamingDetails&id=${ids.join(",")}&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const detailsData = await detailsRes.json()

  if (detailsData.error) {
    console.error("[YouTube] getRecentRegularVideos › videos error:", JSON.stringify(detailsData.error))
    return []
  }

  const results: YouTubeVideo[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const item of detailsData.items ?? [] as any[]) {
    if (results.length >= limit) break
    if (item.liveStreamingDetails != null) continue
    const durationSecs = parseDurationSeconds((item.contentDetails?.duration as string) ?? "")
    if (durationSecs < 60) continue

    results.push({
      videoId: item.id as string,
      title: item.snippet?.title ?? "",
      description: item.snippet?.description ?? "",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        "",
      publishedAt: item.snippet?.publishedAt ?? "",
      channelTitle: item.snippet?.channelTitle ?? "",
    })
  }

  console.log(`[YouTube] getRecentRegularVideos: ${results.length}/${ids.length} videos after filtering`)
  return results
}

export async function GET() {
  if (!API_KEY) {
    console.error("[YouTube] YOUTUBE_API_KEY is not set")
    return NextResponse.json({ error: "Missing YOUTUBE_API_KEY" }, { status: 500 })
  }

  // ── Serve from cache if still valid ──────────────────────────────────────
  if (cachedStatus && Date.now() < cacheExpiresAt) {
    const ttlSec = Math.round((cacheExpiresAt - Date.now()) / 1000)
    console.log(`[YouTube] Cache hit — expires in ${ttlSec}s`)
    return NextResponse.json(cachedStatus)
  }

  console.log("[YouTube] Cache miss — calling YouTube API")

  try {
    // ── Check live status (2 quota units, no search.list) ─────────────────
    const { isLive, liveVideo } = await getLiveStatus()

    if (isLive && liveVideo) {
      const recentVideos = await getRecentRegularVideos(7)
      const result: YouTubeStatus = {
        isLive: true,
        liveVideo,
        latestVideo: null,
        upcomingStreams: [],
        recentVideos,
      }
      cachedStatus = result
      cacheExpiresAt = Date.now() + 60_000 // 1 min when live
      console.log("[YouTube] Channel is LIVE — cached for 1 min")
      return NextResponse.json(result)
    }

    // ── Not live — fetch regular videos (2 quota units) ───────────────────
    // upcomingStreams removed: search.list costs 100 units/call.
    // Upcoming schedule is already visible via Google Calendar on the page.
    const allRegularVideos = await getRecentRegularVideos(8)

    const result: YouTubeStatus = {
      isLive: false,
      liveVideo: null,
      latestVideo: allRegularVideos[0] ?? null,
      upcomingStreams: [],
      recentVideos: allRegularVideos.slice(1),
    }

    cachedStatus = result
    cacheExpiresAt = Date.now() + CACHE_TTL_MS
    console.log(
      `[YouTube] Not live — ${allRegularVideos.length} regular videos fetched, cached for 5 min`
    )
    return NextResponse.json(result)
  } catch (err) {
    console.error("[YouTube] Unexpected error:", err)
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 })
  }
}
