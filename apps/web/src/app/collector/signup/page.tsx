'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, User, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CollectorSignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    interest: 'Rare Aroids'
  });
  const router = useRouter();

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
      
      // Redirect to success page to check email
      router.push('/collector/signup/success');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

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
