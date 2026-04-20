'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface AnalyticsData {
  totalViews: number;
  recentViews: number;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendorName, setVendorName] = useState('');

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data: vendor } = await supabase
        .from('vendors')
        .select('id, name')
        .eq('contact_email', user.email)
        .single();

      if (!vendor) { setLoading(false); return; }
      setVendorName(vendor.name);

      // Get all views
      const { count: totalViews } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendor.id)
        .eq('event_type', 'profile_view');

      // Get recent views (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { count: recentViews } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendor.id)
        .eq('event_type', 'profile_view')
        .gte('created_at', sevenDaysAgo);

      setData({
        totalViews: totalViews || 0,
        recentViews: recentViews || 0
      });
      setLoading(false);
    }
    load();
  }, []);

  const navItems = [
    { href: '/dashboard', label: '⚡ Overview' },
    { href: '/dashboard/inventory', label: '🌿 Inventory' },
    { href: '/dashboard/leads', label: '🎯 Leads' },
    { href: '/dashboard/analytics', label: '📊 Analytics', active: true },
    { href: '/dashboard/settings', label: '⚙️ Settings' },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--glass-border)', padding: '7rem 1.5rem 2rem' }}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} style={{
            display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none',
            fontSize: '0.88rem', fontWeight: item.active ? 700 : 500,
            color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: item.active ? 'rgba(255,255,255,0.07)' : 'transparent',
            marginBottom: '0.25rem',
          }}>
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link href="/" style={{ display: 'block', padding: '0.65rem 1rem', textDecoration: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ← Directory
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '7rem 3rem 4rem', maxWidth: '900px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            Performance Metrics
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', margin: 0, color: 'var(--text-primary)' }}>Profile Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
            Track how collectors are discovering and engaging with {vendorName}.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>👁️</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {data?.recentViews || 0}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>Views (Last 7 Days)</div>
            <div style={{ fontSize: '0.75rem', color: '#2ecc71' }}>Active traffic</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📈</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {data?.totalViews || 0}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>Total Profile Views</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.6 }}>All-time metric</div>
          </div>
          
          {/* Placeholders for future features */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', opacity: 0.5 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>—</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>Search Impressions</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>Coming soon</div>
          </div>
        </div>
      </main>
    </div>
  );
}
