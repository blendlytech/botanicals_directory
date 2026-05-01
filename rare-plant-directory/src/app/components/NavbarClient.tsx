'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Leaf, 
  Search, 
  Menu, 
  X, 
  User, 
  Database,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Construction
} from 'lucide-react';

export default function NavbarClient() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine Branding based on Path
  const isPermitRoute = pathname?.startsWith('/permits') || pathname?.startsWith('/leads');
  
  const brandName = isPermitRoute ? "Permit Data" : "Rare Plant Vendors";
  const brandLogo = isPermitRoute ? "/permit-data-logo.png" : "/logo.png";
  
  const navLinks = isPermitRoute ? [
    { name: 'Lead Database', href: '/leads', icon: <Database size={18} /> },
    { name: 'Pricing', href: '/pricing', icon: <ShieldCheck size={18} /> },
    { name: 'How it Works', href: '/how-it-works', icon: <TrendingUp size={18} /> },
  ] : [
    { name: 'Expos', href: '/events', icon: <Calendar size={18} /> },
    { name: 'Verified Vendors', href: '/vendors', icon: <ShieldCheck size={18} /> },
    { name: 'Detroit Expo', href: '/detroit', icon: <MapPin size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="max-w-[1440px] mx-auto px-[5%]">
        <div className={`relative flex items-center justify-between p-2 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-[var(--bg-nav-scrolled)] shadow-xl border border-[var(--glass-border)] backdrop-blur-md' 
            : 'bg-[var(--bg-nav)] border border-transparent'
        }`}>
          
          {/* ─── LOGO & BRAND ─── */}
          <Link href={isPermitRoute ? "/permits" : "/"} className="flex items-center gap-3 px-4 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <Image 
                  src={brandLogo}
                  alt={brandName}
                  width={40}
                  height={40}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
               />
            </div>
            <span className={`text-lg font-bold tracking-tight transition-colors ${
              isPermitRoute ? 'text-[#0088FF]' : 'text-[var(--emerald)]'
            }`} style={{ fontFamily: 'var(--font-heading)' }}>
              {brandName}
            </span>
          </Link>

          {/* ─── DESKTOP NAV ─── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.85rem] font-semibold text-[var(--text-nav)] hover:bg-[var(--gold-dim)] hover:text-[var(--gold)] transition-all duration-300"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* ─── ACTION BUTTONS ─── */}
          <div className="flex items-center gap-3 pr-2">
            <Link 
              href={isPermitRoute ? "/leads" : "/onboarding"}
              className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.85rem] font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 ${
                isPermitRoute 
                  ? 'bg-[#0088FF] text-white hover:bg-[#0077EE]' 
                  : 'bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[var(--gold-light)]'
              }`}
            >
              {isPermitRoute ? 'Lead Database →' : 'Join as Vendor →'}
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* ─── MOBILE MENU ─── */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 px-[5%] md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[var(--bg-card)] rounded-3xl p-6 shadow-2xl border border-[var(--glass-border)]">
             <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl hover:bg-[var(--bg-surface)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold-dim)] flex items-center justify-center text-[var(--gold)]">
                      {link.icon}
                    </div>
                    <span className="font-bold">{link.name}</span>
                  </Link>
                ))}
                <hr className="my-2 border-[var(--glass-border)]" />
                <Link 
                  href={isPermitRoute ? "/login" : "/portal"}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--gold)] text-[var(--charcoal)] font-bold justify-center"
                >
                  {isPermitRoute ? 'Contractor Portal' : 'Vendor Portal'}
                </Link>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
}
