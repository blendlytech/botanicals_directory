'use client';
import Image from 'next/image';

export default function EliteRules() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--text-primary)',
      padding: '8rem 5% 4rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <Image src="/brand-seal.png" alt="RPV" width={80} height={80} style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem' }}>
          Elite 100 Founding Status
        </h1>
        <p style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          One-Time Investment. Lifetime Ownership.
        </p>
      </div>

      <section style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The first 100 vendors to claim an Elite Grower seat pay <strong>$999 once</strong> and are locked in for life. 
          No annual fees. No transaction fees. As long as you stay in <strong>Good Standing</strong>, the seat is yours permanently.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          The Good Standing Rules
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>1. Active Inventory</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Maintain a minimum of <strong>10 active inventory items</strong>. Your storefront must be refreshed 
              (new items, updates, or status changes) at least once every 6 months to ensure collectors are seeing current offerings.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>2. Profile Freshness</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Your profile (Bio, Photos, or Tags) must be updated at least <strong>once per calendar year</strong>. 
              The Elite 100 represent the "Rolex of Plant Sites" — your profile must reflect that quality.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>3. Marketplace Responsiveness</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Elite status is a badge of ultimate trust. You must maintain an average response rate to buyer inquiries 
              of under <strong>72 hours</strong>. Consistent silence will trigger a status review.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>4. Community Standards</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Zero unresolved disputes with buyers. Elite vendors are expected to lead the industry in ethical sourcing 
              and professional shipping practices.
            </p>
          </div>
        </div>
      </section>

      <div style={{ 
        background: 'var(--bg-surface)', 
        border: '1px solid var(--gold)', 
        padding: '2.5rem', 
        borderRadius: '12px', 
        textAlign: 'center',
        boxShadow: 'var(--card-shadow)'
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>Ready to Secure Your Legacy?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Once all 100 seats are claimed, this offer closes forever. 
          Seats that are forfeited due to lack of activity will be re-listed at future market rates.
        </p>
        <a href="/onboarding" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Back to Onboarding & Paywall ✦
        </a>
      </div>

      <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
        *Failure to meet Good Standing requirements will result in a 30-day warning period. 
        If not remedied, the Lifetime seat is forfeited without refund.
      </p>
    </div>
  );
}
