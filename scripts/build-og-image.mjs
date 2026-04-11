#!/usr/bin/env node
/**
 * Generate og-image.png (1200×630, the standard Open Graph size)
 * by compositing the hero moon illustration onto a midnight blue
 * background. Pure local image processing — no API call.
 */

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HERO = join(ROOT, 'public', 'illustrations', '01-hero-moon.webp');
const OUT = join(ROOT, 'public', 'og-image.png');

async function main() {
  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 10, g: 10, b: 42, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const moon = await sharp(HERO)
    .resize(500, 500, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(bg)
    .composite([{ input: moon, top: 65, left: 350 }])
    .png()
    .toFile(OUT);

  console.log(`✅ Generated ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
