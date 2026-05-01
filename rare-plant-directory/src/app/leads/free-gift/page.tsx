'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, User, Calendar, Shield, ArrowLeft, Phone, Mail, AlertTriangle } from 'lucide-react';

export default function FreeLeadPage() {
  return (
    <div className="permit-theme" style={{ minHeight: '100vh', background: '#F8FAFC', padding: '120px 5% 60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/permits" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Live Feed
        </Link>

        <div style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
          
          {/* Header */}
          <div style={{ background: '#1A202C', padding: '3rem', color: 'white' }}>
            <div style={{ display: 'inline-block', background: '#10B981', color: 'white', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              VERIFIED FREE GIFT
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Residential Re-Roof</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
              <MapPin size={18} color="#10B981" /> 81 SUNSET VIEW DR, WINTER HAVEN FL 33884
            </div>
          </div>

          <div style={{ padding: '3rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Owner Name</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1A202C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} color="#0088FF" /> FUCHS, JOYCE A
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Date Filed</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1A202C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} color="#0088FF" /> May 1, 2026
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Project Valuation</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>$12,500.00</div>
              </div>
            </div>

            <div style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} color="#0088FF" /> Contact Details
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                     <Phone size={18} color="#64748B" />
                   </div>
                   <div>
                     <div style={{ fontWeight: 700, color: '#1A202C' }}>863-***-****</div>
                     <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Phone (Subscription Required to Un-Blur)</div>
                   </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                     <Mail size={18} color="#64748B" />
                   </div>
                   <div>
                     <div style={{ fontWeight: 700, color: '#1A202C' }}>Available in Dashboard</div>
                     <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Verified Homeowner Email</div>
                   </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '16px', padding: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <AlertTriangle color="#F97316" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#C2410C', fontSize: '0.9rem', marginBottom: '0.25rem' }}>LEGAL COMPLIANCE NOTICE</div>
                  <p style={{ fontSize: '0.85rem', color: '#C2410C', opacity: 0.9, lineHeight: 1.5 }}>
                    Per TCPA and Florida FTSA laws, do not cold call or text this homeowner without verified prior written consent. We recommend <strong>direct mail</strong> or <strong>in-person site visits</strong> for the highest conversion and zero legal risk.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Want full access to the other 82 Polk County leads?</h4>
              <Link href="/checkout" style={{ 
                display: 'inline-block',
                background: '#0088FF', 
                color: 'white', 
                padding: '1.25rem 3rem', 
                borderRadius: '16px', 
                fontWeight: 800, 
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0,136,255,0.3)'
              }}>
                Activate Exclusive Polk Territory for $199
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
