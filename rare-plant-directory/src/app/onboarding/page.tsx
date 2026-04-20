'use client';
import { useState } from 'react';
import Image from 'next/image';
import PaypalButton from '../components/PaypalButton';

/* ─── TYPES ─── */
type Tier = 'seedling' | 'verified' | 'pro' | 'elite';

interface FormData {
  tier: Tier;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  bio: string;
  locationCity: string;
  locationState: string;
  locationCountry: string;
  specialties: string[];
  logoUrl: string;
  billingPeriod: 'monthly' | 'annual';
}

/* ─── TIER CONFIG ─── */
const tierConfig = {
  seedling: {
    name: 'Seedling',
    badge: 'Free',
    badgeClass: 'free-tier-badge',
    price: 'Free',
    color: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    perks: ['Claim & own your profile', 'Vendor photo & logo', 'About me section', 'Social media links', '10 inventory items'],
    cta: 'Claim Free Profile',
  },
  verified: {
    name: 'Verified Grower',
    badge: '✓ Verified',
    badgeClass: 'verified-badge',
    monthlyPrice: '$29/mo',
    annualPrice: '$299/yr',
    color: 'rgba(20,90,67,0.2)',
    borderColor: 'var(--forest)',
    perks: ['Verified Grower badge', '100 inventory items', 'Wishlist matching', '5 digital passports/mo', '4% transaction fee'],
    cta: 'Apply — $29/mo',
  },
  pro: {
    name: 'Pro Grower',
    badge: '★ Pro',
    badgeClass: 'pro-tier-badge',
    monthlyPrice: '$59/mo',
    annualPrice: '$599/yr',
    color: 'rgba(20,90,67,0.3)',
    borderColor: 'rgba(212,175,55,0.3)',
    perks: ['500 inventory items', 'Premium map placement', 'Newsletter features', '20 digital passports/mo', '3% transaction fee'],
    cta: 'Go Pro — $59/mo',
  },
  elite: {
    name: 'Elite Grower',
    badge: '✦ Elite',
    badgeClass: 'elite-badge',
    price: '$999 — One-Time / Lifetime',
    color: 'linear-gradient(145deg, rgba(15,15,15,0.9), rgba(11,61,46,0.15))',
    borderColor: 'rgba(212,175,55,0.45)',
    perks: ['Numbered elite seal (1 of 100)', 'Unlimited inventory', '24hr early wishlist access', 'AI market analytics', '0% transaction fee'],
    cta: 'Claim Elite Seat',
  },
};

const specialtyOptions = [
  'Rare Aroids', 'Monstera & Variegates', 'Philodendrons', 'Hoya', 'Anthuriums',
  'Alocasia', 'Orchids', 'Epiphytes', 'Carnivorous Plants', 'Caudiciforms',
  'Ferns & Selaginella', 'Rare Tropicals', 'Succulents & Cacti', 'Tillandsia',
];

const TOTAL_STEPS = 4;

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    tier: 'seedling',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    instagram: '',
    facebook: '',
    bio: '',
    locationCity: '',
    locationState: '',
    locationCountry: 'USA',
    specialties: [],
    logoUrl: '',
    billingPeriod: 'annual',
  });

  const update = (key: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleSpecialty = (s: string) => {
    setForm(prev => ({
      ...prev,
      specialties: prev.specialties.includes(s)
        ? prev.specialties.filter(x => x !== s)
        : [...prev.specialties, s],
    }));
  };

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // Future: POST to Supabase via /api/onboarding
    console.log('Submitting:', form);
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen form={form} />;

  return (
    <div className="onboarding-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <Image src="/brand-seal.png" alt="RPV" width={64} height={64}
          style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))', marginBottom: '1rem' }} />
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>
          Rare Plant Vendors
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          Vendor Onboarding
        </h1>
      </div>

      {/* Step Progress */}
      <div className="step-indicator" style={{ marginBottom: '2rem' }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`step-dot${step === i + 1 ? ' active' : ''}${step > i + 1 ? ' complete' : ''}`}
          />
        ))}
      </div>

      {/* Step Label */}
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, opacity: 0.7, marginBottom: '1.5rem' }}>
        Step {step} of {TOTAL_STEPS} — {['Choose Your Tier', 'Your Profile', 'Specialties & Location', 'Review & Submit'][step - 1]}
      </p>

      {/* Card */}
      <div className="onboarding-card">
        {step === 1 && <StepTier form={form} update={update} />}
        {step === 2 && <StepProfile form={form} update={update} />}
        {step === 3 && <StepSpecialties form={form} toggleSpecialty={toggleSpecialty} update={update} />}
        {step === 4 && <StepReview form={form} />}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', gap: '1rem' }}>
          {step > 1 ? (
            <button className="btn-ghost" onClick={back} id="onboard-back-btn" style={{ flex: 1 }}>
              ← Back
            </button>
          ) : <div style={{ flex: 1 }} />}

          {step < TOTAL_STEPS ? (
            <button
              className="btn-primary"
              onClick={next}
              id="onboard-next-btn"
              style={{ flex: 2 }}
              disabled={step === 1 && !form.tier}
            >
              Continue →
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={handleSubmit}
              id="onboard-submit-btn"
              style={{ flex: 2 }}
            >
              {form.tier === 'seedling' ? 'Claim My Free Profile' : `Apply for ${tierConfig[form.tier].name}`} ✦
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 1: TIER SELECTION ─── */
function StepTier({ form, update }: { form: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <div className="onboarding-header">
        <h2 className="onboarding-title">Choose Your Tier</h2>
        <p className="onboarding-subtitle">Start free and upgrade anytime. No credit card required for Seedling.</p>
      </div>

      <div className="billing-toggle" style={{ marginBottom: '1.5rem', transform: 'scale(0.9)', originX: 'center' }}>
        <button className={`toggle-btn${form.billingPeriod === 'monthly' ? ' active' : ''}`} onClick={() => update('billingPeriod', 'monthly')}>Monthly</button>
        <button className={`toggle-btn${form.billingPeriod === 'annual' ? ' active' : ''}`} onClick={() => update('billingPeriod', 'annual')}>Annual <span className="save-tag">Save 15%</span></button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {(Object.keys(tierConfig) as Tier[]).map(tier => {
          const cfg = tierConfig[tier];
          const isSelected = form.tier === tier;
          return (
            <button
              key={tier}
              id={`tier-select-${tier}`}
              onClick={() => update('tier', tier)}
              style={{
                background: isSelected ? cfg.color : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isSelected ? cfg.borderColor : 'var(--glass-border)'}`,
                borderRadius: 10,
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? `0 0 20px rgba(212,175,55,0.08)` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={cfg.badgeClass}>{cfg.badge}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)' }}>{cfg.name}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {tier === 'seedling' ? 'Free' : (tier === 'elite' ? '$999' : (form.billingPeriod === 'annual' ? cfg.annualPrice : cfg.monthlyPrice))}
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cfg.perks.map(p => (
                  <li key={p} style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span> {p}
                  </li>
                ))}
              </ul>
              {tier === 'elite' && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    ⚠ Only 27 seats remaining
                  </div>
                  <a href="/elite-rules" target="_blank" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>
                    Review Good Standing Rules
                  </a>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── STEP 2: PROFILE ─── */
function StepProfile({ form, update }: { form: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <div className="onboarding-header">
        <h2 className="onboarding-title">Your Profile</h2>
        <p className="onboarding-subtitle">This is what collectors see. Make it count.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Business / Nursery Name *</label>
        <input className="form-input" id="input-business-name" type="text" placeholder="e.g. Verdant Roots Co." value={form.businessName} onChange={e => update('businessName', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Your Full Name *</label>
        <input className="form-input" id="input-owner-name" type="text" placeholder="First & Last Name" value={form.ownerName} onChange={e => update('ownerName', e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input className="form-input" id="input-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" id="input-phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">About Me / Business Description</label>
        <textarea className="form-textarea" id="input-bio" placeholder="Tell collectors what makes your nursery special, your growing philosophy, and your rarest current offerings..." value={form.bio} onChange={e => update('bio', e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Website</label>
          <input className="form-input" id="input-website" type="url" placeholder="https://yournursery.com" value={form.website} onChange={e => update('website', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Instagram</label>
          <input className="form-input" id="input-instagram" type="text" placeholder="@yourusername" value={form.instagram} onChange={e => update('instagram', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 3: SPECIALTIES & LOCATION ─── */
function StepSpecialties({ form, toggleSpecialty, update }: {
  form: FormData;
  toggleSpecialty: (s: string) => void;
  update: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div>
      <div className="onboarding-header">
        <h2 className="onboarding-title">Your Specialties</h2>
        <p className="onboarding-subtitle">Help collectors find you when searching for specific plants.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Select all that apply</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {specialtyOptions.map(s => {
            const selected = form.specialties.includes(s);
            return (
              <button
                key={s}
                id={`specialty-${s.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => toggleSpecialty(s)}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '20px',
                  border: `1px solid ${selected ? 'var(--gold)' : 'var(--glass-border)'}`,
                  background: selected ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: selected ? 'var(--gold)' : 'var(--sand)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {selected ? '✓ ' : ''}{s}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <label className="form-label" style={{ display: 'block', marginBottom: '1rem' }}>Location</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">City</label>
            <input className="form-input" id="input-city" type="text" placeholder="City" value={form.locationCity} onChange={e => update('locationCity', e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">State / Province</label>
            <input className="form-input" id="input-state" type="text" placeholder="TX" value={form.locationState} onChange={e => update('locationState', e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Country</label>
            <input className="form-input" id="input-country" type="text" placeholder="USA" value={form.locationCountry} onChange={e => update('locationCountry', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 4: REVIEW ─── */
function StepReview({ form }: { form: FormData }) {
  const cfg = tierConfig[form.tier];
  return (
    <div>
      <div className="onboarding-header">
        <h2 className="onboarding-title">Review & Submit</h2>
        <p className="onboarding-subtitle">Confirm your details before we create your profile.</p>
      </div>

      {/* Tier Summary */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--gold)', borderRadius: 10, padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className={cfg.badgeClass}>{cfg.badge}</span>
          <span style={{ marginLeft: '0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{cfg.name}</span>
        </div>
        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{cfg.price}</span>
      </div>

      {/* Profile Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {[
          ['Business', form.businessName || '—'],
          ['Owner', form.ownerName || '—'],
          ['Email', form.email || '—'],
          ['Location', [form.locationCity, form.locationState, form.locationCountry].filter(Boolean).join(', ') || '—'],
          ['Specialties', form.specialties.length ? form.specialties.join(', ') : '—'],
          ['Instagram', form.instagram || '—'],
          ['Website', form.website || '—'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>{label}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500, maxWidth: '60%', textAlign: 'right' }}>{value}</span>
          </div>
        ))}
      </div>

      {form.bio && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--gold)' }}>About Me</span>
          {form.bio}
        </div>
      )}

      {form.tier !== 'seedling' ? (
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
            {form.tier === 'elite' ? 'Secure Your Elite Seat' : `Activate Your ${tierConfig[form.tier].name} Status`}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {form.tier === 'elite' 
              ? 'Pay once. Own your legacy. Lifetime access and 0% transaction fees start immediately.'
              : `Your ${form.billingPeriod} subscription will begin immediately after payment.`}
          </p>
          <PaypalButton 
            amount={form.tier === 'elite' ? '999.00' : undefined}
            planId={form.tier === 'elite' ? undefined : (
              form.tier === 'verified' 
                ? (form.billingPeriod === 'annual' ? process.env.NEXT_PUBLIC_PAYPAL_PLAN_VERIFIED_ANNUAL : process.env.NEXT_PUBLIC_PAYPAL_PLAN_VERIFIED_MONTHLY)
                : (form.billingPeriod === 'annual' ? process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_ANNUAL : process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_MONTHLY)
            )}
            onSuccess={(details) => {
              console.log("Payment Successful:", details);
              setStep('success');
            }}
            onError={(err) => {
              alert("Payment failed. Please try again or contact support.");
            }}
          />
        </div>
      ) : (
        <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center', lineHeight: 1.6 }}>
          Your free profile will be live within minutes. No credit card required.
        </p>
      )}
    </div>
  );
}

/* ─── SUCCESS SCREEN ─── */
function SuccessScreen({ form }: { form: FormData }) {
  const cfg = tierConfig[form.tier];
  return (
    <div className="onboarding-container" style={{ justifyContent: 'center' }}>
      <div className="onboarding-card" style={{ textAlign: 'center' }}>
        <Image src="/brand-seal.png" alt="RPV Seal" width={100} height={100}
          style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.6))', marginBottom: '2rem', animation: 'floatLeaf 4s ease-in-out infinite' }} />

        <div style={{ marginBottom: '1rem' }}>
          <span className={cfg.badgeClass}>{cfg.badge}</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {form.tier === 'seedling' ? "You're Listed!" : (form.tier === 'elite' ? 'Welcome, Founder!' : 'Application Received!')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.7, marginBottom: '2.5rem' }}>
          {form.tier === 'seedling'
            ? `Welcome to Rare Plant Vendors, ${form.businessName || form.ownerName}! Your free profile is being created. Check your email at ${form.email} to confirm.`
            : (form.tier === 'elite'
                ? `Congratulations, ${form.businessName || form.ownerName}! You are officially Elite Founder #${Math.floor(Math.random() * 100) + 1}. Your lifetime access is active. Check your email for your digital certificate and dashboard login.`
                : `Thank you, ${form.businessName || form.ownerName}! We've received your ${cfg.name} application. Our team will review it within 48 hours and send payment instructions to ${form.email}.`)
          }
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" className="btn-ghost" id="success-home-btn">← Back to Directory</a>
          <a href="/for-vendors" className="btn-primary" id="success-vendors-btn">View Tier Benefits</a>
        </div>
      </div>
    </div>
  );
}
