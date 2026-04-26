# CultivarID V2: Execution Plan

*This document serves as the exact instruction sequence for the AI agent executing the rebuild.*

## Phase 1: Foundation (Day 1)
1. **Initialize Project:** 
   - Run `npx create-next-app@latest .` in the new directory.
   - Select: TypeScript, App Router, ESLint, no Tailwind (we use Vanilla CSS).
2. **Database Setup:**
   - Execute the SQL in `01_db_schema.md` against the Supabase instance.
   - Configure Auth Settings in Supabase (Enable Leaked Password Protection, disable public listing on `vendor-assets`).
3. **Environment:**
   - Map `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Phase 2: Design & Global Layout (Day 1)
1. **Global CSS:** Implement `03_design_system.md` variables in `globals.css`.
2. **Font Optimization:** Configure Next/Font in the root `layout.tsx`.
3. **Base Components:** Build standard buttons, inputs, and cards.

## Phase 3: Auth & Onboarding Core (Day 2)
1. **Supabase Clients:** Create `src/utils/supabase/server.ts`, `client.ts`, and `src/lib/supabaseAdmin.ts`.
2. **Onboarding API:** Build `/api/onboarding/route.ts` ensuring the `debug_link` is removed.
3. **Onboarding UI:** Build the frictionless signup flow mapped in `02_business_logic.md`. Ensure the immediate dashboard redirect logic is in place.

## Phase 4: Dashboard & Business Logic (Day 3)
1. **Shared Layout:** Build `DashboardSidebar.tsx` once and wrap the `(dashboard)` route group.
2. **Leads Engine:** Implement `dashboard/leads/page.tsx` ensuring it reads the `general_notified_at` filter correctly.
3. **Services:** Port over `eliteService.ts` and `wishlistMatchService.ts` using the new Admin Client.

## Phase 5: The Public Face & Launch Readiness (Day 4)
1. **Pricing Component:** Build `PricingToggle.tsx` using the unified enums (Sprout/Bloom/Canopy/Elite). Connect dynamic Elite seat counter.
2. **Public Directory:** Build `/vendors/[slug]/page.tsx` implementing ISR caching and removing the service-role client.
3. **Resilience Check:** Ensure `loading.tsx` and `error.tsx` exist for all primary routes.
4. **Final Security Audit:** Run Supabase Lint check. Deploy to Vercel.
