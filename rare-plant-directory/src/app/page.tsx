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
      
      {/* ─── HERO SECTION: THE CROWN JEWEL ─── */}
      <section className="hero" style={{ 
        paddingTop: '12rem', 
        paddingBottom: '8rem',
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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2.5rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>The Rolex of Botanical Marketplace Technology</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
            marginBottom: '2rem',
            letterSpacing: '-0.03em',
            fontWeight: 700
          }}>
            Stop Losing High-Ticket <br />
            <em style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              animation: 'shimmer 4s linear infinite'
            }}>Leads to the Void.</em>
          </h1>
          
          <p className="hero-sub" style={{ 
            maxWidth: '700px', 
            fontSize: '1.25rem', 
            marginBottom: '4rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Eliminate vendor invisibility and solve logistical anxiety. The Global Event Map 
            routes serious collectors directly to your booth, turning fleeting event foot-traffic 
            into a permanent, stabilized client pipeline.
          </p>
          
          <div className="hero-actions">
            <Link href="/onboarding" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
              Claim Your Listing
              <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link href="/events" className="btn-ghost" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
              Explore the Map
            </Link>
          </div>

          <div className="hero-seal" style={{ marginTop: '5rem', opacity: 1 }}>
            <Image 
              src="/brand-seal.png" 
              alt="Real Plant Vendors Official Seal" 
              width={140} 
              height={140} 
              style={{ filter: 'drop-shadow(0 0 30px var(--gold-dim))' }}
            />
          </div>
        </div>

        <div className="hero-scroll-hint" style={{ bottom: '3rem' }}>
          <span style={{ fontWeight: 800 }}>Scroll to Discover</span>
          <div className="scroll-line" style={{ height: '50px' }}></div>
        </div>
      </section>

      {/* ─── TICKER BAR: TRUST & AUTHORITY ─── */}
      <div className="ticker-bar" style={{ padding: '1.25rem 0', background: 'var(--charcoal)', borderTop: '1px solid var(--gold-dim)' }}>
        <div className="ticker-track" style={{ animationDuration: '40s' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ticker-item" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              <span style={{ color: 'var(--gold)' }}>Elite</span> Registry <div className="ticker-dot"></div>
              <span style={{ color: 'var(--gold)' }}>Verified</span> Inventory <div className="ticker-dot"></div>
              <span style={{ color: 'var(--gold)' }}>Global</span> Event Map <div className="ticker-dot"></div>
              <span style={{ color: 'var(--gold)' }}>CultivarID</span> Traceability <div className="ticker-dot"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES: THE CORE VALUE ─── */}
      <section className="section section-dark" style={{ padding: '10rem 5%' }}>
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Strategic Dominance</div>
          <h2 className="section-title">Engineered for <em>Market Supremacy</em></h2>
          <div className="section-rule" style={{ width: '100px', height: '2px' }}></div>
        </div>

        <div className="features-grid" style={{ gap: '3rem' }}>
          <div className="feature-card" style={{ padding: '3.5rem 2.5rem', background: 'rgba(11,61,46,0.3)', backdropFilter: 'blur(10px)' }}>
            <div className="feature-icon" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}>
              <MapPin size={28} color="var(--gold)" />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem' }}>Pinpoint Routing</h3>
            <p className="feature-desc" style={{ fontSize: '1rem', opacity: 0.7 }}>
              Buyers find your exact inventory and location before the event doors even open. Direct-to-booth logistics.
            </p>
          </div>
          
          <div className="feature-card" style={{ 
            padding: '3.5rem 2.5rem', 
            background: 'rgba(11,61,46,0.5)', 
            borderColor: 'var(--gold)',
            boxShadow: '0 0 40px var(--gold-dim)'
          }}>
            <div className="feature-icon" style={{ background: 'var(--gold)', border: '1px solid var(--gold)' }}>
              <TrendingUp size={28} color="var(--charcoal)" />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem', color: 'var(--gold)' }}>Authority Suite</h3>
            <p className="feature-desc" style={{ fontSize: '1rem', color: 'var(--cream)' }}>
              Provisional access to elite analytics. See exactly who is looking for your plants in real-time.
            </p>
          </div>
          
          <div className="feature-card" style={{ padding: '3.5rem 2.5rem', background: 'rgba(11,61,46,0.3)', backdropFilter: 'blur(10px)' }}>
            <div className="feature-icon" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}>
              <Zap size={28} color="var(--gold)" />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem' }}>End The Bleed</h3>
            <p className="feature-desc" style={{ fontSize: '1rem', opacity: 0.7 }}>
              Stop losing post-event follow-ups. Centralize your presence where serious collectors live and transact.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DIRECTORY PREVIEW: THE BAITED HOOK ─── */}
      <section className="section" style={{ padding: '10rem 5%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '5rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div className="section-header" style={{ textAlign: 'left', margin: 0 }}>
            <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Elite Registry</div>
            <h2 className="section-title" style={{ maxWidth: '600px' }}>The 100 Most <em>Authoritative</em> Growers</h2>
          </div>
          <Link href="/vendors" className="btn-ghost" style={{ borderRadius: '12px', padding: '1rem 2rem' }}>
            View Full Registry <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>

        <div className="vendors-grid" style={{ gap: '2rem' }}>
          {vendors.map((v, idx) => {
            // Premium background images for verified vendors
            const backgrounds = [
              'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1520412099561-63819215bb01?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1466781783364-391eaf50cf2a?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800'
            ];
            const bgImage = backgrounds[idx % backgrounds.length];

            return (
              <Link 
                href={`/vendors/${v.slug}`} 
                key={v.slug} 
                className={`vendor-card ${v.is_verified ? 'is-verified' : ''}`}
                style={{ 
                  display: 'flex',
                  padding: '2.5rem',
                  textDecoration: 'none'
                }}
              >
                {v.is_verified && (
                  <>
                    <div className="vendor-card-image-bg">
                      <img src={bgImage} alt="" aria-hidden="true" />
                    </div>
                    <div className="vendor-card-overlay"></div>
                  </>
                )}

                <div className="vendor-card-content" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div className="vendor-avatar" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>
                      {v.name.charAt(0)}
                    </div>
                    {v.is_verified ? (
                      <span className="verified-badge"><ShieldCheck size={12} /> Verified</span>
                    ) : (
                      <span className="elite-badge" style={{ background: 'var(--charcoal)', color: 'var(--gold)', opacity: 0.6 }}><Lock size={12} /> Unclaimed</span>
                    )}
                  </div>
                  <h3 className="vendor-name" style={{ fontSize: '1.5rem' }}>{v.name}</h3>
                  <p className="vendor-specialty" style={{ fontSize: '0.8rem', opacity: 0.7 }}>{v.specialty || 'Rare Plant Specialist'}</p>
                  
                  <div style={{ 
                    marginTop: 'auto', 
                    paddingTop: '1.5rem', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    View Profile <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── CTA SECTION: THE CLOSER ─── */}
      <section className="cta-section" style={{ padding: '10rem 5%' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem', marginBottom: '2rem' }}>Exclusive Access</div>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1 }}>The <em>First to Know</em> <br />Always Find the Rarest</h2>
          <p style={{ maxWidth: '650px', margin: '2rem auto 4rem', fontSize: '1.15rem', opacity: 0.8, lineHeight: 1.6 }}>
            Get early access to event listings, exclusive vendor inventory previews, and CultivarID alerts — before general release. Join the verified network.
          </p>
          
          <div className="newsletter-form" style={{ 
            maxWidth: '500px', 
            margin: '0 auto', 
            background: 'var(--bg-card)', 
            padding: '0.5rem', 
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <input 
              type="email" 
              placeholder="Enter your professional email" 
              className="newsletter-input" 
              style={{ padding: '1rem 1.5rem', border: 'none', background: 'transparent', flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '1rem 2rem' }}>
              Join Network
            </button>
          </div>
          
          <p style={{ marginTop: '2.5rem', fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            No spam. Collector-first, always. Established 2026.
          </p>
        </div>
      </section>

    </div>
  );
}
