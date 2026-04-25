'use client';

import { ShieldCheck, Zap, QrCode, Smartphone, BarChart3, ArrowRight, Star, Clock, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function MiamiFestivalOutreachPage() {
  const festivalName = "Rare Plant & Orchid Festival Miami";
  const venueName = "Fuchs Pavilion";
  const expoCenter = "Miami-Dade County Fair & Expo Center";
  const dates = "May 1–3, 2026";
  const daysRemaining = 5;

  return (
    <div style={{ minHeight: '100vh', background: '#020a06', color: 'white', paddingBottom: '8rem', fontFamily: 'var(--font-body)' }}>
      
      {/* URGENCY BANNER */}
      <div style={{ background: '#e74c3c', color: 'white', padding: '0.8rem 5%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 110 }}>
        ⚠️ CRITICAL DEADLINE: {daysRemaining} days until setup. Get your QR tags printed before the show.
      </div>

      {/* Sales Header */}
      <nav style={{ padding: '1.5rem 5%', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2,10,6,0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Rare Plant Vendors <span style={{ color: 'var(--gold)', marginLeft: '1rem', opacity: 0.6 }}>|</span> <span style={{ marginLeft: '1rem' }}>Miami 2026</span></span>
        </div>
        <Link href="/signup" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>Reserve Your Spot</Link>
      </nav>

      {/* Hero Section: The "Miami" Hook */}
      <section style={{ padding: '6rem 5% 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'url(https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2000) center/cover', opacity: 0.15, filter: 'grayscale(100%) brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #020a06, transparent, #020a06)' }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>Location</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{venueName}, Miami</div>
            </div>
            <div style={{ textAlign: 'left', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>Dates</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{dates}</div>
            </div>
            <div style={{ textAlign: 'left', borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>Status</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e74c3c' }}>Final Outreach</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1, marginBottom: '2rem', color: 'white' }}>
            Dominate the Show Floor at <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Fuchs Pavilion.</em>
          </h1>
          
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto 3rem' }}>
            With over 60 global vendors and thousands of attendees, you are competing for every second of attention. Don&apos;t let a single collector leave your booth without a way to find you again.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem', boxShadow: '0 0 40px rgba(212,175,55,0.3)' }}>Activate My QR Suite</Link>
            <a href="#benefits" className="btn-ghost" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem' }}>The ROI Breakdown ↓</a>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section style={{ padding: '6rem 5%', background: 'rgba(231,76,60,0.03)', borderY: '1px solid rgba(231,76,60,0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <AlertTriangle size={40} color="#e74c3c" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>The &quot;Miami Memory Gap&quot; is Killing Your Sales.</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Attendees will scan thousands of plants this weekend. By the time they reach the parking lot at the Expo Center, they have forgotten which nursery had that specific *Monstera Albo* or *Rare Cattleya*. Business cards get lost. RPV Digital Passports are permanent.
          </p>
        </div>
      </section>

      {/* Deep Dive Benefits */}
      <section id="benefits" style={{ padding: '8rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          {/* Benefit 1: Provenance */}
          <div style={{ border: '1px solid rgba(212,175,55,0.1)', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}><QrCode size={40} /></div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Instant Provenance</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Miami collectors are sophisticated. They want to know the lineage. Instead of repeating the story 500 times, let them scan a tag to see the **Mother Plant Origin**, **Propagation Method**, and **Care Instructions** instantly on their phone.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--gold)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Print Branded 4x6 or 2x3 Tags</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Verified Authenticity Seal</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Digital Care Sheets (Reduces Support)</li>
            </ul>
          </div>

          {/* Benefit 2: Lead Capture */}
          <div style={{ border: '1px solid rgba(46,204,113,0.1)', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: '#2ecc71', marginBottom: '1.5rem' }}><Smartphone size={40} /></div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Lead Capture 2.0</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '2rem' }}>
              The &quot;Add to Wishlist&quot; button is your best friend. When a collector scans your plant but isn&apos;t ready to buy, they tap one button to follow you. You get their email and their specific plant interest instantly.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#2ecc71', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Build Your Mailing List on Auto-pilot</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Know exactly who wants which variety</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Post-Festival Retargeting Data</li>
            </ul>
          </div>

          {/* Benefit 3: SEO / Search */}
          <div style={{ border: '1px solid rgba(52,152,219,0.1)', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: '#3498db', marginBottom: '1.5rem' }}><BarChart3 size={40} /></div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>The Miami Directory</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '2rem' }}>
              We are indexing every vendor at the Fuchs Pavilion. Elite vendors get **Priority Map Placement**. When attendees search the RPV map for &quot;Rare Orchids&quot; or &quot;Variegated Monstera,&quot; your booth will glow gold.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#3498db', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Top-of-Search Placement</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Interactive Booth Navigation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><ShieldCheck size={16} /> Verified Miami 2026 Badge</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live QR Demo Section */}
      <section style={{ padding: '6rem 5%', background: 'linear-gradient(to bottom, #020a06, #0a1a0f, #020a06)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem' }}>See the <em style={{ color: 'var(--gold)' }}>Miami</em> Standard.</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Scan this demo with your phone now. This is the **exact experience** your premium collectors will have at the festival. No apps to download. No friction. Just your brand, perfectly showcased.
            </p>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '30px', display: 'inline-block', boxShadow: '0 0 60px rgba(212,175,55,0.2)' }}>
              <QRCodeSVG 
                value="https://rareplantvendors.com/verify/53077961" 
                size={220}
                level="H"
              />
              <div style={{ textAlign: 'center', color: '#000', fontSize: '0.8rem', fontWeight: 900, marginTop: '1.5rem', letterSpacing: '0.2em' }}>SCAN FOR DEMO</div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <Image src="/expo-hero.png" alt="Festival Booth" width={500} height={600} style={{ borderRadius: '30px', objectFit: 'cover', opacity: 0.8, border: '1px solid var(--gold-dim)' }} />
             <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--gold-dim)' }}>
               <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.7rem', marginBottom: '0.5rem' }}>VENDOR SUCCESS CASE</div>
               <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>&quot;Collectors came directly to my booth because the RPV map showed them exactly where the specimens on their wishlist were located.&quot;</p>
             </div>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid #e74c3c', color: '#e74c3c', fontSize: '0.8rem', fontWeight: 800, marginBottom: '2rem' }}>
            URGENT: ONLY 100 SPOTS FOR MIAMI VENDORS
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Become a <em style={{ color: 'var(--gold)' }}>Miami Founding</em> Vendor</h2>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4rem' }}>
            We are closing the print-queue in 72 hours to ensure all tags can be generated for setup day. Claim your spot now and lock in our lowest rate forever.
          </p>

          <div style={{ background: 'linear-gradient(145deg, #0B3D2E, #050505)', padding: '4rem 2rem', borderRadius: '40px', border: '2px solid var(--gold)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', fontSize: '20rem', opacity: 0.05, pointerEvents: 'none' }}>🌿</div>
            
            <div style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>$1.00 <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>$99/mo</span></div>
            <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3rem' }}>Miami 2026 Founder Special</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto 4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck color="var(--gold)" /> Unlimited QR Tags</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck color="var(--gold)" /> Lead Capture Pro</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck color="var(--gold)" /> Priority Map Listing</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck color="var(--gold)" /> Verified Badge</div>
            </div>

            <Link href="/signup" className="btn-primary" style={{ padding: '1.5rem 5rem', fontSize: '1.3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>Claim My $1 Miami Spot</Link>
          </div>
        </div>
      </section>

      {/* Event Details Footer */}
      <footer style={{ padding: '6rem 5% 4rem', borderTop: '1px solid rgba(212,175,55,0.1)', background: '#010503' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Festival Info</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Rare Plant & Orchid Festival 2026<br />
              {venueName} at Miami-Dade Fair & Expo<br />
              Coral Way, Miami, FL 33165
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Vendor Support</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Need help with your QR tags?<br />
              <a href="mailto:clay.mills@rareplantvendors.com" style={{ color: 'white', textDecoration: 'none' }}>clay.mills@rareplantvendors.com</a>
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>The Mission</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Rare Plant Vendors is building the cryptographic standard for botanical provenance. Every specimen tells a story. We help you tell it.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
