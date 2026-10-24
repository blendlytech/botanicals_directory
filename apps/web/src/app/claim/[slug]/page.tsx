import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ClaimForm from './ClaimForm';

export const dynamic = 'force-dynamic';

export default async function ClaimPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: vendor, error } = await supabase.from('vendors')
    .select('id, name, slug, user_id').eq('slug', params.slug).single();
  if (error || !vendor) notFound();
  const { data: { user } } = await supabase.auth.getUser();
  const ownsListing = !!user && vendor.user_id === user.id;
  return (
    <main className="section" style={{ maxWidth: 760, margin: '0 auto', paddingTop: '9rem', paddingBottom: '5rem' }}>
      <Link href={`/vendors/${vendor.slug}`}>← Back to listing</Link>
      <p className="section-eyebrow" style={{ marginTop: '2rem' }}>Free directory listing</p>
      <h1 className="section-title">Claim {vendor.name}</h1>
      <p className="section-desc">Manage how your business appears in the directory. Claiming is free, with no card or membership purchase required.</p>
      {ownsListing ? (
        <p>You already manage this listing. <Link href="/dashboard/settings">Edit your profile →</Link></p>
      ) : vendor.user_id ? (
        <p>This listing already has an account manager. If that is you, sign in using the form below. Ownership changes require review; another account cannot take over this listing.</p>
      ) : (
        <p>First confirm your email. Then tell us how to verify your connection to the business. We review claims before granting editing access. Email confirmation alone does not prove business ownership.</p>
      )}
      {!ownsListing && <ClaimForm vendorId={vendor.id} slug={vendor.slug}
        signedIn={!!user?.email_confirmed_at} alreadyManaged={!!vendor.user_id}
        email={user?.email || ''} />}
      <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>A claim review checks who manages the listing. It is not a guarantee of plant quality, genetics, or future transactions.</p>
    </main>
  );
}
