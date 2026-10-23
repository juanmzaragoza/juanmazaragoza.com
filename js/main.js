// Progressive enhancement only: every page is fully readable without JS.

// ─── Scrolled nav ─────────────────────────────────────────────────────────────
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile menu ──────────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// ─── Portfolio filters (/work/) ───────────────────────────────────────────────
const filters = document.querySelector('.portfolio-filters');
if (filters) {
  filters.hidden = false;
  const cards = document.querySelectorAll('#all-projects-grid .project-card');
  filters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all'
          || (f === 'running' ? card.dataset.status === 'running' : card.dataset.tags.includes(f));
        card.hidden = !show;
      });
    });
  });
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(q => {
  q.setAttribute('tabindex', '0');
  const toggle = () => q.parentElement.classList.toggle('open');
  q.addEventListener('click', toggle);
  q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

// ─── YouTube facade: load the player only on click ────────────────────────────
document.querySelectorAll('.yt-facade').forEach(btn => {
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;
    iframe.title = btn.getAttribute('aria-label');
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    const frame = document.createElement('div');
    frame.className = 'yt-frame';
    frame.appendChild(iframe);
    btn.replaceWith(frame);
  });
});

// ─── Fade-in observer ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
