import Image from "next/image";
import PricingToggle from "../components/PricingToggle";
import { ShieldCheck, TrendingUp, MapPin, Zap, Star, Globe, Lock, ArrowRight, ChevronRight, BarChart3, Users } from 'lucide-react';
import Link from "next/link";

/* ── AUTHORITY SUITE BENEFITS ── */
const authorityBenefits = [
  {
    icon: <BarChart3 size={32} />,
    title: "Buyer Intent Analytics",
    desc: "See exactly which species collectors in your region are searching for before you stock for the season. Stop guessing, start scaling.",
  },
  {
    icon: <MapPin size={32} />,
    title: "Geolocation Routing",
    desc: "Your booth appears as a high-priority destination on interactive maps. We route collectors directly to your location based on their specific wishlist.",
  },
  {
    icon: <Users size={32} />,
    title: "Direct Lead Matching",
    desc: "Our AI matches your live inventory against thousands of collector wishlists, sending instant 'Buyer Ready' alerts to your dashboard.",
  },
  {
    icon: <Globe size={32} />,
    title: "Global Registry Status",
    desc: "Join the verified elite. Your 'Authority' badge is the definitive mark of trust in the botanical marketplace.",
  },
];

const testimonials = [
  {
    quote: "The lead matching alone paid for the annual fee in the first week. I sold my entire stock of Thai Constellations before the expo doors even opened.",
    name: "Marcus Chen",
    title: "Verdant Roots Co. · Miami, FL",
  },
  {
    quote: "Collectors came directly to my booth because the map showed them exactly where the specimens on their wishlist were located. It's a game changer.",
    name: "Sofia Reyes",
    title: "Apex Aroids · San Diego, CA",
  },
];

export default function ForVendors() {
  return (
    <main className="page-wrapper">
      
      {/* ─── HERO: THE ELITE COMMAND ─── */}
      <section className="hero">
        <div className="hero-grid-overlay"></div>
        
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          <span>Stabilize Your Pipeline</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          The Authority Suite <br />
          <em>For Elite Growers.</em>
        </h1>
        
        <p className="hero-sub" style={{ maxWidth: '750px' }}>
          Eliminate vendor invisibility. Leverage AI lead matching and real-time geolocation routing to secure high-ticket botanical sales with absolute certainty.
        </p>

        <div className="hero-actions">
          <a href="#pricing" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
            Unlock Authority Suite
          </a>
          <a href="#benefits" className="btn-ghost" style={{ padding: '1rem 2.5rem' }}>
            See Features
          </a>
        </div>

        <div className="hero-seal" style={{ marginTop: '4rem' }}>
            <Image src="/brand-seal.png" alt="RPV Official Seal" width={100} height={100} />
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="section" id="benefits">
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Strategic Advantage</div>
          <h2 className="section-title">Built for the <em>Serious</em> Grower</h2>
          <p className="section-desc">
            Every tool in the Authority Suite is engineered around the core logistics of high-ticket botanical sales.
          </p>
          <div className="section-rule"></div>
        </div>

        <div className="features-grid">
          {authorityBenefits.map((b, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon" style={{ color: 'var(--gold)' }}>
                {b.icon}
              </div>
              <h3 className="feature-title">{b.title}</h3>
              <p className="feature-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="section section-dark" id="pricing">
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Pricing Plans</div>
          <h2 className="section-title">The <em>Authority Suite</em> is Now Open</h2>
          <div className="section-rule"></div>
        </div>
        
        <PricingToggle />
        
        <div style={{ 
            marginTop: '5rem', 
            maxWidth: '800px', 
            margin: '5rem auto 0',
            padding: '3rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--gold)',
            borderRadius: '20px',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
           <div style={{ 
               width: '80px', 
               height: '80px', 
               background: 'var(--gold-dim)', 
               borderRadius: '16px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               flexShrink: 0
           }}>
              <Star size={40} color="var(--gold)" fill="var(--gold-dim)" />
           </div>
           <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Founders&apos; Circle: Lifetime Access</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem', lineHeight: 1.6 }}>
                Elite Grower seats are limited to 100 total spots worldwide. Own your legacy with a one-time lifetime payment of $999.
              </p>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>
                 Only 73 seats remain — Claim Yours Today
              </div>
           </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ 
                padding: '3rem', 
                background: 'var(--bg-surface)', 
                borderRadius: '24px', 
                border: '1px solid var(--glass-border)',
                position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', width: '3rem', height: '3rem', background: 'var(--gold)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)', boxShadow: '0 10px 20px var(--gold-dim)' }}>
                 <Zap size={24} />
              </div>
              <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '44px', height: '44px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--charcoal)' }}>
                    {t.name.charAt(0)}
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600 }}>{t.title}</div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CALL ─── */}
      <section className="cta-section" style={{ padding: '8rem 5%' }}>
        <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Limited Availability</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Secure Your Authority <br /> <em>Before the Map Fills.</em></h2>
        <p style={{ maxWidth: '600px', margin: '1.5rem auto 3rem' }}>
          Stop losing collectors to the void. Join the verified network and route serious leads directly to your nursery today.
        </p>
        <Link href="/onboarding" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
          Apply for Authority Suite <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
        </Link>
        <p style={{ marginTop: '2rem', fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Verified Growers Network · Established 2026
        </p>
      </section>

    </main>
  );
}
