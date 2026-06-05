-- Migration: 48h pre-sale "inventory live" alert tracking.
-- One timestamp per event so the cron emails the premium cohort exactly once when the
-- 48h pre-sale window opens. See implementation_plan.md §5.

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS presale_alert_sent_at TIMESTAMP WITH TIME ZONE;
