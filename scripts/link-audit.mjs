import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['src', 'scripts', 'node_modules', '.git', 'data']);

function normDir(rel) {
  if (!rel || rel === '.') return '/';
  return `/${rel.replace(/\\/g, '/')}/`;
}

function collectPages() {
  const pages = new Set();
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (SKIP_DIRS.has(ent.name) && dir === ROOT) continue;
        walk(p);
      } else if (ent.name === 'index.html') {
        pages.add(normDir(path.relative(ROOT, path.dirname(p))));
      } else if (ent.name === '404.html' && dir === ROOT) {
        pages.add('/404.html');
      }
    }
  }
  walk(ROOT);
  return pages;
}

function collectBuiltHtml() {
  const files = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (SKIP_DIRS.has(ent.name) && dir === ROOT) continue;
        walk(p);
      } else if (ent.name.endsWith('.html') && !p.includes(`${path.sep}src${path.sep}`)) {
        files.push(p);
      }
    }
  }
  walk(ROOT);
  return files;
}

function resolveTarget(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  const [pathname] = href.split('#');
  if (pathname.startsWith('/images/') || pathname.startsWith('/css/')) return null;
  if (pathname.endsWith('.pdf')) {
    return fs.existsSync(path.join(ROOT, pathname.slice(1))) ? pathname : '__broken__';
  }
  if (pathname.endsWith('.html')) return pages.has(pathname) ? pathname : '__broken__';
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return pages.has(withSlash) ? withSlash : '__broken__';
}

const pages = collectPages();
const htmlFiles = collectBuiltHtml();
const hrefRe = /href="(\/[^"#?]*)/g;
const broken = new Map();
const inbound = new Map();
for (const p of pages) inbound.set(p, 0);

for (const file of htmlFiles) {
  const from = file.endsWith('404.html')
    ? '/404.html'
    : normDir(path.relative(ROOT, path.dirname(file)));
  const html = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = hrefRe.exec(html))) {
    const raw = m[1];
    const resolved = resolveTarget(raw);
    if (resolved === '__broken__') {
      if (!broken.has(raw)) broken.set(raw, new Set());
      broken.get(raw).add(from);
    } else if (resolved && resolved !== from) {
      inbound.set(resolved, (inbound.get(resolved) || 0) + 1);
    }
  }
}

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const smUrls = [...sitemap.matchAll(/<loc>https:\/\/juanmazaragoza\.com([^<]+)<\/loc>/g)].map((x) => x[1]);

const orphans = [...pages]
  .filter((p) => p !== '/404.html' && (inbound.get(p) || 0) === 0)
  .sort();

const notInSitemap = [...pages]
  .filter((p) => p !== '/404.html' && !smUrls.includes(p))
  .sort();

console.log('PAGES', pages.size);
console.log('\n## BROKEN (href sin página)\n');
for (const [url, froms] of [...broken.entries()].sort()) {
  console.log(url);
  console.log(`  desde: ${[...froms].sort().join(', ')}`);
}
console.log(`\nTotal: ${broken.size}`);

console.log('\n## ORFANAS (0 enlaces internos entrantes en HTML generado)\n');
console.log('Nota: nav/footer no cuentan si solo están en layout; home/contact suelen tener pocos inbounds.\n');
for (const p of orphans) console.log(p);
console.log(`\nTotal: ${orphans.length}`);

console.log('\n## EN DISCO pero NO en sitemap\n');
for (const p of notInSitemap) console.log(p);

console.log('\n## EN sitemap pero SIN archivo\n');
for (const u of smUrls.filter((u) => !pages.has(u))) console.log(u);
