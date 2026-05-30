'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VerifyScannerPage() {
  const router = useRouter();
  const [hash, setHash] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (hash.trim()) {
      router.push(`/verify/${hash.trim()}`);
    }
  };

  return (
    <main className="hero" style={{ minHeight: '100vh', padding: '6rem 5% 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="hero-grid-overlay" style={{ opacity: 0.1 }}></div>
      
      <div style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 1.5rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>CultivarID Authentication</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Verify a <em>Specimen</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
            No app required. Just tap your phone or enter the Plant ID manually.
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-card)', 
          borderRadius: '32px', 
          padding: '4rem 2rem',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          textAlign: 'center'
        }}>
          
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            background: 'rgba(212,175,55,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 2rem',
            border: '2px dashed var(--gold)'
          }}>
            <Smartphone size={48} color="var(--gold)" />
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Tap to Verify</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '350px', margin: '0 auto' }}>
            Simply hold the top of your unlocked smartphone near the CultivarID™ Nylon NFC tag on the plant's stem. 
            The digital passport will open automatically.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '3rem 0 2rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>OR ENTER ID</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          </div>

          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="e.g. A9B2-C3D4" 
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              style={{ 
                flex: 1, 
                padding: '1rem 1.5rem', 
                borderRadius: '12px', 
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={20} />
            </button>
          </form>

        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            background: 'rgba(212,175,55,0.1)', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '100px',
            border: '1px solid rgba(212,175,55,0.2)'
          }}>
             <ShieldCheck size={18} color="var(--gold)" />
             <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)' }}>
               Secure Registry Authentication
             </span>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>
              ← Return to Marketplace
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
