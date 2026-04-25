// src/lib/i18n.ts — tiny content loader.
// Reads src/content/{lang}/{slug}.yml and returns parsed object.
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

export type Lang = 'en' | 'zh' | 'es';

const cache = new Map<string, any>();

export function loadContent<T = any>(lang: Lang, slug: string): T {
  const key = `${lang}/${slug}`;
  if (cache.has(key)) return cache.get(key);
  const file = path.join(process.cwd(), 'src', 'content', lang, `${slug}.yml`);
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = parseYaml(raw);
  cache.set(key, parsed);
  return parsed;
}

export function langPath(lang: Lang, sub = ''): string {
  // Default locale (en) is unprefixed in your astro config.
  if (lang === 'en') return sub ? `/${sub}` : '/';
  return sub ? `/${lang}/${sub}` : `/${lang}/`;
}
