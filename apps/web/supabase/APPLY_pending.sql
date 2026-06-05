-- ============================================================================
-- RPV — Pending schema changes (paste-and-run in the Supabase SQL Editor)
-- Project: dkdrvfemtyuapzuwyrgt
-- Combines: 20260604_expo_presale.sql + 20260604_founding_offers.sql
-- Idempotent (safe to run more than once).
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- EXPO PRE-SALE ENGINE
-- ─────────────────────────────────────────────────────────────

-- 1. Link inventory to a specific expo.
ALTER TABLE inventory
  ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES events(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_inventory_event_id ON inventory (event_id);

-- Vendor's per-expo pickup deadline (deposit forfeiture terms).
ALTER TABLE event_vendors
  ADD COLUMN IF NOT EXISTS pickup_deadline TIMESTAMP WITH TIME ZONE;

-- Signed affiliate host for an event (earns 5% of deposits).
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS affiliate_user_id UUID;

-- 2. Collector tier (gates the Premium pre-sale reveal).
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'free';
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- 3. Pre-sale claims.
CREATE TABLE IF NOT EXISTS event_presale_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  inventory_id UUID NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
  collector_id UUID NOT NULL REFERENCES collectors(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'reserved',
  deposit_amount NUMERIC,
  deposit_pct INTEGER DEFAULT 10,
  affiliate_cut_amount NUMERIC,
  pickup_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (inventory_id)
);
CREATE INDEX IF NOT EXISTS idx_presale_claims_event ON event_presale_claims (event_id);
CREATE INDEX IF NOT EXISTS idx_presale_claims_collector ON event_presale_claims (collector_id);
COMMENT ON TABLE event_presale_claims IS 'Premium collector pre-event reservations / holding deposits against vendor expo inventory.';

-- 4. RLS.
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read event vendors" ON event_vendors;
CREATE POLICY "Public can read event vendors"
  ON event_vendors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Vendor manages own attendance" ON event_vendors;
CREATE POLICY "Vendor manages own attendance"
  ON event_vendors FOR ALL
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

ALTER TABLE event_presale_claims ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Collector manages own claims" ON event_presale_claims;
CREATE POLICY "Collector manages own claims"
  ON event_presale_claims FOR ALL
  USING (collector_id IN (SELECT id FROM collectors WHERE user_id = auth.uid()))
  WITH CHECK (collector_id IN (SELECT id FROM collectors WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Vendor reads claims on own inventory" ON event_presale_claims;
CREATE POLICY "Vendor reads claims on own inventory"
  ON event_presale_claims FOR SELECT
  USING (inventory_id IN (
    SELECT i.id FROM inventory i
    JOIN vendors v ON v.id = i.vendor_id
    WHERE v.user_id = auth.uid()
  ));

-- ─────────────────────────────────────────────────────────────
-- FOUNDING OFFER ENFORCEMENT
-- ─────────────────────────────────────────────────────────────

ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS is_founding_vendor BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS founding_number INTEGER;
ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS founding_free_until TIMESTAMP WITH TIME ZONE;

ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS is_founding_collector BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS founding_number INTEGER;

CREATE INDEX IF NOT EXISTS idx_vendors_founding ON vendors (is_founding_vendor) WHERE is_founding_vendor;
CREATE INDEX IF NOT EXISTS idx_collectors_founding ON collectors (is_founding_collector) WHERE is_founding_collector;

-- ============================================================================
-- Done. Verify with:
--   select column_name from information_schema.columns where table_name='inventory' and column_name='event_id';
--   select * from event_presale_claims limit 1;
-- ============================================================================
