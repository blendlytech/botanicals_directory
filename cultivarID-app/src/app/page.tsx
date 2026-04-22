import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ── Ambient background orbs ── */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            <span className={`font-display ${styles.logoText}`}>CultivarID</span>
          </div>
          <nav className={styles.nav}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How It Works</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
          </nav>
          <a href="/dashboard" className="btn btn-gold">
            Vendor Login
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={`badge badge-gold animate-fade-in-up`}>
            <span>✦</span>
            Digital Provenance for Rare Plants
          </div>

          <h1 className={`font-display ${styles.heroTitle} animate-fade-in-up delay-100`}>
            Every Cultivar Has<br />
            <span className="shimmer-text">A Story Worth Telling</span>
          </h1>

          <p className={`${styles.heroSubtitle} animate-fade-in-up delay-200`}>
            CultivarID replaces fragile paper tags with immutable digital passports.
            Track lineage, generate QR care tags, and synchronize your inventory —
            all in one Rolex-tier platform.
          </p>

          <div className={`${styles.heroCta} animate-fade-in-up delay-300`}>
            <a href="/register" className="btn btn-gold" id="hero-cta-primary">
              Start Your Passport Registry
            </a>
            <a href="#how-it-works" className="btn btn-outline" id="hero-cta-secondary">
              See How It Works
            </a>
          </div>

          {/* Trust signals */}
          <div className={`${styles.trustBar} animate-fade-in-up delay-500`}>
            <span className={styles.trustItem}>
              <span className="text-emerald">✓</span> Provenance Verified
            </span>
            <span className={styles.trustDot}>·</span>
            <span className={styles.trustItem}>
              <span className="text-emerald">✓</span> Instant QR Generation
            </span>
            <span className={styles.trustDot}>·</span>
            <span className={styles.trustItem}>
              <span className="text-emerald">✓</span> Live POS Sync
            </span>
          </div>
        </div>

        {/* Floating passport card mockup */}
        <div className={`${styles.heroVisual} animate-fade-in-up delay-300`}>
          <div className={`glass-card ${styles.passportCard} animate-float`}>
            <div className={styles.passportHeader}>
              <span className="badge badge-verified">✦ Verified Specimen</span>
              <span className={styles.passportId}>CID-0047-A</span>
            </div>
            <div className={styles.passportPlantName}>
              <span className={`font-display ${styles.plantSpecies}`}>Monstera deliciosa</span>
              <span className={styles.plantCultivar}>&apos;Thai Constellation&apos;</span>
            </div>
            <div className={styles.passportMeta}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Origin</span>
                <span className={styles.metaValue}>Tissue Culture · TC-Lab-22</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Mother Plant</span>
                <span className={styles.metaValue}>CID-0001-A (Verified)</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Propagation</span>
                <span className={styles.metaValue}>Meristem Division</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Status</span>
                <span className={`badge badge-emerald`}>Available</span>
              </div>
            </div>
            <div className={styles.passportQr}>
              {/* SVG QR placeholder */}
              <div className={styles.qrPlaceholder} aria-label="QR Code">
                <div className={styles.qrGrid}>
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.qrCell}
                      style={{ opacity: Math.random() > 0.45 ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
              <span className={styles.qrLabel}>Scan to verify</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className={`section ${styles.features}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="divider-gold" />
            <p className={`badge badge-gold ${styles.sectionEyebrow}`}>Core Features</p>
            <h2 className={`font-display ${styles.sectionTitle}`}>
              Built for the Serious<br />Botanical Collector
            </h2>
            <p className={styles.sectionSubtitle}>
              Every feature engineered to earn trust, command premium prices,
              and eliminate the chaos of the expo floor.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.id} className={`glass-card ${styles.featureCard}`} id={f.id}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={`font-display ${styles.featureTitle}`}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className={`section ${styles.howItWorks}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="divider-gold" />
            <p className={`badge badge-gold ${styles.sectionEyebrow}`}>Workflow</p>
            <h2 className={`font-display ${styles.sectionTitle}`}>From Tag to Trust<br />in Three Steps</h2>
          </div>
          <div className={styles.stepsRow}>
            {steps.map((s, idx) => (
              <div key={s.id} className={styles.step} id={s.id}>
                <div className={styles.stepNumber}>{String(idx + 1).padStart(2, "0")}</div>
                <h3 className={`font-display ${styles.stepTitle}`}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={`section ${styles.ctaBanner}`}>
        <div className="container">
          <div className={`glass-card ${styles.ctaInner}`}>
            <div className={styles.orb4} aria-hidden="true" />
            <p className="badge badge-gold">Founders Offer — Limited to 100</p>
            <h2 className={`font-display ${styles.ctaTitle}`}>
              Secure Your <span className="shimmer-text">Lifetime Access</span>
            </h2>
            <p className={styles.ctaSubtitle}>
              Lock in the Founders rate at <strong className="text-gold">$98 one-time</strong> before
              we launch the full subscription. The booth next to you will have it.
            </p>
            <a href="/register?plan=founders" className="btn btn-gold animate-pulse-glow" id="cta-founders">
              Claim Your Founders Spot →
            </a>
            <p className={styles.ctaNote}>No recurring fees. Cancel anytime after launch period.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            <span className={`font-display ${styles.logoText}`}>CultivarID</span>
          </div>
          <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
            © {new Date().getFullYear()} CultivarID. A RarePlantVendors Company.
          </p>
          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>Privacy</a>
            <a href="/terms" className={styles.footerLink}>Terms</a>
            <a href="mailto:hello@cultivarid.com" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── Static Data ── */
const features = [
  {
    id: "feature-provenance",
    icon: "🧬",
    title: "Digital Provenance Ledger",
    desc: "Record genetic origin, propagation method, and mother-plant IDs. Build an immutable chain of custody for every specimen you sell.",
  },
  {
    id: "feature-qr",
    icon: "⬛",
    title: "Dynamic QR Care Tags",
    desc: "Instantly generate printable, durable QR codes for your booth. Customers scan to see the full passport. No app required.",
  },
  {
    id: "feature-discovery",
    icon: "🌿",
    title: "Immersive Passport View",
    desc: "A mobile-first specimen page that dazzles collectors the moment they scan — high-res imagery, lineage, care guide, and verification badge.",
  },
  {
    id: "feature-pos",
    icon: "⚡",
    title: "Real-Time POS & Inventory",
    desc: "Mark specimens sold from your dashboard or the scan view. Inventory syncs instantly across all devices. Double-selling is impossible.",
  },
];

const steps = [
  {
    id: "step-register",
    title: "Register Your Specimen",
    desc: "Enter the plant's name, lineage details, care instructions, and upload high-res photography through your vendor dashboard.",
  },
  {
    id: "step-generate",
    title: "Generate & Print the QR Tag",
    desc: "One click creates a unique QR code linked to the digital passport. Print as a laminated care tag for your expo booth.",
  },
  {
    id: "step-sell",
    title: "Sell with Confidence",
    desc: "Collectors scan the tag to verify authenticity. Close the sale, mark it sold, and your inventory updates in real time.",
  },
];
