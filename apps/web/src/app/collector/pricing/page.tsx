'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Crown,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Bell,
  Handshake,
  Clock,
  Star,
} from 'lucide-react';

/* Single collector membership. See implementation_plan.md §6. */
const MEMBERSHIP_FEATURES = [
  { icon: <Clock size={16} />, label: '48-Hour Early Access', desc: "Browse expo-attending vendors' inventory two full days before the public." },
  { icon: <Lock size={16} />, label: 'Hold With a 10% Deposit', desc: 'Reserve a plant pre-event with a 10% holding deposit and skip the door rush.' },
  { icon: <Star size={16} />, label: 'Verified Reviews', desc: 'See aggregated 4-star-and-up vendor reviews before you buy.' },
  { icon: <ShieldCheck size={16} />, label: 'Saved Shortlists', desc: 'Bookmark favorite vendors and the rare plants you are hunting.' },
  { icon: <Bell size={16} />, label: 'Priority Alerts', desc: 'Get notified 48 hours before an expo pre-sale shelf goes live.' },
];

const faqs = [
  {
    q: 'How does the 10% holding deposit work?',
    a: 'To hold a plant before an expo, you place a 10% deposit through our secure platform. The vendor pulls the plant off-market and holds it for you. You inspect it in person at the expo and pay the remaining 90% directly to the vendor via cash or local POS.',
  },
  {
    q: 'What is the pickup deadline?',
    a: 'Each vendor sets a retrieval deadline for their expo. You must pick up your held plant by that date and time, or the 10% deposit is forfeited and the vendor is free to sell the plant on the expo floor. The exact deadline is shown on every reservation.',
  },
  {
    q: 'Is the $49 price really half off?',
    a: 'Yes. Collector Membership is normally $98/year. The first 100 collectors to join lock in a permanent half-off founding rate of $49/year.',
  },
  {
    q: 'Do I still need an expo ticket?',
    a: 'Yes. Your membership gives you 48-hour early access to vendor inventory and pre-sale reservations on our platform. Physical admission tickets to the expos are sold separately by the event organizers.',
  },
];

export default function CollectorPricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [foundingLeft, setFoundingLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/founding-stats')
      .then((r) => r.json())
      .then((d) => setFoundingLeft(d?.collector?.left ?? null))
      .catch(() => {});
  }, []);

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
            <span>Collector Club Access</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Beat the <br />
            <em style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic',
            }}>Expo Floor</em>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
            Get 48-hour early access to every expo-attending vendor&apos;s inventory and lock in
            your dream plants with a 10% deposit — before the doors ever open.
          </p>
        </div>
      </section>

      {/* ─── THE SINGLE PLAN CARD ─── */}
      <section style={{ padding: '0 5% 5rem', position: 'relative' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 100%)', color: 'var(--charcoal)',
            borderRadius: '16px 16px 0 0', padding: '0.85rem 1.5rem', textAlign: 'center',
            fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.03em',
          }}>
            {foundingLeft === 0
              ? '✦ Founding half-off spots are filled — standard $98/yr membership'
              : `🔥 Founding Offer — ${foundingLeft != null ? `${foundingLeft} of 100` : 'First 100'} Half-Off Spots${foundingLeft != null ? ' Left' : ''}`}
          </div>

          <div style={{
            background: 'linear-gradient(165deg, #0B3D2E 0%, #072A1F 100%)', border: '3px solid var(--gold)',
            borderTop: 'none', borderRadius: '0 0 28px 28px', padding: '3rem 2.5rem', color: 'white',
            boxShadow: '0 25px 60px rgba(11,61,46,0.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Crown size={22} color="var(--gold)" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)' }}>
                Collector Membership
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              {foundingLeft !== 0 && <span style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>$98</span>}
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>$</span>
              <span style={{ fontSize: '4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--gold)', lineHeight: 1 }}>{foundingLeft === 0 ? '98' : '49'}</span>
              <span style={{ fontSize: '1.1rem', opacity: 0.6 }}>/yr</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
              {foundingLeft === 0 ? 'Standard annual membership rate.' : 'Locked-in founding rate — 50% off the standard $98/year.'}
            </div>

            <Link
              href="/collector/signup?plan=premium"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1.1rem', borderRadius: '14px', fontSize: '0.9rem', marginBottom: '2rem' }}
            >
              Join the Collector Club <ArrowRight size={16} />
            </Link>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MEMBERSHIP_FEATURES.map((f) => (
                <li key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(212,175,55,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{f.label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, display: 'block', marginTop: '1px' }}>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
            Just browsing? <Link href="/vendors" style={{ color: 'var(--gold)' }}>Explore the directory free</Link> — membership unlocks early access &amp; reservations.
          </p>
        </div>
      </section>

      {/* ─── DEPOSIT / FORFEITURE EXPLANATION ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-eyebrow">How Pre-Sale Works</span>
            <h2 className="section-title">The 10% <em>Holding Deposit</em></h2>
            <div className="section-rule" style={{ margin: '1rem auto' }} />
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: 1.7 }}>
            For $500–$1,000 botanical assets, trust is fragile. A small deposit secures the plant
            and protects both sides — you just have to show up.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            {[
              { icon: <Lock size={24} />, title: '1. The Lock', body: 'During the 48h pre-sale window you place a 10% deposit. The vendor pulls the plant off-market and holds it for you.' },
              { icon: <Clock size={24} />, title: '2. The Deadline', body: 'You must retrieve the plant in person by the vendor’s set pickup deadline — or the deposit is forfeited and the plant goes back on the floor.' },
              { icon: <Handshake size={24} />, title: '3. The Settlement', body: 'Inspect the live plant at the expo, then pay the remaining 90% directly to the vendor. Half of your deposit supports the affiliate expo host.' },
            ].map((s) => (
              <div key={s.title} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold-dim)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
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
          <Bell size={48} color="var(--gold)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Don&apos;t Miss <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>The Next Drop</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
            Members get 48 hours of early access and first pick on every expo pre-sale shelf.
            Lock in the half-off founding rate while seats remain.
          </p>
          <Link href="/collector/signup?plan=premium" className="btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '16px', fontSize: '1rem' }}>
            Join for $49/yr
          </Link>
        </div>
      </section>
    </main>
  );
}
