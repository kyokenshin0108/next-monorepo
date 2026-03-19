import { NextResponse } from "next/server"

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCg1a2KaW4f7c0ThU3Dbho0A"
const API_KEY = process.env.YOUTUBE_API_KEY

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

function mapSnippet(item: { id: { videoId: string }; snippet: { title: string; description: string; thumbnails: { high?: { url: string }; medium?: { url: string } }; publishedAt: string; channelTitle: string } }): YouTubeVideo {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
    publishedAt: item.snippet.publishedAt,
    channelTitle: item.snippet.channelTitle,
  }
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing YOUTUBE_API_KEY" }, { status: 500 })
  }

  const base = "https://www.googleapis.com/youtube/v3/search"

  try {
    // Check if channel is currently live
    const liveRes = await fetch(
      `${base}?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    )
    const liveData = await liveRes.json()
    const liveItems = liveData.items || []

    if (liveItems.length > 0) {
      // Channel is live — also fetch recent videos for sidebar fallback
      const recentRes = await fetch(
        `${base}?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=7&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      )
      const recentData = await recentRes.json()
      return NextResponse.json({
        isLive: true,
        liveVideo: mapSnippet(liveItems[0]),
        latestVideo: null,
        upcomingStreams: [],
        recentVideos: (recentData.items || []).map(mapSnippet),
      } as YouTubeStatus)
    }

    // Not live — fetch latest video, upcoming streams, and recent videos in parallel
    const [latestRes, upcomingRes, recentRes] = await Promise.all([
      fetch(
        `${base}?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=1&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `${base}?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&type=video&order=date&maxResults=5&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `${base}?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=7&key=${API_KEY}`,
        { next: { revalidate: 300 } }
      ),
    ])

    const [latestData, upcomingData, recentData] = await Promise.all([
      latestRes.json(), upcomingRes.json(), recentRes.json(),
    ])

    const latestItems = latestData.items || []
    const upcomingItems = upcomingData.items || []
    const recentItems = recentData.items || []

    return NextResponse.json({
      isLive: false,
      liveVideo: null,
      latestVideo: latestItems.length > 0 ? mapSnippet(latestItems[0]) : null,
      upcomingStreams: upcomingItems.map(mapSnippet),
      recentVideos: recentItems.map(mapSnippet),
    } as YouTubeStatus)
  } catch (err) {
    console.error("YouTube API error:", err)
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 })
  }
}
