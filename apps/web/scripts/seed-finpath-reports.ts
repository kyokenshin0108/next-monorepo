/**
 * Seed 20 sample stock analysis reports into the market_analysis table.
 * Mirrors the data shape that the Finpath.vn scraper produces.
 *
 * Usage (from apps/web directory):
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   npx tsx scripts/seed-finpath-reports.ts
 */

import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌  Missing env: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

// ── helpers ────────────────────────────────────────────────────────────────

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(8, 0, 0, 0)
  return d.toISOString()
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 120)
}

function makeHash(...parts: string[]): string {
  return createHash("sha256").update(parts.join("|")).digest("hex").slice(0, 32)
}

function fmtDateDDMMYYYY(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const yyyy = d.getFullYear()
  return `${dd}${mm}${yyyy}`
}

function mapSentiment(rec: string) {
  if (rec === "BUY") return "bullish"
  if (rec === "SELL") return "bearish"
  return "neutral"
}

// ── seed data ──────────────────────────────────────────────────────────────

interface ReportInput {
  ticker: string
  title: string
  source_name: string
  recommendation: "BUY" | "SELL" | "HOLD"
  target_price: number
  upside_percent: number
  subcategory: string
  excerpt: string
  published_at: string
  is_featured?: boolean
}

const reports: ReportInput[] = [
  {
    ticker: "VNM",
    title: "VNM – Duy trì MUA, giá mục tiêu 85.000 VND: Biên lợi nhuận cải thiện rõ nét Q1/2026",
    source_name: "FPTS",
    recommendation: "BUY",
    target_price: 85000,
    upside_percent: 18.5,
    subcategory: "Hàng tiêu dùng",
    excerpt:
      "Vinamilk ghi nhận biên lợi nhuận gộp cải thiện lên 43,2% trong Q1/2026 nhờ giá sữa nguyên liệu hạ và chiến lược định giá linh hoạt. Chúng tôi duy trì khuyến nghị MUA với giá mục tiêu 85.000 VND.",
    published_at: daysAgo(1),
    is_featured: true,
  },
  {
    ticker: "VCB",
    title: "VCB – MUA với giá mục tiêu 110.000 VND: NIM phục hồi, nợ xấu được kiểm soát tốt",
    source_name: "MBS",
    recommendation: "BUY",
    target_price: 110000,
    upside_percent: 14.2,
    subcategory: "Ngân hàng",
    excerpt:
      "Vietcombank tiếp tục dẫn đầu ngành về chất lượng tài sản với tỷ lệ nợ xấu chỉ 0,98%. NIM phục hồi về 3,1% sau 2 quý điều chỉnh. Chúng tôi nâng giá mục tiêu lên 110.000 VND.",
    published_at: daysAgo(1),
    is_featured: true,
  },
  {
    ticker: "HPG",
    title: "HPG – Nâng lên MUA, giá mục tiêu 32.000 VND: Sản lượng thép xây dựng hồi phục mạnh",
    source_name: "SSI",
    recommendation: "BUY",
    target_price: 32000,
    upside_percent: 22.3,
    subcategory: "Vật liệu xây dựng",
    excerpt:
      "Hòa Phát ghi nhận sản lượng tiêu thụ thép xây dựng tăng 28% YoY trong tháng 2/2026, được hỗ trợ bởi đà phục hồi của ngành bất động sản. Chúng tôi nâng khuyến nghị từ Trung lập lên MUA.",
    published_at: daysAgo(2),
    is_featured: true,
  },
  {
    ticker: "FPT",
    title: "FPT – MUA với giá mục tiêu 145.000 VND: Mảng công nghệ nước ngoài tăng trưởng vượt kỳ vọng",
    source_name: "VCBS",
    recommendation: "BUY",
    target_price: 145000,
    upside_percent: 17.8,
    subcategory: "Công nghệ",
    excerpt:
      "Doanh thu mảng công nghệ nước ngoài của FPT tăng 35% YoY trong 2 tháng đầu năm 2026, đặc biệt tại thị trường Nhật Bản và Mỹ. Chúng tôi duy trì khuyến nghị MUA và nâng giá mục tiêu lên 145.000 VND.",
    published_at: daysAgo(2),
  },
  {
    ticker: "MBB",
    title: "MBB – MUA, giá mục tiêu 28.000 VND: CASA cao nhất hệ thống, ROE dẫn đầu nhóm ngân hàng tư nhân",
    source_name: "ABS",
    recommendation: "BUY",
    target_price: 28000,
    upside_percent: 19.4,
    subcategory: "Ngân hàng",
    excerpt:
      "MB Bank duy trì tỷ lệ CASA ở mức 38,5%, cao nhất trong nhóm ngân hàng tư nhân. ROE năm 2025 đạt 22,1%. Định giá hiện tại P/B 1,4x vẫn hấp dẫn.",
    published_at: daysAgo(3),
  },
  {
    ticker: "VIC",
    title: "VIC – TRUNG LẬP, giá mục tiêu 48.000 VND: Bất động sản phục hồi chậm hơn kỳ vọng",
    source_name: "BSC",
    recommendation: "HOLD",
    target_price: 48000,
    upside_percent: 5.2,
    subcategory: "Bất động sản",
    excerpt:
      "Vingroup đang điều chỉnh kế hoạch bàn giao dự án Vinhomes Grand Park do tốc độ hấp thụ thị trường thấp hơn dự kiến. Chúng tôi hạ khuyến nghị từ MUA xuống Trung lập.",
    published_at: daysAgo(3),
  },
  {
    ticker: "TCB",
    title: "TCB – MUA, giá mục tiêu 38.000 VND: Tăng trưởng tín dụng bứt phá 18% YoY",
    source_name: "FPTS",
    recommendation: "BUY",
    target_price: 38000,
    upside_percent: 21.6,
    subcategory: "Ngân hàng",
    excerpt:
      "Techcombank ghi nhận tăng trưởng tín dụng 18% YoY tính đến cuối tháng 2/2026, vượt xa mức bình quân ngành 12%. Chiến lược cho vay bán lẻ và doanh nghiệp vừa & nhỏ phát huy hiệu quả rõ nét.",
    published_at: daysAgo(4),
  },
  {
    ticker: "GAS",
    title: "GAS – BÁN, giá mục tiêu 72.000 VND: Giá khí thấp và cạnh tranh từ điện tái tạo gây áp lực",
    source_name: "HSC",
    recommendation: "SELL",
    target_price: 72000,
    upside_percent: -8.3,
    subcategory: "Dầu khí",
    excerpt:
      "Giá khí tự nhiên suy yếu do nguồn cung LNG toàn cầu dồi dào, trong khi điện mặt trời và điện gió tiếp tục lấn át thị phần. Chúng tôi hạ xuống BÁN với rủi ro downside đáng kể.",
    published_at: daysAgo(4),
  },
  {
    ticker: "PNJ",
    title: "PNJ – MUA với giá mục tiêu 95.000 VND: Hệ thống bán lẻ mở rộng, biên lãi gộp tốt",
    source_name: "MBS",
    recommendation: "BUY",
    target_price: 95000,
    upside_percent: 16.9,
    subcategory: "Bán lẻ",
    excerpt:
      "Phú Nhuận Jewelry mở thêm 12 cửa hàng mới trong Q1/2026, nâng tổng số lên 398 điểm. Biên lợi nhuận gộp giữ vững ở 21,4% nhờ mix sản phẩm chuyển dịch sang trang sức cao cấp.",
    published_at: daysAgo(5),
  },
  {
    ticker: "MWG",
    title: "MWG – MUA, giá mục tiêu 68.000 VND: Chu kỳ phục hồi điện thoại và điện máy đang đến",
    source_name: "VPS",
    recommendation: "BUY",
    target_price: 68000,
    upside_percent: 24.8,
    subcategory: "Bán lẻ",
    excerpt:
      "Mobile World đang trong giai đoạn phục hồi doanh thu với việc chuỗi TGDĐ tăng trưởng 9% trong 2 tháng đầu năm. Kỳ vọng chu kỳ nâng cấp điện thoại và điện máy sẽ hỗ trợ tăng trưởng mạnh trong 2026.",
    published_at: daysAgo(5),
  },
  {
    ticker: "VHM",
    title: "VHM – TRUNG LẬP, giá mục tiêu 42.000 VND: Chờ tín hiệu phục hồi mạnh hơn từ thị trường BĐS",
    source_name: "VDSC",
    recommendation: "HOLD",
    target_price: 42000,
    upside_percent: 7.1,
    subcategory: "Bất động sản",
    excerpt:
      "Vinhomes gặp thách thức trong bàn giao các dự án căn hộ trung – cao cấp do khó khăn pháp lý kéo dài tại một số địa phương. Chúng tôi duy trì khuyến nghị Trung lập trong khi chờ tín hiệu khả quan hơn.",
    published_at: daysAgo(6),
  },
  {
    ticker: "REE",
    title: "REE – MUA với giá mục tiêu 82.000 VND: Danh mục điện tái tạo đóng góp ngày càng lớn",
    source_name: "ABS",
    recommendation: "BUY",
    target_price: 82000,
    upside_percent: 20.1,
    subcategory: "Năng lượng",
    excerpt:
      "Cơ Điện Lạnh đang hưởng lợi từ giá điện tái tạo tăng và danh mục điện gió/mặt trời ngày càng đa dạng. Dự phóng LNST 2026 đạt 1.850 tỷ VND (+18% YoY).",
    published_at: daysAgo(6),
  },
  {
    ticker: "BID",
    title: "BID – MUA, giá mục tiêu 55.000 VND: Hỗ trợ từ tăng vốn Nhà nước và NIM cải thiện",
    source_name: "SSI",
    recommendation: "BUY",
    target_price: 55000,
    upside_percent: 13.4,
    subcategory: "Ngân hàng",
    excerpt:
      "BIDV được kỳ vọng tăng vốn nhà nước thêm 10.000 tỷ VND trong năm 2026, qua đó cải thiện CAR và mở rộng khẩu vị tín dụng. NIM đang trong xu hướng hồi phục từ đáy 2,65%.",
    published_at: daysAgo(7),
  },
  {
    ticker: "SAB",
    title: "SAB – TRUNG LẬP, giá mục tiêu 185.000 VND: Áp lực cạnh tranh từ bia ngoại chưa hạ nhiệt",
    source_name: "BSC",
    recommendation: "HOLD",
    target_price: 185000,
    upside_percent: 4.8,
    subcategory: "Hàng tiêu dùng",
    excerpt:
      "Sabeco đang đối mặt với áp lực cạnh tranh ngày càng gay gắt từ Heineken và các thương hiệu bia nhập khẩu. Thị phần ở miền Nam giảm từ 48% xuống 45% trong năm 2025.",
    published_at: daysAgo(8),
  },
  {
    ticker: "CTG",
    title: "CTG – MUA với giá mục tiêu 42.000 VND: Tín dụng cơ sở hạ tầng là động lực tăng trưởng chính",
    source_name: "VCBS",
    recommendation: "BUY",
    target_price: 42000,
    upside_percent: 15.7,
    subcategory: "Ngân hàng",
    excerpt:
      "VietinBank tiếp tục được chỉ định cho vay các dự án hạ tầng trọng điểm quốc gia. Tín dụng hạ tầng chiếm 22% tổng dư nợ, mang lại lợi nhuận ổn định với rủi ro thấp.",
    published_at: daysAgo(9),
  },
  {
    ticker: "GMD",
    title: "GMD – MUA với giá mục tiêu 58.000 VND: Cảng nước sâu Gemalink tăng công suất, cước biển hồi phục",
    source_name: "HVS",
    recommendation: "BUY",
    target_price: 58000,
    upside_percent: 26.5,
    subcategory: "Vận tải & Logistics",
    excerpt:
      "Gemadept đang mở rộng công suất cảng Gemalink giai đoạn 2 lên 1,5 triệu TEU. Cước vận tải container hồi phục mạnh từ đầu 2026 sẽ thúc đẩy doanh thu dịch vụ cảng.",
    published_at: daysAgo(10),
  },
  {
    ticker: "VJC",
    title: "VJC – MUA, giá mục tiêu 125.000 VND: Mạng bay quốc tế mở rộng mạnh, tải khách tăng 32%",
    source_name: "MBS",
    recommendation: "BUY",
    target_price: 125000,
    upside_percent: 19.2,
    subcategory: "Hàng không",
    excerpt:
      "Vietjet Air ghi nhận tải khách quốc tế tăng 32% YoY trong 2 tháng đầu năm, đặc biệt tuyến Việt Nam – Hàn Quốc và Nhật Bản. Load factor đạt 87%, cao hơn pre-COVID.",
    published_at: daysAgo(11),
  },
  {
    ticker: "MSN",
    title: "MSN – TRUNG LẬP, giá mục tiêu 78.000 VND: Tái cơ cấu WCM cần thêm thời gian để phát huy",
    source_name: "FPTS",
    recommendation: "HOLD",
    target_price: 78000,
    upside_percent: 6.3,
    subcategory: "Hàng tiêu dùng",
    excerpt:
      "Masan Group đang trong quá trình tái cơ cấu WinCommerce với việc đóng cửa các điểm không hiệu quả và mở lại theo mô hình mới. Hiệu quả hoạt động cần ít nhất 3 – 4 quý để cải thiện rõ nét.",
    published_at: daysAgo(12),
  },
  {
    ticker: "VPB",
    title: "VPB – MUA với giá mục tiêu 22.000 VND: FE Credit phục hồi là chất xúc tác chính trong 2026",
    source_name: "ABS",
    recommendation: "BUY",
    target_price: 22000,
    upside_percent: 27.9,
    subcategory: "Ngân hàng",
    excerpt:
      "VPBank đang chứng kiến sự phục hồi của FE Credit với tỷ lệ nợ xấu giảm từ 21% xuống 17% và tăng trưởng dư nợ dương trở lại. Giá cổ phiếu hiện chiết khấu sâu so với giá trị nội tại.",
    published_at: daysAgo(13),
  },
  {
    ticker: "POW",
    title: "POW – BÁN, giá mục tiêu 9.500 VND: Điện khí bị lấn át bởi năng lượng tái tạo giá rẻ",
    source_name: "HSC",
    recommendation: "SELL",
    target_price: 9500,
    upside_percent: -11.2,
    subcategory: "Điện",
    excerpt:
      "PetroVietnam Power đang mất dần lợi thế cạnh tranh khi điện mặt trời và điện gió chiếm thị phần ngày càng lớn trong hệ thống điện quốc gia. Sản lượng điện khí giảm 15% trong Q4/2025.",
    published_at: daysAgo(14),
  },
]

// ── insert ─────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n📊 Seeding ${reports.length} Finpath analysis reports...\n`)

  let inserted = 0
  let skipped = 0
  let errors = 0

  for (const r of reports) {
    const contentHash = makeHash(r.title, r.source_name, r.published_at)
    const slug = slugify(r.title) + "-" + contentHash.slice(0, 6)

    const row = {
      title: r.title,
      slug,
      excerpt: r.excerpt,
      source_name: r.source_name,
      source_type: "broker_report",
      source_url: `https://finpath.vn/y-tuong/${r.ticker.toLowerCase()}-${r.source_name.toLowerCase()}-${fmtDateDDMMYYYY(r.published_at)}`,
      content_hash: contentHash,
      ticker: r.ticker,
      recommendation: r.recommendation,
      target_price: r.target_price,
      upside_percent: r.upside_percent,
      category: "stock_picks",
      subcategory: r.subcategory,
      sentiment: r.recommendation === "BUY" ? "bullish" : r.recommendation === "SELL" ? "bearish" : "neutral",
      is_featured: r.is_featured ?? false,
      published_at: r.published_at,
      fetched_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("market_analysis").insert(row)

    if (error) {
      if (error.code === "23505") {
        console.log(`  ⚠️  Skip (duplicate): ${r.ticker} – ${r.source_name}`)
        skipped++
      } else {
        console.error(`  ❌  Error: ${r.title.slice(0, 60)}`)
        console.error(`       ${error.message}`)
        errors++
      }
    } else {
      console.log(`  ✅  ${r.recommendation.padEnd(4)} | ${r.ticker.padEnd(4)} | ${r.source_name.padEnd(5)} | ${r.title.slice(0, 60)}`)
      inserted++
    }
  }

  console.log(`\n📈 Done! inserted=${inserted} skipped=${skipped} errors=${errors}\n`)
}

seed().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
