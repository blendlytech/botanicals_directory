'use client';

import React, { useState } from 'react';
import { Search, MapPin, ShieldCheck, Star, AlertTriangle, ArrowRight, LockKeyhole, Filter, ChevronRight } from 'lucide-react';

// Mock Data representing the "Baited Hook" database
const MOCK_VENDORS = [
  { id: 1, name: "Monstera Syndicate", slug: "monstera-syndicate", specialty: "Rare Aroids", location: "Miami, FL", isVerified: true, views: 342 },
  { id: 2, name: "Velvet Leaf Botanical", slug: "velvet-leaf-botanical", specialty: "Anthuriums", location: "Portland, OR", isVerified: false, views: 142 },
  { id: 3, name: "Pacific Orchids", slug: "pacific-orchids", specialty: "Orchids", location: "San Diego, CA", isVerified: true, views: 512 },
  { id: 4, name: "Carnivorous Cartel", slug: "carnivorous-cartel", specialty: "Carnivorous", location: "Austin, TX", isVerified: false, views: 89 },
  { id: 5, name: "Urban Canopy", slug: "urban-canopy", specialty: "Hoya & Epiphytes", location: "Brooklyn, NY", isVerified: false, views: 215 },
  { id: 6, name: "Jungle Fever Exotics", slug: "jungle-fever-exotics", specialty: "Rare Aroids", location: "Atlanta, GA", isVerified: true, views: 420 },
];

export default function VendorDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = MOCK_VENDORS.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Directory Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-emerald-600"></div>
             <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Global Botanical Registry</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Global Botanical Vendors</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Discover verified elite growers and claim your business to access the Authority Suite routing network.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search vendors by name or specialty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-2xl hover:bg-slate-100 transition-colors shadow-sm">
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col group">
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 text-2xl font-black text-emerald-600">
                  {vendor.name.charAt(0)}
                </div>
                {vendor.isVerified ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                    <ShieldCheck size={14} className="fill-emerald-100" /> Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <LockKeyhole size={14} /> Unclaimed
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <a href={`/vendors/${vendor.slug}`} className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors inline-block mb-2 tracking-tight">
                  {vendor.name}
                </a>
                <div className="flex flex-col gap-2.5 mt-2">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                    <Star size={18} className="text-emerald-500 fill-emerald-50" />
                    {vendor.specialty}
                  </span>
                  <span className="flex items-center gap-2.5 text-sm text-slate-500">
                    <MapPin size={18} className="text-slate-400" />
                    {vendor.location}
                  </span>
                </div>
              </div>

              {/* PHASE 1: CLAIM FLOW INJECTION
                  This targets unverified profiles in the wild. By showing them
                  lost views alongside a bold CTA, it triggers the Endowment Effect.
              */}
              {!vendor.isVerified ? (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-black text-amber-600 flex items-center gap-1 mb-1">
                        <AlertTriangle size={12} strokeWidth={3} /> Missed Leads
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        <strong className="text-slate-900 font-bold">{vendor.views}</strong> profile views
                      </span>
                    </div>
                  </div>
                  <a
                    href="/onboarding"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all shadow-lg hover:shadow-slate-200 transform active:scale-95 group/btn"
                  >
                    Claim This Listing
                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href={`/vendors/${vendor.slug}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold rounded-xl transition-colors border border-emerald-200"
                  >
                    View Profile & Inventory
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500 text-lg">No vendors found matching your search.</p>
            <a href="/onboarding" className="mt-4 inline-block text-emerald-600 font-bold hover:underline">
              Add a missing vendor &rarr;
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
