import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { researchedVendors, withResearch } from '@/lib/researched-vendors';
import { upcomingEvents, eventDate } from '@/lib/directory-events';
import HeroSearch from '@/components/HeroSearch';
import styles from './directory.module.css';
export const revalidate = 60;
export default async function Home() {
  const supabase = createClient();
  const [vendorResult,eventResult] = await Promise.all([
    supabase.from('vendors').select('name,slug,specialty,location_city,location_state,location_country,ownership_verified_at').order('name'),
    supabase.from('events').select('id,slug,title,start_date,end_date,location_name,location_address').order('start_date'),
  ]);
  const vendors = (vendorResult.data || []).map(withResearch);
  const featured = researchedVendors.flatMap(p => { const v = vendors.find(v => v.slug === p.slug); return v ? [v] : []; });
  const events = upcomingEvents(eventResult.data || []).slice(0,3);
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.wrap}><p className={styles.eyebrow}>The rare plant directory</p><h1>Find rare plant vendors and your next plant event.</h1><p>Explore nurseries and plant specialists by location and specialty. Discover upcoming events and connect directly with the businesses behind them.</p>
      <div className={styles.actions}><a href="#vendor-search" className={styles.primary}>Find vendors</a><Link href="/events" className={styles.secondary}>Find events</Link></div>
      <div id="vendor-search"><HeroSearch /></div>
    </div></section>
    <section className={styles.section}><div className={styles.wrap}><div className={styles.row}><div><p className={styles.eyebrow}>Florida grower guide</p><h2>Explore plant businesses.</h2></div><Link href="/vendors" className={styles.secondary}>Browse all vendors</Link></div>
      <p className={styles.muted}>An editorial selection researched from official business websites. Inclusion does not imply membership, partnership or endorsement.</p>
      {vendorResult.error ? <p role="status">Vendor information is temporarily unavailable. Please try again later.</p> : featured.length ? <div className={styles.grid}>{featured.map(v=><article key={v.slug} className={styles.card}><p className={styles.eyebrow}>{v.ownership_verified_at ? 'Listing ownership checked' : 'Directory listing'}</p><h3>{v.name}</h3><p>{[v.location_city,v.location_state || v.location_country].filter(Boolean).join(', ')}</p><p>{Array.isArray(v.specialty) ? v.specialty.join(' · ') : v.specialty}</p><Link href={`/vendors/${v.slug}`}>View profile →</Link></article>)}</div> : <p>Browse the directory to explore available listings.</p>}
    </div></section>
    <section className={styles.section}><div className={styles.wrap}><div className={styles.row}><h2>Upcoming plant events.</h2><Link href="/events" className={styles.secondary}>Browse events</Link></div>
      {eventResult.error ? <p role="status">Event information is temporarily unavailable. Please try again later.</p> : events.length ? <div className={styles.grid}>{events.map(e=><article key={e.id} className={styles.card}><p className={styles.eyebrow}>{eventDate(e.start_date)}</p><h3>{e.title}</h3><p>{e.location_name}<br />{e.location_address}</p><Link href={`/events/${e.slug}`}>View event details →</Link></article>)}</div> : <div className={styles.note}><p>We are building event coverage. No upcoming events are listed yet.</p><Link href="/events">Explore the event directory →</Link></div>}
      <p className={styles.small}>Confirm dates, entry requirements and vendor attendance with the organizer before making plans.</p>
    </div></section>
    <section className={styles.section}><div className={styles.wrap}><h2>Start with what you grow.</h2><div className={styles.chips}>{['Aroids','Hoya','Philodendron','Anthurium','Begonia','Orchids'].map(s=><Link key={s} href={`/vendors?specialty=${encodeURIComponent(s)}`}>{s}</Link>)}</div></div></section>
    <section className={styles.section}><div className={styles.wrap}><div className={styles.split}><div><h2>Know what a listing tells you.</h2><p>A directory listing helps you discover a business. A listing ownership check means we reviewed who manages the profile; it does not guarantee plant quality or provenance.</p><p>Use the seller’s official website to check availability, policies and buying options.</p></div><div className={styles.card}><p className={styles.eyebrow}>For plant businesses</p><h2>Is your nursery listed?</h2><p>Learn how to review your information and request ownership of your listing at no cost.</p><Link href="/for-vendors" className={styles.secondary}>See the free vendor listing</Link></div></div></div></section>
  </main>;
}
