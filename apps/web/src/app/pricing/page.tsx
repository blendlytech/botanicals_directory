import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="section" style={{ paddingTop: '10rem', maxWidth: 1000, margin: '0 auto', paddingBottom: '5rem' }}>
      <p className="section-eyebrow">Directory first · Expo pilot next</p>
      <h1 className="section-title">Start with a <em>free listing.</em></h1>
      <p className="section-desc">Claiming your business profile does not require a paid membership or a card.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
        <section className="vendor-card" style={{ padding: '2rem' }}>
          <h2>Directory listing</h2><p style={{ fontSize: '2rem' }}>Free</p>
          <p>Request ownership, complete a review, and manage your business details.</p>
          <Link href="/vendors" className="btn-primary">Find your listing</Link>
        </section>
        <section className="vendor-card" style={{ padding: '2rem' }}>
          <h2>Vendor Pro pilot</h2>
          <p>Planned pricing: <strong>$24.99/month or $249/year</strong>.</p>
          <p>We are preparing Stripe billing and an expo workflow for inventory, reservations, and pickup. These are proposed pilot prices; this page does not collect payment.</p>
          <Link href="/for-vendors" className="btn-ghost">Explore the pilot</Link>
        </section>
      </div>
      <h2>Clear terms before checkout</h2>
      <p>Any future membership checkout will state the renewal date, cancellation terms, and included features. Payment processing costs will be disclosed separately from membership pricing.</p>
      <p>Paid membership is not ownership verification or a guarantee of plant authenticity. Organizer rewards in the new model will come from RPV revenue, not the buyer’s plant deposit.</p>
      <h2>Already purchased a membership?</h2>
      <p>Your existing purchase and any founding benefits remain subject to the terms you purchased. We will reconcile those benefits before migrating billing. <Link href="/login">Sign in to your account.</Link></p>
    </main>
  );
}
