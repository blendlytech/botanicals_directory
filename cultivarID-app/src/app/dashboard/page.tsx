'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { InventoryItem, DigitalPassport } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [inventory, setInventory] = useState<(InventoryItem & { passport?: DigitalPassport })[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingItem, setAddingItem] = useState(false);
  const [printPassport, setPrintPassport] = useState<string | null>(null);
  const [form, setForm] = useState({
    species_name: '',
    variety: '',
    price: '',
    quantity: '1',
    image_url: '',
    care_instructions: '',
    propagation_method: '',
    mother_plant_origin: '',
    genetic_origin: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo vendor — in production, this comes from auth session
  const DEMO_VENDOR_ID = '00000000-0000-0000-0000-000000000000';
  const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://cultivarid.com';

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setLoading(true);
    const { data: items, error: invErr } = await supabase
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (invErr || !items) { setLoading(false); return; }

    // Fetch passports for each item
    const { data: passports } = await supabase
      .from('digital_passports')
      .select('*')
      .in('inventory_id', items.map((i) => i.id));

    const passportMap = Object.fromEntries((passports || []).map((p) => [p.inventory_id, p]));
    setInventory(items.map((i) => ({ ...i, passport: passportMap[i.id] })));
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // 1. Insert inventory item
    const { data: invData, error: invErr } = await supabase
      .from('inventory')
      .insert({
        vendor_id: DEMO_VENDOR_ID,
        species_name: form.species_name,
        variety: form.variety || null,
        price: form.price ? parseFloat(form.price) : null,
        quantity: parseInt(form.quantity) || 1,
        image_url: form.image_url || null,
        care_instructions: form.care_instructions || null,
        status: 'available',
      })
      .select()
      .single();

    if (invErr || !invData) {
      setError(invErr?.message || 'Failed to save inventory item.');
      setSaving(false);
      return;
    }

    // 2. Generate a verification hash
    const hashInput = `${invData.id}-${Date.now()}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const verificationHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 24);

    // 3. Create digital passport
    const { error: passErr } = await supabase.from('digital_passports').insert({
      vendor_id: DEMO_VENDOR_ID,
      inventory_id: invData.id,
      specimen_name: `${form.species_name}${form.variety ? ` '${form.variety}'` : ''}`,
      propagation_method: form.propagation_method || 'Unknown',
      mother_plant_origin: form.mother_plant_origin || null,
      genetic_origin: form.genetic_origin || null,
      verification_hash: verificationHash,
    });

    if (passErr) {
      setError(passErr.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setAddingItem(false);
    setForm({ species_name:'', variety:'', price:'', quantity:'1', image_url:'', care_instructions:'', propagation_method:'', mother_plant_origin:'', genetic_origin:'' });
    fetchInventory();
  }

  async function handleMarkSold(item: InventoryItem) {
    await supabase.from('inventory').update({ status: 'sold' }).eq('id', item.id);
    if (item.price) {
      await supabase.from('transactions').insert({
        vendor_id: item.vendor_id,
        inventory_id: item.id,
        sale_price: item.price,
      });
    }
    fetchInventory();
  }

  const passportUrl = (passportId: string) => `${BASE_URL}/passport/${passportId}`;

  return (
    <div className={styles.shell}>
      {/* Ambient orbs */}
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>✦</span>
          <span className={`font-display ${styles.logoText}`}>CultivarID</span>
        </div>
        <nav className={styles.sideNav}>
          <a href="/dashboard" className={`${styles.navItem} ${styles.navActive}`}>
            <span className={styles.navIcon}>🌿</span> Inventory
          </a>
          <a href="/scan" className={styles.navItem}>
            <span className={styles.navIcon}>⬛</span> Scanner
          </a>
          <a href="/" className={styles.navItem}>
            <span className={styles.navIcon}>↗</span> Home
          </a>
        </nav>
        <div className={styles.sidebarBadge}>
          <span className="badge badge-gold">Vendor Dashboard</span>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.content}>
        {/* Header row */}
        <div className={styles.topBar}>
          <div>
            <h1 className={`font-display ${styles.pageTitle}`}>Specimen Registry</h1>
            <p className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>
              {inventory.length} specimen{inventory.length !== 1 ? 's' : ''} registered
            </p>
          </div>
          <button className="btn btn-gold" onClick={() => setAddingItem(true)} id="btn-add-specimen">
            + Register Specimen
          </button>
        </div>

        {/* Error */}
        {error && <p className={styles.errorMsg}>{error}</p>}

        {/* Add form overlay */}
        {addingItem && (
          <div className={styles.overlay}>
            <div className={`glass-card ${styles.formCard}`}>
              <h2 className={`font-display ${styles.formTitle}`}>New Digital Passport</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div>
                    <label className="label">Species Name *</label>
                    <input className="input" required value={form.species_name} onChange={e => setForm({...form, species_name: e.target.value})} placeholder="Monstera deliciosa" />
                  </div>
                  <div>
                    <label className="label">Cultivar / Variety</label>
                    <input className="input" value={form.variety} onChange={e => setForm({...form, variety: e.target.value})} placeholder="Thai Constellation" />
                  </div>
                  <div>
                    <label className="label">Price (USD)</label>
                    <input className="input" type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="250.00" />
                  </div>
                  <div>
                    <label className="label">Quantity</label>
                    <input className="input" type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
                  </div>
                  <div className={styles.spanFull}>
                    <label className="label">Propagation Method *</label>
                    <select className="input" required value={form.propagation_method} onChange={e => setForm({...form, propagation_method: e.target.value})}>
                      <option value="">Select method…</option>
                      <option value="Tissue Culture">Tissue Culture (TC)</option>
                      <option value="Stem Cutting">Stem Cutting</option>
                      <option value="Division">Division / Offset</option>
                      <option value="Seed">Seed Grown</option>
                      <option value="Air Layer">Air Layer</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Genetic Origin</label>
                    <input className="input" value={form.genetic_origin} onChange={e => setForm({...form, genetic_origin: e.target.value})} placeholder="Sport variegation · Line 3" />
                  </div>
                  <div>
                    <label className="label">Mother Plant ID</label>
                    <input className="input" value={form.mother_plant_origin} onChange={e => setForm({...form, mother_plant_origin: e.target.value})} placeholder="CID-0001-A" />
                  </div>
                  <div className={styles.spanFull}>
                    <label className="label">Image URL</label>
                    <input className="input" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://…" />
                  </div>
                  <div className={styles.spanFull}>
                    <label className="label">Care Instructions</label>
                    <textarea className="input" rows={3} value={form.care_instructions} onChange={e => setForm({...form, care_instructions: e.target.value})} placeholder="Bright indirect light, water weekly…" />
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className="btn btn-outline" onClick={() => setAddingItem(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold" id="btn-save-passport" disabled={saving}>
                    {saving ? 'Registering…' : 'Issue Passport ✦'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Print Modal */}
        {printPassport && (
          <div className={styles.overlay}>
            <div className={`glass-card ${styles.qrModal}`}>
              <h3 className={`font-display ${styles.formTitle}`}>Print QR Care Tag</h3>
              <div className={styles.qrModalInner}>
                <QRCodeSVG
                  value={passportUrl(printPassport)}
                  size={220}
                  bgColor="transparent"
                  fgColor="#c9a84c"
                  level="H"
                />
                <p className={styles.qrModalUrl}>{passportUrl(printPassport)}</p>
                <p className="text-muted" style={{ fontSize: 'var(--text-xs)', textAlign: 'center' }}>
                  Print and laminate this tag for your booth
                </p>
              </div>
              <div className={styles.formActions}>
                <button className="btn btn-outline" onClick={() => setPrintPassport(null)}>Close</button>
                <button className="btn btn-gold" onClick={() => window.print()}>Print Tag</button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory table */}
        {loading ? (
          <div className={styles.loadingRow}>
            <span className="text-gold">Loading registry…</span>
          </div>
        ) : inventory.length === 0 ? (
          <div className={`glass-card ${styles.emptyState}`}>
            <span style={{ fontSize: '3rem' }}>🌿</span>
            <h3 className="font-display" style={{ color: 'var(--color-sand)' }}>No specimens yet</h3>
            <p className="text-muted">Register your first specimen to issue a digital passport.</p>
            <button className="btn btn-gold" onClick={() => setAddingItem(true)}>Register First Specimen</button>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Specimen</th>
                  <th>Method</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Passport</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className={item.status === 'sold' ? styles.rowSold : ''}>
                    <td>
                      <div className={styles.specimenCell}>
                        {item.image_url && <img src={item.image_url} alt={item.species_name} className={styles.thumbImg} />}
                        <div>
                          <p className={`font-display ${styles.specimenName}`}>{item.species_name}</p>
                          {item.variety && <p className={styles.specimenVariety}>'{item.variety}'</p>}
                        </div>
                      </div>
                    </td>
                    <td><span className="text-muted" style={{fontSize:'var(--text-sm)'}}>{item.passport?.propagation_method || '—'}</span></td>
                    <td><span className="text-gold">{item.price ? `$${item.price.toFixed(2)}` : '—'}</span></td>
                    <td>
                      <span className={`badge ${item.status === 'sold' ? 'badge-gold' : 'badge-emerald'}`}>
                        {item.status === 'sold' ? '✓ Sold' : '● Available'}
                      </span>
                    </td>
                    <td>
                      {item.passport ? (
                        <a href={`/passport/${item.passport.id}`} target="_blank" className={styles.passportLink}>
                          View ↗
                        </a>
                      ) : (
                        <span className="text-muted" style={{fontSize:'var(--text-xs)'}}>—</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionRow}>
                        {item.passport && (
                          <button className={`btn btn-outline ${styles.btnSm}`} onClick={() => setPrintPassport(item.passport!.id)}>
                            QR Tag
                          </button>
                        )}
                        {item.status !== 'sold' && (
                          <button className={`btn btn-gold ${styles.btnSm}`} onClick={() => handleMarkSold(item)}>
                            Mark Sold
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
