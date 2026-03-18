/**
 * Vietnamese Economic Calendar — static schedule generator
 *
 * Since GSO / SBV websites are frequently blocked or restructured, this module
 * generates a deterministic list of upcoming Vietnamese economic events based on
 * known, fixed release schedules.
 *
 * Publication rules used:
 *  - Monthly stats (CPI, trade, industrial output, retail sales):
 *      Released on the 6th of each month for the PREVIOUS month.
 *      e.g. on 06/04 → data for tháng 3.
 *  - Quarterly GDP:
 *      Released on the 28th of the first month of the NEXT quarter.
 *      Q1 → 28/04 | Q2 → 28/07 | Q3 → 28/10 | Q4 → 28/01 next year
 *  - SBV monetary-policy meeting:
 *      Held on the 15th of each month (approximate; NHNN does not publish a
 *      fixed schedule, but meets at least monthly).
 *  - SBV reference exchange-rate review:
 *      1st business day of each month (~the 2nd when 1st is weekend).
 */

import type { EventImportance } from "./types"

interface VnEvent {
  source: "gso" | "sbv" | "vn_calendar"
  event_date: string      // YYYY-MM-DD
  event_time: string | null
  title: string
  country: "Việt Nam"
  importance: EventImportance
  actual: null
  forecast: null
  previous: null
  url: string | null
}

// ── helpers ───────────────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function ymd(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`
}

/** Clamp day to the last valid day of the month. */
function clampDay(year: number, month: number, day: number): number {
  const last = new Date(year, month, 0).getDate() // day=0 → last day of previous month
  return Math.min(day, last)
}

/** Month name in Vietnamese, 1-indexed. */
const MONTH_VI = [
  "", "1", "2", "3", "4", "5", "6",
  "7", "8", "9", "10", "11", "12",
]

/** Quarter number (1–4) from month (1–12). */
function quarterOf(month: number) {
  return Math.ceil(month / 3)
}

// ── generators ────────────────────────────────────────────────────────────────

/**
 * Generate monthly GSO statistical releases for months whose release date
 * falls within [fromDate, toDate] (YYYY-MM-DD strings).
 */
function generateMonthlyGso(fromDate: string, toDate: string): VnEvent[] {
  const events: VnEvent[] = []
  const from = new Date(fromDate)
  const to = new Date(toDate)

  // Iterate through months: for each month M in [from-1 month, to],
  // the release for month M happens on the 6th of month M+1.
  // So to find all releases in [from, to], iterate data months from
  // (from.year, from.month-1) to (to.year, to.month).
  const start = new Date(from.getFullYear(), from.getMonth() - 1, 1)
  const end   = new Date(to.getFullYear(), to.getMonth(), 1)

  for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
    const dataYear  = d.getFullYear()
    const dataMonth = d.getMonth() + 1       // 1-indexed month the data is FOR
    const relYear   = dataMonth === 12 ? dataYear + 1 : dataYear
    const relMonth  = dataMonth === 12 ? 1 : dataMonth + 1
    const releaseDate = ymd(relYear, relMonth, 6)

    if (releaseDate < fromDate || releaseDate > toDate) continue

    const label = `tháng ${MONTH_VI[dataMonth]}/${dataYear}`

    // CPI
    events.push({
      source: "gso",
      event_date: releaseDate,
      event_time: "09:00",
      title: `Công bố CPI ${label}`,
      country: "Việt Nam",
      importance: "high",
      actual: null, forecast: null, previous: null,
      url: "https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/",
    })

    // Xuất nhập khẩu
    events.push({
      source: "gso",
      event_date: releaseDate,
      event_time: "09:00",
      title: `Xuất nhập khẩu hàng hóa ${label}`,
      country: "Việt Nam",
      importance: "medium",
      actual: null, forecast: null, previous: null,
      url: "https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/",
    })

    // Sản xuất công nghiệp
    events.push({
      source: "gso",
      event_date: releaseDate,
      event_time: "09:00",
      title: `Sản xuất công nghiệp ${label}`,
      country: "Việt Nam",
      importance: "medium",
      actual: null, forecast: null, previous: null,
      url: "https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/",
    })

    // Bán lẻ hàng hóa & doanh thu dịch vụ
    events.push({
      source: "gso",
      event_date: releaseDate,
      event_time: "09:00",
      title: `Bán lẻ hàng hóa và doanh thu dịch vụ ${label}`,
      country: "Việt Nam",
      importance: "low",
      actual: null, forecast: null, previous: null,
      url: "https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/",
    })
  }

  return events
}

/**
 * Generate quarterly GDP releases within [fromDate, toDate].
 * Q1 → 28/04 | Q2 → 28/07 | Q3 → 28/10 | Q4 → 28/01 next year
 */
function generateQuarterlyGdp(fromDate: string, toDate: string): VnEvent[] {
  const events: VnEvent[] = []

  // Release months for each quarter (month of RELEASE, not data end month)
  const GDP_RELEASES: Array<[number, number]> = [
    [4, 28],  // Q1: April 28
    [7, 28],  // Q2: July 28
    [10, 28], // Q3: October 28
    [1, 28],  // Q4: January 28 (next year)
  ]

  const fromYear = parseInt(fromDate.slice(0, 4))
  const toYear   = parseInt(toDate.slice(0, 4))

  for (let year = fromYear; year <= toYear + 1; year++) {
    GDP_RELEASES.forEach(([relMonth, relDay], idx) => {
      const quarter = idx + 1
      // For Q4, the release is in January of the NEXT year
      const releaseYear = quarter === 4 ? year : year
      const dataYear    = quarter === 4 ? year - 1 : year

      const day = clampDay(releaseYear, relMonth, relDay)
      const releaseDate = ymd(releaseYear, relMonth, day)

      if (releaseDate < fromDate || releaseDate > toDate) return

      events.push({
        source: "gso",
        event_date: releaseDate,
        event_time: "09:00",
        title: `GDP quý ${quarter}/${dataYear} (sơ bộ)`,
        country: "Việt Nam",
        importance: "high",
        actual: null, forecast: null, previous: null,
        url: "https://www.gso.gov.vn/chuyen-muc/tin-tuc-thong-ke/",
      })
    })
  }

  return events
}

/**
 * Generate SBV monetary-policy and exchange-rate events within [fromDate, toDate].
 * - 15th of each month: NHNN monetary-policy meeting
 * - 2nd of each month: SBV reference exchange rate review
 */
function generateSbvEvents(fromDate: string, toDate: string): VnEvent[] {
  const events: VnEvent[] = []
  const from = new Date(fromDate)
  const to   = new Date(toDate)

  const start = new Date(from.getFullYear(), from.getMonth(), 1)
  const end   = new Date(to.getFullYear(),   to.getMonth(),   1)

  for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
    const year  = d.getFullYear()
    const month = d.getMonth() + 1

    // Monetary-policy meeting — 15th
    const meetingDate = ymd(year, month, 15)
    if (meetingDate >= fromDate && meetingDate <= toDate) {
      events.push({
        source: "sbv",
        event_date: meetingDate,
        event_time: "08:00",
        title: `Họp điều hành chính sách tiền tệ NHNN tháng ${MONTH_VI[month]}/${year}`,
        country: "Việt Nam",
        importance: "high",
        actual: null, forecast: null, previous: null,
        url: "https://www.sbv.gov.vn",
      })
    }

    // Reference exchange-rate review — 2nd (approx. first business day)
    const fxDate = ymd(year, month, 2)
    if (fxDate >= fromDate && fxDate <= toDate) {
      events.push({
        source: "sbv",
        event_date: fxDate,
        event_time: "08:00",
        title: `Tỷ giá tham chiếu USD/VND tháng ${MONTH_VI[month]}/${year}`,
        country: "Việt Nam",
        importance: "medium",
        actual: null, forecast: null, previous: null,
        url: "https://www.sbv.gov.vn/webcenter/portal/vi/menu/trangchu/tk/tghdjnh",
      })
    }

    // Quarterly: if this is the first month of a quarter → interest rate decision
    if (month % 3 === 1) {
      const quarter = quarterOf(month)
      const rateDate = ymd(year, month, 20)
      if (rateDate >= fromDate && rateDate <= toDate) {
        events.push({
          source: "sbv",
          event_date: rateDate,
          event_time: "08:00",
          title: `Quyết định lãi suất điều hành NHNN Q${quarter}/${year}`,
          country: "Việt Nam",
          importance: "high",
          actual: null, forecast: null, previous: null,
          url: "https://www.sbv.gov.vn",
        })
      }
    }
  }

  return events
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Return all Vietnamese economic calendar events for the next `days` days.
 * Always succeeds (no network calls).
 */
export function fetchVnCalendarEvents(days = 90): VnEvent[] {
  const today   = new Date()
  const fromDate = today.toISOString().slice(0, 10)

  const future = new Date(today)
  future.setDate(future.getDate() + days)
  const toDate = future.toISOString().slice(0, 10)

  const events: VnEvent[] = [
    ...generateMonthlyGso(fromDate, toDate),
    ...generateQuarterlyGdp(fromDate, toDate),
    ...generateSbvEvents(fromDate, toDate),
  ]

  // Sort by date
  events.sort((a, b) => a.event_date.localeCompare(b.event_date))

  console.log(`[vn-calendar] Generated ${events.length} events (${fromDate} → ${toDate})`)
  return events
}
