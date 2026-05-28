# CultivarID: AI Agent Build Guide

## 1. Project Overview & Mission

You are tasked with building **CultivarID**, the premier Digital Product Passport (DPP) and inventory management web application designed exclusively for the high-end rare plant market. 

CultivarID operates as the B2B companion app to the RarePlantVendors directory. Its mission is to bridge the gap between physical botanical events (expos, pop-ups) and verifiable digital provenance. It transforms the analog experience of buying rare plants with paper tags into a high-trust, premium digital ecosystem.

## 2. Technology Stack & Constraints

- **Framework:** Next.js (App Router recommended) for robust routing, SEO, and API capabilities.
- **Styling:** Vanilla CSS. **DO NOT** use TailwindCSS. Focus on a bespoke, highly customized CSS architecture to achieve maximum flexibility and control.
- **Backend & Database:** Supabase (PostgreSQL).
- **Hosting/Deployment:** Vercel (or similar Next.js-optimized host).

## 3. Design Aesthetics: "Deep Forest Luxe"

This is a premium, high-trust application. It must look and feel like a "Rolex-tier" product.
- **Color Palette:** Gold, White, Warm Sand, and Emerald. Use rich, deep colors (e.g., sleek dark modes) and avoid generic plain colors.
- **Visuals:** Implement glassmorphism, smooth gradients, and high-quality UI elements.
- **Interactions:** Use dynamic micro-animations (hover effects, smooth page transitions) to make the interface feel responsive and alive.
- **Typography:** Modern typography via Google Fonts (e.g., Inter, Outfit, or Roboto). Avoid browser defaults.

## 4. Core Features & Implementation Plan

### A. Digital Provenance & Verification (The Digital Ledger)
- **Goal:** Replace fragile paper tags with an immutable digital record.
- **Features:** 
  - Vendor dashboard to add/edit plant inventory.
  - Form fields to track the complete history: Genetic Origin (e.g., sport variegation), Propagation Method (tissue culture vs. stem cutting), and Mother-Plant Verification IDs.
  - Display a "Verified Status" badge for plants with complete lineage.

### B. Dynamic QR Code Generation
- **Goal:** Empower vendors to generate physical touchpoints for the digital passports.
- **Features:**
  - A utility in the vendor dashboard to instantly generate a unique QR code for each registered plant.
  - Formatting for the QR codes to be printable, durable care tags for physical event booths.
  - The QR code must resolve to the unique public URL of the plant's CultivarID passport.

### C. Immersive Customer Discovery (Public-Facing Passport Page)
- **Goal:** Provide a stunning mobile experience when attendees scan a QR tag on the event floor.
- **Features:**
  - Highly optimized, mobile-first responsive layout.
  - Display high-resolution imagery of the specific plant.
  - Present the botanical lineage, verification status, and precise care instructions.
  - Use the "Deep Forest Luxe" aesthetic to build immediate trust and value.

### D. Real-Time POS & Inventory Sync
- **Goal:** Seamlessly integrate the digital passport into the physical transaction flow.
- **Features:**
  - Point-of-Sale (POS) utility accessible to the vendor.
  - Allow attendees to potentially initiate purchase from their scanned view, or for vendors to mark an item as "Sold."
  - Automatically deduct live stock and synchronize directly with the vendor's central dashboard upon a sale.
  - Prevent double-selling of unique, individual specimens.

## 5. Suggested Database Schema (Supabase)

To support this functionality, you will need to design the following core tables:

1. **`vendors`**: Information about the seller (links to RarePlantVendors auth if applicable).
2. **`plants`**: The core inventory item. Needs fields for `id`, `vendor_id`, `name`, `species`, `description`, `price`, `status` (available, sold), `high_res_image_url`, and `care_instructions`.
3. **`plant_lineage`**: A relation table or JSONB field on the plant tracking `genetic_origin`, `propagation_method`, and `mother_plant_id`.
4. **`transactions`**: Recording the POS events, linking `plant_id`, `vendor_id`, and `sale_price`, along with timestamp.

## 6. Execution Workflow for the AI Agent

1. **Initialize Project:** Start a new Next.js project. Setup the global CSS with the "Deep Forest Luxe" design tokens.
2. **Database Setup:** Define and deploy the Supabase schema and required RLS (Row Level Security) policies so vendors can only manage their own plants.
3. **Core Dashboard Component:** Build the vendor inventory management view.
4. **QR Code Integration:** Implement a library (e.g., `qrcode.react` or similar) to generate QR codes based on plant IDs.
5. **Passport View:** Create the dynamic route (`/passport/[id]`) that renders the immersive customer discovery page.
6. **POS Logic:** Implement the API routes and UI interactions for marking items as sold and syncing inventory.
7. **Aesthetic Review:** Iterate over the entire application to ensure the premium, rich visual standards are met.

**Remember:** Do not build a basic MVP. This is our Trojan Horse—it must impress at first glance. Focus intensely on visual excellence and flawless mobile responsiveness.
