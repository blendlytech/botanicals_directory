
// ── Types ──────────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: string;
  vendor_id: string;
  species_name: string;
  variety: string | null;
  price: number | null;
  quantity: number;
  image_url: string | null;
  status: 'available' | 'sold' | string;
  care_instructions: string | null;
  created_at: string;
}

export interface DigitalPassport {
  id: string;
  vendor_id: string;
  inventory_id: string | null;
  specimen_name: string;
  propagation_method: string;
  mother_plant_origin: string | null;
  genetic_origin: string | null;
  verification_hash: string;
  issued_at: string;
  // joined
  inventory?: InventoryItem;
  vendor?: { name: string; slug: string; logo_url: string | null; bio: string | null };
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  bio: string | null;
}
