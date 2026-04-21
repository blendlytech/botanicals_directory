import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Search, MapPin, ShieldCheck, Star, AlertTriangle, ArrowRight, LockKeyhole, Filter, ChevronRight } from 'lucide-react';

export const revalidate = 60;

export default async function VendorsPage() {
  const supabase = createClient();

  // Fetch active vendors - showing both verified and unverified for the "Baited Hook" effect
  const { data: vendors, error } = await supabase
    .from('vendors')
    .select('name, slug, specialty, location_city, location_state, location_country, tier, is_elite, is_verified, logo_url')
    .order('is_verified', { ascending: false }) 
    .order('is_elite', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching vendors:", error);
  }

  const vendorsList = vendors || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Directory Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-emerald-600"></div>
             <span className="text-emerald-600 font-bold tracking-widest text-[10px] uppercase">Global Botanical Registry</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Discover Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Elite Growers</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
            Browse the most exclusive network of rare plant specialists. Claim your listing to access the Authority Suite and secure your market position.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, genus, or location..." 
              className="w-full pl-12 pr-4 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-8 py-5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={20} />
            Advanced Filters
          </button>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendorsList.map((v) => {
            const location = [v.location_city, v.location_state || v.location_country].filter(Boolean).join(', ');
            const initials = v.name ? v.name.substring(0, 2).toUpperCase() : 'V';
            
            // Mock views for unverified vendors to trigger Endowment Effect (Psychological Lockdown)
            const mockViews = Math.floor(Math.random() * 450) + 120;

            return (
              <div key={v.slug} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col group">
                
                <div className="flex justify-between items-start mb-8">
                  {v.logo_url ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                      <Image src={v.logo_url} alt={`${v.name} logo`} width={64} height={64} className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 text-2xl font-black text-emerald-600 group-hover:scale-105 transition-transform">
                      {initials}
                    </div>
                  )}
                  
                  {v.is_verified ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                      <ShieldCheck size={14} className="fill-emerald-100" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <LockKeyhole size={14} /> Unclaimed
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <a href={`/vendors/${v.slug}`} className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors inline-block mb-3 tracking-tight">
                    {v.name}
                  </a>
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="flex items-center gap-2.5 text-sm font-bold text-slate-600">
                      <Star size={18} className="text-emerald-500 fill-emerald-50" />
                      {Array.isArray(v.specialty) ? v.specialty.slice(0, 2).join(', ') : (v.specialty || 'General Rare Plants')}
                    </span>
                    {location && (
                      <span className="flex items-center gap-2.5 text-sm font-medium text-slate-400">
                        <MapPin size={18} className="text-slate-300" />
                        {location}
                      </span>
                    )}
                  </div>
                </div>

                {/* THE BAITED HOOK: Commitment Bias Trigger for Unverified Vendors */}
                {!v.is_verified ? (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-black text-amber-600 flex items-center gap-1 mb-1">
                          <AlertTriangle size={12} strokeWidth={3} /> Missed Leads
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          <strong className="text-slate-900 font-black">{mockViews}</strong> profile views this month
                        </span>
                      </div>
                    </div>
                    <a
                      href="/onboarding"
                      className="w-full flex items-center justify-center gap-2 px-6 py-5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-2xl transition-all shadow-xl hover:shadow-slate-200 transform active:scale-95 group/btn"
                    >
                      Claim This Listing
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                ) : (
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`/vendors/${v.slug}`}
                      className="text-sm font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group/link uppercase tracking-wider"
                    >
                      Enter Profile
                      <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                    {v.is_elite && (
                      <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        Elite Tier
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
        
        {vendorsList.length === 0 && (
          <div className="text-center py-32 bg-white border border-slate-200 rounded-[3rem] shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner">
               <Search size={40} className="text-slate-300" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">No Results Found</h2>
            <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
              We couldn't find any botanical vendors matching your current search criteria.
            </p>
            <div className="mt-10">
              <a href="/onboarding" className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-100">
                Onboard Your Nursery
                <ArrowRight size={22} />
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
