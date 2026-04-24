import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileTracker from "../../components/ProfileTracker";

export const revalidate = 60; // revalidate every 60 seconds

export default async function VendorProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const supabase = createClient();

  // Fetch vendor details
  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !vendor) {
    notFound();
  }

  // Fetch inventory
  const { data: inventory } = await supabase
    .from('inventory')
    .select('*')
    .eq('vendor_id', vendor.id)
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  const location = [vendor.location_city, vendor.location_state || vendor.location_country].filter(Boolean).join(', ');
  const initials = vendor.name ? vendor.name.substring(0, 2).toUpperCase() : 'V';
  
  return (
    <main style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      <ProfileTracker vendorId={vendor.id} />
      {/* Profile Header */}
      <div style={{ 
        background: vendor.is_elite ? "linear-gradient(145deg, #0B3D2E 0%, #051A13 100%)" : "var(--bg-surface)",
        padding: "8rem 5% 4rem",
        borderBottom: "1px solid var(--glass-border)",
        position: "relative",
        overflow: "hidden"
      }}>
        {vendor.is_elite && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.05, pointerEvents: "none", whiteSpace: "nowrap", fontSize: "15rem", fontFamily: "var(--font-heading)", color: "var(--gold)" }}>
            ELITE {vendor.elite_number && `#${vendor.elite_number}`}
          </div>
        )}
        
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "2.5rem", alignItems: "flex-start", position: "relative", zIndex: 2, flexWrap: "wrap" }}>
          {/* Avatar / Logo */}
          <div style={{ flexShrink: 0 }}>
            {vendor.logo_url ? (
              <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: `2px solid ${vendor.is_elite ? 'var(--gold)' : 'var(--emerald)'}`, boxShadow: vendor.is_elite ? "0 0 30px rgba(212,175,55,0.2)" : "none" }}>
                <Image src={vendor.logo_url} alt={vendor.name} width={140} height={140} style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className="vendor-avatar" style={{ width: 140, height: 140, fontSize: "3rem", border: `2px solid ${vendor.is_elite ? 'var(--gold)' : 'var(--emerald)'}` }}>
                {initials}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", margin: 0, color: "var(--text-primary)" }}>{vendor.name}</h1>
              {vendor.is_elite ? (
                <span className="elite-badge">✦ Elite Grower</span>
              ) : vendor.is_verified ? (
                <span className="verified-badge">✓ Verified Grower</span>
              ) : (
                <span className="free-tier-badge">Seedling</span>
              )}
            </div>
            
            {vendor.owner_name && (
              <div style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
                by {vendor.owner_name}
              </div>
            )}
            
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              {location && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span>📍</span> {location}
                </div>
              )}
              {vendor.website_url && (
                <a href={vendor.website_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", textDecoration: "none" }}>
                  <span>🔗</span> Website
                </a>
              )}
              {vendor.instagram && (
                <a href={`https://instagram.com/${vendor.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", textDecoration: "none" }}>
                  <span>📸</span> Instagram
                </a>
              )}
            </div>
            
            {vendor.specialty && vendor.specialty.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {vendor.specialty.map((s: string) => (
                  <span key={s} style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.05)", borderRadius: "20px", fontSize: "0.75rem", border: "1px solid var(--glass-border)" }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 5%", display: "grid", gridTemplateColumns: "1fr 300px", gap: "3rem" }}>
        {/* Main Content */}
        <div>
          {vendor.bio && (
            <section style={{ marginBottom: "4rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
                About the Nursery
              </h2>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
                {vendor.bio}
              </div>
            </section>
          )}
          
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--text-primary)", margin: 0 }}>
                {vendor.is_elite ? 'Elite Stage' : 'Current Inventory'}
              </h2>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {inventory?.length || 0} {vendor.is_elite ? 'showpieces' : 'items'} available
              </span>
            </div>
            
            {inventory && inventory.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {inventory.map((item) => (
                  <div key={item.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {item.image_url ? (
                      <div style={{ height: "160px", background: "#111", position: "relative" }}>
                        <Image src={item.image_url} alt={item.species_name} fill style={{ objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ height: "160px", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "2rem" }}>
                        🌿
                      </div>
                    )}
                    <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "1rem", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>{item.species_name}</h3>
                      {item.variety && (
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                          var. {item.variety}
                        </div>
                      )}
                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "1.1rem" }}>
                          {item.price ? `$${item.price}` : 'Price on Request'}
                        </span>
                        {item.quantity && item.quantity < 3 && (
                          <span style={{ fontSize: "0.65rem", color: "#e74c3c", fontWeight: 700, padding: "2px 6px", background: "rgba(231,76,60,0.1)", borderRadius: "4px" }}>
                            Only {item.quantity} left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "3rem", textAlign: "center", background: "var(--bg-surface)", borderRadius: "8px", border: "1px dashed var(--glass-border)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.5 }}>🪴</div>
                <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "var(--text-primary)" }}>No Inventory Listed</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>This vendor hasn't added any specific plants to their digital storefront yet.</p>
              </div>
            )}
          </section>
        </div>
        
        {/* Sidebar */}
        <div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", borderRadius: "12px", padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 style={{ fontSize: "1rem", margin: "0 0 1rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>Contact Vendor</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href={`mailto:${vendor.contact_email}`} className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "0.8rem", textDecoration: "none" }}>
                Send Inquiry
              </a>
              
              {vendor.is_elite && (
                <button className="btn-ghost" style={{ width: "100%", padding: "0.8rem", fontSize: "0.8rem" }}>
                  Request Video Tour
                </button>
              )}
            </div>
            
            <div style={{ marginTop: "2rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", fontWeight: 600 }}>Trust Metrics</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  <span style={{ color: "var(--emerald)" }}>✓</span> Identity Verified
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  <span style={{ color: "var(--emerald)" }}>✓</span> Geo-Location Verified
                </li>
                {vendor.is_elite && (
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--gold)" }}>
                    <span style={{ color: "var(--gold)" }}>✦</span> Elite Member in Good Standing
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
