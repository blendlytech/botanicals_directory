'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PayPalButton } from "@rpv/ui";
import { createClient } from '@/utils/supabase/client';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'seedling';
  const deal = searchParams.get('deal');
  const isMiamiDeal = deal === 'miami';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    vendorName: '',
    email: '',
    password: '',
    verifyPassword: '',
    specialty: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [debugLink, setDebugLink] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [isPaying, setIsPaying] = useState(false);
  const [createdVendorId, setCreatedVendorId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: vendor } = await supabase
          .from('vendors')
          .select('id, subscription_status')
          .eq('user_id', user.id)
          .single();
        
        if (vendor) {
          // If already active, go straight to dashboard — don't trap them here
          if (vendor.subscription_status === 'active') {
            window.location.href = '/dashboard';
            return;
          }
          setCreatedVendorId(vendor.id);
          setIsPaying(true);
        }
      }
    }
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail for bots
    
    if (form.password !== form.verifyPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: isMiamiDeal ? 'elite' : selectedPlan, // Miami deal gets Elite tier for $1
          businessName: form.vendorName,
          email: form.email,
          password: form.password,
          specialties: [form.specialty],
          is_miami_deal: isMiamiDeal // Pass flag to API if needed
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Onboarding failed');
      
      setCreatedVendorId(data.vendor.id);

      if (isMiamiDeal || (selectedPlan !== 'seedling' && selectedPlan !== 'free')) {
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
          border: `1px solid ${isMiamiDeal ? '#e74c3c' : 'var(--gold)'}`, 
          borderRadius: '32px', 
          padding: '4rem 3rem', 
          textAlign: 'center',
          boxShadow: isMiamiDeal ? '0 40px 80px rgba(231,76,60,0.2)' : '0 40px 80px var(--gold-dim)',
          position: 'relative',
          zIndex: 10
        }}>
          {isMiamiDeal && (
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#e74c3c', color: 'white', padding: '0.4rem 1.5rem', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em' }}>
              MIAMI FESTIVAL SPECIAL
            </div>
          )}
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Final Step: Activation</span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
            {isMiamiDeal ? "Claim Your Miami Founding Spot" : "Secure Your Elite Position"}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
            {isMiamiDeal 
              ? `You're one step away from joining the Elite 100 in Miami. Activate your QR suite now for just $1.00.`
              : `Your account has been created. To activate your status and unlock lead matching, please complete your payment.`
            }
          </p>
          
          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '16px', marginBottom: '2rem' }}>
            <PayPalButton 
              amount={
                isMiamiDeal ? "1.00" :
                selectedPlan === 'elite' ? "497" : 
                selectedPlan === 'bloom' ? "24.99" :
                selectedPlan === 'sprout' ? "9.99" : "9.99"
              } 
              vendorId={createdVendorId} 
              planId={isMiamiDeal ? 'elite' : selectedPlan}
              onSuccess={() => { window.location.href = '/dashboard'; }}
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
            padding: '1.25rem', 
            background: 'rgba(239, 68, 68, 0.05)', 
            borderLeft: '4px solid #ef4444', 
            borderRadius: '8px', 
            color: '#f87171', 
            marginBottom: '2.5rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            animation: 'shake 0.4s ease'
          }}>
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>{error}</span>
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
          {/* Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input 
              type="text" 
              name="bot-field" 
              value={honeypot} 
              onChange={(e) => setHoneypot(e.target.value)} 
            />
          </div>

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
                Business Name
              </label>
              <input
                type="text"
                required
                placeholder="The Emerald Nursery"
                value={form.vendorName}
                onChange={(e) => setForm({...form, vendorName: e.target.value})}
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  style={{ 
                    width: '100%', 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '12px', 
                    padding: '1.25rem 3.5rem 1.25rem 1.25rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    opacity: 0.7,
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
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
                Verify Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Re-enter password"
                  value={form.verifyPassword}
                  onChange={(e) => setForm({...form, verifyPassword: e.target.value})}
                  style={{ 
                    width: '100%', 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '12px', 
                    padding: '1.25rem 3.5rem 1.25rem 1.25rem',
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
                Botanical Specialty
              </label>
              <select
                required
                value={form.specialty}
                onChange={(e) => setForm({...form, specialty: e.target.value})}
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
                  appearance: 'none',
                  backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--gold) 50%), linear-gradient(135deg, var(--gold) 50%, transparent 50%)',
                  backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
                  backgroundSize: '5px 5px, 5px 5px',
                  backgroundRepeat: 'no-repeat',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              >
                <option value="" disabled>Select your primary focus</option>
                <option value="Aroids">Aroids (Monstera, Philodendron)</option>
                <option value="Orchids">Orchids & Epiphytes</option>
                <option value="Succulents">Rare Succulents & Cacti</option>
                <option value="Tropicals">Tropical Exotics</option>
                <option value="Carnivorous">Carnivorous Plants</option>
                <option value="Variegated">Variegated Specimens</option>
                <option value="General">General Rare Plants</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
            style={{ 
              width: '100%', 
              marginTop: '3rem', 
              padding: '1.25rem', 
              fontSize: '1rem', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.75rem',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '12px' // Modern luxury rounded
            }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
                <Lock size={18} /> Syncing Authority Data...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
                Unlock Provisional Access
                <ArrowRight size={20} />
              </span>
            )}
            
            {isSubmitting && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmer 2s infinite',
                zIndex: 1
              }}></div>
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

function OnboardingLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌿</div>
        <p style={{ fontSize: '0.9rem' }}>Preparing your onboarding experience...</p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingPageWrapper>
      <Suspense fallback={<OnboardingLoading />}>
        <OnboardingContent />
      </Suspense>
    </OnboardingPageWrapper>
  );
}

function OnboardingPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes shimmer {
          100% { left: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-primary.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
