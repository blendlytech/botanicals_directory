'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyPassportPage({ params }: { params: { hash: string } }) {
  const [passport, setPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function verify() {
      const { data, error } = await supabase
        .from('digital_passports')
        .select('*, vendors(name, location_city, location_state, is_verified, tier)')
        .eq('verification_hash', params.hash.toLowerCase())
        .single();

      if (error || !data) {
        setError(true);
      } else {
        setPassport(data);
      }
      setLoading(false);
    }
    verify();
  }, [params.hash]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'floatLeaf 3s ease-in-out infinite' }}>📜</div>
          <p style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>VERIFYING AUTHENTICITY...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', padding: '2rem' }}>
        <div className="onboarding-card" style={{ maxWidth: '500px', textAlign: 'center', border: '1px solid #e74c3c' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#e74c3c', marginBottom: '1rem' }}>Verification Failed</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            The verification hash <strong>{params.hash}</strong> could not be found in the Rare Plant Vendors secure registry. This specimen may not be officially registered or the hash is incorrect.
          </p>
          <Link href="/" className="btn-ghost">Back to Registry</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', padding: '8rem 5% 4rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        {/* Certificate Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Image src="/brand-seal.png" alt="RPV" width={80} height={80} style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))', marginBottom: '1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Certificate of Authenticity</h1>
          <p style={{ color: 'var(--gold)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Rare Plant Vendors Secure Registry
          </p>
        </div>

        {/* The Passport Card */}
        <div className="onboarding-card" style={{ 
          padding: '3rem', 
          border: '2px solid var(--gold)', 
          background: 'linear-gradient(145deg, rgba(20,20,20,1), rgba(11,61,46,0.3))',
          boxShadow: '0 0 60px rgba(212,175,55,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Watermark/Pattern */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', fontSize: '15rem', opacity: 0.03, pointerEvents: 'none' }}>🌿</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Specimen Variety</label>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{passport.specimen_name}</div>

              <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Lineage & Provenance</label>
              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>
                {passport.mother_plant_origin || 'Original Stock'}
              </div>

              <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Propagation Method</label>
              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {passport.propagation_method}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Issued By</label>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>{passport.vendors?.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{passport.vendors?.location_city}, {passport.vendors?.location_state}</div>
                </div>
                {passport.vendors?.is_verified && (
                  <span className="verified-badge" style={{ display: 'inline-block' }}>✓ Verified Grower</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Issuance Date</label>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{new Date(passport.issued_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Unique Registry ID</div>
                <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>
                  {params.hash.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            This Digital Passport serves as a permanent record of provenance. It was issued by a member of the Rare Plant Vendors network and verified against our encrypted registry.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" className="btn-ghost">Registry Home</Link>
            <Link href={`/vendors/${passport.vendors?.id}`} className="btn-primary">View Vendor Profile</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
