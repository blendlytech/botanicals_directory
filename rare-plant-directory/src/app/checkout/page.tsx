'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="permit-theme" style={{ minHeight: '100vh', background: '#F8FAFC', padding: '120px 5% 60px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1A202C', marginBottom: '1rem' }}>Secure Your Territory</h1>
          <p style={{ color: '#64748B', fontSize: '1.2rem' }}>Polk County • Residential Roofing & Pool Permits</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={20} color="#0088FF" /> Order Summary
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>Exclusive Territory Pilot (Polk)</span>
                <span style={{ fontWeight: 700, color: '#1A202C' }}>$300.00/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 700 }}>
                <span>Pilot Discount (2-Month Lockout)</span>
                <span>-$101.00</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Total Due Today</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0088FF' }}>$199</span>
                  <span style={{ fontSize: '1rem', color: '#64748B' }}>/mo</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#F0F9FF', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem', border: '1px solid #BAE6FD' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#0088FF" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#0369A1', fontSize: '0.9rem' }}>60-DAY LOCKOUT ACTIVE</div>
                  <div style={{ fontSize: '0.8rem', color: '#0369A1', opacity: 0.8 }}>We will not sell this territory to any other contractor in your trade for the next 2 months.</div>
                </div>
              </div>
            </div>

            <button style={{ 
              width: '100%', 
              padding: '1.25rem', 
              background: '#0088FF', 
              color: 'white', 
              borderRadius: '16px', 
              fontSize: '1.1rem', 
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(0,136,255,0.3)'
            }}>
              Complete Secure Activation <ArrowRight size={20} />
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8', marginTop: '1.5rem' }}>
              Secure 256-bit SSL Encrypted Payment. Cancel anytime after the pilot period.
            </p>
          </div>

          {/* Benefits / Social Proof */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', color: '#1A202C' }}>What you're getting:</h3>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
               {[
                 { icon: <Zap color="#0088FF" />, title: 'Real-Time Alerts', desc: 'Get the owner name and address the second the permit hits the county system.' },
                 { icon: <ShieldCheck color="#0088FF" />, title: '100% Verified Data', desc: 'Sourced directly from Polk County public records. No junk, no old leads.' },
                 { icon: <Lock color="#0088FF" />, title: 'Territory Exclusivity', desc: 'You are the only one in your trade getting these specific leads in this county.' }
               ].map((benefit, i) => (
                 <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                   <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                     {benefit.icon}
                   </div>
                   <div>
                     <div style={{ fontWeight: 700, color: '#1A202C', marginBottom: '0.25rem' }}>{benefit.title}</div>
                     <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>{benefit.desc}</p>
                   </div>
                 </div>
               ))}
            </div>

            <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(0,136,255,0.05)', borderRadius: '24px', border: '1px dashed #0088FF' }}>
              <div style={{ fontStyle: 'italic', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                "We closed three roofing jobs in our first two weeks with the Polk County list. The homeowners were shocked we knew they needed a roof so quickly."
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%' }}></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Local Roofing Contractor</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Verified Subscriber</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
