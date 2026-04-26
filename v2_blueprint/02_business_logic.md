# CultivarID V2: Business Logic Engine

## 1. Unified Pricing & Tiers
The app will use **one** naming convention globally. 

| Tier Name | Enum Value | Monthly Price | Annual Price | Key Limits |
| :--- | :--- | :--- | :--- | :--- |
| **Sprout** | `seedling` | $14.99 | $144 | 1 Showcase, 1 Passport |
| **Bloom** | `bloom` | $39.99 | $384 | 5 Showcases, 5 Passports |
| **Canopy** | `canopy` | $129.99 | $1248 | 15 Showcases, 15 Passports |
| **Elite Founder** | `elite` | $497 (One-time) | N/A | Unlimited Showcases, Lifetime |

*Note: The dead 'pro' tier is completely removed.*

## 2. Onboarding Workflow (Frictionless)

**Goal:** Prevent the "payment loop" trap and route users correctly.

1. **Registration Form:** Collects Vendor Name, Email, Password.
2. **API Execution (`/api/onboarding`):**
    - Creates Supabase Auth User.
    - Inserts into `vendors` table (`subscription_status` = 'pending').
    - Generates email verification link.
3. **Frontend Routing Evaluation:**
    - Is `subscription_status` == 'active'? -> Redirect to `/dashboard`.
    - Else -> Show PayPal flow.
4. **Post-Payment:**
    - PayPal Success triggers API to set `subscription_status` = 'active'.
    - *Immediate redirect* to `/dashboard` (No 'Check your email' screen).

## 3. Leads Matching Engine (The 24hr Elite Window)

**Event Trigger:** Collector adds a plant to their wishlist.
**Engine Action:** Scans `inventory` for partial matches (`ilike %species_name%`).

**Notification Rules:**
1. **Elite Vendors (`tier` == 'elite'):**
    - `elite_notified_at` = NOW().
    - Instantly populated on dashboard.
    - Sent priority email.
2. **Standard Vendors (`tier` != 'elite'):**
    - `general_notified_at` is left `NULL`.
    - Leads Dashboard queries: `.not('general_notified_at', 'is', null)`. *(Ensures they cannot see it yet).*
3. **Cron Job (Hourly):**
    - Scans `wishlist_matches` where `general_notified_at IS NULL` and `created_at < NOW() - INTERVAL '24 HOURS'`.
    - Sets `general_notified_at` = NOW() for these records.
    - Sends standard notification emails.

## 4. Elite Seat Scarcity System
- Total cap: 100 seats.
- UI must fetch remaining seats dynamically via API. 
- Math: `100 - SELECT count(*) FROM vendors WHERE tier = 'elite'`.
- Hardcoding "17 seats left" is strictly prohibited.
