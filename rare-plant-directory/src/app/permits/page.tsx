import React from 'react';
import Link from 'next/link';
import { Database, ShieldCheck, TrendingUp, Zap, MapPin, Star, Shield } from 'lucide-react';

export default function PermitsPage() {
  return (
    <div className="permit-theme page-wrapper" style={{ overflow: 'hidden' }}>
      
      {/* ─── FLORIDA EXPANSION ALERT ─── */}
      <div style={{ 
        background: 'var(--accent)', 
        color: 'white', 
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
        <span>FLORIDA EXPANSION: LEON, POLK, PASCO, & HILLSBOROUGH NOW LIVE</span>
        <Link href="/leads" style={{ 
          background: 'white', 
          color: 'var(--accent)', 
          padding: '0.3rem 1rem', 
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '0.7rem'
        }}>
          VIEW LEAD MAP →
        </Link>
      </div>
      
      {/* ─── HERO SECTION ─── */}
      <section className="hero" style={{ 
        paddingTop: '10rem', 
        paddingBottom: '6rem',
        position: 'relative',
        background: 'var(--hero-bg)'
      }}>
        <div className="hero-grid-overlay" style={{ opacity: 0.1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 2.5rem' }}>
            <div className="hero-eyebrow-dot" style={{ backgroundColor: 'var(--accent)' }}></div>
            <span>Exclusive Contractor Data</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--text-primary)'
          }}>
            Stop Chasing Leads. <br />
            <em style={{ 
              display: 'inline-block',
              color: 'var(--accent)',
              fontStyle: 'normal'
            }}>Let the Permits Come to You.</em>
          </h1>
          
          <p className="hero-sub" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 4rem',
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            We monitor homeowner-filed building permits in real-time. Get exclusive access to roofing and pool projects the moment they are registered—before your competitors even know they exist.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/leads" className="btn-primary" style={{ 
              padding: '1.25rem 3rem', 
              fontSize: '1rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700
            }}>
              Browse Lead Database
            </Link>
            <Link href="/pricing" className="btn-ghost" style={{ 
              padding: '1.25rem 3rem', 
              fontSize: '1rem',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 700
            }}>
              View Pricing
            </Link>
          </div>

          {/* ─── DASHBOARD PREVIEW ─── */}
          <div style={{
            maxWidth: '1000px',
            margin: '6rem auto 0',
            padding: '1rem',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <div style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A202C' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
                   LIVE PERMIT FEED: POLK COUNTY
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Updated 2 mins ago</div>
              </div>
              <div style={{ padding: '1rem' }}>
                {[
                  { type: 'ROOFING', location: 'Lakeland, FL', date: 'Just now', intent: 'High' },
                  { type: 'POOL', location: 'Winter Haven, FL', date: '14 mins ago', intent: 'Verified' },
                  { type: 'ROOFING', location: 'Davenport, FL', date: '42 mins ago', intent: 'High' },
                ].map((lead, i) => (
                  <div key={i} style={{ 
                    padding: '1.5rem', 
                    marginBottom: '0.5rem', 
                    background: '#F9FAFB', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid transparent'
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                         <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '4px', background: lead.type === 'POOL' ? '#E0F2FE' : '#FEF3C7', color: lead.type === 'POOL' ? '#0369A1' : '#B45309' }}>{lead.type}</span>
                         <span style={{ fontWeight: 600, color: '#1A202C' }}>{lead.location}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Owner-Filed Permit • Expected Start: June 2026</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#10B981' }}>{lead.intent}</div>
                      <div style={{ fontSize: '0.7rem', color: '#999' }}>{lead.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center', background: '#F3F4F6' }}>
                 <Link href="/login" style={{ fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>Log in to view full contact details →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="section" style={{ padding: '8rem 5%', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1A202C' }}>Why Permit Data?</h2>
            <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We don't just sell leads. We provide a competitive advantage built on proprietary scraping technology.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
             {[
               { icon: <Zap color="var(--accent)" />, title: 'Real-Time Alerts', desc: 'Get SMS or email notifications the moment a homeowner files a permit in your territory.' },
               { icon: <ShieldCheck color="var(--accent)" />, title: 'Homeowner Direct', desc: 'We filter out developer and commercial permits. These are real homeowners ready to hire.' },
               { icon: <TrendingUp color="var(--accent)" />, title: 'Zero Competition', desc: 'Our leads are distributed to a limited number of contractors per county. No more price wars.' }
             ].map((feature, i) => (
               <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'left' }}>
                 <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1A202C' }}>{feature.title}</h3>
                 <p style={{ color: '#64748B', lineHeight: 1.6 }}>{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section style={{ padding: '10rem 5%', background: 'var(--accent)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to fill your pipeline?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '3.5rem', opacity: 0.9 }}>
            Join 200+ contractors in Florida who have stopped cold calling and started closing.
          </p>
          <Link href="/signup" style={{ 
            background: 'white', 
            color: 'var(--accent)', 
            padding: '1.5rem 4rem', 
            borderRadius: '16px', 
            fontSize: '1.2rem', 
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            Get Your First 5 Leads Free
          </Link>
        </div>
      </section>
    </div>
  );
}
