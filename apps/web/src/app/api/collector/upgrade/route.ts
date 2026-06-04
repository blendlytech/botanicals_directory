import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';

/**
 * Collector Premium upgrade ($49/yr).
 * Verifies a captured PayPal order server-side (custom_id must equal the collectorId,
 * amount must equal the expected price) before flipping the collector to `premium`.
 * See implementation_plan.md §6.
 */
const FOUNDING_COLLECTOR_CAP = 100;
const FOUNDING_PRICE = '49.00';
const STANDARD_PRICE = '98.00';

export async function POST(request: Request) {
  try {
    const { collectorId, orderId, details } = await request.json();

    if (!collectorId) {
      return NextResponse.json({ error: 'Collector ID is required' }, { status: 400 });
    }
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }
    if (!details || details.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Confirm the collector exists.
    const { data: collector, error: collectorErr } = await supabaseAdmin
      .from('collectors')
      .select('id')
      .eq('id', collectorId)
      .single();

    if (collectorErr || !collector) {
      return NextResponse.json({ error: 'Collector not found' }, { status: 404 });
    }

    // Server-side PayPal verification (mandatory).
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    if (!paypalClientId || !paypalSecret || paypalSecret === 'YOUR_SECRET_HERE') {
      console.error('CRITICAL: PAYPAL_SECRET missing/invalid. Rejecting collector upgrade.');
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
    if (purchaseUnit?.custom_id !== collectorId) {
      return NextResponse.json({ error: 'Order does not match the collector being upgraded' }, { status: 400 });
    }
    // Founding offer: first 100 collectors pay the half-off $49 rate; after that it's $98.
    let foundingAvailable = false;
    let foundingNumber: number | null = null;
    try {
      const { count, error: countErr } = await supabaseAdmin
        .from('collectors')
        .select('*', { count: 'exact', head: true })
        .eq('is_founding_collector', true);
      if (!countErr) {
        const claimed = count ?? 0;
        foundingAvailable = claimed < FOUNDING_COLLECTOR_CAP;
        foundingNumber = claimed + 1;
      }
    } catch {
      foundingAvailable = false;
    }

    const expectedPrice = foundingAvailable ? FOUNDING_PRICE : STANDARD_PRICE;
    const actualPaid = parseFloat(purchaseUnit?.amount?.value || '0').toFixed(2);
    if (actualPaid !== expectedPrice) {
      console.error(`Collector price mismatch: ${collectorId} paid ${actualPaid}, expected ${expectedPrice}`);
      return NextResponse.json({ error: 'Invalid payment amount', expected: expectedPrice }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { tier: 'premium', subscription_status: 'active' };
    if (foundingAvailable) {
      updatePayload.is_founding_collector = true;
      updatePayload.founding_number = foundingNumber;
    }

    const { error: updateErr } = await (supabaseAdmin.from('collectors') as any)
      .update(updatePayload)
      .eq('id', collectorId);

    if (updateErr) {
      console.error('Collector upgrade DB error:', updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Collector upgrade error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
