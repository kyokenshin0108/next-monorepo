/**
 * Seed 20 sample news articles into the news_articles table.
 *
 * Usage (from apps/web directory):
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   npx tsx scripts/seed-articles.ts
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌  Missing env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

function hoursAgo(n: number) {
  const d = new Date()
  d.setHours(d.getHours() - n)
  return d.toISOString()
}

const SEED_ARTICLES = [
  // ── Domestic ───────────────────────────────────────────────────
  {
    source: "cafef",
    category: "domestic",
    title: "VN-Index bứt phá mạnh, vượt mốc 1.300 điểm trong phiên giao dịch sáng nay",
    summary:
      "Thị trường chứng khoán Việt Nam ghi nhận phiên tăng điểm ấn tượng khi VN-Index vượt ngưỡng 1.300 điểm lần đầu tiên trong 3 tháng qua. Thanh khoản đạt hơn 18.000 tỷ đồng, tăng mạnh so với phiên trước.",
    content:
      "Phiên giao dịch sáng 21/3/2026 chứng kiến VN-Index tăng mạnh 15,2 điểm (+1,18%) lên 1.302,5 điểm. Nhóm cổ phiếu ngân hàng và bất động sản dẫn dắt thị trường với lực cầu lớn từ nhà đầu tư trong nước.\n\nHNX-Index cũng tăng 3,1 điểm lên 231,8 điểm. UPCoM-Index tăng nhẹ 0,8 điểm lên 96,2 điểm.\n\nThanh khoản toàn thị trường đạt 18.350 tỷ đồng, tăng 25% so với phiên liền trước. Khối ngoại mua ròng 320 tỷ đồng trên HOSE.",
    url: "https://cafef.vn/vn-index-but-pha-manh-21032026.htm",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    published_at: hoursAgo(2),
    is_featured: true,
  },
  {
    source: "cafef",
    category: "domestic",
    title: "Khối ngoại bán ròng liên tiếp 5 phiên, dòng tiền nội tạo ra sức đỡ cho thị trường",
    summary:
      "Nhà đầu tư nước ngoài duy trì xu hướng bán ròng trong 5 phiên gần đây với tổng giá trị hơn 2.400 tỷ đồng, nhưng dòng tiền nội địa đã bù đắp tốt, giúp thị trường duy trì vùng 1.280–1.295 điểm.",
    content:
      "Theo số liệu thống kê từ HNX và HOSE, khối ngoại đã bán ròng liên tiếp trong 5 phiên từ 14–20/3/2026 với tổng giá trị 2.427 tỷ đồng trên HOSE. Cổ phiếu bị bán nhiều nhất gồm VCB, HPG, VHM.\n\nTuy nhiên, dòng tiền trong nước, đặc biệt từ các quỹ đầu tư trong nước và nhà đầu tư cá nhân, đã hấp thụ tốt lực bán này.",
    url: "https://cafef.vn/khoi-ngoai-ban-rong-5-phien-20032026.htm",
    image_url: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800",
    published_at: hoursAgo(6),
    is_featured: false,
  },
  {
    source: "cafef",
    category: "domestic",
    title: "Nhóm cổ phiếu dầu khí bùng nổ sau thông tin dự án khí Lô B - Ô Môn được phê duyệt",
    summary:
      "GAS, PVD, PVS đồng loạt tăng trần sau khi Chính phủ chính thức phê duyệt dự án đường ống dẫn khí Lô B - Ô Môn với tổng vốn đầu tư hơn 1,2 tỷ USD.",
    content:
      "Cổ phiếu nhóm dầu khí đồng loạt bùng nổ trong phiên 21/3/2026 với nhiều mã tăng kịch trần 7%. GAS tăng từ 92.000 lên 98.440 đồng/cổ phiếu. PVD tăng từ 28.500 lên 30.495 đồng. PVS tăng từ 41.200 lên 44.084 đồng.\n\nThông tin Chính phủ ký quyết định phê duyệt dự án đường ống dẫn khí từ Lô B - Ô Môn là xúc tác mạnh cho nhóm cổ phiếu này.",
    url: "https://cafef.vn/co-phieu-dau-khi-bung-no-21032026.htm",
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    published_at: hoursAgo(4),
    is_featured: false,
  },
  {
    source: "cafef",
    category: "domestic",
    title: "Thanh khoản TTCK tuần 10/2026 đạt kỷ lục 5 tháng, bình quân 16.800 tỷ đồng/phiên",
    summary:
      "Tuần giao dịch thứ 10 của năm 2026 ghi nhận thanh khoản trung bình 16.800 tỷ đồng/phiên trên HOSE, cao nhất kể từ tháng 10/2025, cho thấy dòng tiền đang quay trở lại mạnh mẽ.",
    content:
      "Theo thống kê, tổng giá trị giao dịch tuần 10/2026 (9–13/3) trên HOSE đạt 84.000 tỷ đồng, tương đương bình quân 16.800 tỷ đồng/phiên. Đây là mức thanh khoản cao nhất kể từ tháng 10/2025.",
    url: "https://cafef.vn/thanh-khoan-tuan-10-ky-luc-20032026.htm",
    image_url: null,
    published_at: daysAgo(1),
    is_featured: false,
  },
  // ── International ──────────────────────────────────────────────
  {
    source: "vnexpress",
    category: "international",
    title: "FED giữ nguyên lãi suất, tín hiệu cắt giảm 2 lần trong năm 2026",
    summary:
      "Cục Dự trữ Liên bang Mỹ (FED) quyết định giữ nguyên lãi suất ở mức 4,25-4,5% trong cuộc họp tháng 3/2026, đồng thời phát tín hiệu sẽ cắt giảm lãi suất 2 lần trong năm nay nếu lạm phát tiếp tục hạ nhiệt.",
    content:
      "Theo quyết định công bố ngày 20/3/2026 (giờ Mỹ), FOMC đã bỏ phiếu nhất trí giữ nguyên lãi suất quỹ liên bang ở vùng 4,25-4,5%.\n\nChủ tịch FED Jerome Powell cho biết: 'Chúng tôi cần thêm bằng chứng về việc lạm phát đang bền vững tiến về mục tiêu 2% trước khi xem xét điều chỉnh chính sách.'\n\nThị trường chứng khoán Mỹ phản ứng tích cực, Dow Jones tăng 0,8%, S&P500 tăng 1,1%, Nasdaq tăng 1,4%.",
    url: "https://vnexpress.net/fed-giu-nguyen-lai-suat-21032026.html",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    published_at: hoursAgo(10),
    is_featured: true,
  },
  {
    source: "vnexpress",
    category: "international",
    title: "Chứng khoán Mỹ tăng mạnh sau dữ liệu CPI tháng 2 thấp hơn dự báo",
    summary:
      "Dow Jones tăng 312 điểm (+0,8%), S&P 500 và Nasdaq đồng loạt tăng hơn 1% sau khi CPI tháng 2/2026 của Mỹ chỉ tăng 2,8% so với cùng kỳ, thấp hơn dự báo 3,0%.",
    content:
      "Dữ liệu CPI tháng 2/2026 do Bộ Lao động Mỹ công bố cho thấy lạm phát chỉ tăng 2,8% so với cùng kỳ năm trước, thấp hơn mức dự báo 3,0% của các chuyên gia phố Wall.\n\nDow Jones đóng cửa tăng 312 điểm (+0,78%) lên 40.125 điểm. S&P 500 tăng 1,12% lên 5.480 điểm. Nasdaq Composite tăng 1,45% lên 17.920 điểm.",
    url: "https://vnexpress.net/chung-khoan-my-tang-sau-cpi-thap-21032026.html",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    published_at: daysAgo(2),
    is_featured: false,
  },
  {
    source: "vnexpress",
    category: "international",
    title: "Giá dầu thế giới vượt 85 USD/thùng, áp lực lạm phát toàn cầu tăng cao",
    summary:
      "Dầu Brent vượt mốc 85 USD/thùng lần đầu trong 6 tháng sau khi OPEC+ thông báo duy trì cắt giảm sản lượng tới giữa năm 2026. Áp lực lạm phát chi phí đẩy ngày càng lo ngại.",
    content:
      "Giá dầu thô Brent tăng 1,8% lên 85,4 USD/thùng trong phiên giao dịch ngày 21/3. Dầu WTI cũng tăng 1,6% lên 81,2 USD/thùng.\n\nQuyết định duy trì cắt giảm sản lượng 2,2 triệu thùng/ngày của OPEC+ là yếu tố chính thúc đẩy giá tăng. Ả Rập Saudi và Nga tiếp tục dẫn đầu nhóm cắt giảm tự nguyện.",
    url: "https://vnexpress.net/gia-dau-vuot-85-usd-21032026.html",
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    published_at: daysAgo(1),
    is_featured: false,
  },
  {
    source: "vnexpress",
    category: "international",
    title: "Kinh tế Trung Quốc tháng 2/2026: Xuất khẩu giảm, lo ngại suy giảm tăng trưởng",
    summary:
      "Dữ liệu thương mại Trung Quốc tháng 2/2026 cho thấy xuất khẩu giảm 3,4% so với cùng kỳ, thấp hơn nhiều dự báo. Nhập khẩu cũng giảm 1,8%, phản ánh nhu cầu nội địa yếu.",
    content:
      "Tổng cục Hải quan Trung Quốc công bố số liệu cho thấy xuất khẩu tháng 2/2026 giảm 3,4% so với cùng kỳ, thấp hơn mức dự báo tăng 1,5% của giới phân tích.\n\nHang Seng Index tại Hồng Kông giảm 1,2% ngay sau khi dữ liệu được công bố. Shanghai Composite giảm 0,8%.",
    url: "https://vnexpress.net/kinh-te-trung-quoc-thang-2-yeu-21032026.html",
    image_url: null,
    published_at: daysAgo(3),
    is_featured: false,
  },
  // ── Company ────────────────────────────────────────────────────
  {
    source: "vneconomy",
    category: "company",
    title: "Vietcombank báo lãi quý 1/2026 tăng 18%, vượt kế hoạch 6 tháng đầu năm",
    summary:
      "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank - VCB) ước đạt lợi nhuận trước thuế 12.500 tỷ đồng trong quý 1/2026, tăng 18% so với cùng kỳ và đã hoàn thành 52% kế hoạch 6 tháng đầu năm.",
    content:
      "Theo thông tin từ lãnh đạo Vietcombank, quý 1/2026 ngân hàng ghi nhận tăng trưởng tín dụng 3,8% so với đầu năm, đạt 1.542.000 tỷ đồng tổng dư nợ. Thu nhập lãi thuần tăng 15,2% so với cùng kỳ 2025.\n\nTỷ lệ nợ xấu (NPL) được kiểm soát ở mức 1,12%, giảm 0,08 điểm phần trăm so với cuối năm 2025. Tỷ lệ bao phủ nợ xấu đạt 268%, thuộc nhóm cao nhất ngành.\n\nCổ phiếu VCB tăng 3,2% lên 108.400 đồng/cổ phiếu sau thông tin này.",
    url: "https://vneconomy.vn/vcb-lai-quy-1-tang-18-21032026.htm",
    image_url: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800",
    published_at: hoursAgo(8),
    is_featured: true,
  },
  {
    source: "vneconomy",
    category: "company",
    title: "Hòa Phát thông báo ĐHCĐ 2026: Kế hoạch lợi nhuận 18.000 tỷ đồng, chia cổ tức 15%",
    summary:
      "Tập đoàn Hòa Phát (HPG) vừa công bố tài liệu ĐHCĐ thường niên năm 2026 với kế hoạch lợi nhuận sau thuế 18.000 tỷ đồng, tăng 35% so với thực hiện 2025, và kế hoạch chia cổ tức 15% bằng tiền mặt.",
    content:
      "Hòa Phát đặt mục tiêu doanh thu hợp nhất 165.000 tỷ đồng trong năm 2026, tăng 22% so với năm 2025. Lợi nhuận sau thuế kế hoạch 18.000 tỷ đồng, tăng 35%.\n\nĐiểm nhấn là kế hoạch chia cổ tức 15% bằng tiền mặt - cao nhất trong 5 năm qua. Tổng số tiền cổ tức dự kiến chi trả khoảng 5.400 tỷ đồng.\n\nDự án Dung Quất 2 dự kiến đi vào hoạt động từ quý 4/2026 với công suất 5,6 triệu tấn/năm.",
    url: "https://vneconomy.vn/hoa-phat-dhcd-2026-ke-hoach-18000-ty-20032026.htm",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    published_at: daysAgo(1),
    is_featured: false,
  },
  {
    source: "vneconomy",
    category: "company",
    title: "VinHomes (VHM) ký hợp đồng hợp tác chiến lược với 3 quỹ đầu tư ngoại trị giá 2 tỷ USD",
    summary:
      "Vinhomes vừa ký kết biên bản ghi nhớ hợp tác chiến lược với ba quỹ đầu tư từ Singapore, Nhật Bản và Hàn Quốc với tổng cam kết đầu tư lên tới 2 tỷ USD vào các dự án nhà ở cao cấp tại Hà Nội và TP.HCM.",
    content:
      "Lễ ký kết được tổ chức tại Hà Nội ngày 20/3/2026 với sự có mặt của lãnh đạo cấp cao của Vinhomes và đại diện các quỹ GIC (Singapore), Sumitomo Corporation (Nhật Bản) và Korea Investment Corporation (Hàn Quốc).\n\nHợp tác tập trung vào phát triển 5 dự án căn hộ cao cấp và nhà phố thương mại tại Hà Nội và TP.HCM giai đoạn 2026-2030.\n\nCổ phiếu VHM phản ứng tích cực, tăng 4,5% lên 56.200 đồng/cổ phiếu trong phiên 21/3.",
    url: "https://vneconomy.vn/vinhomes-ky-hop-dong-2-ty-usd-21032026.htm",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    published_at: hoursAgo(5),
    is_featured: false,
  },
  {
    source: "cafef",
    category: "company",
    title: "FPT Corporation đặt mục tiêu doanh thu 100.000 tỷ đồng, mảng IT nước ngoài tăng 40%",
    summary:
      "Tập đoàn FPT đặt kế hoạch năm 2026 với doanh thu hợp nhất 100.000 tỷ đồng, tăng 28% so với 2025. Mảng dịch vụ công nghệ cho thị trường nước ngoài dự kiến tăng trưởng 40%, đạt 42.000 tỷ đồng.",
    content:
      "Trong ĐHCĐ 2026 tổ chức ngày 20/3, FPT Corporation trình bày chiến lược phát triển đến năm 2030 với mục tiêu trở thành công ty công nghệ hàng đầu Đông Nam Á.\n\nMảng FPT Software - dịch vụ CNTT xuất khẩu - tiếp tục là động lực tăng trưởng chính với đích 40% tăng trưởng, tương đương 42.000 tỷ đồng doanh thu.",
    url: "https://cafef.vn/fpt-ke-hoach-100000-ty-2026-21032026.htm",
    image_url: null,
    published_at: daysAgo(1),
    is_featured: false,
  },
  {
    source: "vneconomy",
    category: "company",
    title: "Vinamilk (VNM) công bố chiến lược tái cơ cấu, đặt mục tiêu tăng trưởng xuất khẩu 25%",
    summary:
      "Vinamilk công bố chiến lược tái cơ cấu giai đoạn 2026–2028 với trọng tâm mở rộng thị trường xuất khẩu, đặt mục tiêu tăng trưởng 25%/năm và đạt doanh thu xuất khẩu 400 triệu USD vào năm 2028.",
    content:
      "Theo thông cáo của Vinamilk, chiến lược tái cơ cấu giai đoạn 2026–2028 tập trung vào 3 trụ cột: số hóa toàn bộ chuỗi sản xuất và phân phối, mở rộng danh mục sản phẩm premium, và đẩy mạnh xuất khẩu sang thị trường ASEAN và Trung Đông.",
    url: "https://vneconomy.vn/vinamilk-tai-co-cau-2026-21032026.htm",
    image_url: null,
    published_at: daysAgo(2),
    is_featured: false,
  },
  // ── Industry ───────────────────────────────────────────────────
  {
    source: "vneconomy",
    category: "industry",
    title: "Ngành bất động sản 2026: Phân khúc nhà ở vừa túi tiền hồi phục, BĐS cao cấp vẫn trầm lắng",
    summary:
      "Báo cáo thị trường bất động sản quý 1/2026 cho thấy phân khúc nhà ở vừa túi tiền và giá rẻ đang hồi phục tích cực với lượng giao dịch tăng 35% so với quý 4/2025, trong khi phân khúc cao cấp vẫn khó khăn.",
    content:
      "Theo CBRE Việt Nam, quý 1/2026 thị trường căn hộ TP.HCM ghi nhận 4.200 căn mở bán mới, tăng 18% so với quý trước. Tỷ lệ hấp thụ đạt 72%, cải thiện đáng kể so với mức 55% của quý 4/2025.\n\nPhân khúc nhà ở dưới 3 tỷ đồng tại khu vực vùng ven TP.HCM và các tỉnh lân cận ghi nhận mức hấp thụ 85%, trong khi căn hộ cao cấp trên 8 tỷ đồng chỉ đạt 42%.",
    url: "https://vneconomy.vn/bat-dong-san-quy-1-2026-21032026.htm",
    image_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    published_at: hoursAgo(12),
    is_featured: false,
  },
  {
    source: "cafef",
    category: "industry",
    title: "Ngành thép Việt Nam đối mặt với bão thuế chống bán phá giá từ EU và Mỹ",
    summary:
      "Hiệp hội Thép Việt Nam cho biết ngành thép đang đối mặt với áp lực lớn khi EU và Mỹ liên tiếp áp thuế chống bán phá giá mới, ảnh hưởng đến khoảng 2 triệu tấn thép xuất khẩu của Việt Nam trong năm 2026.",
    content:
      "Theo Hiệp hội Thép Việt Nam (VSA), trong quý 1/2026, EU đã ban hành quyết định áp thuế chống bán phá giá 24,3% đối với thép không gỉ của Việt Nam. Mỹ cũng khởi xướng điều tra chống trợ cấp đối với thép cuộn cán nóng.\n\nTổng cộng khoảng 2 triệu tấn thép xuất khẩu Việt Nam có thể bị ảnh hưởng trong năm 2026, chiếm 18% tổng sản lượng xuất khẩu.",
    url: "https://cafef.vn/nganh-thep-viet-nam-thue-chong-ban-pha-gia-20032026.htm",
    image_url: null,
    published_at: daysAgo(1),
    is_featured: false,
  },
  {
    source: "vnexpress",
    category: "industry",
    title: "Ngành ngân hàng quý 1/2026: Tín dụng tăng 3,5%, nợ xấu được kiểm soát tốt",
    summary:
      "Hệ thống ngân hàng Việt Nam ghi nhận tăng trưởng tín dụng 3,5% trong quý 1/2026, cao hơn cùng kỳ năm 2025. Tỷ lệ nợ xấu toàn hệ thống ở mức 2,1%, giảm 0,2 điểm phần trăm.",
    content:
      "Theo số liệu sơ bộ từ Ngân hàng Nhà nước, tính đến 15/3/2026, tín dụng toàn hệ thống tăng 3,5% so với đầu năm. Tốc độ này cao hơn mức 2,8% cùng kỳ 2025.\n\nNHNN đặt mục tiêu tăng trưởng tín dụng toàn năm 2026 ở mức 15-16%.\n\nTỷ lệ nợ xấu nội bảng toàn hệ thống ở mức 2,1%, giảm từ 2,3% cuối năm 2025.",
    url: "https://vnexpress.net/ngan-hang-tin-dung-quy-1-2026-21032026.html",
    image_url: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800",
    published_at: daysAgo(2),
    is_featured: false,
  },
  {
    source: "vneconomy",
    category: "industry",
    title: "Năng lượng tái tạo: Chính phủ phê duyệt 3.500 MW điện mặt trời mái nhà trong năm 2026",
    summary:
      "Bộ Công Thương vừa trình Chính phủ phê duyệt kế hoạch phát triển 3.500 MW điện mặt trời mái nhà trong năm 2026, mở ra cơ hội lớn cho các doanh nghiệp trong lĩnh vực năng lượng tái tạo.",
    content:
      "Theo đề xuất của Bộ Công Thương, Chính phủ sẽ phê duyệt cơ chế giá FIT mới cho điện mặt trời mái nhà, dao động từ 1.644–1.990 đồng/kWh tùy loại hình và vùng miền.\n\nCác doanh nghiệp điện mặt trời như SRE, GEG, BCG Energy, và REE được kỳ vọng hưởng lợi lớn từ chính sách này.",
    url: "https://vneconomy.vn/dien-mat-troi-mai-nha-3500mw-2026-20032026.htm",
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    published_at: daysAgo(1),
    is_featured: false,
  },
  // ── Chung khoan (default) ──────────────────────────────────────
  {
    source: "cafef",
    category: "chung-khoan",
    title: "Nhà đầu tư cần biết: 5 sự kiện kinh tế quan trọng tuần tới (24-28/3/2026)",
    summary:
      "Tuần tới thị trường sẽ theo dõi sát sao 5 sự kiện kinh tế quan trọng gồm: quyết định lãi suất NHNN, PMI sản xuất tháng 3, dữ liệu thương mại Trung Quốc, biên bản họp FOMC và báo cáo GDP quý 4/2025 của Mỹ.",
    content:
      "Lịch sự kiện kinh tế tuần 24-28/3/2026:\n\n- Thứ 2 (24/3): PMI sản xuất tháng 3 của Việt Nam, Trung Quốc, Mỹ.\n- Thứ 3 (25/3): Cuộc họp Hội đồng Chính sách tiền tệ NHNN.\n- Thứ 4 (26/3): Biên bản họp FOMC tháng 3/2026.\n- Thứ 5 (27/3): Số liệu xuất nhập khẩu tháng 2/2026 của Trung Quốc.\n- Thứ 6 (28/3): GDP quý 4/2025 của Mỹ (lần 3).",
    url: "https://cafef.vn/lich-su-kien-kinh-te-tuan-24-28-3-2026-21032026.htm",
    image_url: null,
    published_at: hoursAgo(3),
    is_featured: false,
  },
  {
    source: "vnexpress",
    category: "chung-khoan",
    title: "Phân tích kỹ thuật VN-Index: Xu hướng tháng 3 và các mức hỗ trợ - kháng cự quan trọng",
    summary:
      "VN-Index đang trong xu hướng hồi phục tích cực từ vùng hỗ trợ 1.250-1.260 điểm. Vùng kháng cự tiếp theo cần theo dõi là 1.310-1.320 điểm. RSI hàng tuần đang ở vùng tích cực 55-60.",
    content:
      "Nhìn trên đồ thị tuần, VN-Index đã hoàn thành mô hình hồi phục sau khi phá vỡ thành công ngưỡng kháng cự 1.280 điểm với khối lượng lớn vào tuần 8/3-14/3.\n\nVùng hỗ trợ gần nhất: 1.280-1.290 điểm. Vùng kháng cự tiếp theo: 1.310-1.320 điểm.\n\nRSI (14) trên đồ thị tuần đang ở mức 58, chưa vào vùng quá mua (>70), còn dư địa tăng.",
    url: "https://vnexpress.net/phan-tich-ky-thuat-vn-index-thang-3-2026-21032026.html",
    image_url: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800",
    published_at: hoursAgo(7),
    is_featured: false,
  },
  {
    source: "vneconomy",
    category: "chung-khoan",
    title: "Margin toàn thị trường lên 195.000 tỷ đồng, tiếp tục là rủi ro cần theo dõi",
    summary:
      "Dư nợ margin tại các công ty chứng khoán tính đến cuối quý 1/2026 ước đạt 195.000 tỷ đồng, tăng 12% so với đầu năm. Mức này tương đương 1,1x vốn chủ sở hữu toàn hệ thống CTCK.",
    content:
      "Theo tổng hợp từ báo cáo tài chính của 20 công ty chứng khoán lớn nhất, dư nợ margin ước 195.000 tỷ đồng tính đến 15/3/2026.\n\nCác chuyên gia cảnh báo việc margin tăng mạnh trong bối cảnh chỉ số chứng khoán chưa về vùng đỉnh lịch sử là rủi ro tiềm ẩn cần theo dõi.",
    url: "https://vneconomy.vn/margin-toan-thi-truong-195000-ty-21032026.htm",
    image_url: null,
    published_at: daysAgo(1),
    is_featured: false,
  },
]

async function seed() {
  console.log(`🌱  Seeding ${SEED_ARTICLES.length} articles...`)

  let inserted = 0
  let skipped = 0

  for (const article of SEED_ARTICLES) {
    const { error } = await supabase.from("news_articles").insert(article)
    if (!error) {
      inserted++
      console.log(`  ✓  ${article.title.slice(0, 60)}...`)
    } else if (error.code === "23505") {
      skipped++
      console.log(`  ⏭  SKIP (duplicate): ${article.title.slice(0, 50)}...`)
    } else {
      console.error(`  ✗  ERROR: ${error.message} — ${article.title.slice(0, 50)}`)
    }
  }

  console.log(`\n✅  Done — inserted: ${inserted}, skipped: ${skipped}`)
}

seed().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
