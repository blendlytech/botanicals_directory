'use client';

import { DigitalPassport } from '@/lib/types';
import styles from './passport.module.css';

export default function PassportClient({ passport }: { passport: DigitalPassport }) {
  const inv = passport.inventory;
  const vendor = passport.vendor;
  const isAvailable = inv?.status !== 'sold';

  return (
    <main className={styles.passportMain}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className="container">
        <div className={styles.wrapper}>
          {/* Header/Verification Banner */}
          <div className={`${styles.verifiedBanner} animate-fade-in-up`}>
            <div className={styles.shieldIcon}>✦</div>
            <div className={styles.bannerText}>
              <h2 className={`font-display ${styles.verifiedTitle}`}>Verified Specimen</h2>
              <p className={styles.hash}>CID: {passport.verification_hash}</p>
            </div>
            <div className={styles.issuedDate}>
              Issued: {new Date(passport.issued_at).toLocaleDateString()}
            </div>
          </div>

          <div className={styles.contentGrid}>
            {/* Visual Column */}
            <div className={`${styles.visualCol} animate-fade-in-up delay-100`}>
              {inv?.image_url ? (
                <div className={styles.imageWrap}>
                  <img src={inv.image_url} alt={passport.specimen_name} className={styles.heroImage} />
                  {!isAvailable && (
                    <div className={styles.soldOverlay}>
                      <span className="badge badge-gold">Sold / Unavailable</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.noImage}>
                  <span className={styles.noImageIcon}>🌿</span>
                  <p>Image Verified Externally</p>
                </div>
              )}

              <div className={`glass-card ${styles.vendorCard}`}>
                <p className="text-muted" style={{fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Cultivated By</p>
                <div className={styles.vendorInfo}>
                  {vendor?.logo_url ? (
                    <img src={vendor.logo_url} alt={vendor.name} className={styles.vendorLogo} />
                  ) : (
                    <div className={styles.vendorLogoPlaceholder}>✦</div>
                  )}
                  <div>
                    <h3 className={`font-display ${styles.vendorName}`}>{vendor?.name}</h3>
                    <p className={styles.vendorBio}>{vendor?.bio?.substring(0, 80)}...</p>
                  </div>
                </div>
                {vendor?.slug && (
                  <a href={`https://rareplantvendors.com/vendor/${vendor.slug}`} target="_blank" className={`btn btn-outline ${styles.btnFull}`}>
                    View Vendor Profile
                  </a>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className={`${styles.infoCol} animate-fade-in-up delay-200`}>
              <div className={styles.headerBlock}>
                <h1 className={`font-display ${styles.title}`}>{inv?.species_name || passport.specimen_name}</h1>
                {inv?.variety && <h2 className={styles.variety}>&apos;{inv.variety}&apos;</h2>}
                {inv?.price && <div className={styles.price}>${inv.price.toFixed(2)}</div>}
              </div>

              <div className="divider-gold" style={{ marginInline: '0', marginBottom: 'var(--space-8)' }} />

              <div className={styles.dataSection}>
                <h3 className={`font-display ${styles.sectionTitle}`}>Botanical Lineage</h3>
                <div className={`glass-card ${styles.dataGrid}`}>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Propagation Method</span>
                    <span className={styles.dataValue}>{passport.propagation_method}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Genetic Origin</span>
                    <span className={styles.dataValue}>{passport.genetic_origin || 'Standard Species Line'}</span>
                  </div>
                  {passport.mother_plant_origin && (
                    <div className={styles.dataItem}>
                      <span className={styles.dataLabel}>Mother Plant ID</span>
                      <span className={styles.dataValue}>{passport.mother_plant_origin}</span>
                    </div>
                  )}
                </div>
              </div>

              {inv?.care_instructions && (
                <div className={styles.dataSection}>
                  <h3 className={`font-display ${styles.sectionTitle}`}>Care Instructions</h3>
                  <div className={`glass-card ${styles.careBox}`}>
                    <p>{inv.care_instructions}</p>
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                <p className="text-muted" style={{fontSize: 'var(--text-sm)', textAlign: 'center', marginBottom: 'var(--space-4)'}}>
                  Show this passport to the vendor to initiate a secure transaction.
                </p>
                <button className="btn btn-gold" style={{width: '100%'}} disabled={!isAvailable}>
                  {isAvailable ? 'Request to Purchase' : 'Specimen Sold'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
