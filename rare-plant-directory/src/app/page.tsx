import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ShieldCheck, MapPin, TrendingUp, ChevronRight, Star, ArrowRight, Zap, Lock, Map } from 'lucide-react';

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();

  const { data: dbEvents } = await supabase
    .from('events')
    .select('id, title, slug, description, event_type, is_featured, location_name, date_start')
    .order('date_start', { ascending: true })
    .limit(3);

  const { data: dbVendors } = await supabase
    .from('vendors')
    .select('id, name, slug, specialty, is_verified, account_tier')
    .order('account_tier', { ascending: false })
    .limit(6);

  const events = dbEvents || [];
  const vendors = dbVendors || [];

  return (
    <div className="page-wrapper" style={{ overflow: 'hidden' }}>
      
      {/* ─── HERO SECTION: CULTIVAR ID RELEASE ─── */}
      <section className="hero" style={{ 
        paddingTop: '10rem', 
        paddingBottom: '6rem',
        position: 'relative' 
      }}>
        <div className="hero-grid-overlay" style={{ opacity: 0.15 }}></div>
        
        {/* Decorative Luxury Accents */}
        <div style={{ 
          position: 'absolute', 
          top: '15%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '80vw', 
          height: '40vh', 
          background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2.5rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Official Release</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            fontWeight: 700,
            lineHeight: 1.1
          }}>
            Introducing <br />
            <em style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              animation: 'shimmer 4s linear infinite'
            }}>CultivarID</em>
          </h1>
          
          <p className="hero-sub" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 4rem',
            fontSize: '1.25rem', 
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            The definitive digital passport for botanical provenance. 
            Secure your legacy, verify your specimens, and connect directly with serious collectors.
          </p>
        </div>
      </section>

      {/* ─── PRICING / SIGNUP FOCUS ─── */}
      <section className="section" id="pricing" style={{ padding: '4rem 5% 10rem', position: 'relative' }}>
        {/* Background Accent */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '60vw', 
          height: '60vh', 
          background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.4,
          zIndex: -1 
        }}></div>

        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 1.5rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>Limited Availability</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Choose Your <em>Botanical Legacy</em></h2>
          <p style={{ opacity: 0.8, maxWidth: '650px', margin: '1.5rem auto 0', fontSize: '1.1rem' }}>
            Join a network of elite horticulturalists or browse the world's most exclusive specimens.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>
          
          {/* Collector Tier */}
          <div className="pricing-card pricing-card-glass" style={{ 
            padding: '4rem 2.5rem',
            borderRadius: '32px'
          }}>
            <div className="free-tier-badge" style={{ marginBottom: '1.5rem' }}>Collector</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--cream)', fontWeight: 600 }}>The Enthusiast</h3>
            <div className="pricing-price-display" style={{ color: 'white' }}>Free</div>
            <p style={{ opacity: 0.7, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Perfect for collectors seeking to verify provenance and discover rare specimens.
            </p>
            <ul className="pricing-feature-list">
              <li className="pricing-feature-item"><ShieldCheck size={20} color="var(--gold)" /> Verify CultivarIDs</li>
              <li className="pricing-feature-item"><Map size={20} color="var(--gold)" /> Global Event Map</li>
              <li className="pricing-feature-item"><Star size={20} color="var(--gold)" /> Save Favorite Vendors</li>
              <li className="pricing-feature-item" style={{ opacity: 0.4 }}><Zap size={20} /> Create CultivarIDs</li>
            </ul>
            <Link href="/onboarding?type=collector" className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1.25rem', borderRadius: '16px', fontSize: '0.85rem' }}>
              Create Collector Profile
            </Link>
          </div>

          {/* Founder Tier (Highlighted) */}
          <div className="pricing-card pricing-card-founder" style={{ 
            padding: '4rem 2.5rem',
            borderRadius: '32px',
            transform: 'scale(1.05)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div className="scarcity-pill">Elite Lifetime</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
                7 SLOTS REMAINING
              </div>
            </div>
            
            <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--gold)', fontWeight: 700 }}>Founder Pass</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="pricing-price-display" style={{ color: 'white', fontSize: '4.5rem' }}>$498</div>
              <div style={{ textDecoration: 'line-through', opacity: 0.4, fontSize: '1.2rem', color: 'var(--gold)' }}>$998/yr</div>
            </div>
            
            <p style={{ color: 'var(--cream)', opacity: 0.9, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
              One-time investment for life. No renewals. All future premium features included.
            </p>

            <div style={{ 
              background: 'rgba(212, 175, 55, 0.05)', 
              border: '1px solid var(--gold-dim)', 
              borderRadius: '16px', 
              padding: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Founder Perks:
              </div>
              <ul className="pricing-feature-list" style={{ margin: 0, gap: '1rem' }}>
                <li className="pricing-feature-item highlight"><Zap size={20} /> Unlimited CultivarID Creation</li>
                <li className="pricing-feature-item highlight"><Star size={20} /> "Founder" Profile Seal</li>
                <li className="pricing-feature-item highlight"><TrendingUp size={20} /> Priority Search Ranking</li>
                <li className="pricing-feature-item highlight"><Lock size={20} /> Lifetime Zero-Fee Status</li>
              </ul>
            </div>

            <Link href="/onboarding?type=vendor&plan=founder" className="btn-primary" style={{ 
              marginTop: 'auto', 
              textAlign: 'center', 
              width: '100%', 
              padding: '1.25rem', 
              borderRadius: '16px', 
              fontSize: '0.9rem',
              letterSpacing: '0.1em'
            }}>
              Secure Lifetime Access
            </Link>
          </div>

          {/* Vendor Standard Tier */}
          <div className="pricing-card pricing-card-glass" style={{ 
            padding: '4rem 2.5rem',
            borderRadius: '32px',
            opacity: 0.8
          }}>
            <div style={{ marginBottom: '1.5rem', color: 'var(--sand)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Future Tier</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--cream)', fontWeight: 600 }}>Standard Elite</h3>
            <div className="pricing-price-display" style={{ color: 'white' }}>$998<span style={{ fontSize: '1.2rem', opacity: 0.4 }}>/yr</span></div>
            <p style={{ opacity: 0.7, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Professional access for vendors once Founder passes are exhausted.
            </p>
            <ul className="pricing-feature-list">
              <li className="pricing-feature-item"><ShieldCheck size={20} color="var(--gold)" /> Verified Vendor Profile</li>
              <li className="pricing-feature-item"><MapPin size={20} color="var(--gold)" /> Event Map Placement</li>
              <li className="pricing-feature-item"><Zap size={20} color="var(--gold)" /> 50 CultivarIDs / year</li>
            </ul>
            <Link href="/onboarding?type=vendor&plan=standard" className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1.25rem', borderRadius: '16px', fontSize: '0.85rem' }}>
              Join the Waitlist
            </Link>
          </div>

        </div>
      </section>

      {/* ─── TICKER BAR ─── */}
      <div className="ticker-bar" style={{ padding: '1.25rem 0', background: 'var(--charcoal)', borderTop: '1px solid var(--gold-dim)' }}>
        <div className="ticker-track" style={{ animationDuration: '40s' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="ticker-item" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              <span style={{ color: 'var(--gold)' }}>CultivarID</span> Release <div className="ticker-dot"></div>
              <span style={{ color: 'var(--gold)' }}>25</span> Lifetime Access Passes <div className="ticker-dot"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA SECTION: THE CLOSER ─── */}
      <section className="cta-section" style={{ padding: '10rem 5%', textAlign: 'center', background: 'radial-gradient(circle at center, #0B3D2E 0%, #040806 100%)' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              position: 'absolute', 
              inset: '-20px', 
              background: 'var(--gold-dim)', 
              filter: 'blur(30px)', 
              borderRadius: '50%',
              zIndex: -1 
            }}></div>
            <Image 
              src="/brand-seal.png" 
              alt="Real Plant Vendors Official Seal" 
              width={140} 
              height={140} 
              style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}
            />
          </div>
          
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Secure Your <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Founding Legacy</em>
          </h2>
          
          <p style={{ 
            opacity: 0.9, 
            marginBottom: '3.5rem', 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            margin: '0 auto 3.5rem',
            color: 'var(--cream)'
          }}>
            Only <span style={{ color: 'var(--gold)', fontWeight: 700 }}>7</span> of 25 lifetime passes remain. <br />
            Join the elite circle of verified plant professionals today.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/onboarding?type=vendor&plan=founder" className="btn-primary" style={{ 
              padding: '1.25rem 3.5rem', 
              borderRadius: '16px', 
              fontSize: '1rem',
              boxShadow: '0 10px 40px rgba(212,175,55,0.3)'
            }}>
              Claim Lifetime Access
            </Link>
            <Link href="/about" className="btn-ghost" style={{ 
              padding: '1.25rem 3.5rem', 
              borderRadius: '16px', 
              fontSize: '1rem'
            }}>
              View Full Benefits
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
