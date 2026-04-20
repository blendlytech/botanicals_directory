'use client';
import { useState } from "react";

const tiers = [
  {
    name: "Seedling",
    badge: "Free",
    badgeClass: "free-tier-badge",
    monthlyPrice: 0,
    annualPrice: 0,
    desc: "Claim your vendor profile. Add your photo, tell your story, and get discovered.",
    features: [
      { text: "Claim & Own Your Vendor Profile", included: true },
      { text: "Vendor Photo & Logo Upload", included: true },
      { text: "About Me / Description Section", included: true },
      { text: "Social Media Links", included: true },
      { text: "Up to 10 Inventory Items", included: true },
      { text: "Event Booth Listing (1 event)", included: true },
      { text: "Standard Map Pin", included: true },
      { text: "Community Forum Access", included: true },
      { text: "Verified Grower Badge", included: false },
      { text: "Wishlist Match Notifications", included: false },
      { text: "Profile Customization", included: false },
      { text: "AI Market Analytics", included: false },
    ],
    cta: "Claim Your Profile",
    ctaClass: "btn-ghost",
    highlight: false,
  },
  {
    name: "Verified Grower",
    badge: "✓ Verified",
    badgeClass: "verified-badge",
    monthlyPrice: 29,
    annualPrice: 299,
    desc: "The professional tier. Verification, visibility, and serious collector access.",
    features: [
      { text: "Enhanced Directory Listing", included: true },
      { text: "Up to 100 Inventory Items", included: true },
      { text: "Unlimited Event Booths", included: true },
      { text: "Verified Grower Badge", included: true },
      { text: "Standard Wishlist Matching", included: true },
      { text: "5 Digital Passports / month", included: true },
      { text: "Basic Profile Customization", included: true },
      { text: "4% Platform Transaction Fee", included: true },
      { text: "Email Support (48hr)", included: true },
      { text: "Newsletter Features", included: false },
      { text: "Premium Map Placement", included: false },
      { text: "AI Market Analytics", included: false },
    ],
    cta: "Apply for Verification",
    ctaClass: "btn-verified",
    highlight: false,
  },
  {
    name: "Pro Grower",
    badge: "★ Pro",
    badgeClass: "pro-tier-badge",
    monthlyPrice: 59,
    annualPrice: 599,
    desc: "Maximum visibility and advanced tools for high-volume vendors scaling fast.",
    features: [
      { text: "Up to 500 Inventory Items", included: true },
      { text: "Unlimited Event Booths", included: true },
      { text: "Pro Grower Badge", included: true },
      { text: "Enhanced Wishlist Matching", included: true },
      { text: "20 Digital Passports / month", included: true },
      { text: "Advanced Profile Customization", included: true },
      { text: "Premium Map Placement", included: true },
      { text: "Newsletter Features", included: true },
      { text: "3% Platform Transaction Fee", included: true },
      { text: "Basic Analytics Dashboard", included: true },
      { text: "Priority Email Support (24hr)", included: true },
      { text: "Rare Finds Priority Alerts", included: false },
    ],
    cta: "Upgrade to Pro",
    ctaClass: "btn-verified",
    highlight: true,
  },
  {
    name: "Elite Grower",
    badge: "✦ Elite",
    badgeClass: "elite-badge",
    monthlyPrice: null,
    annualPrice: 999,
    annualOnly: true,
    desc: "The unfair advantage. Only 100 seats worldwide. Premium everything.",
    features: [
      { text: "Unlimited Inventory Items", included: true },
      { text: "Unlimited Event Booths", included: true },
      { text: "Elite Grower Badge", included: true },
      { text: "24hr Early Wishlist Matching", included: true },
      { text: "Unlimited Digital Passports", included: true },
      { text: "Full Profile (3D, Video, Booking)", included: true },
      { text: "Gold Premium Map Placement", included: true },
      { text: "Quarterly Newsletter Spotlight", included: true },
      { text: "2% Platform Transaction Fee", included: true },
      { text: "AI Market Analytics Dashboard", included: true },
      { text: "Dedicated Account Rep", included: true },
      { text: "Rare Finds Priority Alerts", included: true },
    ],
    cta: "Claim Elite Seat",
    ctaClass: "btn-primary",
    highlight: false,
    limited: true,
  },
];

export default function PricingToggle() {
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");

  return (
    <div>
      {/* Toggle */}
      <div className="billing-toggle" id="billing-toggle">
        <button
          className={`toggle-btn${billing === "monthly" ? " active" : ""}`}
          onClick={() => setBilling("monthly")}
          id="toggle-monthly-btn"
        >
          Monthly
        </button>
        <button
          className={`toggle-btn${billing === "annual" ? " active" : ""}`}
          onClick={() => setBilling("annual")}
          id="toggle-annual-btn"
        >
          Annual
          <span className="save-tag">Save 15%</span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-grid">
        {tiers.map((tier) => {
          const isAnnualOnly = (tier as any).annualOnly;
          const price = isAnnualOnly ? tier.annualPrice : (billing === "annual" ? tier.annualPrice : tier.monthlyPrice);
          const period = isAnnualOnly ? "/year" : (billing === "annual" ? "/year" : "/month");
          return (
            <div
              className={`pricing-card${tier.highlight ? " pricing-featured" : ""}${tier.limited ? " pricing-elite" : ""}`}
              key={tier.name}
              id={`pricing-${tier.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {tier.limited && (
                <div className="pricing-limited-tag">Only 100 Seats Worldwide</div>
              )}
              {tier.highlight && (
                <div className="pricing-popular-tag">Most Popular</div>
              )}

              <span className={tier.badgeClass} style={{ marginBottom: "1rem", display: "inline-flex" }}>
                {tier.badge}
              </span>
              <h3 className="pricing-name">{tier.name}</h3>
              <p className="pricing-desc">{tier.desc}</p>

              <div className="pricing-price-row">
                <span className="pricing-dollar">{price === 0 ? "Free" : `$${price}`}</span>
                {price > 0 && <span className="pricing-period">{period}</span>}
              </div>

              <button className={tier.ctaClass} style={{ width: "100%", marginBottom: "2rem" }} id={`pricing-cta-${tier.name.toLowerCase().replace(/\s/g, "-")}`}>
                {tier.cta}
              </button>

              <ul className="pricing-features">
                {tier.features.map((f) => (
                  <li key={f.text} className={f.included ? "included" : "excluded"}>
                    <span className="feature-check">{f.included ? "✓" : "—"}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
