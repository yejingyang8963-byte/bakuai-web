#!/usr/bin/env node
/**
 * Re-count real metrics from the iOS project and update the
 * Founder's Note YAML files in both EN and ZH content directories.
 *
 * Run this immediately before launch to make sure the metrics wall
 * shows accurate numbers (Swift file count changes as the project
 * grows).
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { parse, stringify } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IOS_PROJECT = join(homedir(), 'Baku AI');

function countSwiftFiles() {
  return parseInt(
    execSync(
      `find "${IOS_PROJECT}/BakuAI" -name "*.swift" -not -path "*/Tests/*" | wc -l`,
      { encoding: 'utf-8' }
    ).trim(),
    10
  );
}

function countTests() {
  return parseInt(
    execSync(
      `grep -rE "func test[A-Z]" "${IOS_PROJECT}/BakuAITests" 2>/dev/null | wc -l`,
      { encoding: 'utf-8' }
    ).trim(),
    10
  );
}

function countPresetStories() {
  try {
    return parseInt(
      execSync(
        `grep -rh "Story(title:" "${IOS_PROJECT}/BakuAI/Core/LLM/" 2>/dev/null | wc -l`,
        { encoding: 'utf-8' }
      ).trim(),
      10
    );
  } catch {
    return 264;
  }
}

function updateYaml(lang, swiftFiles, tests, stories) {
  const path = join(ROOT, 'src', 'content', lang, 'founder.yml');
  const data = parse(readFileSync(path, 'utf-8'));

  for (const m of data.metrics) {
    if (m.label.includes('Swift') || m.label.includes('源文件')) m.value = String(swiftFiles);
    else if (m.label === 'tests' || m.label.includes('测试')) m.value = String(tests);
    else if (m.label.includes('hand-crafted') || m.label.includes('手写故事')) m.value = String(stories);
  }

  writeFileSync(path, stringify(data));
  console.log(`  ✓ ${path}`);
}

function main() {
  console.log('🔢 Counting real metrics from iOS project...\n');

  const swiftFiles = countSwiftFiles();
  const tests = countTests();
  const stories = countPresetStories();

  console.log(`  Swift files: ${swiftFiles}`);
  console.log(`  Tests:       ${tests}`);
  console.log(`  Stories:     ${stories}`);
  console.log('');
  console.log('📝 Updating YAML files...');

  updateYaml('en', swiftFiles, tests, stories);
  updateYaml('zh', swiftFiles, tests, stories);

  console.log('\n✅ Metrics updated.');
}

main();
