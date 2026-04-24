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
      
      {/* ─── FLASH SALE BANNER ─── */}
      <div style={{ 
        background: 'linear-gradient(90deg, #0A1A12 0%, #1a3d2e 50%, #0A1A12 100%)',
        color: 'var(--gold)',
        padding: '0.8rem 5%',
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        borderBottom: '1px solid var(--gold-dim)'
      }}>
        <span>🔥 FLASH SALE: Next 20 Authority Seats: <strong style={{ color: 'white' }}>$97/yr</strong> (was $979)</span>
        <div style={{ width: '1px', height: '15px', background: 'rgba(212,175,55,0.3)' }}></div>
        <span>Lifetime Elite: <strong style={{ color: 'white' }}>$497</strong></span>
        <div style={{ width: '1px', height: '15px', background: 'rgba(212,175,55,0.3)' }}></div>
        <a href="#pricing" style={{ textDecoration: 'underline', color: 'white' }}>Claim Now</a>
      </div>

      {/* ─── HERO: THE ELITE COMMAND ─── */}
      <section className="hero" style={{ paddingTop: '14rem' }}>
        <div className="hero-grid-overlay"></div>
        
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          <span>Founding Member Enrollment Open — 17 Founding Seats Left</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          The Authority Suite <br />
          <em>For Elite Growers.</em>
        </h1>
        
        <p className="hero-sub" style={{ maxWidth: '750px' }}>
          Stop losing buyers at the 2026 Expo. Leverage AI lead matching and Digital Passports to secure high-ticket botanical sales with absolute certainty.
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

      {/* ─── THE 2026 EXPO STANDARD ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <div className="section-eyebrow">The 2026 Standard</div>
          <h2 className="section-title">Don&apos;t Be the Booth <br /> <em>Without a Digital Pulse.</em></h2>
          <p className="section-desc">
            In 2026, serious collectors won&apos;t just look at your plants. They&apos;ll look for the CultivarID.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>📸</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>The Physical Hook</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A premium laminated QR code sits elegantly in front of your rare specimen. It signals to every passerby that this plant has a documented history and verified provenance.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>📱</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Instant Authority</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              The collector scans. Instantly, their phone displays high-level data: history, care instructions, lineage, and professional photography. Pricing and certificates appear with a single tap.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🤝</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>The Frictionless Sale</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              By providing all documentation (CITES, nursery certificates, etc.) digitally, you remove the "uncertainty gap." The collector has everything they need to make a $1,000+ decision on the spot.
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '6rem', 
          padding: '4rem', 
          background: 'linear-gradient(145deg, rgba(212,175,55,0.05), rgba(0,0,0,0))', 
          borderRadius: '32px', 
          border: '1px solid rgba(212,175,55,0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem' }}>Managed White-Glove Setup</h3>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
            We handle the heavy lifting. You provide your inventory list; we return with specific, strategic questions for your 10 featured plants. We then build the full digital lineage for you.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>24 Hours</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Backend Setup</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)', height: '40px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)' }}>17/50</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Founding Seats Left</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)', height: '40px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>Semi-Annual</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Profile Reviews</div>
            </div>
          </div>
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
      </section>

      {/* ─── EXPO 2026 BUNDLE ─── */}
      <section className="section" style={{ background: 'var(--emerald)', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ color: 'var(--gold)', border: '1px solid var(--gold)' }}>Expo 2026 Exclusive</div>
          <h2 className="section-title" style={{ color: 'white' }}>Are You Exhibiting at <br /> <em>The BIG Plant Expo 2026?</em></h2>
          <p className="section-desc" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
            Don&apos;t just show up. Stand out. Get our **Expo Authority Bundle** for $497 and we will:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem', textAlign: 'left' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <ShieldCheck color="var(--gold)" />
              <h4 style={{ margin: '1rem 0 0.5rem' }}>Digital Passport Setup</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>We manually build 10 Digital Passports for your showpieces so collectors can verify provenance at your booth.</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <MapPin color="var(--gold)" />
              <h4 style={{ margin: '1rem 0 0.5rem' }}>Priority Map Routing</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Your booth will be highlighted as a &quot;Must Visit&quot; for every collector using the RPV Event Map during the expo.</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <TrendingUp color="var(--gold)" />
              <h4 style={{ margin: '1rem 0 0.5rem' }}>Featured Placement</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Top-of-list placement in the directory specifically filtered for the 2026 Expo attendees.</p>
            </div>
          </div>
          <Link href="/onboarding?plan=expo" className="btn-primary" style={{ marginTop: '4rem', padding: '1rem 3rem' }}>
            Secure My Expo Bundle
          </Link>
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
        <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>17 Founding Seats Left</div>
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
