'use client';
import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CollectorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push('/collector/profile');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/collector/profile`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 5%', background: 'radial-gradient(circle at top right, #1a2a1a, #0a0a0a)' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'rgba(20, 30, 20, 0.7)', backdropFilter: 'blur(10px)', padding: '3rem 2.5rem', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
        <Image src="/brand-seal.png" alt="RPV Seal" width={80} height={80} style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3))', marginBottom: '1.5rem' }} />
        
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', margin: '0 0 0.5rem', color: '#f5f5f5', letterSpacing: '-0.02em' }}>Collector Access</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Join the elite inner circle of rare plant collectors.</p>
        
        {error && (
          <div style={{ padding: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#f87171', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.875rem', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,255,255,0.1)', 
            background: 'white', 
            color: '#1a1a1a', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            cursor: 'pointer',
            marginBottom: '1.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: 'rgba(255,255,255,0.2)' }}>
          <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="collector@elite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: '#d4af37', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: 'linear-gradient(135deg, #d4af37, #aa8a2e)',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            {loading ? 'Authenticating...' : 'Access Collection Portal'}
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
          New to the directory? <Link href="/collector/signup" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 600 }}>Create an Account</Link>
        </div>
      </div>
    </main>
  );
}
