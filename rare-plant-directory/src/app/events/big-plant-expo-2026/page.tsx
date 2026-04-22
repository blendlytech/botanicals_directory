'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  Star, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Leaf
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
    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
            color: 'var(--gold)', 
            background: 'var(--gold-dim)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            minWidth: '70px',
            boxShadow: '0 4px 15px rgba(184,150,12,0.1)'
          }}>
            {String(item.value).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem', opacity: 0.7, fontWeight: 700 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function BigPlantExpo2026() {
  const eventDate = "2026-04-25T08:00:00";
  
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* --- HERO SECTION --- */}
      <section style={{ 
        height: '100vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '0 5%'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/expo-hero.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,8,6,0.3) 0%, rgba(4,8,6,0.8) 100%)',
          zIndex: 2
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', animation: 'fadeUp 1s ease-out' }}>
          <div className="hero-eyebrow" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', margin: '0 auto 2rem' }}>
            <span className="hero-eyebrow-dot" style={{ background: '#fff' }} />
            Charleston's Premier Plant Experience
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
            color: '#fff', 
            marginBottom: '1rem',
            lineHeight: 1.0,
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            The BIG <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Plant Expo</em> 2026
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
            color: 'rgba(255,255,255,0.9)', 
            maxWidth: '700px', 
            margin: '0 auto 2rem',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            An immersive Enchanted Forest experience celebrating rare plants, <br />
            small businesses, and botanical culture in Charleston, SC.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.bigplantexpo.com/event-details-registration/the-big-plant-expo-2026/form" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}>
              Secure Your Tickets
            </a>
            <a href="#experience" className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem', borderColor: '#fff', color: '#fff' }}>
              Explore The Forest
            </a>
          </div>

          <CountdownTimer targetDate={eventDate} />
        </div>

        {/* Floating Leaves Decoration */}
        <div className="hero-leaf-1"><Leaf size={40} color="var(--gold)" /></div>
        <div className="hero-leaf-2" style={{ opacity: 0.15 }}><Leaf size={60} color="var(--emerald)" /></div>
      </section>

      {/* --- QUICK INFO BAR --- */}
      <div className="ticker-bar" style={{ background: 'var(--bg-surface)', border: 'none' }}>
        <div className="ticker-track">
          {[1,2,3,4,5,6].map(i => (
            <React.Fragment key={i}>
              <div className="ticker-item"><Calendar size={14} /> April 25-26, 2026</div>
              <div className="ticker-dot" />
              <div className="ticker-item"><MapPin size={14} /> Charleston Convention Center</div>
              <div className="ticker-dot" />
              <div className="ticker-item"><Sparkles size={14} /> Enchanted Forest Edition</div>
              <div className="ticker-dot" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* --- THE EXPERIENCE --- */}
      <section id="experience" className="section" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="section-header">
          <span className="section-eyebrow">Curated Experience</span>
          <h2 className="section-title">What Makes This Expo <em>Different</em>?</h2>
          <div className="section-rule" />
        </div>

        <div className="features-grid">
          {[
            { icon: <Zap color="var(--gold)" />, title: "Rare Finds", desc: "Access to rare and specialty plant vendors from across the Southeast." },
            { icon: <Sparkles color="var(--gold)" />, title: "Themed Displays", desc: "Immerse yourself in curated, forest-inspired vendor showcases." },
            { icon: <ShieldCheck color="var(--gold)" />, title: "Indoor Comfort", desc: "Fully climate-controlled venue at the Charleston Convention Center." },
            { icon: <Clock color="var(--gold)" />, title: "VIP Access", desc: "Shop early and skip the lines with our exclusive VIP hour entry." },
            { icon: <CheckCircle2 color="var(--gold)" />, title: "Educational", desc: "Participate in workshops and live demos from industry experts." },
            { icon: <MapPin color="var(--gold)" />, title: "Community", desc: "Connect with plantfluencers and passionate collectors like you." },
          ].map((feat, i) => (
            <div key={i} className="feature-card" style={{ background: 'var(--bg-card)', boxShadow: 'var(--card-shadow)' }}>
              <div className="feature-icon">{feat.icon}</div>
              <h3 className="feature-title" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- VIP LUXE SECTION --- */}
      <section style={{ 
        padding: '10rem 5%', 
        background: 'linear-gradient(145deg, #051A13 0%, #0B3D2E 100%)',
        position: 'relative',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <Star size={16} fill="var(--gold)" />
            The Ultimate Experience
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>
            Elevate Your Visit with <em style={{ color: 'var(--gold)' }}>VIP Access</em>
          </h2>
          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(212,175,55,0.2)', 
            borderRadius: '24px', 
            padding: '3rem',
            backdropFilter: 'blur(20px)',
            marginBottom: '3rem'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                "Early Entry at 8:00 AM Saturday",
                "First Access to Rare & Limited Plants",
                "Calmer, Exclusive Shopping Environment",
                "VIP-Only Hour (Sunday 4PM - 5PM)",
                "Exclusive Perks & Collector Giveaways",
                "Priority Workshop Registration"
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                  <CheckCircle2 size={18} color="var(--gold)" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <a href="https://www.bigplantexpo.com/event-details-registration/the-big-plant-expo-2026/form" className="btn-primary" style={{ padding: '1.25rem 3.5rem', borderRadius: '50px' }}>
            Grab VIP Tickets <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </a>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Limited availability. VIP tickets often sell out months in advance.</p>
        </div>
      </section>

      {/* --- PLAN YOUR VISIT --- */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-eyebrow">Location & Times</span>
            <h2 className="section-title">Join Us in <em>Charleston</em></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              We're transforming the Charleston Convention Center into a botanical wonderland. Conveniently located and fully accessible.
            </p>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--gold-dim)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin color="var(--gold)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Charleston Convention Center</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>North Charleston, South Carolina</p>
                  <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>$10.00 Daily Parking Fee</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--gold-dim)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock color="var(--gold)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Event Hours</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span style={{ fontWeight: 600 }}>Saturday:</span> <span>10:00 AM – 6:00 PM</span>
                    <span style={{ fontWeight: 600 }}>Sunday:</span> <span>10:00 AM – 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            height: '450px', 
            background: 'var(--bg-card)', 
            borderRadius: '24px', 
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--card-shadow)',
            position: 'relative',
            overflow: 'hidden'
          }}>
             {/* Mock Map Placeholder with aesthetic styling */}
             <div style={{ 
               width: '100%', 
               height: '100%', 
               background: '#e0e5e2',
               backgroundImage: 'radial-gradient(#c5ccc7 2px, transparent 2px)',
               backgroundSize: '30px 30px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               padding: '2rem',
               textAlign: 'center'
             }}>
               <div style={{ position: 'relative' }}>
                 <MapPin size={48} color="var(--emerald)" />
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', border: '2px solid var(--emerald)', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }} />
               </div>
               <h3 style={{ marginTop: '2rem', color: 'var(--emerald)' }}>Charleston Convention Center</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>5000 Coliseum Dr, North Charleston, SC 29418</p>
               <a href="https://maps.google.com" target="_blank" className="btn-ghost" style={{ marginTop: '1.5rem', borderRadius: '50px' }}>Get Directions</a>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="section" style={{ textAlign: 'center', padding: '8rem 5%' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
          Don't Miss the Southeast's <br /><em style={{ color: 'var(--forest)' }}>Premier Plant Event</em>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
          Whether you're a rare plant collector or just starting your green journey, The BIG Plant Expo is the place to be.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="https://www.bigplantexpo.com/event-details-registration/the-big-plant-expo-2026/form" className="btn-primary" style={{ padding: '1.25rem 3rem' }}>
            Buy Tickets Now
          </a>
          <Link href="/onboarding" className="btn-ghost" style={{ padding: '1.25rem 3rem' }}>
            Apply to Vend
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ background: 'var(--footer-bg)', padding: '6rem 5% 4rem', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>The BIG Plant Expo</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Celebrating botanical diversity and small businesses. Hosted by South East Rare Plant Market LLP.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', opacity: 0.8 }}>Contact Us</h4>
            <div style={{ fontSize: '0.9rem', display: 'grid', gap: '0.75rem' }}>
              <a href="mailto:info@bigplantexpo.com" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>info@bigplantexpo.com</a>
              <a href="mailto:renay@bigplantexpo.com" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>renay@bigplantexpo.com</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', opacity: 0.8 }}>Quick Links</h4>
            <div style={{ fontSize: '0.9rem', display: 'grid', gap: '0.75rem' }}>
              <Link href="/faq" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>FAQ</Link>
              <Link href="/vendors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>All Vendors</Link>
              <Link href="/about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Our Story</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          <p>© 2026 South East Rare Plant Market LLP. All rights reserved.</p>
          <p>Created by BlendlyTech for RPV Marketplace</p>
        </div>
      </footer>
    </main>
  );
}
