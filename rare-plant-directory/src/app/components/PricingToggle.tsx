'use client';

import { useState } from "react";
import { ShieldCheck, Zap, Star, Lock, ChevronRight, Globe, TrendingUp, MapPin } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: "Seedling",
    badge: "Free Claim",
    icon: <Lock className="w-6 h-6 text-slate-400" />,
    price: 0,
    period: "/forever",
    desc: "Establish your presence. Claim your profile and stop being invisible to collectors.",
    features: [
      { text: "Claim & Own Your Profile", included: true },
      { text: "About Me & Social Links", included: true },
      { text: "Up to 5 Inventory Items", included: true },
      { text: "Standard Map Pin", included: true },
      { text: "Manual Data Sync", included: true },
      { text: "AI Lead Matching", included: false },
      { text: "Authority Suite Analytics", included: false },
    ],
    cta: "Claim Profile",
    highlight: false,
  },
  {
    name: "Visibility Tier",
    badge: "Basic Placement",
    icon: <MapPin className="w-6 h-6 text-slate-600" />,
    price: 475,
    period: "/year",
    desc: "Increased visibility for growing nurseries. Professional verification included.",
    features: [
      { text: "Verified Grower Badge", included: true },
      { text: "Enhanced Search Results", included: true },
      { text: "Up to 50 Inventory Items", included: true },
      { text: "Manual Profile Updates", included: true },
      { text: "Priority Support (48hr)", included: true },
      { text: "AI Lead Matching", included: false },
      { text: "Geolocation Engine", included: false },
    ],
    cta: "Get Visibility",
    highlight: false,
  },
  {
    name: "Authority Suite",
    badge: "Elite Access",
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    price: 499,
    period: "/year",
    desc: "The definitive choice for serious vendors. Stop guessing and start dominating.",
    features: [
      { text: "AI Lead Matching Engine", included: true },
      { text: "Real-time Geolocation Engine", included: true },
      { text: "Priority Mapping Placement", included: true },
      { text: "Unlimited Inventory Items", included: true },
      { text: "Automated Data Sync", included: true },
      { text: "Direct Buyer Intent Alerts", included: true },
      { text: "Authority Suite Dashboard", included: true },
    ],
    cta: "Unlock Authority",
    highlight: true,
    tag: "Best Value (+ $24/yr)"
  },
  {
    name: "Elite Grower",
    badge: "Lifetime Founder",
    icon: <Globe className="w-6 h-6 text-amber-500" />,
    price: 999,
    period: "one-time",
    desc: "Ultimate authority. One-time payment, lifetime seat in the global inner circle.",
    features: [
      { text: "All Authority Suite Features", included: true },
      { text: "Gold Premium Pin (Permanent)", included: true },
      { text: "0% Transaction Fees For Life", included: true },
      { text: "Newsletter Spotlight Access", included: true },
      { text: "Concierge Onboarding", included: true },
      { text: "Elite Badge (1 of 100)", included: true },
      { text: "Direct API Access", included: true },
    ],
    cta: "Claim Founder Seat",
    highlight: false,
    limited: "Only 73 Seats Left"
  },
];

export default function PricingToggle() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col bg-white border rounded-[2.5rem] p-8 transition-all duration-500 relative group
              ${tier.highlight 
                ? 'border-emerald-200 shadow-2xl shadow-emerald-100/50 scale-105 z-10' 
                : 'border-slate-200 shadow-xl shadow-slate-200/20 hover:-translate-y-2'}`}
          >
            {tier.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                {tier.tag}
              </div>
            )}
            
            {tier.limited && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                {tier.limited}
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                  {tier.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {tier.badge}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{tier.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{tier.desc}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  {tier.price === 0 ? 'Free' : `$${tier.price}`}
                </span>
                <span className="text-sm font-bold text-slate-400">{tier.period}</span>
              </div>
            </div>

            <Link
              href="/onboarding"
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm transition-all active:scale-95 mb-10
                ${tier.highlight 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-100' 
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
        ))}
      </div>
    </div>
  );
}
