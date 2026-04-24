'use client';

import { useState } from "react";
import { ShieldCheck, Zap, Star, Lock, ChevronRight, Globe, TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Sprout",
      planId: "sprout",
      badge: "Starter",
      icon: <Lock className="w-6 h-6 text-slate-500" />,
      priceMonthly: 14.99,
      priceAnnual: 144,
      period: isAnnual ? "/yr" : "/mo",
      desc: "Perfect for first-time vendors and weekend market hobbyists.",
      features: [
        { text: "25 Dynamic QR Codes", included: true },
        { text: "Unlimited Static QR Codes", included: true },
        { text: "Basic Scan Analytics", included: true },
        { text: "1 Mobile Linkpage", included: true },
        { text: "Digital Care Logs", included: false },
        { text: "Lead Capture Forms", included: false },
      ],
      cta: "Get Sprout",
      highlight: false,
    },
    {
      name: "Bloom",
      planId: "bloom",
      badge: "Vendor Favorite",
      icon: <TrendingUp className="w-6 h-6 text-emerald-700" />,
      priceMonthly: 39.99,
      priceAnnual: 384,
      period: isAnnual ? "/yr" : "/mo",
      desc: "The choice for established vendors and frequent pop-up sellers.",
      features: [
        { text: "250 Dynamic QR Codes", included: true },
        { text: "Advanced Market Analytics", included: true },
        { text: "Digital Care Log Integration", included: true },
        { text: "10 Mobile Linkpages", included: true },
        { text: "Email Lead Capture", included: true },
        { text: "White-label Custom Domain", included: false },
      ],
      cta: "Grow with Bloom",
      highlight: true,
      tag: "Recommended",
    },
    {
      name: "Canopy",
      planId: "canopy",
      badge: "Scale",
      icon: <Globe className="w-6 h-6 text-amber-600" />,
      priceMonthly: 129.99,
      priceAnnual: 1248,
      period: isAnnual ? "/yr" : "/mo",
      desc: "Enterprise-grade infrastructure for major greenhouse operators.",
      features: [
        { text: "Unlimited Dynamic QR Codes", included: true },
        { text: "White-label Custom Domain", included: true },
        { text: "Bulk QR Generation", included: true },
        { text: "Meta & Google Ads Integration", included: true },
        { text: "API Access for CRM", included: true },
        { text: "Priority Search Ranking", included: true },
      ],
      cta: "Scale with Canopy",
      highlight: false,
    },
    {
      name: "Elite Founder",
      planId: "elite",
      badge: "Legacy Status",
      icon: <Star className="w-6 h-6 text-amber-500" />,
      priceMonthly: 497,
      priceAnnual: 497,
      period: "once",
      desc: "One-time investment for lifetime access. No renewals. Owned forever.",
      features: [
        { text: "All Canopy Features", included: true },
        { text: "Permanent 'Founder' Badge", included: true },
        { text: "Zero Transaction Fees", included: true },
        { text: "Managed 24h Setup", included: true },
        { text: "Featured Marketplace Spotlight", included: true },
        { text: "Lifetime Value $10,000+", included: true },
      ],
      cta: "Claim Lifetime Seat",
      highlight: false,
      tag: "17 Seats Left",
      isElite: true,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-8">
      
      {/* FOMO Messaging */}
      <div className="max-w-3xl mx-auto text-center mb-12 bg-white p-8 rounded-3xl border-2 border-emerald-100 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-3 flex items-center justify-center gap-3">
           <AlertCircle className="text-amber-500" size={28} /> Don't Lose Sales to the Booth Next Door
        </h3>
        <p className="text-slate-700 text-lg leading-relaxed">
          It's a no-brainer: The cost of <strong>Sprout</strong> is less than printing a single batch of flyers. 
          The real cost? The thousands in lost revenue because your neighbor booth has <strong>CultivarID</strong> to capture leads, and you don't.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-slate-200 p-1.5 rounded-full inline-flex items-center relative">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${!isAnnual ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${isAnnual ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Annually <span className="ml-2 text-[10px] uppercase tracking-widest text-white bg-emerald-600 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
          
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-out"
            style={{ transform: isAnnual ? 'translateX(calc(100% + 6px))' : 'translateX(6px)' }}
          />
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pb-12">
        {tiers.map((tier) => {
           const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
           const displayPrice = price.toFixed(price % 1 === 0 ? 0 : 2).split('.');
           const isElite = (tier as any).isElite;

           return (
            <div
              key={tier.name}
              className={`relative p-6 md:p-8 rounded-[32px] transition-all duration-300 flex flex-col
              ${tier.highlight 
                ? 'bg-slate-900 text-white border-4 border-emerald-500 scale-105 shadow-2xl z-10' 
                : isElite
                  ? 'bg-[#0B3D2E] text-white border-4 border-amber-500 shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                  : 'bg-white border-2 border-slate-100 shadow-lg hover:border-emerald-200'}`}
            >
              {tier.tag && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap z-20
                  ${tier.highlight ? 'bg-emerald-500 text-white' : isElite ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'}`}>
                  {tier.tag}
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${tier.highlight || isElite ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {tier.icon}
                  </div>
                </div>
                <h3 className={`text-2xl font-black mb-2 tracking-tight ${tier.highlight || isElite ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <p className={`text-xs font-medium leading-relaxed ${tier.highlight || isElite ? 'text-slate-200' : 'text-slate-500'}`}>{tier.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${tier.highlight ? 'text-emerald-400' : isElite ? 'text-amber-400' : 'text-slate-900'}`}>$</span>
                    <span className={`text-5xl font-black ${tier.highlight ? 'text-emerald-400' : isElite ? 'text-amber-400' : 'text-slate-900'}`}>
                      {displayPrice[0]}
                    </span>
                    {displayPrice[1] && <span className={`text-xl font-bold ${tier.highlight ? 'text-emerald-400' : isElite ? 'text-amber-400' : 'text-slate-900'}`}>.{displayPrice[1]}</span>}
                    <span className={`text-xs font-bold ml-1 ${tier.highlight || isElite ? 'text-slate-400' : 'text-slate-400'}`}>{tier.period}</span>
                  </div>
                  {isAnnual && tier.period !== "once" && (
                    <div className={`text-[10px] uppercase tracking-widest font-black mt-3 flex items-center gap-2
                      ${tier.highlight ? 'text-emerald-400' : 'text-emerald-600'}`}>
                       <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                       Billed Annually
                    </div>
                  )}
                  {isElite && (
                    <div className={`text-[10px] uppercase tracking-widest font-black mt-3 flex items-center gap-2 text-amber-400`}>
                       <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                       Lifetime Pass
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={`/onboarding?plan=${tier.planId}`}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-sm transition-all hover:-translate-y-1 active:scale-95 mb-8 shadow-lg
                  ${tier.highlight 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-emerald-500/20' 
                    : isElite
                      ? 'bg-amber-500 hover:bg-amber-600 text-[#0B3D2E] shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'}`}
              >
                {tier.cta}
                <ChevronRight size={18} />
              </Link>

              <div className={`mb-4 text-[10px] uppercase tracking-widest font-black ${tier.highlight || isElite ? 'text-slate-500' : 'text-slate-400'}`}>
                What's included:
              </div>
              <ul className="space-y-4 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-[11px] font-bold ${feature.included ? (tier.highlight || isElite ? 'text-slate-200' : 'text-slate-700') : (tier.highlight || isElite ? 'text-slate-600' : 'text-slate-300')}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 
                      ${feature.included 
                        ? (tier.highlight || isElite ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600') 
                        : (tier.highlight || isElite ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-300')}`}>
                      {feature.included ? <ShieldCheck size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    {feature.text}
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
