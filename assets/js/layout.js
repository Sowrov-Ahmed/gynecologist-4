/* Shared layout: glass header, full-screen menu, footer, motion + parallax engine. Owned by the Team Lead. DO NOT EDIT. */
(function () {
  const S = window.SITE, UI = window.UI, C = UI.c, ic = UI.icon, d = S.doctor;
  const page = document.body.dataset.page || '';
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const hoverOk = !!(window.matchMedia && window.matchMedia('(hover: hover)').matches);
  let user = null;
  try { user = JSON.parse(localStorage.getItem('sh_user') || 'null'); } catch (e) { user = null; }
  const first = user && user.name ? user.name.split(' ')[0] : '';
  const initials = user && user.name ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '';

  /* horizontal overflow guard: clip never creates a scroll container */
  ['overflow-x-hidden', 'overflow-x-clip'].forEach(c => { document.documentElement.classList.add(c); document.body.classList.add(c); });
  document.body.classList.add('max-w-full', 'bg-night');

  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.className = 'fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-mint to-seafoam';
  document.body.prepend(bar);

  /* ---------- header ---------- */
  const logo = `<a href="index.html" class="flex items-center gap-3" aria-label="${d.name} home">
    <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-mint to-seafoam font-heading text-base font-bold text-pine shadow-mint">${d.initials}</span>
    <span class="leading-tight"><span class="block font-heading text-base font-semibold text-white">${d.name}</span><span class="block text-[10px] font-semibold uppercase tracking-[0.2em] text-mint">${d.role}</span></span></a>`;

  const links = S.nav.map(n => {
    const on = page === n.key;
    return `<li><a href="${n.href}" ${on ? 'aria-current="page"' : ''} class="relative block px-4 py-2 text-sm font-semibold transition hover:text-white after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gradient-to-r after:from-mint after:to-seafoam after:transition after:duration-300 ${on ? 'text-white after:scale-x-100' : 'text-mist after:scale-x-0 hover:after:scale-x-100'}">${n.label}</a></li>`;
  }).join('');

  const authDesktop = user
    ? `<span class="hidden items-center gap-2 text-sm font-semibold text-white md:inline-flex"><span class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-mint to-seafoam text-xs font-bold text-pine">${initials}</span>${first}<button type="button" data-signout class="ml-1 text-xs font-semibold text-mint underline underline-offset-2">Sign out</button></span>`
    : `<a href="auth.html" class="hidden items-center gap-1.5 px-3 py-2 text-sm font-semibold text-mist transition hover:text-white md:inline-flex ${page === 'auth' ? '!text-white' : ''}">${ic('user', 'h-4 w-4')}Sign in</a>`;

  const menuLinks = S.nav.map((n, i) => `<a href="${n.href}" ${page === n.key ? 'aria-current="page"' : ''} class="flex items-baseline gap-4 border-b border-white/10 py-4 font-heading text-3xl font-semibold transition hover:text-mint ${page === n.key ? 'text-mint' : 'text-white'}"><span class="text-xs font-bold tracking-widest text-seafoam">${String(i + 1).padStart(2, '0')}</span>${n.label}</a>`).join('');

  const header = `<header id="siteHeader" class="sticky top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-xl transition duration-300">
    <div class="${C.container} flex h-[72px] items-center justify-between gap-4">
      ${logo}
      <nav aria-label="Primary" class="hidden lg:block"><ul class="flex items-center gap-1">${links}</ul></nav>
      <div class="flex items-center gap-2">
        <a href="${d.phoneHref}" class="hidden items-center gap-2 px-3 py-2 text-sm font-semibold text-white xl:inline-flex">${ic('phone', 'h-4 w-4 text-mint')}${d.phone}</a>
        ${authDesktop}
        <a href="appointment.html" class="${C.btnPrimary} hidden !px-5 !py-2.5 sm:inline-flex">${ic('calendar', 'h-4 w-4')}Book Appointment</a>
        <button type="button" id="menuBtn" aria-expanded="false" aria-controls="fullMenu" aria-label="Open menu" class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"><span data-open>${ic('menu', 'h-5 w-5')}</span><span data-close class="hidden">${ic('x', 'h-5 w-5')}</span></button>
      </div></div>
    <div class="h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" aria-hidden="true"></div></header>
    <div id="fullMenu" role="dialog" aria-label="Menu" class="invisible fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-night/95 px-6 pb-8 pt-24 opacity-0 backdrop-blur-2xl transition-all duration-300 lg:hidden">
      <nav aria-label="Mobile">${menuLinks}${user ? '' : `<a href="auth.html" class="flex items-baseline gap-4 border-b border-white/10 py-4 font-heading text-3xl font-semibold text-white transition hover:text-mint"><span class="text-xs font-bold tracking-widest text-seafoam">06</span>Sign in</a>`}</nav>
      <a href="appointment.html" class="${C.btnPrimary} mt-8 w-full">${ic('calendar', 'h-4 w-4')}Book Appointment</a>
      <div class="mt-auto pt-8 text-sm text-mist"><p class="font-semibold text-white">${d.phone}</p><p class="mt-1">${d.email}</p>${user ? `<button type="button" data-signout class="mt-4 text-sm font-semibold text-mint underline underline-offset-4">Sign out (${first})</button>` : ''}</div>
    </div>`;

  /* ---------- footer ---------- */
  const noCta = document.body.hasAttribute('data-no-cta');
  const cta = noCta ? '' : `<div class="${C.container} relative -mb-14 pt-16 sm:-mb-16"><div data-reveal="up" class="${C.ring}"><div class="flex flex-col items-start justify-between gap-6 rounded-[15px] bg-gradient-to-r from-forest to-night p-7 sm:p-9 md:flex-row md:items-center">
      <div><h2 class="font-heading text-2xl font-bold text-white sm:text-3xl">Book your consultation with <span class="${C.gradientText}">${d.name}</span></h2><p class="mt-2 text-mist">Chambers in Banani, Mohammadpur and Chattogram. New patients welcome.</p></div>
      <div class="flex flex-wrap gap-3"><a href="appointment.html" class="${C.btnPrimary}">${ic('calendar', 'h-4 w-4')}Book Appointment</a><a href="${d.phoneHref}" class="${C.btnGlass}">${ic('phone', 'h-4 w-4')}${d.phone}</a></div></div></div></div>`;

  const social = Object.entries(d.social).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}" class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-mist transition duration-300 hover:border-mint hover:bg-mint hover:text-pine">${ic(k, 'h-4 w-4')}</a>`).join('');
  const svc = S.services.map(s => `<li><a href="${UI.url.service(s.slug)}" class="flex items-center gap-2 text-sm text-mist transition hover:text-mint">${ic('chevron-right', 'h-3.5 w-3.5 text-seafoam')}${s.title}</a></li>`).join('');
  const hours = S.chambers.map(c => `<li class="border-b border-white/10 pb-3"><a href="${UI.url.chamber(c.id)}" class="block text-sm font-semibold text-white transition hover:text-mint">${c.name}</a><span class="block text-xs text-mist/80">${c.area}, ${c.city}</span><span class="mt-1 block text-xs text-mist">${c.days.join(', ')} · ${c.time}</span></li>`).join('');
  const quick = [['About', 'about.html'], ['Chambers', 'chambers.html'], ['Blog', 'blog.html'], ['Testimonials', 'testimonials.html'], ['FAQs', 'faqs.html'], ['Appointment', 'appointment.html']].map(([l, h]) => `<li><a href="${h}" class="text-sm text-mist transition hover:text-mint">${l}</a></li>`).join('');

  const footer = `<footer class="relative bg-night-deep text-mist">${cta}
    <div class="relative overflow-hidden ${noCta ? 'pt-14' : 'pt-28 sm:pt-32'}">
      <div class="h-px w-full bg-gradient-to-r from-transparent via-mint/50 to-transparent" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-mint/10 blur-3xl animate-orb" aria-hidden="true"></div>
      <div class="${C.container} relative grid gap-10 pb-12 pt-10 sm:grid-cols-2 lg:grid-cols-12">
        <div class="lg:col-span-4">${logo}
          <p class="mt-5 max-w-xs text-sm leading-relaxed">${d.tagline}</p>
          <p class="mt-4 text-xs text-mist/70">${d.degrees} · BMDC Reg. ${d.bmdc}</p>
          <div class="mt-5 flex gap-2">${social}</div></div>
        <div class="lg:col-span-3"><h3 class="font-heading text-sm font-semibold uppercase tracking-widest text-white">Services</h3><ul class="mt-4 space-y-2.5">${svc}</ul></div>
        <div class="lg:col-span-3"><h3 class="font-heading text-sm font-semibold uppercase tracking-widest text-white">Chamber hours</h3><ul class="mt-4 space-y-3">${hours}</ul></div>
        <div class="lg:col-span-2"><h3 class="font-heading text-sm font-semibold uppercase tracking-widest text-white">Links</h3><ul class="mt-4 space-y-2.5">${quick}</ul></div>
      </div>
      <div class="border-t border-white/10"><div class="${C.container} flex flex-col items-center justify-between gap-3 py-5 text-xs text-mist/70 sm:flex-row">
        <p>© ${new Date().getFullYear()} ${d.name}. All rights reserved.</p>
        <div class="flex gap-5"><a href="terms.html" class="transition hover:text-mint">Terms &amp; Conditions</a><a href="privacy.html" class="transition hover:text-mint">Privacy Policy</a></div></div></div>
    </div></footer>`;

  const hh = document.getElementById('site-header'), fh = document.getElementById('site-footer');
  if (hh) hh.outerHTML = header;
  if (fh) fh.outerHTML = footer;

  const top = document.createElement('button');
  top.type = 'button';
  top.setAttribute('aria-label', 'Back to top');
  top.className = 'pointer-events-none fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 translate-y-4 items-center justify-center rounded-lg bg-gradient-to-br from-mint to-seafoam text-pine opacity-0 shadow-mint transition duration-300 hover:-translate-y-1';
  top.innerHTML = ic('arrow-up', 'h-5 w-5');
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  document.body.appendChild(top);

  /* ---------- interactions ---------- */
  const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('fullMenu'), hdr = document.getElementById('siteHeader');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('invisible', !open); menu.classList.toggle('opacity-0', !open);
    document.body.classList.toggle('overflow-hidden', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('[data-open]').classList.toggle('hidden', open);
    menuBtn.querySelector('[data-close]').classList.toggle('hidden', !open);
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-signout]')) { localStorage.removeItem('sh_user'); UI.toast('You have been signed out.'); setTimeout(() => location.reload(), 900); }
  });
  /* ---------- motion + parallax engine ---------- */
  const HIDE = { up: 'opacity-0 translate-y-8', down: 'opacity-0 -translate-y-8', left: 'opacity-0 -translate-x-10', right: 'opacity-0 translate-x-10', zoom: 'opacity-0 scale-95', fade: 'opacity-0' };
  const BASE = ['transition-all', 'duration-700', 'ease-out'];
  const SHOWN = ['opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100'];

  function runCounter(el) {
    const target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '', t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function show(el) {
    const kind = el.dataset.reveal;
    if (!kind) return;
    (HIDE[kind] || HIDE.up).split(' ').forEach(c => el.classList.remove(c));
    SHOWN.forEach(c => el.classList.add(c));
    setTimeout(() => { BASE.concat(SHOWN).forEach(c => el.classList.remove(c)); el.style.transitionDelay = ''; }, 900 + (+el.dataset.delay || 0));
  }

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      if (en.target.dataset.count) runCounter(en.target);
      show(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  const par = [];
  function refresh(root) {
    root = root || document;
    root.querySelectorAll('.animate-marquee').forEach(el => { if (el.parentElement) el.parentElement.classList.add('overflow-hidden'); });
    root.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
      el.dataset.rv = '1';
      if (reduce || !io) return;
      el.classList.add(...BASE, ...(HIDE[el.dataset.reveal] || HIDE.up).split(' '));
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
      io.observe(el);
    });
    root.querySelectorAll('[data-count]:not([data-ct])').forEach(el => {
      el.dataset.ct = '1';
      if (reduce || !io) { el.textContent = (+el.dataset.count).toLocaleString('en-US', { minimumFractionDigits: +(el.dataset.decimals || 0) }) + (el.dataset.suffix || ''); return; }
      if (!el.dataset.rv) io.observe(el);
    });
    root.querySelectorAll('[data-parallax]:not([data-pl])').forEach(el => { el.dataset.pl = '1'; if (!reduce) par.push(el); });
    /* mouse-depth parallax: scope holds layers; each layer shifts by its factor in px */
    root.querySelectorAll('[data-mouse-scope]:not([data-ms])').forEach(scope => {
      scope.dataset.ms = '1';
      if (reduce || !hoverOk) return;
      const layers = [...scope.querySelectorAll('[data-mouse]')];
      layers.forEach(l => l.classList.add('transition-transform', 'duration-300', 'ease-out'));
      scope.addEventListener('pointermove', e => {
        const r = scope.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach(l => { const f = parseFloat(l.dataset.mouse) || 10; l.style.transform = `translate3d(${(x * f).toFixed(1)}px,${(y * f).toFixed(1)}px,0)`; });
      });
      scope.addEventListener('pointerleave', () => layers.forEach(l => { l.style.transform = ''; }));
    });
    root.querySelectorAll('[data-tilt]:not([data-tl])').forEach(el => {
      el.dataset.tl = '1';
      if (reduce || !hoverOk) return;
      const max = +(el.dataset.tilt || 6);
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;
      if (hdr) { hdr.classList.toggle('bg-night/90', y > 40); hdr.classList.toggle('bg-night/70', y <= 40); }
      const on = y > 600;
      ['pointer-events-none', 'translate-y-4', 'opacity-0'].forEach(c => top.classList.toggle(c, !on));
      par.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > window.innerHeight + 300) return;
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * -(parseFloat(el.dataset.parallax) || 0.1);
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  UI.refresh = refresh;
  refresh(document);
  onScroll();
})();
