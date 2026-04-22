import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const seeds = [
  'govconhellp@gmail.com',
  'scmillsc0809@gmail.com',
  'blendly.tech@gmail.com',
  'cmills79@gmail.com',
  'ebookgovern@gmail.com'
];

async function verifyReputation() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log('🛡️ Running Final Reputation Verification...');

  for (const email of seeds) {
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Re: Quick confirmation - Connection verified',
      text: `Hi again,\n\nI just received your reply. It looks like the connection is finally "warmed up." \n\nPlease confirm if this second message hit your Primary Inbox automatically this time.\n\nTalk soon,\nClay`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Verification sent to ${email}`);
      
      // Short delay
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(`❌ Failed to send verification to ${email}:`, error);
    }
  }

  console.log('\n🏁 Verification Batch Complete. If these hit the Inbox, we are ready.');
}

verifyReputation();
