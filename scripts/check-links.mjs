#!/usr/bin/env node
/**
 * Internal link checker - no external dependencies.
 *
 * Walks every HTML file and resolves local href/src/poster targets against
 * the filesystem. External URLs, anchors, mailto:, tel:, data: and
 * javascript: are skipped. Template-literal placeholders (${...}) and
 * Jekyll/Handlebars style {{...}} are skipped too, since those are resolved
 * at runtime rather than being static paths.
 *
 * Set STRICT_LINKS=0 to report findings without failing the build.
 */

import { existsSync, readFileSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const STRICT = process.env.STRICT_LINKS !== '0';
const IGNORED_DIRS = new Set(['.git', 'node_modules']);
const SKIP_SCHEME = /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i;

// Known, deliberate exceptions. See scripts/link-check-config.json.
let config = { ignoreFiles: [], allowMissing: [] };
try {
  config = JSON.parse(readFileSync(join(ROOT, 'scripts/link-check-config.json'), 'utf8'));
} catch {
  console.log('note: scripts/link-check-config.json not found, checking everything.');
}
const toPosix = (p) => p.split(/[\\/]/).join('/');
const IGNORED_FILES = new Set(config.ignoreFiles || []);
const ALLOW_MISSING = new Set(config.allowMissing || []);

async function collectHtmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectHtmlFiles(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      found.push(full);
    }
  }
  return found;
}

/** Map a URL path onto a file on disk, mirroring server.js routing. */
function resolveTarget(rawValue, htmlFile) {
  const value = rawValue.trim().split('#')[0].split('?')[0];
  if (!value) return null;

  if (value.startsWith('/')) {
    // Root-relative: server.js serves these from the repo root.
    return resolve(ROOT, '.' + value);
  }
  return resolve(dirname(htmlFile), value);
}

const allFiles = (await collectHtmlFiles(ROOT)).sort();
const files = allFiles.filter((f) => !IGNORED_FILES.has(toPosix(relative(ROOT, f))));
const skippedFiles = allFiles.length - files.length;
const broken = [];
const allowed = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const attrs = html.matchAll(/\b(?:href|src|poster)\s*=\s*["']([^"']*)["']/gi);

  for (const match of attrs) {
    const value = match[1];
    if (!value || SKIP_SCHEME.test(value)) continue;
    if (value.includes('${') || value.includes('{{')) continue; // runtime-built

    const target = resolveTarget(value, file);
    if (!target) continue;
    checked++;

    if (!existsSync(target)) {
      const expected = toPosix(relative(ROOT, target));
      const record = { file: toPosix(relative(ROOT, file)), link: value, expected };
      if (ALLOW_MISSING.has(expected)) allowed.push(record);
      else broken.push(record);
    }
  }
}

const summary = () => {
  if (skippedFiles) console.log(`(${skippedFiles} file(s) skipped via ignoreFiles)`);
  if (allowed.length) {
    console.log(`(${allowed.length} known-missing target(s) allowed via allowMissing:`);
    for (const a of [...new Set(allowed.map((x) => x.expected))].sort()) {
      console.log(`    ${a}`);
    }
    console.log(' )');
  }
};

if (broken.length === 0) {
  console.log(`All ${checked} internal link(s) across ${files.length} file(s) resolve.`);
  summary();
  process.exit(0);
}

console.log(`Broken internal links (${broken.length} of ${checked} checked):\n`);
const byFile = new Map();
for (const item of broken) {
  if (!byFile.has(item.file)) byFile.set(item.file, []);
  byFile.get(item.file).push(item);
}
for (const [file, items] of [...byFile].sort()) {
  console.log(`  ${file}`);
  for (const item of items) {
    console.log(`      ${item.link}   ->   missing: ${item.expected}`);
  }
}

console.log(`\n${broken.length} broken link(s) in ${byFile.size} file(s).`);
summary();
process.exit(STRICT ? 1 : 0);
