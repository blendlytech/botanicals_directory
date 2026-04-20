import Image from "next/image";

/* ── SVG LEAF DECORATIONS ── */
function LeafSVG({ size = 200, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ opacity }}>
      <path d="M100 180 C60 160, 20 120, 20 80 C20 40, 60 10, 100 10 C140 10, 180 40, 180 80 C180 120, 140 160, 100 180Z" fill="#145A43" />
      <path d="M100 180 L100 10" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
      <path d="M100 60 C80 55, 40 65, 20 80" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      <path d="M100 90 C75 82, 40 90, 20 80" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      <path d="M100 120 C78 110, 45 112, 30 100" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      <path d="M100 60 C120 55, 160 65, 180 80" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      <path d="M100 90 C125 82, 160 90, 180 80" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
      <path d="M100 120 C122 110, 155 112, 170 100" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

/* ── MONSTERA SVG ── */
function MonsteraSVG({ size = 300, opacity = 0.05 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" style={{ opacity }}>
      <ellipse cx="150" cy="150" rx="120" ry="110" fill="#145A43" />
      <path d="M150 40 C130 80, 80 100, 60 140 C40 180, 80 240, 150 260 C220 240, 260 180, 240 140 C220 100, 170 80, 150 40Z" fill="#0B3D2E" />
      <ellipse cx="100" cy="120" rx="25" ry="15" fill="#080f0b" />
      <ellipse cx="200" cy="130" rx="20" ry="12" fill="#080f0b" />
      <ellipse cx="130" cy="180" rx="18" ry="10" fill="#080f0b" />
      <path d="M150 260 L150 40" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" />
      <path d="M150 100 C120 95, 80 110, 60 140" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
      <path d="M150 130 C120 125, 85 130, 60 140" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
      <path d="M150 160 C125 155, 95 155, 75 165" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
      <path d="M150 100 C180 95, 220 110, 240 140" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
      <path d="M150 130 C180 125, 215 130, 240 140" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
      <path d="M150 160 C175 155, 205 155, 225 165" stroke="#D4AF37" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

/* ── TICKER DATA ── */
const tickerItems = [
  { label: "Next Event", value: "PlantCon Houston" },
  { label: "Verified Vendors", value: "847+" },
  { label: "Events Listed", value: "120 This Season" },
  { label: "Species Tracked", value: "12,000+" },
  { label: "Collector Network", value: "34,000 Members" },
  { label: "New This Week", value: "Monstera Obliqua Peru" },
  { label: "Featured Show", value: "Texas Aroid Show — June 8" },
  { label: "CultivarID Scans", value: "2.1M Completed" },
];

/* ── EVENT DATA ── */
const events = [
  {
    id: "plantcon-houston",
    date: "May 15–16, 2026",
    title: "PlantCon Houston 2026",
    location: "NRG Arena, Houston, TX",
    desc: "The largest plant hobbyist convention in the world. 200+ premium vendors. Exclusive collector's auction nightly.",
    vendors: 42,
    badge: "VIP · Selling Fast",
    badgeClass: "",
    gradient: "linear-gradient(145deg, #0B3D2E 0%, #145A43 100%)",
    emoji: "🌿",
  },
  {
    id: "texas-aroid",
    date: "June 8, 2026",
    title: "Texas Aroid Show",
    location: "Berry Center, Cypress, TX",
    desc: "Hyper-focused on rare aroids. Meet specialized regional nurseries, expert breeders, and the rarest Philodendrons.",
    vendors: 15,
    badge: "Specialist Show",
    badgeClass: "",
    gradient: "linear-gradient(145deg, #1a3a2a 0%, #D4AF37 200%)",
    emoji: "🪴",
  },
  {
    id: "botanicals-brews",
    date: "July 22, 2026",
    title: "Botanicals & Brews",
    location: "Mayflower Brewing Co, Plymouth, MA",
    desc: "A curated lifestyle market blending uncommon botanical vendors with craft beverages. New England's finest growers.",
    vendors: 8,
    badge: "Lifestyle Event",
    badgeClass: "sold",
    gradient: "linear-gradient(145deg, #1a2a1a 0%, #4a7a3a 100%)",
    emoji: "🍃",
  },
];

/* ── VENDOR DATA ── */
const vendors = [
  { name: "Verdant Roots Co.", specialty: "Rare Aroids", location: "Austin, TX", initials: "VR", events: 12, isElite: true },
  { name: "The Philodendron Lab", specialty: "Philodendrons", location: "Portland, OR", initials: "PL", events: 8, isElite: false },
  { name: "Monstera Collective", specialty: "Monstera & Variegates", location: "Miami, FL", initials: "MC", events: 19, isElite: false },
  { name: "Botanical Cipher", specialty: "Orchids & Epiphytes", location: "Seattle, WA", initials: "BC", events: 5, isElite: false },
  { name: "Deep Forest Nursery", specialty: "Hoya Specialists", location: "Denver, CO", initials: "DF", events: 7, isElite: false },
  { name: "Apex Aroids", specialty: "Anthurium & Alocasia", location: "Atlanta, GA", initials: "AA", events: 14, isElite: false },
  { name: "The Green Vault", specialty: "Caudiciforms", location: "Phoenix, AZ", initials: "GV", events: 3, isElite: false },
  { name: "Jungle Dispatch", specialty: "Ferns & Selaginella", location: "New Orleans, LA", initials: "JD", events: 6, isElite: false },
];

/* ── FEATURES ── */
const features = [
  {
    icon: "🔬",
    title: "CultivarID™",
    desc: "AI-powered species identification and provenance verification. Scan any plant and receive scientific lineage, care data, and market value in seconds.",
  },
  {
    icon: "🗺️",
    title: "Interactive Booth Maps",
    desc: "3D floor plans for every event. Filter by genus, variegation type, or price tier. Know exactly where your wishlist plant will be before you arrive.",
  },
  {
    icon: "📜",
    title: "Digital Passport",
    desc: "Immutable certificates of authenticity for rare specimens. Verify propagation method, mother-plant lineage, and genetic origin — eliminating fraud.",
  },
  {
    icon: "🤖",
    title: "Wishlist Matching",
    desc: "Our AI matches your collector wishlist against real-time vendor inventory. Get instant alerts when a Monstera Obliqua or Thai Constellation hits the floor.",
  },
  {
    icon: "✅",
    title: "Verified Grower Program",
    desc: "Vendors undergo rigorous geo-tagged nursery verification. The 'Verified Grower' badge means buyers transact with complete confidence.",
  },
  {
    icon: "📊",
    title: "Inventory Forecasting",
    desc: "AI-driven demand predictions help vendors stock smarter. Reduce perishable waste, maximize sell-through, and scale profitability event by event.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ═══════════════════════════════════════ HERO ═══ */}
      <section className="hero">
        <div className="hero-grid-overlay" />

        {/* Floating botanical decorations */}
        <div className="hero-leaf-1" style={{ position: "absolute", top: "10%", left: "5%" }}>
          <LeafSVG size={180} opacity={0.08} />
        </div>
        <div className="hero-leaf-2" style={{ position: "absolute", top: "15%", right: "6%" }}>
          <MonsteraSVG size={260} opacity={0.06} />
        </div>
        <div className="hero-leaf-3" style={{ position: "absolute", bottom: "10%", left: "8%" }}>
          <LeafSVG size={220} opacity={0.05} />
        </div>
        <div style={{ position: "absolute", bottom: "5%", right: "5%", animation: "floatLeaf 13s ease-in-out infinite 3s" }}>
          <MonsteraSVG size={200} opacity={0.04} />
        </div>

        <div className="hero-eyebrow" id="hero-eyebrow">
          <div className="hero-eyebrow-dot" />
          Est. 2026 · The Premier Botanical Event Directory
        </div>

        <h1 id="hero-heading">
          Where <em>Serious</em><br />Collectors<br />Converge
        </h1>

        <p className="hero-sub" id="hero-subheading">
          Discover the world&apos;s most exclusive rare plant expos. Preview verified vendor inventory before the doors open. Buy with absolute confidence.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" id="hero-find-event-btn">Find an Event Near Me</button>
          <button className="btn-ghost" id="hero-browse-vendors-btn">Browse Verified Vendors</button>
        </div>

        <div className="hero-seal">
          <Image
            src="/brand-seal.png"
            alt="Rare Plant Vendors Official Seal"
            width={110}
            height={110}
            style={{ filter: "drop-shadow(0 0 28px rgba(212,175,55,0.6))" }}
          />
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll to Explore</span>
        </div>
      </section>

      {/* ═════════════════════════════════ TRUST STRIP ═══ */}
      <div className="trust-strip" id="trust-strip">
        <div className="trust-item"><span className="trust-icon">✅</span>Verified Growers Only</div>
        <div className="trust-item"><span className="trust-icon">🔒</span>Secure Transactions</div>
        <div className="trust-item"><span className="trust-icon">📜</span>Digital Provenance</div>
        <div className="trust-item"><span className="trust-icon">🗺️</span>Interactive Floor Maps</div>
        <div className="trust-item"><span className="trust-icon">🤖</span>AI Wishlist Matching</div>
        <div className="trust-item"><span className="trust-icon">🌿</span>12,000+ Species Tracked</div>
      </div>

      {/* ═════════════════════════════════ TICKER ═══ */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div className="ticker-item" key={i}>
              <div className="ticker-dot" />
              {item.label}: <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════ STATS ═══ */}
      <section className="section section-dark" id="about">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">847+</div>
            <div className="stat-label">Verified Vendors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">120</div>
            <div className="stat-label">Events This Season</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12K+</div>
            <div className="stat-label">Species Tracked</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">34K</div>
            <div className="stat-label">Collector Network</div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════ EVENTS ═══ */}
      <section className="section section-dark" id="events">
        <div className="section-header">
          <div className="section-eyebrow">Curated Shows</div>
          <h2 className="section-title">Upcoming <em>Expos & Swaps</em></h2>
          <p className="section-desc">Every event is vetted, mapped, and populated with pre-verified vendor inventory. No surprises — only rare finds.</p>
          <div className="section-rule" />
        </div>

        <div className="events-grid">
          {events.map((ev) => (
            <div className="event-card" key={ev.id} id={`event-${ev.id}`}>
              <div className="event-card-image">
                <div
                  className="event-card-image-bg"
                  style={{ background: ev.gradient }}
                >
                  {/* SVG botanical art per card */}
                  <MonsteraSVG size={180} opacity={0.18} />
                  <span style={{
                    position: "absolute",
                    fontSize: "4rem",
                    bottom: "1rem",
                    right: "1.5rem",
                    opacity: 0.3,
                  }}>{ev.emoji}</span>
                </div>
                <div className={`event-card-badge${ev.badgeClass ? " " + ev.badgeClass : ""}`}>
                  {ev.badge}
                </div>
              </div>
              <div className="event-card-body">
                <div className="event-card-date">{ev.date}</div>
                <h3 className="event-card-title">{ev.title}</h3>
                <div className="event-card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {ev.location}
                </div>
                <p className="event-card-desc">{ev.desc}</p>
                <div className="event-card-footer">
                  <div className="vendor-count">
                    <strong>{ev.vendors}</strong> Vendor Previews Available
                  </div>
                  <button className="btn-primary" id={`event-view-btn-${ev.id}`} style={{ padding: "0.6rem 1.25rem", fontSize: "0.72rem" }}>
                    View Event →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn-ghost" id="view-all-events-btn">View All 120 Events This Season</button>
        </div>
      </section>

      {/* ═════════════════════════════════ VENDORS ═══ */}
      <section className="section section-forest" id="vendors">
        <div className="section-header">
          <div className="section-eyebrow">Verified Growers</div>
          <h2 className="section-title">Meet the <em>Specialists</em></h2>
          <p className="section-desc">Every vendor on our directory has passed geo-verified nursery inspection. Their badge is your guarantee.</p>
          <div className="section-rule" />
        </div>

        <div className="vendors-grid">
          {vendors.map((v) => (
            <div className="vendor-card" key={v.name} id={`vendor-${v.initials.toLowerCase()}`}>
              <div className="vendor-avatar">{v.initials}</div>
              <div className="vendor-name">{v.name}</div>
              <div className="vendor-specialty">{v.specialty}</div>
              <div className="vendor-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "inline", marginRight: "4px" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {v.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                {v.isElite ? (
                  <span className="elite-badge">✦ Elite Grower</span>
                ) : (
                  <span className="verified-badge">✓ Verified Grower</span>
                )}
                <span style={{ fontSize: "0.72rem", color: "var(--sand)", opacity: 0.55 }}>{v.events} shows</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn-ghost" id="browse-all-vendors-btn">Browse All 847 Verified Vendors</button>
        </div>
      </section>

      {/* ═════════════════════════════════ FEATURES ═══ */}
      <section className="section section-dark" id="cultivar">
        <div className="section-header">
          <div className="section-eyebrow">Platform Features</div>
          <h2 className="section-title">Built for the <em>Serious</em> Collector</h2>
          <p className="section-desc">Every feature is engineered around the real logistics of the rare plant market — provenance, verification, and discovery.</p>
          <div className="section-rule" />
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title} id={`feature-${f.title.toLowerCase().replace(/[^a-z]/g, "-")}`}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════ MARQUEE BRAND STRIP ═══ */}
      <div style={{
        background: "var(--emerald)",
        padding: "2.5rem 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid var(--glass-border)",
        borderBottom: "1px solid var(--glass-border)",
      }}>
        <div style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          animation: "ticker 20s linear infinite",
        }}>
          {Array(12).fill("RARE PLANT VENDORS · EST. 2026 · THE ROLEX OF PLANT SITES · ").map((t, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "rgba(212,175,55,0.4)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              paddingRight: "3rem",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════ CTA ═══ */}
      <section className="cta-section">
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <MonsteraSVG size={600} opacity={1} />
        </div>
        <div className="section-eyebrow" style={{ position: "relative" }}>Join the Network</div>
        <h2 style={{ position: "relative" }}>
          The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>First to Know</em><br />Always Find the Rarest
        </h2>
        <p style={{ position: "relative" }}>
          Get early access to event listings, exclusive vendor inventory previews, and CultivarID alerts — before general release.
        </p>
        <div className="newsletter-form" style={{ position: "relative" }}>
          <input
            id="newsletter-email-input"
            type="email"
            className="newsletter-input"
            placeholder="your@email.com"
          />
          <button className="btn-primary" id="newsletter-submit-btn">Subscribe</button>
        </div>
        <p style={{
          position: "relative",
          fontSize: "0.72rem",
          color: "var(--sand)",
          opacity: 0.4,
          marginTop: "1rem",
        }}>
          No spam. Unsubscribe anytime. Collector-first, always.
        </p>
      </section>
    </main>
  );
}
