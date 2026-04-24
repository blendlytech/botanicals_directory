'use client';

import { useState } from "react";
import { ShieldCheck, Zap, Star, Lock, ChevronRight, Globe, TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Seedling",
      planId: "seedling",
      badge: "Free tier",
      icon: <Lock className="w-6 h-6 text-slate-400" />,
      priceMonthly: 0,
      priceAnnual: 0,
      founderMonthly: 0,
      founderAnnual: 0,
      period: "/forever",
      desc: "Establish your presence. Claim your profile and stop being invisible to collectors.",
      features: [
        { text: "Claim & Own Your Profile", included: true },
        { text: "About Me & Social Links", included: true },
        { text: "1 Inventory Spot", included: true },
        { text: "Standard Map Pin", included: true },
        { text: "AI Lead Matching", included: false },
        { text: "CultivarID Passport", included: false },
      ],
      cta: "Claim Profile",
      highlight: false,
    },
    {
      name: "Authority Suite",
      planId: "authority",
      badge: "Tier below Elite",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      priceMonthly: 99,
      priceAnnual: 990,
      founderMonthly: 49,
      founderAnnual: 290,
      period: isAnnual ? "/yr" : "/mo",
      desc: "Increased visibility for growing nurseries. Get verified and get seen.",
      features: [
        { text: "Verified Grower Badge", included: true },
        { text: "Enhanced Search Results", included: true },
        { text: "5 Inventory Spots", included: true },
        { text: "Priority Support (48hr)", included: true },
        { text: "AI Lead Matching", included: true },
        { text: "Digital Passports", included: true },
      ],
      cta: "Unlock Authority",
      highlight: false,
      limited: "75 Founder Spots"
    },
    {
      name: "Lifetime Elite",
      planId: "elite",
      badge: "Founders Package",
      icon: <Globe className="w-6 h-6 text-amber-500" />,
      priceMonthly: 998,
      priceAnnual: 998,
      founderMonthly: 497,
      founderAnnual: 497,
      period: "once",
      desc: "The Elite Stage. Show your best 10 plants and secure a permanent seat in the inner circle.",
      features: [
        { text: "10-Plant 'Elite Stage' + QR IDs", included: true },
        { text: "Managed 24h Backend Setup", included: true },
        { text: "Semi-Annual Profile Review", included: true },
        { text: "Priority Wishlist Alerts", included: true },
        { text: "Full Provenance Data Build", included: true },
        { text: "Gold Premium Pin (Permanent)", included: true },
        { text: "0% Transaction Fees For Life", included: true },
        { text: "Newsletter Spotlight Access", included: true },
      ],
      cta: "Claim Lifetime Seat",
      highlight: true,
      tag: "Best Value",
      limited: "17 Founding Seats Left"
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-8">
      
      {/* FOMO Messaging */}
      <div className="max-w-3xl mx-auto text-center mb-12 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
        <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center justify-center gap-2">
           <AlertCircle className="text-amber-500" /> Don&apos;t Lose Sales to the Booth Next Door
        </h3>
        <p className="text-slate-600 font-medium">
          It&apos;s a no-brainer: The cost of a full year is covered by just <strong>one high-ticket sale</strong>. 
          The real cost? The thousands in lost revenue because your neighbor booth has <strong>CultivarID</strong> to authenticate their specimens, and you don&apos;t.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-slate-100 p-1.5 rounded-full inline-flex items-center relative">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${!isAnnual ? 'text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${isAnnual ? 'text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Annually <span className="ml-1 text-[10px] uppercase tracking-widest text-emerald-600 font-black bg-emerald-100 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
          
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: isAnnual ? 'translateX(calc(100% + 6px))' : 'translateX(6px)' }}
          />
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier) => {
           const regularPrice = isAnnual ? tier.priceAnnual : tier.priceMonthly;
           const founderPrice = isAnnual ? tier.founderAnnual : tier.founderMonthly;
           const isFree = tier.priceAnnual === 0;
           const isLifetime = tier.name === "Lifetime Elite";

           return (
            <div
              key={tier.name}
              className={`relative p-10 rounded-[32px] transition-all duration-500 flex flex-col group
              ${tier.highlight 
                ? 'bg-white border-2 border-emerald-600 scale-105 shadow-2xl z-10' 
                : isLifetime ? 'bg-amber-50 border-2 border-amber-200 scale-105 shadow-2xl z-10'
                : 'bg-slate-50 border border-slate-200 hover:border-emerald-200'}`}
              style={isLifetime ? { animation: 'gold-glow 3s infinite' } : {}}
            >
              {tier.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {tier.tag}
                </div>
              )}
              
              {tier.limited && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg whitespace-nowrap ${isLifetime ? 'bg-amber-500' : 'bg-slate-900'}`}>
                  {tier.limited}
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase
                    ${tier.highlight ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {tier.badge}
                  </span>
                  {tier.limited && (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 animate-pulse bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                      <Zap size={12} className="fill-emerald-600" />
                      {tier.limited}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{tier.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{tier.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex flex-col">
                  {!isFree && (
                     <div className="text-xs font-bold text-slate-400 line-through mb-1">
                        ${regularPrice}{isLifetime ? '' : (isAnnual ? '/yr' : '/mo')} Regular
                     </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {isFree ? 'Free' : `$${founderPrice}`}
                    </span>
                    <span className="text-sm font-bold text-slate-400">{tier.period}</span>
                  </div>
                  {!isFree && (
                     <div className="text-[10px] uppercase tracking-widest text-emerald-600 font-black mt-2">
                        Founder's Discount Applied
                     </div>
                  )}
                </div>
              </div>

              <Link
                href={`/onboarding?plan=${tier.planId}`}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm transition-all active:scale-95 mb-10
                  ${tier.highlight 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-100' 
                    : isLifetime ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-100' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200'}`}
              >
                {tier.cta}
                <ChevronRight size={18} />
              </Link>

              <ul className="space-y-4 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm font-bold ${feature.included ? 'text-slate-600' : 'text-slate-300'}`}>
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feature.included ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'}`}>
                      {feature.included ? <ShieldCheck size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
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
