'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [{href:'/vendors',name:'Find Vendors'},{href:'/events',name:'Find Events'},{href:'/for-vendors',name:'For Vendors'},{href:'/login',name:'Vendor Sign In'}];
export default function DirectoryNavigation() {
  const [open,setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className="rpv-directory-header"><div className="rpv-directory-nav">
    <Link href="/" className="rpv-directory-brand">Rare Plant Vendors</Link>
    <button className="rpv-directory-toggle" type="button" aria-expanded={open} aria-controls="rpv-directory-links" onClick={()=>setOpen(!open)}>{open ? 'Close menu' : 'Menu'}</button>
    <nav id="rpv-directory-links" aria-label="Main navigation" className={open ? 'rpv-directory-links is-open' : 'rpv-directory-links'} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);}}>
      {links.map(l=><Link key={l.href} href={l.href} aria-current={pathname===l.href ? 'page' : undefined} onClick={()=>setOpen(false)}>{l.name}</Link>)}
    </nav>
  </div><style>{`
    .rpv-directory-header{position:fixed;top:0;left:0;right:0;z-index:1000;background:#0b3023;border-bottom:1px solid #bfa25d;color:#fff}
    .rpv-directory-nav{max-width:1280px;margin:auto;padding:1.4rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
    .rpv-directory-brand{color:#fff;text-decoration:none;font-family:Georgia,serif;font-size:1.25rem;font-weight:700}
    .rpv-directory-links{display:flex;align-items:center;gap:1.5rem}.rpv-directory-links a{color:#edf2e9;text-decoration:none;font-size:.85rem;font-weight:600}
    .rpv-directory-links a[aria-current=page]{color:#ecd497;text-decoration:underline;text-underline-offset:6px}
    .rpv-directory-toggle{display:none;border:1px solid #bfa25d;background:transparent;color:white;padding:.65rem 1rem;border-radius:8px;font:inherit}
    .rpv-directory-header a:focus-visible,.rpv-directory-toggle:focus-visible{outline:3px solid #ecd497;outline-offset:5px}
    @media(max-width:760px){.rpv-directory-toggle{display:block}.rpv-directory-links{display:none;width:100%;flex-direction:column;align-items:stretch;gap:0}.rpv-directory-links.is-open{display:flex}.rpv-directory-links a{padding:1rem 0}}
  `}</style></header>;
}
