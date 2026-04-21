import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Search, MapPin, ShieldCheck, Star, AlertTriangle, ArrowRight, LockKeyhole, Filter, ChevronRight } from 'lucide-react';
import Link from "next/link";

export const revalidate = 60;

export default async function VendorsPage() {
  const supabase = createClient();

  // Fetch active vendors
  const { data: vendors, error } = await supabase
    .from('vendors')
    .select('name, slug, specialty, location_city, location_state, location_country, account_tier, is_verified, logo_url')
    .order('account_tier', { ascending: false }) 
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching vendors:", error);
  }

  const vendorsList = vendors || [];

  return (
    <main className="page-wrapper">
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '4rem' }}>
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Global Botanical Registry</div>
          <h1 className="section-title" style={{ fontSize: ' clamp(2.5rem, 6vw, 4.5rem)', maxWidth: '800px' }}>
            Discover Verified <em>Elite Growers</em>
          </h1>
          <p className="section-desc" style={{ margin: '1.5rem 0 0', maxWidth: '700px' }}>
            Browse the most exclusive network of rare plant specialists. Claim your listing to access the Authority Suite and secure your market position.
          </p>
          <div className="section-rule" style={{ margin: '2rem 0 0' }}></div>
        </div>

        {/* Search & Filter Bar (Themed) */}
        <div className="search-bar-container" style={{ marginBottom: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search className="search-icon" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', opacity: 0.6 }} size={20} />
            <input 
              type="text" 
              placeholder="Search by name, genus, or location..." 
              className="newsletter-input"
              style={{ paddingLeft: '3.5rem', width: '100%', borderRadius: '12px' }}
            />
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
            <Filter size={18} />
            Advanced Filters
          </button>
        </div>

        {/* Vendor Grid */}
        <div className="vendors-grid">
          {vendorsList.map((v) => {
            const location = [v.location_city, v.location_state || v.location_country].filter(Boolean).join(', ');
            const mockViews = Math.floor(Math.random() * 450) + 120;

            return (
              <div key={v.slug} className="vendor-card">
                <div className="vendor-card-content" style={{ position: 'relative', z.index: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div className="vendor-avatar">
                      {v.name.charAt(0)}
                    </div>
                    
                    {v.is_verified ? (
                      <span className="verified-badge"><ShieldCheck size={12} /> Verified</span>
                    ) : (
                      <span className="elite-badge" style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', boxShadow: 'none' }}>
                        <LockKeyhole size={12} /> Unclaimed
                      </span>
                    )}
                  </div>

                  <Link href={`/vendors/${v.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="vendor-name" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{v.name}</h3>
                  </Link>
                  
                  <p className="vendor-specialty">{v.specialty || 'Rare Plant Specialist'}</p>
                  
                  {location && (
                    <p className="vendor-location" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} /> {location}
                    </p>
                  )}

                  {!v.is_verified && (
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <AlertTriangle size={12} /> Potential Leads
                        </span>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                          <strong>{mockViews}</strong> profile views this month
                        </p>
                      </div>
                      <Link href="/onboarding" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
                        Claim Listing
                      </Link>
                    </div>
                  )}

                  {v.is_verified && (
                    <div style={{ marginTop: '2rem' }}>
                      <Link href={`/vendors/${v.slug}`} className="btn-ghost" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
                        View Profile
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {vendorsList.length === 0 && (
          <div className="section-header" style={{ padding: '8rem 0' }}>
            <h2 className="section-title">No Growers Found</h2>
            <p className="section-desc">Try adjusting your search filters or browse by specialty.</p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/vendors" className="btn-primary">Clear All Filters</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
