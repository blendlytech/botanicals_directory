import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

function getInternalTier(tier: string): string {
  const mapping: Record<string, string> = {
    'sprout': 'seedling',
    'bloom': 'visibility',
    'canopy': 'authority',
    'elite': 'elite',
    'free': 'seedling',
    'seedling': 'seedling',
    'visibility': 'visibility',
    'authority': 'authority'
  };
  return mapping[tier.toLowerCase()] || 'seedling';
}

export async function POST(request: Request) {
  try {
    const { vendorId, orderId, planId, details } = await request.json();

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    // 1. Log the transaction (In a production app, you'd have a transactions table)
    console.log(`Processing upgrade for Vendor ${vendorId} to Plan ${planId} with Order ${orderId}`);

    // 2. Update the vendor status in Supabase
    const { data, error } = await supabase
      .from('vendors')
      .update({
        tier: planId || 'sprout',
        account_tier: getInternalTier(planId || 'sprout') as any,
        is_verified: true,
        is_elite: planId === 'elite' || planId === 'canopy',
        subscription_status: 'active',
        // We could also store the PayPal details in a JSONB column if we had one
      })
      .eq('id', vendorId)
      .select()
      .single();

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Vendor upgraded to Elite Status successfully.',
      vendor: data
    });

  } catch (error: any) {
    console.error('Server error during upgrade:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
