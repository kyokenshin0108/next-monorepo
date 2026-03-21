-- ================================================================
-- market_analysis — Nhận định & phân tích thị trường (new schema)
-- Drop old table and recreate with extended fields
-- Run in Supabase SQL Editor
-- ================================================================

drop table if exists market_analysis cascade;

create table market_analysis (
  id               uuid        primary key default gen_random_uuid(),
  title            text        not null,
  slug             text        unique not null,
  excerpt          text,
  content          text,
  content_hash     text        unique,
  source_name      text        not null,
  source_type      text        not null,
  source_url       text        unique,
  report_pdf_url   text,
  author           text,
  ticker           text,
  recommendation   text,
  target_price     decimal,
  upside_percent   decimal,
  category         text        not null,
  subcategory      text,
  tags             text[],
  summary          text,
  key_points       text[],
  sentiment        text,
  quality_score    decimal,
  featured_image_url text,
  published_at     timestamptz not null,
  fetched_at       timestamptz not null default now(),
  is_featured      boolean     not null default false,
  view_count       integer     not null default 0,
  created_at       timestamptz not null default now()
);

-- ── Row Level Security ──────────────────────────────────────────
alter table market_analysis enable row level security;

create policy "public_read_market_analysis"
  on market_analysis for select
  using (true);

-- ── Indexes ─────────────────────────────────────────────────────
create index idx_ma_published_at    on market_analysis (published_at desc);
create index idx_ma_category        on market_analysis (category);
create index idx_ma_source_name     on market_analysis (source_name);
create index idx_ma_source_type     on market_analysis (source_type);
create index idx_ma_featured        on market_analysis (is_featured) where is_featured = true;
create index idx_ma_ticker          on market_analysis (ticker) where ticker is not null;
create index idx_ma_recommendation  on market_analysis (recommendation) where recommendation is not null;
create index idx_ma_sentiment       on market_analysis (sentiment);
