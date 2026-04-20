'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface VendorStats {
  name: string;
  tier: string;
  is_elite: boolean;
  elite_number: number | null;
  subscription_status: string | null;
  inventoryCount: number;
  leadsCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data: vendor } = await supabase
        .from('vendors')
        .select('name, tier, is_elite, elite_number, subscription_status, contact_email')
        .eq('contact_email', user.email)
        .single();

      if (!vendor) { setLoading(false); return; }

      const { count: invCount } = await supabase
        .from('inventory')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', user.id);

      setStats({
        ...vendor,
        inventoryCount: invCount || 0,
        leadsCount: 0,
      });
      setLoading(false);
    }
    loadDashboard();
  }, []);

  if (loading) return <LoadingScreen />;

  const tier = stats?.tier || 'seedling';
  const tierLabel: Record<string, string> = {
    seedling: 'Seedling',
    verified: 'Verified Grower',
    pro: 'Pro Grower',
    elite: 'Elite Grower',
  };
  const inventoryLimit: Record<string, number | null> = {
    seedling: 10, verified: 100, pro: 500, elite: null,
  };
  const limit = inventoryLimit[tier];

  const navItems = [
    { href: '/dashboard', label: '⚡ Overview', active: true },
    { href: '/dashboard/inventory', label: '🌿 Inventory' },
    { href: '/dashboard/leads', label: '🎯 Leads' },
    { href: '/dashboard/passports', label: '📜 Passports' },
    { href: '/dashboard/analytics', label: '📊 Analytics' },
    { href: '/dashboard/settings', label: '⚙️ Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar navItems={navItems} tier={tier} stats={stats} />

      {/* Main */}
      <main style={{ flex: 1, padding: '7rem 3rem 4rem', maxWidth: '900px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
            Vendor Portal
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
            Welcome back{stats?.name ? `, ${stats.name.split(' ')[0]}` : ''}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Here&apos;s a snapshot of your profile and performance.
          </p>
        </div>

        {/* Tier badge card */}
        <div style={{
          background: tier === 'elite'
            ? 'linear-gradient(145deg, rgba(11,61,46,0.6), rgba(212,175,55,0.08))'
            : 'var(--bg-surface)',
          border: `1px solid ${tier === 'elite' ? 'var(--gold)' : 'var(--glass-border)'}`,
          borderRadius: '16px', padding: '2rem', marginBottom: '2rem',
          boxShadow: tier === 'elite' ? '0 0 40px rgba(212,175,55,0.06)' : 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              {tier === 'elite' && <span className="elite-badge">✦ Elite Grower{stats?.elite_number ? ` #${stats.elite_number}` : ''}</span>}
              {tier === 'pro' && <span className="pro-tier-badge">★ Pro Grower</span>}
              {tier === 'verified' && <span className="verified-badge">✓ Verified Grower</span>}
              {tier === 'seedling' && <span className="free-tier-badge">Seedling</span>}
            </div>
            <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {tierLabel[tier]}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Status: <span style={{ color: stats?.subscription_status === 'active' ? '#2ecc71' : 'var(--gold)', fontWeight: 600, textTransform: 'capitalize' }}>
                {stats?.subscription_status || 'Pending'}
              </span>
            </div>
          </div>
          {tier === 'seedling' && (
            <Link href="/for-vendors" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.8rem' }}>
              Upgrade My Tier →
            </Link>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          <StatCard icon="🌿" label="Inventory Items" value={stats?.inventoryCount ?? 0} note={limit ? `of ${limit} max` : 'Unlimited'} />
          <StatCard icon="🎯" label="Active Leads" value={stats?.leadsCount ?? 0} note="Wishlist matches" />
          <StatCard icon="📊" label="Profile Views" value="—" note="Coming soon" />
          <StatCard icon="⭐" label="Events Listed" value="—" note="Coming soon" />
        </div>

        {/* Quick actions */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <QuickAction href="/dashboard/inventory" icon="➕" title="Add Inventory" desc="List a new plant for collectors to discover" />
          <QuickAction href="/dashboard/leads" icon="🎯" title="View Leads" desc="See collector wishlist matches for your plants" />
          <QuickAction href={`/vendors`} icon="👁️" title="Preview Profile" desc="See your public-facing vendor profile" />
          {tier === 'seedling' && (
            <QuickAction href="/for-vendors" icon="⚡" title="Upgrade Tier" desc="Unlock verified badge, more inventory & leads" gold />
          )}
        </div>
      </main>
    </div>
  );
}

/* ── Sub-components ── */

function Sidebar({ navItems, tier, stats }: { navItems: any[]; tier: string; stats: VendorStats | null }) {
  return (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--glass-border)',
      padding: '7rem 1.5rem 2rem',
      display: 'flex', flexDirection: 'column', gap: '0.25rem',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Vendor Portal
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {stats?.name || 'My Nursery'}
        </div>
      </div>

      {navItems.map((item) => (
        <Link key={item.href} href={item.href} style={{
          display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none',
          fontSize: '0.88rem', fontWeight: item.active ? 700 : 500,
          color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
          background: item.active ? 'rgba(255,255,255,0.07)' : 'transparent',
          transition: 'all 0.15s ease',
        }}>
          {item.label}
        </Link>
      ))}

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <Link href="/" style={{ display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          ← Back to Directory
        </Link>
      </div>
    </aside>
  );
}

function StatCard({ icon, label, value, note }: { icon: string; label: string; value: number | string; note: string }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>{label}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', opacity: 0.6 }}>{note}</div>
    </div>
  );
}

function QuickAction({ href, icon, title, desc, gold }: { href: string; icon: string; title: string; desc: string; gold?: boolean }) {
  return (
    <Link href={href} style={{
      display: 'block', padding: '1.5rem', borderRadius: '12px', textDecoration: 'none',
      background: gold ? 'rgba(212,175,55,0.05)' : 'var(--bg-surface)',
      border: `1px solid ${gold ? 'rgba(212,175,55,0.3)' : 'var(--glass-border)'}`,
      transition: 'all 0.2s ease',
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{icon}</div>
      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: gold ? 'var(--gold)' : 'var(--text-primary)', marginBottom: '0.3rem' }}>{title}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
    </Link>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'floatLeaf 2s ease-in-out infinite' }}>🌿</div>
        <p style={{ fontSize: '0.9rem' }}>Loading your dashboard...</p>
      </div>
    </div>
  );
}
