import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 60;

const typeGradients: Record<string, string> = {
  Expo: "linear-gradient(145deg, #0B3D2E 0%, #145A43 100%)",
  Conference: "linear-gradient(145deg, #1a3a2a 0%, #2a5a3a 100%)",
  Festival: "linear-gradient(145deg, #1a2a3a 0%, #2a3a5a 100%)",
  Showcase: "linear-gradient(145deg, #2a1a3a 0%, #3a2a5a 100%)",
  Exhibition: "linear-gradient(145deg, #3a2a1a 0%, #5a4a2a 100%)",
  Swap: "linear-gradient(145deg, #1a3a2a 0%, #4a7a3a 100%)",
};

const typeEmoji: Record<string, string> = {
  Expo: "🌿",
  Conference: "🎤",
  Festival: "🌸",
  Showcase: "🏆",
  Exhibition: "🪴",
  Swap: "🔄",
};

function formatDate(start: string | null, end: string | null) {
  if (!start) return "Date TBA";
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (!end || start === end) return `${s.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
  const e = new Date(end);
  if (s.getMonth() === e.getMonth()) {
    return `${s.toLocaleDateString("en-US", opts)}–${e.getDate()}, ${s.getFullYear()}`;
  }
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export default async function EventsPage() {
  const { data: events } = await supabase
    .from("events")
    .select(`*, event_vendors(count)`)
    .order("is_featured", { ascending: false })
    .order("date_start", { ascending: true });

  const featured = (events || []).filter((e) => e.is_featured);
  const regular = (events || []).filter((e) => !e.is_featured);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "5rem" }}>
      <div className="section-header">
        <div className="section-eyebrow">Curated Shows</div>
        <h1 className="section-title">Upcoming <em>Expos &amp; Swaps</em></h1>
        <p className="section-desc">
          Every event is vetted, mapped, and populated with pre-verified vendor inventory.
        </p>
        <div className="section-rule" />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 5%" }}>
        {featured.length > 0 && (
          <>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>
              ★ Featured Events
            </div>
            <div className="events-grid" style={{ marginBottom: "4rem" }}>
              {featured.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          </>
        )}

        {regular.length > 0 && (
          <>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              All Events This Season
            </div>
            <div className="events-grid">
              {regular.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          </>
        )}

        {(!events || events.length === 0) && (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗓️</div>
            <h2 style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>No Events Listed Yet</h2>
            <p>Check back soon — we add new shows weekly.</p>
          </div>
        )}
      </div>
    </main>
  );
}

function EventCard({ ev }: { ev: any }) {
  const gradient = typeGradients[ev.event_type] || typeGradients.Expo;
  const emoji = typeEmoji[ev.event_type] || "🌿";
  const vendorCount = ev.event_vendors?.[0]?.count || 0;
  const dateStr = formatDate(ev.date_start, ev.date_end);

  return (
    <Link href={`/events/${ev.slug}`} className="event-card" style={{ textDecoration: "none", display: "block" }}>
      <div className="event-card-image">
        <div className="event-card-image-bg" style={{ background: gradient }}>
          <span style={{ position: "absolute", fontSize: "4rem", bottom: "1rem", right: "1.5rem", opacity: 0.3 }}>{emoji}</span>
        </div>
        <div className={`event-card-badge${ev.is_featured ? "" : " sold"}`}>
          {ev.event_type || "Event"}
        </div>
        {ev.is_featured && (
          <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(212,175,55,0.15)", border: "1px solid var(--gold)", borderRadius: "4px", padding: "3px 8px", fontSize: "0.6rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ★ Featured
          </div>
        )}
      </div>
      <div className="event-card-body">
        <div className="event-card-date">{dateStr}</div>
        <h3 className="event-card-title">{ev.title}</h3>
        <div className="event-card-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {ev.location_name || ev.location_address || "Location TBA"}
        </div>
        {ev.description && (
          <p className="event-card-desc" style={{ WebkitLineClamp: 2, overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
            {ev.description}
          </p>
        )}
        <div className="event-card-footer">
          <div className="vendor-count">
            {vendorCount > 0 ? <><strong>{vendorCount}</strong> Vendor Previews</> : "Preview Coming Soon"}
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600 }}>View Event →</span>
        </div>
      </div>
    </Link>
  );
}
