'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ClaimForm({ vendorId, slug, signedIn, alreadyManaged, email: accountEmail }: {
  vendorId: string; slug: string; signedIn: boolean; alreadyManaged: boolean; email: string;
}) {
  const [email, setEmail] = useState(accountEmail);
  const [evidence, setEvidence] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage('');
    try {
      const next = '/claim/' + slug;
      const { error } = await createClient().auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin + '/auth/callback?next=' + encodeURIComponent(next) },
      });
      if (error) throw error;
      setMessage('Check your email for a sign-in link. Open it in this browser, then return here to submit your claim.');
    } catch {
      setMessage('We could not send the sign-in link. Please wait a moment and try again.');
    } finally { setBusy(false); }
  }

  async function submitClaim(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/vendor/claim', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId, evidence }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not submit your claim.');
      setSubmitted(true);
      setMessage('Your claim is saved for review. No payment is required. After approval, sign in to manage your listing.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Please try again.');
    } finally { setBusy(false); }
  }

  return (
    <section style={{ marginTop: '2rem', padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: 16 }}>
      {!signedIn ? (
        <form onSubmit={sendLink}>
          <label htmlFor="claim-email" className="form-label">Your business email</label>
          <input id="claim-email" className="form-input" type="email" autoComplete="email"
            maxLength={254} required value={email} onChange={e => setEmail(e.target.value)} />
          <button className="btn-primary" type="submit" disabled={busy} style={{ marginTop: '1rem' }}>
            {busy ? 'Sending…' : 'Email me a sign-in link'}
          </button>
        </form>
      ) : (
        <>
          <p>Signed in as {accountEmail}.</p>
          {!alreadyManaged && !submitted && (
            <form onSubmit={submitClaim}>
              <label htmlFor="claim-evidence" className="form-label">How can we confirm you represent this business?</label>
              <p id="claim-help">Include your role and the business website or social profile where we can contact you. Do not send passwords, identity documents, or payment details.</p>
              <textarea id="claim-evidence" className="form-input" rows={5} required minLength={20} maxLength={2000}
                aria-describedby="claim-help" value={evidence} onChange={e => setEvidence(e.target.value)} />
              <button className="btn-primary" type="submit" disabled={busy} style={{ marginTop: '1rem' }}>
                {busy ? 'Saving…' : 'Submit free claim for review'}
              </button>
            </form>
          )}
          <button className="btn-ghost" type="button" disabled={busy} style={{ marginTop: '1rem' }}
            onClick={async () => {
              setBusy(true);
              const { error } = await createClient().auth.signOut();
              if (error) { setMessage('Could not sign out. Please try again.'); setBusy(false); return; }
              router.refresh(); setBusy(false);
            }}>Use another account</button>
        </>
      )}
      <p role="status" aria-live="polite">{message}</p>
    </section>
  );
}
