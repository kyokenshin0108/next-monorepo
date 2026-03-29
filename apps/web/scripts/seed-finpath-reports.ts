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
  summary?: string
  key_points?: string[]
  content?: string
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
    summary:
      "Vinamilk (VNM) công bố kết quả kinh doanh Q1/2026 vượt kỳ vọng với doanh thu 16.850 tỷ VND (+8,3% YoY) và biên lợi nhuận gộp đạt 43,2% – mức cao nhất trong 8 quý. LNST đạt 2.950 tỷ VND (+14,5% YoY), nhờ chi phí nguyên liệu đầu vào giảm và chiến lược sản phẩm cao cấp phát huy hiệu quả. Chúng tôi duy trì khuyến nghị MUA và giá mục tiêu 85.000 VND.",
    key_points: [
      "Biên lợi nhuận gộp đạt 43,2%, cải thiện 2,1 điểm phần trăm so với Q1/2025 nhờ giá sữa bột nhập khẩu giảm 12%",
      "Doanh thu xuất khẩu tăng 18% YoY, thị trường Trung Đông và ASEAN tiếp tục là động lực chính",
      "Chương trình tối ưu hóa chuỗi cung ứng dự kiến tiết kiệm 200–300 tỷ VND chi phí trong năm 2026",
      "P/E forward 18,5x năm 2026 thấp hơn bình quân lịch sử 5 năm 22x – định giá hấp dẫn",
      "Rủi ro chính: biến động tỷ giá USD/VND và kế hoạch thoái vốn của SCIC (nắm 36%)",
    ],
    content: `## Kết quả kinh doanh Q1/2026

Vinamilk ghi nhận doanh thu thuần Q1/2026 đạt 16.850 tỷ VND (+8,3% YoY), vượt kỳ vọng của thị trường và ước tính trước đó của chúng tôi. Biên lợi nhuận gộp cải thiện lên 43,2% – tăng 2,1 điểm phần trăm so với Q1/2025 – chủ yếu nhờ giá sữa bột nguyên kem nhập khẩu giảm khoảng 12% so với cùng kỳ. LNST đạt 2.950 tỷ VND (+14,5% YoY), cao hơn 6% so với dự phóng của chúng tôi.

## Động lực tăng trưởng

Chiến lược định giá linh hoạt và việc tập trung vào phân khúc sản phẩm cao cấp (organic milk, sữa tươi premium) đang mang lại hiệu quả rõ rệt. Mảng xuất khẩu tiếp tục đóng góp tích cực với tăng trưởng 18% YoY, chủ yếu nhờ thị trường Trung Đông và Đông Nam Á. Chương trình tối ưu hóa chuỗi cung ứng của ban lãnh đạo dự kiến tiết kiệm thêm 200–300 tỷ VND chi phí vận hành trong năm 2026.

## Định giá và khuyến nghị

Tại mức giá hiện tại, VNM đang giao dịch ở P/E forward 18,5x năm 2026, thấp hơn mức bình quân lịch sử 5 năm 22x. Chúng tôi áp dụng mô hình DCF với WACC 10,5% và tăng trưởng dài hạn 4%, cho giá trị hợp lý 85.000 VND/cổ phiếu – upside 18,5%. Duy trì khuyến nghị MUA.

## Rủi ro cần theo dõi

Rủi ro chính bao gồm biến động tỷ giá USD/VND ảnh hưởng đến chi phí nhập khẩu nguyên liệu, áp lực cạnh tranh từ TH True Milk trong phân khúc sữa tươi cao cấp, và kế hoạch thoái vốn tiềm tàng của SCIC (sở hữu 36%) có thể tạo áp lực lên giá ngắn hạn.`,
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
    summary:
      "Vietcombank (VCB) tiếp tục khẳng định vị thế dẫn đầu ngành ngân hàng với tỷ lệ nợ xấu 0,98% – thấp nhất hệ thống – trong khi NIM phục hồi về 3,1% sau 2 quý điều chỉnh. Tăng trưởng tín dụng đạt 14,5% YoY, được hỗ trợ bởi nhu cầu vay mua nhà và tín dụng doanh nghiệp. Chúng tôi nâng giá mục tiêu lên 110.000 VND và duy trì khuyến nghị MUA.",
    key_points: [
      "Tỷ lệ nợ xấu 0,98% – thấp nhất trong hệ thống ngân hàng, phản ánh chất lượng thẩm định tín dụng vượt trội",
      "NIM phục hồi lên 3,1% sau 2 quý suy giảm, được hỗ trợ bởi chi phí vốn giảm và lợi suất cho vay cải thiện",
      "Tăng trưởng tín dụng 14,5% YoY, vượt mức bình quân ngành 12%",
      "CASA ratio ở mức 35,2%, đảm bảo chi phí huy động vốn cạnh tranh",
      "P/B 2,8x – premium so với ngành nhưng được biện minh bởi ROE 22% và chất lượng tài sản hàng đầu",
    ],
    content: `## Chất lượng tài sản tiếp tục dẫn đầu ngành

Vietcombank duy trì vị thế ngân hàng có chất lượng tài sản tốt nhất Việt Nam với tỷ lệ nợ xấu chỉ 0,98% – giảm từ mức 1,15% của năm 2025. Tỷ lệ bao phủ nợ xấu (LLR) đạt 312%, đảm bảo bộ đệm dự phòng dày dặn. Tỷ lệ nợ nhóm 2 cũng giảm 0,2 điểm phần trăm so với quý trước, cho thấy rủi ro chuyển nhóm nợ đang được kiểm soát tốt.

## NIM phục hồi – điểm sáng quan trọng

NIM Q1/2026 phục hồi về 3,1% sau 2 quý điều chỉnh (Q3/2025: 2,85%; Q4/2025: 2,92%). Đây là tín hiệu tích cực cho thấy chu kỳ áp lực biên lãi suất đã kết thúc. Động lực chính đến từ chi phí huy động vốn giảm nhờ lãi suất thị trường hạ nhiệt và tỷ trọng CASA duy trì ổn định ở 35,2%.

## Tăng trưởng tín dụng và triển vọng

Tăng trưởng tín dụng đạt 14,5% YoY tính đến cuối Q1/2026, vượt mức bình quân ngành 12%. Cho vay bán lẻ (mua nhà, tiêu dùng) chiếm 45% tổng dư nợ và có tốc độ tăng trưởng cao nhất. Ban lãnh đạo đặt mục tiêu tín dụng cả năm 2026 đạt 16-17%, được hỗ trợ bởi hạn mức tín dụng NHNN phân bổ cao nhờ năng lực quản trị rủi ro xuất sắc.

## Định giá và khuyến nghị

Chúng tôi nâng giá mục tiêu 12 tháng lên 110.000 VND (từ 98.000 VND trước đó), dựa trên P/B mục tiêu 3,0x áp dụng cho BVPS 2026F là 36.700 VND. Tại giá mục tiêu mới, VCB giao dịch ở ROE 22% và P/E 17x – mức hợp lý cho ngân hàng dẫn đầu thị trường. Duy trì khuyến nghị MUA với tiềm năng tăng giá 14,2%.`,
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
    summary:
      "Hòa Phát (HPG) đang chứng kiến sự phục hồi mạnh mẽ với sản lượng thép xây dựng tháng 2/2026 tăng 28% YoY. Chu kỳ hồi phục bất động sản và đẩy mạnh đầu tư công đang là hai động lực chính. Dự phóng LNST 2026 đạt 9.200 tỷ VND (+65% YoY) nhờ sản lượng tăng và giá thép cải thiện. Nâng khuyến nghị từ Trung lập lên MUA.",
    key_points: [
      "Sản lượng thép xây dựng tháng 2/2026 tăng 28% YoY – tín hiệu rõ nét về sự phục hồi nhu cầu",
      "Chu kỳ phục hồi bất động sản và đầu tư công là hai động lực cầu chính trong 2026",
      "Dự phóng LNST 2026 đạt 9.200 tỷ VND (+65% YoY) – hưởng lợi từ đòn bẩy hoạt động cao",
      "Dự án Dung Quất 2 đi vào hoạt động H2/2026 sẽ tăng 50% công suất thép cuộn cán nóng",
      "Rủi ro: giá quặng sắt tăng, cạnh tranh từ thép Trung Quốc nhập khẩu",
    ],
    content: `## Phục hồi sản lượng – chu kỳ tăng đã bắt đầu

Hòa Phát công bố sản lượng thép xây dựng tháng 2/2026 đạt 380.000 tấn (+28% YoY), đánh dấu tháng thứ 3 liên tiếp tăng trưởng hai chữ số. Tổng sản lượng 2 tháng đầu năm đạt 750.000 tấn (+24% YoY), vượt kế hoạch nội bộ. Nhu cầu phục hồi chủ yếu đến từ hoạt động xây dựng dân dụng tăng trở lại và đẩy mạnh giải ngân đầu tư công.

## Dự án Dung Quất 2 – chất xúc tác dài hạn

Dự án Khu Liên hợp thép Dung Quất 2 với công suất 5,6 triệu tấn thép cuộn cán nóng (HRC) dự kiến đi vào hoạt động trong H2/2026. Khi hoàn thành, Hòa Phát sẽ nâng tổng công suất HRC lên 8,6 triệu tấn/năm – chiếm ~45% nhu cầu nội địa. Đây là bước ngoặt chiến lược giúp công ty giảm phụ thuộc vào HRC nhập khẩu từ Trung Quốc.

## Cập nhật dự phóng lợi nhuận

Chúng tôi nâng dự phóng LNST 2026 lên 9.200 tỷ VND (+65% YoY so với năm 2025 là 5.575 tỷ) nhờ: (1) sản lượng tăng mạnh, (2) giá thép xây dựng nội địa cải thiện ~8% so với đầu năm, (3) tiết giảm chi phí nhờ vận hành hiệu quả hơn. Dự phóng EPS 2026 là 1.720 VND.

## Định giá và khuyến nghị

Chúng tôi nâng khuyến nghị từ Trung lập lên MUA và đặt giá mục tiêu 32.000 VND dựa trên P/E mục tiêu 18,6x áp dụng cho EPS 2026F. Mức này phản ánh discount 15% so với P/E lịch sử đỉnh chu kỳ để tính rủi ro biến động giá nguyên liệu. Upside 22,3% từ giá hiện tại.`,
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
    summary:
      "FPT Corporation tiếp tục ghi nhận tăng trưởng ấn tượng từ mảng công nghệ nước ngoài với doanh thu 2 tháng đầu 2026 tăng 35% YoY. Số lượng kỹ sư phần mềm tăng 22% YoY lên hơn 52.000 người, trong khi chiến lược AI/cloud đang giúp nâng cao giá trị hợp đồng trung bình. Chúng tôi nâng giá mục tiêu lên 145.000 VND.",
    key_points: [
      "Doanh thu công nghệ nước ngoài 2T/2026 tăng 35% YoY – vượt mục tiêu cả năm 30% của ban lãnh đạo",
      "Thị trường Nhật Bản (+38% YoY) và Mỹ (+42% YoY) là hai động lực tăng trưởng mạnh nhất",
      "Lực lượng kỹ sư phần mềm vượt 52.000 người (+22% YoY), đảm bảo năng lực thực thi đơn hàng",
      "Chiến lược AI transformation đang giúp nâng giá trị hợp đồng trung bình lên 15-20%",
      "FPT Telecom và FPT Education đóng góp dòng tiền ổn định, giảm thiểu rủi ro chu kỳ",
    ],
    content: `## Mảng công nghệ nước ngoài – động lực chính

FPT ghi nhận doanh thu mảng công nghệ nước ngoài 2 tháng đầu 2026 đạt 6.850 tỷ VND (+35% YoY), vượt xa mục tiêu tăng trưởng cả năm 30% mà ban lãnh đạo đặt ra. Thị trường Nhật Bản tăng 38% YoY nhờ làn sóng chuyển đổi số hậu COVID tiếp tục, trong khi thị trường Mỹ tăng 42% nhờ nhu cầu outsourcing IT tăng mạnh từ các tập đoàn Fortune 500.

## Chiến lược AI – nâng cấp giá trị hợp đồng

FPT đang tích cực triển khai chiến lược AI transformation, định vị lại từ "IT outsourcing" sang "AI-powered digital transformation partner". Cách tiếp cận mới này giúp giá trị hợp đồng trung bình tăng 15-20%, đồng thời nâng cao rào cản chuyển đổi với khách hàng. Trong Q1/2026, FPT ký 12 hợp đồng AI lớn với tổng giá trị trên 1.000 tỷ VND.

## Mở rộng lực lượng kỹ sư

Tổng số kỹ sư phần mềm của FPT đã vượt 52.000 người (+22% YoY), đảm bảo năng lực thực thi đơn hàng trong bối cảnh backlog tăng mạnh. FPT Software đặt mục tiêu đạt 60.000 kỹ sư vào cuối 2026. Trường ĐH FPT cung cấp khoảng 8.000 kỹ sư/năm – nguồn tuyển dụng nội bộ quan trọng.

## Định giá và khuyến nghị

Chúng tôi nâng giá mục tiêu 12 tháng lên 145.000 VND (từ 125.000 VND), dựa trên phương pháp SOTP: mảng công nghệ nước ngoài định giá 35x EV/EBITDA, FPT Telecom 12x và FPT Education 20x EV/EBITDA. P/E forward 2026 tại giá mục tiêu là 28x – mức hợp lý cho công ty tăng trưởng cao với biên lợi nhuận ngày càng cải thiện.`,
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
    summary:
      "MB Bank (MBB) tiếp tục là lựa chọn hàng đầu trong ngành ngân hàng tư nhân với CASA ratio 38,5% – cao nhất hệ thống – giúp chi phí vốn thuộc nhóm thấp nhất. ROE 2025 đạt 22,1% với P/B chỉ 1,4x, tạo nên mức định giá rất hấp dẫn. Kế hoạch tăng vốn và mở rộng sang fintech đang mở ra câu chuyện tăng trưởng dài hạn.",
    key_points: [
      "CASA ratio 38,5% – cao nhất trong nhóm ngân hàng tư nhân, giúp NIM duy trì ở mức cao 5,1%",
      "ROE 22,1% năm 2025 – dẫn đầu nhóm ngân hàng tư nhân, phản ánh hiệu quả sử dụng vốn vượt trội",
      "P/B 1,4x – chiết khấu sâu so với mức bình quân lịch sử 2,0x và mức của các ngân hàng tương đương",
      "Công ty con MBAgeas Life tăng trưởng phí bảo hiểm 28% YoY, đa dạng hóa nguồn thu",
      "Rủi ro: nợ xấu tiềm ẩn từ danh mục trái phiếu doanh nghiệp bất động sản",
    ],
    content: `## CASA – lợi thế cạnh tranh bền vững

MB Bank duy trì CASA ratio ở mức 38,5% trong Q1/2026, cao nhất trong nhóm ngân hàng tư nhân và cao hơn mức bình quân ngành 22%. Đây là kết quả của chiến lược phát triển hệ sinh thái số từ sớm với ứng dụng MB App đạt 25 triệu người dùng. Chi phí vốn bình quân của MBB chỉ 2,8%, giúp NIM đạt 5,1% – mức cao nhất trong nhóm ngân hàng niêm yết.

## ROE và hiệu quả sinh lời

ROE năm 2025 của MBB đạt 22,1% – dẫn đầu nhóm ngân hàng tư nhân, cao hơn TCB (20,8%) và VPB (14,2%). Kết quả này phản ánh hiệu quả triển khai vốn trong bối cảnh tăng trưởng tín dụng 18% YoY và kiểm soát chi phí hoạt động tốt (CIR giảm từ 35% xuống 32%). Dự phóng ROE 2026 đạt 22,5-23% nhờ tăng trưởng thu nhập phí và hoa hồng.

## Câu chuyện fintech và tăng vốn

MBB đang đẩy mạnh phát triển hệ sinh thái số thông qua: (1) MBAgeas Life – bancassurance tăng trưởng phí 28% YoY, (2) McreNexum – công ty tài chính tiêu dùng tập trung phân khúc doanh nghiệp vừa nhỏ, (3) MB Securities – mở rộng dịch vụ thị trường vốn. Kế hoạch tăng vốn điều lệ 2026 sẽ hỗ trợ tăng trưởng tín dụng trung hạn.

## Định giá – chiết khấu sâu so với giá trị nội tại

P/B hiện tại 1,4x thấp hơn đáng kể so với mức bình quân lịch sử 2,0x và mức các ngân hàng tương đương trong khu vực (2,2x). Áp dụng P/B mục tiêu 1,7x cho BVPS 2026F là 16.500 VND, chúng tôi đặt giá mục tiêu 28.000 VND – upside 19,4%. Duy trì khuyến nghị MUA.`,
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
    summary:
      "Vingroup (VIC) đang đối mặt với tốc độ phục hồi thị trường bất động sản chậm hơn kỳ vọng, buộc phải điều chỉnh kế hoạch bàn giao tại Vinhomes Grand Park. Áp lực nợ từ VinFast và tiến độ giải ngân đầu tư công thấp hơn kế hoạch là hai nhân tố tiêu cực. Chúng tôi hạ từ MUA xuống TRUNG LẬP.",
    key_points: [
      "Tốc độ hấp thụ Vinhomes Grand Park đạt 45% kế hoạch, buộc điều chỉnh timeline bàn giao",
      "Áp lực tài chính từ VinFast vẫn là rủi ro lớn – khoản phải thu liên công ty tăng thêm 8.000 tỷ trong 2025",
      "Tỷ lệ nợ/vốn chủ sở hữu ở mức 2,8x – cao nhất trong nhóm tập đoàn bất động sản lớn",
      "VinHomes Smart City và Ocean Park 2 là điểm sáng với tỷ lệ hấp thụ 70% kế hoạch",
      "Catalyst tích cực: Luật Đất đai mới (hiệu lực 2025) có thể đẩy nhanh tiến độ pháp lý dự án",
    ],
    content: `## Thị trường bất động sản – phục hồi chậm hơn kỳ vọng

Thị trường bất động sản Việt Nam đang phục hồi nhưng với tốc độ chậm hơn đáng kể so với kỳ vọng đầu năm 2026. Tỷ lệ hấp thụ toàn thị trường Q1/2026 đạt 58%, vẫn thấp hơn mức trung bình trước COVID (75%). Đối với Vingroup, việc ra hàng các dự án cao cấp đang gặp khó khăn hơn do tâm lý thận trọng của người mua và vấn đề tiếp cận tín dụng thế chấp.

## Vinhomes Grand Park – điều chỉnh kế hoạch

Ban lãnh đạo xác nhận tiến độ bàn giao Vinhomes Grand Park Phase 3 bị lùi 2 quý do tốc độ hấp thụ chỉ đạt 45% kế hoạch. Điều này ảnh hưởng trực tiếp đến doanh thu ghi nhận doanh thu năm 2026. Chúng tôi hạ dự phóng doanh thu BĐS của VIC xuống 15% và LNST xuống 18% so với ước tính trước đó.

## Rủi ro từ VinFast

Khoản phải thu VIC cho VinFast tăng thêm 8.000 tỷ VND trong năm 2025, nâng tổng lên ~45.000 tỷ VND. Tình hình tài chính của VinFast tại thị trường Mỹ vẫn còn nhiều thách thức, tạo ra rủi ro tiềm ẩn về khả năng hoàn trả cho công ty mẹ.

## Định giá và khuyến nghị

Áp dụng NAV discount 40% (so với 30% trước đây) do rủi ro VinFast và tiến độ dự án, chúng tôi điều chỉnh giá mục tiêu xuống 48.000 VND. Với upside hạn chế 5,2%, chúng tôi hạ khuyến nghị xuống TRUNG LẬP. Sẽ xem xét lại khi có tín hiệu rõ ràng hơn về phục hồi hấp thụ hoặc VinFast đạt điểm hòa vốn.`,
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
    summary:
      "Techcombank (TCB) bứt phá với tăng trưởng tín dụng 18% YoY – cao nhất nhóm ngân hàng lớn – nhờ chiến lược cho vay bán lẻ và SME phát huy hiệu quả. Thu nhập ngoài lãi đang ngày càng đóng vai trò quan trọng hơn với tỷ trọng 42% tổng thu nhập hoạt động. Định giá P/B 1,6x hấp dẫn cho ngân hàng tăng trưởng cao.",
    key_points: [
      "Tăng trưởng tín dụng 18% YoY – dẫn đầu nhóm NHTM lớn, cao hơn hạn mức NHNN giao ban đầu",
      "Thu nhập ngoài lãi chiếm 42% tổng thu nhập hoạt động – cơ cấu thu nhập lành mạnh và đa dạng",
      "Bancassurance tăng trưởng phí 45% YoY nhờ partnership với Manulife",
      "Chiến lược One Techcombank – cross-sell dịch vụ cho 12 triệu khách hàng đang phát huy hiệu quả",
      "NPL ratio tăng nhẹ lên 1,35% do danh mục cho vay BĐS – rủi ro cần theo dõi",
    ],
    content: `## Tăng trưởng tín dụng ấn tượng

Techcombank ghi nhận tăng trưởng tín dụng 18% YoY tính đến cuối tháng 2/2026, vượt xa mức bình quân ngành 12% và cao hơn hạn mức tín dụng ban đầu NHNN giao. Điều này phản ánh nhu cầu vay mạnh từ phân khúc bán lẻ (mua nhà, vay tiêu dùng) và SME. Ban lãnh đạo kỳ vọng tăng trưởng tín dụng cả năm 2026 đạt 20-22%.

## Đa dạng hóa thu nhập – điểm mạnh chiến lược

Thu nhập ngoài lãi (NFI) đóng góp 42% tổng thu nhập hoạt động Q1/2026, nhờ: (1) Bancassurance với Manulife tăng trưởng phí 45% YoY, (2) Dịch vụ thị trường vốn (ECM/DCM) phục hồi mạnh, (3) Thu phí từ thanh toán và ngân quỹ tăng 25% YoY. Cơ cấu này giúp TCB ít nhạy cảm hơn với biến động NIM so với các ngân hàng thuần tín dụng.

## Chiến lược One Techcombank

Chương trình One Techcombank tập trung cross-sell toàn bộ sản phẩm dịch vụ cho 12 triệu khách hàng hiện hữu. Số sản phẩm trung bình/khách hàng tăng từ 2,8 lên 3,5 trong vòng 12 tháng. Đây là chìa khóa nâng cao ROE và lifetime value khách hàng dài hạn.

## Định giá và khuyến nghị

P/B hiện tại 1,6x thấp hơn đáng kể so với mức đỉnh lịch sử 2,8x và P/B bình quân khu vực của ngân hàng tương đương. Áp dụng Gordon Growth Model với ROE ổn định 20% và cost of equity 12%, giá trị hợp lý của TCB là 38.000 VND. Duy trì khuyến nghị MUA.`,
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
    summary:
      "PetroVietnam Gas (GAS) đang đối mặt với cơn gió ngược kép: giá khí tự nhiên thấp do nguồn cung LNG toàn cầu dồi dào và thị phần bị thu hẹp bởi năng lượng tái tạo giá rẻ. Dự phóng LNST 2026 giảm 22% YoY. Định giá hiện tại premium so với ngành và downside 8,3%. Hạ xuống BÁN.",
    key_points: [
      "Giá khí LNG giao ngay tại châu Á giảm 35% so với đỉnh 2022, gây áp lực lên biên lợi nhuận",
      "Sản lượng điện khí giảm 15% trong Q4/2025 do điện mặt trời và điện gió được ưu tiên huy động",
      "Dự phóng LNST 2026 giảm 22% YoY xuống còn 8.800 tỷ VND",
      "P/E forward 2026 tại 18x – premium 25% so với ngành năng lượng khu vực",
      "Rủi ro dài hạn: lộ trình chuyển dịch năng lượng quốc gia đẩy nhanh điện tái tạo",
    ],
    content: `## Áp lực kép – giá khí thấp và mất thị phần

GAS đang phải đối mặt với hai áp lực cùng lúc. Thứ nhất, giá khí tự nhiên hóa lỏng (LNG) tại châu Á đã giảm 35% so với đỉnh năm 2022 do nguồn cung LNG toàn cầu tăng mạnh từ Mỹ, Qatar và Úc. Thứ hai, điện mặt trời và điện gió đang chiếm thị phần ngày càng lớn trong cơ cấu phát điện quốc gia, trực tiếp làm giảm sản lượng điện khí.

## Suy giảm sản lượng khí

Sản lượng khí thương phẩm của GAS trong Q4/2025 giảm 12% so với cùng kỳ, trong khi Q1/2026 tiếp tục xu hướng giảm. Theo quy hoạch điện VIII, tỷ trọng điện khí trong cơ cấu điện quốc gia sẽ giảm từ 20% hiện tại xuống 15% vào năm 2030 khi điện tái tạo và điện LNG hóa lỏng mở rộng. Đây là xu hướng cấu trúc bất lợi dài hạn.

## Cập nhật dự phóng

Chúng tôi hạ dự phóng LNST 2026 xuống 8.800 tỷ VND (-22% YoY) do: (1) sản lượng giảm, (2) biên lợi nhuận vận chuyển khí thu hẹp, (3) chi phí bảo dưỡng đường ống tăng theo kế hoạch. EPS 2026F là 3.960 VND/cổ phiếu.

## Định giá – premium không được biện minh

Tại giá thị trường hiện tại, GAS đang giao dịch ở P/E forward 18x năm 2026 – cao hơn 25% so với mức bình quân của các công ty năng lượng tương đương trong khu vực. Chúng tôi đặt giá mục tiêu 72.000 VND (P/E 15x năm 2026), ngụ ý downside 8,3%. Hạ khuyến nghị xuống BÁN.`,
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
    summary:
      "PNJ đang trong chu kỳ mở rộng mạnh mẽ với 12 cửa hàng mới trong Q1/2026, nâng tổng lên 398 điểm. Chiến lược dịch chuyển lên phân khúc trang sức cao cấp đang giúp bảo vệ biên lợi nhuận gộp 21,4% bất chấp biến động giá vàng. Dự phóng doanh thu 2026 tăng 24% YoY.",
    key_points: [
      "Mở 12 cửa hàng mới trong Q1/2026, tiến gần mục tiêu 450 điểm vào cuối 2026",
      "Biên lợi nhuận gộp 21,4% – ổn định nhờ dịch chuyển lên trang sức cao cấp và đá quý",
      "Doanh thu trang sức cao cấp (>10 triệu/sản phẩm) tăng 45% YoY, chiếm 35% tổng doanh thu",
      "Nền tảng digital (PNJ.com.vn) tăng trưởng 65% YoY, GMV đạt 850 tỷ trong Q1/2026",
      "Rủi ro: giá vàng biến động mạnh có thể ảnh hưởng ngắn hạn đến tâm lý mua sắm",
    ],
    content: `## Mở rộng hệ thống bán lẻ

PNJ tiếp tục thực hiện chiến lược mở rộng tích cực với 12 cửa hàng mới trong Q1/2026, nâng tổng số điểm bán lên 398 cửa hàng trên toàn quốc. Các cửa hàng mới tập trung vào khu vực đô thị mới, trung tâm thương mại cao cấp tại Hà Nội và TP.HCM. Tỷ suất hoàn vốn đầu tư (ROIC) bình quân của các cửa hàng mới đạt 28% – cao hơn đáng kể so với chi phí vốn.

## Chiến lược "premiumization"

PNJ đang thực hiện chiến lược dịch chuyển danh mục sản phẩm lên phân khúc cao cấp hơn. Doanh thu trang sức cao cấp (>10 triệu/sản phẩm) tăng 45% YoY và chiếm 35% tổng doanh thu Q1/2026 (so với 25% cùng kỳ). Chiến lược này giúp bảo vệ biên lợi nhuận gộp ở mức 21,4% bất chấp biến động giá vàng nguyên liệu.

## Kênh digital – động lực tăng trưởng mới

Nền tảng thương mại điện tử PNJ.com.vn ghi nhận tăng trưởng GMV 65% YoY trong Q1/2026, đạt 850 tỷ VND. Kênh online hiện chiếm 12% tổng doanh thu và đang tiến tới mục tiêu 20% vào năm 2027. PNJ cũng đang đầu tư vào AR/VR "thử trang sức ảo" để nâng cao trải nghiệm mua sắm online.

## Định giá và khuyến nghị

Áp dụng P/E mục tiêu 22x năm 2026F với EPS dự phóng 4.318 VND, chúng tôi đặt giá mục tiêu 95.000 VND – upside 16,9%. Định giá này có premium so với ngành bán lẻ nhưng được biện minh bởi lợi thế cạnh tranh bền vững, thương hiệu mạnh và tăng trưởng thu nhập ổn định 20-25%/năm trong 3 năm tới. Duy trì MUA.`,
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
    summary:
      "Mobile World (MWG) đang trong đà phục hồi với TGDĐ tăng trưởng 9% và BHX đạt điểm hòa vốn sau 2 năm tái cơ cấu. Chu kỳ nâng cấp điện thoại (5G) và điện máy (AI appliances) dự kiến thúc đẩy tăng trưởng doanh thu 2026. Điểm định giá hấp dẫn tại P/E 16x – thấp nhất 5 năm.",
    key_points: [
      "TGDĐ tăng trưởng 9% YoY trong 2T/2026 – tín hiệu rõ về phục hồi chu kỳ tiêu dùng điện tử",
      "BHX đạt điểm hòa vốn EBITDA sau 2 năm tái cơ cấu – loại bỏ gánh nặng chi phí lớn nhất",
      "Chu kỳ nâng cấp 5G và AI appliances dự kiến thúc đẩy ASP và doanh thu đến 2027",
      "Mở 8 chuỗi Erablue tại Đông Nam Á – đặt cược dài hạn vào câu chuyện mở rộng quốc tế",
      "P/E forward 2026 chỉ 16x – thấp nhất 5 năm, phản ánh kỳ vọng phục hồi đang bị định giá dưới",
    ],
    content: `## Phục hồi tăng trưởng – chu kỳ điện tử đang quay trở lại

Mobile World ghi nhận doanh thu chuỗi Thế Giới Di Động tăng 9% YoY trong 2 tháng đầu 2026, chấm dứt giai đoạn suy giảm kéo dài 18 tháng. Động lực chính đến từ: (1) nhu cầu nâng cấp smartphone 5G tăng mạnh khi giá điện thoại tầm trung 5G giảm xuống dưới 5 triệu VND, (2) chương trình trả góp 0% lãi suất thu hút khách hàng mới.

## BHX – điểm hòa vốn lịch sử

Chuỗi Bách Hóa Xanh lần đầu tiên đạt điểm hòa vốn EBITDA trong tháng 2/2026 sau 2 năm tái cơ cấu sâu rộng. Số cửa hàng được tối ưu hóa từ 1.800 xuống 1.350, biên lợi nhuận gộp cải thiện từ 14% lên 18%. Đây là cột mốc quan trọng loại bỏ gánh nặng tài chính lớn nhất cho MWG.

## Mở rộng quốc tế – Erablue Đông Nam Á

MWG đang thử nghiệm chuỗi Erablue tại 3 thị trường Đông Nam Á (Indonesia, Philippines, Thái Lan) với tổng 8 cửa hàng. Mô hình tập trung vào bán lẻ điện thoại tầm trung và điện gia dụng – phân khúc đang tăng trưởng nhanh tại khu vực. Rủi ro cao nhưng tiềm năng phần thưởng lớn nếu mô hình được nhân rộng.

## Định giá – cơ hội tại điểm định giá thấp nhất 5 năm

P/E forward 2026 chỉ 16x – thấp nhất trong 5 năm và thấp hơn 30% so với mức bình quân lịch sử 23x. Với dự phóng EPS 2026 là 4.250 VND và áp dụng P/E mục tiêu 16x, giá mục tiêu là 68.000 VND – upside 24,8%. Đây là thời điểm định giá hấp dẫn để tích lũy trước chu kỳ phục hồi rõ nét hơn.`,
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
    summary:
      "Vinhomes (VHM) tiếp tục đối mặt với thách thức về tiến độ pháp lý dự án, ảnh hưởng đến lịch bàn giao và ghi nhận doanh thu. Tuy nhiên, backlog đặt cọc 85.000 tỷ VND và quỹ đất 15.000 ha là bộ đệm dài hạn vững chắc. Duy trì TRUNG LẬP chờ catalyst rõ ràng hơn.",
    key_points: [
      "Khó khăn pháp lý tại TP.HCM và Hà Nội lùi tiến độ bàn giao tại 3 dự án lớn sang H2/2026",
      "Backlog đặt cọc tích lũy 85.000 tỷ VND – đảm bảo doanh thu ghi nhận khi các nút thắt pháp lý được giải quyết",
      "Quỹ đất sạch 15.000 ha – tài sản chiến lược dài hạn khó đánh giá đầy đủ trên thị trường",
      "Tỷ lệ đòn bẩy tài chính ở mức kiểm soát được: Nợ ròng/EBITDA 2,1x",
      "Catalyst: giải quyết nút thắt pháp lý tại Ocean Park 3 và Grand Park Phase 4",
    ],
    content: `## Thách thức pháp lý – rào cản ghi nhận doanh thu

Vinhomes đang gặp khó khăn trong việc hoàn thiện thủ tục pháp lý tại một số dự án trọng điểm, bao gồm Ocean Park 3 (Hưng Yên) và Grand Park Phase 4 (TP.HCM). Các vấn đề liên quan đến quy trình phê duyệt thiết kế kỹ thuật tổng thể và chứng nhận quyền sử dụng đất đã đẩy lùi lịch bàn giao sang H2/2026, ảnh hưởng đến doanh thu ghi nhận trong nửa đầu năm.

## Backlog – "tài sản ẩn" khổng lồ

Điểm tích cực là Vinhomes đang sở hữu backlog đặt cọc tích lũy khoảng 85.000 tỷ VND từ các căn hộ đã bán nhưng chưa bàn giao. Khi các nút thắt pháp lý được tháo gỡ, toàn bộ doanh thu này sẽ được ghi nhận, tạo ra "bước nhảy" lợi nhuận đáng kể. Đây là yếu tố bảo vệ câu chuyện tăng trưởng dài hạn của VHM.

## Quỹ đất – lợi thế cạnh tranh không thể sao chép

Quỹ đất sạch 15.000 ha của Vinhomes là tài sản chiến lược khổng lồ, khó có đối thủ nào trong nước có thể sao chép. Theo định giá nội bộ, giá trị NAV của quỹ đất này vào khoảng 200.000–250.000 tỷ VND. Đây là "bộ đệm giá trị" quan trọng ngay cả khi thị trường bất động sản trải qua giai đoạn điều chỉnh.

## Định giá và khuyến nghị

Áp dụng NAV discount 35% do rủi ro pháp lý và môi trường lãi suất, chúng tôi đặt giá mục tiêu 42.000 VND – upside hạn chế 7,1%. Duy trì khuyến nghị TRUNG LẬP. Điều kiện nâng lên MUA: (1) tiến độ pháp lý được giải quyết và lịch bàn giao rõ ràng hơn, (2) tốc độ hấp thụ thị trường cải thiện lên trên 65%.`,
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
    summary:
      "REE Corporation đang chuyển đổi thành công từ doanh nghiệp cơ điện lạnh truyền thống sang nhà đầu tư năng lượng tái tạo với danh mục 850 MW điện gió và mặt trời. Giá điện tái tạo tăng và bổ sung 150 MW mới trong 2026 sẽ thúc đẩy LNST lên 1.850 tỷ VND (+18% YoY). Định giá P/E 14x hấp dẫn.",
    key_points: [
      "Danh mục điện tái tạo đạt 850 MW (gió + mặt trời), dự kiến tăng lên 1.000 MW vào cuối 2026",
      "Giá điện tái tạo được điều chỉnh tăng 8% từ tháng 1/2026 theo quy định mới của Bộ Công Thương",
      "Dự phóng LNST 2026 đạt 1.850 tỷ VND (+18% YoY), EPS 7.400 VND",
      "Mảng cơ điện lạnh M&E ổn định với backlog dự án 3.200 tỷ VND",
      "Tỷ suất cổ tức 4,5% hàng năm – hấp dẫn so với lãi suất tiết kiệm",
    ],
    content: `## Chuyển đổi thành công sang năng lượng tái tạo

REE đã hoàn thành quá trình chuyển đổi chiến lược từ doanh nghiệp cơ điện lạnh truyền thống sang nhà đầu tư và vận hành năng lượng tái tạo. Danh mục điện tái tạo hiện tại đạt 850 MW gồm 520 MW điện gió và 330 MW điện mặt trời – nguồn thu nhập ổn định, có thể dự đoán dài hạn với hợp đồng mua bán điện (PPA) từ 20-25 năm.

## Tác động tích cực từ tăng giá điện tái tạo

Bộ Công Thương ban hành quyết định tăng giá mua điện tái tạo thêm 8% từ tháng 1/2026, áp dụng cho toàn bộ danh mục hiện hữu của REE. Tác động tích cực ước tính +150 tỷ VND/năm đối với LNST. Ngoài ra, 150 MW điện gió bổ sung dự kiến đi vào vận hành trong H2/2026, đóng góp thêm 80-100 tỷ VND lợi nhuận.

## Mảng M&E – dòng tiền ổn định

Mảng kỹ thuật cơ điện (M&E) truyền thống vẫn đóng góp ổn định với backlog dự án đạt 3.200 tỷ VND, đảm bảo doanh thu trong 18-24 tháng tới. Biên lợi nhuận M&E được cải thiện nhờ áp dụng công nghệ BIM (Building Information Modeling) vào quản lý dự án.

## Định giá và khuyến nghị

Áp dụng phương pháp định giá DCF cho mảng điện tái tạo (WACC 9,5%) và P/E 12x cho mảng M&E, chúng tôi đặt giá mục tiêu tổng hợp (SOTP) 82.000 VND – upside 20,1%. P/E forward 2026 tại giá mục tiêu là 11x, thấp hơn đáng kể so với các công ty điện tái tạo khu vực. Duy trì MUA.`,
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
    summary:
      "BIDV (BID) đang ở điểm uốn tích cực với NIM phục hồi từ đáy 2,65% và kế hoạch tăng vốn Nhà nước 10.000 tỷ VND trong 2026. Tín dụng hạ tầng và cho vay ưu đãi chính sách là hai trụ cột bền vững. Định giá P/B 1,8x hợp lý cho ngân hàng Big4.",
    key_points: [
      "Tăng vốn Nhà nước 10.000 tỷ VND trong 2026 – cải thiện CAR từ 9,1% lên 10,5%",
      "NIM phục hồi từ đáy 2,65% lên 2,85% trong Q1/2026 – xu hướng tích cực rõ nét",
      "Tín dụng hạ tầng chiếm 22% dư nợ, cung cấp dòng thu nhập ổn định rủi ro thấp",
      "Tăng trưởng tín dụng 13,8% YoY – phù hợp với hạn mức NHNN giao",
      "Rủi ro: chi phí dự phòng cao do tỷ lệ nợ xấu 1,42% và coverage ratio chỉ 145%",
    ],
    content: `## Tăng vốn Nhà nước – catalyst quan trọng

Chính phủ đã phê duyệt kế hoạch tăng vốn điều lệ cho BIDV thêm 10.000 tỷ VND trong năm 2026 thông qua phát hành thêm cổ phiếu cho cổ đông Nhà nước. Điều này sẽ cải thiện tỷ lệ an toàn vốn (CAR) từ 9,1% lên khoảng 10,5%, tạo dư địa mở rộng tín dụng thêm 80.000-100.000 tỷ VND. Đây là catalyst quan trọng nhất cho BID trong năm 2026.

## NIM phục hồi – thoát khỏi đáy

NIM của BIDV đã phục hồi từ mức đáy 2,65% (Q4/2025) lên 2,85% trong Q1/2026. Quá trình phục hồi được thúc đẩy bởi: (1) chi phí tiền gửi giảm khi lãi suất huy động hạ nhiệt, (2) lãi suất cho vay thương mại tăng nhẹ sau giai đoạn hỗ trợ nền kinh tế, (3) cơ cấu dư nợ dịch chuyển sang phân khúc có lợi suất cao hơn.

## Tín dụng hạ tầng – trụ cột bền vững

BIDV được Chính phủ chỉ định là ngân hàng chủ lực tài trợ các dự án hạ tầng trọng điểm quốc gia (cao tốc Bắc – Nam, cảng biển, điện lực). Tín dụng hạ tầng chiếm 22% tổng dư nợ, mang lại dòng thu nhập ổn định với rủi ro thấp nhờ bảo lãnh Chính phủ. Tỷ lệ nợ xấu của danh mục này dưới 0,5%.

## Định giá và khuyến nghị

Áp dụng P/B mục tiêu 2,0x cho BVPS 2026F dự phóng 27.500 VND, giá mục tiêu là 55.000 VND – upside 13,4%. Mức định giá này phản ánh premium nhỏ so với P/B hiện tại để tính catalyst tăng vốn và NIM phục hồi. Duy trì khuyến nghị MUA.`,
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
    summary:
      "Sabeco (SAB) tiếp tục chịu áp lực mất thị phần tại miền Nam (từ 48% xuống 45%) trước sự tấn công mạnh từ Heineken và các nhãn bia ngoại. Dù thương hiệu Bia Saigon vẫn mạnh, sự thay đổi thị hiếu tiêu dùng trẻ đang là thách thức cấu trúc. Duy trì TRUNG LẬP với upside hạn chế.",
    key_points: [
      "Thị phần miền Nam giảm từ 48% xuống 45% trong năm 2025 – xu hướng bất lợi chưa đảo ngược",
      "Heineken chiếm 39% thị phần toàn quốc, tăng từ 35% năm 2023, cạnh tranh ngày càng gay gắt",
      "Sản lượng tiêu thụ Q1/2026 giảm 4% YoY do thời tiết bất lợi và thay đổi xu hướng tiêu dùng",
      "Biên lợi nhuận gộp ổn định 28% nhờ tối ưu chi phí sản xuất",
      "Cổ tức hấp dẫn: yield 5,5% hàng năm – hỗ trợ giá trong bối cảnh tăng trưởng chậm",
    ],
    content: `## Cạnh tranh gia tăng – thị phần bị thu hẹp

Sabeco đang đối mặt với áp lực cạnh tranh ngày càng gia tăng từ Heineken Vietnam và các thương hiệu bia nhập khẩu châu Âu. Thị phần miền Nam – thị trường truyền thống mạnh của Bia Saigon – giảm từ 48% (2023) xuống 45% (2025). Heineken đã nâng thị phần toàn quốc lên 39% nhờ chiến lược marketing bài bản và danh mục sản phẩm phong phú.

## Thay đổi xu hướng tiêu dùng

Thế hệ Z và millennials đang dịch chuyển sang các loại đồ uống thay thế như craft beer, RTD (ready-to-drink), và đồ uống không cồn – xu hướng gây áp lực cấu trúc lên toàn ngành bia đại chúng. Sản lượng tiêu thụ Q1/2026 giảm 4% YoY, phản ánh cả tác động thời tiết bất lợi và thay đổi thị hiếu dài hạn.

## Điểm tựa – biên lợi nhuận và cổ tức

Dù tăng trưởng chậm, Sabeco duy trì biên lợi nhuận gộp ổn định 28% nhờ cơ cấu chi phí hiệu quả và mạng lưới phân phối rộng khắp 63 tỉnh thành. Chính sách cổ tức hào phóng (yield 5,5%) là lý do nhiều nhà đầu tư thu nhập giữ cổ phiếu. Tuy nhiên, đây không đủ để tạo ra upside đáng kể.

## Định giá và khuyến nghị

Áp dụng EV/EBITDA mục tiêu 18x năm 2026F (so với bình quân bia châu Á 22x, có discount do tăng trưởng thấp hơn), chúng tôi đặt giá mục tiêu 185.000 VND – upside chỉ 4,8%. Duy trì TRUNG LẬP. Cần thấy tín hiệu rõ ràng về ổn định/phục hồi thị phần trước khi có thể nâng khuyến nghị.`,
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
    summary:
      "VietinBank (CTG) hưởng lợi từ làn sóng đầu tư công lớn chưa từng có với vai trò ngân hàng chủ lực tài trợ các dự án cao tốc và hạ tầng. NIM phục hồi về 2,9% trong khi tăng trưởng tín dụng duy trì 14% YoY. Định giá P/B 1,5x hợp lý với upside 15,7%.",
    key_points: [
      "Được chỉ định tài trợ 45.000 tỷ VND cho dự án cao tốc Bắc – Nam giai đoạn 2 trong 2026",
      "NIM phục hồi lên 2,9% – cải thiện 25 bps so với đáy Q3/2025",
      "Tăng trưởng tín dụng 14% YoY, đặc biệt mạnh ở phân khúc FDI và xuất khẩu",
      "Chi phí tín dụng (credit cost) giảm từ 1,2% xuống 0,9% nhờ chất lượng tài sản cải thiện",
      "Kế hoạch niêm yết thêm trên HNX/HOSE có thể cải thiện thanh khoản cổ phiếu",
    ],
    content: `## Ngân hàng chủ lực tài trợ hạ tầng

VietinBank tiếp tục giữ vai trò là ngân hàng chủ lực trong tài trợ các dự án hạ tầng trọng điểm quốc gia. Năm 2026, CTG được Chính phủ chỉ định tài trợ 45.000 tỷ VND cho dự án cao tốc Bắc – Nam giai đoạn 2, bổ sung vào danh mục hạ tầng hiện hữu bao gồm cảng biển, nhà máy điện và khu công nghiệp. Tín dụng hạ tầng chiếm 22% tổng dư nợ – nguồn thu nhập bền vững rủi ro thấp.

## NIM phục hồi – xu hướng tích cực

NIM của CTG phục hồi từ đáy 2,65% (Q3/2025) lên 2,9% trong Q1/2026, tăng 25 bps. Quá trình phục hồi được thúc đẩy bởi: (1) cơ cấu tiền gửi tối ưu hóa với CASA tăng từ 18% lên 21%, (2) lãi suất cho vay thương mại bình thường hóa, (3) tỷ trọng cho vay FDI và xuất khẩu tăng – phân khúc có lợi suất cao.

## Tín dụng FDI – động lực mới

CTG đang trở thành đối tác ngân hàng ưu tiên của nhiều tập đoàn FDI lớn tại Việt Nam như Samsung, LG, Foxconn, và các nhà đầu tư Nhật Bản. Dư nợ cho vay FDI tăng 28% YoY trong năm 2025, chiếm 15% tổng dư nợ. Phân khúc này có chất lượng tín dụng tốt, ít rủi ro và giúp cải thiện biên lãi suất.

## Định giá và khuyến nghị

Áp dụng P/B mục tiêu 1,7x cho BVPS 2026F là 24.700 VND, giá mục tiêu là 42.000 VND – upside 15,7%. Premium so với P/B hiện tại 1,5x được biện minh bởi catalyst tăng vốn và NIM tiếp tục cải thiện. Duy trì khuyến nghị MUA.`,
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
    summary:
      "Gemadept (GMD) đang ở thời điểm thuận lợi nhất trong nhiều năm: cảng Gemalink mở rộng giai đoạn 2 lên 1,5 triệu TEU trong khi cước vận tải container quốc tế phục hồi +40% từ đầu 2026. Dự phóng LNST 2026 tăng 35% YoY. Upside 26,5% từ giá hiện tại.",
    key_points: [
      "Gemalink Phase 2 dự kiến đi vào hoạt động Q3/2026, nâng tổng công suất lên 1,5 triệu TEU/năm",
      "Cước vận tải container (SCFI Index) phục hồi +40% từ đầu 2026, thúc đẩy lượng tàu ghé cảng",
      "Dự phóng LNST 2026 đạt 1.050 tỷ VND (+35% YoY), EPS 3.500 VND",
      "Tuyến nạo vét luồng Soài Rạp hoàn thành giúp cảng tiếp nhận tàu 200.000 DWT",
      "Partnership chiến lược với CMA-CGM và Evergreen đảm bảo throughput ổn định dài hạn",
    ],
    content: `## Gemalink – cảng nước sâu chiến lược khu vực

Cảng nước sâu Gemalink tại Cái Mép – Thị Vải là một trong số ít cảng tại Việt Nam có khả năng tiếp nhận tàu container siêu lớn (ULCV) trọng tải 200.000 DWT. Giai đoạn 2 mở rộng công suất từ 1,0 lên 1,5 triệu TEU/năm dự kiến hoàn thành Q3/2026. Với vị trí chiến lược trên tuyến hàng hải quốc tế Đông – Tây, Gemalink đang thu hút các hãng tàu lớn thế giới như CMA-CGM, Evergreen và ONE.

## Cước biển phục hồi – hưởng lợi trực tiếp

Chỉ số cước vận tải container Thượng Hải (SCFI) đã tăng 40% từ đầu 2026 nhờ nhu cầu xuất khẩu toàn cầu phục hồi và gián đoạn logistics tại Biển Đỏ. Cảng Gemalink hưởng lợi gấp đôi: (1) lượng tàu ghé tăng, (2) phí dịch vụ cảng được điều chỉnh tăng 12% từ tháng 1/2026.

## Nạo vét luồng Soài Rạp – bước ngoặt kỹ thuật

Hoàn thành nạo vét luồng Soài Rạp vào Q4/2025 cho phép tàu 200.000 DWT ra vào 24/7 không phụ thuộc thủy triều, loại bỏ rào cản khai thác quan trọng nhất. Công suất khai thác hiệu quả tăng từ 75% lên 90%, trực tiếp thúc đẩy doanh thu và lợi nhuận.

## Định giá và khuyến nghị

Áp dụng EV/EBITDA mục tiêu 12x cho năm 2026F với EBITDA dự phóng 1.650 tỷ VND, giá mục tiêu SOTP là 58.000 VND – upside 26,5%. P/E forward 2026 tại giá mục tiêu là 16,6x, thấp hơn bình quân cảng container khu vực 20x. Đây là cơ hội đầu tư hấp dẫn với catalyst rõ ràng trong ngắn hạn. Khuyến nghị MUA.`,
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
    summary:
      "Vietjet Air (VJC) đang trải qua giai đoạn phục hồi mạnh mẽ với tải khách quốc tế tăng 32% YoY và load factor 87% – vượt mức trước COVID. Mở rộng đội tàu lên 100 máy bay và khai thác 12 đường bay quốc tế mới trong 2026. Dự phóng LNST 2026 đạt 2.800 tỷ VND (+25% YoY).",
    key_points: [
      "Tải khách quốc tế tăng 32% YoY trong 2T/2026, load factor 87% – vượt mức pre-COVID 85%",
      "Khai thác 12 đường bay quốc tế mới trong 2026, bao gồm Osaka, Fukuoka, Busan và Melbourne",
      "Đội tàu mở rộng lên 100 máy bay cuối 2026, giúp giảm chi phí thuê ướt và cải thiện biên lợi nhuận",
      "Doanh thu phụ trợ (ancillary revenue) chiếm 22% tổng doanh thu – cao nhất trong khu vực",
      "Rủi ro: giá nhiên liệu Jet A-1 biến động, tỷ giá USD/VND ảnh hưởng chi phí thuê tàu",
    ],
    content: `## Bùng nổ tải khách quốc tế

Vietjet Air ghi nhận tải khách quốc tế tăng 32% YoY trong 2 tháng đầu 2026, với load factor đạt 87% – vượt mức trước COVID 85%. Tuyến Việt Nam – Hàn Quốc tăng 45% YoY nhờ nhu cầu du lịch và thương mại mạnh mẽ, trong khi tuyến Nhật Bản tăng 38% YoY. Tuyến bay tới Ấn Độ và Úc cũng đang trong đà tăng trưởng tốt.

## Mở rộng mạng đường bay và đội tàu

VJC khai thác 12 đường bay quốc tế mới trong năm 2026, bao gồm Osaka, Fukuoka, Busan, Melbourne và 8 thành phố khác. Đội tàu dự kiến mở rộng lên 100 máy bay cuối 2026 (từ 88 hiện tại) nhờ nhận thêm A321 Neo từ đơn đặt hàng lịch sử. Máy bay mới tiết kiệm nhiên liệu 15-20% so với thế hệ cũ, cải thiện đáng kể biên lợi nhuận.

## Doanh thu phụ trợ – lợi thế cạnh tranh

Doanh thu phụ trợ (ancillary revenue – phí hành lý, đặt chỗ, bán hàng trên tàu) của VJC chiếm 22% tổng doanh thu – cao nhất trong khu vực và vượt xa mức bình quân LCC châu Á 15%. Chiến lược này giúp VJC duy trì giá vé cạnh tranh trong khi vẫn bảo vệ biên lợi nhuận.

## Định giá và khuyến nghị

Áp dụng EV/EBITDAR mục tiêu 8x năm 2026F với EBITDAR dự phóng 5.200 tỷ VND, giá mục tiêu là 125.000 VND – upside 19,2%. P/E forward 2026 tại giá mục tiêu là 22x – mức hợp lý cho hãng hàng không tăng trưởng cao trong bối cảnh du lịch quốc tế tiếp tục phục hồi. Duy trì khuyến nghị MUA.`,
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
    summary:
      "Masan Group (MSN) đang trong giai đoạn chuyển tiếp quan trọng với tái cơ cấu WinCommerce chưa hoàn thành và áp lực nợ vay cao. Mảng tiêu dùng MCH và MHT tăng trưởng tốt nhưng chưa đủ bù đắp cho thua lỗ từ WCM. Duy trì TRUNG LẬP chờ kết quả tái cơ cấu rõ ràng hơn.",
    key_points: [
      "WinCommerce đóng cửa 150 điểm không hiệu quả trong Q1/2026, dự kiến tiết kiệm 500 tỷ VND/năm",
      "Masan Consumer Holdings (MCH) tăng trưởng doanh thu 12% YoY – trụ cột lợi nhuận ổn định",
      "Masan High-Tech Materials (MHT) hưởng lợi từ giá vonfram tăng 18% trong 2026",
      "Tỷ lệ nợ/EBITDA ở mức 4,2x – áp lực tài chính đáng kể, cần theo dõi",
      "Catalyst: WCM đạt điểm hòa vốn EBITDA trong H2/2026 sẽ là tín hiệu nâng khuyến nghị",
    ],
    content: `## Tái cơ cấu WinCommerce – con đường còn dài

WinCommerce (WCM) đang trong giai đoạn tái cơ cấu sâu rộng nhất kể từ khi Masan mua lại. Trong Q1/2026, WCM đã đóng cửa 150 cửa hàng WinMart+ không hiệu quả và tập trung nguồn lực vào 3.200 điểm bán cải tạo theo mô hình "mini supermarket" nâng cấp. Chi phí tái cơ cấu ước tính 800 tỷ VND trong năm 2026, tuy nhiên sẽ tiết kiệm 500 tỷ VND chi phí hoạt động hàng năm sau khi hoàn thành.

## MCH và MHT – hai trụ cột bền vững

Masan Consumer Holdings ghi nhận tăng trưởng doanh thu 12% YoY trong 2T/2026, được dẫn dắt bởi ngành hàng mì ăn liền (+18%), nước mắm (+9%) và gia vị (+14%). Biên lợi nhuận gộp MCH ổn định ở 38% nhờ thương hiệu mạnh và định giá premium. Masan High-Tech Materials hưởng lợi từ giá vonfram tăng 18% YoY do nhu cầu vonfram toàn cầu từ ngành công nghiệp bán dẫn và xe điện tăng mạnh.

## Áp lực nợ vay – rủi ro cần theo dõi

Tỷ lệ nợ/EBITDA của MSN ở mức 4,2x – cao nhất trong nhóm tập đoàn tiêu dùng lớn. Chi phí lãi vay hàng năm khoảng 4.500-5.000 tỷ VND là gánh nặng đáng kể. Ban lãnh đạo đặt mục tiêu giảm nợ ròng 10.000 tỷ VND trong năm 2026 thông qua thoái vốn một số mảng không cốt lõi.

## Định giá và khuyến nghị

Áp dụng SOTP với: MCH 18x EV/EBITDA, MHT 12x và WCM EV/Sales 0,5x (discount do lỗ), giá trị hợp lý của MSN là 78.000 VND – upside hạn chế 6,3%. Duy trì TRUNG LẬP. Điều kiện nâng lên MUA: WCM đạt điểm hòa vốn EBITDA và tỷ lệ nợ/EBITDA giảm xuống dưới 3,5x.`,
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
    summary:
      "VPBank (VPB) đang ở điểm khởi đầu của chu kỳ phục hồi mạnh mẽ. FE Credit – công ty tài chính tiêu dùng – ghi nhận tỷ lệ nợ xấu giảm từ 21% xuống 17% và tăng trưởng dư nợ dương trở lại. Định giá P/B 0,9x thấp hơn đáng kể giá trị nội tại. Upside 27,9%.",
    key_points: [
      "FE Credit NPL giảm từ 21% (đỉnh 2024) xuống 17% – tín hiệu rõ về đáy chu kỳ tín dụng xấu",
      "Tăng trưởng dư nợ FE Credit dương lần đầu sau 8 quý – 2% QoQ trong Q1/2026",
      "VPBank ngân hàng mẹ tăng trưởng tín dụng mạnh 20% YoY với NIM 5,8% – dẫn đầu ngành",
      "P/B 0,9x thấp hơn đáng kể book value – margin of safety hấp dẫn",
      "Kế hoạch phát hành thêm cho SMBC (Nhật Bản) 15% cổ phần bổ sung 1,5 tỷ USD vốn",
    ],
    content: `## FE Credit – đáy chu kỳ và đà phục hồi

FE Credit đạt đỉnh nợ xấu 21% vào Q2/2024 và đã giảm dần xuống 17% trong Q1/2026 nhờ chiến lược thu hồi nợ tích cực và thắt chặt tiêu chuẩn giải ngân. Quan trọng hơn, tăng trưởng dư nợ đã dương trở lại (+2% QoQ trong Q1/2026) sau 8 quý suy giảm liên tiếp. Đây là tín hiệu rõ nhất cho thấy FE Credit đã chạm đáy chu kỳ.

## VPBank ngân hàng mẹ – tăng trưởng ấn tượng

Trong khi FE Credit phục hồi, ngân hàng mẹ VPBank tiếp tục tăng trưởng mạnh mẽ với tín dụng +20% YoY và NIM 5,8% – cao nhất trong nhóm ngân hàng niêm yết. Chiến lược tập trung vào SME, khách hàng giàu có (affluent banking) và cho vay nhà ở đang mang lại hiệu quả cao. LNST ngân hàng mẹ 2025 tăng 18% YoY.

## Thương vụ SMBC – bước đột phá chiến lược

Kế hoạch phát hành thêm 15% cổ phần cho Sumitomo Mitsui Banking Corporation (SMBC – Nhật Bản) với giá trị ~1,5 tỷ USD (nếu thực hiện) sẽ là sự kiện lịch sử. Giao dịch này không chỉ bổ sung vốn mà còn mang lại: (1) uy tín thương hiệu, (2) công nghệ ngân hàng tiên tiến, (3) mạng lưới khách hàng Nhật Bản tại Việt Nam.

## Định giá – chiết khấu sâu so với giá trị nội tại

P/B 0,9x tức là thị trường đang định giá VPB thấp hơn giá trị sổ sách – mức chiết khấu bất thường cho một ngân hàng tư nhân hàng đầu Việt Nam. Với BVPS 2026F dự phóng 19.500 VND và áp dụng P/B mục tiêu 1,1x (vẫn discount so với ngành 1,5x), giá mục tiêu là 22.000 VND – upside 27,9%. MUA.`,
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
    summary:
      "PetroVietnam Power (POW) đang đối mặt với xu hướng cấu trúc bất lợi khi điện tái tạo giá rẻ chiếm thị phần ngày càng lớn và sản lượng điện khí suy giảm. Dự phóng LNST 2026 giảm 28% YoY. Định giá premium không được biện minh với downside 11,2%. Hạ xuống BÁN.",
    key_points: [
      "Sản lượng điện khí Q4/2025 giảm 15% YoY – xu hướng cấu trúc do điện tái tạo được ưu tiên huy động",
      "Chi phí sản xuất điện khí 1.450 VND/kWh vs điện mặt trời chỉ 750-900 VND/kWh – kém cạnh tranh",
      "Dự phóng LNST 2026 giảm 28% YoY xuống còn 1.200 tỷ VND",
      "Quy hoạch điện VIII: tỷ trọng điện khí giảm từ 20% xuống 15% vào năm 2030",
      "Rủi ro thoái vốn: PVN có kế hoạch thoái vốn một phần POW trong 2026",
    ],
    content: `## Cơn gió ngược từ năng lượng tái tạo

PetroVietnam Power đang chịu áp lực cấu trúc nghiêm trọng khi điện mặt trời và điện gió ngày càng cạnh tranh trực tiếp với điện khí trong cơ cấu huy động điện quốc gia. Chi phí sản xuất điện khí của POW ở mức 1.450 VND/kWh, cao hơn đáng kể so với điện mặt trời (750-900 VND/kWh) và điện gió (900-1.000 VND/kWh). Khi tổng công suất điện tái tạo đã vượt 20.000 MW, điện khí ngày càng bị đẩy xuống thứ tự ưu tiên huy động thấp hơn.

## Suy giảm sản lượng – xu hướng không thể đảo ngược

Sản lượng điện khí của POW trong Q4/2025 giảm 15% YoY và Q1/2026 tiếp tục xu hướng này với ước tính giảm 12% YoY. Theo Quy hoạch Điện VIII được phê duyệt, tỷ trọng điện khí trong cơ cấu điện quốc gia sẽ giảm từ 20% hiện tại xuống 15% vào 2030 và tiếp tục xuống 10% vào 2035. Đây là xu hướng dài hạn không thể đảo ngược.

## Cập nhật dự phóng tài chính

Chúng tôi hạ dự phóng LNST 2026 xuống 1.200 tỷ VND (-28% YoY) do: (1) sản lượng tiếp tục giảm, (2) hệ số công suất (PLF) xuống còn 65% từ mức 75% năm 2024, (3) chi phí bảo dưỡng định kỳ tăng theo tuổi tàu máy. EPS 2026F là 530 VND/cổ phiếu.

## Định giá – bán tại mức premium không biện minh được

Tại giá thị trường hiện tại, POW giao dịch ở P/E 20x năm 2026 – premium 35% so với bình quân ngành điện khu vực đang tăng trưởng thấp hơn. Chúng tôi đặt giá mục tiêu 9.500 VND (P/E 18x, chiết khấu nhỏ so với ngành do triển vọng tăng trưởng tiêu cực), ngụ ý downside 11,2%. Hạ khuyến nghị xuống BÁN.`,
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
      summary: r.summary ?? null,
      key_points: r.key_points ?? null,
      content: r.content ?? null,
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
