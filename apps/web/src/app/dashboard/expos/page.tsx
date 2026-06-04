'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { CalendarCheck, MapPin, Check, Lock, Loader2, Store } from 'lucide-react';

interface EventRow {
  id: string;
  title: string;
  slug: string;
  start_date: string | null;
  date_start: string | null;
  location_name: string | null;
}

interface InventoryRow {
  id: string;
  species_name: string;
  variety: string | null;
  price: number | null;
  image_url: string | null;
  status: string;
  event_id: string | null;
}

function eventDate(e: EventRow): string | null {
  return e.date_start || e.start_date;
}

// ISO timestamp -> value for <input type="datetime-local"> (local time, no seconds).
function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}

export default function ExposPage() {
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [attending, setAttending] = useState<Set<string>>(new Set());
  const [deadlines, setDeadlines] = useState<Record<string, string>>({});
  const [savedDeadline, setSavedDeadline] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyEvent, setBusyEvent] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      setUserEmail(user.email || null);

      const { data: vendor } = await supabase
        .from('vendors')
        .select('id, name, subscription_status, slug')
        .eq('contact_email', user.email)
        .single();

      if (!vendor) { setLoading(false); return; }
      setVendorId(vendor.id);
      setVendorName(vendor.name || null);
      setIsPaid(vendor.subscription_status === 'active');

      const today = new Date().toISOString().slice(0, 10);
      const [{ data: evs }, { data: inv }, { data: ev }] = await Promise.all([
        supabase.from('events').select('id, title, slug, start_date, date_start, location_name'),
        supabase.from('inventory').select('id, species_name, variety, price, image_url, status, event_id').eq('vendor_id', vendor.id),
        supabase.from('event_vendors').select('event_id, pickup_deadline').eq('vendor_id', vendor.id),
      ]);

      const upcoming = (evs || [])
        .filter((e: EventRow) => {
          const d = eventDate(e);
          return !d || d >= today;
        })
        .sort((a: EventRow, b: EventRow) => (eventDate(a) || '').localeCompare(eventDate(b) || ''));

      setEvents(upcoming);
      setInventory(inv || []);
      setAttending(new Set((ev || []).map((r: { event_id: string }) => r.event_id)));
      setDeadlines(Object.fromEntries((ev || []).map((r: any) => [r.event_id, toLocalInput(r.pickup_deadline)])));
      setLoading(false);
    }
    load();
  }, []);

  const eligible = isPaid;

  const savePickupDeadline = async (eventId: string) => {
    if (!vendorId) return;
    const supabase = createClient();
    const local = deadlines[eventId];
    const iso = local ? new Date(local).toISOString() : null;
    await supabase.from('event_vendors').update({ pickup_deadline: iso }).eq('event_id', eventId).eq('vendor_id', vendorId);
    setSavedDeadline(eventId);
    setTimeout(() => setSavedDeadline(prev => prev === eventId ? null : prev), 2000);
  };

  const toggleAttendance = async (eventId: string) => {
    if (!vendorId || busyEvent) return;
    setBusyEvent(eventId);
    const supabase = createClient();
    const isAttending = attending.has(eventId);

    if (isAttending) {
      await supabase.from('event_vendors').delete().eq('event_id', eventId).eq('vendor_id', vendorId);
      // Unassign any inventory that was tied to this expo.
      await supabase.from('inventory').update({ event_id: null }).eq('vendor_id', vendorId).eq('event_id', eventId);
      setAttending(prev => { const n = new Set(prev); n.delete(eventId); return n; });
      setInventory(prev => prev.map(i => i.event_id === eventId ? { ...i, event_id: null } : i));
    } else {
      await supabase.from('event_vendors').insert({ event_id: eventId, vendor_id: vendorId });
      setAttending(prev => new Set(prev).add(eventId));
    }
    setBusyEvent(null);
  };

  const toggleInventoryAssignment = async (item: InventoryRow, eventId: string) => {
    if (!vendorId) return;
    const supabase = createClient();
    const newEventId = item.event_id === eventId ? null : eventId;
    await supabase.from('inventory').update({ event_id: newEventId }).eq('id', item.id);
    setInventory(prev => prev.map(i => i.id === item.id ? { ...i, event_id: newEventId } : i));
  };

  const navItems = [
    { href: '/dashboard', label: '⚡ Overview' },
    { href: '/dashboard/inventory', label: '🌿 Inventory' },
    { href: '/dashboard/expos', label: '🎪 Expos', active: true },
    { href: '/dashboard/leads', label: '🎯 Leads' },
    { href: '/dashboard/passports', label: '📜 Passports' },
    { href: '/dashboard/analytics', label: '📊 Analytics' },
    { href: '/dashboard/settings', label: '⚙️ Settings' },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading expos...</p>
      </div>
    );
  }

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : 'Date TBA';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--glass-border)', padding: '7rem 1.5rem 2rem', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Vendor Portal</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vendorName || 'My Nursery'}</div>
          {userEmail && (
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={userEmail}>👤 {userEmail}</div>
          )}
        </div>
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
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>← Directory</Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '7rem 3rem 4rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>Expo Pre-Sale</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', margin: 0, color: 'var(--text-primary)' }}>Verify Attendance & Stage Inventory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem', maxWidth: '640px' }}>
            Confirm which expos you&apos;re attending, then flag the plants you&apos;re bringing and set a pickup deadline. Collectors see your pre-sale shelf <strong>48 hours before doors open</strong> and can place a 10% deposit to hold a plant.
          </p>
        </div>

        {!vendorId ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>No vendor profile found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Claim your listing to manage expo attendance.</p>
            <Link href="/vendors" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Find Your Listing</Link>
          </div>
        ) : !eligible ? (
          <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--gold-dim)', padding: '1rem', borderRadius: '12px', color: 'var(--gold)', flexShrink: 0 }}><Lock size={24} /></div>
            <div>
              <h3 style={{ color: 'var(--gold)', margin: '0 0 0.5rem', fontFamily: 'var(--font-heading)' }}>Expo Pre-Sale is a vendor membership feature</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Activate your vendor membership (<strong>$24.99/mo or $249/yr</strong>) to verify expo attendance and offer pre-sale reservations to Collectors before the event.
              </p>
              <Link href="/pricing" className="btn-primary" style={{ textDecoration: 'none' }}>Become a Member →</Link>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.4 }}>🎪</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>No upcoming expos</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Check back soon — new rare plant events are added regularly.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map(evt => {
              const isAttending = attending.has(evt.id);
              const assigned = inventory.filter(i => i.event_id === evt.id);
              return (
                <div key={evt.id} style={{ background: 'var(--bg-surface)', border: `1px solid ${isAttending ? 'rgba(212,175,55,0.4)' : 'var(--glass-border)'}`, borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', margin: '0 0 0.4rem', color: 'var(--text-primary)' }}>{evt.title}</h3>
                      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                        <span>📅 {formatDate(eventDate(evt))}</span>
                        {evt.location_name && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={13} /> {evt.location_name}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAttendance(evt.id)}
                      disabled={busyEvent === evt.id}
                      className={isAttending ? 'btn-ghost' : 'btn-primary'}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                    >
                      {busyEvent === evt.id ? <Loader2 size={15} className="animate-spin" /> : isAttending ? <Check size={15} /> : <CalendarCheck size={15} />}
                      {isAttending ? 'Attending' : 'Verify Attendance'}
                    </button>
                  </div>

                  {isAttending && (
                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
                      {/* Pickup deadline — collectors must retrieve by this time or forfeit deposit */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                          ⏰ Pickup deadline <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>— collectors must retrieve by this time or forfeit their deposit</span>
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <input
                            type="datetime-local"
                            value={deadlines[evt.id] || ''}
                            onChange={e => setDeadlines(prev => ({ ...prev, [evt.id]: e.target.value }))}
                            className="newsletter-input"
                            style={{ borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.8rem', maxWidth: '240px' }}
                          />
                          <button onClick={() => savePickupDeadline(evt.id)} className="btn-ghost" style={{ fontSize: '0.72rem', padding: '0.45rem 1rem' }}>
                            {savedDeadline === evt.id ? '✓ Saved' : 'Save deadline'}
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Store size={15} style={{ color: 'var(--gold)' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          Plants you&apos;re bringing ({assigned.length} staged for pre-sale)
                        </span>
                      </div>
                      {inventory.length === 0 ? (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          No inventory yet. <Link href="/dashboard/inventory" style={{ color: 'var(--gold)' }}>Add plants →</Link>
                        </p>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
                          {inventory.map(item => {
                            const here = item.event_id === evt.id;
                            const elsewhere = item.event_id && item.event_id !== evt.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => toggleInventoryAssignment(item, evt.id)}
                                disabled={!!elsewhere}
                                title={elsewhere ? 'Assigned to another expo' : undefined}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left',
                                  padding: '0.6rem 0.75rem', borderRadius: '10px', cursor: elsewhere ? 'not-allowed' : 'pointer',
                                  background: here ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.02)',
                                  border: `1px solid ${here ? 'var(--gold)' : 'var(--glass-border)'}`,
                                  opacity: elsewhere ? 0.4 : 1,
                                }}
                              >
                                <div style={{ width: 40, height: 40, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {item.image_url ? <img src={item.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '1rem' }}>🌱</span>}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.species_name}</div>
                                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{item.price != null ? `$${item.price.toFixed(2)}` : 'No price'}{elsewhere ? ' · other expo' : ''}</div>
                                </div>
                                <div style={{ width: 18, height: 18, borderRadius: '5px', flexShrink: 0, border: `1px solid ${here ? 'var(--gold)' : 'var(--glass-border)'}`, background: here ? 'var(--gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}>
                                  {here && <Check size={12} strokeWidth={3} />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
