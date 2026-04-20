import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate a simple slug from business name or owner name
    const nameToSlug = data.businessName || data.ownerName || 'vendor';
    const slug = nameToSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Insert into vendors
    const { data: newVendor, error } = await supabase
      .from('vendors')
      .insert({
        name: data.businessName || data.ownerName,
        slug: slug + '-' + Date.now().toString().slice(-4),
        owner_name: data.ownerName,
        contact_email: data.email,
        phone_number: data.phone,
        website_url: data.website,
        instagram: data.instagram,
        facebook: data.facebook,
        bio: data.bio,
        location_city: data.locationCity,
        location_state: data.locationState,
        location_country: data.locationCountry,
        specialty: data.specialties,
        tier: data.tier,
        subscription_status: data.tier === 'seedling' ? 'active' : 'pending_payment',
        is_verified: false,
        is_elite: data.tier === 'elite'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, vendor: newVendor });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
