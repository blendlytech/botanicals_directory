'use client';

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Detroit Expo × CultivarID™ | Rare Plant Vendors",
  description: "Join the elite vendors already using CultivarID™ for the Rare Plant Fairy Pop-up Expo in Detroit. 100% setup done for you in 24 hours.",
};

export default function DetroitLandingPage() {
  return (
    <main className="miami-landing" style={{ background: '#040806', color: '#FFFFFF', minHeight: '100vh' }}>
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="miami-hero-bg">
        <div className="hero-grid-overlay" />
        <div className="glow-sphere" style={{ top: '10%', left: '20%' }} />
        <div className="glow-sphere" style={{ bottom: '20%', right: '10%' }} />
      </div>

      {/* ── FESTIVAL HEADER ── */}
      <div className="festival-banner">
        <div className="banner-content">
          <span className="banner-tag">LIVE EVENT ACCESS</span>
          <span className="banner-text">RARE PLANT FAIRY POP-UP EXPO • DETROIT • MAY 20, 2026</span>
          <span className="banner-tag">LIMITED SEATS</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 5% 4rem', position: 'relative', zIndex: 10 }}>
        
        {/* ── HERO SECTION ── */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            FULL SCALE LAUNCH
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
            The <em>CultivarID™</em> <br />
            Revolution is Here.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            The Rare Plant Fairy Pop-up Expo in Detroit is the ultimate proving ground. 
            Collectors aren't just looking for plants—they're looking for <strong>provenance</strong>.
          </p>

          <div className="stats-highlight">
            <div className="stat-box">
              <div className="stat-val">12/40</div>
              <div className="stat-lab">VENDORS SECURED</div>
            </div>
            <div className="stat-box gold-border">
              <div className="stat-val">100%</div>
              <div className="stat-lab">DONE FOR YOU SETUP</div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS (THE "WHAT IS IT?" FIX) ── */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">What is <em>CultivarID™</em>?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>A simple 3-step digital bridge between you and the collector.</p>
          </div>
          <div className="features-grid">
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
                Our 15,000+ active subscribers have been notified: <strong>Look for the CultivarID™ QR Codes at the Detroit Eastern Market.</strong>
              </p>
              <p>
                "Think of it as a <strong>Digital Passport</strong> for your plants. It’s a secure QR code you put on your plant tags. When a collector scans it, they see the exact lineage, care history, and proof that it came from your nursery. Plus, it automatically pulls in <strong>interesting botanical facts</strong> about that specific species, so it acts like a digital educator for your customers while they browse."
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
        <section style={{ marginTop: '8rem' }}>
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
                <li>✓ Detroit Expo Priority Listing</li>
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

      <style jsx>{`
        .miami-landing {
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }
        .miami-hero-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(circle at 50% 50%, #0a1f18 0%, #040806 100%);
        }
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 90%);
        }
        .glow-sphere {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(11, 61, 46, 0.2) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
        }
        .festival-banner {
          background: var(--gold);
          color: #000;
          padding: 0.75rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .banner-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
        }
        .banner-tag {
          background: #000;
          color: var(--gold);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.6rem;
        }
        .hero-title em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--gold);
        }
        .stats-highlight {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }
        .stat-box {
          text-align: center;
          padding: 2rem;
          min-width: 200px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        .gold-border {
          border-color: var(--gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
        }
        .stat-val {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }
        .stat-lab {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          margin-top: 0.5rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .pitch-card {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 4rem;
          background: linear-gradient(135deg, rgba(11,61,46,0.3), rgba(4,8,6,0.5));
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 4rem;
          align-items: center;
        }
        .pitch-content h2 {
          font-size: 3rem;
          margin-bottom: 2rem;
        }
        .pitch-content p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .urgency-tag {
          display: inline-block;
          background: #e74c3c;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-top: 1rem;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .qr-preview-container {
          width: 340px;
          height: auto;
          background: transparent;
          border-radius: 24px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.2);
          transition: transform 0.5s ease;
        }
        .qr-preview-container:hover {
          transform: scale(1.02) rotate(1deg);
        }
        .qr-label {
          text-align: center;
          margin-top: 2rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          font-size: 0.7rem;
          color: var(--gold);
          text-transform: uppercase;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .pricing-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          padding: 3rem 2rem;
          border-radius: 16px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .pricing-card:hover {
          transform: translateY(-10px);
          border-color: var(--gold);
          background: rgba(255,255,255,0.04);
        }
        .pricing-card.featured {
          background: rgba(11, 61, 46, 0.2);
          border: 2px solid var(--gold);
          position: relative;
          transform: scale(1.05);
        }
        .featured-tag {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--gold);
          color: #000;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 800;
          white-space: nowrap;
        }
        .card-header h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .price {
          font-size: 3rem;
          font-weight: 800;
          color: var(--gold);
          margin-bottom: 2rem;
        }
        .price span {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 3rem;
          flex: 1;
        }
        .card-features li {
          margin-bottom: 1rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        @media (max-width: 900px) {
          .pitch-card { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .stats-highlight { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </main>
  );
}
