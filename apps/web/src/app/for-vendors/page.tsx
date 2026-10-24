import Link from 'next/link';

export default function ForVendorsPage() {
  return (
    <main className="page-wrapper">
      <section className="section" style={{ paddingTop: '10rem', maxWidth: 1100, margin: '0 auto' }}>
        <p className="section-eyebrow">For rare plant vendors</p>
        <h1 className="section-title">Help collectors find <em>your next show.</em></h1>
        <p className="section-desc">Start with a free directory profile. We are preparing an expo pilot to help growers publish what they are bringing, organize reservations, and manage pickup.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <Link href="/vendors" className="btn-primary">Find and claim your free listing</Link>
          <Link href="/pricing" className="btn-ghost">See the pilot direction</Link>
        </div>
      </section>
      <section className="section" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className="section-title">A useful profile <em>comes first.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            ['Find your business', 'Search the directory before creating another listing.'],
            ['Confirm who manages it', 'Sign in by email and submit your connection to the business for review. Claiming is free.'],
            ['Keep details current', 'After approval, manage your profile and give collectors a reliable way to contact you.'],
          ].map(([title, description]) => <article key={title} className="vendor-card" style={{ padding: '2rem' }}>
            <h3>{title}</h3><p>{description}</p>
          </article>)}
        </div>
      </section>
      <section className="section" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className="section-title">Built around <em>expo preparation.</em></h2>
        <p className="section-desc">The next pilot focuses on event inventory, clear deposits, packing lists, and pickup confirmation. Stripe checkout and seller payouts must be ready before the new reservation offer launches.</p>
        <p>Plant deposits will count toward the seller’s plant price. Processing fees, pickup deadlines, and cancellation terms will be shown before checkout.</p>
        <h3>CultivarID: a separate nursery pilot</h3>
        <p>Plant records can document a grower’s stated lineage and supporting evidence. A digital record or NFC tag does not independently prove genetics or replace official plant-health documents.</p>
        <p>Already a member? <Link href="/login">Sign in to your existing account.</Link> Existing purchases and benefits are not changed by this pilot announcement.</p>
      </section>
    </main>
  );
}
