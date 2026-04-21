'use client';

import React, { useState } from 'react';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for instant gratification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-10 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
             <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Profile Claimed</h2>
          <p className="text-slate-600 mb-8 font-medium leading-relaxed">
            Your Provisional Access to the <span className="text-emerald-600 font-bold">Authority Suite</span> is now active for 30 days.
          </p>
          <a 
            href="/dashboard"
            className="w-full inline-flex justify-center items-center px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-emerald-200 transform hover:-translate-y-1"
          >
            Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-6 shadow-inner border border-emerald-100">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Secure Your Leads</h1>
          <p className="text-slate-600 font-medium">
            Claim your free directory listing in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="vendorName" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                Nursery / Vendor Name
              </label>
              <input
                type="text"
                id="vendorName"
                required
                placeholder="e.g. Monstera Syndicate"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                Professional Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="sales@yournursery.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium"
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                Primary Specialty
              </label>
              <div className="relative">
                <select
                  id="specialty"
                  required
                  defaultValue=""
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-400">Select your focus...</option>
                  <option value="aroids">Aroids (Monstera, Philodendron, etc.)</option>
                  <option value="orchids">Orchids</option>
                  <option value="carnivorous">Carnivorous Plants</option>
                  <option value="hoyas">Hoyas & Epiphytes</option>
                  <option value="other">Other / Mixed</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                   <ChevronRight className="rotate-90 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 w-full flex items-center justify-center gap-3 px-6 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-95"
          >
            {isSubmitting ? (
              <span className="animate-pulse flex items-center gap-2">
                 <Lock className="w-4 h-4" /> Securing Profile...
              </span>
            ) : (
              <>
                Unlock Provisional Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
               <ShieldCheck size={14} className="text-emerald-600" />
               <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-800">Elite Authority Analytics Included</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
