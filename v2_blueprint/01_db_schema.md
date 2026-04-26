# CultivarID V2: Database Schema & Security Blueprint

## 1. Unified Enums
We are eliminating the confusing overlapping tier names. The database will use ONE strict enum for vendor tiers.

```sql
CREATE TYPE public.vendor_tier AS ENUM ('seedling', 'bloom', 'canopy', 'elite');
CREATE TYPE public.subscription_status AS ENUM ('pending', 'active', 'past_due', 'canceled');
```

## 2. Core Tables & Indexes

### `vendors`
The core vendor profile.
- `id` (uuid, PK)
- `user_id` (uuid, FK auth.users, UNIQUE)
- `name` (text)
- `slug` (text, UNIQUE)
- `contact_email` (text, UNIQUE)
- `tier` (public.vendor_tier, DEFAULT 'seedling')
- `subscription_status` (public.subscription_status, DEFAULT 'pending')
- `elite_number` (int, nullable)
- `location_city` (text)
- `specialties` (text[])

**Critical Indexes:**
- `CREATE INDEX idx_vendors_user_id ON vendors(user_id);`
- `CREATE INDEX idx_vendors_tier ON vendors(tier);`

### `inventory`
Vendor plants available.
- `id` (uuid, PK)
- `vendor_id` (uuid, FK vendors.id)
- `species_name` (text)
- `variety` (text)
- `price` (numeric)

**Critical Indexes:**
- `CREATE INDEX idx_inventory_vendor_id ON inventory(vendor_id);` *(Missing in V1)*
- `CREATE INDEX idx_inventory_species ON inventory(species_name);` *(Missing in V1)*

### `wishlists`
Collector requests.
- `id` (uuid, PK)
- `user_id` (uuid, FK auth.users)
- `species_name` (text)

**Critical Indexes:**
- `CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);`

### `wishlist_matches`
The leads engine output.
- `id` (uuid, PK)
- `vendor_id` (uuid, FK vendors.id)
- `wishlist_id` (uuid, FK wishlists.id)
- `inventory_id` (uuid, FK inventory.id)
- `elite_notified_at` (timestamptz)
- `general_notified_at` (timestamptz)

**Critical Indexes:**
- `CREATE INDEX idx_matches_general_notified ON wishlist_matches(general_notified_at);` *(Missing in V1)*
- `CREATE INDEX idx_matches_created_at ON wishlist_matches(created_at DESC);` *(Missing in V1)*

### `analytics_events`
- `id` (uuid, PK)
- `vendor_id` (uuid, FK vendors.id)
- `event_type` (text)
- `metadata` (jsonb)

## 3. Strict Row Level Security (RLS) Policies

Every table must have `ALTER TABLE [name] ENABLE ROW LEVEL SECURITY;`.

**Vendors:**
- SELECT: Public `USING (true)`
- UPDATE: `USING (auth.uid() = user_id)`

**Inventory:**
- SELECT: Public `USING (true)`
- INSERT/UPDATE/DELETE: `USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))`

**Wishlists:**
- SELECT: `USING (auth.uid() = user_id)`
- INSERT: `WITH CHECK (auth.uid() = user_id)` *(Fixing V1 exploit)*

**Analytics Events:**
- SELECT: `USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))`
- INSERT: Handled exclusively via API Service Role. No client-side inserts. *(Fixing V1 exploit)*

**Storage `vendor-assets`:**
- SELECT: `USING (true)`
- *No listing privileges allowed.* *(Fixing V1 exploit)*
