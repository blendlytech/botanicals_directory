'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Collector } from '@/lib/supabase';

export default function CollectorProfilePage() {
  const [collector, setCollector] = useState<Collector | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/collector/login');
        return;
      }
      
      setUser(user);

      const { data, error } = await supabase
        .from('collectors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setCollector(data);
      }
      
      setLoading(false);
    }

    getProfile();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'white' }}>
        <div className="animate-pulse" style={{ color: 'var(--gold)' }}>Loading Collection...</div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f5f5f5', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #aa8a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
              {collector?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>{collector?.full_name || 'Anonymous Collector'}</h1>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
            Sign Out
          </button>
        </header>

        {/* Profile Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '1rem' }}>Collection Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Wishlist Items</span>
                  <span style={{ fontWeight: 600 }}>0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Digital Passports</span>
                  <span style={{ fontWeight: 600 }}>0</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '1rem' }}>Location</h3>
              <p style={{ margin: 0 }}>{collector?.location_city && collector?.location_country ? `${collector.location_city}, ${collector.location_country}` : 'Not set'}</p>
            </div>
          </aside>

          {/* Main Area */}
          <section>
            {!collector ? (
              <div style={{ background: 'rgba(212,175,55,0.05)', border: '1px dashed rgba(212,175,55,0.3)', padding: '3rem', borderRadius: '24px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Complete Your Profile</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Introduce yourself to the community and start tracking your rare specimens.</p>
                <button className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Initialize Profile</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Collector Biography</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                    {collector.bio || "This collector hasn't added a bio yet."}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Recent Wishlist</h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>No items tracked yet.</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Owned Specimens</h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>No passports claimed.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
