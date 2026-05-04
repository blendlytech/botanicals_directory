'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Map, ShieldCheck, TrendingUp, Zap, Lock, MapPin } from 'lucide-react';

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true); // Default to Annual pushing

  return (
    <div>
      {/* ── TOGGLE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          padding: '0.5rem',
          borderRadius: '100px',
          display: 'flex',
          gap: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button 
            onClick={() => setIsAnnual(false)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '100px',
              border: 'none',
              background: !isAnnual ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: !isAnnual ? '#FFF' : 'rgba(255, 255, 255, 0.5)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '100px',
              border: 'none',
              background: isAnnual ? 'var(--gold)' : 'transparent',
              color: isAnnual ? '#0B3D2E' : 'rgba(255, 255, 255, 0.5)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Annual <span style={{ fontSize: '0.7rem', background: '#FFF', color: '#0B3D2E', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>SAVE 20%</span>
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'stretch'
      }}>
        
        {/* Sprout Tier */}
        <div className="pricing-card pricing-card-glass" style={{ 
          padding: '4rem 2.5rem',
          borderRadius: '32px'
        }}>
          <div className="free-tier-badge" style={{ marginBottom: '1.5rem' }}>Starter</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>Sprout</h3>
          <div className="pricing-price-display" style={{ color: 'var(--text-primary)' }}>
            ${isAnnual ? '11.99' : '14.99'}
            <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>/mo</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', opacity: 0.8, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Digitize your booth in 5 minutes. Perfect for local markets and hobbyists.
          </p>
          <ul className="pricing-feature-list">
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <Star size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>1 Plant Showcase</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>A dedicated digital page for your absolute best specimen.</div>
              </div>
            </li>
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <Map size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Vendor Linkpage</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>A mobile-first profile listing your nursery info and showcase.</div>
              </div>
            </li>
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <ShieldCheck size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Direct Inquiries</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>Allow collectors to email you directly from your profile.</div>
              </div>
            </li>
          </ul>
          <Link href={`/onboarding?type=vendor&plan=sprout&billing=${isAnnual ? 'annual' : 'monthly'}`} className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1.25rem', borderRadius: '16px', fontSize: '0.85rem' }}>
            Start Growing
          </Link>
        </div>

        {/* Bloom Tier (Highlighted) */}
        <div className="pricing-card" style={{ 
          padding: '4rem 2.5rem',
          borderRadius: '32px',
          background: '#0B3D2E',
          border: '4px solid var(--gold)',
          transform: 'scale(1.05)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div className="scarcity-pill" style={{ background: 'var(--gold)', color: '#0B3D2E' }}>Vendor Favorite</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
              MOST POPULAR
            </div>
          </div>
          
          <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'white', fontWeight: 700 }}>Bloom</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="pricing-price-display" style={{ color: 'var(--gold)', fontSize: '4.5rem' }}>
              ${isAnnual ? '29' : '39'}
            </div>
            <div style={{ opacity: 0.6, fontSize: '1.2rem', color: 'white' }}>.99/mo</div>
          </div>
          
          <p style={{ color: 'white', opacity: 0.9, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Advanced analytics and lead capture for established professionals.
          </p>

          <div style={{ 
            background: 'rgba(212, 175, 55, 0.05)', 
            border: '1px solid var(--gold-dim)', 
            borderRadius: '16px', 
            padding: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <ul className="pricing-feature-list" style={{ margin: 0, gap: '1.25rem' }}>
              <li className="pricing-feature-item highlight" style={{ alignItems: 'flex-start' }}>
                <Star size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>5 Plant Showcases</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px', color: 'white', fontWeight: 400 }}>Highlight your top 5 most valuable rare plants with dedicated pages.</div>
                </div>
              </li>
              <li className="pricing-feature-item highlight" style={{ alignItems: 'flex-start' }}>
                <TrendingUp size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Priority Directory</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px', color: 'white', fontWeight: 400 }}>Appear higher when collectors search for vendors in your region.</div>
                </div>
              </li>
              <li className="pricing-feature-item highlight" style={{ alignItems: 'flex-start' }}>
                <Zap size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>5 Plant QRs</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px', color: 'white', fontWeight: 400 }}>Individual QR codes to display next to your featured plants.</div>
                </div>
              </li>
              <li className="pricing-feature-item highlight" style={{ alignItems: 'flex-start' }}>
                <Lock size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Basic Analytics</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px', color: 'white', fontWeight: 400 }}>Track how many times your profile and plant pages are viewed.</div>
                </div>
              </li>
            </ul>
          </div>

          <Link href={`/onboarding?type=vendor&plan=bloom&billing=${isAnnual ? 'annual' : 'monthly'}`} className="btn-primary" style={{ 
            marginTop: 'auto', 
            textAlign: 'center', 
            width: '100%', 
            padding: '1.25rem', 
            borderRadius: '16px', 
            fontSize: '0.9rem',
            letterSpacing: '0.1em'
          }}>
            Scale Your Nursery
          </Link>
        </div>

        {/* Canopy Tier */}
        <div className="pricing-card pricing-card-glass" style={{ 
          padding: '4rem 2.5rem',
          borderRadius: '32px'
        }}>
          <div style={{ marginBottom: '1.5rem', color: 'var(--sand)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise</div>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>Canopy</h3>
          <div className="pricing-price-display" style={{ color: 'var(--text-primary)' }}>
            ${isAnnual ? '99' : '129'}
            <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>.99/mo</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', opacity: 0.8, marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            White-label infrastructure for massive greenhouse operations.
          </p>
          <ul className="pricing-feature-list">
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <Star size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>15 Plant Showcases</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>Showcase a wider variety of your premium specimens.</div>
              </div>
            </li>
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <MapPin size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Featured Spot</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>Get rotated in the &quot;Featured Vendors&quot; section on the homepage.</div>
              </div>
            </li>
            <li className="pricing-feature-item" style={{ alignItems: 'flex-start' }}>
              <Zap size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Advanced Analytics</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>See detailed geographic and temporal data on your page views.</div>
              </div>
            </li>
          </ul>
          <Link href={`/onboarding?type=vendor&plan=canopy&billing=${isAnnual ? 'annual' : 'monthly'}`} className="btn-ghost" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', padding: '1.25rem', borderRadius: '16px', fontSize: '0.85rem' }}>
            Request Enterprise Access
          </Link>
        </div>
      </div>
    </div>
  );
}
