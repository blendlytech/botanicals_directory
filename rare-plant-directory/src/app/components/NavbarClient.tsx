'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="main-navbar">
      <div className="logo-container">
        <Image
          src="/brand-seal.png"
          alt="Rare Plant Vendors Seal"
          width={52}
          height={52}
          className="brand-seal"
          priority
        />
        <span className="logo-text">Rare Plant Vendors</span>
      </div>
      <div className="nav-links">
        <a href="/events" id="nav-events-link">Events</a>
        <a href="/vendors" id="nav-vendors-link">Vendors</a>
        <a href="/scan" id="nav-cultivar-link">CultivarID</a>
        <a href="/about" id="nav-about-link">About</a>
        <a href="/collector/login" id="nav-collector-link" style={{ fontSize: '0.8rem', opacity: 0.7, marginRight: '1rem' }}>Collector Portal</a>
        <ThemeToggle />
        <a href="/for-vendors" className="btn-primary" id="nav-list-booth-btn">List Your Booth</a>
      </div>
    </nav>
  );
}
