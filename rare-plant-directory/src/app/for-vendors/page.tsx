import Image from "next/image";
import PricingToggle from "../components/PricingToggle";
import { ShieldCheck, TrendingUp, MapPin, Zap, Star, Globe, Lock, ArrowRight, ChevronRight, BarChart3, Users } from 'lucide-react';

/* ── AUTHORITY SUITE BENEFITS ── */
const authorityBenefits = [
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Buyer Intent Analytics",
    desc: "See exactly which species collectors in your region are searching for before you stock for the season. Stop guessing, start scaling.",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Geolocation Routing",
    desc: "Your booth appears as a high-priority destination on interactive maps. We route collectors directly to your location based on their specific wishlist.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Direct Lead Matching",
    desc: "Our AI matches your live inventory against thousands of collector wishlists, sending instant 'Buyer Ready' alerts to your dashboard.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Registry Status",
    desc: "Join the verified elite. Your 'Authority' badge is the definitive mark of trust in the botanical marketplace.",
  },
];

const testimonials = [
  {
    quote: "The lead matching alone paid for the annual fee in the first week. I sold my entire stock of Thai Constellations before the expo doors even opened.",
    name: "Marcus Chen",
    title: "Verdant Roots Co. · Miami, FL",
  },
  {
    quote: "Collectors came directly to my booth because the map showed them exactly where the specimens on their wishlist were located. It's a game changer.",
    name: "Sofia Reyes",
    title: "Apex Aroids · San Diego, CA",
  },
];

export default function ForVendors() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200">
      
      {/* ─── HERO: THE ELITE COMMAND ─── */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-40 border-b border-slate-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-emerald-400/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest mb-10 shadow-sm">
                <Star size={16} className="fill-emerald-200" />
                <span>Stabilize Your Pipeline</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95] mb-8">
                The Authority Suite <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                  For Elite Growers.
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-500 leading-relaxed font-bold mb-10 max-w-2xl">
                Eliminate vendor invisibility. Leverage AI lead matching and real-time geolocation routing to secure high-ticket botanical sales with absolute certainty.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#pricing" className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-2xl hover:shadow-slate-200 transition-all flex items-center justify-center gap-2 group">
                  Unlock Authority Suite <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#benefits" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  See Features
                </a>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 p-4 bg-white border border-slate-200 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transform hover:rotate-2 transition-transform duration-700">
                <div className="bg-slate-50 rounded-[2.5rem] p-10">
                   <div className="flex items-center justify-between mb-10">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                         <TrendingUp className="text-emerald-600 w-8 h-8" />
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Intent matching</div>
                         <div className="text-2xl font-black text-emerald-600">842 Active Leads</div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                 <Zap size={18} />
                              </div>
                              <div>
                                 <div className="text-xs font-black text-slate-900 uppercase tracking-tighter">New Lead Match</div>
                                 <div className="text-[10px] font-bold text-slate-400">Monstera Obliqua Peru</div>
                              </div>
                           </div>
                           <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md tracking-widest uppercase">High Intent</div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-400/5 blur-[120px] rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="py-32 bg-white" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="text-emerald-600 font-black tracking-widest text-xs uppercase mb-4">Strategic Advantage</div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Built for the <span className="italic text-emerald-600">Serious</span> Grower</h2>
            <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto">
              Every tool in the Authority Suite is engineered around the core logistics of high-ticket botanical sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {authorityBenefits.map((b, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-slate-900 border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {b.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{b.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING: THE DECOY MODEL ─── */}
      <section className="py-32 bg-slate-50 overflow-hidden relative" id="pricing">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="text-emerald-600 font-black tracking-widest text-xs uppercase mb-4">Pricing Plans</div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">The <span className="text-emerald-600">Authority Suite</span> is Now Open</h2>
          </div>
          
          <PricingToggle />
          
          <div className="mt-20 max-w-2xl mx-auto bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl text-center flex flex-col md:flex-row items-center gap-8">
             <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-100">
                <Star className="w-10 h-10 text-amber-500 fill-amber-200" />
             </div>
             <div className="text-left">
                <h4 className="text-xl font-black text-slate-900 mb-2">Looking for the Founders' Circle?</h4>
                <p className="text-sm font-bold text-slate-500 leading-relaxed mb-4">
                  Elite Grower seats are limited to 100 total spots worldwide. Own your legacy with a one-time lifetime payment of $999.
                </p>
                <div className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                   Only 73 seats remain <ChevronRight size={14} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-emerald-600 shadow-lg">
                   <Zap size={24} className="fill-emerald-50" />
                </div>
                <p className="text-xl font-bold text-slate-900 mb-8 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                      {t.name.charAt(0)}
                   </div>
                   <div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">{t.name}</div>
                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t.title}</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CALL ─── */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter leading-tight">Secure Your Authority <br /> Before the Map Fills.</h2>
          <p className="text-xl text-slate-400 font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop losing collectors to the void. Join the verified network and route serious leads directly to your nursery today.
          </p>
          <a href="/onboarding" className="inline-flex items-center gap-3 px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-emerald-500/20 transform hover:-translate-y-1 active:scale-95 text-lg group">
            Apply for Authority Suite <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">Verified Growers Network · Established 2026</p>
        </div>
      </section>

    </div>
  );
}
