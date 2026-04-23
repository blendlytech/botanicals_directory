export default function TermsPage() {
  return (
    <main className="page-wrapper" style={{ padding: '10rem 5% 5rem', background: 'var(--bg)' }}>
      <div className="section-header">
        <h1 className="section-title">Terms of <em>Service</em></h1>
        <p className="section-desc">Last Updated: April 23, 2026</p>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>1. The Botanical Marketplace</h2>
          <p>
            Rare Plant Vendors (RPV) provides a digital platform for botanical provenance and vendor directory services. 
            By using our "CultivarID" system or directory services, you agree to these terms.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>2. Founding Member Status</h2>
          <p>
            "Founder" or "Elite Lifetime" status is a one-time payment that grants perpetual access to the RPV Authority Suite features, 
            including CultivarID creation and priority map routing. This status is non-transferable unless explicitly authorized by RPV.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Payments and Refunds</h2>
          <p>
            All payments are processed securely via PayPal. Due to the immediate delivery of digital authority status and 
            backend setup services, all "Founder" and "Elite" payments are non-refundable after the first 24 hours of account activation.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>4. Content and Provenance</h2>
          <p>
            Vendors are responsible for the accuracy of their plant data and provenance records. RPV acts as a secure 
            ledger but does not verify the physical condition of botanical specimens. Misrepresentation of species or 
            lineage may result in immediate revocation of "Verified" status.
          </p>
        </section>
      </div>
    </main>
  );
}
