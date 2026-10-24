import Link from 'next/link';

export default function CollectorPricingPage() {
  return (
    <main className="section" style={{ paddingTop: '10rem', maxWidth: 850, margin: '0 auto', paddingBottom: '5rem' }}>
      <p className="section-eyebrow">For collectors</p>
      <h1 className="section-title">Find growers. <em>Plan your next show.</em></h1>
      <p className="section-desc">Browse the vendor directory and event information for free. Confirm availability, entry tickets, and pickup arrangements directly with the seller and organizer.</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0' }}>
        <Link href="/vendors" className="btn-primary">Browse vendors</Link>
        <Link href="/events" className="btn-ghost">Explore events</Link>
      </div>
      <h2>The next expo pilot</h2>
      <p>We plan to offer collector participation without a paid collector membership during the pilot. New Stripe reservation checkout is still being prepared; free directory access does not yet unlock existing premium reservation pages.</p>
      <p>Before the pilot opens, each reservation will show the exact plant, seller, deposit credited toward its price, remaining balance, pickup deadline, and cancellation rules. Event admission is separate.</p>
      <h2>Existing collector members</h2>
      <p>Your current access is unchanged. <Link href="/collector/login">Sign in to your account.</Link> Existing benefits will be reviewed before any billing migration.</p>
    </main>
  );
}
