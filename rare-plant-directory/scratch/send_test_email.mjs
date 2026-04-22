import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const targetEmail = 'cmills79@gmail.com';
  const senderName = process.env.SMTP_FROM_NAME || 'Clay';
  const senderEmail = process.env.SMTP_FROM_EMAIL;

  const subject = 'Direct Connection: Rare Plant Vendors Infrastructure Audit';
  
  // Black-hat-safe B2B copy: Low link density, high personalization, mimic personal correspondence
  const text = `Hi Clay,

I've just finished auditing the deliverability stack for Rare Plant Vendors. 

Most people fail because they over-optimize for marketing and forget that Gmail's AI is looking for human-to-human signal. This email is a test of the raw SMTP route via ${process.env.SMTP_HOST}.

If you're reading this in your Primary tab, our initial "fingerprint" is clean.

Next steps:
1. Validate DKIM/DMARC alignment.
2. Implement the "Shadow Warm-up" protocol for the new vendor blast.
3. Clean the list of any honeypots.

Confirm you received this.

Best,
The Expert`;

  const html = `
    <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
      <p>Hi Clay,</p>
      <p>I've just finished auditing the deliverability stack for <strong>Rare Plant Vendors</strong>.</p>
      <p>Most people fail because they over-optimize for marketing and forget that Gmail's AI is looking for human-to-human signal. This email is a test of the raw SMTP route via <code>${process.env.SMTP_HOST}</code>.</p>
      <p>If you're reading this in your <strong>Primary tab</strong>, our initial "fingerprint" is clean.</p>
      <p>Next steps:</p>
      <ul>
        <li>Validate DKIM/DMARC alignment.</li>
        <li>Implement the "Shadow Warm-up" protocol for the new vendor blast.</li>
        <li>Clean the list of any honeypots.</li>
      </ul>
      <p>Confirm you received this.</p>
      <br>
      <p>Best,<br><strong>The Expert</strong></p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 11px; color: #999;">
        Sent from Rare Plant Vendors HQ. <br>
        If you wish to manage your email preferences, reply to this message.
      </p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: targetEmail,
      subject: subject,
      text: text,
      html: html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }
}

sendTestEmail();
