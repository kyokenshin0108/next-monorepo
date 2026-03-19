-- Cache table for YouTube API responses
-- Stores a single row (id=1) with the latest YouTubeStatus + timestamp
create table if not exists youtube_cache (
  id        integer primary key default 1,
  data      jsonb        not null,
  fetched_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- No RLS needed — only accessed by service role key server-side
