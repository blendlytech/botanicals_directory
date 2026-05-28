import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@rpv/supabase/admin';

/**
 * POST — Record a concierge lead inquiry
 * Body: { vendor_id: string, looking_for: string, budget: string, message: string }
 */
export async function POST(request: Request) {
  try {
    const { vendor_id, looking_for, budget, message } = await request.json();

    if (!vendor_id || !looking_for || !budget) {
      return NextResponse.json({ error: 'vendor_id, looking_for, and budget are required' }, { status: 400 });
    }

    const metadata = {
      looking_for,
      budget,
      message,
      submitted_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        vendor_id,
        event_type: 'concierge_inquiry',
        metadata
      });

    if (error) {
      console.error('Concierge inquiry insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Concierge inquiry server error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
