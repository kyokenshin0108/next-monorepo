import { NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY
const VIDEOS_BASE = "https://www.googleapis.com/youtube/v3/videos"
const PLAYLIST_BASE = "https://www.googleapis.com/youtube/v3/playlistItems"
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

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
  /** "api" when served from YouTube Data API, "rss" when API quota is exhausted */
  _source?: "api" | "rss"
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseDurationSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  return (
    parseInt(m[1] ?? "0") * 3600 +
    parseInt(m[2] ?? "0") * 60 +
    parseInt(m[3] ?? "0")
  )
}

function decodeXMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

// ── RSS fallback (0 quota units, always available) ────────────────────────────
/**
 * Fetch the channel's 15 most recent videos via YouTube's public Atom feed.
 * No API key required — zero quota cost.
 * Limitation: no duration info, so Shorts cannot be filtered by length.
 */
async function getVideosFromRSS(limit = 8): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(RSS_URL, { cache: "no-store" })
    if (!res.ok) {
      console.error(`[YouTube] RSS fetch failed: HTTP ${res.status}`)
      return []
    }
    const xml = await res.text()

    const results: YouTubeVideo[] = []
    let parsed = 0
    for (const entryMatch of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      if (results.length >= limit) break
      const entry = entryMatch[1]
      parsed++

      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1]?.trim()
      if (!videoId) continue

      // YouTube RSS exposes the canonical URL in <link rel="alternate" href="...">
      // Shorts URLs contain "/shorts/", regular videos contain "/watch?v="
      // This lets us filter Shorts without any API call.
      const linkHref = entry.match(/<link rel="alternate" href="(.*?)"/)?.[1] ?? ""
      const isShort = linkHref.includes("/shorts/")
      if (isShort) {
        console.log(`[YouTube] RSS: skipping Short ${videoId}`)
        continue
      }

      // <title> appears once per entry (the media:title duplicate comes later)
      const title = decodeXMLEntities(
        entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? ""
      )
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1]?.trim() ?? ""
      const thumbnail = entry.match(/<media:thumbnail url="(.*?)"/)?.[1]?.trim() ?? ""
      const description = decodeXMLEntities(
        entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1]?.trim() ?? ""
      )
      const channelTitle = decodeXMLEntities(
        entry.match(/<name>(.*?)<\/name>/)?.[1]?.trim() ?? "TheStockHunters"
      )

      results.push({ videoId, title, description, thumbnail, publishedAt: published, channelTitle })
    }

    console.log(`[YouTube] RSS: ${results.length} regular videos out of ${parsed} entries`)
    return results
  } catch (err) {
    console.error("[YouTube] RSS fetch error:", err)
    return []
  }
}

// ── YouTube Data API helpers (total: 2 quota units per call pair) ─────────────

/**
 * Check if the channel is currently live.
 * Cost: playlistItems.list (1 unit) + videos.list (1 unit) = 2 units.
 * Returns null on quota error so the caller can fall back gracefully.
 */
async function getLiveStatus(): Promise<{ isLive: boolean; liveVideo: YouTubeVideo | null } | null> {
  if (!API_KEY) return null
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")

  const playlistRes = await fetch(
    `${PLAYLIST_BASE}?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=1&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const playlistData = await playlistRes.json()

  if (playlistData.error) {
    const reason = playlistData.error.errors?.[0]?.reason ?? "unknown"
    console.error(`[YouTube] getLiveStatus › playlistItems error (${reason}):`, playlistData.error.message)
    return null // signal: quota or auth error
  }

  const latestVideoId = playlistData.items?.[0]?.contentDetails?.videoId as string | undefined
  if (!latestVideoId) return { isLive: false, liveVideo: null }

  const videoRes = await fetch(
    `${VIDEOS_BASE}?part=snippet,liveStreamingDetails&id=${latestVideoId}&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const videoData = await videoRes.json()

  if (videoData.error) {
    const reason = videoData.error.errors?.[0]?.reason ?? "unknown"
    console.error(`[YouTube] getLiveStatus › videos error (${reason}):`, videoData.error.message)
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const video = videoData.items?.[0] as any
  if (!video || video.snippet?.liveBroadcastContent !== "live") {
    return { isLive: false, liveVideo: null }
  }

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
 * Fetch up to `limit` regular (non-Short, non-livestream) videos.
 * Cost: playlistItems.list (1 unit) + videos.list batch (1 unit) = 2 units.
 * Returns null on quota/auth error so the caller can fall back to RSS.
 */
async function getRecentRegularVideos(limit = 8): Promise<YouTubeVideo[] | null> {
  if (!API_KEY) return null
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")

  const playlistRes = await fetch(
    `${PLAYLIST_BASE}?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
    { cache: "no-store" }
  )
  const playlistData = await playlistRes.json()

  if (playlistData.error) {
    const reason = playlistData.error.errors?.[0]?.reason ?? "unknown"
    console.error(`[YouTube] getRecentRegularVideos › playlistItems error (${reason}):`, playlistData.error.message)
    return null // signal: quota or auth error
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
    const reason = detailsData.error.errors?.[0]?.reason ?? "unknown"
    console.error(`[YouTube] getRecentRegularVideos › videos error (${reason}):`, detailsData.error.message)
    return null
  }

  const results: YouTubeVideo[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const item of detailsData.items ?? [] as any[]) {
    if (results.length >= limit) break
    if (item.liveStreamingDetails != null) continue
    if (parseDurationSeconds((item.contentDetails?.duration as string) ?? "") < 60) continue
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

  console.log(`[YouTube] API: ${results.length}/${ids.length} videos after filtering`)
  return results
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET() {
  console.log("[YouTube] Fetching fresh data")

  // ── Try YouTube Data API first ──────────────────────────────────────────────
  const [liveResult, apiVideos] = await Promise.all([
    getLiveStatus(),
    getRecentRegularVideos(8),
  ])

  const apiWorking = liveResult !== null && apiVideos !== null

  if (apiWorking) {
    // API is healthy — build full response
    const { isLive, liveVideo } = liveResult!
    const allVideos = apiVideos!

    const result: YouTubeStatus = {
      isLive,
      liveVideo: isLive ? liveVideo : null,
      latestVideo: isLive ? null : (allVideos[0] ?? null),
      upcomingStreams: [],
      recentVideos: isLive ? allVideos : allVideos.slice(1),
      _source: "api",
    }

    // Cache at CDN/edge: 60s when live (for fast status updates), 5min otherwise
    const maxAge = isLive ? 60 : 300
    console.log(`[YouTube] API source — isLive=${isLive}, ${allVideos.length} videos, s-maxage=${maxAge}s`)
    return NextResponse.json(result, {
      headers: { "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=30` },
    })
  }

  // ── API quota exhausted — fall back to RSS ─────────────────────────────────
  console.warn("[YouTube] API unavailable (quota/auth error) — falling back to RSS feed")
  const rssVideos = await getVideosFromRSS(8)

  const result: YouTubeStatus = {
    isLive: false, // cannot determine without API
    liveVideo: null,
    latestVideo: rssVideos[0] ?? null,
    upcomingStreams: [],
    recentVideos: rssVideos.slice(1),
    _source: "rss",
  }

  console.log(`[YouTube] RSS source — ${rssVideos.length} videos, s-maxage=300s`)
  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=30" },
  })
}
