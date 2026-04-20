import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * POST — Record an analytics event (e.g., profile_view)
 * Body: { vendor_id: string, event_type: string, metadata?: any }
 */
export async function POST(request: Request) {
  try {
    const { vendor_id, event_type, metadata } = await request.json();

    if (!vendor_id || !event_type) {
      return NextResponse.json({ error: 'vendor_id and event_type are required' }, { status: 400 });
    }

    // Optional: Add IP or simple user agent hashing for unique views
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';

    const enrichedMetadata = {
      ...metadata,
      userAgent,
      referer
    };

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        vendor_id,
        event_type,
        metadata: enrichedMetadata
      });

    if (error) {
      console.error('Analytics insert error:', error);
      // Fail silently to the client so tracking doesn't break the UI
      return NextResponse.json({ success: false }); 
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics server error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
