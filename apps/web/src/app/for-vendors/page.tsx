import Image from "next/image";
import { PricingToggle } from "@rpv/ui";
import { ShieldCheck, TrendingUp, MapPin, Zap, Star, Globe, Lock, ArrowRight, ChevronRight, BarChart3, Users, Smartphone, Leaf, Tag, Award } from 'lucide-react';
import Link from "next/link";

const authorityBenefits = [
  {
    icon: <Smartphone size={32} />,
    title: "Tap-to-Verify NFC Tags",
    desc: "Every tagged plant gets a tamper-evident Nylon NFC chip. Collectors simply tap their phone to the tag and instantly see the full digital birth certificate — lineage, care history, and your nursery's verified profile.",
  },
  {
    icon: <Users size={32} />,
    title: "Direct Collector Inquiries",
    desc: "When a collector taps the NFC tag, they can instantly email you questions or purchase inquiries with a single tap — right from the showroom floor, no apps required.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Clear Scan Analytics",
    desc: "See exactly how many times your showcase plants are viewed during an event, so you know which specimens draw the most collector attention.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Instant Digital Authority",
    desc: "Every tagged plant gets a beautifully formatted digital birth certificate detailing its provenance history, building instant trust and commanding premium prices from serious collectors.",
  },
];

const testimonials = [
  {
    quote: "The digital birth certificates changed everything. Collectors started coming to MY booth asking about MY plants before the expo doors even opened.",
    name: "Marcus Chen",
    title: "Verdant Roots Co. · Miami, FL",
  },
  {
    quote: "I tagged 5 of my rarest specimens with CultivarID. All 5 sold within the first hour. The provenance certificates gave collectors the confidence to pull the trigger.",
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
        <span>🔥 Elite Founder Lifetime Pass: <strong style={{ color: 'white' }}>$497</strong> (First 5 NFC Tags FREE)</span>
        <div style={{ width: '1px', height: '15px', background: 'rgba(212,175,55,0.3)' }}></div>
        <span>17 FOUNDING SEATS LEFT</span>
        <div style={{ width: '1px', height: '15px', background: 'rgba(212,175,55,0.3)' }}></div>
        <a href="#pricing" style={{ textDecoration: 'underline', color: 'white' }}>Claim My Spot</a>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingTop: '14rem' }}>
        <div className="hero-grid-overlay"></div>
        
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          <span>Founding Member Enrollment Open — 17 Founding Seats Left</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          Give Your Plants a <br />
          <em>Digital Birth Certificate.</em>
        </h1>
        
        <p className="hero-sub" style={{ maxWidth: '750px' }}>
          CultivarID™ is a tamper-evident NFC tag that attaches to the stem of your rare plant. When a collector taps it with their phone, they instantly see the plant&apos;s full provenance, lineage, and your verified nursery profile. No app required.
        </p>

        <div className="hero-actions">
          <a href="#pricing" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
            See Vendor Plans
          </a>
          <Link href="/cultivar-id/demo" className="btn-ghost" style={{ padding: '1rem 2.5rem' }}>
            View Live Demo
          </Link>
        </div>

        <div className="hero-seal" style={{ marginTop: '4rem' }}>
            <Image src="/brand-seal.png" alt="RPV Official Seal" width={100} height={100} />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">Three Steps. <br /> <em>Zero Hassle.</em></h2>
          <p className="section-desc">
            You never touch a tag. We handle everything — you just sell plants.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--gold)', fontWeight: 800 }}>01</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>You Submit Plant Info</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Tell us about the plant — species, propagation method, mother plant lineage, and snap a photo with the tag attached to the stem. That&apos;s it.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--gold)', fontWeight: 800 }}>02</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>We Provision & Ship</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              We program the NFC tag with your plant&apos;s unique digital birth certificate URL and ship the tamper-evident Nylon tag directly to you. No middleman.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--gold)', fontWeight: 800 }}>03</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Collectors Tap & Trust</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              The collector taps their phone to the tag on the stem. Instantly, they see the full provenance profile — lineage, care history, and your verified nursery info. No app needed.
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
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem' }}>Fully Managed. Zero Inventory.</h3>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
            You never handle, store, or program the tags yourself. Submit your plant info, and we handle provisioning and direct shipping. You focus on growing — we handle the tech.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>48 Hours</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Tag Provisioning</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)', height: '40px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>$5/tag</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Elite Founder Price</div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)', height: '40px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>Direct Ship</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Straight To You</div>
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
            Every tool in CultivarID is engineered to make collectors trust you instantly and pay premium prices confidently.
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

      {/* ─── NFC TAG PRICING BREAKDOWN ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Tag Pricing</div>
          <h2 className="section-title">Simple, Transparent <em>Hardware</em> Costs</h2>
          <p className="section-desc">
            Tags are ordered on-demand. No minimum orders. No inventory to manage.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem', maxWidth: '900px', margin: '3rem auto 0' }}>
          <div style={{ padding: '2.5rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', textAlign: 'center' }}>
            <Tag size={28} color="var(--gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Sprout Vendors</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)' }}>$20<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>/tag</span></div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>Tamper-evident Nylon NFC</p>
          </div>
          <div style={{ padding: '2.5rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', textAlign: 'center' }}>
            <Tag size={28} color="var(--gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Bloom Vendors</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)' }}>$15<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>/tag</span></div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>Tamper-evident Nylon NFC</p>
          </div>
          <div style={{ padding: '2.5rem', background: 'linear-gradient(145deg, rgba(212,175,55,0.1), rgba(0,0,0,0))', border: '2px solid var(--gold)', borderRadius: '24px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--charcoal)', padding: '0.2rem 0.75rem', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>First 5 Free</div>
            <Award size={28} color="var(--gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Elite Founders</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)' }}>$5<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>/tag</span></div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>First 5 included FREE with your $497 pass</p>
          </div>
        </div>
      </section>

      {/* ─── HARD PITCH: THE ELITE FOUNDERS CIRCLE ─── */}
      <section className="section" id="elite-pitch" style={{ background: 'var(--charcoal)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid-overlay" style={{ opacity: 0.1 }}></div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>Limited Legacy Enrollment</div>
            <h2 className="section-title" style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Own It <em>Forever.</em>
            </h2>
            <p className="section-desc" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '1.5rem auto' }}>
              One payment. Lifetime access to unlimited plant showcases, the lowest tag pricing, and permanent Founder status in the Rare Plant Vendors network.
            </p>
          </div>

          <div style={{ 
            background: 'linear-gradient(145deg, #0B3D2E, #050d09)', 
            borderRadius: '40px', 
            padding: '4rem', 
            border: '1px solid var(--gold)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '2rem' }}>
                Elite Founder <br /> Lifetime Pass
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <Star size={24} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white' }}>Unlimited Plant Showcases</strong>
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Create digital birth certificates for every plant you sell, forever.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <Tag size={24} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white' }}>5 FREE NFC Tags + $5/tag After</strong>
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Your first 5 CultivarID hardware tags are on us. Then just $5 each — the lowest rate available.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <Globe size={24} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white' }}>Permanent Founder Badge</strong>
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>A verified badge on your profile showing you were here from Day 1.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <Zap size={24} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white' }}>Concierge Onboarding</strong>
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>We set up your first 10 plant profiles and optimize your vendor page for you.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div style={{ fontSize: '5rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>
                $497
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.2em', marginTop: '1rem', textTransform: 'uppercase' }}>
                One-Time · Owned Forever
              </div>
              <Link href="/onboarding?plan=elite" className="btn-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.25rem', fontSize: '1rem' }}>
                Claim Lifetime Seat
              </Link>
              <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', opacity: 0.5 }}>
                Secure payment via PayPal · 17 Seats Remaining
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ALL PLANS ─── */}
      <section className="section" id="pricing" style={{ background: 'var(--bg)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Subscription Options</div>
          <h2 className="section-title">Flexible Plans for <em>Every</em> Scale</h2>
          <p className="section-desc">
            Not ready for a lifetime seat? Choose a monthly or annual plan that fits your current inventory needs.
          </p>
          <div className="section-rule"></div>
        </div>
        
        <PricingToggle />
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
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Your Plants Deserve <br /> <em>A Birth Certificate.</em></h2>
        <p style={{ maxWidth: '600px', margin: '1.5rem auto 3rem' }}>
          Stop losing premium sales to trust gaps. Give every specimen a verifiable, tap-to-read provenance profile that commands the price it deserves.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/onboarding" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
            Get Started <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </Link>
          <Link href="/cultivar-id/demo" className="btn-ghost" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
            View Live Demo
          </Link>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Verified Growers Network · Established 2026
        </p>
      </section>

    </main>
  );
}
