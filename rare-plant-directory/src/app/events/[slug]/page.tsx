import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

function formatDate(start: string | null, end: string | null) {
  if (!start) return "Date TBA";
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  if (!end || start === end) return s.toLocaleDateString("en-US", opts);
  const e = new Date(end);
  if (s.getMonth() === e.getMonth()) {
    return `${s.toLocaleDateString("en-US", { month: "long", day: "numeric" })}–${e.getDate()}, ${s.getFullYear()}`;
  }
  return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${e.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !event) notFound();

  const { data: eventVendors } = await supabase
    .from("event_vendors")
    .select("vendors(id, name, slug, specialty, location_city, location_state, tier, is_elite, is_verified, logo_url)")
    .eq("event_id", event.id);

  const vendors = (eventVendors || [])
    .map((ev: any) => ev.vendors)
    .filter(Boolean)
    .sort((a: any, b: any) => (b.is_elite ? 1 : 0) - (a.is_elite ? 1 : 0));

  const dateStr = formatDate(event.date_start, event.date_end);
  const location = event.location_name || event.location_address || "Location TBA";

  return (
    <main style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      {/* Hero */}
      <div style={{
        background: event.is_featured
          ? "linear-gradient(145deg, #051A13 0%, #0B3D2E 60%, #145A43 100%)"
          : "linear-gradient(145deg, #0a0a0a 0%, #0B3D2E 100%)",
        padding: "8rem 5% 4rem",
        borderBottom: "1px solid var(--glass-border)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>
            <Link href="/events" style={{ fontSize: "0.78rem", color: "var(--gold)", textDecoration: "none", opacity: 0.9, fontWeight: 600 }}>
              ← All Events
            </Link>
            <span style={{ color: "var(--glass-border)" }}>·</span>
            {event.is_featured && (
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: "1px solid rgba(212,175,55,0.4)", borderRadius: "4px" }}>
                ★ Featured
              </span>
            )}
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px" }}>
              {event.event_type || "Event"}
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFFFF", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
            {event.title}
          </h1>

          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
              <span>📅</span>
              <span style={{ color: "#FFFFFF", fontWeight: 500 }}>{dateStr}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
              <span>📍</span>
              <span style={{ color: "#FFFFFF", fontWeight: 500 }}>{location}</span>
            </div>
            {vendors.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                <span>🏪</span>
                <span style={{ color: "#FFFFFF", fontWeight: 500 }}>{vendors.length} Vendors Attending</span>
              </div>
            )}
          </div>

          {event.description && (
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 2rem" }}>
              {event.description}
            </p>
          )}

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {event.website_url && (
              <a href={event.website_url} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none" }}>
                Official Website →
              </a>
            )}
            <Link href="/onboarding" className="btn-ghost" style={{ textDecoration: "none" }}>
              List Your Booth
            </Link>
          </div>
        </div>
      </div>

      {/* Vendor roster */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 5% 0" }}>
        <div style={{ borderBottom: "1px solid var(--glass-border)", paddingBottom: "1rem", marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", margin: 0 }}>
            Vendors at This Event
          </h2>
          {vendors.length > 0 && (
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{vendors.length} attending</span>
          )}
        </div>

        {vendors.length > 0 ? (
          <div className="vendors-grid">
            {vendors.map((v: any, idx: number) => {
              const initials = v.name ? v.name.substring(0, 1).toUpperCase() : "V";
              const loc = [v.location_city, v.location_state].filter(Boolean).join(", ");
              
              // Premium background images for verified vendors
              const backgrounds = [
                'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1520412099561-63819215bb01?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1466781783364-391eaf50cf2a?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800'
              ];
              const bgImage = backgrounds[idx % backgrounds.length];

              return (
                <Link 
                  href={`/vendors/${v.slug}`} 
                  key={v.id} 
                  className={`vendor-card ${v.is_verified ? 'is-verified' : ''}`}
                  style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                >
                  {v.is_verified && (
                    <>
                      <div className="vendor-card-image-bg">
                        <img src={bgImage} alt="" aria-hidden="true" />
                      </div>
                      <div className="vendor-card-overlay"></div>
                    </>
                  )}

                  <div className="vendor-card-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      {v.logo_url ? (
                        <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "1px solid var(--glass-border)", background: '#fff' }}>
                          <Image src={v.logo_url} alt={v.name} width={56} height={56} style={{ objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div className="vendor-avatar" style={{ width: 56, height: 56, fontSize: "1.1rem" }}>{initials}</div>
                      )}
                      
                      {v.is_verified && (
                        <span className="verified-badge" style={{ fontSize: "0.62rem" }}><ShieldCheck size={10} /> Verified</span>
                      )}
                    </div>

                    <div className="vendor-name" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{v.name}</div>
                    <div className="vendor-specialty" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                      {Array.isArray(v.specialty) ? v.specialty.slice(0, 2).join(", ") : v.specialty || "Rare Plants"}
                    </div>
                    {loc && <div className="vendor-location" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>📍 {loc}</div>}
                    
                    <div style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
                      {v.is_elite && (
                        <span className="elite-badge" style={{ fontSize: "0.62rem", display: 'inline-flex' }}>✦ Elite Grower</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem", background: "var(--bg-surface)", borderRadius: "12px", border: "1px dashed var(--glass-border)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", opacity: 0.4 }}>🪴</div>
            <h3 style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)", margin: "0 0 0.5rem" }}>Vendor Roster Coming Soon</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "0 0 2rem" }}>
              We&apos;re confirming booth assignments. Check back closer to the date.
            </p>
            <Link href="/onboarding" className="btn-primary" style={{ textDecoration: "none" }}>
              List Your Booth
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
