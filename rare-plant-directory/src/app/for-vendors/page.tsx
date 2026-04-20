import Image from "next/image";
import PricingToggle from "../components/PricingToggle";

/* ── ELITE BENEFITS ── */
const eliteBenefits = [
  {
    icon: "⚡",
    title: "Skip-the-Line Wishlist Matching",
    desc: "When a collector adds a rare specimen to their wishlist, Elite vendors are notified 24 hours before the general marketplace. First right of refusal on the hottest leads.",
  },
  {
    icon: "🗺️",
    title: "Premium Map Placement",
    desc: "Your booth appears in gold on every 3D interactive event map — larger, brighter, and automatically drawing foot traffic on the day of the expo.",
  },
  {
    icon: "📧",
    title: "Rare Finds Spotlight",
    desc: "A guaranteed quarterly feature in our email newsletter to the 34,000+ collector network. We spotlight your highest-ticket specimen to serious buyers.",
  },
  {
    icon: "🎨",
    title: "Enhanced Profile Customization",
    desc: "Embed 3D plant scans, video headers, direct booking links for private greenhouse tours, and custom branding on your vendor profile page.",
  },
  {
    icon: "💰",
    title: "Reduced Transaction Fees",
    desc: "Elite vendors pay a reduced 2% platform fee on all marketplace transactions, compared to the standard 5%. The savings compound fast at volume.",
  },
  {
    icon: "📊",
    title: "AI Market Analytics Dashboard",
    desc: "Exclusive access to real-time search data — see exactly which species are trending up in collector wishlists before you stock for the season.",
  },
];



/* ── TESTIMONIALS (mock) ── */
const testimonials = [
  {
    quote: "The Elite wishlist matching alone paid for the annual fee in the first month. I sold three Monstera Obliqua Peru before the expo doors even opened.",
    name: "Marcus Chen",
    title: "Verdant Roots Co. · Austin, TX",
    initials: "MC",
  },
  {
    quote: "Premium map placement is real. My booth traffic increased 40% compared to last year. Collectors came directly to me because they saw the gold pin.",
    name: "Sofia Reyes",
    title: "Apex Aroids · Atlanta, GA",
    initials: "SR",
  },
  {
    quote: "The analytics dashboard showed me Anthurium Regale searches were spiking two weeks before PlantCon. I stocked heavy and sold out completely.",
    name: "James Okafor",
    title: "The Green Vault · Phoenix, AZ",
    initials: "JO",
  },
];

export default function ForVendors() {
  return (
    <main>
      {/* ═══════════════════════ HERO ═══ */}
      <section className="vendor-hero">
        <div className="hero-grid-overlay" />
        <div className="vendor-hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            Limited to 100 Vendors Worldwide
          </div>
          <h1>
            The <em>Elite</em> Grower<br />Program
          </h1>
          <p className="hero-sub">
            Join the most exclusive network of verified rare plant vendors on earth.
            Premium placement. First-access leads. AI-powered market intelligence.
            Only 100 seats — ever.
          </p>
          <div className="vendor-hero-price">
            <span className="price-amount">$999</span>
            <span className="price-period">/ year</span>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" id="elite-apply-btn">Apply for Elite Status</button>
            <button className="btn-ghost" id="elite-learn-btn">See What&apos;s Included</button>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--sand)", opacity: 0.5, marginTop: "1.5rem" }}>
            Only 100 total seats. 73 remain. No waitlist — when they&apos;re gone, they&apos;re gone.
          </p>
        </div>
        <div className="vendor-hero-seal">
          <Image
            src="/brand-seal.png"
            alt="Elite Grower Seal"
            width={180}
            height={180}
            style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.6))" }}
          />
        </div>
      </section>

      {/* ═══════════════════════ SCARCITY BAR ═══ */}
      <div className="scarcity-bar">
        <div className="scarcity-inner">
          <div className="scarcity-label">
            <span className="elite-badge" style={{ fontSize: "0.6rem" }}>✦ Elite</span>
            <span>73 of 100 seats remaining</span>
          </div>
          <div className="scarcity-track">
            <div className="scarcity-fill" style={{ width: "27%" }} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════ BENEFITS ═══ */}
      <section className="section section-dark" id="benefits">
        <div className="section-header">
          <div className="section-eyebrow">Exclusive Benefits</div>
          <h2 className="section-title">Everything You Get with <em>Elite</em></h2>
          <p className="section-desc">
            Six powerful advantages that separate Elite vendors from the rest of the marketplace.
          </p>
          <div className="section-rule" />
        </div>

        <div className="features-grid">
          {eliteBenefits.map((b) => (
            <div className="feature-card" key={b.title} id={`benefit-${b.title.toLowerCase().replace(/[^a-z]/g, "-")}`}>
              <div className="feature-icon">{b.icon}</div>
              <h3 className="feature-title">{b.title}</h3>
              <p className="feature-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ PRICING ═══ */}
      <section className="section section-forest" id="pricing">
        <div className="section-header">
          <div className="section-eyebrow">Choose Your Tier</div>
          <h2 className="section-title">Simple, <em>Transparent</em> Pricing</h2>
          <p className="section-desc">
            Start free. Upgrade when you&apos;re ready. Every tier unlocks more visibility, trust, and revenue.
          </p>
          <div className="section-rule" />
        </div>

        <PricingToggle />
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══ */}
      <section className="section section-dark" id="testimonials">
        <div className="section-header">
          <div className="section-eyebrow">From Our Elite Vendors</div>
          <h2 className="section-title">Built for <em>Results</em></h2>
          <div className="section-rule" />
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name} id={`testimonial-${t.initials.toLowerCase()}`}>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="vendor-avatar" style={{ width: 44, height: 44, fontSize: "1rem" }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", opacity: 0.8 }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ ROI CALCULATOR ═══ */}
      <section className="section section-forest" id="roi">
        <div className="section-header">
          <div className="section-eyebrow">The Math</div>
          <h2 className="section-title">Your <em>Return</em> on $999</h2>
          <div className="section-rule" />
        </div>

        <div className="roi-grid">
          <div className="roi-card">
            <div className="roi-number">$999</div>
            <div className="roi-label">Annual Investment</div>
          </div>
          <div className="roi-card">
            <div className="roi-number" style={{ color: "#fff" }}>→</div>
            <div className="roi-label">Converts Into</div>
          </div>
          <div className="roi-card">
            <div className="roi-number">3%</div>
            <div className="roi-label">Reduced Platform Fees</div>
          </div>
          <div className="roi-card">
            <div className="roi-number">24hr</div>
            <div className="roi-label">Head Start on Hot Leads</div>
          </div>
          <div className="roi-card">
            <div className="roi-number">34K</div>
            <div className="roi-label">Newsletter Reach</div>
          </div>
          <div className="roi-card">
            <div className="roi-number">40%↑</div>
            <div className="roi-label">Avg. Booth Traffic Increase</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CTA ═══ */}
      <section className="cta-section">
        <div className="section-eyebrow" style={{ position: "relative" }}>73 Seats Remaining</div>
        <h2 style={{ position: "relative" }}>
          Claim Your <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Elite</em> Seat
        </h2>
        <p style={{ position: "relative", fontSize: "1rem", color: "var(--sand)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.7, fontWeight: 300 }}>
          When 100 seats are filled, the program closes. No waitlist. No exceptions.
          Secure your position as one of the world&apos;s premier rare plant vendors.
        </p>
        <div style={{ position: "relative", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" id="final-apply-btn" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem" }}>
            Apply for Elite — $999/yr
          </button>
        </div>
        <p style={{ position: "relative", fontSize: "0.72rem", color: "var(--sand)", opacity: 0.4, marginTop: "1.5rem" }}>
          30-day money-back guarantee. Cancel anytime. Your seat is released upon cancellation.
        </p>
      </section>
    </main>
  );
}
