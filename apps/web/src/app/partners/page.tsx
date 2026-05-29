'use client';

import React from 'react';
import {
  Handshake,
  BarChart3,
  Ticket,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Users,
  TrendingUp,
  Zap,
  Globe,
  CheckCircle2,
  Star,
  Calendar,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

const affiliateTiers = [
  {
    name: 'Standard Affiliate',
    icon: '🥉',
    commission: '10%',
    desc: 'Perfect for regional expos and first-time partners.',
    features: [
      '10% of reservation deposit fees',
      'Co-branded event page on our directory',
      'Basic pre-sale analytics dashboard',
      'Vendor roster integration',
    ],
    cta: 'Apply as Affiliate',
    highlight: false,
  },
  {
    name: 'Premier Affiliate',
    icon: '🥈',
    commission: '15%',
    desc: 'For established expos with 1,000+ annual attendees.',
    features: [
      '15% of reservation deposit fees',
      'Premium event page with custom branding',
      'Advanced analytics + geographic heatmaps',
      'Bundled VIP ticket integration',
      'Priority vendor recruitment support',
    ],
    cta: 'Apply as Premier',
    highlight: true,
  },
  {
    name: 'Strategic Partner',
    icon: '🥇',
    commission: '20%',
    desc: 'For major multi-day expos and national organizers.',
    features: [
      '20% of reservation deposit fees',
      'Full white-label pre-sale portal',
      'Dedicated account manager',
      'Revenue share on bundled Collector Pass sales',
      'Joint marketing campaigns',
      'Exclusive territory protection',
    ],
    cta: 'Request Partnership',
    highlight: false,
  },
];

const metrics = [
  { value: '8,200+', label: 'Active Collectors', icon: <Users size={20} /> },
  { value: '340+', label: 'Verified Vendors', icon: <ShieldCheck size={20} /> },
  { value: '47', label: 'Expos Covered', icon: <Calendar size={20} /> },
  { value: '$2.4M+', label: 'GMV Facilitated', icon: <DollarSign size={20} /> },
];

const howItWorks = [
  {
    step: '01',
    title: 'Embed Our Pre-Sale Portal',
    desc: 'We provide a lightweight, embeddable widget that integrates seamlessly into your existing event website. Collectors browse the verified vendor roster and reserve plants before doors open.',
    icon: <Globe size={28} />,
  },
  {
    step: '02',
    title: 'Drive Pre-Event Traffic',
    desc: 'Your marketing drives targeted regional collectors directly to the pre-sale portal. Every reservation deposit generates affiliate revenue for you automatically.',
    icon: <TrendingUp size={28} />,
  },
  {
    step: '03',
    title: 'Bundle VIP Tickets',
    desc: 'Seamlessly bundle our Premium Collector Pass with your physical VIP tickets. One checkout, one price, thousands of new platform users at zero acquisition cost.',
    icon: <Ticket size={28} />,
  },
  {
    step: '04',
    title: 'Get Paid Monthly',
    desc: 'Transparent revenue sharing paid out monthly. Full analytics dashboard showing exactly how much traffic, reservations, and revenue your partnership generates.',
    icon: <DollarSign size={28} />,
  },
];

export default function PartnersPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingTop: '12rem', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid-overlay" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${4 + (i % 3)}px`,
              height: `${4 + (i % 3)}px`,
              borderRadius: '50%',
              background: 'var(--gold)',
              opacity: 0.15,
              left: `${10 + (i * 11) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
              animation: `float ${5 + (i % 4)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot" />
            <span>Revenue Partnership Program</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Turn Your Expo Into a <br />
            <em>Revenue Engine.</em>
          </h1>

          <p className="hero-sub" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
            Embed our pre-sale portal on your event website. Drive targeted collector traffic.
            Earn a percentage of every reservation. Zero risk, pure upside.
          </p>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="#tiers" className="btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1rem' }}>
              View Partnership Tiers <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </a>
            <a href="#how-it-works" className="btn-ghost" style={{ padding: '1.1rem 2.5rem', fontSize: '1rem' }}>
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF METRICS BAR ─── */}
      <section style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '3rem 5%',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {metrics.map((m, i) => (
            <div key={i}>
              <div style={{ color: 'var(--gold)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 700 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE PROBLEM / OPPORTUNITY ─── */}
      <section className="section" style={{ padding: '8rem 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-eyebrow">The Untapped Revenue</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Your Attendees Are Already <em>Buying Online.</em></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginTop: '1.5rem' }}>
              Collectors are spending thousands on rare plants through Whatnot, Instagram DMs, and Facebook groups — <strong>weeks before your event even starts.</strong> That pre-sale energy is revenue you're leaving on the table.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginTop: '1rem' }}>
              Our pre-sale portal captures that demand and <strong>channels it directly through your event</strong>, turning passive attendees into committed, deposit-paying buyers before they even walk through your doors.
            </p>
          </div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: 'var(--card-shadow)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '2rem', color: 'var(--gold)' }}>What You're Missing</h3>
            {[
              { label: 'Pre-sale reservation revenue', pct: '100%' },
              { label: 'Collector intent data', pct: '100%' },
              { label: 'Year-round attendee engagement', pct: '100%' },
              { label: 'Vendor satisfaction metrics', pct: '100%' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 800 }}>{item.pct} lost</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: item.pct, height: '100%', background: 'linear-gradient(90deg, #ef4444, #dc2626)', borderRadius: '3px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section" id="how-it-works" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', padding: '8rem 5%' }}>
        <div className="section-header">
          <span className="section-eyebrow">Integration Process</span>
          <h2 className="section-title">Dead Simple <em>Integration.</em></h2>
          <div className="section-rule" />
        </div>

        <div style={{ maxWidth: '900px', margin: '4rem auto 0', display: 'grid', gap: '0' }}>
          {howItWorks.map((step, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '2rem',
              padding: '2.5rem 0',
              borderBottom: i < howItWorks.length - 1 ? '1px solid var(--glass-border)' : 'none',
              alignItems: 'start',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'var(--gold-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                flexShrink: 0,
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Step {step.step}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BUNDLED VIP PACKAGE SPOTLIGHT ─── */}
      <section style={{
        padding: '8rem 5%',
        background: 'linear-gradient(145deg, #051A13 0%, #0B3D2E 100%)',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <Ticket size={16} /> The Killer Feature
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Bundle <em style={{ color: 'var(--gold)' }}>Premium Collector Pass</em><br />
            With Your VIP Tickets
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
            One checkout. One price. Your collectors get physical VIP entry <strong>plus</strong> a digital Premium Collector Pass — giving them pre-sale access, verified vendor matchmaking, and CultivarID™ scanning. You drive thousands of new users into the ecosystem at <strong>zero customer acquisition cost.</strong>
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '24px',
            padding: '3rem',
            backdropFilter: 'blur(20px)',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>$0</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7, marginTop: '0.5rem' }}>Customer Acquisition Cost</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>1</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7, marginTop: '0.5rem' }}>Unified Checkout</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>∞</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7, marginTop: '0.5rem' }}>Year-Round Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AFFILIATE TIERS ─── */}
      <section className="section" id="tiers" style={{ padding: '8rem 5%' }}>
        <div className="section-header">
          <span className="section-eyebrow">Partnership Tiers</span>
          <h2 className="section-title">Choose Your <em>Revenue Level.</em></h2>
          <p className="section-desc">Every tier includes full analytics, a co-branded event page, and white-glove onboarding support.</p>
          <div className="section-rule" />
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '4rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch',
        }}>
          {affiliateTiers.map((tier, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: tier.highlight ? '2px solid var(--gold)' : '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: tier.highlight ? '0 30px 60px var(--gold-dim)' : 'var(--card-shadow)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              {tier.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gold)',
                  color: 'var(--charcoal)',
                  padding: '0.35rem 1.25rem',
                  borderRadius: '30px',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{tier.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{tier.desc}</p>

              <div style={{
                fontSize: '3rem',
                fontFamily: 'var(--font-heading)',
                color: 'var(--gold)',
                marginBottom: '0.25rem',
                lineHeight: 1,
              }}>
                {tier.commission}
              </div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 700 }}>
                Commission Rate
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:partnerships@rareplantvendors.com?subject=Affiliate Partnership Inquiry"
                className={tier.highlight ? 'btn-primary' : 'btn-ghost'}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '1rem',
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ALREADY PARTNERED ─── */}
      <section style={{
        padding: '6rem 5%',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
      }}>
        <span className="section-eyebrow">Early Partners</span>
        <h2 className="section-title">Trusted By <em>Industry Leaders</em></h2>
        <div className="section-rule" style={{ margin: '1.5rem auto' }} />
        <div style={{
          maxWidth: '900px',
          margin: '3rem auto 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
          opacity: 0.6,
        }}>
          {['The BIG Plant Expo', 'Hortlandia', 'Rare Plant Fairy', 'SoCal Plant Swap'].map((name, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              letterSpacing: '-0.02em',
            }}>
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="cta-section" style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          Stop Leaving Revenue<br />
          <em>On the Table.</em>
        </h2>
        <p style={{ maxWidth: '600px', margin: '1.5rem auto 3rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Your attendees are already buying online. Capture that demand, monetize it, and give them a premium experience they'll never forget.
        </p>
        <a href="mailto:partnerships@rareplantvendors.com?subject=Partnership Inquiry" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
          Start the Conversation <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
        </a>
        <p style={{ marginTop: '2rem', fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Rare Plant Vendors · Affiliate Partnership Program · Est. 2026
        </p>
      </section>

    </main>
  );
}
