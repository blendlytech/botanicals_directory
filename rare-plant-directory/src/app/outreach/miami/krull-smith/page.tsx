'use client';

import { ShieldCheck, Zap, QrCode, Smartphone, BarChart3, ArrowRight, Star, Clock, Trophy, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function KrullSmithMiamiOutreachPage() {
  const festivalName = "Rare Plant & Orchid Festival Miami";
  const venueName = "Fuchs Pavilion";
  const targetVendor = "Krull-Smith";
  const daysRemaining = 5;

  return (
    <div style={{ minHeight: '100vh', background: '#020a06', color: 'white', paddingBottom: '8rem', fontFamily: 'var(--font-body)' }}>
      
      {/* VIP BANNER */}
      <div style={{ background: '#c9a84c', color: 'black', padding: '0.8rem 5%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 110 }}>
        🏆 EXCLUSIVE PREVIEW FOR {targetVendor.toUpperCase()} · AOS AWARD-GRADE TECHNOLOGY
      </div>

      {/* Sales Header */}
      <nav style={{ padding: '1.5rem 5%', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2,10,6,0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Rare Plant Vendors <span style={{ color: 'var(--gold)', marginLeft: '1rem', opacity: 0.6 }}>|</span> <span style={{ marginLeft: '1rem' }}>{targetVendor} Private Demo</span></span>
        </div>
        <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>Claim Krull-Smith Booth</Link>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '6rem 5% 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'url(https://images.unsplash.com/photo-1521334885634-95b21306bb9d?q=80&w=2000) center/cover', opacity: 0.1, filter: 'grayscale(100%) brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #020a06, transparent, #020a06)' }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem', border: '1px solid var(--gold-dim)', padding: '0.5rem 1.5rem', borderRadius: '30px' }}>
            <Award size={14} fill="var(--gold)" /> Award-Winning Technology for {targetVendor}
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1, marginBottom: '2rem', color: 'white' }}>
            Showcase Your <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Award Winners</em> with Precision.
          </h1>
          
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto 3rem' }}>
            Frank, your AOS-awarded specimens are the gold standard. RPV provides the digital pedestal they deserve—capturing the high-intent collectors who come to Miami specifically for the Krull-Smith name.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem', boxShadow: '0 0 40px rgba(212,175,55,0.3)' }}>Activate Krull-Smith QR Suite</Link>
            <a href="#krull-demo" className="btn-ghost" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem' }}>See the Digital Pedestal ↓</a>
          </div>
        </div>
      </section>

      {/* Why for Krull-Smith */}
      <section style={{ padding: '6rem 5%', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Digital <em style={{ color: 'var(--gold)' }}>Pedestals.</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Your nursery has received more AOS awards than almost any other in history. When a collector scans a Krull-Smith plant at the Fuchs Pavilion, they should see that pedigree instantly. Our QR suite allows you to embed award history and genetic lineage directly into every scan.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--gold)' }}><Trophy /></div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Award History Integration</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Display specific AOS awards (FCC, AM, CCM) directly on the specimen&apos;s digital passport.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--gold)' }}><BarChart3 /></div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>High-Ticket Lead Tracking</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Identify the collectors looking at your most exclusive specimens and follow up with white-glove service.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM KRULL MOCKUP */}
      <section id="krull-demo" style={{ padding: '6rem 5%', background: 'linear-gradient(to bottom, #020a06, #0a1a0f, #020a06)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem' }}>The <em style={{ color: 'var(--gold)' }}>Krull-Smith</em> Scan.</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Scan this demo with your phone camera. This is how we showcase your award-grade specimens to the festival&apos;s most serious collectors.
            </p>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '30px', display: 'inline-block', boxShadow: '0 0 60px rgba(212,175,55,0.2)' }}>
              <QRCodeSVG 
                value="https://rareplantvendors.com/verify/krull-demo" 
                size={220}
                level="H"
              />
              <div style={{ textAlign: 'center', color: '#000', fontSize: '0.8rem', fontWeight: 900, marginTop: '1.5rem', letterSpacing: '0.2em' }}>SCAN FOR KRULL DEMO</div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             {/* PHONE MOCKUP */}
             <div style={{ background: '#111', border: '8px solid #222', borderRadius: '40px', width: '300px', height: '600px', margin: '0 auto', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=600) center/cover' }}>
                <div style={{ height: '100%', background: 'linear-gradient(to top, #111, transparent)' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.5rem', background: 'var(--gold)', color: '#000', padding: '2px 5px', borderRadius: '2px', fontWeight: 800 }}>FCC/AOS AWARDED</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Cattleya walkeriana</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--gold)', marginBottom: '1rem' }}>Krull-Smith · Apopka, FL</p>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Lineage</label>
                  <p style={{ fontSize: '0.7rem', margin: '2px 0' }}>&apos;Kenny&apos; x self · Award #2024-5541</p>
                </div>

                <div style={{ padding: '0.8rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    Large, heavy substance flowers with crystalline texture. A flagship Krull-Smith hybrid...
                  </p>
                </div>

                <button style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', marginTop: '2rem' }}>
                  Inquire for Availability
                </button>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '10%', right: '-20px', background: 'var(--gold)', color: 'black', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 900, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
              AWARD GRADE
            </div>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Elevate Your <em style={{ color: 'var(--gold)' }}>Miami Presence</em></h2>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4rem' }}>
            We want {targetVendor} to be the anchor of the Miami Digital Directory. Claim your AOS-tier dashboard in the next 24 hours to have your premium tags ready for setup day.
          </p>

          <div style={{ background: 'linear-gradient(145deg, #0B3D2E, #050505)', padding: '4rem 2rem', borderRadius: '40px', border: '2px solid var(--gold)', position: 'relative', overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Krull-Smith VIP Offer</div>
            <div style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>$1.00</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>Exclusive first-month trial for Miami Festival exhibitors.</p>
            
            <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '1.5rem 5rem', fontSize: '1.3rem', width: '100%' }}>Claim Krull-Smith Spot</Link>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer style={{ padding: '6rem 5% 4rem', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Ready to showcase your AOS winners?</p>
        <a href="mailto:clay.mills@rareplantvendors.com" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none', fontSize: '1.2rem' }}>clay.mills@rareplantvendors.com</a>
      </footer>
    </div>
  );
}
