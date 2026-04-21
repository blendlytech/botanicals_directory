'use client';

import React from 'react';
import { ShieldCheck, MapPin, TrendingUp, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200">
      {/* PHASE 1: HERO COPY OVERHAUL
        Focus: "Stopping the Bleed" and "Solving Logistical Anxiety" 
        Target: High-Ticket Botanical Vendors
      */}
      <main className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-400/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>The Authority Suite for Elite Botanical Growers</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 drop-shadow-sm leading-[1.1]">
            Stop Losing High-Ticket <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Leads to the Void.
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
            Eliminate vendor invisibility and solve logistical anxiety. The Global Event Map 
            routes serious collectors directly to your booth, turning fleeting event foot-traffic 
            into a permanent, stabilized client pipeline.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <a 
              href="/onboarding" 
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-xl hover:shadow-emerald-200 transform hover:-translate-y-1"
            >
              Claim Your Free Profile
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/events" 
              className="inline-flex items-center justify-center px-10 py-5 font-bold text-emerald-700 transition-all duration-300 bg-white border-2 border-emerald-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-300 shadow-lg hover:shadow-slate-200 transform hover:-translate-y-1"
            >
              View Global Event Map
            </a>
          </div>
        </div>

        {/* Psychological Lockdown Indicators (Sub-Hero) */}
        <div className="max-w-6xl mx-auto mt-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative group hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600 border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Pinpoint Routing</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Buyers find your exact inventory and location before the event doors even open.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-2xl shadow-emerald-100/40 relative overflow-hidden ring-1 ring-emerald-500/20 group hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-600 text-[10px] font-black tracking-widest rounded-bl-2xl text-white shadow-lg uppercase">Invitation Only</div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600 border border-emerald-100 shadow-inner">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">The Authority Suite</h3>
              <p className="text-slate-600 leading-relaxed font-medium">30-day provisional access to elite analytics. See exactly who is looking for your plants.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative group hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600 border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">End The Bleed</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Stop losing post-event follow-ups. Centralize your presence where serious collectors live.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
