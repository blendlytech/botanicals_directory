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
        .select(`
          *, 
          vendors(id, name, logo_url, location_city, location_state, is_verified, tier),
          inventory(image_url, care_instructions, price)
        `)
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
    <div style={{ minHeight: '100vh', background: '#050505', padding: '0 0 4rem', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden' }}>
        {passport.inventory?.image_url ? (
          <Image 
            src={passport.inventory.image_url} 
            alt={passport.specimen_name} 
            fill 
            style={{ objectFit: 'cover', filter: 'brightness(0.7)' }} 
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #0a1a0f, #050505)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5rem', opacity: 0.1 }}>🌿</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4rem 5%', background: 'linear-gradient(to top, #050505, transparent)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span className="verified-badge" style={{ background: 'var(--gold)', color: 'black', fontWeight: 700 }}>AUTHENTIC SPECIMEN</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ID: {params.hash.toUpperCase()}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', margin: 0, lineHeight: 1 }}>{passport.specimen_name}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--gold)', marginTop: '0.5rem', fontWeight: 500 }}>{passport.inventory?.variety || 'Original Variety'}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-2rem auto 0', padding: '0 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Provenance Card */}
            <div className="onboarding-card" style={{ padding: '2.5rem', border: '1px solid var(--gold-dim)', background: 'rgba(10,26,15,0.8)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Provenance & History</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Propagation Method</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.2rem 0 0' }}>{passport.propagation_method}</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Genetic Origin</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.2rem 0 0' }}>{passport.mother_plant_origin || 'Original Stock'}</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Issuance Date</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.2rem 0 0' }}>{new Date(passport.issued_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Registry Status</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.2rem 0 0', color: '#2ecc71' }}>● Verified Active</p>
                </div>
              </div>
            </div>

            {/* Lead Capture Section */}
            <div className="onboarding-card" style={{ padding: '3rem', border: '2px solid var(--gold)', background: 'linear-gradient(145deg, #0B3D2E, #050505)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>Want this Specimen?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                Join the inner circle of collectors. Add this variety to your digital wishlist to get notified of price drops, availability, and similar rarities from {passport.vendors?.name}.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link href={`/signup?interest=${encodeURIComponent(passport.specimen_name)}&source=qr`} className="btn-primary" style={{ padding: '1rem 2rem' }}>
                  Add to My Wishlist
                </Link>
                <a href={`mailto:${passport.vendors?.contact_email}?subject=Inquiry: ${passport.specimen_name}`} className="btn-ghost" style={{ padding: '1rem 2rem' }}>
                  Contact Vendor
                </a>
              </div>
            </div>

            {/* Care Instructions */}
            {passport.inventory?.care_instructions && (
              <div className="onboarding-card" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Care Guidelines</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {passport.inventory.care_instructions}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Vendor Card */}
            <div className="onboarding-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold)' }}>
                {passport.vendors?.logo_url ? (
                  <Image src={passport.vendors.logo_url} alt={passport.vendors.name} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', fontSize: '2rem' }}>
                    {passport.vendors?.name.charAt(0)}
                  </div>
                )}
              </div>
              <h4 style={{ margin: '0 0 0.2rem', fontSize: '1.1rem' }}>{passport.vendors?.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{passport.vendors?.location_city}, {passport.vendors?.location_state}</p>
              {passport.vendors?.is_verified && (
                <div style={{ fontSize: '0.7rem', background: 'rgba(212,175,55,0.1)', color: 'var(--gold)', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--gold-dim)', marginBottom: '1rem' }}>
                  VERIFIED GROWER
                </div>
              )}
              <Link href={`/vendors/${passport.vendors?.id}`} className="btn-primary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>View Profile</Link>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button 
                onClick={() => window.print()} 
                className="btn-ghost" 
                style={{ width: '100%', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                🖨️ Print Certificate
              </button>
              <button 
                onClick={() => {
                  navigator.share?.({
                    title: `${passport.specimen_name} - CultivarID`,
                    url: window.location.href
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard');
                  });
                }} 
                className="btn-ghost" 
                style={{ width: '100%', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                🔗 Share Showcase
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
