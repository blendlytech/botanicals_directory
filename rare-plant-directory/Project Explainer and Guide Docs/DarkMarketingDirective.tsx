'use client';

import React from 'react';
import { ShieldAlert, Target, Mail, Eye, Zap, Lock, ChevronRight, Star, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DarkMarketingDirective() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        
        {/* Strategic Header */}
        <header className="mb-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black tracking-[0.2em] rounded-full uppercase mb-4 animate-pulse">
            Strategic Deployment Phase: Active
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
            Marketing Campaign <span className="text-emerald-600 italic">Week 1</span><br />
            Trojan Horse Deployment
          </h1>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-8 rounded-full"></div>
        </header>

        {/* Commander Status */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-24">
              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 px-1">Role Status</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">ELITE DARK MARKETING COMMANDER</h2>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed font-bold">Executing a 30-day psychological marketing offensive targeting high-ticket botanical vendors.</p>
            </div>
            <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Executive Summary</div>
               <h3 className="text-2xl font-black text-slate-900 mb-6">Strategic Viability of Localized Botanical Platforms</h3>
               <p className="text-slate-600 leading-relaxed font-medium text-lg">
                The houseplant and rare botanical market has transitioned into a highly mature, commoditized state. Our offensive leverages 
                <span className="text-slate-900 font-black"> Manufactured Exclusivity</span> and the <span className="text-slate-900 font-black">Endowment Effect</span> to 
                monopolize vendor trust before competitors can react.
              </p>
            </div>
          </div>
        </section>

        {/* Target Vectors */}
        <section className="mb-32">
          <div className="text-[10px] font-black text-center text-emerald-600 uppercase tracking-widest mb-12">Target Vector Analysis</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-900 border border-slate-100">
                <Target size={24} />
              </div>
              <h4 className="font-black text-lg text-slate-900 mb-3">Core Offer</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">Centralized geolocation-based botanical event directory & marketing platform for elite vendors.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-100/20 hover:-translate-y-2 transition-all ring-1 ring-emerald-500/10">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 border border-emerald-100">
                <ShieldAlert size={24} />
              </div>
              <h4 className="font-black text-lg text-slate-900 mb-3">Deepest Pain</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">Financial loss from shipping live plants; vendor invisibility at chaotic physical expos.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-900 border border-slate-100">
                <Zap size={24} />
              </div>
              <h4 className="font-black text-lg text-slate-900 mb-3">The Trojan Horse</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">Free 'Claim Your Listing' profiles & a comprehensive database of all upcoming botanical events.</p>
            </div>
          </div>
        </section>

        {/* 6-Phase Directive */}
        <section className="mb-32 bg-slate-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldAlert size={300} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">Strategic Protocol</div>
            <h2 className="text-3xl md:text-4xl font-black mb-16 tracking-tight">The 6-Phase Directive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
              {[
                { id: '01', title: 'Manufactured Exclusivity', desc: 'Framing the high-ticket offer as "By Invitation Only" via an application process.' },
                { id: '02', title: 'The Endowment Effect', desc: 'Offer risk-free 30-day integration, then threaten revocation to force upgrades.' },
                { id: '03', title: 'Decoy Pricing', desc: 'Use 5% price difference to hide 40% value loss in the lower tier.' },
                { id: '04', title: 'The Missing Piece', desc: 'Frame the status quo as broken; our offer is the only stabilization tool.' },
                { id: '05', title: 'Frictionless Kill', desc: 'Eliminate 80% of form fields for instant gratification call-to-actions.' },
                { id: '06', title: 'The Entry Offer', desc: 'Lead with free vendor profiles to trigger Commitment bias.' }
              ].map((phase) => (
                <div key={phase.id} className="flex gap-6 group">
                  <span className="text-emerald-500 font-black text-3xl group-hover:scale-110 transition-transform">{phase.id}</span>
                  <div>
                    <h5 className="font-black text-xl mb-2 text-white">{phase.title}</h5>
                    <p className="text-slate-400 text-sm font-bold leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Sequence */}
        <section className="mb-32 space-y-20">
          <div className="text-center">
            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Deployment Assets</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Week 1 Email Sequence</h2>
          </div>

          {[
            { 
              priority: 'High', 
              id: '01', 
              tag: 'The Trojan Horse', 
              subject: 'why your current inventory is at risk',
              content: 'Addresses the broken model of high-ticket rare plant vendors. Introduces the "missing piece" to stabilize revenue and mentions a preliminary vendor profile within the national botanical event database. Urges claiming a listing instantly.'
            },
            { 
              priority: 'Critical', 
              id: '02', 
              tag: 'The Endowment Threat', 
              subject: 'we started your 30-day integration',
              content: 'Informs recipient of provisional access to the full marketing platform. Emphasizes ownership of digital proximity. States access will be revoked if verification isn\'t approved within 72 hours. Urges 3-field application.'
            },
            { 
              priority: 'Immediate', 
              id: '03', 
              tag: 'The Decoy Kill', 
              subject: 'internal alert: select your tier',
              content: 'Announces opening of "Authority Suite" access. Presents two tiers: Visibility ($475) vs Authority ($499). Highlights that choosing basic tier forfeits 40% of revenue for a 5% price difference.'
            }
          ].map((email) => (
            <div key={email.id} className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Priority: {email.priority} // Email_{email.id}</span>
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${email.id === '02' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                  {email.tag}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 overflow-hidden">
                <div className="border-b border-slate-100 p-8 px-10 bg-slate-50/50">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject:</div>
                  <div className="text-xl font-black text-slate-900 italic tracking-tight">{email.subject}</div>
                </div>
                <div className="p-10 px-12 text-slate-600 font-medium leading-relaxed text-lg border-l-[6px] border-emerald-500 m-8 bg-slate-50 rounded-2xl">
                  {email.content}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Ad Creatives */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Visual & Social Vectors</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Initial Ad Creative Concepts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Concept Alpha', body: '"Stop shipping your profits away. Rare plants belong in hands, not cardboard boxes. Join the national database today."', visual: 'LOGISTICAL STRESS VS LOCAL EASE' },
              { id: '02', title: 'Concept Beta', body: '"Are you invisible at the expo? High-ticket collectors are using geolocation to find vendors before doors open. Get on the map."', visual: 'GEOLOCATION RADAR OVERLAY' },
              { id: '03', title: 'Concept Gamma', body: '"By Invitation Only. A specialized marketing platform for the elite rare plant vendor. Start your risk-free 30-day integration."', visual: 'DARK MINIMALIST EXCLUSIVITY' }
            ].map((ad) => (
              <div key={ad.id} className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col justify-between hover:border-emerald-500 transition-all group bg-white">
                <div className="mb-10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {ad.id} // {ad.title}
                  </div>
                  <p className="italic text-slate-700 font-bold leading-relaxed text-lg">
                    {ad.body}
                  </p>
                </div>
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:text-emerald-500 transition-colors px-1">
                  VISUAL: {ad.visual}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Status Footer */}
        <footer className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <div className="mb-4 md:mb-0">Directive ID: BOTANICAL-OFFENSIVE-2026-W1</div>
          <div className="flex gap-10">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Active</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Content Verified</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
