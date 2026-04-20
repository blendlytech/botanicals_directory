import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 🌿 Wishlist Matching Engine
 * Strategy: Fast-track leads to Elite vendors to drive rapid ROI.
 */
export const wishlistMatchService = {
  /**
   * Called when a user adds an item to their wishlist.
   * Finds all vendors who have this item and creates match records.
   */
  async processNewWishlistItem(wishlistId: string, speciesName: string) {
    // 1. Find all inventory items that match this species
    const { data: matches, error: matchError } = await supabase
      .from('inventory')
      .select('id, vendor_id, vendors(tier)')
      .ilike('species_name', `%${speciesName}%`);

    if (matchError) throw matchError;

    // 2. Create match records with appropriate notification times
    const matchRecords = matches.map((m: any) => {
      const isElite = m.vendors.tier === 'elite';
      return {
        wishlist_id: wishlistId,
        inventory_id: m.id,
        vendor_id: m.vendor_id,
        // Elite notified NOW, others notified in 24 hours
        elite_notified_at: isElite ? new Date().toISOString() : null,
        general_notified_at: isElite ? new Date().toISOString() : null, // General is already "cleared" for Elite
        created_at: new Date().toISOString(),
      };
    });

    if (matchRecords.length > 0) {
      const { error: insertError } = await supabase
        .from('wishlist_matches')
        .insert(matchRecords);
      
      if (insertError) throw insertError;
    }

    return matchRecords.length;
  },

  /**
   * Cron Job Handler: Finds matches that have passed the 24hr Elite window
   * and marks them as ready for general notification.
   */
  async releaseDelayedLeads() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: pendingMatches, error: fetchError } = await supabase
      .from('wishlist_matches')
      .select('id')
      .is('general_notified_at', null)
      .lt('created_at', twentyFourHoursAgo);

    if (fetchError) throw fetchError;

    if (pendingMatches.length > 0) {
      const ids = pendingMatches.map(m => m.id);
      const { error: updateError } = await supabase
        .from('wishlist_matches')
        .update({ general_notified_at: new Date().toISOString() })
        .in('id', ids);

      if (updateError) throw updateError;
    }

    return pendingMatches.length;
  },

  /**
   * Fetches active leads for a specific vendor.
   */
  async getVendorLeads(vendorId: string) {
    const { data, error } = await supabase
      .from('wishlist_matches')
      .select(`
        id,
        created_at,
        general_notified_at,
        wishlists (
          species_name,
          user_id
        ),
        inventory (
          species_name,
          variety,
          price
        )
      `)
      .eq('vendor_id', vendorId)
      .not('general_notified_at', 'is', null) // Only show leads they are allowed to see
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
