import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Search, MapPin, ShieldCheck, Star, AlertTriangle, ArrowRight, LockKeyhole, Filter, ChevronRight } from 'lucide-react';
import Link from "next/link";

export const revalidate = 60;

type VendorsSearchParams = {
  q?: string;
  location?: string;
  specialty?: string;
  shipping?: string;
};

export default async function VendorsPage({ searchParams }: { searchParams?: VendorsSearchParams }) {
  const supabase = createClient();

  const q = (searchParams?.q || '').trim().toLowerCase();
  const locationFilter = (searchParams?.location || '').trim().toLowerCase();
  const specialtyFilter = (searchParams?.specialty || '').trim().toLowerCase();
  // NOTE: `shipping` is accepted from the directory search but not yet filterable —
  // the shipping fields land with the schema work in implementation_plan.md §2.
  const hasFilters = !!(q || locationFilter || specialtyFilter || searchParams?.shipping);

  // Fetch active vendors
  const { data: vendors, error } = await supabase
    .from('vendors')
    .select('name, slug, specialty, location_city, location_state, location_country, account_tier, is_verified, user_id, logo_url, hero_url, is_elite')
    .order('account_tier', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching vendors:", error);
  }

  const specialtyText = (s: unknown) => (Array.isArray(s) ? s.join(' ') : String(s || '')).toLowerCase();

  const filteredVendors = (vendors || []).filter((v) => {
    const locText = [v.location_city, v.location_state, v.location_country].filter(Boolean).join(' ').toLowerCase();
    const specText = specialtyText(v.specialty);

    if (q) {
      const haystack = `${v.name} ${specText} ${locText}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (locationFilter && !locText.includes(locationFilter)) return false;
    if (specialtyFilter && !specText.includes(specialtyFilter)) return false;
    return true;
  });

  const vendorsList = [...filteredVendors].sort((a, b) => {
    const aVerifiedElite = a.is_verified && a.account_tier === 'elite';
    const bVerifiedElite = b.is_verified && b.account_tier === 'elite';

    if (aVerifiedElite && !bVerifiedElite) return -1;
    if (!aVerifiedElite && bVerifiedElite) return 1;

    const aClaimed = !!a.user_id;
    const bClaimed = !!b.user_id;
    if (aClaimed && !bClaimed) return -1;
    if (!aClaimed && bClaimed) return 1;

    return 0;
  });

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

        {/* Search & Filter Bar (Themed) — GET form keeps results shareable/server-rendered */}
        <form method="GET" action="/vendors" className="search-bar-container" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search className="search-icon" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', opacity: 0.6 }} size={20} />
            <input
              type="text"
              name="q"
              defaultValue={searchParams?.q || ''}
              placeholder="Search by name, genus, or location..."
              className="newsletter-input"
              style={{ paddingLeft: '3.5rem', width: '100%', borderRadius: '12px' }}
            />
          </div>
          <input
            type="text"
            name="location"
            defaultValue={searchParams?.location || ''}
            placeholder="Location"
            className="newsletter-input"
            style={{ width: '180px', borderRadius: '12px' }}
          />
          <select name="specialty" defaultValue={searchParams?.specialty || ''} className="newsletter-input" style={{ width: '180px', borderRadius: '12px' }}>
            <option value="">All specialties</option>
            {['Aroids', 'Hoyas', 'Philodendron', 'Anthurium', 'Begonias', 'Orchids', 'Carnivorous', 'Succulents & Cacti'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
            <Filter size={18} />
            Filter
          </button>
        </form>

        {/* Results summary */}
        <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--gold)' }}>{vendorsList.length}</strong> {vendorsList.length === 1 ? 'vendor' : 'vendors'}
            {hasFilters ? ' match your search' : ' in the directory'}
          </span>
          {hasFilters && (
            <Link href="/vendors" style={{ fontSize: '0.8rem', color: 'var(--gold)', textDecoration: 'underline' }}>
              Clear filters
            </Link>
          )}
        </div>

        {/* Vendor Grid */}
        <div className="vendors-grid">
          {vendorsList.map((v, idx) => {
            const location = [v.location_city, v.location_state || v.location_country].filter(Boolean).join(', ');
            const mockViews = Math.floor(Math.random() * 55) + 12;
            const isClaimed = !!v.user_id;
            
            // Premium background images for verified vendors
            const backgrounds = [
              'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1520412099561-63819215bb01?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1466781783364-391eaf50cf2a?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800'
            ];
            const bgImage = v.hero_url || backgrounds[idx % backgrounds.length];

            return (
              <div 
                key={v.slug} 
                className={`vendor-card ${v.is_verified ? 'is-verified' : ''}`}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div className="vendor-avatar" style={(v.logo_url || isClaimed) ? { width: '112px', height: '112px', padding: 0, overflow: 'hidden' } : { width: '112px', height: '112px' }}>
                      {v.logo_url ? (
                        <img src={v.logo_url} alt={`${v.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : isClaimed ? (
                        <img src={`https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(v.slug || v.name)}`} alt={`${v.name} generated logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        v.name.charAt(0)
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      {v.is_verified && (
                        <span className="verified-badge"><ShieldCheck size={12} /> Verified</span>
                      )}

                      {!isClaimed && (
                        <span className="elite-badge" style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', boxShadow: 'none', fontSize: '0.6rem' }}>
                          <LockKeyhole size={10} /> Unclaimed
                        </span>
                      )}
                    </div>
                  </div>

                  <Link href={`/vendors/${v.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="vendor-name" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{v.name}</h3>
                  </Link>
                  
                  <p className="vendor-specialty">{Array.isArray(v.specialty) ? v.specialty.join(', ') : (v.specialty || 'Rare Plant Specialist')}</p>
                  
                  {location && (
                    <p className="vendor-location" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} /> {location}
                    </p>
                  )}

                  {!isClaimed ? (
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <AlertTriangle size={12} /> Potential Leads
                        </span>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                          <strong>{mockViews}</strong> profile views this month
                        </p>
                      </div>
                      <Link href={`/claim/${v.slug}`} className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
                        Claim Listing
                      </Link>
                    </div>
                  ) : (
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
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
