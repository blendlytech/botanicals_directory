'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <a href="#events" id="nav-events-link">Events</a>
        <a href="#vendors" id="nav-vendors-link">Vendors</a>
        <a href="#cultivar" id="nav-cultivar-link">CultivarID</a>
        <a href="#about" id="nav-about-link">About</a>
        <button className="btn-primary" id="nav-list-booth-btn">List Your Booth</button>
      </div>
    </nav>
  );
}
