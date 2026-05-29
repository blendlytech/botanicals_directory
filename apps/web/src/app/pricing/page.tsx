'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Lock,
  Check,
  X as XIcon,
  Crown,
  Globe,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Tag
} from 'lucide-react';

/* ──────────────────── TIER DATA ──────────────────── */
const tiers = [
  {
    key: 'sprout',
    name: 'Sprout',
    badge: 'Starter',
    icon: <Lock size={28} />,
    monthlyPrice: 9.99,
    annualPrice: 99,
    savingsPercent: 17,
    tagline: 'Perfect for weekend market hobbyists.',
    desc: 'Digitize your booth in 5 minutes. Get a beautiful vendor profile, a dedicated plant page, and start capturing collector attention at your next event.',
    features: [
      { label: '1 Plant Showcase', desc: 'A dedicated digital page for your absolute best specimen.', included: true },
      { label: 'Vendor Linkpage', desc: 'A mobile-first profile listing your nursery info and showcase.', included: true },
      { label: 'Direct Email Inquiries', desc: 'Allow collectors to contact you directly from your profile.', included: true },
      { label: 'CultivarID™ Tags', desc: 'Laser-engraved anodized aluminum tags available at $20/tag.', included: true, addon: true },
      { label: 'Priority Directory', desc: 'Appear higher when collectors search for vendors.', included: false },
      { label: 'Scan Analytics', desc: 'Track profile and plant page views.', included: false },
      { label: 'Featured Homepage Spot', desc: 'Get rotated in the Featured Vendors section.', included: false },
    ],
    cta: 'Start Growing',
    highlight: false,
    isElite: false,
  },
  {
    key: 'bloom',
    name: 'Bloom',
    badge: 'Most Popular',
    icon: <TrendingUp size={28} />,
    monthlyPrice: 24.99,
    annualPrice: 249,
    savingsPercent: 17,
    tagline: 'The choice for established vendors.',
    desc: 'Advanced analytics and lead capture for established professionals. 5x the plant showcases, priority placement, and unbundled CultivarID™ hardware for every featured specimen.',
    features: [
      { label: '5 Plant Showcases', desc: 'Highlight your top 5 most valuable rare plants with dedicated pages.', included: true },
      { label: 'Priority Directory Placement', desc: 'Appear higher when collectors search for vendors in your region.', included: true },
      { label: 'Basic Scan Analytics', desc: 'See how many times your profile and plant pages are viewed.', included: true },
      { label: 'Direct Email Inquiries', desc: 'Allow collectors to contact you directly from your profile.', included: true },
      { label: 'Vendor Linkpage', desc: 'A mobile-first profile listing your nursery info and showcase.', included: true },
      { label: 'CultivarID™ Tags', desc: 'Laser-engraved anodized aluminum tags available at $20/tag.', included: true, addon: true },
      { label: 'Featured Homepage Spot', desc: 'Get rotated in the Featured Vendors section.', included: false },
    ],
    cta: 'Scale Your Nursery',
    highlight: true,
    isElite: false,
    tag: 'Recommended',
  },
  {
    key: 'elite',
    name: 'Elite Founder',
    badge: 'Lifetime Access',
    icon: <Crown size={28} />,
    monthlyPrice: 497,
    annualPrice: 497,
    savingsPercent: 0,
    tagline: 'One-time investment. Owned forever.',
    desc: 'Skip the subscriptions. Secure unlimited showcases, exclusive Founder-only perks, and deeply discounted hardware for life. No renewals. No future fees. Only 17 seats remain.',
    features: [
      { label: 'Unlimited Plant Showcases', desc: 'Create beautiful digital pages for any premium plant you sell.', included: true },
      { label: "Permanent 'Founder' Badge", desc: 'A special badge showing you were here from the start.', included: true },
      { label: 'CultivarID™ Tags at $10/tag', desc: 'Deeply discounted laser-engraved tags — half the standard price.', included: true, addon: true },
      { label: 'Concierge Onboarding', desc: 'We manually input your first 10 plants and optimize your profile.', included: true },
      { label: 'Advanced Scan Analytics', desc: 'Detailed geographic and temporal data on scans.', included: true },
      { label: 'Featured Homepage Spot', desc: 'Permanent Featured Vendor placement.', included: true },
      { label: 'Priority Directory Placement', desc: 'Top placement in all regional searches.', included: true },
      { label: 'Founders-Only Event Invites', desc: 'Exclusive access to private plant events and early access.', included: true },
    ],
    cta: 'Claim Lifetime Seat',
    highlight: false,
    isElite: true,
    tag: '17 Seats Left',
  },
];

/* ──────────────────── FAQ DATA ──────────────────── */
const faqs = [
  {
    q: 'Can I switch tiers at any time?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time from your vendor dashboard. When upgrading, you only pay the prorated difference. When downgrading, the new rate takes effect at the next billing cycle.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your vendor profile and plant showcases remain publicly visible for 30 days after cancellation. After that, they are archived but never deleted. You can reactivate anytime and everything will be restored instantly.',
  },
  {
    q: 'Is the Elite Founder Pass really a one-time payment?',
    a: 'Yes, 100%. One payment of $497 and you own lifetime access to every feature we build — today and in the future. No renewals, no hidden fees, no catch. Once the 50 seats are gone, they\'re gone forever.',
  },
  {
    q: 'How do CultivarID™ physical tags work?',
    a: 'Physical CultivarID™ tags are laser-engraved anodized aluminum certificates that link to your plant\'s digital provenance profile via QR code. Standard tags are $20 each for Sprout and Bloom vendors. Elite Founders get them at a deeply discounted $10/tag. Tags are custom-ordered, manufactured, and shipped directly to you.',
  },
  {
    q: 'Do you take a cut of my sales?',
    a: 'Never. We are not a marketplace. We are a marketing and provenance platform. You keep 100% of every sale you make. The only exception is if you voluntarily use a third-party payment processor through your profile.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) and PayPal. Elite Founder seats can also be purchased via bank transfer for qualified buyers.',
  },
];

/* ──────────────────── COMPARISON TABLE ──────────────────── */
const comparisonRows = [
  { feature: 'Plant Showcases', sprout: '1', bloom: '5', elite: 'Unlimited' },
  { feature: 'CultivarID™ Tag Price', sprout: '$20/tag', bloom: '$20/tag', elite: '$10/tag' },
  { feature: 'Vendor Linkpage', sprout: true, bloom: true, elite: true },
  { feature: 'Direct Email Inquiries', sprout: true, bloom: true, elite: true },
  { feature: 'Priority Directory', sprout: false, bloom: true, elite: true },
  { feature: 'Scan Analytics', sprout: false, bloom: 'Basic', elite: 'Advanced' },
  { feature: 'Featured Homepage Spot', sprout: false, bloom: false, elite: 'Permanent' },
  { feature: 'Concierge Onboarding', sprout: false, bloom: false, elite: true },
  { feature: 'Founder Badge', sprout: false, bloom: false, elite: true },
  { feature: 'Founders-Only Events', sprout: false, bloom: false, elite: true },
];

/* ──────────────────── COMPONENT ──────────────────── */
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="page-wrapper" style={{ overflow: 'hidden' }}>
      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '12rem',
        paddingBottom: '4rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '50vh',
          background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot" />
            <span>Transparent Vendor Pricing</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            Invest in Your <br />
            <em style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>Botanical Legacy</em>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}>
            Choose the plan that fits your operation. No hidden fees, no platform cuts, and
            you can upgrade or downgrade at any time. Physical CultivarID™ tags sold separately.
          </p>

          {/* ─── BILLING TOGGLE ─── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(10px)',
              padding: '0.4rem',
              borderRadius: '100px',
              display: 'inline-flex',
              gap: '0.25rem',
              border: '1px solid var(--glass-border)',
            }}>
              <button
                onClick={() => setIsAnnual(false)}
                style={{
                  padding: '0.8rem 1.75rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: !isAnnual ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: !isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.85rem',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                style={{
                  padding: '0.8rem 1.75rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: isAnnual ? 'var(--gold)' : 'transparent',
                  color: isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Annual
                <span style={{
                  fontSize: '0.65rem',
                  background: isAnnual ? '#fff' : 'var(--bg-surface)',
                  color: isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                }}>
                  SAVE 17%+
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VENDOR VALUE PROPOSITION ─── */}
      <section className="section" style={{ padding: '4rem 5% 6rem', background: 'var(--bg)', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">Why Sell With Us</span>
            <h2 className="section-title">Eradicating Industry <em>Friction</em></h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
          }}>
            {/* Value 1: Commission */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <TrendingUp size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Zero Commission Leakage</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Predatory live-auction platforms like Whatnot and Palmstreet extract up to 8% (or more) of your hard-earned margins. We take <strong>0% commission</strong> on your sales.
              </p>
            </div>

            {/* Value 2: Logistics */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <Globe size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>De-Risked Venue Logistics</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                No more transporting fragile, high-value biological assets blindly to physical venues. Secure buyers via pre-sale with our localized matchmaking before you even pack the van.
              </p>
            </div>

            {/* Value 3: Growth */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <Crown size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Ultimate Margin Protection</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Every dollar saved from live-auction commissions directly funds your growth. Reinvest in premium tissue culture, genetics, and scale your nursery operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING CARDS ─── */}
      <section style={{ padding: '0 5% 6rem', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}>
          {tiers.map((tier) => {
            const price = tier.isElite
              ? tier.monthlyPrice
              : isAnnual
                ? tier.annualPrice
                : tier.monthlyPrice;
            const period = tier.isElite ? 'once' : isAnnual ? '/yr' : '/mo';
            const billingParam = isAnnual ? 'annual' : 'monthly';

            return (
              <div
                key={tier.key}
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem',
                  borderRadius: '28px',
                  background: tier.highlight
                    ? 'linear-gradient(165deg, #0B3D2E 0%, #072A1F 100%)'
                    : tier.isElite
                      ? 'linear-gradient(165deg, #1a1a1a 0%, #0a0a0a 100%)'
                      : 'var(--bg-card)',
                  border: tier.highlight
                    ? '3px solid var(--gold)'
                    : tier.isElite
                      ? '2px solid var(--gold)'
                      : '1px solid var(--glass-border)',
                  color: (tier.highlight || tier.isElite) ? 'white' : 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: tier.highlight
                    ? '0 25px 60px rgba(11,61,46,0.3)'
                    : tier.isElite
                      ? '0 0 50px rgba(212,175,55,0.15)'
                      : 'var(--card-shadow)',
                  transform: tier.highlight ? 'scale(1.03)' : 'scale(1)',
                  zIndex: tier.highlight ? 2 : 1,
                }}
              >
                {/* Tag Badge */}
                {tier.tag && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: tier.highlight ? 'var(--gold)' : 'var(--emerald)',
                    color: tier.highlight ? 'var(--charcoal)' : 'white',
                    padding: '0.35rem 1.25rem',
                    borderRadius: '20px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}>
                    {tier.tag}
                  </div>
                )}

                {/* Badge + Icon */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: (tier.highlight || tier.isElite) ? 'var(--gold)' : 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                  }}>
                    {tier.badge}
                  </div>
                  <div style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>
                    {tier.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    margin: '0 0 0.5rem',
                    fontWeight: 700,
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    opacity: 0.75,
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: (tier.highlight || tier.isElite) ? 'var(--gold)' : 'inherit' }}>$</span>
                    <span style={{
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: (tier.highlight || tier.isElite) ? 'var(--gold)' : 'inherit',
                      lineHeight: 1,
                    }}>
                      {tier.isElite ? '497' : Math.floor(price).toLocaleString()}
                    </span>
                    <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '0.25rem' }}>{period}</span>
                  </div>
                  {isAnnual && !tier.isElite && (
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--gold)',
                      marginTop: '0.5rem',
                    }}>
                      Save {tier.savingsPercent}% vs monthly
                    </div>
                  )}
                  {tier.isElite && (
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--gold)',
                      marginTop: '0.5rem',
                    }}>
                      Paid once, owned forever
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={tier.isElite ? `/onboarding?type=vendor&plan=elite` : `/onboarding?type=vendor&plan=${tier.key}&billing=${billingParam}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    borderRadius: '14px',
                    background: tier.highlight ? 'var(--gold)' : tier.isElite ? 'var(--gold)' : 'var(--emerald)',
                    color: (tier.highlight || tier.isElite) ? 'var(--charcoal)' : 'white',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    marginBottom: '2rem',
                    transition: 'all 0.25s ease',
                    textAlign: 'center',
                    letterSpacing: '0.03em',
                  }}
                >
                  {tier.cta} <ArrowRight size={16} />
                </Link>

                {/* Features */}
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.5,
                  marginBottom: '1rem',
                }}>
                  What&apos;s included:
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem', flex: 1 }}>
                  {tier.features.map((f, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      fontSize: '0.82rem',
                      opacity: f.included ? 1 : 0.35,
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: f.included
                          ? (tier.highlight || tier.isElite)
                            ? 'rgba(212,175,55,0.2)'
                            : 'var(--gold-dim)'
                          : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: f.included ? 'var(--gold)' : 'var(--text-secondary)',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}>
                        {f.included
                          ? <Check size={12} strokeWidth={3} />
                          : <XIcon size={10} strokeWidth={2} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {f.label}
                          {(f as any).addon && (
                            <span style={{
                              fontSize: '0.55rem',
                              background: 'rgba(212,175,55,0.15)',
                              color: 'var(--gold)',
                              padding: '0.15rem 0.4rem',
                              borderRadius: '6px',
                              fontWeight: 800,
                              letterSpacing: '0.05em',
                            }}>ADD-ON</span>
                          )}
                        </span>
                        <span style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: '1px', lineHeight: 1.35 }}>{f.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── HARDWARE CALLOUT ─── */}
      <section className="section" style={{ background: 'var(--bg)', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(11,61,46,0.1) 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '24px',
            padding: '2.5rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px',
              background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Tag size={28} color="var(--gold)" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                CultivarID™ Physical Hardware Tags
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Laser-engraved anodized aluminum tags act as premium, physical proof of pedigree. Tags are custom-ordered, manufactured, and shipped directly to you. Standard price: <strong style={{ color: 'var(--gold)' }}>$20/tag</strong>. Elite Founders: <strong style={{ color: 'var(--gold)' }}>$10/tag</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">Compare Plans</span>
            <h2 className="section-title">Feature-by-Feature <em>Breakdown</em></h2>
            <div className="section-rule" />
          </div>

          <div style={{
            overflowX: 'auto',
            borderRadius: '20px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            boxShadow: 'var(--card-shadow)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              minWidth: '550px',
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                  <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Feature</th>
                  {['Sprout', 'Bloom', 'Elite Founder'].map((name, i) => (
                    <th key={name} style={{
                      padding: '1.25rem 1rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: i === 1 ? 'var(--gold)' : 'var(--text-primary)',
                    }}>
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={row.feature} style={{
                    borderBottom: idx < comparisonRows.length - 1 ? '1px solid var(--glass-border)' : 'none',
                  }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {row.feature}
                    </td>
                    {(['sprout', 'bloom', 'elite'] as const).map(tierKey => {
                      const val = row[tierKey];
                      return (
                        <td key={tierKey} style={{ padding: '1rem', textAlign: 'center' }}>
                          {val === true ? (
                            <Check size={18} color="var(--gold)" strokeWidth={3} />
                          ) : val === false ? (
                            <XIcon size={16} color="var(--text-secondary)" style={{ opacity: 0.3 }} />
                          ) : (
                            <span style={{ fontWeight: 600, color: tierKey === 'elite' ? 'var(--gold)' : 'var(--text-primary)' }}>
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title">Frequently <em>Asked</em></h2>
            <div className="section-rule" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} color="var(--gold)" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                      color: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    fontSize: '0.9rem',
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '1.25rem',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{
        padding: '8rem 5%',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #0B3D2E 0%, #040806 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <Crown size={48} color="var(--gold)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}>
            Ready to Dominate <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Your Next Expo?</em>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}>
            Join 200+ verified vendors already using Rare Plant Vendors to capture leads,
            build provenance, and sell more at every event.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/onboarding?type=vendor&plan=bloom" className="btn-primary" style={{
              padding: '1.25rem 3rem',
              borderRadius: '16px',
              fontSize: '1rem',
            }}>
              Start with Bloom
            </Link>
            <Link href="/onboarding?type=vendor&plan=elite" className="btn-ghost" style={{
              padding: '1.25rem 3rem',
              borderRadius: '16px',
              fontSize: '1rem',
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
            }}>
              Claim Lifetime Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
