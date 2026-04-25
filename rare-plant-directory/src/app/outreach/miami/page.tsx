'use client';

import { ShieldCheck, Zap, QrCode, Smartphone, BarChart3, ArrowRight, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function MiamiOutreachPage() {
  const festivalName = "Rare Plant & Orchid Festival Miami";
  const daysRemaining = 5;

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', paddingBottom: '6rem' }}>
      {/* Sales Header */}
      <nav style={{ padding: '2rem 5%', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.5rem' }}>✦</span>
          <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Rare Plant Vendors</span>
        </div>
        <Link href="/signup" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>Claim Your Booth</Link>
      </nav>

      {/* Hero Hook */}
      <section style={{ padding: '8rem 5% 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(231,76,60,0.15)', color: '#e74c3c', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', border: '1px solid rgba(231,76,60,0.3)' }}>
            <Clock size={14} /> {daysRemaining} Days Until {festivalName}
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Don&apos;t Let Your Best <em style={{ color: 'var(--gold)' }}>Collectors</em> Walk Away.
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3rem' }}>
            Most Miami festival attendees will admire your plants, ask a question, and never find you again. RPV changes that. Turn every booth visitor into a digital subscriber with one scan.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1rem' }}>Get Your QR Suite Today</Link>
            <a href="#demo" className="btn-ghost" style={{ padding: '1.2rem 2.5rem', fontSize: '1rem' }}>See How It Works ↓</a>
          </div>
        </div>
      </section>

      {/* The "Why" Grid */}
      <section style={{ padding: '6rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>The Future of <em style={{ color: 'var(--gold)' }}>Exhibition</em></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Three features to dominate the Miami show floor.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="onboarding-card" style={{ padding: '3rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
              <QrCode size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Instant Provenance</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Print stunning, branded plant tags that collectors scan to see the specimen&apos;s history, genetic origin, and your professional care guide.
            </p>
          </div>

          <div className="onboarding-card" style={{ padding: '3rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(46,204,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#2ecc71' }}>
              <Smartphone size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Lead Capture 2.0</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              When a collector scans your plant, they can &quot;Add to Wishlist&quot; with one tap. You get their email instantly, turning foot traffic into a warm lead list.
            </p>
          </div>

          <div className="onboarding-card" style={{ padding: '3rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(52,152,219,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#3498db' }}>
              <BarChart3 size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Booth Analytics</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Track which plants got the most scans and which varieties are trending in Miami. Data-driven decisions for your next grow cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" style={{ padding: '6rem 5%', background: '#0a0a0a', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Experience the <em style={{ color: 'var(--gold)' }}>Scan</em></h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
              This is exactly what your customers see at the festival. Scan this demo QR code with your phone camera right now to see the RPV Digital Showcase in action.
            </p>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'inline-block', boxShadow: '0 0 40px rgba(212,175,55,0.2)' }}>
              <QRCodeSVG 
                value="https://rareplantvendors.com/verify/53077961" 
                size={200}
                level="H"
              />
              <div style={{ textAlign: 'center', color: '#000', fontSize: '0.7rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '0.1em' }}>SCAN DEMO</div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ background: '#111', border: '8px solid #222', borderRadius: '40px', width: '300px', height: '600px', margin: '0 auto', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?q=80&w=600) center/cover' }}>
                <div style={{ height: '100%', background: 'linear-gradient(to top, #111, transparent)' }} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.5rem', background: 'var(--gold)', color: '#000', padding: '2px 5px', borderRadius: '2px', fontWeight: 800 }}>AUTHENTIC</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Philodendron Spiritus Sancti</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--gold)', marginBottom: '1rem' }}>Verdant Roots Co. · Miami</p>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Provenance</label>
                  <p style={{ fontSize: '0.7rem', margin: '2px 0' }}>Stem Cutting · Private Collection</p>
                </div>

                <div style={{ padding: '0.8rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    Keep in high humidity (70%+) and bright indirect light. Avoid drafty areas...
                  </p>
                </div>

                <button style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', marginTop: '2rem' }}>
                  Add to My Wishlist
                </button>
              </div>
            </div>
            {/* Phone Mockup Floating Label */}
            <div style={{ position: 'absolute', top: '10%', right: '-20px', background: 'rgba(46,204,113,0.9)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
              LIVE PREVIEW
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem' }}>Limited <em style={{ color: 'var(--gold)' }}>Miami</em> Founding Spots</h2>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto 4rem' }}>
          We are accepting only 100 &quot;Elite Founding Vendors&quot; to receive lifetime priority placement in the Miami directory and full QR suite access.
        </p>

        <div style={{ background: 'linear-gradient(145deg, #0B3D2E, #050505)', padding: '4rem', borderRadius: '30px', border: '2px solid var(--gold)', maxWidth: '800px', margin: '0 auto', boxShadow: '0 0 50px rgba(212,175,55,0.1)' }}>
          <div style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Founding Member Special</div>
          <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem' }}>$1.00 <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>$99.00</span></div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>First month access for all Miami Festival attendees. Cancel anytime.</p>
          
          <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 3rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck size={18} color="var(--gold)" /> Unlimited QR Plant Tags</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck size={18} color="var(--gold)" /> Priority Booth Map Placement</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck size={18} color="var(--gold)" /> Real-time Wishlist Lead Notifications</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck size={18} color="var(--gold)" /> &quot;Verified Miami Vendor&quot; Badge</li>
          </ul>

          <Link href="/signup" className="btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.2rem', width: '100%' }}>Claim Your Miami Spot Now</Link>
        </div>
      </section>

      {/* Contact Footer */}
      <footer style={{ padding: '4rem 5%', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Questions about the Miami rollout?</p>
        <a href="mailto:clay.mills@rareplantvendors.com" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none', fontSize: '1.2rem' }}>clay.mills@rareplantvendors.com</a>
      </footer>
    </div>
  );
}
