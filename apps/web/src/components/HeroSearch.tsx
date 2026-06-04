'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Leaf, Truck } from 'lucide-react';

/* Specialty options surfaced as the directory's primary filter facets. */
export const SPECIALTIES = [
  'Aroids',
  'Hoyas',
  'Philodendron',
  'Anthurium',
  'Begonias',
  'Orchids',
  'Carnivorous',
  'Succulents & Cacti',
];

const SHIPPING_OPTIONS = [
  { value: '', label: 'Any availability' },
  { value: 'ships', label: 'Ships nationwide' },
  { value: 'local', label: 'Local pickup' },
  { value: 'international', label: 'Ships international' },
];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [shipping, setShipping] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (location.trim()) params.set('location', location.trim());
    if (specialty) params.set('specialty', specialty);
    if (shipping) params.set('shipping', shipping);
    router.push(`/vendors${params.toString() ? `?${params.toString()}` : ''}`);
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '12px',
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    color: '#F5F0E8',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.9rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--gold)',
    opacity: 0.7,
    pointerEvents: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '0.5rem',
    textAlign: 'left',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(11, 61, 46, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid var(--gold)',
        borderRadius: '24px',
        padding: '1.75rem',
        boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
      }}
    >
      {/* Primary keyword search */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <Search size={20} style={iconStyle} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vendors by name, genus, or specialty…"
          style={{ ...fieldStyle, fontSize: '1rem', padding: '1.1rem 1rem 1.1rem 2.75rem' }}
          aria-label="Search vendors"
        />
      </div>

      {/* Mandatory directory facets: Location · Specialties · Shipping */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label style={labelStyle} htmlFor="hero-location">Location</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={iconStyle} />
            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or region"
              style={fieldStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="hero-specialty">Specialties</label>
          <div style={{ position: 'relative' }}>
            <Leaf size={18} style={iconStyle} />
            <select
              id="hero-specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              style={fieldStyle}
            >
              <option value="">All specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="hero-shipping">Shipping</label>
          <div style={{ position: 'relative' }}>
            <Truck size={18} style={iconStyle} />
            <select
              id="hero-shipping"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              style={fieldStyle}
            >
              {SHIPPING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{
          width: '100%',
          padding: '1.1rem',
          borderRadius: '14px',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
        }}
      >
        <Search size={18} /> Search the Directory
      </button>

      {/* Quick specialty chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginTop: '1.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', opacity: 0.6, color: '#F5F0E8', alignSelf: 'center', marginRight: '0.25rem' }}>
          Popular:
        </span>
        {SPECIALTIES.slice(0, 5).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => router.push(`/vendors?specialty=${encodeURIComponent(s)}`)}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#F5F0E8',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}
