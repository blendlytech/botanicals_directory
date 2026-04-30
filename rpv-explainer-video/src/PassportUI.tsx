import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const PassportUI: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide up from bottom
  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Calculate actual pixel translation (100% to 0%)
  const yOffset = interpolate(translateY, [0, 1], [1080, 100]);

  return (
    <AbsoluteFill style={{ alignItems: 'center', zIndex: 5, pointerEvents: 'none' }}>
      <div style={{
        transform: `translateY(${yOffset}px)`,
        width: '600px',
        height: '1100px',
        backgroundColor: '#ffffff',
        borderRadius: '40px',
        boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* App Header */}
        <div style={{ backgroundColor: '#0b3d2e', padding: '30px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ margin: 0, fontSize: '2rem', color: '#d4af37' }}>CultivarID</h2>
          <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '1.2rem' }}>Verified Provenance</p>
        </div>

        {/* Plant Image Area */}
        <div style={{ width: '100%', height: '300px', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '5rem' }}>🌿</div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px', color: '#333' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>Monstera Obliqua</h1>
          <p style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 0 30px 0' }}>✓ Verified Vendor: Jungle Exotics</p>

          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#64748b' }}>LINEAGE</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>Peru Clone (Node 4)</p>
          </div>

          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px', marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#64748b' }}>CERTIFICATIONS</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>Nematode Free, USDA Inspected</p>
          </div>
          
          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px', marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#64748b' }}>ACQUIRED</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>March 2024</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
