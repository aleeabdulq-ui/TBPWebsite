#!/usr/bin/env node
/**
 * Lightweight HTML sanity check - no external dependencies.
 *
 * Deliberately conservative: it only reports problems that are almost
 * certainly real bugs, so that a green run actually means something.
 *
 *   - structural tags that are opened but never closed (or vice versa)
 *   - duplicate id attributes within a single document
 *   - stray "<//" or malformed closing tags
 *
 * Tags with optional end tags in the HTML spec (p, li, td, tr, option, ...)
 * are intentionally NOT balance-checked, because omitting their closing tag
 * is legal and common.
 */

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const IGNORED_DIRS = new Set(['.git', 'node_modules', 'images', 'videos', 'fonts']);

// Structural elements whose closing tag is mandatory.
const BALANCED_TAGS = [
  'html', 'head', 'body', 'title',
  'div', 'section', 'header', 'footer', 'main', 'nav', 'aside', 'article',
  'ul', 'ol', 'table', 'thead', 'tbody', 'form', 'button', 'select',
  'textarea', 'script', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
];

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

/** Remove comments and the raw text content of script/style so their
 *  contents are never mistaken for markup. */
function stripNonMarkup(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2')
    .replace(/(<style\b[^>]*>)[\s\S]*?(<\/style>)/gi, '$1$2');
}

function checkFile(file) {
  const problems = [];
  const raw = readFileSync(file, 'utf8');
  const html = stripNonMarkup(raw);

  // 1. Structural tag balance.
  for (const tag of BALANCED_TAGS) {
    const opens = (html.match(new RegExp(`<${tag}(?=[\\s/>])`, 'gi')) || []).length;
    const closes = (html.match(new RegExp(`</${tag}\\s*>`, 'gi')) || []).length;
    if (opens !== closes) {
      const diff = opens - closes;
      problems.push(
        diff > 0
          ? `<${tag}> opened ${opens}x but closed ${closes}x (${diff} unclosed)`
          : `</${tag}> closed ${closes}x but opened ${opens}x (${-diff} stray closing tag${-diff > 1 ? 's' : ''})`,
      );
    }
  }

  // 2. Duplicate ids.
  const ids = new Map();
  for (const match of html.matchAll(/\sid\s*=\s*["']([^"']+)["']/gi)) {
    const id = match[1];
    ids.set(id, (ids.get(id) || 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) problems.push(`duplicate id="${id}" used ${count}x`);
  }

  // 3. Obviously malformed closing tags.
  if (/<\/\//.test(html)) problems.push('malformed closing tag ("<//")');

  return problems;
}

const files = (await collectHtmlFiles(ROOT)).sort();
let failed = 0;

for (const file of files) {
  const problems = checkFile(file);
  const name = relative(ROOT, file);
  if (problems.length === 0) {
    console.log(`ok      ${name}`);
  } else {
    failed++;
    console.log(`FAILED  ${name}`);
    for (const problem of problems) console.log(`          - ${problem}`);
  }
}

console.log(`\n${files.length} file(s) checked, ${failed} with problems.`);
process.exit(failed > 0 ? 1 : 0);
