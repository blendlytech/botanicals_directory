'use client';
import Image from "next/image";

export default function FooterClient() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Image
              src="/brand-seal.png"
              alt="RPV Seal"
              width={44}
              height={44}
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.4))" }}
            />
            <span className="logo-text" style={{ fontSize: "1.2rem" }}>Rare Plant Vendors</span>
          </div>
          <p>The world&apos;s premier directory for rare botanical events, verified growers, and serious collectors. Est. 2026.</p>
        </div>

        <div className="footer-col">
          <h4>Discover</h4>
          <a href="#events" id="footer-events-link">Upcoming Events</a>
          <a href="#vendors" id="footer-vendors-link">Verified Vendors</a>
          <a href="#cultivar" id="footer-cultivar-link">CultivarID™</a>
          <a href="#" id="footer-map-link">Event Map</a>
        </div>

        <div className="footer-col">
          <h4>For Vendors</h4>
          <a href="#" id="footer-list-booth-link">List Your Booth</a>
          <a href="#" id="footer-verification-link">Verification Program</a>
          <a href="#" id="footer-passport-link">Digital Passport</a>
          <a href="#" id="footer-pricing-link">Pricing</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#" id="footer-about-link">About Us</a>
          <a href="#" id="footer-blog-link">Blog</a>
          <a href="#" id="footer-contact-link">Contact</a>
          <a href="#" id="footer-privacy-link">Privacy Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Rare Plant Vendors Directory. All rights reserved.</span>
        <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", color: "var(--gold)", opacity: 1 }}>
          The Rolex of Plant Sites™
        </span>
      </div>
    </footer>
  );
}
