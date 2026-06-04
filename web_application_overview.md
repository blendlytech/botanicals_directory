# Rare Plant Vendors (RPV) Web Application Overview

## Introduction
The RPV Project is a specialized web application serving as the premier botanical event directory and marketplace. It is specifically designed to facilitate the high-ticket rare plant market by removing friction points such as shipping trauma, high auction fees, and genetic fraud.

## Core Value Proposition
- **For Vendors:** Zero commission leakage, de-risked logistics by allowing pre-sale reservations online before physical transport, and a localized matchmaking model that drives digital buyers to physical expo pickups for a 100% plant survival rate.
- **For Collectors:** Stress-free acquisition of rare botanicals through an intuitive pre-sale system, ensuring verified provenance of plants.
- **CultivarID™ Technology:** A proprietary provenance system that utilizes encrypted NFC tags attached to the plant stems. It links physical botanical specimens directly to an immutable digital passport, providing a transparent lineage and genetic confirmation. 

## Technology Stack
The project is architected as a **Turborepo Monorepo** containing multiple applications and shared packages:
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript, React 18
- **Backend & Database:** Supabase (for authentication and database operations via `@supabase/ssr` and `@supabase/supabase-js`)
- **Payments:** PayPal Integration (`@paypal/react-paypal-js`)
- **Other Utilities:** `html5-qrcode` and `qrcode.react` for handling QR scanning flows, `nodemailer` for communications, and `lucide-react` for iconography.

## Monorepo Architecture

### Apps
1. **`apps/web` (Main Application)**
   The primary Next.js web application encompassing the main marketing site, vendor profiles, event directories, pricing, and the core marketplace.
   - **Key Routes:**
     - `/events`, `/vendors` - Directories for expos and sellers.
     - `/dashboard` - Protected vendor/collector portal.
     - `/cultivar-id`, `/scan` - Pages dedicated to the NFC tag scanning and digital passport visualization.
     - `/pricing`, `/checkout` - Tiered subscription management (e.g., Elite Founder Pass, Collector Waitlist).

2. **`apps/scanner` (Utility Application)**
   A secondary application focused strictly on scanning CultivarID NFC tags and QR codes to instantly verify plant provenance in physical environments like expos.

### Packages
- **`packages/supabase`:** Shared database client code, type definitions, and queries to ensure a single source of truth for the Supabase backend.
- **`packages/ui`:** A shared UI component library (containing elements like `NavbarClient`, `FooterClient`, `ThemeProvider`) allowing for consistent design and reusability across both `web` and `scanner` apps.

## Current State & Design Aesthetic
- **Aesthetic:** The web application features a premium, luxury-focused design leveraging a rich color palette (e.g., deep greens `#0B3D2E`, golds `var(--gold)`, charcoal) and typography (Cormorant Garamond and Montserrat) to elevate the botanical market. 
- **Development Status:** The platform has solid structural scaffolding for vendor onboarding, a tiered membership strategy (including a limited $497 "Elite Founder Pass"), and the foundational UI for the "CultivarID" digital passport.

## Conclusion
The RPV Project is positioned to be an innovative, niche platform that heavily leverages localized e-commerce combined with physical hardware (NFC tags) to solve major logistical and trust issues within the rare plant community. Its scalable Turborepo structure and utilization of Supabase and Next.js offer a robust foundation for future iterations.
