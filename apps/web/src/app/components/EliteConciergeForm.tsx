'use client';

import React, { useState } from 'react';

interface EliteConciergeFormProps {
  vendorId: string;
  vendorName: string;
}

export default function EliteConciergeForm({ vendorId, vendorName }: EliteConciergeFormProps) {
  const [lookingFor, setLookingFor] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookingFor) {
      setError('Please specify what plant you are looking for.');
      return;
    }
    if (!budget) {
      setError('Please select your budget range.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/vendor/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendor_id: vendorId,
          looking_for: lookingFor,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Concierge form submit error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoTour = () => {
    setLookingFor('Cinematic Greenhouse Tour');
    setMessage('Hello, I would love to request a cinematic video tour or FaceTime walk-through of your latest collections.');
    setError(null);
  };

  if (isSubmitted) {
    return (
      <div className="elite-concierge" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div className="elite-concierge-gem" style={{ margin: '0 auto 1.5rem', animation: 'pulse 1.5s infinite' }}>✦</div>
        <h3 style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>VIP Request Received</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          An Elite concierge grower from <strong>{vendorName}</strong> has been notified of your interest. Priority matching is active. You will be contacted shortly.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setLookingFor('');
            setBudget('');
            setMessage('');
          }}
          className="elite-cta-ghost"
          style={{ width: '100%' }}
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="elite-concierge">
      <div className="elite-concierge-top">
        <div className="elite-concierge-gem">✦</div>
        <div>
          <div className="elite-concierge-title">Elite Concierge</div>
          <div className="elite-concierge-sub">Priority Access · Direct Line</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="elite-concierge-form">
        {error && (
          <div style={{ color: '#ff6b6b', fontSize: '0.8rem', background: 'rgba(255,107,107,0.1)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(255,107,107,0.3)', marginBottom: '1rem' }}>
            ⚠️ {error}
          </div>
        )}

        <div>
          <label className="elite-form-label">I'm looking for...</label>
          <input
            type="text"
            className="elite-input"
            placeholder="Specific plant or genus"
            value={lookingFor}
            onChange={(e) => {
              setLookingFor(e.target.value);
              setError(null);
            }}
          />
        </div>

        <div>
          <label className="elite-form-label">Budget Range</label>
          <div style={{ position: 'relative' }}>
            <select
              className="elite-input"
              style={{ appearance: 'none', cursor: 'pointer', paddingRight: '2.5rem' }}
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                setError(null);
              }}
            >
              <option value="" disabled style={{ background: '#051912', color: '#888' }}>Select an option</option>
              <option value="$500 - $1,000" style={{ background: '#051912', color: '#fff' }}>$500 - $1,000</option>
              <option value="$1,000 - $5,000" style={{ background: '#051912', color: '#fff' }}>$1,000 - $5,000</option>
              <option value="$5,000+" style={{ background: '#051912', color: '#fff' }}>$5,000+</option>
            </select>
            <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gold)', opacity: 0.7 }}>
              ▼
            </div>
          </div>
        </div>

        <div>
          <label className="elite-form-label">Message</label>
          <textarea
            className="elite-textarea"
            placeholder="Any specific requirements..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="elite-cta-primary"
          style={{ marginTop: '0.5rem', width: '100%', border: 'none' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Securing VIP Connection...' : 'Submit VIP Request'}
        </button>

        <button
          type="button"
          className="elite-cta-ghost"
          onClick={handleVideoTour}
          style={{ width: '100%' }}
        >
          Request Video Tour
        </button>
      </form>
    </div>
  );
}
