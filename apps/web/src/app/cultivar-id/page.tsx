import Link from "next/link";
import { ShieldCheck, Package, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import Image from "next/image";

export const metadata = {
  title: "CultivarID™ Workflow | Rare Plant Vendors",
  description: "Learn how the CultivarID system provides absolute provenance and commands premium prices for elite growers.",
};

export default function CultivarIDExplainer() {
  return (
    <main className="page-wrapper">
      
      {/* ─── HERO ─── */}
      <section className="hero" style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
        <div className="hero-grid-overlay"></div>
        
        <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <ShieldCheck size={16} />
          <span>The CultivarID™ System</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
          Command Premium Prices. <br />
          <em>Prove the Lineage.</em>
        </h1>
        
        <p className="hero-sub" style={{ maxWidth: '800px', margin: '1.5rem auto 3rem' }}>
          The rare plant market is flooded with fakes. CultivarID is the world's first tamper-proof digital birth certificate for botanical specimens. Here is exactly how it works for you as an Elite Vendor.
        </p>

        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link href="/cultivar-id/demo" className="btn-primary" style={{ padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            View Demo Birth Certificate <ArrowRight size={18} />
          </Link>
          <Link href="/for-vendors" className="btn-ghost" style={{ padding: '1rem 2.5rem' }}>
            See All Elite Features
          </Link>
        </div>
      </section>

      {/* ─── THE 3-STEP WORKFLOW ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="section-header">
          <div className="section-eyebrow" style={{ padding: '0.4rem 1.25rem' }}>Simple Execution</div>
          <h2 className="section-title">Zero Coding. <em>Absolute Security.</em></h2>
          <p className="section-desc">
            We engineered the system so you do no data entry from a computer. You build the plant's profile directly from your smartphone while standing in the greenhouse.
          </p>
          <div className="section-rule"></div>
        </div>

        <div style={{ maxWidth: '900px', margin: '4rem auto 0', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', padding: '3rem', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', background: 'var(--charcoal)', color: 'var(--gold)', border: '2px solid var(--gold)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>1</div>
            <div style={{ padding: '1.5rem', background: 'rgba(212,175,55,0.1)', borderRadius: '16px', color: 'var(--gold)' }}>
              <Package size={40} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>We Drop-Ship the Tags</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Whenever you have rare plants ready for sale, you simply order tags from your vendor portal. We encode blank, tamper-evident Nylon NFC tags with unique security keys and drop-ship them directly to your nursery. 
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> Costs only $10 per tag (on-demand).</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> Soft nylon prevents girdling and stem damage.</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', padding: '3rem', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', background: 'var(--charcoal)', color: 'var(--gold)', border: '2px solid var(--gold)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>2</div>
            <div style={{ padding: '1.5rem', background: 'rgba(212,175,55,0.1)', borderRadius: '16px', color: 'var(--gold)' }}>
              <Smartphone size={40} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>Attach & Tap to Claim</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                When the package arrives, take a tag out to the greenhouse and securely wrap it around the mature stem or aerial root of your rare specimen. Then, simply tap the tag with your iPhone or Android.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> The tag utilizes frictionless NFC—no app downloads required.</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> The system instantly recognizes the tag belongs to your nursery.</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', padding: '3rem', background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--gold)', position: 'relative', boxShadow: '0 20px 40px rgba(212,175,55,0.1)' }}>
            <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', background: 'var(--gold)', color: 'var(--charcoal)', border: '2px solid var(--gold)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>3</div>
            <div style={{ padding: '1.5rem', background: 'var(--gold)', borderRadius: '16px', color: 'var(--charcoal)' }}>
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--gold)' }}>Publish the Provenance</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Because the tag is "unclaimed", tapping it opens a secure form on your phone. You take a photo of the variegation, type in the lineage, and hit "Publish." The tag is now permanently locked to that specific plant's digital birth certificate.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> If a scammer cuts the tag off to swap it, the antenna breaks and permanently voids the certificate.</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}><CheckCircle size={16} color="var(--gold)" /> Your buyers get 100% confidence, and you command top-tier pricing.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section" style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem' }}>See What the Collector Sees.</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
          Experience the premium digital birth certificate that builds instant trust and authority with your high-ticket buyers.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/cultivar-id/demo" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            View Demo Certificate <ArrowRight size={20} />
          </Link>
          <Link href="/onboarding?plan=elite" className="btn-ghost" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
            Secure $497 Elite Package
          </Link>
        </div>
      </section>

    </main>
  );
}
