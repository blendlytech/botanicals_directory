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
      icon: <Lock className="w-6 h-6 text-slate-500" />,
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
      badge: "Limited Offer",
      icon: <TrendingUp className="w-6 h-6 text-emerald-700" />,
      priceMonthly: 99,
      priceAnnual: 979,
      founderMonthly: 49,
      founderAnnual: 97,
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
      highlight: true,
      tag: "Best Value",
      limited: "Next 20 Subscribers Only"
    },
    {
      name: "Lifetime Elite",
      planId: "elite",
      badge: "Founders Package",
      icon: <Globe className="w-6 h-6 text-amber-600" />,
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
      highlight: false,
      tag: "Limited Seats",
      limited: "17 Founding Seats Left"
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
          It's a no-brainer: The cost of a full year is covered by just <strong>one high-ticket sale</strong>. 
          The real cost? The thousands in lost revenue because your neighbor booth has <strong>CultivarID</strong> to authenticate their specimens, and you don't.
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pb-12">
        {tiers.map((tier) => {
           const regularPrice = isAnnual ? tier.priceAnnual : tier.priceMonthly;
           const founderPrice = isAnnual ? tier.founderAnnual : tier.founderMonthly;
           const isFree = tier.priceAnnual === 0;
           const isElite = tier.name === "Lifetime Elite";

           return (
            <div
              key={tier.name}
              className={`relative p-8 md:p-10 rounded-[40px] transition-all duration-300 flex flex-col
              ${tier.highlight 
                ? 'bg-slate-900 text-white border-4 border-emerald-500 scale-105 shadow-2xl z-10' 
                : isElite 
                  ? 'bg-amber-50 border-2 border-amber-200 shadow-xl'
                  : 'bg-white border-2 border-slate-100 shadow-lg hover:border-emerald-200'}`}
            >
              {tier.tag && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap z-20
                  ${tier.highlight ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                  {tier.tag}
                </div>
              )}
              
              <div className="mb-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${tier.highlight ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {tier.icon}
                  </div>
                  {tier.limited && (
                    <span className={`flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full border shadow-sm
                      ${tier.highlight ? 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                      <Zap size={12} className="fill-current" />
                      {tier.limited}
                    </span>
                  )}
                </div>
                <h3 className={`text-3xl font-black mb-3 tracking-tight ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <p className={`text-sm font-medium leading-relaxed ${tier.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{tier.desc}</p>
              </div>

              <div className="mb-10">
                <div className="flex flex-col">
                  {!isFree && (
                     <div className={`text-xs font-bold line-through mb-1 ${tier.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                        ${regularPrice}{isElite ? '' : (isAnnual ? '/yr' : '/mo')} Regular
                     </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-black ${tier.highlight ? 'text-emerald-400' : 'text-slate-900'}`}>
                      {isFree ? 'Free' : `$${founderPrice}`}
                    </span>
                    <span className={`text-sm font-bold ${tier.highlight ? 'text-slate-500' : 'text-slate-400'}`}>{tier.period}</span>
                  </div>
                  {!isFree && (
                     <div className={`text-[11px] uppercase tracking-widest font-black mt-3 flex items-center gap-2
                       ${tier.highlight ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        Founder's Discount Applied
                     </div>
                  )}
                </div>
              </div>

              <Link
                href={`/onboarding?plan=${tier.planId}`}
                className={`w-full flex items-center justify-center gap-2 py-5 px-8 rounded-2xl font-black text-base transition-all hover:-translate-y-1 active:scale-95 mb-10 shadow-lg
                  ${tier.highlight 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-emerald-500/20' 
                    : isElite ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'}`}
              >
                {tier.cta}
                <ChevronRight size={20} />
              </Link>

              <div className={`mb-4 text-[10px] uppercase tracking-widest font-black ${tier.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                What's included:
              </div>
              <ul className="space-y-4 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm font-bold ${feature.included ? (tier.highlight ? 'text-slate-200' : 'text-slate-700') : (tier.highlight ? 'text-slate-600' : 'text-slate-300')}`}>
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 
                      ${feature.included 
                        ? (tier.highlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600') 
                        : (tier.highlight ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-300')}`}>
                      {feature.included ? <ShieldCheck size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
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
