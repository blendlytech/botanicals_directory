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
      <section className="section" id="pricing" style={{ padding: '2rem 5% 8rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Select Your <em>Access Tier</em></h2>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '1rem auto 0' }}>
            Streamlined access for collectors and an exclusive lifetime opportunity for early-adopting vendors.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Collector Tier */}
          <div className="pricing-card" style={{ 
            background: 'var(--charcoal)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--cream)' }}>Collector</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>
              Free
            </div>
            <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.9rem', flex: 1 }}>
              Standard account access to browse vendors, view CultivarIDs, and track your wishlist.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', opacity: 0.8, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><ShieldCheck size={18} color="var(--gold)" /> Verify CultivarIDs</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Map size={18} color="var(--gold)" /> Access Global Event Map</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Star size={18} color="var(--gold)" /> Save Favorite Vendors</li>
            </ul>
            <Link href="/onboarding?type=collector" className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1rem', borderRadius: '12px' }}>
              Join as Collector
            </Link>
          </div>

          {/* Vendor Founder Tier (Highlighted) */}
          <div className="pricing-card featured" style={{ 
            background: 'rgba(11,61,46,0.6)', 
            border: '2px solid var(--gold)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.15)',
            transform: 'scale(1.05)',
            zIndex: 10
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              background: 'var(--gold)',
              color: 'var(--charcoal)',
              padding: '0.4rem 1.25rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              First 100 Vendors Only
            </div>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--gold)' }}>Lifetime Access</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>$49</div>
              <div style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '1.2rem', color: 'var(--cream)' }}>$98/yr</div>
            </div>
            <p style={{ color: 'var(--cream)', opacity: 0.9, marginBottom: '2rem', fontSize: '0.9rem', flex: 1 }}>
              Lifetime access to CultivarID generation, elite badge, and all future premium upgrades. No annual fees, ever.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', opacity: 0.9, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Zap size={18} color="var(--gold)" /> Lifetime CultivarID Creation</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Star size={18} color="var(--gold)" /> "Founder" Elite Profile Badge</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><TrendingUp size={18} color="var(--gold)" /> All Future Features Included</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Lock size={18} color="var(--gold)" /> Never Pay Annual Renewal</li>
            </ul>
            <Link href="/onboarding?type=vendor&plan=founder" className="btn-primary" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--gold)', color: 'var(--charcoal)', fontWeight: 700 }}>
              Claim Lifetime Access
            </Link>
          </div>

          {/* Vendor Standard Tier */}
          <div className="pricing-card" style={{ 
            background: 'var(--charcoal)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--cream)' }}>Vendor Standard</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>
              $98<span style={{ fontSize: '1.2rem', opacity: 0.6, fontWeight: 400 }}>/yr</span>
            </div>
            <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.9rem', flex: 1 }}>
              Standard vendor account access after the Founder slots are filled.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', opacity: 0.8, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><ShieldCheck size={18} color="var(--gold)" /> Verified Vendor Profile</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><MapPin size={18} color="var(--gold)" /> Event Map Placement</li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Zap size={18} color="var(--gold)" /> Standard CultivarIDs</li>
            </ul>
            <Link href="/onboarding?type=vendor&plan=standard" className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1rem', borderRadius: '12px' }}>
              Join Waitlist
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
              <span style={{ color: 'var(--gold)' }}>100</span> Lifetime Access Passes <div className="ticker-dot"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA SECTION: THE CLOSER ─── */}
      <section className="cta-section" style={{ padding: '6rem 5% 10rem', textAlign: 'center' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto' }}>
          <Image 
            src="/brand-seal.png" 
            alt="Real Plant Vendors Official Seal" 
            width={100} 
            height={100} 
            style={{ filter: 'drop-shadow(0 0 30px var(--gold-dim))', margin: '0 auto 2rem' }}
          />
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Ready to secure your legacy?
          </h2>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
            Only 100 Lifetime Access passes available. Don't miss out on the future of botanical provenance.
          </p>
          <Link href="/onboarding?type=vendor&plan=founder" className="btn-primary" style={{ padding: '1rem 3rem', borderRadius: '12px', fontSize: '1.1rem' }}>
            Claim Your Spot Now
          </Link>
        </div>
      </section>

    </div>
  );
}
