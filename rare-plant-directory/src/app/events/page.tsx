'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { MapPin, Calendar, ChevronRight, Search } from 'lucide-react';

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

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      if (!L) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current, {
            zoomControl: false
        }).setView([39.8283, -98.5795], 4);
        
        L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(mapInstanceRef.current);
      }

      const map = mapInstanceRef.current;
      const markerGroup = L.featureGroup().addTo(map);

      const standardIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="width:20px;height:20px;background:var(--gold);border-radius:50%;border:3px solid var(--charcoal);box-shadow:0 0 15px var(--gold-dim); position:relative;">
                <div style="position:absolute; inset:-4px; border:1px solid var(--gold); border-radius:50%; opacity:0.5;"></div>
               </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      events.forEach(evt => {
        if (evt.lat && evt.lng) {
          const marker = L.marker([evt.lat, evt.lng], { icon: standardIcon }).addTo(markerGroup);
          
          const popupContent = `
            <div style="font-family: var(--font-body); color: #fff; padding: 12px; min-width: 200px; background: var(--bg-card); border-radius: 12px;">
              <strong style="font-family: var(--font-heading); font-size: 1.25rem; display: block; margin-bottom: 6px; color: var(--gold);">${evt.title}</strong>
              <div style="font-size: 0.8rem; margin-bottom: 12px; opacity: 0.8;">📍 ${evt.location_name}</div>
              <a href="/events/${evt.slug}" style="display: block; text-align: center; background: var(--gold); color: var(--charcoal); padding: 10px; border-radius: 6px; text-decoration: none; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">View Roster →</a>
            </div>
          `;
          
          marker.bindPopup(popupContent, {
            className: 'premium-popup',
            maxWidth: 300,
            closeButton: false
          });
        }
      });

      if (markerGroup.getBounds().isValid()) {
        map.fitBounds(markerGroup.getBounds(), { padding: [100, 100] });
      }
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
    <main className="page-wrapper">
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Real-Time Geolocation</div>
          <h1 className="section-title">The Global <em>Event Map</em></h1>
          <p className="section-desc">
            Discover rare plant expos, exclusive swaps, and botanical exhibitions worldwide. Pinpoint vendor locations before the doors open.
          </p>
          <div className="section-rule"></div>
        </div>

        {loading ? (
          <div style={{ height: '600px', background: 'var(--bg-surface)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', border: '1px solid var(--glass-border)', boxShadow: 'var(--card-shadow)' }}>
            <div className="hero-eyebrow-dot" style={{ width: '16px', height: '16px' }} />
            <span style={{ fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--gold)' }}>Initializing Global Map...</span>
          </div>
        ) : (
          <div style={{ position: 'relative', height: '650px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#050a08' }} />
          </div>
        )}

        <div style={{ marginTop: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', margin: 0 }}>Upcoming <em>Exhibitions</em></h2>
            <div style={{ position: 'relative', width: '300px' }}>
                <Search size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input type="text" placeholder="Filter by region..." className="newsletter-input" style={{ width: '100%', padding: '0.75rem 1.25rem', fontSize: '0.8rem', borderRadius: '10px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {events.map(evt => {
              const href = evt.slug === 'the-big-plant-expo' ? '/events/charleston' : `/events/${evt.slug}`;
              return (
                <Link key={evt.id} href={href} style={{ textDecoration: 'none' }}>
                  <div className="event-card" style={{ height: '100%' }}>
                    <div className="event-card-body">
                      <div className="event-card-date">
                        {new Date(evt.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="event-card-title">{evt.title}</h3>
                      <div className="event-card-location">
                        <MapPin size={14} /> {evt.location_name}
                      </div>
                      <div className="event-card-footer">
                        <span className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem', width: '100%', textAlign: 'center' }}>
                          Complete Event Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
