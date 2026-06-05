# Implementation Status — Completed Features

This document reflects the **current state** of the RPV platform as of 2026-06-05. All features below are live and verified.

---

## ✅ Completed & Live

### 1. Directory-First Homepage (`/`)
- Hero: "Find Verified Rare Plant Vendors Near You"
- Interactive search with Location, Specialties, and Shipping filters (routes to `/vendors`)
- Featured vendors grid (live Supabase data)
- CTA: "Claim Your Free Listing" (vendor-focused)
- "For Collectors" benefits section with waitlist
- **No web development messaging on homepage**

### 2. Vendor Directory (`/vendors`)
- Server-side filtering by name, location, specialty
- Full vendor cards with verified badges, unclaimed status
- "Claim Listing" CTA for unclaimed vendors
- Filter summary + "Clear filters" link

### 3. Single-Tier Pricing — Vendor (`/pricing`)
- **One membership:** $24.99/month or $249/year
- **Founding offer:** First 50 vendors get **1 year free** with purchase
- **Features:** Unlimited inventory, premium placement, verified badge, expo pre-sale engine, 0% commission
- **Live counter:** Shows remaining founding spots (updates real-time)
- **Hardware add-on:** CultivarID tags optional ($15+ on-demand)

### 4. Single-Tier Pricing — Collector (`/collector/pricing`)
- **One membership:** $49/year
- **Marketed as:** Half-off from standard $98/year (first 100 collectors only)
- **Founding offer:** Live counter shows remaining spots
- **Features:** 48-hour early access, 10% deposit hold, verified reviews, shortlists, priority alerts
- **Deposit explainer:** 3-step flow (lock, deadline, settlement) with forfeiture terms

### 5. Founding Enforcement (Vendors & Collectors)
- **Vendor:** First 50 signups auto-assigned `is_founding_vendor=true` + `founding_free_until` (12 months extra)
  - Server-capped at 50 via API gate
  - Free year honored in the database (recurring billing deferred)
- **Collector:** First 100 signups charged $49; thereafter $98
  - Server-capped at 100 via PayPal amount verification
  - Live UI updates price + strikethrough based on availability

### 6. Expo Pre-Sale Engine (Full Loop)
- **Vendor side:**
  - Dashboard control: verify/withdraw expo attendance
  - Per-expo pickup deadline setter
  - Inventory assignment (which plants to bring)
- **Collector side:**
  - 48-hour gated pre-sale showroom (premium members only)
  - Plant cards with price, vendor, "Hold for $X (10% down)" button
  - Deposit collection via PayPal
  - Reserved status with pickup deadline snapshot
- **Safety:** Race-safe deposits with auto-refund on collision or rejection
- **Affiliate:** 50% of deposit recorded per claim (`affiliate_cut_amount`)

### 7. 48-Hour "Inventory Live" Alerts
- Hourly cron (`api/cron/presale-alerts`) triggers when pre-sale window opens
- Emails all Premium collectors once per event
- Tracks `events.presale_alert_sent_at` to prevent repeats
- Vercel-scheduled with `CRON_SECRET` authentication

### 8. Navigation & Footer
- **Navbar:** CTA retargeted to `/vendors` (browse & claim); announcement bar directory-focused
- **Footer:** CultivarID consolidated into dedicated column; all links in place
- All existing link IDs preserved (analytics safe)

---

## 🔭 Deferred (Future Passes)

1. **Recurring billing** — Founding free-year is recorded but one-time PayPal captures don't auto-waive renewals
2. **Affiliate payout ledger** — 50%-of-deposit cut tracked in DB; no settlement/payouts yet
3. **PayPal sandbox validation** — Deposit/refund logic verified in code; needs browser test
4. **Directory schema expansion** — Reviews, social links, phone, physical address (planned §2 work)
5. **CRM dashboard** — Two-phase vendor pipeline (Directory → Web Dev upsell) — deferred
6. **Nurseries landing page** — CultivarID repositioning for mother-plant vendors — deferred

---

## 🚀 No Changes Needed (All Complete)

✅ Homepage redesign (directory-first, zero web dev mention)
✅ Vendor/collector pricing pages (single-tier, live counters)
✅ Founding enforcement (server-capped, auto-assigned)
✅ Expo pre-sale (staged inventory, deposits, forfeiture, affiliate)
✅ 48h alerts (cron, email, one-per-event)
✅ Race-safe deposits (auto-refund on collision)
✅ Nav/footer consolidation (CultivarID relocated)

All code is live on production, typecheck passes, migrations applied & verified.
