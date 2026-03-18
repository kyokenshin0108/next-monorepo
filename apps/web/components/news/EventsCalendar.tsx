"use client"

import { useState } from "react"
import type { EconomicEvent } from "@/lib/events/types"

const PAGE_SIZE = 7

// ── Translation lookup ────────────────────────────────────────────────────────
// Each entry: [matchSubstring (lowercase), vietnameseName, meaning]
type EventEntry = [string, string, string]

const EVENT_MAP: EventEntry[] = [
  // US inflation
  ["core cpi (yoy)", "Lạm phát lõi (YoY)", "Lạm phát lõi so với cùng kỳ năm trước (loại thực phẩm & năng lượng)"],
  ["core cpi (mom)", "Lạm phát lõi (MoM)", "Lạm phát lõi so với tháng trước"],
  ["cpi (yoy)", "Chỉ số giá tiêu dùng (YoY)", "Lạm phát so với cùng kỳ năm trước"],
  ["cpi (mom)", "Chỉ số giá tiêu dùng (MoM)", "Lạm phát so với tháng trước"],
  ["core pce", "PCE lõi", "Lạm phát PCE lõi — thước đo ưa thích của Fed"],
  ["pce price", "Chỉ số giá PCE", "Chỉ số giá chi tiêu cá nhân"],
  ["ppi (mom)", "Chỉ số giá sản xuất (MoM)", "Giá sản xuất so với tháng trước"],
  ["ppi (yoy)", "Chỉ số giá sản xuất (YoY)", "Giá sản xuất so với năm trước"],

  // Interest rates & central banks
  ["interest rate projection", "Dự báo lãi suất Fed", "Dự báo lãi suất chính sách của Fed (dot plot)"],
  ["fed funds rate", "Lãi suất quỹ Fed", "Quyết định lãi suất của Cục Dự trữ Liên bang Mỹ"],
  ["fomc minutes", "Biên bản họp FOMC", "Nội dung chi tiết cuộc họp chính sách tiền tệ Fed"],
  ["fomc", "Họp FOMC", "Cuộc họp định kỳ về chính sách tiền tệ của Fed"],
  ["boj rate", "Lãi suất BOJ", "Quyết định lãi suất của Ngân hàng Trung ương Nhật Bản"],
  ["ecb rate", "Lãi suất ECB", "Quyết định lãi suất của Ngân hàng Trung ương châu Âu"],
  ["boe rate", "Lãi suất BOE", "Quyết định lãi suất của Ngân hàng Trung ương Anh"],
  ["pboc rate", "Lãi suất PBOC", "Quyết định lãi suất của Ngân hàng Nhân dân Trung Quốc"],
  ["interest rate", "Quyết định lãi suất", "Quyết định lãi suất chính sách của ngân hàng trung ương"],
  ["monetary policy", "Chính sách tiền tệ", "Quyết định chính sách tiền tệ của ngân hàng trung ương"],

  // Employment
  ["non-farm payroll", "Bảng lương phi nông nghiệp", "Số việc làm mới ngoài khu vực nông nghiệp Mỹ"],
  ["nonfarm payroll", "Bảng lương phi nông nghiệp", "Số việc làm mới ngoài khu vực nông nghiệp Mỹ"],
  ["adp employment", "Việc làm ADP", "Ước tính thay đổi việc làm khu vực tư nhân từ ADP"],
  ["jolts job openings", "Vị trí tuyển dụng JOLTs", "Số vị trí việc làm đang tuyển dụng tại Mỹ"],
  ["initial jobless claims", "Đơn xin trợ cấp thất nghiệp lần đầu", "Số người nộp đơn xin trợ cấp thất nghiệp lần đầu trong tuần"],
  ["continuing jobless claims", "Đơn xin trợ cấp thất nghiệp tiếp tục", "Số người đang nhận trợ cấp thất nghiệp"],
  ["jobless claims", "Đơn xin trợ cấp thất nghiệp", "Số đơn xin trợ cấp thất nghiệp tại Mỹ"],
  ["unemployment rate", "Tỷ lệ thất nghiệp", "Tỷ lệ phần trăm lực lượng lao động đang thất nghiệp"],
  ["average hourly earnings", "Thu nhập giờ trung bình", "Tốc độ tăng tiền lương — ảnh hưởng đến lạm phát"],
  ["challenger job cuts", "Cắt giảm việc làm Challenger", "Số kế hoạch sa thải được công bố bởi các công ty lớn"],

  // GDP & growth
  ["gdp (qoq)", "Tăng trưởng GDP (QoQ)", "Tăng trưởng kinh tế so với quý trước"],
  ["gdp (yoy)", "Tăng trưởng GDP (YoY)", "Tăng trưởng kinh tế so với cùng kỳ năm trước"],
  ["gdp growth", "Tăng trưởng GDP", "Tốc độ tăng trưởng tổng sản phẩm quốc nội"],
  ["gdp", "GDP", "Tổng sản phẩm quốc nội — thước đo tổng quy mô nền kinh tế"],

  // PMI
  ["ism manufacturing pmi", "PMI Sản xuất ISM", "Chỉ số quản lý mua hàng ngành sản xuất Mỹ (>50 = mở rộng)"],
  ["ism non-manufacturing pmi", "PMI Dịch vụ ISM", "Chỉ số quản lý mua hàng ngành dịch vụ Mỹ"],
  ["ism services pmi", "PMI Dịch vụ ISM", "Chỉ số quản lý mua hàng ngành dịch vụ Mỹ"],
  ["caixin manufacturing pmi", "PMI Sản xuất Caixin (TQ)", "Chỉ số PMI sản xuất Trung Quốc từ Caixin"],
  ["caixin services pmi", "PMI Dịch vụ Caixin (TQ)", "Chỉ số PMI dịch vụ Trung Quốc từ Caixin"],
  ["nbs manufacturing pmi", "PMI Sản xuất NBS (TQ)", "Chỉ số PMI sản xuất chính thức của Trung Quốc"],
  ["s&p global manufacturing pmi", "PMI Sản xuất S&P Global", "Chỉ số quản lý mua hàng ngành sản xuất từ S&P Global"],
  ["s&p global services pmi", "PMI Dịch vụ S&P Global", "Chỉ số quản lý mua hàng ngành dịch vụ từ S&P Global"],
  ["manufacturing pmi", "PMI Sản xuất", "Chỉ số quản lý mua hàng ngành sản xuất (>50 = mở rộng)"],
  ["services pmi", "PMI Dịch vụ", "Chỉ số quản lý mua hàng ngành dịch vụ (>50 = mở rộng)"],
  ["composite pmi", "PMI Tổng hợp", "Chỉ số PMI tổng hợp cả sản xuất và dịch vụ"],
  ["pmi", "PMI", "Chỉ số quản lý mua hàng — đo lường sức khỏe ngành sản xuất/dịch vụ"],

  // Consumer
  ["michigan consumer sentiment", "Tâm lý tiêu dùng Michigan", "Chỉ số tâm lý người tiêu dùng Mỹ từ ĐH Michigan"],
  ["cb consumer confidence", "Niềm tin tiêu dùng CB", "Chỉ số niềm tin người tiêu dùng từ Conference Board"],
  ["consumer confidence", "Niềm tin tiêu dùng", "Đo lường mức độ lạc quan của người tiêu dùng về nền kinh tế"],
  ["retail sales (mom)", "Doanh số bán lẻ (MoM)", "Thay đổi doanh số bán lẻ so với tháng trước"],
  ["retail sales", "Doanh số bán lẻ", "Tổng giá trị hàng hóa bán lẻ — phản ánh sức chi tiêu"],
  ["personal income", "Thu nhập cá nhân", "Thay đổi tổng thu nhập cá nhân của người dân Mỹ"],
  ["personal spending", "Chi tiêu cá nhân", "Thay đổi chi tiêu của người tiêu dùng Mỹ"],

  // Energy
  ["crude oil inventories", "Tồn kho dầu thô Mỹ", "Lượng dầu thô dự trữ tại Mỹ — ảnh hưởng đến giá dầu"],
  ["natural gas storage", "Tồn kho khí tự nhiên", "Lượng khí tự nhiên dự trữ tại Mỹ"],
  ["eia crude", "Tồn kho dầu thô EIA", "Báo cáo tồn kho dầu thô hàng tuần từ EIA"],

  // Housing
  ["housing starts", "Khởi công nhà ở", "Số lượng nhà mới bắt đầu xây dựng"],
  ["building permits", "Giấy phép xây dựng", "Số giấy phép xây dựng nhà mới được cấp"],
  ["existing home sales", "Doanh số nhà cũ", "Số lượng nhà cũ bán được trong tháng"],
  ["new home sales", "Doanh số nhà mới", "Số lượng nhà mới bán được trong tháng"],
  ["pending home sales", "Nhà chờ bán", "Số hợp đồng nhà ở đã ký nhưng chưa hoàn tất"],
  ["case-shiller home price", "Chỉ số giá nhà Case-Shiller", "Chỉ số giá bất động sản nhà ở tại 20 thành phố Mỹ"],

  // Industry & trade
  ["durable goods orders", "Đơn hàng hàng lâu bền", "Đơn đặt hàng sản phẩm có tuổi thọ > 3 năm"],
  ["factory orders", "Đơn hàng nhà máy", "Tổng giá trị đơn hàng đặt tại các nhà máy Mỹ"],
  ["industrial production", "Sản xuất công nghiệp", "Sản lượng của ngành sản xuất, khai thác và tiện ích"],
  ["capacity utilization", "Tỷ lệ sử dụng công suất", "Mức độ sử dụng năng lực sản xuất của nền kinh tế"],
  ["trade balance", "Cán cân thương mại", "Chênh lệch giữa xuất khẩu và nhập khẩu hàng hóa"],
  ["current account", "Cán cân vãng lai", "Bao gồm thương mại hàng hóa, dịch vụ và thu nhập"],
  ["exports", "Kim ngạch xuất khẩu", "Tổng giá trị hàng hóa và dịch vụ xuất khẩu"],
  ["imports", "Kim ngạch nhập khẩu", "Tổng giá trị hàng hóa và dịch vụ nhập khẩu"],

  // Business surveys
  ["empire state manufacturing", "Chỉ số sản xuất Empire State", "Khảo sát hoạt động sản xuất tại bang New York"],
  ["philly fed", "Chỉ số sản xuất Philadelphia Fed", "Khảo sát hoạt động sản xuất tại vùng Philadelphia"],
  ["nfib small business", "Niềm tin doanh nghiệp nhỏ NFIB", "Chỉ số lạc quan của các doanh nghiệp nhỏ Mỹ"],
  ["productivity", "Năng suất lao động", "Sản lượng sản xuất trên mỗi giờ làm việc"],
  ["unit labor costs", "Chi phí lao động đơn vị", "Chi phí lao động để sản xuất một đơn vị đầu ra"],

  // Japan
  ["tankan", "Khảo sát Tankan (Nhật)", "Khảo sát kinh doanh quý của BOJ — thước đo sức khỏe kinh tế Nhật"],
  ["boj", "BOJ (Nhật)", "Thông tin từ Ngân hàng Trung ương Nhật Bản"],

  // Vietnam
  ["cpi việt nam", "CPI Việt Nam", "Chỉ số giá tiêu dùng tại Việt Nam"],
  ["gdp việt nam", "GDP Việt Nam", "Tốc độ tăng trưởng kinh tế Việt Nam"],
  ["lãi suất", "Lãi suất", "Quyết định lãi suất điều hành của NHNN"],
  ["tăng trưởng", "Tăng trưởng kinh tế", "Chỉ số tăng trưởng tổng sản phẩm quốc nội"],
]

function translateEvent(title: string): { vi: string; meaning: string } {
  const lower = title.toLowerCase()
  for (const [key, vi, meaning] of EVENT_MAP) {
    if (lower.includes(key)) {
      return { vi, meaning }
    }
  }
  return { vi: title, meaning: "—" }
}

// ── Country emoji ─────────────────────────────────────────────────────────────
const COUNTRY_EMOJI: Record<string, string> = {
  "Việt Nam": "🇻🇳",
  "Mỹ": "🇺🇸",
  "EU": "🇪🇺",
  "Trung Quốc": "🇨🇳",
  "Nhật Bản": "🇯🇵",
  "Anh": "🇬🇧",
}

function formatEventDate(isoDate: string): string {
  const parts = isoDate.split("-")
  if (parts.length !== 3) return isoDate
  const [y, m, d] = parts
  return `${d}/${m}/${y}`
}


interface Props {
  events: EconomicEvent[]
}

function getWeekRange(): string {
  const today = new Date()
  const day = today.getDay() // 0=Sun
  const diffToMon = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMon)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`
  return `Tuần ${fmt(monday)} - ${fmt(sunday)}/${sunday.getFullYear()}`
}

export default function EventsCalendar({ events }: Props) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(events.length / PAGE_SIZE)
  const slice = events.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const weekRange = getWeekRange()

  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-6">
        Chưa có dữ liệu. Hệ thống sẽ tự động cập nhật.
      </p>
    )
  }

  return (
    <div>
      {/* Week header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">{weekRange}</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
            Tuần này
          </button>
          <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Tuần sau
          </button>
          <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Tháng
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Ngày", "Giờ", "Sự kiện", "Ý nghĩa", "Quốc gia"].map((h) => (
                <th
                  key={h}
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slice.map((ev) => {
              const emoji = COUNTRY_EMOJI[ev.country] ?? ""
              const { vi, meaning } = translateEvent(ev.title)
              const titleDisplay = vi !== ev.title ? `${vi} (${ev.title})` : ev.title

              return (
                <tr key={ev.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                    {formatEventDate(ev.event_date)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                    {ev.event_time ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800 max-w-xs">
                    {ev.url ? (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition"
                      >
                        {titleDisplay}
                      </a>
                    ) : (
                      titleDisplay
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 max-w-xs">
                    {meaning}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                    {emoji ? `${ev.country} ${emoji}` : ev.country}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 pb-2">
          <p className="text-sm text-gray-500">
            Trang {page + 1} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Trang trước"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                  i === page
                    ? "bg-primary text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Trang sau"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
