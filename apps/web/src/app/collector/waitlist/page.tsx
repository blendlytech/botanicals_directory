'use client';

import React, { useState, useEffect } from 'react';
import {
  Crown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  QrCode,
  MapPin,
  Bell,
  Lock,
  Zap,
  Mail,
  User,
  Heart,
  Star,
  Timer,
} from 'lucide-react';
import Link from 'next/link';

const premiumPerks = [
  { icon: <QrCode size={22} />, label: 'CultivarID™ Genetic Scanning', desc: 'Verify the provenance of any specimen instantly from your phone.' },
  { icon: <Bell size={22} />, label: 'Priority Drop Alerts', desc: 'Get notified 24 hours before rare inventory goes live to the public.' },
  { icon: <Lock size={22} />, label: 'Pre-Sale Reservations', desc: 'Reserve high-value plants online and skip the expo floor chaos entirely.' },
  { icon: <ShieldCheck size={22} />, label: 'Escrow Protection', desc: 'Secure holding deposits protect your purchase during transit.' },
  { icon: <MapPin size={22} />, label: 'Interactive Expo Maps', desc: 'Navigate vendor booths with precision. Know exactly where to go before doors open.' },
  { icon: <Sparkles size={22} />, label: 'Collector Profile', desc: 'Build your provenance portfolio and track every verified specimen you acquire.' },
];

const socialProof = [
  { value: '340+', label: 'Verified Vendors' },
  { value: '47', label: 'Expos Covered' },
  { value: '12K+', label: 'Plants Catalogued' },
];

export default function CollectorWaitlistPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Rare Aroids');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(247);

  // Simulate scarcity counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev <= 100) return prev;
        return prev - (Math.random() > 0.7 ? 1 : 0);
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/collector/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, interest }),
      });

      const data = await res.json();

      if (!res.ok && !data.success) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setIsSuccess(true);
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || 'Failed to join. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="hero" style={{ minHeight: '100vh', padding: '0' }}>
        <div className="hero-grid-overlay" />
        <div style={{
          maxWidth: '550px',
          width: '90%',
          background: 'var(--bg-card)',
          border: '1px solid var(--gold)',
          borderRadius: '32px',
          padding: '4rem 3rem',
          textAlign: 'center',
          boxShadow: '0 40px 80px var(--gold-dim)',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeUp 0.6s ease both',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--gold-dim)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            border: '1px solid var(--gold)',
          }}>
            <CheckCircle2 size={40} color="var(--gold)" />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            You&apos;re <em>In.</em>
          </h2>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
            {message || "Your spot on the Early Access list has been secured."}
          </p>

          <div style={{
            background: 'var(--gold-dim)',
            border: '1px dashed var(--gold)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2.5rem',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Your Exclusive Discount Code
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              color: 'white',
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}>
              EARLYACCESS50
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              50% off your first year of Premium Collector — <strong style={{ color: 'var(--gold)' }}>just $24.50/year</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>
              Explore the Directory
            </Link>
            <Link href="/events" className="btn-ghost" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>
              Browse Expos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingTop: '10rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid-overlay" />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'var(--gold)' : 'var(--emerald)',
              opacity: 0.12,
              left: `${8 + (i * 9) % 84}%`,
              top: `${12 + (i * 13) % 76}%`,
              animation: `float ${5 + (i % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '4rem', alignItems: 'center', padding: '0 5%' }}>

          {/* Left: Copy */}
          <div>
            <div className="hero-eyebrow" style={{ margin: '0 0 2rem' }}>
              <div className="hero-eyebrow-dot" />
              <span>Founding Collector Program</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Get <em>Early Access</em> at<br />
              <span style={{ color: 'var(--gold)' }}>50% Off.</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '500px' }}>
              We&apos;re building the world&apos;s first verified rare plant marketplace. Join the waitlist now and lock in <strong>50% off your first year</strong> of Premium Collector status — just <strong style={{ color: 'var(--gold)' }}>$24.50/year</strong> instead of $49.
            </p>

            {/* Urgency bar */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '50px',
              padding: '0.6rem 1.25rem',
              marginBottom: '2.5rem',
            }}>
              <Timer size={16} color="#ef4444" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171' }}>
                Only <strong style={{ color: '#ef4444' }}>{spotsLeft}</strong> founding spots remaining
              </span>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {socialProof.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)' }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', fontWeight: 700 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Signup Form */}
          <div style={{
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            position: 'relative',
          }}>
            {/* Discount badge */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '24px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              padding: '0.4rem 1.25rem',
              borderRadius: '30px',
              fontSize: '0.7rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
            }}>
              50% OFF FIRST YEAR
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Crown size={32} color="var(--gold)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Join the Waitlist
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Secure your founding spot. No payment required.
              </p>
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                color: '#f87171',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
                      borderRadius: '12px', padding: '0.9rem 1rem 0.9rem 2.75rem', color: 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', display: 'block' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
                  <input
                    type="email"
                    required
                    placeholder="collector@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
                      borderRadius: '12px', padding: '0.9rem 1rem 0.9rem 2.75rem', color: 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', display: 'block' }}>What Do You Collect?</label>
                <div style={{ position: 'relative' }}>
                  <Heart size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    style={{
                      width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
                      borderRadius: '12px', padding: '0.9rem 1rem 0.9rem 2.75rem', color: 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none',
                      appearance: 'none', cursor: 'pointer',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  >
                    <option value="Rare Aroids">Rare Aroids (Monstera, Philodendron)</option>
                    <option value="Orchids">Orchids &amp; Epiphytes</option>
                    <option value="Hoyas">Hoyas &amp; Dischidia</option>
                    <option value="Carnivorous">Carnivorous Plants</option>
                    <option value="Succulents">Rare Succulents &amp; Cacti</option>
                    <option value="Variegated">Variegated Specimens</option>
                    <option value="Everything">Everything Rare</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%', marginTop: '0.5rem', padding: '1.1rem', fontSize: '1rem',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem',
                  borderRadius: '12px', position: 'relative', overflow: 'hidden',
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={18} /> Reserving Your Spot...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    Claim My 50% Discount <ArrowRight size={20} />
                  </span>
                )}
                {isSubmitting && (
                  <div style={{
                    position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shimmer 2s infinite', zIndex: 1,
                  }} />
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.7, margin: 0 }}>
                No credit card required. Discount code delivered instantly.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', padding: '6rem 5%' }}>
        <div className="section-header">
          <span className="section-eyebrow">Premium Collector Benefits</span>
          <h2 className="section-title">What Your <em>$24.50/year</em> Unlocks</h2>
          <p className="section-desc">Every feature is designed to eliminate fraud, stress, and wasted time from your collecting journey.</p>
          <div className="section-rule" />
        </div>

        <div style={{
          maxWidth: '1100px',
          margin: '3rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {premiumPerks.map((perk, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', flexShrink: 0,
              }}>
                {perk.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>{perk.label}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING COMPARISON ─── */}
      <section style={{
        padding: '6rem 5%',
        background: 'linear-gradient(145deg, #051A13 0%, #0B3D2E 100%)',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <Zap size={16} /> Limited-Time Founding Offer
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '3rem' }}>
            Lock In Your <em style={{ color: 'var(--gold)' }}>Founding Rate</em>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {/* Regular pricing */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              opacity: 0.6,
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 700 }}>Regular Price</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '0.25rem', textDecoration: 'line-through', textDecorationColor: '#ef4444' }}>$49</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>per year</div>
            </div>

            {/* Waitlist pricing */}
            <div style={{
              background: 'rgba(212,175,55,0.08)',
              border: '2px solid var(--gold)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(212,175,55,0.1)',
            }}>
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white',
                padding: '0.3rem 1rem', borderRadius: '30px', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.1em',
              }}>
                SAVE 50%
              </div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 700, color: 'var(--gold)' }}>Founding Price</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '0.25rem', color: 'var(--gold)' }}>$24.50</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>per year · first year</div>
            </div>
          </div>

          <a href="#top" className="btn-primary" style={{ marginTop: '3rem', padding: '1.25rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            Claim My Founding Spot <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section style={{ padding: '4rem 5%', textAlign: 'center', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.6 }}>
          {[
            { icon: <ShieldCheck size={18} />, text: 'Zero Genetic Fraud' },
            { icon: <Lock size={18} />, text: 'Secure Escrow' },
            { icon: <Star size={18} />, text: 'Verified Vendors Only' },
            { icon: <MapPin size={18} />, text: 'Local Pickup · No Shipping Risk' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          100% { left: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
