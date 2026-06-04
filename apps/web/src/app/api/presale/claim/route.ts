import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';
import { createClient } from '@/utils/supabase/server';

/**
 * Expo pre-sale deposit + claim.
 * A Premium collector pays a 10% holding deposit via PayPal; this route verifies the
 * captured order server-side (amount + custom_id) before creating the claim and pulling
 * the plant off-market. 5% of the deposit is recorded for the affiliate expo host.
 * See implementation_plan.md §5.
 */
const DEPOSIT_PCT = 10;
const AFFILIATE_PCT = 5;

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(request: Request) {
  try {
    // Authenticate the collector via session cookies.
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { inventoryId, orderId, details } = await request.json();
    if (!inventoryId || !orderId) {
      return NextResponse.json({ error: 'inventoryId and orderId are required' }, { status: 400 });
    }
    if (!details || details.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Collector must exist and be Premium.
    const { data: collector } = await supabaseAdmin
      .from('collectors')
      .select('id, tier')
      .eq('user_id', user.id)
      .maybeSingle();
    if (!collector) {
      return NextResponse.json({ error: 'Not a collector account' }, { status: 403 });
    }
    if ((collector as any).tier !== 'premium') {
      return NextResponse.json({ error: 'Premium membership required' }, { status: 403 });
    }

    // Inventory must be staged for an expo and still available.
    const { data: item } = await supabaseAdmin
      .from('inventory')
      .select('id, price, event_id, vendor_id, status')
      .eq('id', inventoryId)
      .single();
    if (!item) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }
    if (!(item as any).event_id) {
      return NextResponse.json({ error: 'Plant is not staged for an expo' }, { status: 400 });
    }
    if ((item as any).status === 'sold') {
      return NextResponse.json({ error: 'Plant already sold' }, { status: 409 });
    }
    if ((item as any).price == null) {
      return NextResponse.json({ error: 'Vendor has not set a price' }, { status: 400 });
    }

    const expectedDeposit = round2((item as any).price * (DEPOSIT_PCT / 100));

    // ── Server-side PayPal verification ──
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    if (!paypalClientId || !paypalSecret || paypalSecret === 'YOUR_SECRET_HERE') {
      console.error('CRITICAL: PAYPAL_SECRET missing/invalid. Rejecting deposit.');
      return NextResponse.json({ error: 'Server configuration error (payments disabled)' }, { status: 500 });
    }
    const paypalApiUrl = process.env.NODE_ENV === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    const auth = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64');
    const tokenRes = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
    }
    const { access_token } = await tokenRes.json();

    const orderRes = await fetch(`${paypalApiUrl}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!orderRes.ok) {
      return NextResponse.json({ error: 'Order not found in PayPal' }, { status: 400 });
    }
    const orderData = await orderRes.json();
    if (orderData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'PayPal order is not COMPLETED' }, { status: 400 });
    }
    const purchaseUnit = orderData.purchase_units?.[0];
    if (purchaseUnit?.custom_id !== inventoryId) {
      return NextResponse.json({ error: 'Order does not match this plant' }, { status: 400 });
    }
    const actualPaid = parseFloat(purchaseUnit?.amount?.value || '0').toFixed(2);
    if (actualPaid !== expectedDeposit.toFixed(2)) {
      console.error(`Deposit mismatch on ${inventoryId}: paid ${actualPaid}, expected ${expectedDeposit.toFixed(2)}`);
      return NextResponse.json({ error: 'Invalid deposit amount', expected: expectedDeposit.toFixed(2) }, { status: 400 });
    }

    // Snapshot the vendor's pickup deadline for this expo.
    const { data: ev } = await supabaseAdmin
      .from('event_vendors')
      .select('pickup_deadline')
      .eq('event_id', (item as any).event_id)
      .eq('vendor_id', (item as any).vendor_id)
      .maybeSingle();

    const affiliateCut = round2(expectedDeposit * (AFFILIATE_PCT / 100));

    // Create the claim. UNIQUE(inventory_id) guards against a double-claim race.
    const { error: claimErr } = await supabaseAdmin.from('event_presale_claims').insert({
      event_id: (item as any).event_id,
      inventory_id: inventoryId,
      collector_id: (collector as any).id,
      status: 'deposit_paid',
      deposit_amount: expectedDeposit,
      deposit_pct: DEPOSIT_PCT,
      affiliate_cut_amount: affiliateCut,
      pickup_deadline: (ev as any)?.pickup_deadline ?? null,
    });
    if (claimErr) {
      if ((claimErr as any).code === '23505') {
        // Someone else's deposit landed first — flag for refund follow-up.
        return NextResponse.json({ error: 'This plant was just reserved by another collector. Your deposit will be refunded.' }, { status: 409 });
      }
      console.error('Claim insert error:', claimErr);
      return NextResponse.json({ error: (claimErr as any).message }, { status: 500 });
    }

    await supabaseAdmin.from('inventory').update({ status: 'reserved' }).eq('id', inventoryId);

    return NextResponse.json({ success: true, deposit: expectedDeposit, pickup_deadline: (ev as any)?.pickup_deadline ?? null });
  } catch (error: any) {
    console.error('Presale claim error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
