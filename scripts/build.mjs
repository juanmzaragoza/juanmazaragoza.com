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
const GA4_ID = 'G-7ZJFFTN5W2';
const OG_DEFAULT = '/images/og-preview.jpg';
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));
const projects = readJson('data/projects.json');
const projectsES = readJson('data/projects-es.json');
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

function projectCard(p, isES = false) {
  const tags = p.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const status = p.status === 'running' ? '<span class="tag running">● Running</span>' : '';
  const cardImg = p.cardImage || p.hero;
  const subtitle = isES ? projectsES[p.slug] : p.subtitle;
  const workPath = isES ? '/es/work/' : '/work/';
  return `<a class="project-card fade-in" href="${workPath}${p.slug}/" data-tags="${esc(p.tags.join('|').toLowerCase())}" data-status="${p.status}">
      ${imgTag(cardImg, p.title, { cls: 'project-card-img' })}
      <div class="project-card-tags">${status}${tags}</div>
      <h3 class="project-card-title">${esc(p.title)}</h3>
      <p class="project-card-desc">${esc(subtitle)}</p>
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

const breadcrumb = (items) => {
  const isES = items.some(([, url]) => url.startsWith('/es/'));
  const translate = (label) => {
    if (!isES) return label;
    const map = { 'Home': 'Inicio', 'Work': 'Trabajos', 'Services': 'Servicios', 'About': 'Acerca de', 'Contact': 'Contacto' };
    return map[label] || label;
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name: translate(name), item: SITE + url })),
  };
};

const NAV = [
  ['/', 'Home', 'home'],
  ['/work/', 'Work', 'work'],
  ['/services/', 'Services', 'services'],
  ['/about/', 'About', 'about'],
];

const NAV_ES = [
  ['/es/', 'Inicio', 'home'],
  ['/es/work/', 'Trabajos', 'work'],
  ['/es/services/', 'Servicios', 'services'],
  ['/es/about/', 'Acerca de', 'about'],
];

function layout({ urlPath, title, description, body, active, jsonLd = [], ogType = 'website', ogImage = OG_DEFAULT, noindex = false, lang = 'en', hreflangs = [] }) {
  const canonical = SITE + urlPath;
  const isES = urlPath.startsWith('/es/');
  const actualLang = lang || (isES ? 'es' : 'en');

  // Generate language links for nav
  let langLink = '';
  if (isES) {
    const enUrl = urlPath.slice(3);
    langLink = `<a href="${enUrl}" class="nav-lang">EN</a>`;
  } else {
    const esUrl = '/es' + (urlPath === '/' ? '/' : urlPath);
    langLink = `<a href="${esUrl}" class="nav-lang">ES</a>`;
  }

  // Use Spanish nav for Spanish pages
  const navLinks = isES ? NAV_ES : NAV;
  const nav = navLinks.map(([href, label, key]) =>
    `<a href="${href}"${key === active ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('\n    ');
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  const heroPreload = urlPath === '/' || urlPath === '/es/' ? '<link rel="preload" as="image" href="/images/img_3062-Yan6xja2xjijrwNj.webp" type="image/webp">' : '';
  const hreflangtags = hreflangs.map(([lang, url]) => `<link rel="alternate" hreflang="${lang}" href="${SITE}${url}">`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="${actualLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
  ${hreflangtags}
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}');
  </script>
</head>
<body>

<nav>
  <a class="nav-logo" href="/" aria-label="Juan Manuel Zaragoza — Home"><img src="/images/favicon.png" alt="JMZ" width="64" height="64"></a>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-links">
    ${nav}
    <a href="${isES ? '/es/contact/' : '/contact/'}" class="nav-cta${active === 'contact' ? ' active' : ''}">${isES ? 'Contacto' : 'Contact'}</a>
    ${langLink}
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
  aboutImg: imgTag('images/juan-manuel-portrait-new.webp', 'Portrait of Juan Manuel Zaragoza', { lazy: false }),
  featured: fallback.map(p => projectCard(p, false)).join('\n'),
  grid: projects.map(p => projectCard(p, false)).join('\n'),
};

const commonVarsES = {
  calendly: CALENDLY,
  email: EMAIL,
  projectCount: String(projects.length),
  heroImg: imgTag('images/img_3062-Yan6xja2xjijrwNj.jpg', 'Juan Manuel Zaragoza, ingeniero full-stack', { priority: true, lazy: false }),
  aboutImg: imgTag('images/juan-manuel-portrait-new.webp', 'Retrato de Juan Manuel Zaragoza', { lazy: false }),
  featured: fallback.map(p => projectCard(p, true)).join('\n'),
  grid: projects.map(p => projectCard(p, true)).join('\n'),
};

// Map pages to their Spanish equivalents for hreflang tags
const pageMap = {
  '/': '/es/',
  '/about/': '/es/about/',
  '/services/': '/es/services/',
  '/contact/': '/es/contact/',
  '/work/': '/es/work/',
  '/services/fractional-cto/': '/es/services/cto-fraccionado/',
  '/services/project-rescue/': '/es/services/rescate-proyectos/',
  '/services/technical-audit/': '/es/services/auditoria-tecnica/',
  '/services/qa-automation/': '/es/services/automatizacion-qa/',
};

const esMap = {
  '/es/': '/',
  '/es/about/': '/about/',
  '/es/services/': '/services/',
  '/es/contact/': '/contact/',
  '/es/work/': '/work/',
  '/es/services/cto-fraccionado/': '/services/fractional-cto/',
  '/es/services/rescate-proyectos/': '/services/project-rescue/',
  '/es/services/auditoria-tecnica/': '/services/technical-audit/',
  '/es/services/automatizacion-qa/': '/services/qa-automation/',
};

function getHreflangs(urlPath) {
  const hreflangs = [];

  if (urlPath in pageMap) {
    hreflangs.push(['es', pageMap[urlPath]]);
  } else if (urlPath in esMap) {
    hreflangs.push(['en', esMap[urlPath]]);
  }

  return hreflangs;
}

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
  const isES = page.path.startsWith('/es/');
  const pageLang = isES ? 'es' : 'en';

  if (key === 'home' || key === 'homeES') {
    const inLanguage = isES ? 'es' : 'en';
    jsonLd.push({ '@context': 'https://schema.org', '@graph': [PERSON, {
      '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}${page.path}`, name: 'Juan Manuel Zaragoza',
      inLanguage, publisher: { '@id': `${SITE}/#person` } }] });
  } else if (key === 'about' || key === 'aboutES') {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE}${page.path}`, mainEntity: PERSON });
  } else if (key === 'serviceRescue') {
    jsonLd.push(breadcrumb([['Home', '/'], ['Services', '/services/'], [page.crumb, page.path]]));
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'Service', name: 'Software Project Rescue',
      description: page.description, provider: { '@id': `${SITE}/#person` }, areaServed: ['US', 'ES', 'MX', 'CO', 'PE', 'CL', 'AR', 'EC'],
      url: SITE + page.path });
  } else if (key === 'serviceAudit') {
    jsonLd.push(breadcrumb([['Home', '/'], ['Services', '/services/'], [page.crumb, page.path]]));
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'Service', name: 'Technical Debt Audit',
      description: page.description, provider: { '@id': `${SITE}/#person` }, areaServed: ['US', 'ES', 'MX', 'CO', 'PE', 'CL', 'AR', 'EC'],
      url: SITE + page.path });
  } else if (key === 'serviceQA') {
    jsonLd.push(breadcrumb([['Home', '/'], ['Services', '/services/'], [page.crumb, page.path]]));
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'Service', name: 'QA Automation for Laravel',
      description: page.description, provider: { '@id': `${SITE}/#person` }, areaServed: ['US', 'ES', 'MX', 'CO', 'PE', 'CL', 'AR', 'EC'],
      url: SITE + page.path });
  } else if (key !== 'notFound') {
    const isES = page.path.startsWith('/es/');
    const homeLabel = isES ? 'Inicio' : 'Home';
    const homePath = isES ? '/es/' : '/';
    const servicesLabel = isES ? 'Servicios' : 'Services';
    const servicesPath = isES ? '/es/services/' : '/services/';

    if (page.path.includes('/services/')) {
      jsonLd.push(breadcrumb([[homeLabel, homePath], [servicesLabel, servicesPath], [page.crumb, page.path]]));
    } else {
      jsonLd.push(breadcrumb([[homeLabel, homePath], [page.crumb, page.path]]));
    }
  }
  const vars = isES ? commonVarsES : commonVars;
  let body = fill(read(`src/${page.src}`), vars);

  // Rewrite internal links in Spanish pages
  if (isES) {
    body = body
      .replace(/href="\/([^e\/])/g, 'href="/es/$1')
      .replace(/href="\/about\//g, 'href="/es/about/')
      .replace(/href="\/services\//g, 'href="/es/services/')
      .replace(/href="\/contact\//g, 'href="/es/contact/')
      .replace(/href="\/work\//g, 'href="/es/work/');
  }

  const hreflangs = getHreflangs(page.path);
  write(page.path, layout({ urlPath: page.path, title: page.title, description: page.description, body, active: key, jsonLd, noindex: key === 'notFound', lang: pageLang, hreflangs }), { sitemap: key !== 'notFound' });
}

// Service mappings for internal linking
const serviceLinks = {
  'real-estate-listing-platform-listing-los-cabos': { name: 'Software Project Rescue', path: '/services/software-project-rescue/' },
  'qa-automation-for-laravel': { name: 'QA Automation for Laravel', path: '/services/qa-automation-laravel/' },
  'performance-evaluation-platform-for-a-public-organization': { name: 'Technical Debt Audit', path: '/services/technical-debt-audit/' },
};

// Case study pages
for (const p of projects) {
  const urlPath = `/work/${p.slug}/`;
  const statusLabel = p.status === 'running' ? '● Running' : '✓ Completed';
  const serviceLink = serviceLinks[p.slug] ? `<div class="section"><div class="section-label">Service</div><h2 class="section-title">Related Service</h2><p class="contact-intro">This case study demonstrates our expertise in <a href="${serviceLinks[p.slug].path}">${serviceLinks[p.slug].name}</a>.</p></div>` : '';
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
  </div>
  ${serviceLink}`;

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

  // Use OG image if it exists, otherwise fall back to hero
  const ogImagePath = `/images/og/${p.slug}.jpg`;
  const ogImageExists = fs.existsSync(path.join(ROOT, 'images/og', `${p.slug}.jpg`));
  const ogImage = ogImageExists ? ogImagePath : img(p.hero).src;

  write(urlPath, layout({ urlPath, title: seoTitle(p), description: pageDescription, body, active: 'work', jsonLd, ogType: 'article', ogImage }));
}

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${outputs.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Built ${outputs.length} indexable pages + 404.html`);
