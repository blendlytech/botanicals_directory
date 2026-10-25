import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { supabaseAdmin } from '@rpv/supabase/admin';
import { parseClaimInput } from '@/lib/claim-policy';

export async function POST(request: Request) {
  // Only the same-origin application may submit this cookie-authenticated request.
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email_confirmed_at)
    return NextResponse.json({ error: 'Confirm your email and sign in first.' }, { status: 401 });

  let input;
  try {
    const body = await request.text();
    if (body.length > 12000) throw new Error('Request is too large.');
    input = parseClaimInput(JSON.parse(body));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request.' }, { status: 400 });
  }
  try {
    const { data, error } = await supabaseAdmin.rpc('request_vendor_claim', {
      p_vendor_id: input.vendorId, p_user_id: user.id, p_evidence: input.evidence,
    });
    if (error) {
      if (error.code === 'P0001')
        return NextResponse.json({ error: error.message }, { status: 409 });
      console.error('Vendor claim could not be recorded:', error.code);
      return NextResponse.json({ error: 'Claim submissions are temporarily unavailable. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ success: true, claimId: data });
  } catch {
    return NextResponse.json({ error: 'Claim submissions are temporarily unavailable. Please try again later.' }, { status: 503 });
  }
}
