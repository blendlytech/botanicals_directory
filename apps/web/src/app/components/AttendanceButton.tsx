'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CalendarCheck, Users, Loader2, Sparkles, LogIn, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AttendanceButtonProps {
  eventId: string;
  eventName: string;
  isDetailedPage?: boolean;
}

export default function AttendanceButton({ eventId, eventName, isDetailedPage = false }: AttendanceButtonProps) {
  const [count, setCount] = useState<number>(0);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [collectorId, setCollectorId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const supabase = createClient();
  const router = useRouter();

  // Load initial attendance state
  useEffect(() => {
    async function loadAttendanceData() {
      try {
        // 1. Fetch total count of collectors attending
        const { count: attCount, error: countErr } = await supabase
          .from('event_attendance')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', eventId);

        if (!countErr && attCount !== null) {
          setCount(attCount);
        }

        // 2. Check if user is logged in
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);

          // 3. Fetch collector profile
          const { data: collector, error: colErr } = await supabase
            .from('collectors')
            .select('id')
            .eq('user_id', currentUser.id)
            .maybeSingle();

          if (collector) {
            setCollectorId(collector.id);

            // 4. Check if currently attending
            const { data: attendance, error: attErr } = await supabase
              .from('event_attendance')
              .select('id')
              .eq('event_id', eventId)
              .eq('collector_id', collector.id)
              .maybeSingle();

            if (attendance) {
              setIsAttending(true);
            }
          }
        }
      } catch (err) {
        console.error('Error loading attendance data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAttendanceData();
  }, [eventId, supabase]);

  const handleToggleAttendance = async (e: React.MouseEvent) => {
    // Stop propagation so it doesn't trigger card clicks (in list views)
    e.preventDefault();
    e.stopPropagation();

    if (actionLoading) return;

    // If not logged in, trigger our gorgeous custom login modal
    if (!user) {
      setShowModal(true);
      return;
    }

    // If logged in but doesn't have a collector profile (e.g. they are a vendor or onboarding not complete)
    if (!collectorId) {
      router.push('/onboarding?type=collector');
      return;
    }

    setActionLoading(true);

    try {
      if (isAttending) {
        // Remove attendance record
        const { error } = await supabase
          .from('event_attendance')
          .delete()
          .eq('event_id', eventId)
          .eq('collector_id', collectorId);

        if (!error) {
          setIsAttending(false);
          setCount(prev => Math.max(0, prev - 1));
        }
      } else {
        // Add attendance record
        const { error } = await supabase
          .from('event_attendance')
          .insert({
            event_id: eventId,
            collector_id: collectorId
          });

        if (!error) {
          setIsAttending(true);
          setCount(prev => prev + 1);
        }
      }
    } catch (err) {
      console.error('Error toggling attendance:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/collector/login');
  };

  const handleSignupRedirect = () => {
    router.push('/collector/signup');
  };

  if (loading) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
        <Loader2 size={16} className="animate-spin" style={{ color: 'var(--gold)' }} />
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Loading RSVP status...</span>
      </div>
    );
  }

  return (
    <>
      <div 
        style={{ 
          display: 'inline-flex', 
          flexDirection: isDetailedPage ? 'row' : 'column',
          alignItems: isDetailedPage ? 'center' : 'flex-start',
          gap: '0.75rem',
          width: isDetailedPage ? 'auto' : '100%'
        }}
      >
        <button
          onClick={handleToggleAttendance}
          disabled={actionLoading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            padding: isDetailedPage ? '1rem 2rem' : '0.6rem 1.25rem',
            borderRadius: '12px',
            fontSize: isDetailedPage ? '0.9rem' : '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: isAttending 
              ? '1px solid var(--gold)' 
              : '1px solid var(--glass-border)',
            backgroundColor: isAttending 
              ? 'rgba(212, 175, 55, 0.15)' 
              : 'rgba(255, 255, 255, 0.02)',
            color: isAttending ? 'var(--gold)' : 'var(--text-primary)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isAttending 
              ? '0 0 15px rgba(212,175,55,0.2)' 
              : 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            outline: 'none',
            flexGrow: isDetailedPage ? 0 : 1,
            width: isDetailedPage ? 'auto' : '100%'
          }}
          className="attendance-btn-interactive"
        >
          {actionLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isAttending ? (
            <>
              <Sparkles size={16} style={{ color: 'var(--gold)' }} />
              <span>Attending!</span>
            </>
          ) : (
            <>
              <CalendarCheck size={16} style={{ opacity: 0.8 }} />
              <span>RSVP Attending</span>
            </>
          )}
        </button>

        {/* Attendance Counter Pill */}
        <div 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--glass-border)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          }}
        >
          <Users size={14} style={{ color: count > 0 ? 'var(--gold)' : 'var(--text-secondary)' }} />
          <span>
            <strong style={{ color: count > 0 ? 'var(--gold)' : 'var(--text-primary)', fontWeight: 700 }}>
              {count}
            </strong> 
            {count === 1 ? ' collector' : ' collectors'} attending
          </span>
        </div>
      </div>

      {/* --- PREMIUM GLASSMORPHIC LOGIN MODAL --- */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(4, 8, 6, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #0B3D2E 0%, #040806 100%)',
              border: '2px solid var(--gold)',
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '450px',
              width: '100%',
              boxShadow: '0 25px 80px rgba(184,150,12,0.3)',
              position: 'relative',
              textAlign: 'center',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', marginBottom: '1.5rem', border: '1px solid rgba(212,175,55,0.3)' }}>
              <LogIn size={36} style={{ color: 'var(--gold)' }} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '0.75rem' }}>
              Collector RSVP
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Only registered collectors can RSVP for events. Sign in to show your attendance at <strong>{eventName}</strong> and unlock premium features!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={handleLoginRedirect}
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <span>Collector Sign In</span>
              </button>
              
              <button 
                onClick={handleSignupRedirect}
                className="btn-ghost" 
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                <span>Create Collector Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled JSX for Interactive Hover Effects */}
      <style jsx>{`
        .attendance-btn-interactive:hover {
          background-color: ${isAttending ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.08)'} !important;
          border-color: var(--gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(184,150,12,0.2) !important;
        }
        .attendance-btn-interactive:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
