'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Check,
  Crown,
  Globe,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Tag,
  ShieldCheck,
  Calendar,
  Infinity as InfinityIcon,
} from 'lucide-react';

/* Single vendor membership. See implementation_plan.md §6. */
const MEMBERSHIP_FEATURES = [
  { icon: <InfinityIcon size={16} />, label: 'Unlimited Inventory Listings', desc: 'List every plant you sell — no caps, with full photo galleries.' },
  { icon: <TrendingUp size={16} />, label: 'Premium Placement', desc: 'Priority ranking in directory search and featured rotation.' },
  { icon: <ShieldCheck size={16} />, label: 'Verified Vendor Badge', desc: 'The trust mark collectors look for before they buy.' },
  { icon: <Calendar size={16} />, label: 'Expo Pre-Sale Engine', desc: 'Verify expo attendance and stage inventory for 48h collector pre-sale.' },
  { icon: <Check size={16} />, label: 'Direct Lead Capture', desc: 'Collectors contact and reserve from you directly — 0% sales commission.' },
  { icon: <Tag size={16} />, label: 'CultivarID™ Tags', desc: 'Physical NFC provenance tags available as an add-on.', addon: true },
];

const faqs = [
  {
    q: 'Is it really one simple plan?',
    a: 'Yes. One vendor membership — $24.99/month or $249/year — unlocks everything: unlimited listings, premium placement, the verified badge, and the full Expo Pre-Sale Engine. No tiers, no upsell ladder.',
  },
  {
    q: 'What is the founding vendor offer?',
    a: 'The first 50 vendors to join get a full year free with their purchase. You pay for your first term and we extend your membership by 12 months on the house — locking in founding-vendor status.',
  },
  {
    q: 'Do you take a cut of my sales?',
    a: 'Never. We are a marketing and provenance platform, not a marketplace. You keep 100% of every sale. The only platform money tied to a transaction is the optional collector pre-sale deposit (of which 5% goes to the affiliate expo host).',
  },
  {
    q: 'How do CultivarID™ physical tags work?',
    a: 'CultivarID™ tags are tamper-evident Nylon NFC tags that link a physical plant to its digital provenance profile. They are an optional hardware add-on, custom-ordered and shipped to you — separate from your membership.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your dashboard whenever you like. Your profile and showcases stay publicly visible for 30 days, then archive (never deleted) so you can reactivate instantly.',
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [foundingLeft, setFoundingLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/founding-stats')
      .then((r) => r.json())
      .then((d) => setFoundingLeft(d?.vendor?.left ?? null))
      .catch(() => {});
  }, []);

  const price = isAnnual ? '249' : '24.99';
  const period = isAnnual ? '/yr' : '/mo';
  const billingParam = isAnnual ? 'annual' : 'monthly';

  return (
    <main className="page-wrapper" style={{ overflow: 'hidden' }}>
      {/* ─── HERO ─── */}
      <section style={{ paddingTop: '12rem', paddingBottom: '4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '50vh', background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)',
          filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot" />
            <span>One Plan. Everything Included.</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Vendor <em style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic',
            }}>Membership</em>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            One simple membership. Unlimited listings, premium placement, the verified badge, and
            the full Expo Pre-Sale Engine — with 0% sales commission, always.
          </p>

          {/* Billing toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '0.4rem', borderRadius: '100px', display: 'inline-flex', gap: '0.25rem', border: '1px solid var(--glass-border)' }}>
              <button onClick={() => setIsAnnual(false)} style={{ padding: '0.8rem 1.75rem', borderRadius: '100px', border: 'none', background: !isAnnual ? 'rgba(255,255,255,0.1)' : 'transparent', color: !isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                Monthly
              </button>
              <button onClick={() => setIsAnnual(true)} style={{ padding: '0.8rem 1.75rem', borderRadius: '100px', border: 'none', background: isAnnual ? 'var(--gold)' : 'transparent', color: isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Annual
                <span style={{ fontSize: '0.65rem', background: isAnnual ? '#fff' : 'var(--bg-surface)', color: isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>
                  SAVE 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE SINGLE PLAN CARD ─── */}
      <section style={{ padding: '0 5% 5rem', position: 'relative' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
          {/* Founding banner */}
          <div style={{
            background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 100%)', color: 'var(--charcoal)',
            borderRadius: '16px 16px 0 0', padding: '0.85rem 1.5rem', textAlign: 'center',
            fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.03em',
          }}>
            {foundingLeft === 0
              ? '🌿 Founding free-year spots are filled — standard membership pricing'
              : `🌱 Founding Offer — ${foundingLeft != null ? `${foundingLeft} of 50` : 'First 50'} First-Year-Free Spots${foundingLeft != null ? ' Left' : ''}`}
          </div>

          <div style={{
            background: 'linear-gradient(165deg, #0B3D2E 0%, #072A1F 100%)', border: '3px solid var(--gold)',
            borderTop: 'none', borderRadius: '0 0 28px 28px', padding: '3rem 2.5rem', color: 'white',
            boxShadow: '0 25px 60px rgba(11,61,46,0.35)',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Rare Plant Vendor Membership
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>$</span>
              <span style={{ fontSize: '4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--gold)', lineHeight: 1 }}>{price}</span>
              <span style={{ fontSize: '1.1rem', opacity: 0.6 }}>{period}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
              {isAnnual ? 'Billed annually — best value (~17% off monthly).' : 'Billed monthly. Switch to annual to save 17%.'}
            </div>

            <Link
              href={`/onboarding?type=vendor&plan=bloom&billing=${billingParam}`}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1.1rem', borderRadius: '14px', fontSize: '0.9rem', marginBottom: '2rem' }}
            >
              Claim Your Listing <ArrowRight size={16} />
            </Link>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MEMBERSHIP_FEATURES.map((f) => (
                <li key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(212,175,55,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {f.label}
                      {f.addon && <span style={{ fontSize: '0.55rem', background: 'rgba(212,175,55,0.2)', color: 'var(--gold)', padding: '0.15rem 0.4rem', borderRadius: '6px', fontWeight: 800, letterSpacing: '0.05em' }}>ADD-ON</span>}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, display: 'block', marginTop: '1px' }}>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── VENDOR VALUE PROPOSITION ─── */}
      <section className="section" style={{ padding: '2rem 5% 6rem', background: 'var(--bg)', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">Why Sell With Us</span>
            <h2 className="section-title">Eradicating Industry <em>Friction</em></h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { icon: <TrendingUp size={32} />, title: 'Zero Commission Leakage', body: 'Predatory live-auction platforms like Whatnot and Palmstreet extract 8%+ of your margins. We take 0% commission on your sales.' },
              { icon: <Globe size={32} />, title: 'De-Risked Venue Logistics', body: 'Stop hauling fragile, high-value assets blindly to venues. Lock in buyers via 48h expo pre-sale before you even pack the van.' },
              { icon: <Crown size={32} />, title: 'Ultimate Margin Protection', body: 'Every dollar saved from auction commissions funds your growth. Reinvest in genetics and scale your nursery operation.' },
            ].map((v) => (
              <div key={v.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2.5rem' }}>
                <div style={{ background: 'var(--gold-dim)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HARDWARE CALLOUT ─── */}
      <section className="section" style={{ background: 'var(--bg)', paddingTop: '0', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(11,61,46,0.1) 100%)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '24px', padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Tag size={28} color="var(--gold)" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                CultivarID™ Physical Hardware Tags
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Optional tamper-evident Nylon NFC tags act as physical proof of pedigree, linking a specimen to its digital provenance profile. Custom-ordered, provisioned, and shipped directly to you — separate from your membership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title">Frequently <em>Asked</em></h2>
            <div className="section-rule" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', textAlign: 'left' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} color="var(--gold)" />
                    {faq.q}
                  </span>
                  <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', color: 'var(--gold)', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '8rem 5%', textAlign: 'center', background: 'radial-gradient(circle at center, #0B3D2E 0%, #040806 100%)', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <Crown size={48} color="var(--gold)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Ready to Dominate <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Your Next Expo?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
            One membership. Unlimited listings, premium placement, and the Expo Pre-Sale Engine.
            The first 50 vendors get a full year free.
          </p>
          <Link href={`/onboarding?type=vendor&plan=bloom&billing=${billingParam}`} className="btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '16px', fontSize: '1rem' }}>
            Become a Member
          </Link>
        </div>
      </section>
    </main>
  );
}
