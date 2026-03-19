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

/**
 * Fetch up to `limit` regular (non-Short, non-livestream) videos from the channel.
 *
 * Strategy:
 *  1. Search for 20 recent videos (type=video, order=date).
 *  2. Discard any where liveBroadcastContent !== 'none' (active live / upcoming).
 *  3. Batch-call Videos API (contentDetails + liveStreamingDetails) for the rest.
 *  4. Discard if liveStreamingDetails exists (was/is a livestream).
 *  5. Discard if duration < 60 s (YouTube Short).
 *  6. Return the first `limit` survivors.
 */
async function getRecentRegularVideos(limit = 7): Promise<YouTubeVideo[]> {
  // Step 1 — search
  const searchRes = await fetch(
    `${SEARCH_BASE}?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )
  const searchData = await searchRes.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchItems: any[] = searchData.items ?? []

  // Step 2 — keep only completed (non-live, non-upcoming) from search metadata
  const candidates = searchItems.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => item.snippet?.liveBroadcastContent === "none"
  )

  if (candidates.length === 0) return []

  // Step 3 — batch fetch content details
  const ids = candidates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any) => item.id.videoId as string)
    .join(",")

  const detailsRes = await fetch(
    `${VIDEOS_BASE}?part=contentDetails,liveStreamingDetails&id=${ids}&key=${API_KEY}`,
    { next: { revalidate: 300 } }
  )
  const detailsData = await detailsRes.json()

  // Build a lookup map: videoId → { durationSecs, wasLivestream }
  const detailsMap = new Map<string, { durationSecs: number; wasLivestream: boolean }>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const item of detailsData.items ?? [] as any[]) {
    detailsMap.set(item.id as string, {
      durationSecs: parseDurationSeconds(
        (item.contentDetails?.duration as string) ?? ""
      ),
      // liveStreamingDetails is only present on livestream videos
      wasLivestream: item.liveStreamingDetails != null,
    })
  }

  // Steps 4 & 5 — filter and collect up to `limit`
  const results: YouTubeVideo[] = []
  for (const item of candidates) {
    if (results.length >= limit) break
    const details = detailsMap.get(item.id.videoId as string)
    if (!details) continue                   // details missing → skip
    if (details.wasLivestream) continue      // was a livestream → skip
    if (details.durationSecs < 60) continue  // Short (< 60 s) → skip
    results.push(mapSearchItem(item))
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
