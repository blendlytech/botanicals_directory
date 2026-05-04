'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import "./detroit.css";

export default function DetroitLandingPage() {
  const [vendorCount, setVendorCount] = useState(37);

  useEffect(() => {
    async function getCount() {
      const { count, error } = await supabase
        .from('event_vendors')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', '22ec02cf-8833-4f92-befe-52caa82b84d0');
      
      if (!error && count !== null) {
        setVendorCount(count);
      }
    }
    getCount();
  }, []);
  return (
    <main className="detroit-landing" style={{ background: '#040806', color: '#FFFFFF', minHeight: '100vh' }}>
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="detroit-hero-bg">
        <div className="hero-grid-overlay" />
        <div className="glow-sphere" style={{ top: '10%', left: '20%' }} />
        <div className="glow-sphere" style={{ bottom: '20%', right: '10%' }} />
      </div>

      {/* ── FESTIVAL HEADER ── */}
      <div className="festival-banner">
        <div className="banner-content">
          <span className="banner-tag">LIVE EVENT ACCESS</span>
          <span className="banner-text">RARE PLANT & ORCHID FESTIVAL • DETROIT • JUNE 2026</span>
          <span className="banner-tag">LIMITED SEATS</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 5% 4rem', position: 'relative', zIndex: 10 }}>
        
        {/* ── HERO SECTION ── */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="hero-logo-container" style={{ marginBottom: '2rem' }}>
            <Image 
              src="/campaign-logo.png" 
              alt="Rare Plant Vendors Logo" 
              width={160} 
              height={160} 
              className="hero-central-logo"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))',
                borderRadius: '50%'
              }}
            />
          </div>
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            FULL SCALE LAUNCH
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
            The <em>CultivarID™</em> <br />
            Revolution is Here.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            The Rare Plant & Orchid Festival in Detroit is the ultimate proving ground. 
            Collectors aren't just looking for plants—they're looking for <strong>provenance</strong>.
          </p>

          <div className="stats-highlight">
            <div className="stat-box">
              <div className="stat-val">{vendorCount}/66</div>
              <div className="stat-lab">VENDORS SIGNED UP</div>
            </div>
            <div className="stat-box gold-border">
              <div className="stat-val">100%</div>
              <div className="stat-lab">DONE FOR YOU SETUP</div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section id="about" style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">What is <em>CultivarID™</em>?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>A simple 3-step digital bridge between you and the collector.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="feature-card">
              <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>01</div>
              <h3 style={{ marginBottom: '1rem' }}>The Registry</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                We create a digital "birth certificate" for your high-value specimens including mother plant origin and care history.
              </p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>02</div>
              <h3 style={{ marginBottom: '1rem' }}>The Secure QR</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                You get unique QR codes for your tags. Scans show the plant's story, care tips, and **curated botanical facts** about the species.
              </p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>03</div>
              <h3 style={{ marginBottom: '1rem' }}>The Trusted Sale</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The digital provenance certificate is transferred to the buyer, building lifetime trust and a direct line for future sales.
              </p>
            </div>
          </div>
        </section>

        {/* ── COLD CALL HOOK ── */}
        <section className="pitch-section">
          <div className="pitch-card">
            <div className="pitch-content">
              <h2 className="section-title">Subscribers are <em>Searching</em>.</h2>
              <p>
                Our 15,000+ active subscribers have been notified: <strong>Look for the CultivarID™ QR Codes at the festival.</strong>
              </p>
              <p>
                "Think of it as a <strong>Digital Passport</strong> for your plants. It’s a secure QR code you put on your plant tags. When a collector scans it, they see the exact lineage, care history, and proof that it came from your nursery."
              </p>
              <div className="urgency-tag">
                OFFER EXPIRES IN 2 HOURS
              </div>
            </div>
            <div className="pitch-image">
              <div className="qr-preview-container">
                <Image 
                  src="/cultivarid_mockup_1777147672958.png" 
                  alt="CultivarID Mockup" 
                  width={400} 
                  height={600} 
                  style={{ objectFit: 'contain', borderRadius: '20px' }}
                />
              </div>
              <div className="qr-label">CULTIVARID™ SECURE SCAN</div>
            </div>
          </div>
        </section>

        {/* ── THE "ANY TIER" OFFER ── */}
        <section id="apply" style={{ marginTop: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">The "Done-For-You" <em>Flash Sale</em></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Choose any tier. We handle the listing, the passports, and the setup in 24 hours.</p>
          </div>

          <div className="pricing-grid">
            {/* SPROUT */}
            <div className="pricing-card">
              <div className="card-header">
                <h3>Sprout</h3>
                <div className="price">$14.99<span>/mo</span></div>
              </div>
              <ul className="card-features">
                <li>✓ Professional Profile</li>
                <li>✓ 5 Active Listings</li>
                <li>✓ Done-for-you Setup</li>
                <li>✓ Basic CultivarID™ Integration</li>
              </ul>
              <Link href="/signup?tier=sprout&promo=detroit" className="btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Secure My Spot</Link>
            </div>

            {/* BLOOM */}
            <div className="pricing-card featured">
              <div className="featured-tag">MOST POPULAR FOR DETROIT</div>
              <div className="card-header">
                <h3>Bloom</h3>
                <div className="price">$39.99<span>/mo</span></div>
              </div>
              <ul className="card-features">
                <li>✓ Enhanced Visual Profile</li>
                <li>✓ 20 Active Listings</li>
                <li>✓ <strong>Priority</strong> 24h Setup</li>
                <li>✓ Full CultivarID™ Provenance</li>
                <li>✓ Festival Priority Listing</li>
              </ul>
              <Link href="/signup?tier=bloom&promo=detroit" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Get Festival Ready</Link>
            </div>

            {/* CANOPY */}
            <div className="pricing-card">
              <div className="card-header">
                <h3>Canopy</h3>
                <div className="price">$129.99<span>/mo</span></div>
              </div>
              <ul className="card-features">
                <li>✓ Elite Cinematic Profile</li>
                <li>✓ Unlimited Listings</li>
                <li>✓ White-Glove concierge Setup</li>
                <li>✓ Verified "Elite Grower" Badge</li>
                <li>✓ Featured Festival Showcase</li>
              </ul>
              <Link href="/signup?tier=canopy&promo=detroit" className="btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Go Elite</Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER PITCH ── */}
        <div style={{ textAlign: 'center', marginTop: '8rem', padding: '4rem', borderTop: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Don't show up <em>naked</em>.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            37 vendors are already preparing their digital displays. <br />
            Will you be the one explaining why you don't have a passport?
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
             <Link href="/signup?promo=detroit" className="btn-primary" style={{ padding: '1.2rem 3rem' }}>START MY 24H SETUP</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
