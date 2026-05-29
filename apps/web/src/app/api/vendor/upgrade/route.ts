import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@rpv/supabase/admin';
import { notificationService } from '@rpv/supabase/services/notificationService';
import { createClient } from '@/utils/supabase/server';

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
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { vendorId, orderId, planId, details } = await request.json();

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    if (!details || details.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Retrieve existing vendor
    const { data: existingVendorData, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select('user_id, subscription_status')
      .eq('id', vendorId)
      .single();

    const existingVendor = existingVendorData as any;

    if (vendorError || !existingVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    if (user) {
      // If user is logged in (dashboard flow), they must own the vendor
      if (existingVendor.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else {
      // If no user is logged in (onboarding flow), we only allow upgrading a pending_payment vendor
      if (existingVendor.subscription_status !== 'pending_payment') {
        return NextResponse.json({ error: 'Unauthorized to modify an active vendor without logging in' }, { status: 401 });
      }
    }

    // Server-side PayPal Verification (Mandatory for security)
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    
    // Fallback block if unconfigured
    if (!paypalClientId || !paypalSecret || paypalSecret === 'YOUR_SECRET_HERE') {
      console.error('CRITICAL: PAYPAL_SECRET is missing or invalid. Rejecting payment.');
      return NextResponse.json({ error: 'Server configuration error (payments disabled)' }, { status: 500 });
    }

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const paypalApiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';

    // 1. Get access token
    const auth = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64');
    const tokenRes = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (!tokenRes.ok) {
      console.error('PayPal token auth failed. Check your PAYPAL_SECRET.');
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
    }
    
    const { access_token } = await tokenRes.json();
    
    // 2. Fetch order details
    const orderRes = await fetch(`${paypalApiUrl}/v2/checkout/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    if (!orderRes.ok) {
      return NextResponse.json({ error: 'Order not found in PayPal' }, { status: 400 });
    }
    
    const orderData = await orderRes.json();
    
    // 3. Verify order status and custom_id bindings
    if (orderData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'PayPal order is not COMPLETED' }, { status: 400 });
    }
    
    const purchaseUnit = orderData.purchase_units?.[0];
    if (purchaseUnit?.custom_id !== vendorId) {
      return NextResponse.json({ error: 'Order does not match the vendor being upgraded' }, { status: 400 });
    }

    // 4. Verify exact price mapping
    const PLAN_PRICES: Record<string, string> = {
      'elite': '497.00',
      'visibility': '24.99',
      'bloom': '24.99',
      'sprout': '9.99',
      'seedling': '9.99'
    };

    const expectedPrice = PLAN_PRICES[planId?.toLowerCase() || 'sprout'];
    const actualPricePaid = parseFloat(purchaseUnit?.amount?.value || '0').toFixed(2);
    const expectedPriceFormatted = parseFloat(expectedPrice).toFixed(2);

    if (actualPricePaid !== expectedPriceFormatted) {
      console.error(`Price Mismatch! Vendor ${vendorId} tried to upgrade to ${planId} but paid ${actualPricePaid} instead of ${expectedPriceFormatted}`);
      return NextResponse.json({ error: 'Invalid payment amount for requested tier' }, { status: 400 });
    }
    
    console.log(`Server-side PayPal verification successful. Paid: $${actualPricePaid} for ${planId}`);

    // 1. Log the transaction
    console.log(`Processing upgrade for Vendor ${vendorId} to Plan ${planId} with Order ${orderId}`);

    // 2. Update the vendor status in Supabase
    const { data: vendorData, error } = await (supabaseAdmin
      .from('vendors') as any)
      .update({
        tier: planId || 'sprout',
        account_tier: getInternalTier(planId || 'sprout') as any,
        is_verified: true,
        is_elite: planId === 'elite' || planId === 'canopy',
        subscription_status: 'active',
      })
      .eq('id', vendorId)
      .select()
      .single();

    const vendor = vendorData as any;

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Send Welcome Email
    if (vendor && vendor.contact_email) {
      try {
        await notificationService.sendSubscriptionWelcomeEmail(
          vendor.contact_email,
          vendor.name || 'Vendor',
          planId || 'seedling'
        );
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // We don't fail the whole request just because the email failed
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Vendor upgraded successfully.',
      vendor
    });

  } catch (error: any) {
    console.error('Server error during upgrade:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
