'use client';

import PayPalButton from '@/app/components/PayPalButton';
import { useState } from 'react';

export default function TestPaymentPage() {
  const [success, setSuccess] = useState(false);
  
  // Using a test vendor ID (Blendly's ID)
  const testVendorId = "8f882e3a-25aa-4e52-843f-87c4f5bafa84"; // Example UUID

  return (
    <main className="hero" style={{ minHeight: '100vh', padding: '10rem 5%' }}>
      <div className="hero-grid-overlay"></div>
      
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        background: 'var(--bg-card)', 
        padding: '3rem', 
        borderRadius: '24px', 
        border: '1px solid var(--gold)',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment System <em>Test</em></h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          This page allows you to verify that your PayPal Client ID is correctly connected. 
          The button below is set for <strong>$1.00</strong> for testing purposes.
        </p>

        {success ? (
          <div style={{ padding: '2rem', background: 'var(--gold-dim)', borderRadius: '12px', border: '1px solid var(--gold)' }}>
            <h3 style={{ color: 'var(--gold)' }}>Success!</h3>
            <p>The payment engine captured the transaction successfully.</p>
          </div>
        ) : (
          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '16px' }}>
            <PayPalButton 
              amount="1.00" 
              vendorId={testVendorId} 
              onSuccess={() => setSuccess(true)} 
            />
          </div>
        )}

        <p style={{ marginTop: '2rem', fontSize: '0.7rem', opacity: 0.6 }}>
          Client ID: {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.slice(0, 10)}...
        </p>
      </div>
    </main>
  );
}
