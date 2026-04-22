import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Create Supabase Auth User & Generate Link
    // Instead of creating and auto-confirming, we generate a signup link.
    // This allows us to manually email the verification link using our own SMTP.
    const { data: linkData, error: authError } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: data.email,
      password: data.password || 'TemporaryPassword123!',
      data: {
        business_name: data.businessName,
        role: 'vendor'
      }
    });

    if (authError) {
      console.error('Auth creation error:', authError);
      return NextResponse.json({ error: `Auth Error: ${authError.message}` }, { status: 500 });
    }

    // The user is created in Supabase Auth, but unconfirmed.
    // generateLink returns the user object in linkData.user
    const userId = linkData.user.id;
    const actionLink = linkData.properties.action_link;

    // 2. Generate a simple slug from business name or owner name
    const nameToSlug = data.businessName || data.ownerName || 'vendor';
    const slug = nameToSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // 3. Insert into vendors
    const { data: newVendor, error } = await supabase
      .from('vendors')
      .insert({
        user_id: userId,
        name: data.businessName || data.ownerName,
        slug: slug + '-' + Date.now().toString().slice(-4),
        owner_name: data.ownerName,
        contact_email: data.email,
        phone_number: data.phone,
        website_url: data.website,
        instagram: data.instagram,
        facebook: data.facebook,
        bio: data.bio,
        location_city: data.locationCity,
        location_state: data.locationState,
        location_country: data.locationCountry,
        specialty: data.specialties,
        tier: data.tier,
        subscription_status: data.tier === 'seedling' ? 'active' : 'pending_payment',
        is_verified: false,
        is_elite: data.tier === 'elite'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Send Verification Email via Spaceship SMTP (Nodemailer)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.spaceship.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || 'Rare Plant Vendors'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        replyTo: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: data.email,
        subject: "Verify Your Vendor Account - Rare Plant Vendors",
        text: `Welcome to the Authority Suite, ${data.businessName || 'Vendor'}!\n\nThank you for applying for a vendor directory listing on Rare Plant Vendors. To secure your position and access your dashboard, you must verify your email address.\n\nPlease copy and paste the following link into your browser to verify your email:\n${actionLink}\n\nIf you did not request this, please safely ignore this email.\n\n— The Rare Plant Vendors Team`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4c97a; border-radius: 8px; padding: 30px; background-color: #fafaf8; color: #0a1a0f;">
            <h1 style="color: #c9a84c; text-align: center;">Welcome to the Authority Suite!</h1>
            <p>Hi ${data.businessName || 'Vendor'},</p>
            <p>Thank you for applying for a vendor directory listing on Rare Plant Vendors. To secure your position and access your dashboard, you must verify your email address.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${actionLink}" style="background-color: #c9a84c; color: #0a1a0f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email & Access Dashboard</a>
            </div>
            <p>If you did not request this, please safely ignore this email.</p>
            <p style="font-size: 0.8em; color: #666; margin-top: 30px;">— The Rare Plant Vendors Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error('Failed to send verification email:', mailError);
      return NextResponse.json({ success: true, vendor: newVendor, email_sent: false, message: 'Vendor created but failed to send verification email. Please check your SMTP settings.' });
    }

    return NextResponse.json({ success: true, vendor: newVendor, email_sent: true });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
