import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@rpv/supabase/admin';

// Helper to verify PayPal webhook signature
async function verifyPayPalWebhook(req: Request, bodyText: string) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return true; // Skip verification if no webhook ID is set (dev fallback)

  const transmissionId = req.headers.get('paypal-transmission-id');
  const timestamp = req.headers.get('paypal-transmission-time');
  const certUrl = req.headers.get('paypal-cert-url');
  const authAlgo = req.headers.get('paypal-auth-algo');
  const transmissionSig = req.headers.get('paypal-transmission-sig');

  if (!transmissionId || !timestamp || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  // In production, you would fetch the cert and verify the signature.
  // For this implementation, if PAYPAL_WEBHOOK_ID is set, we assume basic verification
  // A robust implementation uses the PayPal verify-webhook-signature API.
  
  try {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
    
    // Get token
    const tokenRes = await fetch(`${apiUrl}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (!tokenRes.ok) return false;
    const { access_token } = await tokenRes.json();

    // Verify signature with PayPal API
    const verifyRes = await fetch(`${apiUrl}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: timestamp,
        webhook_id: webhookId,
        webhook_event: JSON.parse(bodyText),
      }),
    });

    const verifyData = await verifyRes.json();
    return verifyData.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('PayPal webhook verification error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const event = JSON.parse(bodyText);

    // Verify webhook signature
    const isValid = await verifyPayPalWebhook(req, bodyText);
    if (!isValid && process.env.PAYPAL_WEBHOOK_ID) {
      console.error('Invalid PayPal webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const { event_type, resource } = event;
    console.log(`Received PayPal Webhook: ${event_type}`);

    // Handle Subscription Cancellations & Expirations
    if (
      event_type === 'BILLING.SUBSCRIPTION.CANCELLED' ||
      event_type === 'BILLING.SUBSCRIPTION.EXPIRED' ||
      event_type === 'BILLING.SUBSCRIPTION.SUSPENDED'
    ) {
      const customId = resource.custom_id;
      
      if (!customId) {
        console.error('PayPal Webhook received but no custom_id (vendorId) attached to subscription.');
        return NextResponse.json({ received: true, status: 'ignored_missing_custom_id' });
      }

      console.log(`Downgrading Vendor ${customId} due to ${event_type}`);

      const { error } = await supabaseAdmin
        .from('vendors')
        .update({
          tier: 'seedling',
          account_tier: 'seedling',
          is_elite: false,
          subscription_status: event_type === 'BILLING.SUBSCRIPTION.SUSPENDED' ? 'past_due' : 'canceled',
        })
        .eq('id', customId);

      if (error) {
        console.error(`Failed to downgrade Vendor ${customId}:`, error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true, event: event_type });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
