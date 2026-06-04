'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShieldCheck,
  MapPin,
  Calendar,
  Database,
  TrendingUp,
  LogIn,
  UserPlus,
  DollarSign,
  Crown,
  Handshake,
  ChevronDown,
  Store,
  Leaf,
  Compass,
  Smartphone,
  Sparkles
} from 'lucide-react';

/* ─────────────── DROPDOWN DATA ─────────────── */
const vendorDropdown = [
  { name: 'Claim Your Listing', href: '/vendors', icon: <ShieldCheck size={16} />, desc: 'Find & claim your free profile' },
  { name: 'Why RPV?', href: '/for-vendors', icon: <Store size={16} />, desc: 'See what makes us different' },
  { name: 'Vendor Pricing', href: '/pricing', icon: <DollarSign size={16} />, desc: 'Plans starting at $9.99/mo' },
  { name: 'Vendor Login', href: '/login', icon: <LogIn size={16} />, desc: 'Access your dashboard' },
];

const collectorDropdown = [
  { name: 'Collector Pricing', href: '/collector/pricing', icon: <Crown size={16} />, desc: 'Free & premium tiers' },
  { name: 'Verify a Plant', href: '/scan', icon: <Smartphone size={16} />, desc: 'Tap or enter a Plant ID' },
  { name: 'Collector Waitlist', href: '/collector/waitlist', icon: <Sparkles size={16} />, desc: 'Get early access' },
  { name: 'Collector Sign In', href: '/collector/login', icon: <LogIn size={16} />, desc: 'View your collection' },
];

const discoverDropdown = [
  { name: 'Verified Vendors', href: '/vendors', icon: <ShieldCheck size={16} />, desc: 'Browse trusted growers' },
  { name: 'Expos & Events', href: '/events', icon: <Calendar size={16} />, desc: 'Upcoming rare plant shows' },
  { name: 'Partners', href: '/partners', icon: <Handshake size={16} />, desc: 'Strategic partnerships' },
];

/* ─────────────── DROPDOWN PANEL ─────────────── */
function DropdownPanel({ 
  items, 
  isOpen, 
  onClose 
}: { 
  items: typeof vendorDropdown; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        top: 'calc(100% + 0.75rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '300px',
        background: 'var(--bg-card)',
        border: '1px solid var(--glass-border)',
        borderRadius: '20px',
        padding: '0.75rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(20px)',
        zIndex: 2000,
        animation: 'dropdownFadeIn 0.2s ease forwards',
      }}
    >
      {items.map((item, i) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className="dropdown-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.85rem 1rem',
            borderRadius: '14px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(212,175,55,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            flexShrink: 0,
          }}>
            {item.icon}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3 }}>{item.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>{item.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────── TOP-LEVEL DROPDOWN TRIGGER ─────────────── */
function NavDropdown({ 
  label, 
  items, 
  activeDropdown, 
  setActiveDropdown, 
  id 
}: { 
  label: string; 
  items: typeof vendorDropdown; 
  activeDropdown: string | null; 
  setActiveDropdown: (id: string | null) => void; 
  id: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = activeDropdown === id;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <div 
      ref={ref} 
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        className="nav-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.6rem 1rem',
          borderRadius: '100px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: isOpen ? 'var(--gold)' : '#F5F0E8',
          background: isOpen ? 'var(--gold-dim)' : 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
        }}
      >
        {label}
        <ChevronDown 
          size={14} 
          style={{ 
            transition: 'transform 0.2s ease', 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.6 
          }} 
        />
      </button>
      <DropdownPanel items={items} isOpen={isOpen} onClose={() => setActiveDropdown(null)} />
    </div>
  );
}

/* ─────────────── MAIN NAVBAR ─────────────── */
export default function NavbarClient() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isPermitRoute = pathname?.startsWith('/permits') || pathname?.startsWith('/leads') || pathname?.startsWith('/checkout');
  
  const brandName = isPermitRoute ? "Permit Data" : "Rare Plant Vendors";
  const brandLogo = isPermitRoute ? "/permit-data-logo.png" : "/vendors/blendly-elite/brand-logo-nobkg.svg";

  const permitLinks = [
    { name: 'Lead Database', href: '/leads', icon: <Database size={16} /> },
    { name: 'Pricing', href: '/pricing', icon: <ShieldCheck size={16} /> },
    { name: 'How it Works', href: '/how-it-works', icon: <TrendingUp size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (activeDropdown && !(e.target as HTMLElement).closest('.nav-dropdown-zone')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [activeDropdown]);

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: isPermitRoute ? 0 : '38px',
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
    background: isPermitRoute 
      ? (isScrolled ? 'var(--bg-nav-scrolled)' : 'var(--bg-nav)')
      : 'linear-gradient(90deg, #040806 0%, #0B3D2E 50%, #040806 100%)',
    border: isPermitRoute
      ? (isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent')
      : '1px solid var(--gold)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
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

  /* ── MOBILE ACCORDION SECTION ── */
  const MobileSection = ({ title, items }: { title: string; items: typeof vendorDropdown }) => {
    const isExpanded = mobileExpanded === title;
    return (
      <div>
        <button
          onClick={() => setMobileExpanded(isExpanded ? null : title)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '1rem 1.25rem',
            borderRadius: '16px',
            border: 'none',
            background: isExpanded ? 'var(--gold-dim)' : 'var(--bg-surface)',
            color: isExpanded ? 'var(--gold)' : 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {title}
          <ChevronDown 
            size={16} 
            style={{ 
              transition: 'transform 0.2s ease', 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' 
            }} 
          />
        </button>
        {isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem 0 0 1rem' }}>
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  transition: 'background 0.15s ease',
                }}
              >
                <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {!isPermitRoute && (
        <Link href="/vendors" className="announcement-bar">
          <div className="marquee-container">
            <div className="marquee-content">
              <div className="marquee-item">
                🌿 <span>THE DIRECTORY:</span> SEARCH VERIFIED RARE PLANT VENDORS NEAR YOU
              </div>
              <div className="marquee-item">
                ✦ FILTER BY LOCATION, SPECIALTY &amp; SHIPPING
              </div>
              <div className="marquee-item">
                ✦ <span>VENDORS:</span> CLAIM YOUR FREE DIRECTORY LISTING TODAY
              </div>
              <div className="marquee-item">
                ✦ <span>COLLECTORS:</span> BUY FROM TRUSTED, REVIEWED GROWERS →
              </div>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <div className="marquee-item">
                🌿 <span>THE DIRECTORY:</span> SEARCH VERIFIED RARE PLANT VENDORS NEAR YOU
              </div>
              <div className="marquee-item">
                ✦ FILTER BY LOCATION, SPECIALTY &amp; SHIPPING
              </div>
              <div className="marquee-item">
                ✦ <span>VENDORS:</span> CLAIM YOUR FREE DIRECTORY LISTING TODAY
              </div>
              <div className="marquee-item">
                ✦ <span>COLLECTORS:</span> BUY FROM TRUSTED, REVIEWED GROWERS →
              </div>
            </div>
          </div>
        </Link>
      )}
      <nav style={navStyles}>
        <div style={containerStyles}>
        
        {/* Logo */}
        <Link href={isPermitRoute ? "/permits" : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img 
            src={brandLogo}
            alt={brandName}
            style={{ 
              width: '52px', 
              height: '52px', 
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.3s ease'
            }}
          />
          <span style={{ 
            fontSize: '1.1rem', 
            fontWeight: 700, 
            color: isPermitRoute ? '#0088FF' : '#F5F0E8',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em'
          }}>
            {brandName}
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav nav-dropdown-zone">
          {isPermitRoute ? (
            permitLinks.map((link) => (
              <Link key={link.name} href={link.href} className="nav-link" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.25rem', borderRadius: '100px', fontSize: '0.85rem',
                fontWeight: 600, textDecoration: 'none', color: 'var(--text-nav)', transition: 'all 0.3s ease',
              }}>
                {link.icon} {link.name}
              </Link>
            ))
          ) : (
            <>
              <NavDropdown label="For Vendors" items={vendorDropdown} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} id="vendors" />
              <NavDropdown label="For Collectors" items={collectorDropdown} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} id="collectors" />
              <NavDropdown label="Discover" items={discoverDropdown} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} id="discover" />
            </>
          )}
        </div>

        {/* Action Buttons + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!isPermitRoute && (
            <Link href="/collector/waitlist" className="desktop-nav collector-cta" style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid var(--gold)',
              color: '#F5F0E8',
              background: 'transparent',
            }}>
              Collector Waitlist 🔥
            </Link>
          )}
          <Link href={isPermitRoute ? "/leads" : "/vendors"} style={btnStyles} className="desktop-nav">
            {isPermitRoute ? 'Lead Database →' : 'Claim Your Listing →'}
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              width: '40px', height: '40px', borderRadius: '50%', border: 'none',
              backgroundColor: isPermitRoute ? 'var(--bg-surface)' : 'rgba(255, 255, 255, 0.1)',
              cursor: 'pointer', 
              color: isPermitRoute ? 'var(--text-primary)' : '#FFFFFF'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isPermitRoute && (
        <div style={{ 
          marginTop: '1rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '24px', 
          padding: '1.5rem', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid var(--glass-border)',
          maxHeight: '70vh',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <MobileSection title="For Vendors" items={vendorDropdown} />
            <MobileSection title="For Collectors" items={collectorDropdown} />
            <MobileSection title="Discover" items={discoverDropdown} />
            
            <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link
                href="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '1rem',
                  borderRadius: '16px',
                  background: 'var(--gold)',
                  color: 'var(--charcoal)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Claim Your Listing →
              </Link>
              <Link 
                href="/collector/waitlist"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '1rem',
                  borderRadius: '16px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  border: '1px solid var(--glass-border)',
                }}
              >
                🔥 Collector Waitlist
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu for Permit Routes */}
      {mobileMenuOpen && isPermitRoute && (
        <div style={{ 
          marginTop: '1rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '24px', 
          padding: '1.5rem', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {permitLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                  borderRadius: '16px', textDecoration: 'none', color: 'var(--text-primary)',
                  fontWeight: 600, backgroundColor: 'var(--bg-surface)'
                }}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
        .nav-link:hover {
          background-color: var(--gold-dim) !important;
          color: var(--gold) !important;
        }
        .dropdown-item:hover {
          background-color: var(--bg-surface) !important;
        }
        .collector-cta:hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          background: var(--gold-dim) !important;
        }
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 2rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFFFFF;
        }
        .marquee-item span {
          color: var(--gold);
        }
        .announcement-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 38px;
          background: linear-gradient(90deg, #040806 0%, #0B3D2E 50%, #040806 100%);
          border-bottom: 1px solid var(--gold);
          display: flex;
          align-items: center;
          z-index: 2001;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
        }
        .announcement-bar:hover {
          background: linear-gradient(90deg, #08120d 0%, #145A43 50%, #08120d 100%);
        }
        .announcement-bar:hover .marquee-item {
          color: var(--gold-light);
        }
      `}} />
    </nav>
  </>
  );
}
