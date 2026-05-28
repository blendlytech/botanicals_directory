import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileTracker from "../../components/ProfileTracker";

export const revalidate = 60;

export default async function VendorProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const supabase = createClient();

  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !vendor) notFound();

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*, digital_passports(verification_hash)')
    .eq('vendor_id', vendor.id)
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  const location = [vendor.location_city, vendor.location_state || vendor.location_country].filter(Boolean).join(', ');
  const initials = vendor.name ? vendor.name.substring(0, 2).toUpperCase() : 'V';

  // ── ELITE PROFILE ──
  if (vendor.is_elite) {
    return (
      <main className="elite-profile-page">
        <ProfileTracker vendorId={vendor.id} />

        {/* ── CINEMATIC HERO ── */}
        <div className="elite-hero">
          {/* Floating bokeh particles */}
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="elite-particle"
              style={{
                left: `${5 + (i * 7) % 90}%`,
                top: `${10 + (i * 13) % 80}%`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                animationDelay: `${i * 0.45}s`,
                animationDuration: `${4 + (i % 5)}s`,
              }}
            />
          ))}
          <div className="elite-hero-grid" />

          {/* Rotating seal — top right */}
          <div className="elite-rotating-seal" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="seal-path" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="8.5" fill="rgba(212,175,55,0.85)" letterSpacing="2.8" fontFamily="'Montserrat',sans-serif" fontWeight="700">
                <textPath href="#seal-path">✦ ELITE MEMBER · RARE PLANT VENDORS · CERTIFIED ✦ </textPath>
              </text>
              <text x="50" y="55" textAnchor="middle" fontSize="22" fill="rgba(212,175,55,0.9)" fontFamily="'Cormorant Garamond',serif">✦</text>
            </svg>
          </div>

          {/* Hero content */}
          <div className="elite-hero-content">
            {/* Avatar with triple pulsing rings */}
            <div className="elite-avatar-wrap">
              <div className="elite-ring elite-ring-3" />
              <div className="elite-ring elite-ring-2" />
              <div className="elite-ring elite-ring-1" />
              <div className="elite-avatar-inner">
                {vendor.logo_url ? (
                  <Image src={vendor.logo_url} alt={vendor.name} width={120} height={120} style={{ objectFit: 'cover', borderRadius: '50%', width: '100%', height: '100%' }} />
                ) : (
                  <span className="elite-initials">{initials}</span>
                )}
              </div>
            </div>

            {/* Identity block */}
            <div className="elite-identity">
              {vendor.elite_number && (
                <div className="elite-founder-tag">
                  Elite Grower&nbsp;<em>#{vendor.elite_number}</em>
                </div>
              )}
              <h1 className="elite-name">{vendor.name}</h1>
              {vendor.owner_name && (
                <p className="elite-byline">Curated by {vendor.owner_name}</p>
              )}

              <div className="elite-badge-row">
                <span className="elite-badge-pill">✦ Elite Member</span>
                {vendor.is_verified && <span className="elite-verified-pill">✓ Verified Grower</span>}
              </div>

              <div className="elite-meta-row">
                {location && (
                  <span className="elite-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    {location}
                  </span>
                )}
                {vendor.website_url && (
                  <a href={vendor.website_url} target="_blank" rel="noreferrer" className="elite-meta-link">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                    Website
                  </a>
                )}
                {vendor.instagram && (
                  <a href={`https://instagram.com/${vendor.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="elite-meta-link">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    @{vendor.instagram.replace('@', '')}
                  </a>
                )}
              </div>

              {vendor.specialty && vendor.specialty.length > 0 && (
                <div className="elite-specialty-row">
                  {vendor.specialty.map((s: string) => (
                    <span key={s} className="elite-specialty-chip">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="elite-body">

          {/* Main column */}
          <div className="elite-main">
            {vendor.bio && (
              <section className="elite-section">
                <div className="elite-section-label">Origin Story</div>
                <h2 className="elite-section-heading">About the Collection</h2>
                <div className="elite-bio">{vendor.bio}</div>
                
                {/* Cinematic Media Integration */}
                <div className="elite-media-block">
                  <div style={{ width: '100%', height: '100%', background: '#08120d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <span style={{color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                       Play Cinematic Tour
                     </span>
                  </div>
                  <div className="elite-media-overlay">
                    <h3 className="elite-media-caption">Inside the {vendor.name} Greenhouses</h3>
                  </div>
                </div>
              </section>
            )}

            <section className="elite-section">
              <div className="elite-section-label">Elite Stage</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
                <h2 className="elite-section-heading" style={{ margin: 0 }}>Current Showpieces</h2>
                <span className="elite-count-pill">{inventory?.length || 0} available</span>
              </div>

              {inventory && inventory.length > 0 ? (
                <div className="elite-inventory-grid">
                  {inventory.map((item) => {
                    const hash = item.digital_passports?.[0]?.verification_hash;
                    
                    const cardContent = (
                      <>
                        <div className="elite-inv-image">
                          {item.image_url ? (
                            <Image src={item.image_url} alt={item.species_name} fill style={{ objectFit: 'cover' }} />
                          ) : (
                            <div className="elite-inv-placeholder">🌿</div>
                          )}
                          {item.quantity && item.quantity < 3 && (
                            <div className="elite-scarcity">Only {item.quantity} left</div>
                          )}
                          <div className="elite-inv-overlay" />
                        </div>
                        <div className="elite-inv-body">
                          <div className="elite-inv-variety">{item.variety ? `var. ${item.variety}` : 'Rare Specimen'}</div>
                          <h3 className="elite-inv-name">{item.species_name}</h3>
                          <div className="elite-inv-footer">
                            <span className="elite-inv-price">{item.price ? `$${item.price}` : 'Price on Request'}</span>
                            <span className="elite-inv-cta">{hash ? 'View CultivarID →' : 'Inquire →'}</span>
                          </div>
                        </div>
                      </>
                    );

                    if (hash) {
                      return (
                        <Link key={item.id} href={`/verify/${hash}`} className="elite-inv-card" style={{ textDecoration: 'none' }}>
                          {cardContent}
                        </Link>
                      );
                    }

                    return (
                      <div key={item.id} className="elite-inv-card">
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="elite-empty">
                  <div className="elite-empty-icon">🪴</div>
                  <h3>Stage Being Curated</h3>
                  <p>This elite grower&apos;s collection is being prepared. Contact directly to inquire about availability.</p>
                </div>
              )}
            </section>

            {/* The Private Vault */}
            <section className="elite-section">
              <div className="elite-vault">
                <div className="elite-vault-header">
                  <span className="elite-vault-icon">🔒</span>
                  <div>
                    <h2 className="elite-vault-title">The Private Vault</h2>
                    <span className="elite-vault-subtitle">Exclusive access to unreleased specimens and world-class mother plants.</span>
                  </div>
                </div>
                
                <div className="elite-inventory-grid">
                  {/* Mock Vault Item */}
                  <div className="elite-inv-card" style={{ border: '1px solid rgba(212,175,55,0.4)', background: '#000' }}>
                    <div className="elite-inv-image" style={{ filter: 'grayscale(80%) contrast(1.2)' }}>
                      <div className="elite-inv-placeholder">🤫</div>
                      <div className="elite-inv-overlay" />
                    </div>
                    <div className="elite-inv-body">
                      <div className="elite-inv-variety" style={{ color: 'var(--gold)' }}>Classified Asset</div>
                      <h3 className="elite-inv-name">Unreleased Variegated Mutation</h3>
                      <div className="elite-inv-footer">
                        <span className="elite-inv-price" style={{ filter: 'blur(4px)', opacity: 0.5 }}>$5000</span>
                        <button style={{ background: 'var(--gold)', color: '#000', border: 'none', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Request Access</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Vouched By Endorsements */}
            <section className="elite-section">
              <div className="elite-section-label">Endorsements</div>
              <h2 className="elite-section-heading">Vouched By</h2>
              <div className="elite-vouched-grid">
                <div className="elite-vouched-card">
                  <div className="elite-vouched-quote">
                    "I've sourced some of my rarest philodendrons from their private drops. Unmatched quality and genetics. They are the gold standard."
                  </div>
                  <div className="elite-vouched-user">
                    <div className="elite-vouched-avatar">M</div>
                    <div>
                      <span className="elite-vouched-name">Mickel D.</span>
                      <span className="elite-vouched-role">Verified Collector</span>
                    </div>
                  </div>
                </div>
                <div className="elite-vouched-card">
                  <div className="elite-vouched-quote">
                    "Flawless packaging and root systems. The CultivarID integration gives me peace of mind for my high-ticket investments."
                  </div>
                  <div className="elite-vouched-user">
                    <div className="elite-vouched-avatar">S</div>
                    <div>
                      <span className="elite-vouched-name">Sarah Jenkins</span>
                      <span className="elite-vouched-role">Aroid Specialist</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Lineage Showcase */}
            <section className="elite-section" style={{ paddingBottom: '0' }}>
              <div className="elite-section-label">Genetics</div>
              <h2 className="elite-section-heading">Foundation Lineage</h2>
              <div className="elite-lineage-grid">
                <div className="elite-lineage-card">
                  <div style={{ background: '#111', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🌿</div>
                  <div className="elite-lineage-label">BBMF Clone #4</div>
                </div>
                <div className="elite-lineage-card">
                  <div style={{ background: '#111', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🌿</div>
                  <div className="elite-lineage-label">Spiritus Sancti F1</div>
                </div>
                <div className="elite-lineage-card">
                  <div style={{ background: '#111', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🌿</div>
                  <div className="elite-lineage-label">Caramel Marble</div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="elite-sidebar">
            {/* Concierge contact card */}
            <div className="elite-concierge">
              <div className="elite-concierge-top">
                <div className="elite-concierge-gem">✦</div>
                <div>
                  <div className="elite-concierge-title">Elite Concierge</div>
                  <div className="elite-concierge-sub">Priority Access · Direct Line</div>
                </div>
              </div>
              <form className="elite-concierge-form">
                <div>
                  <label className="elite-form-label">I'm looking for...</label>
                  <input type="text" className="elite-input" placeholder="Specific plant or genus" />
                </div>
                <div>
                  <label className="elite-form-label">Budget Range</label>
                  <select className="elite-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="" disabled selected>Select an option</option>
                    <option>$500 - $1,000</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
                <div>
                  <label className="elite-form-label">Message</label>
                  <textarea className="elite-textarea" placeholder="Any specific requirements..."></textarea>
                </div>
                <button type="button" className="elite-cta-primary" style={{ marginTop: '0.5rem', width: '100%', border: 'none' }}>
                  Submit VIP Request
                </button>
                <button type="button" className="elite-cta-ghost">Request Video Tour</button>
              </form>
            </div>

            {/* Trust metrics */}
            <div className="elite-trust-card">
              <div className="elite-trust-heading">Verification Status</div>
              <ul className="elite-trust-list">
                <li className="elite-trust-item elite-trust-gold">
                  <span className="trust-icon">✦</span>
                  <div>
                    <strong>Elite Member in Good Standing</strong>
                    {vendor.elite_number && <span>Founder #{vendor.elite_number}</span>}
                  </div>
                </li>
                <li className="elite-trust-item">
                  <span className="trust-icon trust-green">✓</span>
                  <div><strong>Identity Verified</strong><span>Gov ID &amp; Business</span></div>
                </li>
                <li className="elite-trust-item">
                  <span className="trust-icon trust-green">✓</span>
                  <div><strong>Geo-Location Verified</strong><span>Physical nursery confirmed</span></div>
                </li>
                <li className="elite-trust-item">
                  <span className="trust-icon trust-green">✓</span>
                  <div><strong>Priority Response</strong><span>Replies within 24 hrs</span></div>
                </li>
              </ul>
            </div>

            {/* CultivarID */}
            <div className="elite-cultivar">
              <div className="elite-cultivar-glyph">◈</div>
              <div className="elite-cultivar-name">CultivarID™</div>
              <p className="elite-cultivar-desc">Scan any plant tag for provenance, lineage &amp; care history</p>
              <span className="elite-cultivar-soon">Coming Soon</span>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  // ── STANDARD PROFILE ──
  return (
    <main style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      <ProfileTracker vendorId={vendor.id} />
      <div style={{ background: "var(--bg-surface)", padding: "8rem 5% 4rem", borderBottom: "1px solid var(--glass-border)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "2.5rem", alignItems: "flex-start", position: "relative", zIndex: 2, flexWrap: "wrap" }}>
          <div style={{ flexShrink: 0 }}>
            {vendor.logo_url ? (
              <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--emerald)" }}>
                <Image src={vendor.logo_url} alt={vendor.name} width={120} height={120} style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className="vendor-avatar" style={{ width: 120, height: 120, fontSize: "2.5rem" }}>{initials}</div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", margin: 0, color: "var(--text-primary)" }}>{vendor.name}</h1>
              {vendor.is_verified ? <span className="verified-badge">✓ Verified Grower</span> : <span className="free-tier-badge">Seedling</span>}
            </div>
            {vendor.owner_name && <div style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: 500 }}>by {vendor.owner_name}</div>}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              {location && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><span>📍</span> {location}</div>}
              {vendor.website_url && <a href={vendor.website_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", textDecoration: "none" }}><span>🔗</span> Website</a>}
              {vendor.instagram && <a href={`https://instagram.com/${vendor.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", textDecoration: "none" }}><span>📸</span> Instagram</a>}
            </div>
            {vendor.specialty && vendor.specialty.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {vendor.specialty.map((s: string) => (
                  <span key={s} style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.05)", borderRadius: "20px", fontSize: "0.75rem", border: "1px solid var(--glass-border)" }}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 5%", display: "grid", gridTemplateColumns: "1fr 300px", gap: "3rem" }}>
        <div>
          {vendor.bio && (
            <section style={{ marginBottom: "4rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>About the Nursery</h2>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>{vendor.bio}</div>
            </section>
          )}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--text-primary)", margin: 0 }}>Current Inventory</h2>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{inventory?.length || 0} items available</span>
            </div>
            {inventory && inventory.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {inventory.map((item) => {
                  const hash = item.digital_passports?.[0]?.verification_hash;
                  
                  const cardContent = (
                    <>
                      {item.image_url ? (
                        <div style={{ height: "160px", background: "#111", position: "relative" }}>
                          <Image src={item.image_url} alt={item.species_name} fill style={{ objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ height: "160px", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "2rem" }}>🌿</div>
                      )}
                      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: "1rem", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>{item.species_name}</h3>
                        {item.variety && <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>var. {item.variety}</div>}
                        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "1.1rem" }}>{item.price ? `$${item.price}` : 'Price on Request'}</span>
                          {item.quantity && item.quantity < 3 && <span style={{ fontSize: "0.65rem", color: "#e74c3c", fontWeight: 700, padding: "2px 6px", background: "rgba(231,76,60,0.1)", borderRadius: "4px" }}>Only {item.quantity} left</span>}
                        </div>
                        {hash && (
                          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--emerald)", fontWeight: 600 }}>
                            View CultivarID →
                          </div>
                        )}
                      </div>
                    </>
                  );

                  const cardStyle = { background: "var(--bg-surface)", border: "1px solid var(--glass-border)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" as const, textDecoration: "none" };

                  if (hash) {
                    return (
                      <Link key={item.id} href={`/verify/${hash}`} style={cardStyle}>
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.id} style={cardStyle}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: "3rem", textAlign: "center", background: "var(--bg-surface)", borderRadius: "8px", border: "1px dashed var(--glass-border)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.5 }}>🪴</div>
                <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "var(--text-primary)" }}>No Inventory Listed</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>This vendor hasn&apos;t added any plants yet.</p>
              </div>
            )}
          </section>
        </div>
        <div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", borderRadius: "12px", padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 style={{ fontSize: "1rem", margin: "0 0 1rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>Contact Vendor</h3>
            <a href={`mailto:${vendor.contact_email}`} className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "0.8rem", textDecoration: "none", display: "block" }}>Send Inquiry</a>
            <div style={{ marginTop: "2rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", fontWeight: 600 }}>Trust Metrics</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}><span style={{ color: "var(--emerald)" }}>✓</span> Identity Verified</li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}><span style={{ color: "var(--emerald)" }}>✓</span> Geo-Location Verified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
