import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';
import { createClient } from '@/utils/supabase/server';

/**
 * Expo pre-sale deposit + claim.
 * A Premium collector pays a 10% holding deposit via PayPal; this route verifies the
 * captured order server-side, then creates the claim and pulls the plant off-market.
 *
 * Race safety: the client captures the deposit BEFORE calling us, so any path that
 * rejects after capture (plant already claimed/sold, wrong amount, etc.) AUTO-REFUNDS
 * the PayPal capture so the losing collector is never left out of pocket.
 * See implementation_plan.md §5.
 */
const DEPOSIT_PCT = 10;
// Affiliate expo host earns half the deposit (50% of the 10% hold = 5% of the sale price).
const AFFILIATE_PCT = 50;
const round2 = (n: number) => Math.round(n * 100) / 100;

const paypalApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalToken(): Promise<string | null> {
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!id || !secret || secret === 'YOUR_SECRET_HERE') return null;
  const auth = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok) return null;
  const { access_token } = await res.json();
  return access_token;
}

/** Refund a capture in full. Returns true on success; logs loudly on failure for manual follow-up. */
async function refundCapture(captureId: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${paypalApiUrl}/v2/payments/captures/${captureId}/refund`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`CRITICAL: deposit refund FAILED for capture ${captureId} — manual refund required. ${body}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`CRITICAL: deposit refund threw for capture ${captureId} — manual refund required.`, err);
    return false;
  }
}

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

    const token = await getPayPalToken();
    if (!token) {
      console.error('CRITICAL: PayPal not configured. Rejecting deposit (no capture made server-side).');
      return NextResponse.json({ error: 'Server configuration error (payments disabled)' }, { status: 500 });
    }

    // Fetch the order; confirm it's captured and grab the capture id up front so we can
    // refund on ANY later rejection.
    const orderRes = await fetch(`${paypalApiUrl}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!orderRes.ok) {
      return NextResponse.json({ error: 'Order not found in PayPal' }, { status: 400 });
    }
    const orderData = await orderRes.json();
    const purchaseUnit = orderData.purchase_units?.[0];
    const captureId: string | undefined = purchaseUnit?.payments?.captures?.[0]?.id;

    if (orderData.status !== 'COMPLETED' || !captureId) {
      // Not actually captured — nothing to refund.
      return NextResponse.json({ error: 'PayPal order is not captured' }, { status: 400 });
    }

    // From here payment is captured — every failure path must refund.
    const fail = async (status: number, error: string) => {
      const refunded = await refundCapture(captureId, token);
      return NextResponse.json(
        { error: refunded ? `${error} Your deposit has been refunded.` : `${error} A refund is being processed.`, refunded },
        { status }
      );
    };

    // Collector must exist and be Premium.
    const { data: collector } = await supabaseAdmin
      .from('collectors')
      .select('id, tier')
      .eq('user_id', user.id)
      .maybeSingle();
    if (!collector) return fail(403, 'Not a collector account.');
    if ((collector as any).tier !== 'premium') return fail(403, 'Premium membership required.');

    // Inventory must be staged for an expo and still available.
    const { data: item } = await supabaseAdmin
      .from('inventory')
      .select('id, price, event_id, vendor_id, status')
      .eq('id', inventoryId)
      .single();
    if (!item) return fail(404, 'Plant not found.');
    if (!(item as any).event_id) return fail(400, 'Plant is not staged for an expo.');
    if ((item as any).status === 'sold') return fail(409, 'Plant already sold.');
    if ((item as any).price == null) return fail(400, 'Vendor has not set a price.');

    // Amount + ownership verification.
    if (purchaseUnit?.custom_id !== inventoryId) {
      return fail(400, 'Payment does not match this plant.');
    }
    const expectedDeposit = round2((item as any).price * (DEPOSIT_PCT / 100));
    const actualPaid = parseFloat(purchaseUnit?.amount?.value || '0').toFixed(2);
    if (actualPaid !== expectedDeposit.toFixed(2)) {
      console.error(`Deposit mismatch on ${inventoryId}: paid ${actualPaid}, expected ${expectedDeposit.toFixed(2)}`);
      return fail(400, 'Deposit amount did not match the listed price.');
    }

    // Snapshot the vendor's pickup deadline for this expo.
    const { data: ev } = await supabaseAdmin
      .from('event_vendors')
      .select('pickup_deadline')
      .eq('event_id', (item as any).event_id)
      .eq('vendor_id', (item as any).vendor_id)
      .maybeSingle();

    const affiliateCut = round2(expectedDeposit * (AFFILIATE_PCT / 100));

    // Create the claim. UNIQUE(inventory_id) is the race guard — if someone else's
    // deposit landed first, this throws 23505 and we refund this collector.
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
        return fail(409, 'This plant was just reserved by another collector.');
      }
      console.error('Claim insert error:', claimErr);
      return fail(500, 'Could not record your reservation.');
    }

    await supabaseAdmin.from('inventory').update({ status: 'reserved' }).eq('id', inventoryId);

    return NextResponse.json({ success: true, deposit: expectedDeposit, pickup_deadline: (ev as any)?.pickup_deadline ?? null });
  } catch (error: any) {
    console.error('Presale claim error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
