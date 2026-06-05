# Goal Description

Pivot the RPV platform from a CultivarID-centric model to a Directory-first approach. Re-target the CultivarID feature exclusively to full-scale nurseries focusing on mother-plant lineage. The primary user acquisition funnel will be "Claim your Directory Listing." 

As a secondary monetization strategy, we will offer web development services to vendors *only after* they have claimed their directory listing, via targeted cold outreach. This service will remain discreet and separate from the core directory branding.

## User Review Required

> [!WARNING]
> This is the finalized implementation plan. Please provide your explicit approval so we can begin execution (updating the database schema, modifying the homepage, and setting up the new routing).

## Proposed Changes

### 1. Homepage Redesign (Directory First)

The homepage must immediately deliver value to collectors looking for vendors and plants. There should be no mention of web development services here.

#### [MODIFY] `apps/web/src/app/page.tsx`
- **Remove:** The current CultivarID hero section, Scarcity Status Bar, and Elite Founder promos.
- **Add:** A high-impact hero section focused on finding rare plant vendors.
- **Add:** A prominent, interactive search bar/filtering component directly on the homepage.
  - **Mandatory Filters:** Location, Specialties (e.g., Aroids, Hoyas), and Shipping capabilities.
- **Add:** Featured or recently added vendor cards.
- **Add:** Clear CTA for vendors to "Claim Your Free Listing."

### 2. Directory Listing Data Structure & Review Aggregation

Listings must provide a comprehensive view of the vendor.

#### [MODIFY] Supabase Database Schema (`vendors` table)
Add the following required fields to complete a standard directory listing:
- Email Address
- Web Address / Social Links (IG, Facebook, TikTok)
- Contact Phone Number
- Physical Address (or Region if online-only)
- **Review Aggregation Fields:** `average_rating`, `total_reviews`, and `review_source`.

#### [NEW] Review Integration Logic
- **Research Phase:** We will research the top platforms where rare plant vendors currently receive reviews (e.g., Google Business, Facebook, Trustpilot, or niche forums).
- **Filtering Logic:** Only reviews that are **4 stars or higher** will be ingested and displayed on the vendor's directory profile.

### 3. CultivarID Repositioning

CultivarID remains active but is hidden from the general vendor flow.

#### [NEW] `apps/web/src/app/nurseries/page.tsx`
- Create a dedicated landing page specifically pitching CultivarID to full-scale nurseries.
- Focus the messaging on mother-plant verification and lineage tracking for seedlings.

### 4. Discreet Web Development Upsell & CRM

The web development service is a backend monetization strategy, decoupled from the core directory identity.

#### [NEW] `apps/web/src/app/services/web-development/page.tsx`
- A landing page detailing the web development services offered to vendors.
- **Visibility:** Only linked discreetly in the global site footer (not in the main navigation or homepage).

#### [NEW] `apps/web/src/app/dashboard/crm/page.tsx`
- Build an internal CRM dashboard for you to track the two-phase outreach pipeline:
  - **Phase 1 (Directory):** `Identified`, `Contacted`, `Listing Claimed`.
  - **Phase 2 (Upsell):** `Audited Website/IG`, `Pitched Web Dev`, `Closed Web Dev`.

### 5. Expo Pre-Sale Engine (Vendor Paid-Tier Monetization)

The Expo (`/events`) tab is a **permanent, core** part of the directory — never removed. It
is the anchor for the primary vendor paid-tier value loop and the Premium Collector upsell.

**The loop:** Vendors verify attendance at an upcoming expo → paid vendors list the
inventory (with photos) they will physically bring → that inventory is revealed to paid
Collectors **48 hours before** the event → paid Collectors **claim/reserve** plants with a
**10% holding deposit**, picking up in person by a vendor-set deadline. This sells collectors
the same "early access" they otherwise pay dearly for at the door.

**Deposit forfeiture terms:** Each claim shows "Collector must retrieve the plant by
{date/time}, set by the vendor for that expo. If not retrieved, the 10% deposit is forfeited
and the vendor may sell the plant on the expo floor." **50% of every deposit** (half the 10%
hold) is paid out to the signed affiliate expo host for that event.

#### Already in place (reuse, do not rebuild)
- `/events` map + `/events/[slug]` detail with `event_vendors` roster.
- `event_attendance` (collector RSVP) + `AttendanceButton`.
- `inventory` table (photos, price, qty, `status: available|reserved|sold|hidden`, tier limits).
- `/collector/pricing`: **Premium Collector ($9.99/mo)** already markets Early-Access Pre-Sale,
  24h Priority Alerts, and the 10–20% holding-deposit / escrow model.

#### [NEW] Vendor attendance self-verification
- Dashboard control for a claimed vendor to confirm/withdraw attendance at any upcoming expo
  (writes to `event_vendors`). Surfaces on the event roster automatically.

#### [MODIFY] Link inventory to an expo
- Add `event_id` to `inventory` so vendors flag which plants they are bringing to which event.
  Gate behind an **active paid vendor subscription** (`vendors.subscription_status = 'active'`).
- Vendor sets a per-expo **pickup deadline** (`event_vendors.pickup_deadline`).

#### [NEW] 48-hour gated pre-sale showroom
- On `/events/[slug]`, render the event's pre-sale inventory **only** to paid Collectors,
  and **only** within the 48h window before the event (public/locked otherwise).

#### [NEW] Pre-sale claim / holding-deposit flow
- Paid Collector "Claim" → sets inventory `reserved`, records the claim with the **10% deposit**
  and the snapshotted pickup deadline + forfeiture terms (deposit collection via PayPal = next pass).
- **Affiliate payout:** 50% of each deposit (half the 10% hold) is allocated to the event's signed affiliate host.

### 6. Finalized Pricing & Single-Tier Model

One paid tier each for vendors and collectors (no multi-tier ladder).

#### Vendor — $24.99/mo or $249/yr
- Unlimited inventory listings, premium directory listing, premium placement, and verified badge.
- Unlocks expo attendance verification + pre-sale staging.
- **Founding offer:** first **50** vendors get a **full year free** with their purchase.

#### Collector — $49/yr
- 48-hour early access to all expo-attending vendors' inventory.
- Ability to place a **10% deposit** to hold a plant (pickup by vendor-set deadline or deposit forfeited).
- **Founding offer:** marketed as **half-off $98 → $49** for the first **100** collectors.

#### Affiliate expo hosts
- Signed affiliate hosts earn **50% of every deposit** (half the 10% hold) placed against their event's inventory.

## Verification Plan

### Automated & Manual Verification
- Deploy to a staging environment and verify the homepage correctly defaults to the directory view with Location, Specialties, and Shipping filters.
- Verify the standard vendor onboarding flow prompts for Address, Phone, Email, and Social links.
- Confirm only 4+ star reviews are rendered on vendor profiles.
- Test the internal CRM to ensure it correctly tracks a vendor moving from "Listing Claimed" to "Pitched Web Dev."
