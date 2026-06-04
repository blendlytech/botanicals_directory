'use client';

import { useState } from "react";
import { TrendingUp, Check, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  { title: "Unlimited Inventory Listings", desc: "List every plant you sell — no caps, with full photo galleries." },
  { title: "Premium Placement & Badge", desc: "Priority directory ranking, featured rotation, and the verified vendor badge." },
  { title: "Expo Pre-Sale Engine", desc: "Verify expo attendance and stage inventory for 48h collector pre-sale." },
  { title: "Direct Lead Capture", desc: "Collectors contact and reserve from you directly — 0% sales commission." },
  { title: "CultivarID™ Tags (add-on)", desc: "Optional tamper-evident Nylon NFC provenance hardware, on-demand." },
];

export default function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  const price = isAnnual ? 249 : 24.99;
  const period = isAnnual ? "/yr" : "/mo";
  const billingParam = isAnnual ? "annual" : "monthly";

  return (
    <div style={{ width: '100%', maxWidth: '560px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* FOMO Section */}
      <div style={{ maxWidth: '700px', margin: '0 auto 3rem', padding: '2.5rem', background: 'var(--gold-dim)', border: '1px solid var(--gold)', borderRadius: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--gold)' }}>
          <AlertCircle size={24} />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>Don&apos;t Lose Sales to the Booth Next Door</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          One membership costs less than a single batch of flyers. The real cost? The thousands in
          lost revenue when your neighbor&apos;s booth captures pre-sale leads and yours doesn&apos;t.
        </p>
      </div>

      {/* Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-surface)', padding: '0.4rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
          <button onClick={() => setIsAnnual(false)} style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: !isAnnual ? 'var(--gold)' : 'transparent', color: !isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)' }}>Monthly</button>
          <button onClick={() => setIsAnnual(true)} style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: isAnnual ? 'var(--gold)' : 'transparent', color: isAnnual ? 'var(--charcoal)' : 'var(--text-secondary)' }}>
            Annually <span style={{ marginLeft: '0.5rem', opacity: 0.8, fontSize: '0.6rem' }}>Save 17%</span>
          </button>
        </div>
      </div>

      {/* Single plan card */}
      <div style={{ paddingBottom: '4rem' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 100%)', color: 'var(--charcoal)', borderRadius: '16px 16px 0 0', padding: '0.85rem 1.5rem', textAlign: 'center', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.03em' }}>
          🌱 First 50 Vendors Get Their First Year FREE
        </div>
        <div style={{ background: 'var(--emerald)', border: '2px solid var(--gold)', borderTop: 'none', borderRadius: '0 0 24px 24px', padding: '3rem 2rem', color: 'white', boxShadow: '0 20px 50px rgba(11,61,46,0.25)' }}>
          <div style={{ color: 'var(--gold)', marginBottom: '1rem' }}><TrendingUp size={24} /></div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>Vendor Membership</h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.85, lineHeight: 1.4, marginBottom: '1.5rem' }}>Everything you need to sell more at every expo.</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' }}>$</span>
            <span style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>{price}</span>
            <span style={{ fontSize: '1rem', opacity: 0.7 }}>{period}</span>
          </div>

          <Link
            href={`/onboarding?type=vendor&plan=bloom&billing=${billingParam}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '12px', background: 'var(--gold)', color: 'var(--charcoal)', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', marginBottom: '2rem' }}
          >
            Become a Member <ChevronRight size={16} />
          </Link>

          <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '1rem' }}>What&apos;s included:</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {FEATURES.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{f.title}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '2px', lineHeight: 1.3, color: '#F5F0E8' }}>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
