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
    <div className="page-wrapper">
      
      {/* ─── HERO SECTION ─── */}
      <section className="hero">
        <div className="hero-grid-overlay"></div>
        
        {/* Animated Leaves (Aesthetic) */}
        <div className="hero-leaf-1">🌿</div>
        <div className="hero-leaf-2">🍃</div>
        <div className="hero-leaf-3">🌱</div>

        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          <span>The Authority Suite for Elite Botanical Growers</span>
        </div>
        
        <h1>
          Stop Losing High-Ticket <br />
          <em>Leads to the Void.</em>
        </h1>
        
        <p className="hero-sub">
          Eliminate vendor invisibility and solve logistical anxiety. The Global Event Map 
          routes serious collectors directly to your booth, turning fleeting event foot-traffic 
          into a permanent, stabilized client pipeline.
        </p>
        
        <div className="hero-actions">
          <Link href="/onboarding" className="btn-primary" id="hero-claim-btn">
            Claim Your Listing
          </Link>
          <Link href="/events" className="btn-ghost" id="hero-explore-btn">
            Explore the Map
          </Link>
        </div>

        <div className="hero-seal">
          <Image src="/brand-seal.png" alt="RPV Official Seal" width={120} height={120} />
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to Discover</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ─── TICKER BAR ─── */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ticker-item">
              <span>Elite</span> Registry <div className="ticker-dot"></div>
              <span>Verified</span> Inventory <div className="ticker-dot"></div>
              <span>Global</span> Event Map <div className="ticker-dot"></div>
              <span>CultivarID</span> Traceability <div className="ticker-dot"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES SECTION ─── */}
      <section className="section section-dark">
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Core Capabilities</div>
          <h2 className="section-title">Engineered for <em>Market Dominance</em></h2>
          <div className="section-rule"></div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><MapPin size={24} color="var(--gold)" /></div>
            <h3 className="feature-title">Pinpoint Routing</h3>
            <p className="feature-desc">Buyers find your exact inventory and location before the event doors even open.</p>
          </div>
          
          <div className="feature-card" style={{ borderColor: 'var(--gold)' }}>
            <div className="feature-icon"><TrendingUp size={24} color="var(--gold)" /></div>
            <h3 className="feature-title">Authority Suite</h3>
            <p className="feature-desc">Provisional access to elite analytics. See exactly who is looking for your plants in real-time.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><Zap size={24} color="var(--gold)" /></div>
            <h3 className="feature-title">End The Bleed</h3>
            <p className="feature-desc">Stop losing post-event follow-ups. Centralize your presence where serious collectors live.</p>
          </div>
        </div>
      </section>

      {/* ─── DIRECTORY PREVIEW ─── */}
      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Elite Registry</div>
          <h2 className="section-title">The 100 Most <em>Authoritative</em> Growers</h2>
          <p className="section-desc">Connect with the world's most exclusive botanical nurseries, verified for quality and provenance.</p>
          <div className="section-rule"></div>
        </div>

        <div className="vendors-grid">
          {vendors.map((v) => (
            <Link href={`/vendors/${v.slug}`} key={v.slug} className="vendor-card" style={{ display: 'block' }}>
              <div className="vendor-avatar">
                {v.name.charAt(0)}
              </div>
              <h3 className="vendor-name">{v.name}</h3>
              <p className="vendor-specialty">{v.specialty || 'Rare Plant Specialist'}</p>
              
              <div className="vendor-badges" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                {v.is_verified ? (
                  <span className="verified-badge"><ShieldCheck size={12} /> Verified</span>
                ) : (
                  <span className="elite-badge" style={{ opacity: 0.5 }}><Lock size={12} /> Unclaimed</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/vendors" className="btn-ghost">View Full Registry</Link>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="cta-section">
        <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Collector Insiders</div>
        <h2>The <em>First to Know</em> Always Find the Rarest</h2>
        <p>
          Get early access to event listings, exclusive vendor inventory previews, and CultivarID alerts — before general release.
        </p>
        
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your professional email" className="newsletter-input" />
          <button type="submit" className="btn-primary">Join Network</button>
        </div>
        
        <p style={{ marginTop: '1.5rem', fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          No spam. Collector-first, always.
        </p>
      </section>

    </div>
  );
}
