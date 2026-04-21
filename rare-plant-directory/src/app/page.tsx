import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";
import { ShieldCheck, MapPin, TrendingUp, ChevronRight, Star, Search, ArrowRight, Zap, Lock } from 'lucide-react';

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();

  const { data: dbEvents } = await supabase
    .from('events')
    .select('id, title, slug, description, event_type, is_featured, location_name, date_start')
    .order('date_start', { ascending: true })
    .limit(3);

  const { data: dbVendors } = await supabase
    .from('vendors')
    .select('id, name, slug, specialty, is_verified, account_tier')
    .order('account_tier', { ascending: false })
    .limit(6);

  const events = dbEvents || [];
  const vendors = dbVendors || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200">
      
      {/* ─── HERO SECTION: TROJAN HORSE DEPLOYMENT ─── */}
      <main className="relative overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-32 lg:pb-48">
        {/* Background Aesthetics */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-400/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest mb-10 shadow-sm">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>The Authority Suite for Elite Botanical Growers</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-10 text-slate-900 leading-[0.95]">
            Stop Losing High-Ticket <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Leads to the Void.
            </span>
          </h1>
          
          <p className="mt-8 max-w-3xl mx-auto text-xl sm:text-2xl text-slate-500 leading-relaxed font-medium">
            Eliminate vendor invisibility and solve logistical anxiety. The Global Event Map 
            routes serious collectors directly to your booth, turning fleeting event foot-traffic 
            into a permanent, stabilized client pipeline.
          </p>
          
          <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/onboarding" 
              className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all duration-300 bg-slate-900 rounded-[2rem] hover:bg-slate-800 shadow-2xl hover:shadow-slate-200 transform hover:-translate-y-1 active:scale-95"
            >
              Claim Your Listing
              <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center px-12 py-6 font-black text-emerald-700 transition-all duration-300 bg-white border-2 border-emerald-50 rounded-[2rem] hover:bg-emerald-50 hover:border-emerald-200 shadow-lg hover:shadow-slate-200 transform hover:-translate-y-1 active:scale-95"
            >
              Explore the Map
            </Link>
          </div>
        </div>

        {/* Psychological Lockdown Indicators */}
        <div className="max-w-6xl mx-auto mt-40 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/30 relative group hover:border-emerald-100 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 text-emerald-600 border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Pinpoint Routing</h3>
              <p className="text-slate-500 leading-relaxed font-bold">Buyers find your exact inventory and location before the event doors even open.</p>
            </div>
            
            <div className="p-10 rounded-[2.5rem] bg-white border border-emerald-100 shadow-2xl shadow-emerald-100/30 relative overflow-hidden ring-2 ring-emerald-500/10 group hover:scale-[1.03] transition-all">
              <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-600 text-[10px] font-black tracking-widest rounded-bl-3xl text-white shadow-lg uppercase">Limited Access</div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 text-emerald-600 border border-emerald-100 shadow-inner">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Authority Suite</h3>
              <p className="text-slate-500 leading-relaxed font-bold">Provisional access to elite analytics. See exactly who is looking for your plants in real-time.</p>
            </div>
            
            <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/30 relative group hover:border-emerald-100 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 text-emerald-600 border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">End The Bleed</h3>
              <p className="text-slate-500 leading-relaxed font-bold">Stop losing post-event follow-ups. Centralize your presence where serious collectors live.</p>
            </div>
          </div>
        </div>
      </main>

      {/* ─── DIRECTORY PREVIEW: THE BAITED HOOK ─── */}
      <section className="py-32 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="h-px w-8 bg-emerald-600"></div>
                 <span className="text-emerald-600 font-black tracking-widest text-xs uppercase">Elite Registry</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">The 100 Most Authoritative <span className="text-emerald-600">Elite Growers</span></h2>
            </div>
            <Link href="/vendors" className="px-8 py-4 bg-slate-50 text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all shadow-sm flex items-center gap-2 group">
              View All Vendors <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((v) => (
              <div key={v.slug} className="p-8 bg-slate-50/50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                      {v.name.charAt(0)}
                   </div>
                   {v.is_verified ? (
                     <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <ShieldCheck size={12} /> Verified
                     </div>
                   ) : (
                     <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
                        <Lock size={12} /> Unclaimed
                     </div>
                   )}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{v.name}</h3>
                <p className="text-sm font-bold text-slate-400 mb-6">{v.specialty || 'Rare Plant Specialist'}</p>
                <div className="h-px w-full bg-slate-100 mb-6"></div>
                <Link href={`/vendors/${v.slug}`} className="text-sm font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group/link">
                  View Registry Listing <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER / CTA ─── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-black tracking-widest text-xs uppercase mb-6">
             <Star size={18} className="fill-emerald-100" /> Collector Insiders
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 tracking-tight">The <span className="italic text-emerald-600">First to Know</span> Always Find the Rarest</h2>
          <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Get early access to event listings, exclusive vendor inventory previews, and CultivarID alerts — before general release.
          </p>
          <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
             <input type="email" placeholder="Enter your professional email" className="flex-grow px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-0 text-slate-900 font-medium" />
             <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-100 whitespace-nowrap">
                Join Network
             </button>
          </div>
          <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-tighter opacity-60">No spam. Collector-first, always.</p>
        </div>
      </section>

    </div>
  );
}
