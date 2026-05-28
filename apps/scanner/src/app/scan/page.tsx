'use client';

import { useState, useEffect } from 'react';
import styles from './scan.module.css';

export default function ScanPage() {
  const [scanning, setScanning] = useState(true);

  // Simulated scan effect for demo purposes
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        // In a real app, this would use the device camera via a library like react-qr-reader
        // For the UI demo, we'll just show the scanner animation
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  return (
    <main className={styles.scanMain}>
      <div className={styles.header}>
        <a href="/" className={styles.backBtn}>← Back</a>
        <span className={`font-display ${styles.headerTitle}`}>Scan Specimen</span>
        <div style={{width: '60px'}}></div>
      </div>

      <div className={styles.scannerContainer}>
        <div className={styles.cameraView}>
          <div className={styles.scanTarget}>
            <div className={styles.cornerTL}></div>
            <div className={styles.cornerTR}></div>
            <div className={styles.cornerBL}></div>
            <div className={styles.cornerBR}></div>
            <div className={styles.scanLine}></div>
          </div>
          <p className={styles.scanHint}>Position the QR tag within the frame to verify provenance</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.trustSignals}>
          <span className="badge badge-verified">✦ Secure Verification Engine</span>
        </div>
      </div>
    </main>
  );
}
