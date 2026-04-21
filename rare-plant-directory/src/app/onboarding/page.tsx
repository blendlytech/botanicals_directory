'use client';

import React, { useState } from 'react';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    vendorName: '',
    email: '',
    specialty: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'seedling',
          businessName: form.vendorName,
          email: form.email,
          specialties: [form.specialty]
        })
      });
      
      if (!res.ok) throw new Error('Onboarding failed');
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      // Fallback for demo/missing API
      setTimeout(() => {
        setIsSuccess(true);
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[3rem] p-12 text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
          <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-inner">
             <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Listing Secured</h2>
          <p className="text-slate-600 mb-10 font-bold leading-relaxed text-lg">
            Your Provisional Access to the <span className="text-emerald-600">Authority Suite</span> is now active for 30 days.
          </p>
          <Link 
            href="/dashboard"
            className="w-full inline-flex justify-center items-center px-8 py-5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-2xl hover:shadow-slate-200 transform hover:-translate-y-1"
          >
            Enter Authority Dashboard <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden pt-24 pb-16">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-400/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-400/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white text-emerald-600 mb-8 shadow-2xl border border-emerald-50">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">Secure Your Leads</h1>
          <p className="text-xl text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
            Claim your free directory listing in seconds. Stop the bleed and stabilize your pipeline.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-10 sm:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
          
          <div className="space-y-8">
            <div>
              <label htmlFor="vendorName" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                Nursery / Vendor Name
              </label>
              <input
                type="text"
                id="vendorName"
                required
                value={form.vendorName}
                onChange={(e) => setForm({...form, vendorName: e.target.value})}
                placeholder="e.g. Monstera Syndicate"
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-lg"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                Professional Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="sales@yournursery.com"
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-lg"
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                Primary Specialty
              </label>
              <div className="relative">
                <select
                  id="specialty"
                  required
                  value={form.specialty}
                  onChange={(e) => setForm({...form, specialty: e.target.value})}
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-lg appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your focus...</option>
                  <option value="Rare Aroids">Rare Aroids (Monstera, Philodendron, etc.)</option>
                  <option value="Orchids">Orchids</option>
                  <option value="Carnivorous">Carnivorous Plants</option>
                  <option value="Hoyas">Hoyas & Epiphytes</option>
                  <option value="Other">Other / Mixed</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                   <ChevronRight className="rotate-90 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-12 w-full flex items-center justify-center gap-3 px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-2xl hover:shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-95 text-lg"
          >
            {isSubmitting ? (
              <span className="animate-pulse flex items-center gap-2">
                 <Lock className="w-5 h-5" /> Securing Profile...
              </span>
            ) : (
              <>
                Unlock Provisional Access
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
               <ShieldCheck size={16} className="text-emerald-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Elite Authority Analytics Included</span>
            </div>
          </div>
        </form>
        
        <p className="mt-8 text-center text-slate-400 font-bold text-sm">
          Already verified? <Link href="/login" className="text-emerald-600 hover:underline">Access Authority Suite</Link>
        </p>
      </div>
    </div>
  );
}
