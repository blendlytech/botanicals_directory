'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const isCampaignPage = pathname === "/miami" || pathname === "/detroit";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isCampaignPage) {
    return (
      <nav className={`navbar campaign-navbar${scrolled ? " scrolled" : ""}`} id="campaign-navbar">
        <Link href={pathname} className="logo-container">
          <Image
            src="/campaign-logo.png"
            alt="Plant Vendors Campaign"
            width={48}
            height={48}
            className="brand-seal"
            priority
          />
          <span className="logo-text campaign-logo-text">Plant<br />Vendors</span>
        </Link>
        <div className="nav-links campaign-nav-links">
          <Link href="#apply" id="nav-apply-link">Apply Now</Link>
          <Link href="#about" id="nav-about-link">The Festival</Link>
          <Link href="/login" id="nav-login-link" style={{ fontSize: '0.8rem', opacity: 0.7 }}>Portal</Link>
          <ThemeToggle />
          <Link href="#apply" className="btn-primary campaign-btn" id="nav-get-booth-btn">Reserve Booth</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="main-navbar">
      <Link href="/" className="logo-container">
        <Image
          src="/brand-seal.png"
          alt="Rare Plant Vendors Seal"
          width={52}
          height={52}
          className="brand-seal"
          priority
        />
        <span className="logo-text">Rare Plant<br />Vendors</span>
      </Link>
      <div className="nav-links">
        <Link href="/events" id="nav-events-link">Events</Link>
        <Link href="/vendors" id="nav-vendors-link">Vendors</Link>
        <Link href="/scan" id="nav-cultivar-link">CultivarID</Link>
        <Link href="/about" id="nav-about-link">About</Link>
        <a href="/collector/login" id="nav-collector-link" style={{ fontSize: '0.8rem', opacity: 0.7, marginRight: '1rem' }}>Collector Portal</a>
        <Link href="/login" id="nav-vendor-portal-link" style={{ fontSize: '0.8rem', opacity: 0.7, marginRight: '1rem' }}>Vendor Portal</Link>
        <ThemeToggle />
        <Link href="/for-vendors" className="btn-primary" id="nav-list-booth-btn">List Your Booth</Link>
      </div>
    </nav>
  );
}
