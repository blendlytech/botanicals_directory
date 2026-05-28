'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail, ShieldCheck } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="permit-theme" style={{ minHeight: '100vh', background: '#F8FAFC', padding: '120px 5% 60px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: '#10B981', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 2rem',
            boxShadow: '0 20px 40px rgba(16,185,129,0.2)'
          }}>
            <CheckCircle size={50} color="white" />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1A202C', marginBottom: '1rem' }}>You're In!</h1>
          <p style={{ color: '#64748B', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Your 60-day exclusive lockout for <strong>Polk County (Roofing)</strong> has been activated. No other roofing contractor can purchase this territory while your pilot is active.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={20} color="#0088FF" /> Next Steps
          </h3>
          
          <div style={{ display: 'grid', gap: '2rem', textAlign: 'left' }}>
             <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0088FF', fontSize: '1.5rem' }}>1.</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1A202C' }}>Check Your Email</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748B' }}>We've sent your master dashboard login and your first batch of 82 Polk County leads.</p>
                </div>
             </div>
             <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0088FF', fontSize: '1.5rem' }}>2.</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1A202C' }}>Set Alerts</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748B' }}>Configure your SMS notifications in the dashboard to get notified the second a new permit is filed.</p>
                </div>
             </div>
          </div>

          <Link href="/leads" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            marginTop: '3rem', 
            background: '#0088FF', 
            color: 'white', 
            padding: '1.25rem', 
            borderRadius: '16px', 
            fontWeight: 800, 
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(0,136,255,0.3)'
          }}>
            Enter Lead Dashboard <ArrowRight size={20} />
          </Link>
        </div>

        <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
          Questions? Contact your account manager at <br />
          <strong>clay.mills@rareplantvendors.com</strong>
        </p>

      </div>
    </div>
  );
}
