import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.spacemail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export const notificationService = {
  /**
   * Sends a welcome email to a vendor after successful payment.
   */
  async sendSubscriptionWelcomeEmail(email: string, businessName: string, tier: string) {
    const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
    
    return getTransporter().sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Rare Plant Vendors'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: `Welcome to the ${tierName} Tier! - Rare Plant Vendors`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4c97a; border-radius: 8px; padding: 30px; background-color: #fafaf8; color: #0a1a0f;">
          <h1 style="color: #c9a84c; text-align: center;">Subscription Activated!</h1>
          <p>Hi ${businessName},</p>
          <p>Your subscription to the <strong>${tierName}</strong> tier is now active. Your dashboard has been upgraded with new capabilities.</p>
          <ul>
            ${tier === 'elite' ? '<li><strong>24-Hour Head Start:</strong> You now receive lead notifications a full day before other vendors.</li>' : ''}
            <li><strong>Lead Delivery:</strong> You will now receive instant email notifications when a collector's wishlist matches your inventory.</li>
            <li><strong>Priority Support:</strong> Our team is here to help you maximize your sales.</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #c9a84c; color: #0a1a0f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
          </div>
          <p style="font-size: 0.8em; color: #666; margin-top: 30px;">— The Rare Plant Vendors Team</p>
        </div>
      `,
    });
  },

  /**
   * Sends a Premium collector the 48h "pre-sale is live" alert for an expo.
   */
  async sendPresaleLiveAlert(email: string, collectorName: string, eventTitle: string, eventUrl: string, plantCount: number) {
    return getTransporter().sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Rare Plant Vendors'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: `⏳ 48-Hour Early Access is LIVE — ${eventTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4c97a; border-radius: 8px; padding: 30px; background-color: #fafaf8; color: #0a1a0f;">
          <h1 style="color: #c9a84c; text-align: center;">Your Early Access Has Begun</h1>
          <p>Hi ${collectorName || 'Collector'},</p>
          <p>The pre-sale shelf for <strong>${eventTitle}</strong> just went live — and as a Premium Collector you're seeing it <strong>48 hours before the public</strong>.</p>
          <p><strong>${plantCount}</strong> plant${plantCount === 1 ? '' : 's'} ${plantCount === 1 ? 'is' : 'are'} staged. Place a 10% deposit to hold what you want and pick it up in person — before the door rush.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${eventUrl}" style="background-color: #c9a84c; color: #0a1a0f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reserve Before the Floor Opens</a>
          </div>
          <p style="font-size: 0.8em; color: #666;">Deposits are held until the vendor's pickup deadline; retrieve in person or the deposit is forfeited.</p>
          <p style="font-size: 0.8em; color: #666; margin-top: 20px;">— The Rare Plant Vendors Team</p>
        </div>
      `,
    });
  },

  /**
   * Sends a lead notification to a vendor.
   */
  async sendLeadNotification(email: string, businessName: string, speciesName: string, isElite: boolean) {
    const subject = isElite 
      ? `🔥 ELITE LEAD: Someone wants ${speciesName}!` 
      : `New Lead: Wishlist match for ${speciesName}`;

    return getTransporter().sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Rare Plant Vendors'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4c97a; border-radius: 8px; padding: 30px; background-color: #fafaf8; color: #0a1a0f;">
          <h2 style="color: #c9a84c;">${isElite ? 'Elite Lead Alert' : 'New Wishlist Match'}</h2>
          <p>Hi ${businessName},</p>
          <p>A collector has just added <strong>${speciesName}</strong> to their wishlist, and it matches your active inventory!</p>
          ${isElite ? '<p style="background-color: #fff9e6; padding: 10px; border-left: 4px solid #c9a84c;"><strong>Elite Benefit:</strong> You are seeing this lead 24 hours before non-Elite vendors.</p>' : ''}
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads" style="background-color: #c9a84c; color: #0a1a0f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Claim This Lead</a>
          </div>
          <p style="font-size: 0.8em; color: #666; margin-top: 30px;">— The Rare Plant Vendors Team</p>
        </div>
      `,
    });
  }
};
