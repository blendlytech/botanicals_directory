import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, Droplets, ShieldCheck, Star, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Demo Passport | CultivarID™",
  description: "View a live demo of the CultivarID digital birth certificate.",
};

export default function CultivarIDDemoPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050505', padding: '0 0 4rem', color: 'var(--text-primary)' }}>
      {/* Elite Header */}
      <div style={{ 
        background: 'linear-gradient(90deg, #c9a84c, #8e732e)', 
        color: 'black', 
        textAlign: 'center', 
        padding: '0.6rem', 
        fontSize: '0.7rem', 
        fontWeight: 800, 
        letterSpacing: '0.2em',
        textTransform: 'uppercase'
      }}>
        ✧ CultivarID™ Demo Environment • Elite Specimen ✧
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '55vh', width: '100%', overflow: 'hidden' }}>
        <Image
          src="/monstera_nfc_tag.png"
          alt="Monstera Deliciosa Albo with CultivarID NFC Tag"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, #050505 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4rem 5%', background: 'linear-gradient(to top, #050505, transparent)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'rgba(46, 204, 113, 0.2)', 
                color: '#2ecc71', 
                padding: '0.4rem 1rem', 
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 700,
                border: '1px solid rgba(46, 204, 113, 0.3)'
              }}>
                <CheckCircle size={14} />
                <span>AUTHENTICITY GUARANTEED</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600 }}>ID: CULTIVAR-DEMO-X9F2</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', margin: 0, lineHeight: 0.9 }}>Monstera Deliciosa Albo</h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--gold)', marginTop: '0.75rem', fontWeight: 500, fontStyle: 'italic' }}>High-Variegation Borsigiana</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-3rem auto 0', padding: '0 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Provenance Card */}
            <div className="onboarding-card" style={{ padding: '2.5rem', border: '1px solid var(--gold-dim)', background: 'rgba(10,26,15,0.7)', backdropFilter: 'blur(20px)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={20} /> Provenance & Registry
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>Propagation</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.3rem 0 0', fontWeight: 600 }}>Top Cutting (Node 1)</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>Genetic Lineage</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.3rem 0 0', fontWeight: 600 }}>Florida Mother Stock #8</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>Registered On</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.3rem 0 0', fontWeight: 600 }}>May 30, 2026</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>Ownership</label>
                  <p style={{ fontSize: '1.1rem', margin: '0.3rem 0 0', color: '#f39c12', fontWeight: 700 }}>○ UNCLAIMED (FOR SALE)</p>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
                  This digital passport is currently unclaimed. The buyer of this specimen will tap the NFC tag to securely claim it to their collector profile.
                </p>
                <button 
                  disabled
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', opacity: 0.5, cursor: 'not-allowed' }}
                >
                  <ShieldCheck size={20} /> Claim Digital Passport (Demo)
                </button>
              </div>
            </div>

            {/* Smart Care Insights */}
            <div className="onboarding-card" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Droplets size={20} color="var(--gold)" /> Smart Care Insights
                </h3>
                <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>High Humidity Recommended</div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>Every 7-9</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Days Between Water</div>
                </div>
                <div style={{ flex: 1, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>Bright-In</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ideal Light Intensity</div>
                </div>
              </div>

              <div style={{ position: 'relative', padding: '1rem 0' }}>
                 <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, background: 'rgba(212,175,55,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.1)' }}>
                   <strong>Expert Note:</strong> This highly variegated specimen requires stable temperatures between 65-85°F. Maintain high humidity (60%+) for optimal leaf development to prevent the white sectors from browning.
                 </div>
              </div>
            </div>
            
            {/* Purchase CTA */}
            <div className="onboarding-card" style={{ 
              padding: '3rem', 
              border: '2px solid var(--gold)', 
              background: 'linear-gradient(135deg, #0a1f18, #050505)', 
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>✨</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '1rem', color: 'white' }}>Acquire this Variety</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Secure your own Monstera Albo directly from Demo Nursery Co. Registered specimens come with full CultivarID provenance certificates.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '1.2rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Shop Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Vendor Card */}
            <div className="onboarding-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid var(--gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Star size={24} color="var(--gold)" fill="var(--gold)" />
              </div>
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--gold)' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', fontSize: '2.5rem', fontWeight: 700 }}>
                  DN
                </div>
              </div>
              <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>Demo Nursery Co.</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Miami, FL</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>View Vendor Profile</button>
                <button className="btn-ghost" style={{ width: '100%', fontSize: '0.85rem' }}>Contact Vendor</button>
              </div>
            </div>

            {/* Explainer Sidebar Box */}
            <div style={{ padding: '2rem', background: 'rgba(212,175,55,0.05)', borderRadius: '16px', border: '1px dashed var(--gold)', textAlign: 'center' }}>
               <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Ready to Secure Your Own?</h4>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                 This is a live example of what your buyers see when they tap a CultivarID tag. Give them absolute confidence and command premium pricing.
               </p>
               <Link href="/onboarding?plan=elite" className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                 Get the Elite Founders Package
               </Link>
            </div>
            
          </aside>

        </div>
      </div>
    </div>
  );
}
