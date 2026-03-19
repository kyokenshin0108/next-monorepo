-- ================================================================
-- experts — Đội ngũ chuyên gia
-- Chạy trong Supabase SQL Editor
-- ================================================================

create table if not exists experts (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  role             text        not null,
  experience_years int,
  description      text,
  avatar_url       text,
  tags             jsonb       not null default '[]'::jsonb,
  facebook_url     text,
  youtube_url      text,
  tiktok_url       text,
  followers_count  text,
  rating           text,
  live_schedule    text,
  is_featured      boolean     not null default false,
  is_published     boolean     not null default true,
  sort_order       int         not null default 0,
  created_at       timestamptz not null default now()
);

alter table experts enable row level security;

create policy "public_read_published"
  on experts for select
  using (is_published = true);

create index if not exists idx_experts_sort     on experts (sort_order);
create index if not exists idx_experts_featured on experts (is_featured) where is_featured = true;

-- ================================================================
-- Dữ liệu mẫu
-- ================================================================

insert into experts
  (name, role, experience_years, description, tags, followers_count, rating, live_schedule, is_featured, sort_order)
values
(
  'Trần Đức Minh', 'Trưởng Phòng Phân Tích', 15,
  'Chuyên gia phân tích kỹ thuật với hơn 15 năm kinh nghiệm trong lĩnh vực tài chính. Từng tư vấn cho nhiều quỹ đầu tư lớn và doanh nghiệp niêm yết.',
  '[{"label":"Phân Tích Kỹ Thuật","color":"bg-blue-100 text-blue-800"},{"label":"Tư Vấn Đầu Tư","color":"bg-green-100 text-green-800"}]',
  '15.8K', '4.9/5 (256 đánh giá)', 'Thứ 2, 4, 6 (19:30)',
  true, 1
),
(
  'Phạm Thị Hương', 'Chuyên Gia Phân Tích Cơ Bản', 12,
  'Chuyên gia phân tích cơ bản với kinh nghiệm phong phú trong việc đánh giá doanh nghiệp. Từng làm việc tại các công ty chứng khoán hàng đầu.',
  '[{"label":"Phân Tích Cơ Bản","color":"bg-orange-100 text-orange-800"},{"label":"Quản Lý Danh Mục","color":"bg-purple-100 text-purple-800"}]',
  '12.4K', '4.8/5 (189 đánh giá)', 'Thứ 3, 5 (20:00)',
  true, 2
),
(
  'Nguyễn Văn Thành', 'Chuyên Gia Chiến Lược Giao Dịch', 8,
  'Chuyên gia về chiến lược giao dịch và phân tích kỹ thuật. Có kinh nghiệm trong việc phát triển các hệ thống giao dịch tự động và quản lý rủi ro.',
  '[{"label":"Phân Tích Kỹ Thuật","color":"bg-blue-100 text-blue-800"},{"label":"Chiến Lược Giao Dịch","color":"bg-red-100 text-red-800"}]',
  '9.2K', '4.7/5 (143 đánh giá)', 'Thứ 2, 4 (21:00)',
  true, 3
),
(
  'Lê Hoàng Nam', 'Giám Đốc Tư Vấn Đầu Tư', 14,
  'Chuyên gia tư vấn đầu tư với kinh nghiệm phong phú trong việc xây dựng danh mục đầu tư. Từng làm việc tại các ngân hàng đầu tư quốc tế.',
  '[{"label":"Phân Tích Cơ Bản","color":"bg-orange-100 text-orange-800"},{"label":"Tư Vấn Đầu Tư","color":"bg-green-100 text-green-800"}]',
  '11.6K', '4.9/5 (211 đánh giá)', 'Thứ 6 (19:00)',
  true, 4
),
(
  'Vũ Thị Mai Anh', 'Chuyên Gia Quản Lý Danh Mục', 10,
  'Chuyên gia quản lý danh mục đầu tư với kinh nghiệm trong việc xây dựng và quản lý danh mục đầu tư cho các khách hàng cá nhân và tổ chức.',
  '[{"label":"Quản Lý Danh Mục","color":"bg-purple-100 text-purple-800"},{"label":"Phân Tích Kỹ Thuật","color":"bg-blue-100 text-blue-800"}]',
  '8.7K', '4.6/5 (128 đánh giá)', 'Thứ 3 (19:30)',
  false, 5
),
(
  'Đỗ Quang Huy', 'Chuyên Gia Chiến Lược Giao Dịch', 7,
  'Chuyên gia chiến lược giao dịch với kinh nghiệm trong việc phát triển các chiến lược giao dịch ngắn hạn và trung hạn trên thị trường chứng khoán.',
  '[{"label":"Chiến Lược Giao Dịch","color":"bg-red-100 text-red-800"},{"label":"Phân Tích Cơ Bản","color":"bg-orange-100 text-orange-800"}]',
  '7.3K', '4.5/5 (97 đánh giá)', 'Thứ 5 (20:00)',
  false, 6
);
