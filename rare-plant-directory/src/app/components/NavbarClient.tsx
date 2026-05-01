'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShieldCheck,
  MapPin,
  Calendar,
  Database,
  TrendingUp
} from 'lucide-react';

export default function NavbarClient() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine Branding based on Path
  const isPermitRoute = pathname?.startsWith('/permits') || pathname?.startsWith('/leads') || pathname?.startsWith('/checkout');
  
  const brandName = isPermitRoute ? "Permit Data" : "Rare Plant Vendors";
  const brandLogo = isPermitRoute ? "/permit-data-logo.png" : "/campaign-logo.png";
  
  const navLinks = isPermitRoute ? [
    { name: 'Lead Database', href: '/leads', icon: <Database size={16} /> },
    { name: 'Pricing', href: '/pricing', icon: <ShieldCheck size={16} /> },
    { name: 'How it Works', href: '/how-it-works', icon: <TrendingUp size={16} /> },
  ] : [
    { name: 'Expos', href: '/events', icon: <Calendar size={16} /> },
    { name: 'Verified Vendors', href: '/vendors', icon: <ShieldCheck size={16} /> },
    { name: 'Detroit Expo', href: '/detroit', icon: <MapPin size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.5s ease',
    padding: isScrolled ? '0.75rem 5%' : '1.5rem 5%',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    borderRadius: '100px',
    transition: 'all 0.5s ease',
    backgroundColor: isScrolled ? 'var(--bg-nav-scrolled)' : 'var(--bg-nav)',
    border: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
    boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
  };

  const linkStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: 600,
    textDecoration: 'none',
    color: 'var(--text-nav)',
    transition: 'all 0.3s ease',
  };

  const btnStyles: React.CSSProperties = {
    padding: '0.6rem 1.5rem',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: 800,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: isPermitRoute ? '#0088FF' : 'var(--gold)',
    color: isPermitRoute ? 'white' : 'var(--charcoal)',
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        
        {/* Logo */}
        <Link href={isPermitRoute ? "/permits" : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img 
            src={brandLogo}
            alt={brandName}
            style={{ 
              width: '40px', 
              height: '40px', 
              objectFit: 'contain',
              display: 'block'
            }}
          />
          <span style={{ 
            fontSize: '1.1rem', 
            fontWeight: 700, 
            color: isPermitRoute ? '#0088FF' : 'var(--emerald)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em'
          }}>
            {brandName}
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} style={linkStyles} className="nav-link">
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href={isPermitRoute ? "/leads" : "/onboarding"} style={btnStyles} className="desktop-nav">
            {isPermitRoute ? 'Lead Database →' : 'Join as Vendor →'}
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: 'none',
              backgroundColor: 'var(--bg-surface)',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ 
          marginTop: '1rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '24px', 
          padding: '1.5rem', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: '16px', 
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Responsive Hidden CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
        .nav-link:hover {
          background-color: var(--gold-dim);
          color: var(--gold) !important;
        }
      `}</style>
    </nav>
  );
}
