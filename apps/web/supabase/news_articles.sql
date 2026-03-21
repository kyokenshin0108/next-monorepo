-- ================================================================
-- news_articles — Tin tức tổng hợp từ RSS
-- Chạy trong Supabase SQL Editor
-- ================================================================

create table if not exists news_articles (
  id           uuid        primary key default gen_random_uuid(),
  source       text        not null check (source in ('cafef', 'vneconomy', 'vnexpress')),
  category     text        not null default 'chung-khoan'
                           check (category in ('domestic', 'international', 'company', 'industry', 'chung-khoan')),
  title        text        not null,
  summary      text,
  content      text,
  url          text        unique not null,
  image_url    text,
  published_at timestamptz not null,
  fetched_at   timestamptz not null default now(),
  is_featured  boolean     not null default false
);

alter table news_articles enable row level security;

create policy "public_read_news"
  on news_articles for select
  using (true);

-- ── Indexes ──────────────────────────────────────────────────────
create index if not exists idx_na_published on news_articles (published_at desc);
create index if not exists idx_na_category  on news_articles (category);
create index if not exists idx_na_source    on news_articles (source);
create index if not exists idx_na_featured  on news_articles (is_featured) where is_featured = true;
