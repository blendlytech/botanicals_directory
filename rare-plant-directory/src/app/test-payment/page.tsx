'use client';

import PayPalButton from '../components/PayPalButton';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TestPaymentPage() {
  const [success, setSuccess] = useState(false);
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [mockLoading, setMockLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  useEffect(() => {
    async function fetchVendors() {
      const supabase = createClient();
      const { data } = await supabase
        .from('vendors')
        .select('id, name, subscription_status')
        .eq('subscription_status', 'pending_payment')
        .limit(5);
      
      if (data && data.length > 0) {
        setPendingVendors(data);
        setSelectedVendorId(data[0].id);
      }
    }
    fetchVendors();
  }, []);

  const runMockPayment = async () => {
    if (!selectedVendorId) return;
    setMockLoading(true);
    addLog(`Initiating mock payment for Vendor: ${selectedVendorId}...`);

    try {
      const res = await fetch('/api/vendor/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: selectedVendorId,
          orderId: `MOCK-ORDER-${Math.random().toString(36).substring(7).toUpperCase()}`,
          planId: 'elite',
          details: { status: 'COMPLETED', payer: { name: { given_name: 'Mock' } } }
        })
      });

      const result = await res.json();
      if (res.ok) {
        addLog('✅ API Response: Success!');
        addLog(`✅ New Tier: ${result.vendor.tier}`);
        addLog(`✅ Status: ${result.vendor.subscription_status}`);
        setSuccess(true);
      } else {
        addLog(`❌ API Error: ${result.error}`);
      }
    } catch (err: any) {
      addLog(`❌ Network Error: ${err.message}`);
    } finally {
      setMockLoading(false);
    }
  };

  return (
    <main className="hero" style={{ minHeight: '100vh', padding: '10rem 5%' }}>
      <div className="hero-grid-overlay"></div>
      
      <div style={{ 
        maxWidth: '800px', 
        width: '100%', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Column: Real PayPal Test */}
        <div style={{ 
          background: 'var(--bg-card)', 
          padding: '2.5rem', 
          borderRadius: '24px', 
          border: '1px solid var(--glass-border)',
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gold)' }}>Real PayPal Check</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Verify your <strong>Client ID</strong> is active. Requires a real PayPal sandbox/live account.
          </p>

          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <PayPalButton 
              amount="1.00" 
              vendorId={selectedVendorId} 
              onSuccess={() => setSuccess(true)} 
            />
          </div>
          
          <div style={{ fontSize: '0.65rem', opacity: 0.5, wordBreak: 'break-all' }}>
            Target Vendor: {selectedVendorId || 'None found'}
          </div>
        </div>

        {/* Right Column: Simulation Suite */}
        <div style={{ 
          background: 'var(--charcoal)', 
          padding: '2.5rem', 
          borderRadius: '24px', 
          border: '1px solid var(--gold)',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gold)' }}>Simulation Suite</h2>
          <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
            Bypass PayPal SDK and test the <strong>Backend Logic</strong> directly.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
              Select Pending Vendor
            </label>
            <select 
              value={selectedVendorId} 
              onChange={(e) => setSelectedVendorId(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '8px' }}
            >
              {pendingVendors.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.id.slice(0,8)})</option>
              ))}
              {pendingVendors.length === 0 && <option>No pending vendors found</option>}
            </select>
          </div>

          <button 
            onClick={runMockPayment} 
            disabled={mockLoading || !selectedVendorId}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'var(--gold)', 
              color: 'var(--charcoal)', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: 800, 
              cursor: 'pointer',
              opacity: (mockLoading || !selectedVendorId) ? 0.5 : 1
            }}
          >
            {mockLoading ? 'Simulating...' : 'Trigger Mock Success'}
          </button>

          <div style={{ 
            marginTop: '2rem', 
            background: 'black', 
            padding: '1rem', 
            borderRadius: '12px', 
            fontFamily: 'monospace', 
            fontSize: '0.7rem',
            height: '150px',
            overflowY: 'auto',
            border: '1px solid #222'
          }}>
            <div style={{ color: '#0f0', marginBottom: '0.5rem' }}>RPV_PAYMENT_LOG ></div>
            {log.map((line, i) => <div key={i} style={{ marginBottom: '4px' }}>{line}</div>)}
            {log.length === 0 && <div style={{ opacity: 0.3 }}>Waiting for action...</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
