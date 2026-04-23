export default function PrivacyPage() {
  return (
    <main className="page-wrapper" style={{ padding: '10rem 5% 5rem', background: 'var(--bg)' }}>
      <div className="section-header">
        <h1 className="section-title">Privacy <em>Policy</em></h1>
        <p className="section-desc">Last Updated: April 23, 2026</p>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p>
            We collect your business name, professional email, and botanical specialties to build your directory profile. 
            Payment information is handled exclusively by PayPal; we do not store your credit card or bank details on our servers.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>2. How We Use Your Data</h2>
          <p>
            Your data is used to populate the Rare Plant Vendors directory, generate CultivarID provenance records, 
            and route collector leads to your business. We never sell your personal data to third-party marketing companies.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Public Profile Information</h2>
          <p>
            By claiming a vendor profile, you agree that your nursery name, location (City/State), and specialty 
            will be visible to the public to facilitate botanical commerce.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>4. Security</h2>
          <p>
            We use industry-standard encryption and Supabase-backed security protocols to protect your account and your 
            botanical records.
          </p>
        </section>
      </div>
    </main>
  );
}
