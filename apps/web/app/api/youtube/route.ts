import { NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY
const SEARCH_BASE = "https://www.googleapis.com/youtube/v3/search"
const VIDEOS_BASE = "https://www.googleapis.com/youtube/v3/videos"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSearchItem(item: any): YouTubeVideo {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description ?? "",
    thumbnail:
      item.snippet.thumbnails?.high?.url ||
      item.snippet.thumbnails?.medium?.url ||
      "",
    publishedAt: item.snippet.publishedAt,
    channelTitle: item.snippet.channelTitle,
  }
}

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

const PLAYLIST_BASE = "https://www.googleapis.com/youtube/v3/playlistItems"

/**
 * Fetch up to `limit` regular (non-Short, non-livestream) videos from the channel.
 *
 * Strategy (quota-efficient — 2 units total instead of 100+):
 *  1. playlistItems.list on the uploads playlist (UC→UU prefix) — 1 unit, maxResults=20.
 *  2. Batch-call Videos API (contentDetails + liveStreamingDetails) for all IDs — 1 unit.
 *  3. Discard if liveStreamingDetails exists (was/is a livestream).
 *  4. Discard if duration < 60 s (YouTube Short).
 *  5. Return the first `limit` survivors.
 */
async function getRecentRegularVideos(limit = 7): Promise<YouTubeVideo[]> {
  // Uploads playlist: replace leading "UC" with "UU"
  const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU")

  // Step 1 — fetch playlist items (1 quota unit)
  const playlistRes = await fetch(
    `${PLAYLIST_BASE}?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )
  const playlistData = await playlistRes.json()

  if (playlistData.error) {
    console.error("YouTube playlistItems error:", playlistData.error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playlistItems: any[] = playlistData.items ?? []
  if (playlistItems.length === 0) return []

  // Extract video IDs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ids = playlistItems.map((item: any) => item.contentDetails?.videoId as string).filter(Boolean)
  if (ids.length === 0) return []

  // Step 2 — batch fetch contentDetails + liveStreamingDetails (1 quota unit)
  const detailsRes = await fetch(
    `${VIDEOS_BASE}?part=snippet,contentDetails,liveStreamingDetails&id=${ids.join(",")}&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )
  const detailsData = await detailsRes.json()

  if (detailsData.error) {
    console.error("YouTube videos error:", detailsData.error)
    return []
  }

  // Steps 3 & 4 — filter and collect up to `limit`
  const results: YouTubeVideo[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const item of detailsData.items ?? [] as any[]) {
    if (results.length >= limit) break
    // Skip livestreams (liveStreamingDetails is only present on livestream videos)
    if (item.liveStreamingDetails != null) continue
    // Skip Shorts (duration < 60 s)
    const durationSecs = parseDurationSeconds(
      (item.contentDetails?.duration as string) ?? ""
    )
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

  return results
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing YOUTUBE_API_KEY" }, { status: 500 })
  }

  try {
    // ── Check if channel is currently live ──────────────────────────
    const liveRes = await fetch(
      `${SEARCH_BASE}?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    )
    const liveData = await liveRes.json()
    const liveItems = liveData.items ?? []

    if (liveItems.length > 0) {
      // Channel is currently live — fetch recent regular videos in parallel
      const recentVideos = await getRecentRegularVideos(7)
      return NextResponse.json({
        isLive: true,
        liveVideo: mapSearchItem(liveItems[0]),
        latestVideo: null,
        upcomingStreams: [],
        recentVideos,
      } as YouTubeStatus)
    }

    // ── Not live — fetch latest video + upcoming streams + recent regular videos ──
    const [latestRes, upcomingRes, recentVideos] = await Promise.all([
      fetch(
        `${SEARCH_BASE}?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=1&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `${SEARCH_BASE}?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&type=video&order=date&maxResults=5&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      ),
      getRecentRegularVideos(7),
    ])

    const [latestData, upcomingData] = await Promise.all([
      latestRes.json(),
      upcomingRes.json(),
    ])

    const latestItems = latestData.items ?? []
    const upcomingItems = upcomingData.items ?? []

    return NextResponse.json({
      isLive: false,
      liveVideo: null,
      latestVideo: latestItems.length > 0 ? mapSearchItem(latestItems[0]) : null,
      upcomingStreams: upcomingItems.map(mapSearchItem),
      recentVideos,
    } as YouTubeStatus)
  } catch (err) {
    console.error("YouTube API error:", err)
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 })
  }
}
