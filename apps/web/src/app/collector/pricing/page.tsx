'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Lock,
  MapPin,
  Check,
  X as XIcon,
  Crown,
  Sparkles,
  QrCode,
  Users,
  Search,
  Map,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Bell,
  Handshake
} from 'lucide-react';

/* ──────────────────── TIER DATA ──────────────────── */
const tiers = [
  {
    key: 'free',
    name: 'Free Account',
    badge: 'Explorer',
    icon: <Search size={28} />,
    monthlyPrice: 0,
    annualPrice: 0,
    savingsPercent: 0,
    tagline: 'High-volume exploration and community engagement.',
    desc: 'Browse the directory, study genetic profiles, and track upcoming expos. Perfect for casual enthusiasts.',
    features: [
      { label: 'Directory Browsing', desc: 'Full access to explore verified rare plant vendors.', included: true },
      { label: 'CultivarID™ Profiles', desc: 'Study detailed genetic and lineage profiles of premium plants.', included: true },
      { label: 'Expo Maps', desc: 'View upcoming physical regional event maps.', included: true },
      { label: 'Early Access Pre-Sale', desc: 'Reserve highly coveted inventory before it goes public.', included: false },
      { label: 'Priority Alerts', desc: 'Push notifications 24 hours before inventory goes live.', included: false },
      { label: 'Escrow Access', desc: 'Full eligibility for secure holding deposits.', included: false },
    ],
    cta: 'Create Free Account',
    highlight: false,
    isPremium: false,
  },
  {
    key: 'premium',
    name: 'Premium Collector',
    badge: 'Elite Status',
    icon: <Crown size={28} />,
    monthlyPrice: 9.99,
    annualPrice: 49.00,
    savingsPercent: 59,
    tagline: 'Extreme value for the serious botanist.',
    desc: 'Unlock physical-event reservations, early presales, and high-value transactional tools. A digital pass that guarantees the asset represents undeniable value.',
    features: [
      { label: 'Directory Browsing', desc: 'Full access to explore verified rare plant vendors.', included: true },
      { label: 'CultivarID™ Profiles', desc: 'Study detailed genetic and lineage profiles of premium plants.', included: true },
      { label: 'Expo Maps', desc: 'View upcoming physical regional event maps.', included: true },
      { label: 'Early Access Pre-Sale', desc: 'Reserve highly coveted inventory before it goes public.', included: true },
      { label: 'Priority Alerts', desc: 'Push notifications 24 hours before inventory goes live.', included: true },
      { label: 'Escrow Access', desc: 'Full eligibility for secure holding deposits for digital pre-sales.', included: true },
    ],
    cta: 'Upgrade to Premium',
    highlight: true,
    isPremium: true,
    tag: 'Recommended',
  },
];

/* ──────────────────── FAQ DATA ──────────────────── */
const faqs = [
  {
    q: 'How does the Holding Deposit work?',
    a: 'To secure a plant before an expo, Premium Collectors place a 10% to 20% non-refundable holding deposit via our secure platform. The vendor then holds the plant off-market. You inspect the plant in person at the expo and pay the remaining 80% to 90% directly to the vendor via cash or local POS.',
  },
  {
    q: 'What if the plant is damaged when I inspect it?',
    a: 'Your deposit is safe in escrow. If the plant has hidden damage or pests upon in-person inspection, the platform initiates a dispute review to protect your investment and refund your deposit.',
  },
  {
    q: 'Can I upgrade my Free account later?',
    a: 'Absolutely. You can explore the directory and view CultivarID™ genetic profiles for free. Once you are ready to reserve a high-value asset before an expo, you can upgrade to Premium instantly.',
  },
  {
    q: 'Do I still need to buy an Expo ticket?',
    a: 'Yes, your Premium Collector pass provides early access to vendor inventory and secure escrow reservations on our platform. Physical VIP or general admission tickets to the expos are sold separately by the event organizers.',
  },
];

/* ──────────────────── COMPONENT ──────────────────── */
export default function CollectorPricingPage() {
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
            <span>Collector Club Access</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            Secure Your <br />
            <em style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>Dream Collection</em>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}>
            Browse top vendors for free, or upgrade to Premium for early access and secure escrow reservations on high-value specimens before they hit the expo floor.
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
                  SAVE 59%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COLLECTOR VALUE PROPOSITION ─── */}
      <section className="section" style={{ padding: '4rem 5% 6rem', background: 'var(--bg)', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">The Premium Advantage</span>
            <h2 className="section-title">Acquire with <em>Absolute Confidence</em></h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
          }}>
            {/* Value 1: Fraud */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <QrCode size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Genetic Provenance Verified</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                The proprietary CultivarID™ system resolves the industry’s most critical vulnerability: the inability to verify genetic lineage. We shut down the rampant fraud associated with expensive, unverified cuttings.
              </p>
            </div>

            {/* Value 2: Chaos */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <Lock size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Stress-Free Acquisition</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Our pre-sale reservation mechanism entirely eliminates the frantic, highly stressful physical rush of the expo floor. Secure your dream plants online and pick them up safely at your leisure.
              </p>
            </div>

            {/* Value 3: Shipping */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Zero Shipping Hazards</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Shipping delicate flora overnight during extreme weather is an existential gamble. Our localized matchmaking model keeps plants safe from temperature shock and courier trauma.
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
          maxWidth: '900px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}>
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const period = isAnnual ? '/yr' : '/mo';

            return (
              <div
                key={tier.key}
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem',
                  borderRadius: '28px',
                  background: tier.highlight
                    ? 'linear-gradient(165deg, #0B3D2E 0%, #072A1F 100%)'
                    : 'var(--bg-card)',
                  border: tier.highlight
                    ? '3px solid var(--gold)'
                    : '1px solid var(--glass-border)',
                  color: tier.highlight ? 'white' : 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: tier.highlight
                    ? '0 25px 60px rgba(11,61,46,0.3)'
                    : 'var(--card-shadow)',
                  transform: tier.highlight ? 'scale(1.03)' : 'scale(1)',
                  zIndex: tier.highlight ? 2 : 1,
                }}
              >
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

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: tier.highlight ? 'var(--gold)' : 'var(--text-secondary)',
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

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: tier.highlight ? 'var(--gold)' : 'inherit' }}>$</span>
                    <span style={{
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: tier.highlight ? 'var(--gold)' : 'inherit',
                      lineHeight: 1,
                    }}>
                      {price === 0 ? '0' : price.toFixed(price % 1 === 0 ? 0 : 2)}
                    </span>
                    {price > 0 && <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '0.25rem' }}>{period}</span>}
                  </div>
                  {isAnnual && tier.isPremium && (
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--gold)',
                      marginTop: '0.5rem',
                    }}>
                      Save {tier.savingsPercent}% vs monthly
                    </div>
                  )}
                </div>

                <Link
                  href={`/collector/signup?plan=${tier.key}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    borderRadius: '14px',
                    background: tier.highlight ? 'var(--gold)' : 'var(--emerald)',
                    color: tier.highlight ? 'var(--charcoal)' : 'white',
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
                          ? tier.highlight
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
                        <span style={{ fontWeight: 600 }}>{f.label}</span>
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

      {/* ─── ESCROW EXPLANATION ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-eyebrow">Hybrid Payment Architecture</span>
            <h2 className="section-title">The Secure <em>Holding Deposit</em> System</h2>
            <div className="section-rule" style={{ margin: '1rem auto' }} />
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 4rem',
            lineHeight: 1.7,
          }}>
            For digital pre-sales involving $500–$1,000 botanical assets, trust is fragile. Our secure escrow mechanism protects both you and the vendor.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'left',
          }}>
            <div style={{
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
            }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold-dim)',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
              }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>1. The Lock</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                You place a minor 10% to 20% holding deposit via our integrated payment gateway. This locks the reservation and the vendor pulls the plant off the market.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
            }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold-dim)',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
              }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>2. The Inspection</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                At the physical expo, you inspect the live plant in person to ensure it matches the CultivarID™ profile, free of hidden damage or pests.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
            }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold-dim)',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
              }}>
                <Handshake size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>3. The Settlement</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Once satisfied, you pay the remaining balance directly to the vendor via cash or local POS. You bypass heavy digital processing fees and walk away with your verified asset.
              </p>
            </div>
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
          <Bell size={48} color="var(--gold)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}>
            Don't Miss <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>The Next Drop</em>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}>
            Premium Collectors receive notifications 24 hours before a highly coveted inventory goes public.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/collector/signup?plan=premium" className="btn-primary" style={{
              padding: '1.25rem 3rem',
              borderRadius: '16px',
              fontSize: '1rem',
            }}>
              Join Premium Collector Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
