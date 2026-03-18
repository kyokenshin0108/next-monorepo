export type EventSource = "investing" | "hose" | "gso" | "sbv" | "vn_calendar"
export type EventImportance = "high" | "medium" | "low"

export interface EconomicEvent {
  id: string
  source: EventSource
  event_date: string   // 'YYYY-MM-DD'
  event_time: string | null
  title: string
  country: string
  importance: EventImportance
  actual: string | null
  forecast: string | null
  previous: string | null
  url: string | null
  fetched_at: string
}
