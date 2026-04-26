# CultivarID V2: API & Architecture Map

## 1. Directory Structure (App Router)
A clean, logical separation of concerns.

```
/src
  /app
    /(public)            # Landing, Pricing, Public Directory
      page.tsx
      vendors/[slug]/page.tsx
    /(auth)              # Login, Onboarding
      login/page.tsx
      onboarding/page.tsx
    /dashboard           # Protected Vendor Area
      layout.tsx         # Contains shared DashboardSidebar
      page.tsx           # Overview
      leads/page.tsx
      inventory/page.tsx
    /api                 # Route Handlers
      /onboarding
      /webhooks/paypal
  /components            # Reusable UI
    /ui                  # Buttons, Inputs, Cards
    /dashboard           # DashboardSidebar.tsx
  /lib
    /supabase            # Client & Server clients
    /services            # Business Logic classes
```

## 2. Supabase Client Rules

**Rule 1: SSR Client (Default)**
All pages, layouts, and standard API routes MUST use `@supabase/ssr`. This ensures operations run under the context of the logged-in user and respect RLS.

**Rule 2: The Centralized Admin Client**
Create ONE file: `src/lib/supabaseAdmin.ts`. This utilizes the `SERVICE_ROLE_KEY`.
- *Usage:* Only permitted in internal background jobs (cron), secure webhook handlers (PayPal), and specific admin operations (Elite seat assignment).
- *Strict Ban:* Never use the admin client in a `page.tsx` file for public reads (Fixes the V1 `claim/[slug]` exploit).

## 3. Resilience & Caching

**Loading & Error Boundaries:**
Every major route group MUST have a `loading.tsx` (skeleton loaders) and `error.tsx` (graceful fallback UI).

**Data Caching:**
Public directory pages (`vendors/[slug]`) must implement Next.js ISR (Incremental Static Regeneration) via `revalidate = 3600`. Do not query the DB on every single public page load.

## 4. API Security Hardening
1. **Analytics:** The `/api/analytics` endpoint must verify a valid JWT session before inserting data.
2. **Debug Leaks:** Under no circumstances should `debug_link` or raw Supabase errors be returned in a `NextResponse.json()`.
3. **Cron Jobs:** `api/cron/release-leads` MUST be a `POST` request and explicitly reject requests missing the `CRON_SECRET` header.
