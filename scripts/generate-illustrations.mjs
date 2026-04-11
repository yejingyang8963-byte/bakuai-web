#!/usr/bin/env node
/**
 * Generate 20 picture-book watercolor illustrations via Gemini Imagen 4.
 *
 * Reads GEMINI_API_KEY from .env.local. The key never enters Claude
 * conversation context — this script runs locally on the user's machine.
 *
 * Cost: ~$0.04/image × 20 = ~$0.80 (Imagen 4 standard tier).
 *
 * Usage:
 *   echo "GEMINI_API_KEY=AIza..." > .env.local
 *   npm run gen-illustrations
 *
 * Output:
 *   public/illustrations/##-name.png (20 files)
 *   public/illustrations/.metadata.json (timestamps, prompt hashes, cost)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { GoogleGenAI } from '@google/genai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PROMPTS_FILE = join(ROOT, 'src', 'data', 'illustration-prompts.json');
const OUTPUT_DIR = join(ROOT, 'public', 'illustrations');
const METADATA_FILE = join(OUTPUT_DIR, '.metadata.json');
const ENV_FILE = join(ROOT, '.env.local');

const COST_PER_IMAGE_USD = 0.04;

async function loadEnv() {
  try {
    const content = await readFile(ENV_FILE, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  } catch (err) {
    console.error(`❌ Could not read ${ENV_FILE}`);
    console.error(`   Create it with:  echo "GEMINI_API_KEY=AIza..." > .env.local`);
    process.exit(1);
  }
}

function hashPrompt(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

async function main() {
  await loadEnv();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }
  if (!apiKey.startsWith('AIza')) {
    console.error('❌ GEMINI_API_KEY does not look like a valid Google API key (should start with "AIza")');
    process.exit(1);
  }

  const data = JSON.parse(await readFile(PROMPTS_FILE, 'utf-8'));
  const styleLock = data.styleLock;
  const illustrations = data.illustrations;

  console.log(`📚 Generating ${illustrations.length} illustrations`);
  console.log(`💰 Estimated cost: $${(illustrations.length * COST_PER_IMAGE_USD).toFixed(2)}`);
  console.log(``);

  await mkdir(OUTPUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });
  const metadata = {
    generatedAt: new Date().toISOString(),
    totalImages: illustrations.length,
    estimatedCostUSD: illustrations.length * COST_PER_IMAGE_USD,
    styleLockHash: hashPrompt(styleLock),
    images: [],
  };

  let generated = 0;
  let failed = 0;

  for (const ill of illustrations) {
    const fullPrompt = `${ill.prompt}\n\nSTYLE LOCK:\n${styleLock}`;
    const outPath = join(OUTPUT_DIR, `${ill.id}.png`);
    const promptHash = hashPrompt(fullPrompt);

    process.stdout.write(`  ${ill.id} [${ill.type}, ${ill.size}] ... `);

    try {
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: ill.size === '1024x512' ? '2:1' : '1:1',
        },
      });

      if (!response?.generatedImages?.[0]?.image?.imageBytes) {
        throw new Error('Empty response from Imagen API');
      }

      const imageBytes = response.generatedImages[0].image.imageBytes;
      const buffer = Buffer.from(imageBytes, 'base64');
      await writeFile(outPath, buffer);

      metadata.images.push({
        id: ill.id,
        type: ill.type,
        size: ill.size,
        promptHash,
        fileSize: buffer.length,
        success: true,
      });
      generated++;
      console.log(`✓ ${(buffer.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      metadata.images.push({
        id: ill.id,
        type: ill.type,
        promptHash,
        success: false,
        error: err.message,
      });
      failed++;
      console.log(`✗ ${err.message}`);
    }
  }

  await writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));

  console.log('');
  console.log(`✅ Generated: ${generated}/${illustrations.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} (rerun the script to retry)`);
  }
  console.log(`💰 Approximate cost: $${(generated * COST_PER_IMAGE_USD).toFixed(2)}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
