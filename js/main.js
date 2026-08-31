/* ============================================================
   Usaid Siddiqui — Portfolio interactions
   Dependency-free. IntersectionObserver reveals, nav state,
   pointer-tracked spotlight + card glow. Respects reduced motion.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Current year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Nav: solid background on scroll ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu toggle ---- */
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    const closeMenu = () => {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target)) closeMenu();
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Scroll reveal (staggered per group) ---- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger siblings that share a parent grid/flow.
        const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 80, 320) : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---- Hero spotlight follows pointer ---- */
  const hero = document.getElementById('hero');
  const spotlight = document.getElementById('spotlight');
  if (hero && spotlight && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      spotlight.style.left = (e.clientX - r.left) + 'px';
      spotlight.style.top = (e.clientY - r.top) + 'px';
    });
  }

  /* ---- Project card: radial glow tracks the cursor ---- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.project').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---- Active nav link highlighting ---- */
  const sections = ['work', 'about', 'experience', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = new Map();
  document.querySelectorAll('.nav__links a').forEach((a) => {
    navLinks.set(a.getAttribute('href').slice(1), a);
  });
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = navLinks.get(entry.target.id);
        if (link) link.style.color = entry.isIntersecting ? 'var(--text)' : '';
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => spy.observe(s));
  }
})();
