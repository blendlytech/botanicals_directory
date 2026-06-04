import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';

/**
 * Founding-offer counters:
 *  - First 50 vendors get their first year free (counts active paid vendors).
 *  - First 100 collectors get half-off $49 (counts premium collectors).
 * See implementation_plan.md §6.
 */
export const dynamic = 'force-dynamic';

const VENDOR_FOUNDING_CAP = 50;
const COLLECTOR_FOUNDING_CAP = 100;

export async function GET() {
  let vendorsJoined = 0;
  let collectorsJoined = 0;

  try {
    // `is_founding_vendor` may not exist until the founding migration is applied.
    const { count, error } = await supabaseAdmin
      .from('vendors')
      .select('*', { count: 'exact', head: true })
      .eq('is_founding_vendor', true);
    vendorsJoined = error ? 0 : (count ?? 0);
  } catch {
    vendorsJoined = 0;
  }

  try {
    const { count, error } = await supabaseAdmin
      .from('collectors')
      .select('*', { count: 'exact', head: true })
      .eq('is_founding_collector', true);
    collectorsJoined = error ? 0 : (count ?? 0);
  } catch {
    collectorsJoined = 0;
  }

  return NextResponse.json({
    vendor: {
      cap: VENDOR_FOUNDING_CAP,
      joined: vendorsJoined,
      left: Math.max(0, VENDOR_FOUNDING_CAP - vendorsJoined),
    },
    collector: {
      cap: COLLECTOR_FOUNDING_CAP,
      joined: collectorsJoined,
      left: Math.max(0, COLLECTOR_FOUNDING_CAP - collectorsJoined),
    },
  });
}
