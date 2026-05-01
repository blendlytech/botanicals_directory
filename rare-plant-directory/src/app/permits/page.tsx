import { ShieldCheck, TrendingUp, Zap, CheckCircle, Database } from 'lucide-react';
import Link from "next/link";

export default function PermitsLanding() {
  return (
    <div className="page-wrapper" style={{ background: '#040806', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ─── SCARCITY ALERT ─── */}
      <div style={{ 
        background: '#D4AF37', 
        color: 'black', 
        padding: '0.75rem 5%', 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        fontWeight: 800, 
        letterSpacing: '0.15em',
        position: 'sticky',
        top: '0',
        zIndex: 1000
      }}>
        FLORIDA EXPANSION: LEON, POLK, PASCO, & HILLSBOROUGH NOW LIVE
      </div>

      <section style={{ padding: '8rem 5% 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.5rem 1rem', 
          background: 'rgba(212, 175, 55, 0.1)', 
          border: '1px solid rgba(212, 175, 55, 0.3)', 
          borderRadius: '100px', 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          color: '#D4AF37',
          marginBottom: '2rem'
        }}>
          <div style={{ width: '6px', height: '6px', background: '#D4AF37', borderRadius: '50%' }}></div>
          <span>Exclusive Data for Contractors</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
          Stop chasing leads.<br />
          <span style={{ color: '#D4AF37' }}>Let the permits come to you.</span>
        </h1>
        
        <p style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6 }}>
          We use proprietary monitoring tech to pull every new homeowner-filed building permit in Florida. 
          Get exclusive access to the high-intent jobs in your county before anyone else.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="mailto:info@rareplantvendors.com?subject=Permit%20Sample%20Request" style={{ 
            background: '#D4AF37', 
            color: 'black', 
            padding: '1.25rem 3rem', 
            borderRadius: '16px', 
            fontWeight: 700, 
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
          }}>
            Request Free Sample List
          </Link>
          <Link href="#pricing" style={{ 
            background: 'transparent', 
            color: 'white', 
            padding: '1.25rem 3rem', 
            borderRadius: '16px', 
            fontWeight: 700, 
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            View Pricing
          </Link>
        </div>
      </section>

      {/* ─── VALUE PROPS ─── */}
      <section style={{ padding: '6rem 5%', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
            <Zap color="#D4AF37" size={40} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Zero Competition</h3>
            <p style={{ opacity: 0.7 }}>We filter for homeowner-filed permits only. These homeowners haven't hired a contractor yet. You are the first call.</p>
          </div>
          <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
            <ShieldCheck color="#D4AF37" size={40} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Total Exclusivity</h3>
            <p style={{ opacity: 0.7 }}>One slot per trade, per county. We never sell the same data to two competitors in the same territory.</p>
          </div>
          <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
            <Database color="#D4AF37" size={40} style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Verified Accuracy</h3>
            <p style={{ opacity: 0.7 }}>Address, Owner Name, and Job Valuation included. Clean, actionable CSVs delivered every Friday morning.</p>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Pricing & <em style={{ color: '#D4AF37' }}>Availability</em></h2>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#0B3D2E', padding: '4rem 3rem', borderRadius: '40px', border: '4px solid #D4AF37', boxShadow: '0 30px 100px rgba(212,175,55,0.15)' }}>
          <div style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>EXCLUSIVE ACCESS</div>
          <div style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1rem' }}>$299<span style={{ fontSize: '1.5rem', opacity: 0.5 }}>/mo</span></div>
          <p style={{ opacity: 0.8, marginBottom: '2.5rem' }}>Full weekly delivery of all homeowner-filed permits in your county.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', textAlign: 'left', display: 'grid', gap: '1rem' }}>
             <li style={{ display: 'flex', gap: '0.75rem' }}><CheckCircle color="#D4AF37" size={20} /> Exclusive County Rights</li>
             <li style={{ display: 'flex', gap: '0.75rem' }}><CheckCircle color="#D4AF37" size={20} /> Verified Homeowner Filter</li>
             <li style={{ display: 'flex', gap: '0.75rem' }}><CheckCircle color="#D4AF37" size={20} /> Friday AM Delivery</li>
             <li style={{ display: 'flex', gap: '0.75rem' }}><CheckCircle color="#D4AF37" size={20} /> No Long-term Contracts</li>
          </ul>
          <Link href="mailto:info@rareplantvendors.com?subject=Secure%20County%20Slot" style={{ 
            display: 'block', 
            padding: '1.25rem', 
            borderRadius: '16px', 
            background: '#D4AF37', 
            color: 'black', 
            fontWeight: 700, 
            textDecoration: 'none' 
          }}>
            Claim Your Territory →
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '4rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.6, fontSize: '0.9rem' }}>
        &copy; 2026 RPV Data Systems | PermitLeads Division
      </footer>

    </div>
  );
}
