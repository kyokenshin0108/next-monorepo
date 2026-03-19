-- ================================================================
-- knowledge_posts — Kiến thức đầu tư
-- Chạy file này trong Supabase SQL Editor
-- ================================================================

-- 1. Tạo bảng
create table if not exists knowledge_posts (
  id                uuid        primary key default gen_random_uuid(),
  type              text        not null check (type in ('video', 'article', 'podcast', 'learning_path')),
  title             text        not null,
  author            text,
  category          text,
  description       text,
  thumbnail_url     text,
  content_url       text,
  duration          text,              -- '28:45' (video/podcast) hoặc '15 giờ' (learning_path)
  read_time_minutes int,               -- dành cho article (phút đọc)
  level             text        check (level in ('Cơ bản', 'Trung cấp', 'Nâng cao')),
  icon              text,              -- Remix icon class, dành cho learning_path
  color_class       text,              -- Tailwind color classes, dành cho learning_path
  view_count        int         not null default 0,
  is_featured       boolean     not null default false,
  is_published      boolean     not null default true,
  published_at      timestamptz not null default now(),
  created_at        timestamptz not null default now()
);

-- 2. Row Level Security
alter table knowledge_posts enable row level security;

-- Bất kỳ ai cũng có thể đọc bài đã publish
create policy "public_read_published"
  on knowledge_posts for select
  using (is_published = true);

-- 3. Index để query nhanh hơn
create index if not exists idx_knowledge_posts_type        on knowledge_posts (type);
create index if not exists idx_knowledge_posts_published   on knowledge_posts (published_at desc) where is_published = true;
create index if not exists idx_knowledge_posts_featured    on knowledge_posts (is_featured)       where is_featured = true;

-- ================================================================
-- 4. Dữ liệu mẫu
-- ================================================================

insert into knowledge_posts
  (type, title, author, category, description, duration, read_time_minutes, level, icon, color_class, view_count, is_featured, published_at)
values

-- ── Learning Paths ──────────────────────────────────────────────
(
  'learning_path', 'Nhà Đầu Tư Mới Bắt Đầu', null, null,
  'Từ những kiến thức cơ bản đến kỹ năng đầu tư thực chiến. Phù hợp cho người mới chưa có kinh nghiệm.',
  '15 giờ', null, 'Cơ bản',
  'ri-seedling-line', 'bg-green-100 text-green-800',
  0, false, now()
),
(
  'learning_path', 'Phân Tích Kỹ Thuật Nâng Cao', null, null,
  'Nắm vững các công cụ phân tích kỹ thuật chuyên sâu và chiến lược giao dịch hiệu quả.',
  '20 giờ', null, 'Nâng cao',
  'ri-line-chart-line', 'bg-blue-100 text-primary',
  0, false, now()
),
(
  'learning_path', 'Phân Tích Cơ Bản Doanh Nghiệp', null, null,
  'Phương pháp đánh giá doanh nghiệp và lựa chọn cổ phiếu giá trị dài hạn.',
  '18 giờ', null, 'Trung cấp',
  'ri-building-2-line', 'bg-orange-100 text-orange-800',
  0, false, now()
),

-- ── Videos ──────────────────────────────────────────────────────
(
  'video', 'Chiến Lược Giao Dịch Theo Xu Hướng: Phương Pháp Xác Định Xu Hướng Chính Xác',
  'Lê Minh Tú', 'Phân Tích Kỹ Thuật',
  'Học cách xác định xu hướng thị trường bằng các công cụ như đường trung bình động, MACD và RSI để đưa ra quyết định giao dịch hiệu quả.',
  '28:45', null, 'Trung cấp',
  null, null, 0, false, now() - interval '1 day'
),
(
  'video', 'Phân Tích Xu Hướng VN-Index Tháng 3/2026',
  'Trần Đức Minh', 'Phân Tích Kỹ Thuật',
  'Phân tích chi tiết xu hướng VN-Index và dự báo các vùng hỗ trợ, kháng cự quan trọng trong tháng 3/2026.',
  '32:18', null, 'Trung cấp',
  null, null, 3245, false, now() - interval '2 days'
),
(
  'video', 'Đánh Giá Cổ Phiếu Ngân Hàng: VCB, TCB, MBB',
  'Nguyễn Thị Hương', 'Phân Tích Cơ Bản',
  'Phân tích so sánh các chỉ số tài chính của ba cổ phiếu ngân hàng hàng đầu và khuyến nghị đầu tư.',
  '45:32', null, 'Nâng cao',
  null, null, 2876, false, now() - interval '3 days'
),
(
  'video', 'Triển Vọng Kinh Tế Việt Nam Nửa Đầu Năm 2026',
  'TS. Phạm Văn Đức', 'Kinh Tế Vĩ Mô',
  'Phân tích các yếu tố vĩ mô tác động đến tăng trưởng kinh tế Việt Nam và cơ hội đầu tư trong năm 2026.',
  '38:45', null, 'Nâng cao',
  null, null, 3512, false, now() - interval '4 days'
),

-- ── Articles ─────────────────────────────────────────────────────
(
  'article', 'Phân Tích Báo Cáo Tài Chính Quý 4/2025 Của Nhóm Ngân Hàng',
  'Trần Thị Mai', 'Phân Tích Cơ Bản',
  'Đánh giá chi tiết kết quả kinh doanh quý 4/2025 của các ngân hàng niêm yết, so sánh các chỉ số tài chính quan trọng và triển vọng tăng trưởng năm 2026.',
  null, 12, 'Trung cấp',
  null, null, 0, false, now() - interval '1 day' - interval '6 hours'
),
(
  'article', 'Chiến Lược Đầu Tư Giá Trị: Warren Buffett và Ứng Dụng Tại Thị Trường Việt Nam',
  'Nguyễn Văn Thành', 'Phân Tích Cơ Bản',
  'Phân tích các nguyên tắc đầu tư giá trị của Warren Buffett và cách áp dụng vào thị trường chứng khoán Việt Nam hiện tại.',
  null, 15, 'Cơ bản',
  null, null, 0, false, now() - interval '5 days'
),
(
  'article', 'Hiểu Đúng Về Phân Tích Kỹ Thuật: Các Chỉ Báo Cần Biết Cho Nhà Đầu Tư Mới',
  'Phạm Thị Hương', 'Phân Tích Kỹ Thuật',
  'Giới thiệu các chỉ báo kỹ thuật phổ biến như RSI, MACD, Bollinger Bands và cách sử dụng hiệu quả trong thực chiến.',
  null, 10, 'Cơ bản',
  null, null, 0, false, now() - interval '6 days'
),

-- ── Podcasts ─────────────────────────────────────────────────────
(
  'podcast', 'Tọa Đàm: Chiến Lược Đầu Tư Chứng Khoán Quý 1/2026',
  'Nhiều chuyên gia', 'Chiến Lược Đầu Tư',
  'Cuộc tọa đàm với sự tham gia của các chuyên gia hàng đầu về thị trường chứng khoán Việt Nam, thảo luận về triển vọng thị trường và chiến lược đầu tư hiệu quả.',
  '52:18', null, 'Trung cấp',
  null, null, 0, true, now() - interval '2 days'  -- is_featured = true
),
(
  'podcast', 'Tác Động Của Chính Sách Tiền Tệ FED Đến Thị Trường Chứng Khoán Việt Nam',
  'TS. Nguyễn Văn Hùng', 'Kinh Tế Vĩ Mô',
  'Phân tích mối quan hệ giữa chính sách tiền tệ của FED và diễn biến thị trường chứng khoán Việt Nam, cùng dự báo xu hướng trong thời gian tới.',
  '42:18', null, 'Trung cấp',
  null, null, 0, false, now() - interval '1 day' - interval '6 hours'
),
(
  'podcast', 'Phân Tích Ngành Bất Động Sản: Cơ Hội và Thách Thức Năm 2026',
  'Lê Minh Tú', 'Phân Tích Ngành',
  'Đánh giá toàn diện về thị trường bất động sản và các cổ phiếu ngành BDS niêm yết trên sàn chứng khoán.',
  '38:45', null, 'Trung cấp',
  null, null, 0, false, now() - interval '3 days'
),
(
  'podcast', 'Chiến Lược Đầu Tư Vào Cổ Phiếu Giá Trị',
  'Trần Thị Mai', 'Chiến Lược Đầu Tư',
  'Hướng dẫn chi tiết về phương pháp chọn lọc cổ phiếu giá trị và xây dựng danh mục đầu tư dài hạn.',
  '42:18', null, 'Cơ bản',
  null, null, 0, false, now() - interval '4 days'
),
(
  'podcast', 'Tác Động Của Lạm Phát Đến Thị Trường Chứng Khoán',
  'TS. Nguyễn Văn Hùng', 'Kinh Tế Vĩ Mô',
  'Phân tích tác động của lạm phát đến các nhóm cổ phiếu khác nhau và chiến lược phòng thủ danh mục đầu tư.',
  '45:32', null, 'Trung cấp',
  null, null, 0, false, now() - interval '5 days'
);
