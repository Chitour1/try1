import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) out.push(full);
  }
  return out;
}

const files = [...walk('app'), ...walk('components')];
const knownExact = new Set([
  '/', '/auth', '/forum', '/social', '/news', '/search', '/notifications', '/create', '/menu',
  '/tags', '/a21', '/a22', '/a23', '/a24', '/a25', '/u/me'
]);
const patterns = [/^\/forum\/t\/[^/]+$/, /^\/social\/p\/[^/]+$/, /^\/news\/a\/[^/]+$/, /^\/u\/[^/]+$/, /^\/auth\?return=.+/];
const hrefRegex = /href\s*=\s*["'`]([^"'`]+)["'`]/g;
let failed = false;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(hrefRegex)) {
    const href = match[1].trim();
    if (href.includes('#') || href.startsWith('javascript:')) { console.error(`Invalid dead href in ${file}: ${href}`); failed = true; continue; }
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (!href.startsWith('/')) { console.error(`Internal href must start with / in ${file}: ${href}`); failed = true; continue; }
    if (!knownExact.has(href) && !patterns.some((p) => p.test(href))) { console.error(`Internal href is not in registry/link contract in ${file}: ${href}`); failed = true; }
  }
}

if (failed) process.exit(1);
console.log('validate-links: OK');
