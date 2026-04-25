'use client';

import { ShieldCheck, Zap, QrCode, Smartphone, BarChart3, ArrowRight, Star, Clock, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function RarePlantFairyMiamiOutreachPage() {
  const festivalName = "Rare Plant & Orchid Festival Miami";
  const venueName = "Fuchs Pavilion";
  const targetVendor = "Rare Plant Fairy";
  const daysRemaining = 5;

  return (
    <div style={{ minHeight: '100vh', background: '#020a06', color: 'white', paddingBottom: '8rem', fontFamily: 'var(--font-body)' }}>
      
      {/* VIP BANNER */}
      <div style={{ background: '#2ecc71', color: 'black', padding: '0.8rem 5%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 110 }}>
        ✨ EXCLUSIVE PREVIEW FOR {targetVendor.toUpperCase()} · HIGH-TICKET AROID SPECIALISTS
      </div>

      {/* Sales Header */}
      <nav style={{ padding: '1.5rem 5%', borderBottom: '1px solid rgba(46,204,113,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2,10,6,0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.5rem', color: '#2ecc71' }}>✦</span>
          <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Rare Plant Vendors <span style={{ color: '#2ecc71', marginLeft: '1rem', opacity: 0.6 }}>|</span> <span style={{ marginLeft: '1rem' }}>{targetVendor} Private Demo</span></span>
        </div>
        <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', background: '#2ecc71', color: 'black' }}>Claim Fairy Booth</Link>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '6rem 5% 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'url(https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=2000) center/cover', opacity: 0.1, filter: 'grayscale(100%) brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #020a06, transparent, #020a06)' }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#2ecc71', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem', border: '1px solid rgba(46,204,113,0.3)', padding: '0.5rem 1.5rem', borderRadius: '30px' }}>
            <Sparkles size={14} fill="#2ecc71" /> Aroid Provenance for {targetVendor}
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1, marginBottom: '2rem', color: 'white' }}>
            Turn Your <em style={{ color: '#2ecc71', fontStyle: 'italic' }}>Trophy Aroids</em> into Digital Assets.
          </h1>
          
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto 3rem' }}>
            Your Albo and Spiritus Sancti specimens are the crown jewels of any collection. RPV provides the cryptographic proof of authenticity that serious collectors demand at the Miami Festival.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem', background: '#2ecc71', color: 'black', boxShadow: '0 0 40px rgba(46,204,113,0.3)' }}>Activate Fairy QR Suite</Link>
            <a href="#fairy-demo" className="btn-ghost" style={{ padding: '1.5rem 3.5rem', fontSize: '1.1rem' }}>See the Digital Passport ↓</a>
          </div>
        </div>
      </section>

      {/* Why for Rare Plant Fairy */}
      <section style={{ padding: '6rem 5%', borderTop: '1px solid rgba(46,204,113,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>The <em style={{ color: '#2ecc71' }}>Authenticity</em> Edge.</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '1.1rem' }}>
              At the Fuchs Pavilion, collectors are looking for the best. When they scan a Rare Plant Fairy tag, they don&apos;t just see a price—they see a **Digital Passport** verifying its unique lineage, your professional care protocols, and its registration in our secure botanical database.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: '#2ecc71' }}><ShieldCheck /></div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>COA (Certificate of Authenticity)</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Issue cryptographic proof for your high-value variegates to increase buyer confidence.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: '#2ecc71' }}><Heart /></div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Wishlist Retargeting</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Capture the &quot;almost buyers&quot; and notify them the moment you have new stock or price drops.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM FAIRY MOCKUP */}
      <section id="fairy-demo" style={{ padding: '6rem 5%', background: 'linear-gradient(to bottom, #020a06, #0b3d2e, #020a06)', borderTop: '1px solid rgba(46,204,113,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem' }}>The <em style={{ color: '#2ecc71' }}>Fairy</em> Experience.</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Scan this demo with your phone camera. This is exactly what your premium collectors will see at your booth this weekend. No friction, just pure brand authority.
            </p>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '30px', display: 'inline-block', boxShadow: '0 0 60px rgba(46,204,113,0.2)' }}>
              <QRCodeSVG 
                value="https://rareplantvendors.com/verify/fairy-demo" 
                size={220}
                level="H"
              />
              <div style={{ textAlign: 'center', color: '#000', fontSize: '0.8rem', fontWeight: 900, marginTop: '1.5rem', letterSpacing: '0.2em' }}>SCAN FOR FAIRY DEMO</div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             {/* PHONE MOCKUP */}
             <div style={{ background: '#111', border: '8px solid #222', borderRadius: '40px', width: '300px', height: '600px', margin: '0 auto', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600) center/cover' }}>
                <div style={{ height: '100%', background: 'linear-gradient(to top, #111, transparent)' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.5rem', background: '#2ecc71', color: '#000', padding: '2px 5px', borderRadius: '2px', fontWeight: 800 }}>FAIRY AUTHENTIC</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Monstera deliciosa Albo</h4>
                <p style={{ fontSize: '0.7rem', color: '#2ecc71', marginBottom: '1rem' }}>Rare Plant Fairy · Detroit & Miami</p>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Provenance</label>
                  <p style={{ fontSize: '0.7rem', margin: '2px 0' }}>Established Top Cut · High Variegation</p>
                </div>

                <div style={{ padding: '0.8rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    Stunning variegation. Acclimated to 60% humidity. Requires chunky aroid mix...
                  </p>
                </div>

                <button style={{ width: '100%', background: '#2ecc71', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', marginTop: '2rem' }}>
                  Add to Fairy Wishlist
                </button>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '10%', right: '-20px', background: '#2ecc71', color: 'black', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 900, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
              FAIRY BRANDED
            </div>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Join the <em style={{ color: '#2ecc71' }}>Elite Miami</em> Registry</h2>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4rem' }}>
            We want Rare Plant Fairy specimens to be the most verified on the floor. Claim your spot in the next 24 hours to have your premium tags ready for setup day at the Fuchs Pavilion.
          </p>

          <div style={{ background: 'linear-gradient(145deg, #0B3D2E, #050505)', padding: '4rem 2rem', borderRadius: '40px', border: '2px solid #2ecc71', position: 'relative', overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '1.1rem', color: '#2ecc71', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Fairy VIP Offer</div>
            <div style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>$1.00</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>Unlock the full QR suite for the Miami Festival rollout.</p>
            
            <Link href="/onboarding?deal=miami" className="btn-primary" style={{ padding: '1.5rem 5rem', fontSize: '1.3rem', width: '100%', background: '#2ecc71', color: 'black' }}>Claim Fairy Booth Spot</Link>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer style={{ padding: '6rem 5% 4rem', textAlign: 'center', borderTop: '1px solid rgba(46,204,113,0.1)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Ready to print your Albo tags?</p>
        <a href="mailto:clay.mills@rareplantvendors.com" style={{ color: '#2ecc71', fontWeight: 700, textDecoration: 'none', fontSize: '1.2rem' }}>clay.mills@rareplantvendors.com</a>
      </footer>
    </div>
  );
}
