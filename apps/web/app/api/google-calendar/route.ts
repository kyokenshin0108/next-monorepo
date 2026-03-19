import { NextRequest, NextResponse } from "next/server"

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  description?: string
  htmlLink?: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()))
  const month = parseInt(searchParams.get("month") || String(new Date().getMonth()))

  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const apiKey = process.env.YOUTUBE_API_KEY // same Google Cloud API key

  if (!calendarId || !apiKey || calendarId.startsWith("your_") || calendarId.startsWith("@REPLACE")) {
    return NextResponse.json({ events: [] })
  }

  const timeMin = new Date(year, month, 1).toISOString()
  const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString()

  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&maxResults=100`,
      { next: { revalidate: 300 } }
    )

    if (!res.ok) {
      console.error("Google Calendar API error:", res.status, await res.text())
      return NextResponse.json({ events: [] })
    }

    const data = await res.json()
    const events: CalendarEvent[] = (data.items || []).map((item: {
      id: string
      summary?: string
      start?: { dateTime?: string; date?: string }
      end?: { dateTime?: string; date?: string }
      description?: string
      htmlLink?: string
    }) => ({
      id: item.id,
      title: item.summary || "Live Stream",
      start: item.start?.dateTime || item.start?.date || "",
      end: item.end?.dateTime || item.end?.date || "",
      description: item.description || "",
      htmlLink: item.htmlLink || "",
    }))

    return NextResponse.json({ events })
  } catch (err) {
    console.error("Google Calendar fetch error:", err)
    return NextResponse.json({ events: [] })
  }
}
