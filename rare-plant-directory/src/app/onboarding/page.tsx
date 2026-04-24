'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PayPalButton from '@/app/components/PayPalButton';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'seedling';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    vendorName: '',
    email: '',
    password: '',
    specialty: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [debugLink, setDebugLink] = useState<string | null>(null);

  const [isPaying, setIsPaying] = useState(false);
  const [createdVendorId, setCreatedVendorId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedPlan,
          businessName: form.vendorName,
          email: form.email,
          password: form.password,
          specialties: [form.specialty]
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Onboarding failed');
      
      setCreatedVendorId(data.vendor.id);

      if (selectedPlan === 'elite' || selectedPlan === 'authority') {
        setIsPaying(true);
      } else {
        if (data.email_sent === false) {
          setDebugLink(data.debug_link);
          setError("Account created, but we couldn't send the verification email. You can verify manually below.");
          setIsSuccess(true);
        } else {
          setIsSuccess(true);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during onboarding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPaying && createdVendorId) {
    return (
      <main className="hero" style={{ minHeight: '100vh', padding: '0' }}>
        <div className="hero-grid-overlay"></div>
        <div style={{ 
          maxWidth: '500px', 
          width: '90%', 
          background: 'var(--bg-card)', 
          border: '1px solid var(--gold)', 
          borderRadius: '32px', 
          padding: '4rem 3rem', 
          textAlign: 'center',
          boxShadow: '0 40px 80px var(--gold-dim)',
          position: 'relative',
          zIndex: 10
        }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Final Step: Verification & Activation</span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Secure Your <em>Elite</em> Position</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
            Your account has been created. To activate your <strong>{selectedPlan === 'elite' ? 'Elite Founder' : 'Authority Suite'}</strong> status and unlock lead matching, please complete your one-time payment.
          </p>
          
          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '16px', marginBottom: '2rem' }}>
            <PayPalButton 
              amount={
                selectedPlan === 'elite' ? "497" : 
                selectedPlan === 'canopy' ? "129.99" :
                selectedPlan === 'bloom' ? "39.99" :
                selectedPlan === 'sprout' ? "14.99" : "14.99"
              } 
              vendorId={createdVendorId} 
              planId={selectedPlan}
              onSuccess={() => setIsSuccess(true)}
            />
          </div>

          <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>
            Secure transaction handled by PayPal. Instant activation upon completion.
          </p>
        </div>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="hero" style={{ minHeight: '100vh', padding: '0' }}>
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
          zIndex: 10,
          animation: 'fadeUp 0.6s ease both'
        }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Verification Required</span>
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
          
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Check Your <em>Email</em></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
            Your Provisional Access to the <strong>Authority Suite</strong> has been reserved. We have sent a verification link to <strong>{form.email}</strong>. Please click the link to confirm your account and access the dashboard.
          </p>
          
          {debugLink && (
            <div style={{ 
              marginBottom: '2rem', 
              padding: '1.5rem', 
              background: 'rgba(212,175,55,0.1)', 
              border: '1px dashed var(--gold)', 
              borderRadius: '12px' 
            }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '1rem', fontWeight: 600 }}>
                Verification Link (Debug Mode):
              </p>
              <a href={debugLink} style={{ 
                wordBreak: 'break-all', 
                fontSize: '0.75rem', 
                color: 'white', 
                textDecoration: 'underline' 
              }}>
                {debugLink}
              </a>
              <p style={{ fontSize: '0.7rem', marginTop: '1rem', opacity: 0.7 }}>
                Copy and paste this link if you did not receive the email.
              </p>
            </div>
          )}
          
          <button onClick={() => window.location.href = '/login'} className="btn-ghost" style={{ width: '100%', display: 'block', padding: '1rem' }}>
            Return to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="hero" style={{ minHeight: '100vh', padding: '10rem 5% 5rem' }}>
      <div className="hero-grid-overlay"></div>
      
      {/* Immersive Brand Background */}
      <div className="hero-leaf-1" style={{ opacity: 0.1 }}>🌿</div>
      <div className="hero-leaf-2" style={{ opacity: 0.1 }}>🍃</div>

      <div style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>{selectedPlan === 'elite' ? "Elite Founder's Circle" : selectedPlan === 'authority' ? "Authority Suite Enrollment" : "Founder's Circle Onboarding"}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Secure Your <em>{selectedPlan === 'elite' ? "Elite Stage" : "Market Position"}</em>
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto', fontSize: '1rem', opacity: 0.8 }}>
            {selectedPlan === 'elite' 
              ? "The Elite Stage is now open. Build your 10-plant showcase and join the verified inner circle."
              : selectedPlan === 'authority'
              ? "Join the Authority Suite. List your best 5 plants and get priority lead matching."
              : "Claim your free directory listing in seconds. Stop the bleed and stabilize your botanical client pipeline."}
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
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ 
          background: 'var(--glass)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)', 
          borderRadius: '24px', 
          padding: '3rem',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="input-group">
              <label style={{ 
                display: 'block', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                color: 'var(--gold)',
                marginBottom: '0.75rem',
                paddingLeft: '0.5rem'
              }}>
                Professional Email
              </label>
              <input
                type="email"
                required
                placeholder="sales@yournursery.com"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                style={{ 
                  width: '100%', 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '12px', 
                  padding: '1.25rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>

            <div className="input-group">
              <label style={{ 
                display: 'block', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                color: 'var(--gold)',
                marginBottom: '0.75rem',
                paddingLeft: '0.5rem'
              }}>
                Create Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                style={{ 
                  width: '100%', 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '12px', 
                  padding: '1.25rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', marginTop: '3rem', padding: '1.25rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} /> Processing...
              </span>
            ) : (
              <>
                Unlock Provisional Access
                <ArrowRight size={20} />
              </>
            )}
          </button>
          
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'var(--gold-dim)', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
               <ShieldCheck size={14} color="var(--gold)" />
               <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>
                 Verified Authority Engine
               </span>
            </div>
          </div>
        </form>
        
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already verified? <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'underline' }}>Access Authority Suite</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
