# RPV Platform — Directory-First Pivot TODO

Derived from [implementation_plan.md](implementation_plan.md). Tracks execution of the
pivot from a CultivarID-centric model to a Directory-first approach.

> [!WARNING]
> The implementation plan still requires explicit user approval before execution
> (schema changes, homepage edits, routing). Do not start coding tasks until approved.

---

## 1. Homepage Redesign (Directory First) ✅
File: `apps/web/src/app/page.tsx`

- [x] Remove CultivarID hero section
- [x] Remove Scarcity Status Bar
- [x] Remove Elite Founder promos
- [x] Add high-impact hero focused on finding rare plant vendors
- [x] Add interactive search/filter component on homepage
      (`apps/web/src/components/HeroSearch.tsx` → routes to `/vendors`)
  - [x] Location filter
  - [x] Specialties filter (e.g., Aroids, Hoyas)
  - [x] Shipping capabilities filter (UI live; server filtering pending §2 schema fields)
- [x] Add featured / recently added vendor cards (live Supabase data)
- [x] Add "Claim Your Free Listing" CTA
- [x] Ensure NO mention of web development services on homepage

### Related header/footer changes (this pass)
- [x] Navbar: removed CultivarID™ Demo link; retargeted primary CTA + announcement
      bar to the directory ("Claim Your Listing"); **kept** For Collectors dropdown
- [x] Footer: consolidated all CultivarID links into a dedicated `CultivarID™` column
- [x] `/vendors` now reads `q` / `location` / `specialty` search params and filters
      server-side (shipping param accepted, filtering deferred to §2 schema work)

## 2. Directory Listing Data Structure & Review Aggregation
Target: Supabase `vendors` table

- [ ] Add `email` field
- [ ] Add web address / social links (IG, Facebook, TikTok)
- [ ] Add contact phone number
- [ ] Add physical address (or region if online-only)
- [ ] Add review aggregation fields: `average_rating`, `total_reviews`, `review_source`
- [ ] Research top review platforms for rare plant vendors
      (Google Business, Facebook, Trustpilot, niche forums)
- [ ] Implement review ingestion filtering: only 4★ and higher displayed

## 3. CultivarID Repositioning
File: `apps/web/src/app/nurseries/page.tsx` (NEW)

- [ ] Create dedicated nurseries landing page pitching CultivarID
- [ ] Focus messaging on mother-plant verification & lineage tracking
- [ ] Hide CultivarID from the general vendor flow

## 4. Discreet Web Development Upsell & CRM

### Web Dev Services Page
File: `apps/web/src/app/services/web-development/page.tsx` (NEW)
- [ ] Build landing page detailing web development services
- [ ] Link ONLY discreetly in global footer (not nav/homepage)

### Internal CRM Dashboard
File: `apps/web/src/app/dashboard/crm/page.tsx` (NEW)
- [ ] Build CRM dashboard for two-phase outreach pipeline
- [ ] Phase 1 (Directory): Identified → Contacted → Listing Claimed
- [ ] Phase 2 (Upsell): Audited Website/IG → Pitched Web Dev → Closed Web Dev

## 5. Expo Pre-Sale Engine (Single Paid-Tier Monetization)

> Expo (`/events`) tab is permanent/core. Single paid tier each side (see §6 pricing).
> **48h** early window · **10%** deposit · vendor-set pickup deadline w/ forfeiture · **5%** to affiliate host.

- [x] Vendor dashboard: self-verify / withdraw attendance at an upcoming expo (`event_vendors`)
      — `apps/web/src/app/dashboard/expos/page.tsx`, gated to active vendor membership
- [x] Vendor dashboard: per-expo **pickup deadline** control (`event_vendors.pickup_deadline`)
- [x] Schema: `inventory.event_id`, `collectors.tier`, `event_presale_claims`, pickup/affiliate fields
      — migration `20260604_expo_presale.sql` ✅ APPLIED & verified (2026-06-04)
- [x] Vendor dashboard: assign which plants (with photos) they are bringing to the expo
- [x] 48h gated pre-sale showroom on `/events/[slug]` — paid Collectors only, only in the 48h pre-event window
- [x] Pre-sale claim → `event_presale_claims` (10% deposit + 5% affiliate cut + pickup deadline/forfeiture terms),
      sets inventory `reserved` (`apps/web/src/app/components/PresaleClaim.tsx`)
- [x] Collector $49 signup → sets `tier = premium` via `api/collector/upgrade` (PayPal-verified) — ✅ schema applied
- [x] **10% deposit charged on claim** — `api/presale/claim` verifies the PayPal deposit server-side,
      then creates the `deposit_paid` claim + reserves the plant (records 5% affiliate cut + pickup deadline)
- [x] **Race-safe deposits** — any post-capture rejection (already-claimed/sold/wrong amount) now
      **auto-refunds** the PayPal capture; buyer sees the real "deposit refunded" message. Refund
      failures log CRITICAL for manual follow-up.
- [x] **48h "inventory live" alerts** — hourly cron `api/cron/presale-alerts` emails premium collectors
      once when an expo's 48h pre-sale window opens (tracks `events.presale_alert_sent_at`);
      registered in `apps/web/vercel.json`. ⚠️ Migration `20260604_presale_alerts.sql` NOT yet applied
- [ ] **Deferred:** affiliate host model + 5% deposit payout ledger (fields stubbed: `events.affiliate_user_id`, `claims.affiliate_cut_amount`)

## 6. Pricing Pages — Single-Tier Rewrite

- [x] **Vendor pricing** (`/pricing`): one tier **$24.99/mo or $249/yr** (unlimited listings,
      premium placement + badge, expo engine); first **50** vendors **1 yr free** banner
- [x] **Collector pricing** (`/collector/pricing`): one tier **$49/yr**, marketed **half-off $98 → $49**
      for first **100**; features = 48h early access + 10% hold; deposit/forfeiture explainer
- [x] `PricingToggle` (`/for-vendors`) collapsed to the single vendor membership
- [x] `/onboarding` + PayPal price map (`api/vendor/upgrade`) wired for **$249 annual** (`bloom_annual`)
- [x] Single paid tier now grants **unlimited inventory** (`TIER_LIMITS`)
- [x] **Live founding counter** — `api/founding-stats` drives "X of 50 / X of 100 left" on both pricing banners
- [x] **Founding enforcement** — server-capped: vendor upgrade grants founding free-year to first 50
      (`is_founding_vendor`, `founding_free_until`); collector upgrade enforces $49 (first 100) then $98,
      with "spots filled" UI states. Migration: `20260604_founding_offers.sql` ✅ APPLIED & verified (2026-06-04)
- [ ] **Not enforced:** actual recurring billing / honoring `founding_free_until` at renewal (membership is
      currently a one-time PayPal capture, not a recurring subscription — no renewal cycle to waive yet)
- [x] Removed dead `PricingCards.tsx`; `PricingToggle` updated — remaining stale copy sweep on `/for-vendors` body still open

## 7. Verification
- [ ] Deploy to staging; verify homepage defaults to directory view with
      Location, Specialties, Shipping filters
- [ ] Verify vendor onboarding prompts for Address, Phone, Email, Social links
- [ ] Confirm only 4+ star reviews render on vendor profiles
- [ ] Test CRM tracks a vendor from "Listing Claimed" → "Pitched Web Dev"
