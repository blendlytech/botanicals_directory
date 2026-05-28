'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CollectorSignupSuccess() {
  return (
    <main className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="hero-grid-overlay"></div>
      
      <div style={{ 
        maxWidth: '500px', 
        width: '90%', 
        background: 'var(--bg-card)', 
        border: '1px solid var(--gold)', 
        borderRadius: '24px', 
        padding: '4rem 3rem', 
        textAlign: 'center',
        boxShadow: '0 30px 60px var(--gold-dim)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
          <div className="hero-eyebrow-dot"></div>
          <span>Account Created</span>
        </div>
        
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--gold-dim)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 2rem',
          border: '1px solid var(--gold)'
        }}>
           <CheckCircle2 size={40} color="var(--gold)" />
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Welcome to the <em>Registry</em></h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
          Your collector account has been successfully initialized. We have sent a confirmation email to your inbox. You can now access your profile to start building your wishlist.
        </p>
        
        <Link href="/collector/login" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}>
          Access Collection Portal <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}
