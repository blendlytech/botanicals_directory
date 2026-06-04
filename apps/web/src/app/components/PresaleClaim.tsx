'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { PayPalButton } from '@rpv/ui';
import { Lock, Check, Loader2 } from 'lucide-react';

interface PresaleClaimProps {
  inventoryId: string;
  eventId: string;
  price: number | null;
  depositPct?: number;
  pickupDeadline?: string | null;
  alreadyReserved?: boolean;
}

/**
 * Paid-collector pre-sale reservation with a real 10% holding deposit.
 * Eligibility is checked client-side, then PayPal collects the deposit; the
 * /api/presale/claim route verifies the payment server-side before creating the
 * claim + reserving the plant. See implementation_plan.md §5.
 */
export default function PresaleClaim({ inventoryId, eventId, price, depositPct = 10, pickupDeadline = null, alreadyReserved = false }: PresaleClaimProps) {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'checking' | 'paying' | 'reserved' | 'error'>(alreadyReserved ? 'reserved' : 'idle');
  const [message, setMessage] = useState<string>('');

  const depositAmount = price != null ? Math.round(price * (depositPct / 100) * 100) / 100 : null;
  const deadlineStr = pickupDeadline
    ? new Date(pickupDeadline).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : null;

  async function handleStart() {
    setState('checking');
    setMessage('');
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/collector/login');
      return;
    }
    const { data: collector } = await supabase
      .from('collectors')
      .select('id, tier')
      .eq('user_id', user.id)
      .maybeSingle();
    if (!collector) {
      router.push('/collector/pricing');
      return;
    }
    if ((collector as any).tier !== 'premium') {
      setState('error');
      setMessage('Premium Collector membership required.');
      return;
    }
    if (depositAmount == null) {
      setState('error');
      setMessage('No price set — contact the vendor.');
      return;
    }
    setState('paying');
  }

  const forfeitureNote = (
    <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.4 }}>
      {deadlineStr
        ? <>Retrieve by <strong style={{ color: 'var(--gold)' }}>{deadlineStr}</strong> at the expo or deposit is forfeited.</>
        : 'Pick up in person at the expo by the vendor’s deadline or deposit is forfeited.'}
    </p>
  );

  if (state === 'reserved') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.7rem', borderRadius: '10px', background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.4)', color: '#2ecc71', fontSize: '0.78rem', fontWeight: 700 }}>
          <Check size={15} /> Deposit paid — reserved for you
        </div>
        {deadlineStr && (
          <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.4 }}>
            Pick up by <strong style={{ color: 'var(--gold)' }}>{deadlineStr}</strong> at the expo or the deposit is forfeited.
          </p>
        )}
      </div>
    );
  }

  if (state === 'paying' && depositAmount != null) {
    return (
      <div>
        <div style={{ fontSize: '0.7rem', textAlign: 'center', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
          ${depositAmount.toFixed(2)} deposit ({depositPct}% of ${price?.toFixed(2)})
        </div>
        <PayPalButton
          amount={depositAmount.toFixed(2)}
          vendorId={inventoryId}
          idKey="inventoryId"
          endpoint="/api/presale/claim"
          description="RPV expo pre-sale holding deposit"
          onSuccess={() => setState('reserved')}
        />
        {forfeitureNote}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleStart}
        disabled={state === 'checking'}
        className="btn-primary"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.78rem', padding: '0.7rem' }}
      >
        {state === 'checking' ? <Loader2 size={15} className="animate-spin" /> : <Lock size={14} />}
        {depositAmount != null ? `Hold for $${depositAmount.toFixed(2)} (${depositPct}% down)` : 'Reserve plant'}
      </button>
      {forfeitureNote}
      {message && <p style={{ fontSize: '0.7rem', color: '#e74c3c', marginTop: '0.4rem', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}
