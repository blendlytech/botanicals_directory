'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { ShieldCheck, ArrowRight, Lock, User, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PayPalButton } from '@rpv/ui';

function CollectorSignupContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    interest: 'Rare Aroids'
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPremium = searchParams.get('plan') === 'premium';
  const [payingCollectorId, setPayingCollectorId] = useState<string | null>(null);
  // Live founding price: $49 while spots remain, else the standard $98.
  const [foundingOpen, setFoundingOpen] = useState(true);

  useEffect(() => {
    if (!isPremium) return;
    fetch('/api/founding-stats')
      .then((r) => r.json())
      .then((d) => setFoundingOpen((d?.collector?.left ?? 0) > 0))
      .catch(() => {});
  }, [isPremium]);

  const price = foundingOpen ? '49.00' : '98.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/collector/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Signup failed');

      // Premium plan → collect the $49 membership before finishing.
      if (isPremium && data.collector_id) {
        setPayingCollectorId(data.collector_id);
        return;
      }

      // Free account → check email
      router.push('/collector/signup/success');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (payingCollectorId) {
    return (
      <main className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 5% 5rem' }}>
        <div className="hero-grid-overlay"></div>
        <div style={{ maxWidth: '480px', width: '100%', position: 'relative', zIndex: 10, background: 'var(--bg-card)', border: '1px solid var(--gold)', borderRadius: '24px', padding: '3rem', textAlign: 'center', boxShadow: '0 30px 60px var(--gold-dim)' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 1.5rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Final Step: Activate Membership</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Collector Membership
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            {foundingOpen && <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>$98</span>}
            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>${foundingOpen ? '49' : '98'}</span>
            <span style={{ opacity: 0.6 }}>/yr</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
            48-hour early access to expo inventory and the ability to hold plants with a 10% deposit. {foundingOpen ? 'Founding half-off rate.' : 'Standard annual rate.'}
          </p>
          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <PayPalButton
              amount={price}
              vendorId={payingCollectorId}
              idKey="collectorId"
              endpoint="/api/collector/upgrade"
              planId="premium"
              description="RPV Collector Membership (Annual)"
              onSuccess={() => { router.push('/collector/signup/success'); }}
            />
          </div>
          <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>
            Secure transaction via PayPal. We&apos;ve emailed a link to verify your account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="hero" style={{ minHeight: '100vh', padding: '10rem 5% 5rem' }}>
      <div className="hero-grid-overlay"></div>
      
      <div style={{ maxWidth: '500px', width: '100%', position: 'relative', zIndex: 10, margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Collector Enrollment</span>
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Access the <em>Inner Circle</em>
          </h1>
          <p className="hero-sub" style={{ fontSize: '1rem', opacity: 0.8 }}>
            Track your provenance and receive priority alerts for rare specimen drops.
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            borderRadius: '12px', 
            color: '#f87171', 
            marginBottom: '2rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ 
          background: 'var(--glass)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)', 
          borderRadius: '24px', 
          padding: '2.5rem',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="input-group">
              <label style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="text"
                  required
                  placeholder="Clay Mills"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem 1rem 1rem 3rem', color: 'white', outline: 'none' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="email"
                  required
                  placeholder="collector@elite.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem 1rem 1rem 3rem', color: 'white', outline: 'none' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Secure Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem 1rem 1rem 3rem', color: 'white', outline: 'none' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Primary Interest</label>
              <select
                value={form.interest}
                onChange={(e) => setForm({...form, interest: e.target.value})}
                style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem', color: 'white', outline: 'none', cursor: 'pointer' }}
              >
                <option value="Rare Aroids">Rare Aroids</option>
                <option value="Orchids">Orchids</option>
                <option value="Carnivorous">Carnivorous Plants</option>
                <option value="Hoyas">Hoyas & Epiphytes</option>
                <option value="Caudiciforms">Caudiciforms</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', marginTop: '2.5rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}
          >
            {isSubmitting ? 'Securing Access...' : (
              <>
                Join the Global Registry <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.6, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <ShieldCheck size={14} color="var(--gold)" /> Provenance Guaranteed
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Sparkles size={14} color="var(--gold)" /> VIP Early Access
           </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Member already? <Link href="/collector/login" style={{ color: 'var(--gold)', fontWeight: 700 }}>Access Portal</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CollectorSignupPage() {
  return (
    <Suspense fallback={<main className="hero" style={{ minHeight: '100vh' }} />}>
      <CollectorSignupContent />
    </Suspense>
  );
}
