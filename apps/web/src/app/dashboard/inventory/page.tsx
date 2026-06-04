'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { ImageUpload } from "@rpv/ui";
import { QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  species_name: string;
  variety: string | null;
  price: number | null;
  quantity: number | null;
  status: string;
  image_url: string | null;
  created_at: string;
  propagation_method?: string | null;
  mother_plant_url?: string | null;
  geographic_origin?: string | null;
  variegation_type?: string | null;
  stem_node_url?: string | null;
  leaf_progression_urls?: string[] | null;
  temperature_min?: number | null;
  temperature_max?: number | null;
  humidity_min?: number | null;
  humidity_max?: number | null;
  current_substrate?: string | null;
  pest_mitigation_log?: string | null;
  qr_generated?: boolean;
}

// Single paid membership = unlimited listings (null). Free/legacy tiers stay capped.
const TIER_LIMITS: Record<string, number | null> = {
  seedling: 0,
  free: 0,
  sprout: 1,
  bloom: null,
  bloom_annual: null,
  visibility: null,
  authority: null,
  elite: null,
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [vendorTier, setVendorTier] = useState<string>('seedling');
  const [vendorSlug, setVendorSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingQR, setGeneratingQR] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  
  const [form, setForm] = useState({ 
    species_name: '', variety: '', price: '', quantity: '1', status: 'available', image_url: '',
    propagation_method: '', geographic_origin: '', variegation_type: 'None', 
    temperature_min: '', temperature_max: '', humidity_min: '', humidity_max: '',
    current_substrate: '', pest_mitigation_log: '', mother_plant_url: '', stem_node_url: '',
    leaf_progression_1: '', leaf_progression_2: ''
  });
  
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      setUserEmail(user.email || null);

      const { data: vendor } = await supabase
        .from('vendors')
        .select('id, name, tier, account_tier, contact_email, slug')
        .eq('contact_email', user.email)
        .single();

      if (!vendor) { setLoading(false); return; }
      setVendorId(vendor.id);
      setVendorName(vendor.name || null);
      setVendorTier(vendor.tier?.toLowerCase() || vendor.account_tier || 'seedling');
      setVendorSlug(vendor.slug);

      const { data } = await supabase
        .from('inventory')
        .select('*')
        .eq('vendor_id', vendor.id)
        .order('created_at', { ascending: false });

      setItems(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const limit = TIER_LIMITS[vendorTier];
  const atLimit = limit !== null && items.length >= limit;

  const openAdd = () => {
    setEditItem(null);
    setForm({ 
      species_name: '', variety: '', price: '', quantity: '1', status: 'available', image_url: '',
      propagation_method: '', geographic_origin: '', variegation_type: 'None', 
      temperature_min: '', temperature_max: '', humidity_min: '', humidity_max: '',
      current_substrate: '', pest_mitigation_log: '', mother_plant_url: '', stem_node_url: '',
      leaf_progression_1: '', leaf_progression_2: ''
    });
    setShowForm(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditItem(item);
    setForm({
      species_name: item.species_name,
      variety: item.variety || '',
      price: item.price?.toString() || '',
      quantity: item.quantity?.toString() || '1',
      status: item.status,
      image_url: item.image_url || '',
      propagation_method: item.propagation_method || '',
      geographic_origin: item.geographic_origin || '',
      variegation_type: item.variegation_type || 'None',
      temperature_min: item.temperature_min?.toString() || '',
      temperature_max: item.temperature_max?.toString() || '',
      humidity_min: item.humidity_min?.toString() || '',
      humidity_max: item.humidity_max?.toString() || '',
      current_substrate: item.current_substrate || '',
      pest_mitigation_log: item.pest_mitigation_log || '',
      mother_plant_url: item.mother_plant_url || '',
      stem_node_url: item.stem_node_url || '',
      leaf_progression_1: item.leaf_progression_urls?.[0] || '',
      leaf_progression_2: item.leaf_progression_urls?.[1] || '',
    });
    setShowForm(true);
  };

  const buildPayload = () => {
    return {
      vendor_id: vendorId,
      species_name: form.species_name.trim(),
      variety: form.variety.trim() || null,
      price: form.price ? parseFloat(form.price) : null,
      quantity: form.quantity ? parseInt(form.quantity) : 1,
      status: form.status,
      image_url: form.image_url.trim() || null,
      propagation_method: form.propagation_method || null,
      geographic_origin: form.geographic_origin.trim() || null,
      variegation_type: form.variegation_type !== 'None' ? form.variegation_type : null,
      temperature_min: form.temperature_min ? parseInt(form.temperature_min) : null,
      temperature_max: form.temperature_max ? parseInt(form.temperature_max) : null,
      humidity_min: form.humidity_min ? parseInt(form.humidity_min) : null,
      humidity_max: form.humidity_max ? parseInt(form.humidity_max) : null,
      current_substrate: form.current_substrate || null,
      pest_mitigation_log: form.pest_mitigation_log.trim() || null,
      mother_plant_url: form.mother_plant_url || null,
      stem_node_url: form.stem_node_url || null,
      leaf_progression_urls: [form.leaf_progression_1, form.leaf_progression_2].filter(Boolean),
    };
  };

  const handleSave = async () => {
    if (!vendorId || !form.species_name.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const payload = buildPayload();

    if (editItem) {
      const { data } = await supabase.from('inventory').update(payload).eq('id', editItem.id).select().single();
      if (data) setItems(prev => prev.map(i => i.id === editItem.id ? data : i));
    } else {
      const { data } = await supabase.from('inventory').insert(payload).select().single();
      if (data) setItems(prev => [data, ...prev]);
    }

    setSaving(false);
    setShowForm(false);
  };

  const handleGenerateQR = async () => {
    if (!editItem) return;
    
    const needsMotherPlant = ['Top-Cutting', 'Mid-Cutting'].includes(form.propagation_method);
    const needsVariegationData = form.variegation_type && form.variegation_type !== 'None';

    const isValid = form.propagation_method 
      && form.geographic_origin 
      && form.temperature_min && form.temperature_max 
      && form.humidity_min && form.humidity_max 
      && form.current_substrate 
      && form.pest_mitigation_log
      && (!needsMotherPlant || form.mother_plant_url)
      && (!needsVariegationData || (form.stem_node_url && form.leaf_progression_1 && form.leaf_progression_2));

    if (!isValid) {
      alert("Please complete all CultivarID™ requirements before requesting your NFC Tag and Security Kit.");
      return;
    }

    if (!confirm('This will trigger an order for a CultivarID Nylon NFC Tag and Holographic Security Stickers using your monthly quota. Proceed?')) return;

    setGeneratingQR(true);
    const supabase = createClient();
    
    // First save the current data
    const payload = buildPayload();
    await supabase.from('inventory').update(payload).eq('id', editItem.id);

    // Then update qr_generated status (simulating API call to fulfillment partner)
    const { data, error } = await supabase.from('inventory').update({ qr_generated: true }).eq('id', editItem.id).select().single();
    
    if (data && !error) {
      setItems(prev => prev.map(i => i.id === editItem.id ? data : i));
      setEditItem(data);
      alert('Success! Your CultivarID Security Kit is being provisioned and will ship within 48 hours.');
    } else {
      alert('Error requesting kit. Please try again.');
    }
    
    setGeneratingQR(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this item from your inventory?')) return;
    const supabase = createClient();
    await supabase.from('inventory').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const statusColor: Record<string, string> = {
    available: '#2ecc71',
    sold: '#e74c3c',
    reserved: 'var(--gold)',
    hidden: 'var(--text-secondary)',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading inventory...</p>
      </div>
    );
  }

  const navItems = [
    { href: '/dashboard', label: '⚡ Overview' },
    { href: '/dashboard/inventory', label: '🌿 Inventory', active: true },
    { href: '/dashboard/expos', label: '🎪 Expos' },
    { href: '/dashboard/leads', label: '🎯 Leads' },
    { href: '/dashboard/passports', label: '📜 Passports' },
    { href: '/dashboard/analytics', label: '📊 Analytics' },
    { href: '/dashboard/settings', label: '⚙️ Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--glass-border)', padding: '7rem 1.5rem 2rem', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Vendor Portal
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {vendorName || 'My Nursery'}
          </div>
          {userEmail && (
            <div 
              style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              title={userEmail}
            >
              👤 {userEmail}
            </div>
          )}
        </div>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} style={{
            display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none',
            fontSize: '0.88rem', fontWeight: item.active ? 700 : 500,
            color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: item.active ? 'rgba(255,255,255,0.07)' : 'transparent',
            marginBottom: '0.25rem',
            transition: 'all 0.15s ease',
          }}>
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/" style={{ display: 'block', padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ← Directory
          </Link>
          <button 
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = '/login';
            }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.65rem 1rem', 
              borderRadius: '8px', 
              border: 'none',
              background: 'rgba(231, 76, 60, 0.1)',
              color: '#e74c3c',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'}
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '7rem 3rem 4rem' }}>
        {/* Public Link Banner */}
        {vendorSlug && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Your Public Listing: <span style={{ color: 'var(--gold)', fontWeight: 600 }}>rareplantvendors.com/vendors/{vendorSlug}</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`https://rareplantvendors.com/vendors/${vendorSlug}`);
                alert('Public link copied to clipboard!');
              }}
              style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Copy Link
            </button>
          </div>
        )}

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>
              Inventory Management
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', margin: 0, color: 'var(--text-primary)' }}>
              {vendorTier === 'elite' ? 'Elite Stage' : 'Your Plants'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              {items.length}{limit ? ` / ${limit}` : ''} {vendorTier === 'elite' ? 'showpieces' : 'items'} listed
              {limit && items.length >= limit * 0.8 && (
                <span style={{ color: 'var(--gold)', marginLeft: '0.5rem', fontWeight: 600 }}>
                  {atLimit ? '— Limit reached' : '— Nearly full'}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={openAdd}
            disabled={atLimit}
            className="btn-primary"
            style={{ opacity: atLimit ? 0.4 : 1, cursor: atLimit ? 'not-allowed' : 'pointer' }}
          >
            + Add Plant
          </button>
        </div>

        {/* Limit upgrade nudge */}
        {atLimit && (
          <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: '0.25rem' }}>Inventory Limit Reached</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Upgrade your tier to list more plants.</div>
            </div>
            <Link href="/for-vendors" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.8rem' }}>
              Upgrade Tier →
            </Link>
          </div>
        )}

        {/* Item grid */}
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.4 }}>🌱</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>No inventory yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Add your first plant to appear in collector searches and wishlist matching.
            </p>
            <button onClick={openAdd} className="btn-primary">Add Your First Plant</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.qr_generated && (
                    <div title="CultivarID Tag Generated" style={{ background: 'rgba(212,175,55,0.1)', padding: '0.5rem', borderRadius: '8px', color: 'var(--gold)' }}>
                      <ShieldCheck size={20} />
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {item.species_name}
                      {item.variety && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>var. {item.variety}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                      <span style={{ color: statusColor[item.status] || 'var(--text-secondary)', fontWeight: 600, textTransform: 'capitalize' }}>● {item.status}</span>
                      {item.price != null && <span style={{ color: 'var(--gold)', fontWeight: 600 }}>${item.price.toFixed(2)}</span>}
                      {item.quantity != null && <span>Qty: {item.quantity}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => openEdit(item)} style={{ padding: '0.4rem 0.9rem', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem 0.9rem', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '6px', color: '#e74c3c', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal form */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', margin: '0 0 0.2rem', color: 'var(--text-primary)' }}>
                  {editItem ? 'Edit Showcase Plant' : 'Add Showcase Plant'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Fill out required CultivarID™ fields to provision your secure Nylon NFC tag.
                </p>
              </div>
              {editItem && (
                <button
                  onClick={handleGenerateQR}
                  disabled={generatingQR || editItem.qr_generated}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: editItem.qr_generated ? 'rgba(46, 204, 113, 0.1)' : 'var(--gold)',
                    color: editItem.qr_generated ? '#2ecc71' : 'var(--charcoal)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: editItem.qr_generated ? 'default' : 'pointer',
                    opacity: generatingQR ? 0.7 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  {editItem.qr_generated ? <CheckCircle2 size={16} /> : <QrCode size={16} />}
                  {generatingQR ? 'Generating...' : editItem.qr_generated ? 'Kit Requested' : 'Generate Security Kit'}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* BASIC DETAILS SECTION */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--gold)' }}>Basic Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Species Name *</label>
                      <input className="form-input" placeholder="e.g. Monstera Obliqua Peru" value={form.species_name} onChange={e => setForm(p => ({ ...p, species_name: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Variety / Cultivar</label>
                      <input className="form-input" placeholder="e.g. Albo Variegata" value={form.variety} onChange={e => setForm(p => ({ ...p, variety: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Price (USD)</label>
                      <input className="form-input" type="number" placeholder="0.00" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Quantity</label>
                      <input className="form-input" type="number" min="1" value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Status</label>
                      <select className="form-input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <ImageUpload bucket="inventory" label="Primary Specimen Photo *" currentImageUrl={form.image_url} onUploadComplete={(url) => setForm(p => ({ ...p, image_url: url }))} />
                  </div>
                </div>
              </div>

              {/* CULTIVAR ID SECTION */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <ShieldCheck size={20} color="var(--gold)" />
                  <h3 style={{ fontSize: '1rem', color: 'white', margin: 0 }}>CultivarID™ Requirements</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  These fields are mandatory to generate a physical NFC tag for this plant. This creates a digital passport that guarantees provenance and acclimation data to your buyer.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Provenance */}
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gold)' }}>1. Provenance & Lineage</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Propagation Method</label>
                        <select className="form-input" value={form.propagation_method} onChange={e => setForm(p => ({ ...p, propagation_method: e.target.value }))}>
                          <option value="">Select Method...</option>
                          <option value="Basal Offset">Basal Offset</option>
                          <option value="Seed-Grown">Seed-Grown</option>
                          <option value="Top-Cutting">Top-Cutting</option>
                          <option value="Mid-Cutting">Mid-Cutting</option>
                          <option value="Tissue Culture">Tissue Culture</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Geographic / Nursery Origin</label>
                        <input className="form-input" placeholder="e.g. Cultivated in-house, Miami FL" value={form.geographic_origin} onChange={e => setForm(p => ({ ...p, geographic_origin: e.target.value }))} />
                      </div>
                    </div>
                    {['Top-Cutting', 'Mid-Cutting'].includes(form.propagation_method) && (
                      <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
                        <ImageUpload bucket="inventory" label="Mother Plant Documentation (Required for cuttings)" currentImageUrl={form.mother_plant_url} onUploadComplete={(url) => setForm(p => ({ ...p, mother_plant_url: url }))} />
                      </div>
                    )}
                  </div>

                  {/* Variegation */}
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gold)' }}>2. Variegation Stability</div>
                    <div className="form-group">
                      <label className="form-label">Pigmentation Typology</label>
                      <select className="form-input" value={form.variegation_type} onChange={e => setForm(p => ({ ...p, variegation_type: e.target.value }))}>
                        <option value="None">Solid / None</option>
                        <option value="Albo">Albo (White)</option>
                        <option value="Aurea">Aurea (Yellow)</option>
                        <option value="Mint">Mint</option>
                        <option value="Pink">Pink</option>
                      </select>
                    </div>
                    {form.variegation_type !== 'None' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <ImageUpload bucket="inventory" label="Stem Node Macro" currentImageUrl={form.stem_node_url} onUploadComplete={(url) => setForm(p => ({ ...p, stem_node_url: url }))} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <ImageUpload bucket="inventory" label="Leaf Progression #1" currentImageUrl={form.leaf_progression_1} onUploadComplete={(url) => setForm(p => ({ ...p, leaf_progression_1: url }))} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <ImageUpload bucket="inventory" label="Leaf Progression #2" currentImageUrl={form.leaf_progression_2} onUploadComplete={(url) => setForm(p => ({ ...p, leaf_progression_2: url }))} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Acclimation */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gold)' }}>3. Acclimation & Horticulture</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label className="form-label">Min Temp (°F)</label>
                          <input className="form-input" type="number" placeholder="65" value={form.temperature_min} onChange={e => setForm(p => ({ ...p, temperature_min: e.target.value }))} />
                        </div>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label className="form-label">Max Temp (°F)</label>
                          <input className="form-input" type="number" placeholder="80" value={form.temperature_max} onChange={e => setForm(p => ({ ...p, temperature_max: e.target.value }))} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label className="form-label">Min Humidity (%)</label>
                          <input className="form-input" type="number" placeholder="60" value={form.humidity_min} onChange={e => setForm(p => ({ ...p, humidity_min: e.target.value }))} />
                        </div>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label className="form-label">Max Humidity (%)</label>
                          <input className="form-input" type="number" placeholder="80" value={form.humidity_max} onChange={e => setForm(p => ({ ...p, humidity_max: e.target.value }))} />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Current Substrate</label>
                        <select className="form-input" value={form.current_substrate} onChange={e => setForm(p => ({ ...p, current_substrate: e.target.value }))}>
                          <option value="">Select Substrate...</option>
                          <option value="Sphagnum Moss">Sphagnum Moss</option>
                          <option value="Aroid Mix">Chunky Aroid Mix</option>
                          <option value="Fluval Stratum">Fluval Stratum</option>
                          <option value="Tree Fern Fiber">Tree Fern Fiber</option>
                          <option value="Leca / Semi-Hydro">Leca / Semi-Hydro</option>
                          <option value="Pon">Pon</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Pest Mitigation Log</label>
                        <input className="form-input" placeholder="e.g. Treated with systemic granules 14 days ago" value={form.pest_mitigation_log} onChange={e => setForm(p => ({ ...p, pest_mitigation_log: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setShowForm(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleSave} className="btn-primary" disabled={saving || !form.species_name.trim()} style={{ flex: 2, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add to Inventory'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
