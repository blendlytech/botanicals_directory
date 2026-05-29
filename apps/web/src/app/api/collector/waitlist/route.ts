import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@rpv/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email, name, interest } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Try inserting into collector_waitlist table first
    // Falls back to newsletter_subscribers if table doesn't exist
    const { error } = await supabase
      .from('collector_waitlist')
      .insert({ 
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        interest: interest || null,
        source: 'waitlist_landing_page',
        discount_code: 'EARLYACCESS50',
      });

    if (error) {
      // If the table doesn't exist yet, fall back to newsletter_subscribers
      if (error.code === '42P01') {
        const { error: fallbackError } = await supabase
          .from('newsletter_subscribers')
          .insert({ 
            email: email.toLowerCase().trim(),
          });
        
        if (fallbackError) {
          if (fallbackError.code === '23505') {
            return NextResponse.json({ success: true, message: "You're already on the list! We'll be in touch soon." }, { status: 200 });
          }
          throw fallbackError;
        }
        return NextResponse.json({ success: true, message: "You're on the Early Access list!" });
      }
      
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: "You're already on the list! We'll be in touch soon." }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, message: "You're on the Early Access list! Your 50% discount code has been reserved." });
  } catch (error: any) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
