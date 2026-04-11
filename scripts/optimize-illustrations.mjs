#!/usr/bin/env node
/**
 * Convert all illustrations from raw PNG (1024×1024 ~1.5MB each) to
 * optimized WebP at display sizes. Cuts total weight from ~33MB to ~2MB.
 *
 * Sizing strategy:
 * - anchor (1024×1024): keep 1024 wide for retina, WebP quality 82
 * - anchor 16:9 panorama: 1280 wide
 * - icon: downsize to 640×640 (display ≤ 280px, retina = 560)
 * - decor: downsize to 384×384 (display ≤ 256)
 *
 * Removes the source .png files after successful conversion.
 */

import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = new URL('../public/illustrations/', import.meta.url).pathname;

const SIZE_BY_TYPE = {
  anchor: 1024,
  'anchor-wide': 1280,
  icon: 640,
  decor: 384,
};

const QUALITY = 82;

function classify(filename) {
  const id = filename.replace('.png', '');
  if (id === '04-house-on-hill') return 'anchor-wide';
  if (id.startsWith('01-') || id.startsWith('02-') || id.startsWith('03-')) return 'anchor';
  if (id.startsWith('19-') || id.startsWith('20-')) return 'decor';
  return 'icon';
}

async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith('.png')).sort();
  console.log(`🎨 Optimizing ${files.length} illustrations to WebP...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const srcPath = join(DIR, file);
    const dstPath = srcPath.replace('.png', '.webp');
    const type = classify(file);
    const targetWidth = SIZE_BY_TYPE[type];

    const beforeStat = await stat(srcPath);
    totalBefore += beforeStat.size;

    process.stdout.write(`  ${file} [${type}, ≤${targetWidth}px] ... `);

    const pipeline = sharp(srcPath).resize({
      width: targetWidth,
      withoutEnlargement: true,
    });

    if (type === 'anchor-wide') {
      // 16:9 panorama — preserve aspect, height auto
    }

    await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(dstPath);

    const afterStat = await stat(dstPath);
    totalAfter += afterStat.size;

    const beforeKB = (beforeStat.size / 1024).toFixed(0);
    const afterKB = (afterStat.size / 1024).toFixed(0);
    const ratio = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(0);
    console.log(`${beforeKB} KB → ${afterKB} KB (-${ratio}%)`);

    // Remove the original PNG
    await unlink(srcPath);
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(2);
  const afterMB = (totalAfter / 1024 / 1024).toFixed(2);
  const savedRatio = ((1 - totalAfter / totalBefore) * 100).toFixed(0);

  console.log('');
  console.log(`✅ Total: ${beforeMB} MB → ${afterMB} MB (-${savedRatio}%)`);
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
