import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ShieldCheck, MapPin, Star, ArrowRight, Search, BadgeCheck, Bell, Bookmark, LockKeyhole } from 'lucide-react';
import HeroSearch from "@/components/HeroSearch";

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();

  // Featured vendors for the directory — verified/claimed growers surface first.
  const { data: vendors } = await supabase
    .from('vendors')
    .select('name, slug, specialty, location_city, location_state, location_country, account_tier, is_verified, user_id, logo_url, hero_url')
    .order('account_tier', { ascending: false })
    .order('name', { ascending: true });

  const featured = [...(vendors || [])]
    .sort((a, b) => {
      const aRank = (a.is_verified ? 2 : 0) + (a.user_id ? 1 : 0);
      const bRank = (b.is_verified ? 2 : 0) + (b.user_id ? 1 : 0);
      return bRank - aRank;
    })
    .slice(0, 6);

  const fallbackBackgrounds = [
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1520412099561-63819215bb01?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1466781783364-391eaf50cf2a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="page-wrapper" style={{ overflow: 'hidden' }}>

      {/* ─── HERO: DIRECTORY-FIRST ─── */}
      <section className="hero" style={{
        paddingTop: '10rem',
        paddingBottom: '6rem',
        position: 'relative',
        background: 'linear-gradient(90deg, #040806 0%, #0B3D2E 50%, #040806 100%)',
        borderBottom: '1px solid var(--gold)',
      }}>
        <div className="hero-grid-overlay" style={{ opacity: 0.15 }}></div>

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
          zIndex: 0,
        }}></div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', textAlign: 'center', padding: '0 5%' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2rem' }}>
            <div className="hero-eyebrow-dot"></div>
            <span>The Rare Plant Vendor Directory</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#FFFFFF',
          }}>
            Find <em style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--gold) 0%, #F2D681 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>Verified</em> Rare Plant Vendors
          </h1>

          <p className="hero-sub" style={{
            maxWidth: '680px',
            margin: '0 auto 3rem',
            fontSize: '1.2rem',
            color: '#F5F0E8',
            lineHeight: 1.6,
          }}>
            Search the most trusted directory of rare plant specialists. Filter by location,
            specialty, and shipping — and connect directly with growers, no middleman.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* ─── FEATURED VENDORS ─── */}
      <section className="section" style={{ padding: '6rem 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-eyebrow">Featured Growers</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Recently Added <em>Vendors</em></h2>
            </div>
            <Link href="/vendors" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
              Browse All Vendors <ArrowRight size={18} />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="vendors-grid">
              {featured.map((v, idx) => {
                const location = [v.location_city, v.location_state || v.location_country].filter(Boolean).join(', ');
                const isClaimed = !!v.user_id;
                const bgImage = v.hero_url || fallbackBackgrounds[idx % fallbackBackgrounds.length];

                return (
                  <div key={v.slug} className={`vendor-card ${v.is_verified ? 'is-verified' : ''}`}>
                    {v.is_verified && (
                      <>
                        <div className="vendor-card-image-bg">
                          <img src={bgImage} alt="" aria-hidden="true" />
                        </div>
                        <div className="vendor-card-overlay"></div>
                      </>
                    )}

                    <div className="vendor-card-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div className="vendor-avatar" style={(v.logo_url || isClaimed) ? { width: '88px', height: '88px', padding: 0, overflow: 'hidden' } : { width: '88px', height: '88px' }}>
                          {v.logo_url ? (
                            <img src={v.logo_url} alt={`${v.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : isClaimed ? (
                            <img src={`https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(v.slug || v.name)}`} alt={`${v.name} generated logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            v.name.charAt(0)
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                          {v.is_verified ? (
                            <span className="verified-badge"><ShieldCheck size={12} /> Verified</span>
                          ) : !isClaimed ? (
                            <span className="elite-badge" style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', boxShadow: 'none', fontSize: '0.6rem' }}>
                              <LockKeyhole size={10} /> Unclaimed
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <Link href={`/vendors/${v.slug}`} style={{ textDecoration: 'none' }}>
                        <h3 className="vendor-name" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{v.name}</h3>
                      </Link>
                      <p className="vendor-specialty">{Array.isArray(v.specialty) ? v.specialty.join(', ') : (v.specialty || 'Rare Plant Specialist')}</p>
                      {location && (
                        <p className="vendor-location" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <MapPin size={14} /> {location}
                        </p>
                      )}

                      <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                        {isClaimed ? (
                          <Link href={`/vendors/${v.slug}`} className="btn-ghost" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
                            View Profile
                          </Link>
                        ) : (
                          <Link href={`/claim/${v.slug}`} className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
                            Claim Listing
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="section-header" style={{ padding: '4rem 0', textAlign: 'center' }}>
              <p className="section-desc">The directory is growing. Be one of the first listed.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CLAIM YOUR FREE LISTING (VENDOR FUNNEL) ─── */}
      <section className="section" style={{ padding: '4rem 5% 6rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #0B3D2E 0%, #040806 100%)',
          border: '1px solid var(--gold)',
          borderRadius: '32px',
          padding: '4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: '-20px', top: '-40%',
            background: 'radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)',
            filter: 'blur(60px)', opacity: 0.5, pointerEvents: 'none',
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-eyebrow">For Vendors</span>
            <h2 className="section-title" style={{ margin: '1rem auto', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Claim Your <em>Free Listing</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '620px', margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Collectors are searching for growers like you right now. Claim your directory profile to
              control how your business appears, capture leads, and get found — at no cost.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/vendors" className="btn-primary" style={{ padding: '1.1rem 2.5rem', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <Search size={18} /> Find Your Listing
              </Link>
              <Link href="/onboarding?type=vendor" className="btn-ghost" style={{ padding: '1.1rem 2.5rem', borderRadius: '14px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}>
                Add a New Listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR COLLECTORS: VALUE OF THE DIRECTORY ─── */}
      <section className="section" style={{ padding: '6rem 5%', background: 'var(--bg-surface)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-eyebrow">For Collectors</span>
            <h2 className="section-title">Shop Rare Plants with <em>Confidence</em></h2>
            <div className="section-rule" style={{ margin: '1.5rem auto' }} />
            <p style={{ opacity: 0.8, maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Skip the scams and the guesswork. Find verified specialists, compare real reviews,
              and acquire your next rare plant from a source you can trust.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <BadgeCheck size={28} />, title: 'Verified Vendors', desc: 'Every featured grower is vetted, so you know exactly who you are buying from.' },
              { icon: <Star size={28} />, title: 'Real Reviews', desc: 'Browse aggregated 4-star-and-up reviews pulled from trusted platforms.' },
              { icon: <Bookmark size={28} />, title: 'Save Your Shortlist', desc: 'Bookmark favorite vendors and the rare plants you are hunting for.' },
              { icon: <Bell size={28} />, title: 'Priority Alerts', desc: 'Get notified when your saved vendors drop new inventory or restock.' },
            ].map((f) => (
              <div key={f.title} style={{
                background: 'linear-gradient(145deg, #0B3D2E 0%, #040806 100%)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
              }}>
                <div style={{ background: 'var(--gold-dim)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.5rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTOR WAITLIST CTA ─── */}
      <section style={{
        padding: '5rem 5%',
        background: 'radial-gradient(circle at center, #0B3D2E 0%, #040806 100%)',
        borderTop: '1px solid var(--glass-border)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'linear-gradient(145deg, rgba(212,175,55,0.08), rgba(0,0,0,0))',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '32px',
          padding: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>
              🔥 Collectors · Founding Member Offer
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', lineHeight: 1.15, marginBottom: '1rem', color: 'white' }}>
              Get <em style={{ color: 'var(--gold)' }}>Early Access</em> to Premium Collector Tools
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Join the waitlist to unlock saved vendor shortlists, verified review insights, and
              priority restock alerts. No credit card required.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
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
