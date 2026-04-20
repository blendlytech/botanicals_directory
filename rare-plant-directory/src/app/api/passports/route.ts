import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const TIER_LIMITS: Record<string, number> = {
  seedling: 0,
  verified: 5,
  pro: 20,
  elite: Infinity,
};

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { data: vendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('contact_email', user.email)
      .single();

    if (!vendor) return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });

    const { data: passports, error } = await supabase
      .from('digital_passports')
      .select('*, inventory(variety)')
      .eq('vendor_id', vendor.id)
      .order('issued_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ passports: passports || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const body = await request.json();
    const { specimen_name, propagation_method, mother_plant_origin, inventory_id } = body;

    if (!specimen_name || !propagation_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get vendor & tier
    const { data: vendor } = await supabase
      .from('vendors')
      .select('id, tier')
      .eq('contact_email', user.email)
      .single();

    if (!vendor) return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });

    const tier = vendor.tier || 'seedling';
    const limit = TIER_LIMITS[tier] || 0;

    if (limit === 0) {
      return NextResponse.json({ error: 'Your tier does not include Digital Passports. Please upgrade.' }, { status: 403 });
    }

    // 2. Check monthly limit
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('digital_passports')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendor.id)
      .gte('issued_at', startOfMonth.toISOString());

    const currentCount = count || 0;

    if (currentCount >= limit) {
      return NextResponse.json({ error: `Monthly limit reached (${limit}/${limit}). Please upgrade for more passports.` }, { status: 403 });
    }

    // 3. Generate verification hash (short, unique 8-char hex)
    const verificationHash = crypto.randomBytes(4).toString('hex');

    // 4. Insert passport
    const { data: newPassport, error: insertError } = await supabase
      .from('digital_passports')
      .insert({
        vendor_id: vendor.id,
        inventory_id: inventory_id || null,
        specimen_name,
        propagation_method,
        mother_plant_origin,
        verification_hash: verificationHash
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({ success: true, passport: newPassport, remaining: limit - (currentCount + 1) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
