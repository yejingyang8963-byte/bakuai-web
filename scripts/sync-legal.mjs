#!/usr/bin/env node
/**
 * Copy legal markdown from the iOS project's legal/ directory
 * into this web project's src/pages-legal/. The iOS legal/ folder
 * is the canonical source of truth — never edit pages-legal/ directly.
 */

import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';

const SOURCE_DIR = join(homedir(), 'Baku AI', 'legal');
const DEST_DIR = join(import.meta.dirname, '..', 'src', 'pages-legal');

const FILES_TO_COPY = [
  'privacy-policy.md',
  'privacy-policy.zh.md',
  'privacy-policy.es.md',
  'terms-of-service.md',
  'terms-of-service.zh.md',
  'terms-of-service.es.md',
];

async function main() {
  await mkdir(DEST_DIR, { recursive: true });

  let copied = 0;
  for (const filename of FILES_TO_COPY) {
    const src = join(SOURCE_DIR, filename);
    const dst = join(DEST_DIR, filename);
    try {
      await copyFile(src, dst);
      console.log(`  ✓ ${filename}`);
      copied++;
    } catch (err) {
      console.error(`  ✗ ${filename}: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\n✅ Synced ${copied} legal files from ${SOURCE_DIR}`);
}

main();
