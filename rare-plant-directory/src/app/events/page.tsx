'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  id: string;
  slug: string;
  title: string;
  start_date: string;
  end_date: string;
  location_name: string;
  location_address: string;
  image_url: string | null;
  lat?: number;
  lng?: number;
}

export default function EventsMapPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    async function loadEvents() {
      // Get events
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (data) {
        setEvents(data as Event[]);
      }
      setLoading(false);
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (loading || !mapRef.current || events.length === 0) return;

    // Load Leaflet via CDN dynamically to avoid SSR/NPM versioning issues
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      if (!L) return;

      // Initialize map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(mapInstanceRef.current);
      }

      const map = mapInstanceRef.current;

      // Custom markers
      const standardIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="width:16px;height:16px;background:#2ecc71;border-radius:50%;border:2px solid #000;box-shadow:0 0 10px rgba(46,204,113,0.5);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      events.forEach(evt => {
        if (evt.lat && evt.lng) {
          const marker = L.marker([evt.lat, evt.lng], { icon: standardIcon }).addTo(map);
          
          const popupContent = `
            <div style="font-family: var(--font-body); color: #333; padding: 5px;">
              <strong style="font-family: var(--font-heading); font-size: 1.1rem; display: block; margin-bottom: 5px;">${evt.title}</strong>
              <div style="font-size: 0.8rem; margin-bottom: 5px;">📍 ${evt.location_name}</div>
              <a href="/events/${evt.slug}" style="display: inline-block; background: #2ecc71; color: white; padding: 4px 10px; border-radius: 4px; text-decoration: none; font-size: 0.8rem; font-weight: bold;">View Vendors</a>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [loading, events]);

  return (
    <main style={{ minHeight: '100vh', padding: '7rem 5% 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--text-primary)', margin: '0 0 1rem' }}>Global Event Map</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Discover rare plant expos, swaps, and exhibitions near you. Click a pin to see the vendor roster.
          </p>
        </div>

        {loading ? (
          <div style={{ height: '500px', background: 'var(--bg-surface)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading map data...
          </div>
        ) : (
          <div style={{ position: 'relative', height: '600px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#0a0a0a' }} />
          </div>
        )}

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {events.map(evt => (
            <Link key={evt.id} href={`/events/${evt.slug}`} style={{ textDecoration: 'none' }}>
              <div className="onboarding-card" style={{ padding: '1.5rem', height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {new Date(evt.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{evt.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>📍 {evt.location_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
