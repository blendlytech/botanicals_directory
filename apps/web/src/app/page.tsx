import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, TrendingUp, Star, ArrowRight, Zap, Map } from 'lucide-react';
import PricingCards from "@/components/PricingCards";

export const revalidate = 60;

export default async function Home() {

  return (
    <div className="page-wrapper" style={{ overflow: 'hidden' }}>
      
      {/* ─── DETROIT EXPO EMERGENCY ALERT ─── */}
      <div style={{ 
        background: 'var(--gold)', 
        color: 'black', 
        padding: '0.75rem 5%', 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        fontWeight: 800, 
        letterSpacing: '0.15em',
        position: 'sticky',
        top: '80px',
        zIndex: 900,
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem'
      }}>
        <span>DETROIT EXPO PUSH: 12/40 VENDORS SECURED</span>
        <Link href="/detroit" style={{ 
          background: 'black', 
          color: 'white', 
          padding: '0.3rem 1rem', 
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '0.7rem'
        }}>
          CLAIM YOUR 24H SETUP →
        </Link>
      </div>
      
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
              backgroundClip: 'text',
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

          {/* ─── EXPLAINER VIDEO SHOWCASE ─── */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '40px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <video 
              className="hero-video"
              autoPlay 
              muted 
              loop 
              playsInline
              src="https://dkdrvfemtyuapzuwyrgt.supabase.co/storage/v1/object/public/marketing/rpv-explainer-detroit.mp4"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: '24px',
                display: 'block',
                boxShadow: '0 0 50px rgba(11, 61, 46, 0.5)'
              }}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Gloss Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%)',
              borderRadius: '40px'
            }}></div>
          </div>

          {/* ─── SCARCITY STATUS BAR ─── */}
          <div style={{
            maxWidth: '1000px',
            margin: '2rem auto 0',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(11, 61, 46, 0.6) 100%)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                color: '#FFFFFF', 
                fontSize: '1rem', 
                fontWeight: 900, 
                letterSpacing: '0.15em',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                <span>FOUNDING SEATS CAPACITY</span>
                <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>17 OF 50 LEFT</span>
              </div>
              <div style={{ 
                height: '14px', 
                background: 'rgba(0,0,0,0.3)', 
                borderRadius: '10px', 
                overflow: 'hidden',
                border: '1px solid rgba(212,175,55,0.3)',
                padding: '2px'
              }}>
                <div style={{ 
                  width: '66%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #F2D681 0%, var(--gold) 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px var(--gold)'
                }}></div>
              </div>
            </div>
            <Link href="/onboarding?type=vendor&plan=founder" className="btn-primary" style={{ 
              padding: '1.2rem 2.5rem', 
              fontSize: '0.9rem', 
              borderRadius: '16px',
              whiteSpace: 'nowrap',
              boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
              fontWeight: 800
            }}>
              SECURE SEAT →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS CULTIVAR ID ─── */}
      <section className="section" style={{ padding: '8rem 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-eyebrow">The Technology</span>
            <h2 className="section-title">What is <em>CultivarID?</em></h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
            <p style={{ opacity: 0.8, maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
              CultivarID is our proprietary provenance system utilizing encrypted NFC technology to link physical botanical specimens directly to an immutable digital passport.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left: Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                inset: '-20px', 
                background: 'var(--gold-dim)', 
                filter: 'blur(40px)', 
                borderRadius: '50%',
                zIndex: 0,
                opacity: 0.5
              }}></div>
              <Image 
                src="/monstera_nfc_tag.png" 
                alt="CultivarID NFC Tag on Monstera" 
                width={600} 
                height={800} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '24px', 
                  position: 'relative', 
                  zIndex: 1,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(212,175,55,0.3)'
                }} 
              />
            </div>

            {/* Right: The Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Step 1 */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(11,61,46,0.6) 0%, rgba(4,8,6,0.8) 100%)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '24px',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}>
                <div style={{ 
                  width: '56px', height: '56px', flexShrink: 0,
                  background: 'var(--gold-dim)', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--gold)' 
                }}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. The Physical Tag</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Each verified plant receives a weather-resistant, serialized NFC (Near Field Communication) tag securely attached to the pot or mounting.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(11,61,46,0.4) 100%)',
                border: '1px solid var(--gold)',
                borderRadius: '24px',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                boxShadow: '0 10px 30px rgba(212,175,55,0.1)'
              }}>
                <div style={{ 
                  width: '56px', height: '56px', flexShrink: 0,
                  background: 'var(--gold)', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--charcoal)' 
                }}>
                  <Zap size={28} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>2. Tap to Authenticate</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Anyone with a smartphone can simply tap the physical tag. No app required. This instantly decrypts and loads the plant's official digital record.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(11,61,46,0.6) 0%, rgba(4,8,6,0.8) 100%)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '24px',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}>
                <div style={{ 
                  width: '56px', height: '56px', flexShrink: 0,
                  background: 'var(--gold-dim)', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--gold)' 
                }}>
                  <Star size={28} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>3. Verified Provenance</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    View the complete lineage, grower details, genetic confirmation, and historical transactions. Transfer ownership seamlessly when resold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM VALUE PROPOSITION ─── */}
      <section className="section" style={{ padding: '6rem 5%', background: 'var(--bg-surface)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-eyebrow">The RPV Ecosystem</span>
            <h2 className="section-title">Engineering a <em>Frictionless</em> Market</h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
            <p style={{ opacity: 0.8, maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
              We've systematically neutralized the three primary friction points choking the high-ticket botanical niche. By aligning incentives, we unlock unprecedented value for both sides of the transaction.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3rem',
            position: 'relative'
          }}>
            {/* Vendor Value */}
            <div style={{
              background: 'linear-gradient(145deg, #0B3D2E 0%, #040806 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '24px',
              padding: '3rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--gold-dim)', padding: '1rem', borderRadius: '16px', color: 'var(--gold)' }}>
                  <TrendingUp size={28} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', margin: 0, color: 'white' }}>For Vendors</h3>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Zero Commission Leakage</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Keep 100% of your margins. We eliminate the punitive 8%+ transaction fees extracted by predatory live-auction platforms like Whatnot and Palmstreet.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>De-Risked Logistics</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  No more transporting fragile biological assets blindly. Secure buyers online before you pack the van.
                </p>
              </div>
            </div>

            {/* Localized Matchmaking Centerpiece */}
            <div style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #D4AF37 100%)',
              borderRadius: '24px',
              padding: '3rem',
              color: 'var(--charcoal)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(212,175,55,0.2)',
              transform: 'scale(1.05)',
              zIndex: 2
            }}>
              <Map size={48} style={{ marginBottom: '1.5rem', opacity: 0.9 }} />
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: '0 0 1rem', fontWeight: 800 }}>
                Localized Matchmaking
              </h3>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.6, opacity: 0.9 }}>
                The ultimate strategic advantage. <br/><br/>
                We connect digital buyers to physical expo pickups, achieving a <strong>100% plant survival rate</strong> by bypassing overnight shipping trauma completely.
              </p>
            </div>

            {/* Collector Value */}
            <div style={{
              background: 'linear-gradient(145deg, #0B3D2E 0%, #040806 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '24px',
              padding: '3rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--gold-dim)', padding: '1rem', borderRadius: '16px', color: 'var(--gold)' }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', margin: 0, color: 'white' }}>For Collectors</h3>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Verified Provenance</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  The CultivarID™ system resolves genetic ambiguity. Know exactly what you're buying, shutting down the fraud associated with expensive cuttings.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Stress-Free Acquisition</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  The pre-sale reservation mechanism entirely eliminates the frantic physical rush of the expo floor. Secure your dream plant safely.
                </p>
              </div>
            </div>
          </div>
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
            Secure your market position with our flexible tiers or join the elite founding circle.
          </p>
        </div>

        {/* ── ELITE FOUNDER PROMO ── */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto 5rem', 
          background: 'linear-gradient(135deg, #0B3D2E 0%, #040806 100%)',
          border: '4px solid var(--gold)',
          borderRadius: '40px',
          padding: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4rem',
          boxShadow: '0 30px 100px rgba(212,175,55,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ flex: '1 1 500px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="scarcity-pill" style={{ background: 'var(--gold)', color: '#0B3D2E' }}>Elite Founder Pass</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.1em' }}>17 SEATS REMAINING</span>
             </div>
             <h3 style={{ fontSize: '3rem', color: 'white', marginBottom: '1.5rem' }}>Lifetime Authority <br /> <em style={{ color: 'var(--gold)' }}>For a One-Time Fee.</em></h3>
             <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
               Skip the subscriptions. Secure unlimited plant showcases, deeply discounted CultivarID™ hardware tags at **$10/tag**, plus exclusive Founder-only perks for life. No renewals. No future fees.
             </p>
             <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                   <Star color="var(--gold)" /> Unlimited Plant Showcases
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                   <ShieldCheck color="var(--gold)" /> Permanent Founder Badge
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                   <Zap color="var(--gold)" /> Zero Platform Fees
                </div>
             </div>

             {/* 2026 Roadmap Lock-in */}
             <div style={{ 
               background: 'rgba(212,175,55,0.1)', 
               border: '1px dashed rgba(212,175,55,0.4)', 
               borderRadius: '16px', 
               padding: '1.5rem',
               display: 'flex',
               gap: '1rem',
               alignItems: 'flex-start'
             }}>
               <MapPin color="var(--gold)" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
               <div>
                 <div style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '0.05em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                   Included: 2026 Product Roadmap
                 </div>
                 <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                   Founders automatically unlock our upcoming <strong>Geo-Location Routing</strong> & Local Pickup Matchmaking algorithms. Never pay for future enterprise upgrades.
                 </div>
               </div>
             </div>
          </div>
          <div style={{ flex: '0 0 auto', textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.2)' }}>
             <div style={{ textDecoration: 'line-through', opacity: 0.4, color: 'white', fontSize: '1.2rem', marginBottom: '0.5rem' }}>$1,248/yr</div>
             <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>$497</div>
             <div style={{ fontSize: '0.8rem', color: 'white', opacity: 0.6, marginTop: '0.5rem', letterSpacing: '0.1em' }}>PAID ONCE, OWNED FOREVER</div>
             <Link href="/onboarding?type=vendor&plan=elite" className="btn-primary" style={{ marginTop: '2.5rem', width: '100%', padding: '1.25rem', borderRadius: '16px', display: 'block' }}>
                Claim Lifetime Access
             </Link>
          </div>
        </div>

        <PricingCards />
      </section>

      {/* ─── TICKER BAR ─── */}
      <div className="ticker-bar" style={{ padding: '1.25rem 0', background: 'var(--charcoal)', borderTop: '1px solid var(--gold-dim)' }}>
        <div className="ticker-track" style={{ animationDuration: '40s' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="ticker-item" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              <span style={{ color: 'var(--gold)' }}>CultivarID</span> Release <div className="ticker-dot"></div>
              <span style={{ color: 'var(--gold)' }}>50</span> Lifetime Access Passes <div className="ticker-dot"></div>
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
              alt="Rare Plant Vendors Official Seal" 
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
            Only <span style={{ color: 'var(--gold)', fontWeight: 700 }}>17</span> Founding Seats remain. <br />
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
              fontSize: '1rem',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.4)'
            }}>
              View Full Benefits
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COLLECTOR WAITLIST CTA ─── */}
      <section style={{
        padding: '5rem 5%',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'linear-gradient(145deg, rgba(212,175,55,0.06), rgba(0,0,0,0))',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '32px',
          padding: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>
              🔥 Collectors · Limited Founding Offer
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', lineHeight: 1.15, marginBottom: '1rem' }}>
              Get <em>50% Off</em> Your First Year of Premium Access
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Join the waitlist now and lock in <strong style={{ color: 'var(--gold)' }}>$24.50/year</strong> for verified pre-sale reservations, CultivarID™ scanning, and priority alerts. No credit card required.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: 'var(--gold)', lineHeight: 1 }}>50%</div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem', fontWeight: 700 }}>Off First Year</div>
            <Link href="/collector/waitlist" className="btn-primary" style={{
              padding: '1rem 2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '0.95rem',
            }}>
              Join the Waitlist <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
