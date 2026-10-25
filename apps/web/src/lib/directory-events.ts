export type DirectoryEvent = { id: string; slug: string; title: string; start_date: string; end_date?: string | null; location_name?: string | null; location_address?: string | null };
export function upcomingEvents(events: DirectoryEvent[], today = new Date().toISOString().slice(0, 10)) {
  return events.filter(e => {
    const start = (e.start_date || '').slice(0, 10);
    const end = (e.end_date || e.start_date || '').slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(start) && /^\d{4}-\d{2}-\d{2}$/.test(end) && end >= start && end >= today && !!e.slug;
  }).sort((a,b) => a.start_date.localeCompare(b.start_date) || a.title.localeCompare(b.title));
}
export function eventDate(value: string) {
  const date = new Date(value.slice(0, 10) + 'T12:00:00Z');
  return Number.isNaN(date.valueOf()) ? 'Confirm date with organizer' : date.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', timeZone:'UTC' });
}
