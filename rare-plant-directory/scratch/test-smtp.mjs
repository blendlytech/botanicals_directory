import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function testMail() {
  console.log('Testing SMTP with:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    from: process.env.SMTP_FROM_EMAIL
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: 'cmills79@gmail.com',
      subject: "SMTP Test - Rare Plant Vendors",
      text: "This is a test email to verify SMTP settings.",
      html: "<b>This is a test email to verify SMTP settings.</b>",
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}

testMail();
