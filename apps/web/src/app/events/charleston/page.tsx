'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  QrCode,
  Users,
  Award,
  Crown
} from 'lucide-react';
import Link from 'next/link';

// Countdown Timer Component
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.5rem', 
            color: 'var(--gold)', 
            background: 'rgba(184,150,12,0.1)',
            border: '1px solid var(--glass-border)',
            borderRadius: '6px',
            padding: '0.4rem 0.8rem',
            minWidth: '60px'
          }}>
            {String(item.value).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.3rem', opacity: 0.7 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CharlestonShowPage() {
  const eventDate = "2026-04-25T08:00:00";
  const [founderCount, setFounderCount] = useState(64);

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)', position: 'relative' }}>
      
      {/* 🚨 EXCLUSIVE STICKY BANNER */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        background: 'linear-gradient(90deg, #B8960C 0%, #D4AF37 50%, #B8960C 100%)',
        color: '#0F0F0F',
        padding: '0.6rem 5%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.85rem',
        fontWeight: 800,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        letterSpacing: '0.02em'
      }}>
        <Crown size={16} />
        <span>EXCLUSIVE: Only {founderCount}/100 Founders Packages remaining at $98 (Lifetime Access)</span>
        <button style={{ 
          background: '#0F0F0F', 
          color: '#D4AF37', 
          border: 'none', 
          padding: '0.3rem 1rem', 
          borderRadius: '4px', 
          fontSize: '0.7rem', 
          fontWeight: 900, 
          cursor: 'pointer',
          textTransform: 'uppercase'
        }}>
          Claim Yours →
        </button>
      </div>

      {/* --- HERO SECTION --- */}
      <section style={{ 
        height: '90vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '0 5%',
        background: 'radial-gradient(circle at center, #0B3D2E 0%, #040806 100%)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2000')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          <div className="hero-eyebrow" style={{ color: 'var(--gold)', borderColor: 'var(--glass-border)', margin: '0 auto 2rem' }}>
            <span className="hero-eyebrow-dot" />
            The Enchanted Forest Awaits
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
            color: '#fff', 
            marginBottom: '1rem',
            lineHeight: 1.0,
            fontFamily: 'var(--font-heading)'
          }}>
            Charleston <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Rare Plant</em> Show
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            color: 'rgba(255,255,255,0.85)', 
            maxWidth: '700px', 
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            Join 70+ elite vendors at the Charleston Area Convention Center. <br />
            Experience the future of plant collecting with CultivarID.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#founders" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}>
              Claim Founder Status
            </a>
            <a href="#info" className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem', borderColor: '#fff', color: '#fff' }}>
              Show Information
            </a>
          </div>

          <CountdownTimer targetDate={eventDate} />
        </div>
      </section>

      {/* --- SHOW INFO --- */}
      <section id="info" className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div>
            <span className="section-eyebrow">Show Intelligence</span>
            <h2 className="section-title">Event <em>Logistics</em></h2>
            <div className="section-rule" style={{ margin: '1rem 0 2.5rem' }} />
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <MapPin color="var(--gold)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Charleston Convention Center</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>North Charleston, South Carolina</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Calendar color="var(--gold)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>April 25–26, 2026</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Weekend of Botanical Excellence</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Clock color="var(--gold)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>VIP Early Access</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>8:00 AM Saturday | 10:00 AM General Admission</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Attendee Highlights</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
              {[
                "70+ Specialized Rare Plant Vendors",
                "Hands-on Propagation Workshops",
                "Meet-and-greet with top Plantfluencers",
                "Live Botanical Art Installations",
                "Exclusive Charleston-only cultivars"
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="var(--forest)" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- CULTIVARID FOR COLLECTORS --- */}
      <section className="section" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-eyebrow">The Collector's Edge</span>
          <h2 className="section-title">A Digital <em>Passport</em> for Every Leaf</h2>
          <p className="section-desc">
            Stop losing labels and losing track of history. CultivarID brings your collection into the digital age with secure, verifiable provenance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            <div className="feature-card">
              <div className="feature-icon"><Award color="var(--gold)" /></div>
              <h3 className="feature-title">Provenance Tracking</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Secure the complete history of your specimen from original grower to your shelf.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><QrCode color="var(--gold)" /></div>
              <h3 className="feature-title">Instant Verification</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tap NFC tags at the Charleston show to instantly see care logs and genetic lineage.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck color="var(--gold)" /></div>
              <h3 className="feature-title">Health Certificates</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Store professional health certificates and pest-free guarantees in one secure tap.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--gold-dim)', borderRadius: '16px', border: '1px dashed var(--gold)' }}>
            <p style={{ fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em' }}>
              "Collectors at the Charleston show are looking for NFC tags. Don't let your collection stay in the analog age."
            </p>
          </div>
        </div>
      </section>

      {/* --- VENDOR ULTIMATUM --- */}
      <section style={{ 
        padding: '8rem 5%', 
        background: 'linear-gradient(145deg, #051A13 0%, #0B3D2E 100%)',
        color: '#fff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1 }}><Sparkles size={120} color="var(--gold)" /></div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800 }}>Vendor Alert</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginTop: '1rem', marginBottom: '1.5rem' }}>
            The Booth Next Door <br /><em style={{ color: 'var(--gold)' }}>Already Has It.</em>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '3rem' }}>
            Collectors will be using the CultivarID scanner to find their next "Grail." 
            Vendors with NFC tags appear 10x more professional and trustworthy. 
            We are giving CultivarID away for <strong>FREE</strong> to our Collector Founding Subscribers to ensure they are scanning <em>your</em> plants.
          </p>
          <Link href="/onboarding" className="btn-primary" style={{ padding: '1.25rem 3.5rem', borderRadius: '50px', background: '#fff', color: '#0B3D2E' }}>
            Get Your Vendor NFC Kit
          </Link>
        </div>
      </section>

      {/* --- FOUNDERS PACKAGE --- */}
      <section id="founders" className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '2px solid var(--gold)', 
            borderRadius: '32px', 
            padding: '4rem 3rem',
            textAlign: 'center',
            boxShadow: '0 20px 80px rgba(184,150,12,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem 2rem', background: 'var(--gold)', color: '#000', fontWeight: 900, borderRadius: '0 0 0 20px', fontSize: '0.75rem' }}>
              LIMITED TO FIRST 100
            </div>
            
            <Crown size={64} color="var(--gold)" style={{ marginBottom: '2rem' }} />
            <h2 className="section-title">Lifetime <em>Founders</em> Package</h2>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--text-primary)', margin: '1rem 0' }}>
              $98 <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.5, textDecoration: 'line-through' }}>$499</span>
            </div>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
              One payment. Lifetime access. Secure your status as a pioneer in the rare plant community.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left', marginBottom: '4rem' }}>
              {[
                { icon: <Zap size={18} />, text: "Lifetime Pro Scanner Access" },
                { icon: <Award size={18} />, text: "'Founder' Profile Badge" },
                { icon: <Star size={18} />, text: "Priority Support & Early Beta" },
                { icon: <Sparkles size={18} />, text: "Unlimited Digital Passports" },
                { icon: <Users size={18} />, text: "Founders-Only Event Invites" },
                { icon: <ShieldCheck size={18} />, text: "Verified Provenance Seals" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--gold)' }}>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.1rem', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
              Claim Your Founders Spot Now
            </button>
            <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
              Join {100 - founderCount} others who have already secured their legacy.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ background: 'var(--footer-bg)', padding: '6rem 5% 4rem', color: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Charleston 2026</h3>
        <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '3rem' }}>The future of rare plant culture starts here.</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '0.8rem', opacity: 0.4 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Support</span>
        </div>
      </footer>

    </main>
  );
}
