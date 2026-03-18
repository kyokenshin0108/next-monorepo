/**
 * Automatic news categorizer — keyword-scoring approach.
 *
 * Categories (slug → display):
 *   domestic      → Thị Trường Trong Nước
 *   international → Thị Trường Quốc Tế
 *   company       → Doanh Nghiệp
 *   industry      → Ngành
 *   chung-khoan   → (default / uncategorised)
 */

export type NewsCategory =
  | "domestic"
  | "international"
  | "company"
  | "industry"
  | "chung-khoan"

// Each rule is [keyword (lowercase), weight]
type Rule = [string, number]

const DOMESTIC_RULES: Rule[] = [
  // Indices
  ["vn-index", 4], ["vnindex", 4], ["hnx30", 3], ["vn30", 3],
  ["hose", 3], ["hnx", 3], ["upcom", 3],
  // Regulators
  ["ngân hàng nhà nước", 4], ["nhnn", 4], ["sbv", 3],
  ["ủy ban chứng khoán", 4], ["ubck", 3], ["ssc", 2],
  ["bộ tài chính", 3], ["sở giao dịch chứng khoán", 3],
  // Market terms
  ["chứng khoán việt", 3], ["ttck việt", 3], ["thị trường việt nam", 3],
  ["thanh khoản", 2], ["khớp lệnh", 3], ["điểm số", 2],
  ["vnd", 2], ["đồng việt nam", 2], ["tỷ giá vnd", 3],
  ["phiên giao dịch", 3], ["lực cầu", 2], ["dòng tiền nội", 2],
  ["margin call", 2], ["room ngoại", 3],
  // Named VN stocks (very strong signal)
  ["vcb", 3], ["bid", 3], ["ctx", 2], ["hpg", 3], ["vnm", 3],
  ["vhm", 3], ["vre", 3], ["mwg", 3], ["fpt", 2], ["pnj", 2],
]

const INTERNATIONAL_RULES: Rule[] = [
  // Central banks
  ["fed", 4], ["federal reserve", 4], ["fomc", 4],
  ["ecb", 4], ["boj", 3], ["boe", 3], ["pboc", 3],
  ["ngân hàng trung ương mỹ", 4], ["ngân hàng trung ương châu âu", 4],
  // Indices
  ["dow jones", 4], ["s&p 500", 4], ["s&p500", 4], ["nasdaq", 4],
  ["nikkei", 4], ["dax", 3], ["ftse", 3], ["hang seng", 4],
  ["cac 40", 3], ["shanghai", 3],
  // Currencies / macro
  ["usd", 3], ["eur", 2], ["gbp", 2], ["jpy", 2], ["cny", 2],
  ["wall street", 4], ["phố wall", 4],
  ["lãi suất fed", 4], ["cpi mỹ", 4], ["gdp mỹ", 4],
  ["lạm phát mỹ", 3], ["việc làm mỹ", 3], ["non-farm", 3],
  // Countries (international context)
  ["mỹ tăng", 2], ["mỹ giảm", 2], ["trung quốc tăng", 2], ["trung quốc giảm", 2],
  ["châu âu", 2], ["nhật bản", 2], ["anh quốc", 2],
  ["kinh tế mỹ", 3], ["kinh tế trung quốc", 3], ["kinh tế toàn cầu", 3],
  ["thị trường mỹ", 3], ["thị trường quốc tế", 3], ["thị trường châu á", 3],
  // Commodities
  ["giá dầu thế giới", 3], ["giá vàng thế giới", 3], ["bitcoin", 2],
]

const COMPANY_RULES: Rule[] = [
  // Business actions
  ["phát hành cổ phiếu", 4], ["tăng vốn điều lệ", 4], ["chia cổ tức", 4],
  ["mua lại cổ phiếu", 4], ["esop", 3], ["hủy niêm yết", 4],
  ["niêm yết", 3], ["đăng ký giao dịch", 3], ["chào sàn", 4],
  ["sáp nhập", 4], ["m&a", 4], ["thâu tóm", 4], ["mua lại", 3],
  // Financials
  ["doanh thu", 3], ["lợi nhuận sau thuế", 4], ["lợi nhuận ròng", 4],
  ["kết quả kinh doanh", 4], ["báo cáo tài chính", 4],
  ["eps", 3], ["roe", 3], ["p/e", 3], ["ebitda", 3],
  ["doanh nghiệp", 2], ["tập đoàn", 2], ["công ty cổ phần", 3],
  // Governance
  ["đại hội cổ đông", 4], ["đhcđ", 4], ["hội đồng quản trị", 3], ["hđqt", 3],
  ["tổng giám đốc", 3], ["chủ tịch hđqt", 3], ["ban lãnh đạo", 3],
  ["cổ đông lớn", 3], ["cổ đông chiến lược", 3],
  // Named large VN companies (strong company signal)
  ["vingroup", 4], ["vinhomes", 4], ["vinamilk", 4], ["hòa phát", 4],
  ["vietcombank", 4], ["vpbank", 4], ["techcombank", 4], ["bidv", 4],
  ["agribank", 4], ["vietinbank", 4], ["mb bank", 3], ["acb", 3],
  ["masan", 4], ["đất xanh", 3], ["nam long", 3], ["novaland", 4],
  ["fpt software", 4], ["viettel", 3], ["vnpt", 3], ["evn", 3],
  ["petrovietnam", 4], ["pvn", 3], ["plx", 3], ["pvd", 3],
  ["thaco", 4], ["trường hải", 4], ["sabeco", 3], ["habeco", 3],
]

const INDUSTRY_RULES: Rule[] = [
  // Real estate
  ["bất động sản", 4], ["nhà đất", 3], ["căn hộ", 3], ["chung cư", 3],
  ["dự án nhà ở", 3], ["phân khúc nhà ở", 3], ["thị trường bất động sản", 4],
  ["luật đất đai", 3], ["quy hoạch", 2],
  // Banking / finance (sector)
  ["ngành ngân hàng", 4], ["tín dụng", 3], ["cho vay", 3], ["tiền gửi", 3],
  ["nợ xấu", 4], ["room tín dụng", 4], ["lãi suất cho vay", 3],
  ["bảo hiểm", 3], ["chứng khoán phái sinh", 3],
  // Energy
  ["dầu khí", 4], ["xăng dầu", 3], ["giá dầu", 3], ["dầu thô", 3],
  ["điện mặt trời", 4], ["năng lượng tái tạo", 4], ["điện gió", 4],
  ["ngành điện", 3], ["evn", 2],
  // Steel / materials
  ["ngành thép", 4], ["gang thép", 4], ["giá thép", 3], ["xi măng", 3],
  // Textile
  ["dệt may", 4], ["may mặc", 3], ["xuất khẩu dệt", 3],
  // Technology
  ["công nghệ thông tin", 3], ["phần mềm", 3], ["viễn thông", 3],
  ["trí tuệ nhân tạo", 3], ["ai", 1], ["chip bán dẫn", 4],
  // Retail / consumer
  ["bán lẻ", 3], ["chuỗi bán lẻ", 3], ["siêu thị", 3], ["thương mại điện tử", 3],
  // Agriculture / food
  ["nông nghiệp", 3], ["thủy sản", 3], ["xuất khẩu nông sản", 3],
  ["gạo", 2], ["cà phê xuất khẩu", 3],
  // Pharma / health
  ["dược phẩm", 4], ["y tế", 3], ["bệnh viện", 3],
  // Aviation / logistics
  ["hàng không", 4], ["vietnam airlines", 4], ["vietjet", 4],
  ["logistics", 3], ["cảng biển", 3],
]

// ── scoring engine ─────────────────────────────────────────────────────────────

function score(text: string, rules: Rule[]): number {
  let total = 0
  for (const [kw, w] of rules) {
    if (text.includes(kw)) total += w
  }
  return total
}

/**
 * Classify an article by scoring title (weight ×2) + first 500 chars of content.
 * Returns the category slug with the highest score; defaults to "chung-khoan".
 */
export function classifyArticle(
  title: string,
  summary: string | null,
  content: string | null
): NewsCategory {
  // Build a normalised text blob: title counts double
  const titleLow   = (title ?? "").toLowerCase()
  const summaryLow = (summary ?? "").toLowerCase().slice(0, 300)
  const contentLow = (content ?? "").toLowerCase().slice(0, 500)
  const blob = `${titleLow} ${titleLow} ${summaryLow} ${contentLow}`

  const scores: Record<NewsCategory, number> = {
    domestic:      score(blob, DOMESTIC_RULES),
    international: score(blob, INTERNATIONAL_RULES),
    company:       score(blob, COMPANY_RULES),
    industry:      score(blob, INDUSTRY_RULES),
    "chung-khoan": 0,
  }

  // Find highest score
  let best: NewsCategory = "chung-khoan"
  let bestScore = 2   // minimum threshold to override default

  for (const [cat, s] of Object.entries(scores) as [NewsCategory, number][]) {
    if (cat === "chung-khoan") continue
    if (s > bestScore) {
      bestScore = s
      best = cat
    }
  }

  return best
}
