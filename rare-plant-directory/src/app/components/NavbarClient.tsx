'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function NavbarClient() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="main-navbar">
      <Link href="/" className="logo-container">
        <Image
          src="/permit-data-logo.png"
          alt="Permit Data Logo"
          width={180}
          height={60}
          className="brand-logo"
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>
      <div className="nav-links">
        <Link href="/leads" id="nav-leads-link">Lead Database</Link>
        <Link href="/pricing" id="nav-pricing-link">Pricing</Link>
        <Link href="/about" id="nav-about-link">How it Works</Link>
        <Link href="/login" id="nav-portal-link" style={{ fontSize: '0.8rem', opacity: 0.7, marginRight: '1rem' }}>Contractor Portal</Link>
        <ThemeToggle />
        <Link href="/signup" className="btn-primary" id="nav-get-leads-btn">Get Free Sample</Link>
      </div>
    </nav>
  );
}
