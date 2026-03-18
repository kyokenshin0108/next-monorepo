import { createServiceClient } from "@/lib/supabase/server"
import { fetchInvestingEvents } from "./fetch-investing"
import { fetchHoseEvents } from "./fetch-hose"
import { fetchGsoEvents } from "./fetch-gso"
import type { EventSource } from "./types"

export interface EventIngestResult {
  source: EventSource | string
  fetched: number
  inserted: number
  errors: string[]
}

interface EventRow {
  source: string
  event_date: string
  event_time: string | null
  title: string
  country: string
  importance: string
  actual: string | null
  forecast: string | null
  previous: string | null
  url: string | null
  fetched_at: string
}

async function ingestSource(
  supabase: ReturnType<typeof createServiceClient>,
  rows: EventRow[],
  source: string
): Promise<EventIngestResult> {
  const result: EventIngestResult = {
    source,
    fetched: rows.length,
    inserted: 0,
    errors: [],
  }

  for (const row of rows) {
    try {
      const { error } = await supabase.from("economic_events").insert(row)
      if (!error) {
        result.inserted++
      } else if (error.code !== "23505") {
        result.errors.push(error.message)
      }
    } catch (err) {
      result.errors.push(err instanceof Error ? err.message : String(err))
    }
  }

  return result
}

export async function ingestAllEventSources(): Promise<EventIngestResult[]> {
  const supabase = createServiceClient()
  const now = new Date().toISOString()

  // Fetch all sources in parallel — each returns [] on failure
  const [investingRaw, hoseRaw, gsoRaw] = await Promise.all([
    fetchInvestingEvents(),
    fetchHoseEvents(),
    fetchGsoEvents(),
  ])

  const toRow = (ev: {
    source: string
    event_date: string
    event_time: string | null
    title: string
    country: string
    importance: string
    actual: string | null
    forecast: string | null
    previous: string | null
    url: string | null
  }): EventRow => ({
    source: ev.source,
    event_date: ev.event_date,
    event_time: ev.event_time,
    title: ev.title,
    country: ev.country,
    importance: ev.importance,
    actual: ev.actual,
    forecast: ev.forecast,
    previous: ev.previous,
    url: ev.url,
    fetched_at: now,
  })

  const results = await Promise.all([
    ingestSource(supabase, investingRaw.map(toRow), "investing"),
    ingestSource(supabase, hoseRaw.map(toRow), "hose"),
    ingestSource(supabase, gsoRaw.map(toRow), "gso"),
  ])

  return results
}
