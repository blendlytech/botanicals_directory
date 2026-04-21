import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

// Prevent Next.js from caching this page statically if we want real-time vendor list
export const revalidate = 60; // revalidate every 60 seconds

export default async function VendorsPage() {
  const supabase = createClient();

  // Fetch active vendors - Note: removed is_verified check for now to show seeded vendors
  const { data: vendors, error } = await supabase
    .from('vendors')
    .select('name, slug, specialty, location_city, location_state, location_country, tier, is_elite, is_verified, logo_url')
    .order('is_elite', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching vendors:", error);
  }

  const vendorsList = vendors || [];

  return (
    <main style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div className="section-header">
        <div className="section-eyebrow">Verified Growers</div>
        <h1 className="section-title">The <em>Specialists</em></h1>
        <p className="section-desc">
          Browse the world's most exclusive network of verified rare plant vendors.
        </p>
        <div className="section-rule" />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 5%" }}>
        <div className="vendors-grid">
          {vendorsList.map((v) => {
            const location = [v.location_city, v.location_state || v.location_country].filter(Boolean).join(', ');
            // Fallback initials if no logo
            const initials = v.name ? v.name.substring(0, 2).toUpperCase() : 'V';
            
            return (
              <a href={`/vendors/${v.slug}`} className="vendor-card" key={v.slug} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
                {v.logo_url ? (
                  <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", marginBottom: "1rem", border: "1px solid var(--glass-border)" }}>
                    <Image src={v.logo_url} alt={`${v.name} logo`} width={64} height={64} style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div className="vendor-avatar" style={{ marginBottom: "1rem" }}>{initials}</div>
                )}
                
                <div className="vendor-name">{v.name}</div>
                <div className="vendor-specialty">
                  {Array.isArray(v.specialty) ? v.specialty.slice(0, 2).join(', ') : (v.specialty || 'Rare Plants')}
                </div>
                
                {location && (
                  <div className="vendor-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "inline", marginRight: "4px" }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {location}
                  </div>
                )}
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "1rem" }}>
                  {v.is_elite ? (
                    <span className="elite-badge" style={{ fontSize: "0.65rem" }}>✦ Elite Grower</span>
                  ) : (
                    <span className="verified-badge" style={{ fontSize: "0.65rem" }}>✓ Verified Grower</span>
                  )}
                  <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 500 }}>View Profile →</span>
                </div>
              </a>
            );
          })}
        </div>
        
        {vendorsList.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
            <p>No verified vendors found. Check back later as we onboard our founding members.</p>
          </div>
        )}
      </div>
    </main>
  );
}
