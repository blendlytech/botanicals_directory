import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

// Define paths
const TEMPLATE_PATH = path.resolve('./Media Assets/Brand Identity/Art Assets/Directory Branding Art/elite_grower_badge_template.png');
const OUTPUT_DIR = path.resolve('./public/generated-badges');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Mock Database of Elite Vendors (Indexes 45 through 99)
const eliteVendors = [
  // vendor data will be pulled dynamically in production
];

async function generateBadges() {
  try {
    const templateImage = await loadImage(TEMPLATE_PATH);
    const width = templateImage.width;
    const height = templateImage.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    console.log('Initiating Elite Badge Generation Protocol...');
    console.log('Starting execution at Badge No. 046...');

    // Loop starts at 45 (which represents Badge No. 46) and goes to 100
    for (let i = 45; i < 100; i++) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(templateImage, 0, 0, width, height);

      const vendor = eliteVendors[i] || { 
        companyName: `Elite Botanical Vendor ${i + 1}`, 
        city: "Classified", 
        state: "XX", 
        uniqueId: `CULTIVAR-${Math.random().toString(36).substr(2, 6).toUpperCase()}` 
      };

      const badgeNumber = String(i + 1).padStart(3, '0');

      // --- PIXEL COORDINATES CONTROL PANEL ---
      // Tweak these numbers to perfectly align with your template's layout
      
      // Left Circle (Badge Number)
      const badgeX = 250;       // Center of the yellow circle (left to right)
      const badgeY = height / 2; // Center of the yellow circle (top to bottom)

      // Right Text Block (The three yellow lines)
      const textStartX = 450;   // The left edge of where the yellow lines start
      const nameY = 320;        // Top yellow line (Business Name)
      const locationY = 420;    // 2nd yellow line (City and State)
      const idY = 520;          // 3rd yellow line (Unique ID)
      // ---------------------------------------

      // 1. Badge Number (Yellow Circle on the Left)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 52px serif';
      ctx.fillStyle = '#D4AF37'; 
      ctx.fillText(badgeNumber, badgeX, badgeY);

      // Reset alignment to left for the stacked information
      ctx.textAlign = 'left';

      // 2. Business Name (Top Yellow Line)
      ctx.font = 'bold 64px serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(vendor.companyName.toUpperCase(), textStartX, nameY);

      // 3. City & State (2nd Yellow Line)
      ctx.font = '32px sans-serif';
      ctx.fillStyle = '#A0AEC0';
      ctx.fillText(`${vendor.city}, ${vendor.state}`, textStartX, locationY);

      // 4. Unique ID (3rd Yellow Line)
      ctx.font = '24px monospace';
      ctx.fillStyle = '#0B3D2E'; 
      ctx.fillText(`ID: ${vendor.uniqueId}`, textStartX, idY);

      const buffer = canvas.toBuffer('image/png');
      const filename = `elite_badge_${badgeNumber}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
      
      console.log(`[+] Generated: ${filename} for ${vendor.companyName}`);
    }

    console.log('Deployment Complete: Badges 046 through 100 rendered.');
  } catch (error) {
    console.error('Fatal error during badge generation:', error);
  }
}

generateBadges();