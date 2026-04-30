import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { notificationService } from '@/lib/services/notificationService';
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
    const { data: existingVendor, error: vendorError } = await supabaseAdmin
      .from('vendors')
      .select('user_id, subscription_status')
      .eq('id', vendorId)
      .single();

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
      
      // TODO: In a production environment, verify the PayPal orderId server-side using PAYPAL_CLIENT_SECRET
    }

    // 1. Log the transaction
    console.log(`Processing upgrade for Vendor ${vendorId} to Plan ${planId} with Order ${orderId}`);

    // 2. Update the vendor status in Supabase
    const { data: vendor, error } = await supabaseAdmin
      .from('vendors')
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
