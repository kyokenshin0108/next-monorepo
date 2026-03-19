-- ================================================================
-- market_analysis — Nhận định thị trường
-- Chạy trong Supabase SQL Editor
-- ================================================================

create table if not exists market_analysis (
  id            uuid        primary key default gen_random_uuid(),
  type          text        not null check (type in ('video', 'article', 'short')),
  title         text        not null,
  category      text,
  author        text,
  excerpt       text,
  thumbnail_url text,
  content_url   text,
  duration      text,
  view_count    int         not null default 0,
  is_featured   boolean     not null default false,
  is_published  boolean     not null default true,
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

alter table market_analysis enable row level security;

create policy "public_read_published"
  on market_analysis for select
  using (is_published = true);

create index if not exists idx_ma_type        on market_analysis (type);
create index if not exists idx_ma_published   on market_analysis (published_at desc) where is_published = true;
create index if not exists idx_ma_featured    on market_analysis (is_featured)       where is_featured = true;

-- ================================================================
-- Dữ liệu mẫu
-- ================================================================

insert into market_analysis
  (type, title, category, author, excerpt, duration, view_count, is_featured, published_at)
values

-- ── Videos nổi bật ────────────────────────────────────────────────
(
  'video',
  'Nhận Định Thị Trường Tuần 10/2026: Cơ Hội Đầu Tư Nhóm Cổ Phiếu Ngân Hàng',
  'Nhận định hàng tuần', 'Trần Đức Minh',
  'Phân tích diễn biến thị trường tuần qua và nhận định xu hướng tuần tới với cơ hội cụ thể nhóm ngân hàng.',
  '25:16', 2458, true, now() - interval '1 day'
),
(
  'video',
  'Phân Tích Kỹ Thuật VN-Index: Xu Hướng Tháng 3/2026',
  'Phân tích kỹ thuật', 'Lê Văn Thành',
  'Phân tích các mức hỗ trợ kháng cự VN-Index, tín hiệu chỉ báo và kịch bản giao dịch tháng 3/2026.',
  '18:42', 1245, true, now() - interval '2 days'
),
(
  'video',
  'Nhận Định Thị Trường Tuần 9/2026: Cơ Hội Đầu Tư Nhóm Bất Động Sản',
  'Nhận định hàng tuần', 'Trần Đức Minh',
  'Đánh giá nhóm bất động sản sau giai đoạn điều chỉnh và các cổ phiếu tiềm năng trong ngắn hạn.',
  '22:15', 2345, true, now() - interval '8 days'
),

-- ── Articles (bài viết phân tích) ────────────────────────────────
(
  'article',
  'Phân Tích Tác Động Của Lãi Suất FED Đến TTCK Việt Nam Nửa Đầu 2026',
  'Phân tích vĩ mô', 'Đỗ Thị Mai',
  'Báo cáo phân tích chuyên sâu về mối quan hệ giữa chính sách lãi suất của FED và diễn biến thị trường chứng khoán Việt Nam. Đánh giá tác động của các quyết định lãi suất sắp tới và đề xuất chiến lược đầu tư phù hợp.',
  null, 0, true, now() - interval '1 day'
),
(
  'article',
  'Nhận Định Thị Trường Ngày 19/03/2026: Nhóm Cổ Phiếu Dầu Khí Dẫn Dắt',
  'Nhận định hàng ngày', 'Nguyễn Thị Hương',
  'Thị trường chứng khoán Việt Nam hôm nay ghi nhận phiên tăng điểm tích cực với sự dẫn dắt từ nhóm cổ phiếu dầu khí. VN-Index tăng 8,5 điểm (+0,7%) lên mức 1.285 điểm với thanh khoản cải thiện so với phiên trước đó.',
  null, 0, false, now() - interval '1 day' - interval '2 hours'
),
(
  'article',
  'Phân Tích Cơ Bản Ngành Ngân Hàng Quý 1/2026: Triển Vọng Tăng Trưởng',
  'Phân tích cơ bản', 'Phạm Minh Tuấn',
  'Báo cáo phân tích chi tiết về tình hình kinh doanh của các ngân hàng niêm yết trong quý 1/2026. Đánh giá triển vọng tăng trưởng lợi nhuận, chất lượng tài sản và khả năng sinh lời của các ngân hàng.',
  null, 0, false, now() - interval '3 days'
),
(
  'article',
  'Phân Tích Tác Động Của Lãi Suất FED Đến Thị Trường Chứng Khoán Việt Nam',
  'Phân tích vĩ mô', 'Đỗ Thị Mai',
  'Phân tích chi tiết về mối quan hệ giữa chính sách lãi suất của Cục Dự trữ Liên bang Mỹ (FED) và diễn biến của thị trường chứng khoán Việt Nam. Đánh giá tác động của các quyết định lãi suất sắp tới.',
  null, 0, false, now() - interval '5 days'
),

-- ── Videos (tab Videos) ──────────────────────────────────────────
(
  'video',
  'Phân Tích Kỹ Thuật VN-Index: Xu Hướng Tháng 3/2026',
  'Phân tích kỹ thuật', 'Lê Văn Thành', null, '18:42', 1245, false, now() - interval '2 days'
),
(
  'video',
  'Nhận Định Thị Trường Tuần 9/2026: Cơ Hội Đầu Tư Nhóm Bất Động Sản',
  'Nhận định hàng tuần', 'Trần Đức Minh', null, '22:15', 2345, false, now() - interval '8 days'
),
(
  'video',
  'Phân Tích Cơ Bản: Định Giá Cổ Phiếu Theo Phương Pháp DCF',
  'Phân tích cơ bản', 'Phạm Minh Tuấn', null, '25:38', 1876, false, now() - interval '11 days'
),
(
  'video',
  'Tọa Đàm: Triển Vọng Thị Trường Chứng Khoán Việt Nam 2026',
  'Tọa đàm', 'Nhiều chuyên gia', null, '28:42', 3210, false, now() - interval '14 days'
),
(
  'video',
  'Phân Tích Kỹ Thuật: Nhận Diện Mô Hình Giá Hiệu Quả',
  'Phân tích kỹ thuật', 'Lê Văn Thành', null, '19:24', 2156, false, now() - interval '17 days'
),
(
  'video',
  'Chiến Lược Quản Lý Rủi Ro Trong Đầu Tư Chứng Khoán',
  'Hướng dẫn đầu tư', 'Nguyễn Thị Hương', null, '23:15', 1945, false, now() - interval '21 days'
),

-- ── Shorts ───────────────────────────────────────────────────────
(
  'short', 'Mô hình đảo chiều xu hướng - Phân tích kỹ thuật',
  'Phân tích kỹ thuật', 'Lê Văn Thành', null, '1:25', 1200, false, now() - interval '1 day'
),
(
  'short', '3 chỉ số định giá cổ phiếu quan trọng nhất',
  'Phân tích cơ bản', 'Phạm Minh Tuấn', null, '0:58', 2500, false, now() - interval '2 days'
),
(
  'short', 'Dòng tiền đang chảy vào nhóm ngành nào?',
  'Nhận định hàng ngày', 'Trần Đức Minh', null, '1:12', 1800, false, now() - interval '3 days'
),
(
  'short', 'Chiến lược đầu tư trong thị trường biến động',
  'Hướng dẫn đầu tư', 'Nguyễn Thị Hương', null, '0:45', 3100, false, now() - interval '4 days'
),
(
  'short', '5 bước xác định điểm vào lệnh hiệu quả',
  'Phân tích kỹ thuật', 'Lê Văn Thành', null, '1:05', 2800, false, now() - interval '5 days'
),
(
  'short', 'Cách lọc cổ phiếu tiềm năng trong 2 phút',
  'Phân tích cơ bản', 'Phạm Minh Tuấn', null, '0:52', 1900, false, now() - interval '6 days'
),
(
  'short', '3 nguyên tắc quản trị rủi ro mọi nhà đầu tư cần biết',
  'Hướng dẫn đầu tư', 'Đỗ Thị Mai', null, '1:18', 2300, false, now() - interval '7 days'
),
(
  'short', 'Phân biệt các nhóm ngành trên TTCK Việt Nam',
  'Kiến thức cơ bản', 'Trần Đức Minh', null, '0:48', 1700, false, now() - interval '8 days'
);
