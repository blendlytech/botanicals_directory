import { loadImage } from 'canvas';
import path from 'path';

const TEMPLATE_PATH = path.resolve('./Media Assets/Brand Identity/Art Assets/Directory Branding Art/elite_grower_badge_template.png');

async function check() {
  const img = await loadImage(TEMPLATE_PATH);
  console.log(`Dimensions: ${img.width}x${img.height}`);
}

check();
