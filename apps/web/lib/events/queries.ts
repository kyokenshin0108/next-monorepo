import { createAnonClient } from "@/lib/supabase/server"
import type { EconomicEvent } from "./types"

/**
 * Get the next N upcoming events starting from today, sorted by date/time ASC.
 */
export async function getUpcomingEvents(limit = 40): Promise<EconomicEvent[]> {
  const supabase = createAnonClient()

  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from("economic_events")
    .select("*")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true, nullsFirst: false })
    .limit(limit)

  if (error) {
    console.error("[events/queries] getUpcomingEvents error:", error.message)
    return []
  }

  return (data ?? []) as EconomicEvent[]
}

/**
 * Get events for the current week (Monday to Sunday).
 */
export async function getThisWeekEvents(): Promise<EconomicEvent[]> {
  const supabase = createAnonClient()

  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sun, 1 = Mon, ...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const dateFrom = monday.toISOString().slice(0, 10)
  const dateTo = sunday.toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from("economic_events")
    .select("*")
    .gte("event_date", dateFrom)
    .lte("event_date", dateTo)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true, nullsFirst: false })

  if (error) {
    console.error("[events/queries] getThisWeekEvents error:", error.message)
    return []
  }

  return (data ?? []) as EconomicEvent[]
}
