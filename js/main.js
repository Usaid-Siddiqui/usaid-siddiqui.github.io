/* ============================================================
   Usaid Siddiqui — Portfolio interactions
   Dependency-free: scroll reveals, nav state, mobile menu.
   Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Current year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Nav hairline on scroll */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    const close = () => { nav.classList.remove('nav--open'); navToggle.setAttribute('aria-expanded', 'false'); };
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target)) close();
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* Scroll reveal (staggered per group) */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 70, 280) : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }
})();
