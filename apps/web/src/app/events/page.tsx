import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { upcomingEvents, eventDate } from '@/lib/directory-events';
import styles from '../directory.module.css';
export const revalidate = 60;
export const metadata = { title: 'Find Plant Events | Rare Plant Vendors', description: 'Browse upcoming plant shows and events by name or location.' };
export default async function EventsPage({ searchParams }: { searchParams?: { q?: string; location?: string } }) {
  const { data, error } = await createClient().from('events').select('id,slug,title,start_date,end_date,location_name,location_address').order('start_date', { ascending: true });
  const q = (searchParams?.q || '').trim().toLowerCase();
  const location = (searchParams?.location || '').trim().toLowerCase();
  const events = upcomingEvents(data || []).filter(e =>
    (!q || [e.title,e.location_name,e.location_address].join(' ').toLowerCase().includes(q)) &&
    (!location || [e.location_name,e.location_address].join(' ').toLowerCase().includes(location)));
  return <main className={styles.page}><section className={styles.hero}><div className={styles.wrap}><p className={styles.eyebrow}>Plant shows, expos and community events</p><h1>Find your next plant event.</h1><p>Explore upcoming dates and locations. Confirm schedules, tickets and vendor attendance with the organizer before traveling.</p></div></section>
    <section className={styles.section}><div className={styles.wrap}>
      <form action="/events" method="get" className={styles.form}><label htmlFor="event-name">Event name</label><input id="event-name" name="q" defaultValue={searchParams?.q} placeholder="Show or event name" /><label htmlFor="event-location">Location</label><input id="event-location" name="location" defaultValue={searchParams?.location} placeholder="City, state or venue" /><button type="submit" className={styles.primary}>Find events</button></form>
      {error ? <p role="status">Event information is temporarily unavailable. Please try again later.</p> : events.length ? <div className={styles.grid}>{events.map(e=><article className={styles.card} key={e.id}><p className={styles.eyebrow}>{eventDate(e.start_date)}{e.end_date && e.end_date.slice(0,10)!==e.start_date.slice(0,10) ? ' – '+eventDate(e.end_date) : ''}</p><h2>{e.title}</h2><p>{e.location_name}<br />{e.location_address}</p><Link href={`/events/${e.slug}`}>View event details →</Link></article>)}</div> : <div className={styles.note}><h2>{q || location ? 'No matching upcoming events.' : 'No upcoming events are listed yet.'}</h2><p>{q || location ? 'Try another name or location.' : 'We are building event coverage. You can still explore growers and their official websites.'}</p><Link href={q || location ? '/events' : '/vendors'}>{q || location ? 'Clear filters' : 'Browse vendors'} →</Link></div>}
    </div></section></main>;
}
