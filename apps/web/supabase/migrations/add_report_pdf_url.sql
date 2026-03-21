-- ================================================================
-- Add report_pdf_url column and make source_url nullable
-- Run in Supabase SQL Editor
-- ================================================================

-- Make source_url nullable (previously NOT NULL)
alter table market_analysis
  alter column source_url drop not null;

-- Remove unique constraint on source_url if it exists (allows nulls gracefully)
-- (skip if not needed; unique constraints treat NULLs as distinct so nulls are fine)

-- Add report_pdf_url column for direct PDF links
alter table market_analysis
  add column if not exists report_pdf_url text;
