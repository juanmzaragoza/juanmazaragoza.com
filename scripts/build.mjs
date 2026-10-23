// Static site generator for juanmazaragoza.com.
// Uses only Node built-ins. Run with: node scripts/build.mjs
// Reads src/*.html (page bodies) and data/*.json, writes HTML to the repo root,
// so GitHub Pages can keep serving `main` as-is.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://juanmazaragoza.com';
const CALENDLY = 'https://calendly.com/juanmanuelzaragoza/30min';
const EMAIL = 'hola@juanmazaragoza.com';
const OG_DEFAULT = '/images/og-preview.jpg';
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));
const projects = readJson('data/projects.json');
const pages = readJson('data/pages.json');
const imageSizes = fs.existsSync(path.join(ROOT, 'data/images.json')) ? readJson('data/images.json') : {};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Prefer the optimized .webp version of an image when it exists.
function img(src) {
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
  const chosen = fs.existsSync(path.join(ROOT, webp)) ? webp : src;
  return { src: '/' + chosen, size: imageSizes[chosen] };
}

function imgTag(src, alt, { lazy = true, cls = '', priority = false } = {}) {
  const { src: s, size } = img(src);
  const attrs = [
    cls && `class="${cls}"`,
    `src="${s}"`,
    `alt="${esc(alt)}"`,
    size && `width="${size[0]}" height="${size[1]}"`,
    lazy && !priority && 'loading="lazy"',
    'decoding="async"',
    priority && 'fetchpriority="high"',
  ].filter(Boolean);
  return `<img ${attrs.join(' ')}>`;
}

// Short label for a project (text before the em dash or colon).
const shortName = (p) => p.title.split(/ — |: /).pop();

// Builds a readable alt text from the project and the screenshot file name.
function galleryAlt(p, file, i) {
  let name = path.basename(file).replace(/\.[a-z]+$/i, '')
    .replace(/-[A-Za-z0-9]{16}$/, '')               // hosting hash suffix
    .replace(/\d{4}-\d{2}-\d{2}[-_ ]?\d{2}[-_]\d{2}[-_]\d{2}/g, '') // timestamps
    .replace(/\d{3,4}x\d{3,4}/g, '')
    .replace(/^(screencapture|screenshot-from|screenshot|whatsapp-image|image|img)[-_]?/i, '')
    .replace(/(staging|hml|qa|vercel-app|web-app|gob-ar|localhost-\d+)/g, ' ')
    .replace(/[-_.]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!name || /^[\d\s]+$/.test(name) || name.length < 4) name = `screen ${i + 1}`;
  return `${p.title} — ${name}`;
}

function seoTitle(p) {
  if (p.seoTitle) return p.seoTitle;
  const t = `${p.title} — Case Study`;
  return t.length <= 60 ? t : p.title;
}

function truncate(s, n = 155) {
  return s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…';
}

function relatedProjects(p, n = 4) {
  return projects
    .filter((q) => q.slug !== p.slug)
    .map((q) => ({ q, score: q.tags.filter((t) => p.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.q);
}

function projectCard(p) {
  const tags = p.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const status = p.status === 'running' ? '<span class="tag running">● Running</span>' : '';
  return `<a class="project-card fade-in" href="/work/${p.slug}/" data-tags="${esc(p.tags.join('|').toLowerCase())}" data-status="${p.status}">
      ${imgTag(p.hero, p.title, { cls: 'project-card-img' })}
      <div class="project-card-tags">${status}${tags}</div>
      <h3 class="project-card-title">${esc(p.title)}</h3>
      <p class="project-card-desc">${esc(p.subtitle)}</p>
      <div class="project-card-footer">
        <span class="project-card-date">${esc(p.date)}</span>
        <span class="project-card-arrow">↗</span>
      </div>
    </a>`;
}

function caseContext(p) {
  const parts = [p.client, p.sector, p.country, p.role, p.duration].filter(Boolean);
  if (parts.length === 0) return '';
  return `<div class="case-context"><p>${parts.map((part) => `<span>${esc(part)}</span>`).join(' · ')}</p></div>`;
}

function caseResults(p) {
  if (!p.results || p.results.length === 0) return '';
  return `<div class="case-results">
    <h3>Results</h3>
    <ul>${p.results.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
  </div>`;
}

function caseTestimonial(p) {
  if (!p.testimonial) return '';
  const video = p.testimonial.videoId
    ? `<div class="testimonial-video"><iframe width="100%" height="315" src="https://www.youtube.com/embed/${esc(p.testimonial.videoId)}" title="Testimonial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
    : '';
  return `<div class="testimonial-block">
    <blockquote>
      <p>"${esc(p.testimonial.quote)}"</p>
      <footer>— ${esc(p.testimonial.author)}, ${esc(p.testimonial.role)}</footer>
    </blockquote>
    ${video}
  </div>`;
}

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Juan Manuel Zaragoza',
  alternateName: ['Juanma Zaragoza', 'juanmazaragoza'],
  url: `${SITE}/`,
  image: `${SITE}/images/img_3062-Yan6xja2xjijrwNj.webp`,
  email: `mailto:${EMAIL}`,
  jobTitle: 'Full-Stack Engineer & Fractional CTO',
  description: 'Software engineer with 10+ years building, automating and rescuing web platforms for companies in the US, Spain and Latin America.',
  knowsAbout: ['Custom software development', 'Business process automation', 'Chatbots', 'Software architecture',
    'Technical debt audit', 'Laravel', 'React', 'Next.js', 'NestJS', 'Apache Superset', 'QA automation', 'Google Cloud', 'AWS'],
  knowsLanguage: ['es', 'en', 'pt'],
  nationality: { '@type': 'Country', name: 'Argentina' },
  homeLocation: { '@type': 'Place', name: 'Cuenca, Ecuador' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Buenos Aires', url: 'https://www.uba.ar/' },
  hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Ingeniería en Informática' },
  sameAs: [
    'https://www.linkedin.com/in/juanmzaragoza/',
    'https://github.com/juanmzaragoza',
    'https://www.upwork.com/freelancers/~018d17cfb4fda29566',
    'https://www.workana.com/freelancer/aaa56389f5311fb379960f111fa97847',
  ],
};

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url })),
});

const NAV = [
  ['/', 'Home', 'home'],
  ['/work/', 'Work', 'work'],
  ['/services/', 'Services', 'services'],
  ['/about/', 'About', 'about'],
];

function layout({ urlPath, title, description, body, active, jsonLd = [], ogType = 'website', ogImage = OG_DEFAULT, noindex = false }) {
  const canonical = SITE + urlPath;
  const nav = NAV.map(([href, label, key]) =>
    `<a href="${href}"${key === active ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('\n    ');
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  const heroPreload = urlPath === '/' ? '<link rel="preload" as="image" href="/images/img_3062-Yan6xja2xjijrwNj.webp" type="image/webp">' : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Juan Manuel Zaragoza">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${heroPreload}
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/css/style.css">
  <script>document.documentElement.classList.add('js')</script>
  ${ld}
</head>
<body>

<nav>
  <a class="nav-logo" href="/" aria-label="Juan Manuel Zaragoza — Home"><img src="/images/favicon.png" alt="JMZ" width="32" height="32"></a>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-links">
    ${nav}
    <a href="/contact/" class="nav-cta${active === 'contact' ? ' active' : ''}">Contact</a>
  </div>
</nav>

<main class="page active">
${body}
</main>

<footer>
  <div class="footer-logo">JMZ<span>.</span></div>
  <div class="footer-copy">© ${new Date().getFullYear()} Juan Manuel Zaragoza · Cuenca, Ecuador · Remote worldwide</div>
  <div class="footer-links">
    <a href="/work/">Work</a>
    <a href="/services/">Services</a>
    <a href="/about/">About</a>
    <a href="/contact/">Contact</a>
  </div>
</footer>

<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

// Replaces {{key}} placeholders in a source file.
function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`Missing template variable: ${k}`);
    return vars[k];
  });
}

// Validate projects
const seoTitles = new Set();
const seoDescriptions = new Set();
for (const p of projects) {
  if (p.seoTitle && p.seoTitle.length > 60) throw new Error(`Project "${p.slug}": seoTitle exceeds 60 chars (${p.seoTitle.length})`);
  if (p.seoDescription && p.seoDescription.length > 160) throw new Error(`Project "${p.slug}": seoDescription exceeds 160 chars (${p.seoDescription.length})`);
  if (p.seoTitle && seoTitles.has(p.seoTitle)) throw new Error(`Duplicate seoTitle: "${p.seoTitle}"`);
  if (p.seoDescription && seoDescriptions.has(p.seoDescription)) throw new Error(`Duplicate seoDescription in project "${p.slug}"`);
  if (p.seoTitle) seoTitles.add(p.seoTitle);
  if (p.seoDescription) seoDescriptions.add(p.seoDescription);
  // Validate referenced images exist
  if (p.hero && !fs.existsSync(path.join(ROOT, p.hero))) throw new Error(`Project "${p.slug}": hero image missing: ${p.hero}`);
  for (const img of p.gallery || []) {
    if (!fs.existsSync(path.join(ROOT, img))) throw new Error(`Project "${p.slug}": gallery image missing: ${img}`);
  }
}

const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => (a.order || 999) - (b.order || 999)).slice(0, 6);
const fallback = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

const commonVars = {
  calendly: CALENDLY,
  email: EMAIL,
  projectCount: String(projects.length),
  heroImg: imgTag('images/img_3062-Yan6xja2xjijrwNj.jpg', 'Juan Manuel Zaragoza, full-stack engineer', { priority: true, lazy: false }),
  aboutImg: imgTag('images/zyro-image-1-m2WBn69XLECKwk52.png', 'Portrait of Juan Manuel Zaragoza', { lazy: false }),
  featured: fallback.map(projectCard).join('\n'),
  grid: projects.map(projectCard).join('\n'),
};

const outputs = [];
function write(urlPath, html, { sitemap = true } = {}) {
  const file = urlPath.endsWith('/') ? path.join(urlPath, 'index.html') : urlPath;
  const abs = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html);
  if (sitemap) outputs.push(urlPath);
}

// Static pages
for (const [key, page] of Object.entries(pages)) {
  const jsonLd = [];
  if (key === 'home') {
    jsonLd.push({ '@context': 'https://schema.org', '@graph': [PERSON, {
      '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Juan Manuel Zaragoza',
      inLanguage: 'en', publisher: { '@id': `${SITE}/#person` } }] });
  } else if (key === 'about') {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE}/about/`, mainEntity: PERSON });
  } else if (key !== 'notFound') {
    jsonLd.push(breadcrumb([['Home', '/'], [page.crumb, page.path]]));
  }
  const body = fill(read(`src/${page.src}`), commonVars);
  write(page.path, layout({ urlPath: page.path, title: page.title, description: page.description, body, active: key, jsonLd, noindex: key === 'notFound' }), { sitemap: key !== 'notFound' });
}

// Case study pages
for (const p of projects) {
  const urlPath = `/work/${p.slug}/`;
  const statusLabel = p.status === 'running' ? '● Running' : '✓ Completed';
  const gallery = p.gallery.length
    ? `<div class="detail-gallery">${p.gallery.map((g, i) => imgTag(g, galleryAlt(p, g, i))).join('')}</div>` : '';
  const related = relatedProjects(p).map(projectCard).join('\n');
  const contextBlock = caseContext(p);
  const resultsBlock = caseResults(p);
  const testimonialBlock = caseTestimonial(p);
  const pageDescription = p.seoDescription || truncate(p.subtitle);
  const body = `
  <article>
    <div class="detail-hero">
      <div class="breadcrumb" role="navigation" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/work/">Work</a> / <span>${esc(shortName(p))}</span></div>
      <div class="detail-header">
        <div class="section-label">${esc(p.date)} &nbsp;·&nbsp; <span class="${p.status === 'running' ? 'tag running' : ''}">${statusLabel}</span></div>
        <h1 class="detail-title">${esc(p.title)}</h1>
        <p class="detail-subtitle">${esc(p.subtitle)}</p>
        <div class="detail-meta">
          ${p.tags.map((t) => `<div class="detail-meta-item"><span class="label">Tech</span><span class="value">${esc(t)}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="detail-hero-img">${imgTag(p.hero, p.title, { priority: true, lazy: false })}</div>
    ${contextBlock}
    ${resultsBlock}
    <div class="detail-body">${p.body}</div>
    ${testimonialBlock}
    ${gallery}
  </article>
  <div class="section cta-block">
    <div class="section-label">Similar challenge?</div>
    <h2 class="section-title">Let's talk about your system.</h2>
    <p class="contact-intro">Book a free 30-minute call. I'll review your situation and tell you honestly what I'd do.</p>
    <div class="hero-actions">
      <a href="${CALENDLY}" class="btn-primary" target="_blank" rel="noopener">Book a 30-min call ↗</a>
      <a href="mailto:${EMAIL}" class="btn-ghost">${EMAIL}</a>
    </div>
  </div>
  <div class="section">
    <div class="section-header">
      <div>
        <div class="section-label">Related work</div>
        <h2 class="section-title">More case studies</h2>
      </div>
      <a href="/work/" class="section-link">View all ${projects.length} projects →</a>
    </div>
    <div class="projects-featured">${related}</div>
  </div>`;

  const jsonLd = [breadcrumb([['Home', '/'], ['Work', '/work/'], [p.title, urlPath]])];

  // Add CreativeWork JSON-LD
  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: pageDescription,
    url: SITE + urlPath,
    dateCreated: p.date,
    keywords: p.tags.join(', '),
    creator: { '@id': SITE + '/#person' }
  };
  if (p.client) creativeWork.about = p.client;
  jsonLd.push(creativeWork);

  write(urlPath, layout({ urlPath, title: seoTitle(p), description: pageDescription, body, active: 'work', jsonLd, ogType: 'article', ogImage: img(p.hero).src }));
}

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${outputs.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Built ${outputs.length} indexable pages + 404.html`);
