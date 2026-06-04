-- Migration: Founding Offer Enforcement
-- First 50 vendors get a free year on top of their purchase; first 100 collectors
-- get the half-off $49 rate. Assignment is server-authoritative (see API routes).
-- See implementation_plan.md §6.

-- Vendors — founding free-year tracking.
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS is_founding_vendor BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS founding_number INTEGER;
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS founding_free_until TIMESTAMP WITH TIME ZONE;

-- Collectors — founding half-off tracking.
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS is_founding_collector BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS founding_number INTEGER;

-- Fast counting of claimed founding spots.
CREATE INDEX IF NOT EXISTS idx_vendors_founding ON vendors (is_founding_vendor) WHERE is_founding_vendor;
CREATE INDEX IF NOT EXISTS idx_collectors_founding ON collectors (is_founding_collector) WHERE is_founding_collector;
