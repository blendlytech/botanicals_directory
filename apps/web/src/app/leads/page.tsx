'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

type PermitLead = {
  id: string;
  hash: string;
  owner_name: string | null;
  owner_first_name: string | null;
  owner_last_name: string | null;
  property_address: string | null;
  permit_type: string | null;
  job_valuation: number | null;
  issue_date: string | null;
  jurisdiction: string | null;
  created_at: string;
};
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  Zap,
  Shield,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
  const [leads, setLeads] = useState<PermitLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const jurisdictions = ['All', 'Leon', 'Polk', 'Pasco', 'Hillsborough', 'Tampa'];
  const types = ['All', 'Roofing', 'Pool'];

  useEffect(() => {
    async function fetchLeads() {
      const supabase = createClient();
      setLoading(true);
      const { data, error } = await supabase
        .from('permit_leads')
        .select('*')
        .order('issue_date', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching leads:', error);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    }

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = (lead.property_address?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesJurisdiction = selectedJurisdiction === 'All' || lead.jurisdiction?.includes(selectedJurisdiction);
    const matchesType = selectedType === 'All' || 
                        (selectedType === 'Roofing' && lead.permit_type?.toLowerCase().includes('roof')) ||
                        (selectedType === 'Pool' && lead.permit_type?.toLowerCase().includes('pool'));
    
    return matchesSearch && matchesJurisdiction && matchesType;
  });

  const formatValuation = (val: number | null) => {
    if (!val) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="permit-theme page-wrapper" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* ─── HEADER ─── */}
      <header style={{ 
        padding: '10rem 5% 3rem', 
        background: 'white', 
        borderBottom: '1px solid #E2E8F0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Permit Inventory</span>
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Lead Database</h1>
              <p style={{ color: '#64748B', maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Real-time building permits filed by homeowners. Exclusive project data for Florida contractors.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: '#F1F5F9', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{leads.length}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Active Leads</div>
              </div>
              <div style={{ padding: '1.5rem', background: '#F1F5F9', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981' }}>5</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Active Counties</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── FILTERS ─── */}
      <section style={{ padding: '2rem 5%', position: 'sticky', top: '80px', zIndex: 100, background: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="text" 
                placeholder="Search address or owner..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3.5rem', 
                  borderRadius: '12px', 
                  border: '1px solid #F1F5F9',
                  background: '#F8FAFC',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <select 
                  value={selectedJurisdiction}
                  onChange={(e) => setSelectedJurisdiction(e.target.value)}
                  style={{ 
                    appearance: 'none',
                    padding: '1rem 3rem 1rem 1.5rem', 
                    borderRadius: '12px', 
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {jurisdictions.map(j => <option key={j} value={j}>{j === 'All' ? 'All Counties' : j}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }} />
              </div>

              <div style={{ position: 'relative' }}>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ 
                    appearance: 'none',
                    padding: '1rem 3rem 1rem 1.5rem', 
                    borderRadius: '12px', 
                    border: '1px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Project Types' : t}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DATA TABLE ─── */}
      <main style={{ padding: '0 5% 8rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
            border: '1px solid #E2E8F0'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Info</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Valuation</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date Filed</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '5rem', textAlign: 'center' }}>
                      <div style={{ margin: '0 auto 1rem', width: '30px', height: '30px', border: '3px solid #E2E8F0', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Syncing with municipal databases...</span>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '5rem', textAlign: 'center' }}>
                      <div style={{ color: '#64748B', fontSize: '1.2rem', fontWeight: 600 }}>No leads match your current filters.</div>
                    </td>
                  </tr>
                ) : filteredLeads.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ 
                          width: '44px', 
                          height: '44px', 
                          borderRadius: '12px', 
                          background: lead.permit_type?.toLowerCase().includes('pool') ? '#E0F2FE' : '#FEF3C7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {lead.permit_type?.toLowerCase().includes('pool') ? <Zap size={20} color="#0369A1" /> : <Shield size={20} color="#B45309" />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1A202C' }}>{lead.permit_type}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{lead.owner_name || 'Owner-Filed Permit'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
                        <MapPin size={14} style={{ color: '#94A3B8' }} />
                        <span style={{ 
                          fontWeight: 500,
                          filter: i > 2 ? 'blur(4px)' : 'none',
                          opacity: i > 2 ? 0.7 : 1
                        }}>
                          {i > 2 ? 'XXXX XXXXXX DR, LAKELAND FL' : lead.property_address}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem', marginLeft: '1.25rem' }}>{lead.jurisdiction}</div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ 
                        fontWeight: 800, 
                        color: '#10B981', 
                        fontSize: '1.1rem',
                        filter: i > 2 ? 'blur(4px)' : 'none'
                      }}>
                        {formatValuation(lead.job_valuation)}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}>
                        <Calendar size={14} />
                        {lead.issue_date}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      {i <= 2 ? (
                        <Link href={`/leads/${lead.id}`} style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                          background: 'var(--accent)',
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          transition: 'transform 0.2s'
                        }}>
                          View Brief
                        </Link>
                      ) : (
                        <button style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem',
                          background: '#F1F5F9',
                          color: '#64748B',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer'
                        }}>
                          Unlock Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
              Showing {filteredLeads.length} leads in Florida. Upgrade to Pro for real-time SMS notifications.
            </p>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        tr:hover {
          background: #F9FAFB;
        }
      `}</style>
    </div>
  );
}
