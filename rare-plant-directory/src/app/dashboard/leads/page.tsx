'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Mock data for demonstration
const mockLeads = [
  {
    id: '1',
    species: 'Monstera Obliqua Peru',
    user: 'Collector #842',
    tier: 'Elite Exclusive',
    time: '2h ago',
    status: 'Instant Match',
    value: '$450 - $600',
    isElite: true,
  },
  {
    id: '2',
    species: 'Anthurium Regale',
    user: 'Collector #129',
    tier: 'Standard',
    time: '26h ago',
    status: 'Released',
    value: '$120 - $180',
    isElite: false,
  },
  {
    id: '3',
    species: 'Philodendron Spiritus Sancti',
    user: 'Collector #004',
    tier: 'Elite Exclusive',
    time: '5h ago',
    status: 'Instant Match',
    value: '$1,200+',
    isElite: true,
  }
];

export default function LeadsDashboard() {
  return (
    <div className="onboarding-container" style={{ padding: '6rem 5% 4rem' }}>
      <div className="onboarding-header">
        <h1 className="onboarding-title">Market <em>Intelligence</em></h1>
        <p className="onboarding-subtitle">Real-time leads from the collector wishlist network.</p>
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        
        {/* LEADS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockLeads.map((lead) => (
            <div key={lead.id} className="onboarding-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                   {lead.isElite && <span className="elite-badge" style={{ fontSize: '0.6rem' }}>✦ Elite Lead</span>}
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{lead.time}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>{lead.species}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Interested Buyer: {lead.user}</p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.25rem' }}>{lead.value}</div>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>Contact Buyer</button>
              </div>
            </div>
          ))}
        </div>

        {/* ANALYTICS MINI-PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="onboarding-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '1rem' }}>Trending Now</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Anthurium</span>
                <span style={{ color: 'var(--emerald)' }}>+24% ↑</span>
              </div>
              <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Variegated Labisia</span>
                <span style={{ color: 'var(--emerald)' }}>+18% ↑</span>
              </div>
              <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Alocasia</span>
                <span style={{ color: 'var(--text-secondary)' }}>-5% ↓</span>
              </div>
            </div>
          </div>

          <div className="onboarding-card" style={{ padding: '1.5rem', background: 'var(--gold-dim)', borderColor: 'var(--gold)' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>Elite Advantage</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              You are seeing <strong>2 Elite Exclusive</strong> leads. These will not be visible to Standard or Verified vendors for another 18 hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
