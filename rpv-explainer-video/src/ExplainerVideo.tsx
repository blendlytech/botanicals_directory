import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Video,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
} from 'remotion';
import { PassportUI } from './PassportUI';

// --- LUXE CAPTION COMPONENT ---
const Caption: React.FC<{ 
  text: string; 
  delay?: number; 
  isGold?: boolean; 
}> = ({ text, delay = 0, isGold = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '150px', zIndex: 10 }}>
      <div style={{
        opacity,
        textAlign: 'center',
        padding: '2rem 4rem',
        background: 'rgba(4, 8, 6, 0.7)',
        borderLeft: isGold ? '4px solid #d4af37' : 'none',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        maxWidth: '1200px'
      }}>
        <h1 style={{ 
          color: isGold ? '#d4af37' : 'white', 
          fontSize: '2.2rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
          margin: 0,
          lineHeight: 1.2
        }}>
          {text}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// --- CINEMATIC VIDEO WRAPPER ---
const CinematicVideo: React.FC<{ src: string }> = ({ src }) => {
  return (
    <AbsoluteFill>
      <Video 
        src={staticFile(src)} 
        muted={true}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          filter: 'brightness(0.6) contrast(1.1) saturate(0.8)' 
        }} 
      />
      {/* Vignette Overlay */}
      <AbsoluteFill style={{ 
        boxShadow: 'inset 0 0 400px rgba(0,0,0,0.9)',
        background: 'radial-gradient(circle, transparent 20%, rgba(4,8,6,0.5) 100%)' 
      }} />
    </AbsoluteFill>
  );
};

export const ExplainerVideo: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#040806' }}>
      {/* ── AUDIO STRIPPED FOR LANDING PAGE ── */}

      {/* --- SCENE 1: THE PROBLEM (0 - 18s) --- */}
      <Sequence from={0} durationInFrames={540}>
        <CinematicVideo src="scene-1.mp4" />
        
        <Sequence from={15} durationInFrames={135}>
          <Caption text="You bring your best specimens to an expo..." />
        </Sequence>
        <Sequence from={150} durationInFrames={120}>
          <Caption text="A collector walks up, falls in love... but hesitates." />
        </Sequence>
        <Sequence from={270} durationInFrames={120}>
          <Caption text="Is the lineage real? Is this vendor trustworthy?" />
        </Sequence>
        <Sequence from={390} durationInFrames={150}>
          <Caption text="That hesitation is the sound of a lost sale." isGold={true} />
        </Sequence>
      </Sequence>

      {/* --- SCENE 2: THE SOLUTION (18s - 26s) --- */}
      <Sequence from={540} durationInFrames={240}>
        <CinematicVideo src="scene-3.mp4" />
        <PassportUI delay={60} />
        
        <Sequence from={0} durationInFrames={120}>
          <Caption text="Enter CultivarID by Rare Plant Vendors." isGold={true} />
        </Sequence>
        <Sequence from={120} durationInFrames={120}>
          <Caption text="The definitive digital passport for botanical provenance." />
        </Sequence>
      </Sequence>

      {/* --- SCENE 3: HOW IT WORKS (26s - 40s) --- */}
      <Sequence from={780} durationInFrames={420}>
        <CinematicVideo src="scene-2.mp4" />
        <PassportUI delay={0} />
        
        <Sequence from={0} durationInFrames={150}>
          <Caption text="Instead of a price tag, your premium plants get a physical QR code." />
        </Sequence>
        <Sequence from={150} durationInFrames={270}>
          <Caption text="Collectors scan it, and instantly see complete lineage, care history, and nursery certifications." />
        </Sequence>
      </Sequence>

      {/* --- SCENE 4: THE BENEFIT (40s - 48s) --- */}
      <Sequence from={1200} durationInFrames={240}>
        <CinematicVideo src="scene-1.mp4" />
        
        <Sequence from={0} durationInFrames={80}>
          <Caption text="You eliminate the uncertainty gap." />
        </Sequence>
        <Sequence from={80} durationInFrames={80}>
          <Caption text="You build instant authority." />
        </Sequence>
        <Sequence from={160} durationInFrames={80}>
          <Caption text="And you close high-ticket sales instantly." isGold={true} />
        </Sequence>
      </Sequence>

      {/* --- SCENE 5: THE GRAND REVEAL (48s - 60s) --- */}
      <Sequence from={1440} durationInFrames={360}>
        <AbsoluteFill style={{ 
          background: 'radial-gradient(circle at center, #0b3d2e 0%, #040806 100%)',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Pulsing Glow behind Logo */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'rgba(212, 175, 55, 0.1)',
            filter: 'blur(100px)',
            borderRadius: '50%',
            opacity: interpolate(frame % 60, [0, 30, 60], [0.3, 0.6, 0.3])
          }} />

          <div style={{ 
            zIndex: 20, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <Img 
              src={staticFile('brand-seal.png')} 
              style={{ 
                width: '320px', 
                marginBottom: '4rem',
                filter: 'drop-shadow(0 0 50px rgba(212, 175, 55, 0.4))',
              }} 
            />
            <h2 style={{ 
              color: '#d4af37', 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              margin: 0,
              letterSpacing: '0.05em'
            }}>
              50 Founding Seats Released
            </h2>
            <p style={{ 
              color: 'white', 
              fontSize: '1.6rem', 
              marginTop: '2rem', 
              opacity: 0.8, 
              letterSpacing: '0.1em',
              fontWeight: 300
            }}>
              Secure your legacy today at RealPlantVendors.com
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
