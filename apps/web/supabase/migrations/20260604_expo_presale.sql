-- Migration: Expo Pre-Sale Engine
-- Implements the vendor paid-tier monetization loop:
--   vendor verifies expo attendance -> assigns inventory to the expo ->
--   inventory revealed to Premium collectors 24h early -> collector claims/reserves.
-- See implementation_plan.md §5.

-- ─────────────────────────────────────────────────────────────
-- 1. Link inventory to a specific expo (which plants a vendor is bringing).
-- ─────────────────────────────────────────────────────────────
ALTER TABLE inventory
  ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES events(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_inventory_event_id ON inventory (event_id);

-- Vendor sets a per-expo pickup deadline. Collectors must retrieve by this time or
-- forfeit their deposit (the vendor may then sell the plant on the floor).
ALTER TABLE event_vendors
  ADD COLUMN IF NOT EXISTS pickup_deadline TIMESTAMP WITH TIME ZONE;

-- Signed affiliate host for an event — earns 50% of each deposit (half the 10% hold).
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS affiliate_user_id UUID;

-- ─────────────────────────────────────────────────────────────
-- 2. Collector tier — needed to gate the Premium pre-sale reveal.
--    No tier column existed previously; default everyone to 'free'.
-- ─────────────────────────────────────────────────────────────
ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'free';

ALTER TABLE collectors
  ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- ─────────────────────────────────────────────────────────────
-- 3. Pre-sale claims — a Premium collector reserving a plant before the expo.
--    status: reserved -> deposit_paid -> settled | cancelled
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS event_presale_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  inventory_id UUID NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
  collector_id UUID NOT NULL REFERENCES collectors(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'reserved',
  deposit_amount NUMERIC,
  deposit_pct INTEGER DEFAULT 10,
  -- 50% of the deposit is owed to the event's affiliate host.
  affiliate_cut_amount NUMERIC,
  -- Snapshot of the vendor's pickup deadline at claim time (forfeiture terms).
  pickup_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- One active claim per plant (a single specimen can only be held once).
  UNIQUE (inventory_id)
);

CREATE INDEX IF NOT EXISTS idx_presale_claims_event ON event_presale_claims (event_id);
CREATE INDEX IF NOT EXISTS idx_presale_claims_collector ON event_presale_claims (collector_id);

COMMENT ON TABLE event_presale_claims IS 'Premium collector pre-event reservations / holding deposits against vendor expo inventory.';

-- ─────────────────────────────────────────────────────────────
-- 4. RLS for the new flows.
-- ─────────────────────────────────────────────────────────────

-- Vendors manage their own attendance rows in event_vendors.
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read event vendors" ON event_vendors;
CREATE POLICY "Public can read event vendors"
  ON event_vendors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Vendor manages own attendance" ON event_vendors;
CREATE POLICY "Vendor manages own attendance"
  ON event_vendors FOR ALL
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

-- Pre-sale claims: collectors manage their own; vendors can read claims on their plants.
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
