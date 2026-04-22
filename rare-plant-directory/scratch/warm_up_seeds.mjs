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

async function runWarmup() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log('🚀 Starting Shadow Warm-up Protocol...');

  for (const email of seeds) {
    // Variations to avoid template fingerprinting
    const timestamp = new Date().toLocaleTimeString();
    const subjects = [
      'Quick question regarding the directory update',
      'Following up on the vendor portal access',
      'Thoughts on the new specimen tracking feature?',
      'Meeting notes from earlier today',
      'Checking in on the Rare Plant Vendors beta'
    ];
    
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: subject,
      text: `Hi,\n\nJust checking if you saw the update I sent over earlier. I want to make sure the ${email.split('@')[0]} connection is solid before we go live.\n\nLet me know if you can see this in your primary inbox.\n\nBest,\nClay`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent to ${email} (Subject: ${subject})`);
      
      // Wait 15-30 seconds between sends to mimic human behavior
      const delay = Math.floor(Math.random() * 15000) + 15000;
      if (email !== seeds[seeds.length - 1]) {
        console.log(`⏳ Waiting ${Math.round(delay/1000)}s before next send...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`❌ Failed to send to ${email}:`, error);
    }
  }

  console.log('\n🔥 Warm-up Batch Complete.');
  console.log('CRITICAL: You MUST log into these accounts, open the email, and REPLY.');
}

runWarmup();
