/* Shared UI helpers and renderers. Owned by the Team Lead. DO NOT EDIT. */
(function () {
  const icons = {
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'calendar-check': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
    'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>'
  };

  icons.minus = '<line x1="5" y1="12" x2="19" y2="12"/>';
  icons['chevron-left'] = '<polyline points="15 18 9 12 15 6"/>';
  icons.grid = '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>';
  icons.layers = '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>';

  const C = {
    container: 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10',
    sectionDark: 'relative overflow-hidden bg-gradient-to-b from-night via-forest/60 to-night py-16 text-white sm:py-20 lg:py-24',
    sectionDeep: 'relative overflow-hidden bg-night py-16 text-white sm:py-20 lg:py-24',
    sectionLight: 'relative overflow-hidden bg-cream py-16 text-pine sm:py-20 lg:py-24',
    diagTop: '-mt-[4vw] [clip-path:polygon(0_4vw,100%_0,100%_100%,0_100%)] pt-[calc(4rem+4vw)] sm:pt-[calc(5rem+4vw)] lg:pt-[calc(6rem+4vw)]',
    glass: 'rounded-2xl border border-white/10 bg-white/[0.06] shadow-glass backdrop-blur-xl',
    glassStrong: 'rounded-2xl border border-white/15 bg-white/10 shadow-glass backdrop-blur-2xl',
    glassMint: 'rounded-2xl border border-mint/25 bg-mint/10 backdrop-blur-xl',
    glassLight: 'rounded-2xl border border-white/80 bg-white/60 shadow-glass-light backdrop-blur-xl',
    glassLightStrong: 'rounded-2xl border border-white bg-white/80 shadow-glass-light backdrop-blur-2xl',
    ring: 'rounded-2xl bg-gradient-to-br from-mint/60 via-white/10 to-seafoam/50 p-px',
    btnPrimary: 'inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-mint to-seafoam px-6 py-3 text-sm font-bold text-pine shadow-mint transition duration-300 hover:-translate-y-0.5 hover:shadow-mint-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40',
    btnGlass: 'inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20',
    btnDark: 'inline-flex items-center justify-center gap-2 rounded-lg bg-night px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-forest focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-night/30',
    btnOutlineLight: 'inline-flex items-center justify-center gap-2 rounded-lg border border-pine/25 px-6 py-3 text-sm font-semibold text-pine transition duration-300 hover:bg-pine hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20',
    eyebrow: 'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-mint',
    eyebrowLight: 'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-seafoam-dark',
    h1: 'font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl',
    h2: 'font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl',
    h2Light: 'font-heading text-3xl font-bold tracking-tight text-pine sm:text-4xl',
    h3: 'font-heading text-lg font-semibold text-white',
    h3Light: 'font-heading text-lg font-semibold text-pine',
    lead: 'text-base leading-relaxed text-mist sm:text-lg',
    leadLight: 'text-base leading-relaxed text-pine/80 sm:text-lg',
    gradientText: 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent',
    gradientTextLight: 'bg-gradient-to-r from-seafoam-dark to-forest bg-clip-text text-transparent',
    input: 'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-mist/60 backdrop-blur-md transition focus:border-mint/60 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-mint/20',
    inputLight: 'w-full rounded-lg border border-pine/15 bg-white/70 px-4 py-3 text-sm text-pine placeholder:text-pine/45 backdrop-blur-md transition focus:border-seafoam focus:bg-white focus:outline-none focus:ring-4 focus:ring-seafoam/20',
    label: 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist',
    labelLight: 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-pine',
    chip: 'inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-mist',
    chipLight: 'inline-flex items-center gap-1.5 rounded-md border border-pine/10 bg-pine/5 px-2.5 py-1 text-xs font-medium text-pine',
    chipActive: 'border-mint bg-mint text-pine',
    iconWrap: 'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-mint/25 to-seafoam/10 text-mint ring-1 ring-mint/30',
    iconWrapLight: 'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine text-mint',
    divider: 'border-t border-white/10',
    dividerLight: 'border-t border-pine/10'
  };

  const SITE = () => window.SITE;
  const money = n => '৳' + Number(n).toLocaleString('en-US');
  const icon = (name, cls = 'h-5 w-5', sw = 1.8) =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
  const stars = (n = 5, cls = 'h-4 w-4') => {
    let s = '';
    for (let i = 1; i <= 5; i++) s += `<svg class="${cls} ${i <= Math.round(n) ? 'text-amber-400' : 'text-slate-400/50'}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${icons.star}</svg>`;
    return `<span class="inline-flex items-center gap-0.5" role="img" aria-label="${n} out of 5 stars">${s}</span>`;
  };
  const formatDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const time12 = hhmm => { const [h, m] = hhmm.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };

  /* Next opening for one chamber: {open, text} e.g. "Tomorrow, 4:00 PM" or "Open now until 10:00 PM". */
  function nextOpening(c, now = new Date()) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mins = now.getHours() * 60 + now.getMinutes();
    const toMin = x => { const [h, m] = x.split(':').map(Number); return h * 60 + m; };
    for (let d = 0; d < 8; d++) {
      const wd = (now.getDay() + d) % 7;
      if (!c.weekdays.includes(wd)) continue;
      const st = toMin(c.start), en = toMin(c.end);
      if (d === 0 && mins >= en) continue;
      if (d === 0 && mins >= st) return { open: true, text: `Open now until ${time12(c.end)}` };
      return { open: false, text: `${d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dayNames[wd]}, ${time12(c.start)}` };
    }
    return { open: false, text: 'See schedule' };
  }

  const url = {
    service: slug => `service-details.html?slug=${slug}`,
    post: slug => `blog-details.html?slug=${slug}`,
    chamber: id => `chambers.html#${id}`,
    appointment: (o = {}) => {
      const q = new URLSearchParams();
      Object.entries(o).forEach(([k, v]) => { if (v) q.set(k, v); });
      const s = q.toString();
      return 'appointment.html' + (s ? '?' + s : '');
    },
    param: name => new URLSearchParams(location.search).get(name)
  };

  const find = {
    service: slug => SITE().services.find(s => s.slug === slug),
    post: slug => SITE().posts.find(p => p.slug === slug),
    chamber: id => SITE().chambers.find(c => c.id === id)
  };

  const validate = {
    phone: v => /^(?:\+?88)?01[3-9]\d{8}$/.test(String(v).replace(/[\s-]/g, '')),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
  };

  function setError(input, msg) {
    if (!input || !input.parentElement) return;
    const box = input.parentElement, light = !!input.closest('.bg-cream');
    let p = box.querySelector('[data-error]');
    if (msg) {
      if (!p) { p = document.createElement('p'); p.dataset.error = '1'; p.setAttribute('role', 'alert'); box.appendChild(p); }
      p.className = `mt-1.5 text-xs font-semibold ${light ? 'text-rose-700' : 'text-rose-300'}`;
      p.textContent = msg;
      input.classList.add('border-rose-500', 'ring-4', 'ring-rose-500/20');
      input.setAttribute('aria-invalid', 'true');
    } else {
      if (p) p.remove();
      input.classList.remove('border-rose-500', 'ring-4', 'ring-rose-500/20');
      input.removeAttribute('aria-invalid');
    }
  }

  function toast(msg, type = 'success') {
    let host = document.getElementById('toastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toastHost';
      host.setAttribute('aria-live', 'polite');
      host.className = 'fixed bottom-5 left-1/2 z-[80] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.className = `flex translate-y-4 items-center gap-3 rounded-xl border ${type === 'error' ? 'border-rose-400/40' : 'border-mint/40'} bg-night/90 p-4 text-sm font-semibold text-white opacity-0 shadow-glass backdrop-blur-xl transition duration-300`;
    el.innerHTML = `<span class="${type === 'error' ? 'text-rose-300' : 'text-mint'}">${icon(type === 'error' ? 'alert' : 'check', 'h-5 w-5')}</span><span>${msg}</span>`;
    host.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('translate-y-4', 'opacity-0')));
    setTimeout(() => { el.classList.add('translate-y-4', 'opacity-0'); setTimeout(() => el.remove(), 350); }, 3800);
  }

  function photo(key, cls = 'h-full w-full object-cover', o = {}) {
    const p = SITE().photos[key];
    return `<img src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" class="${cls} ${p.pos}">`;
  }

  /* Class string for a fixed-attachment parallax background photo (scrolls on touch devices). */
  function bgFixed(key) {
    return `bg-[url('${SITE().photos[key].src}')] bg-cover bg-center bg-scroll md:bg-fixed`;
  }

  /* Live chamber status: open now, or the next opening across all chambers. */
  function todayStatus(now = new Date()) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mins = now.getHours() * 60 + now.getMinutes();
    const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
    let best = null;
    SITE().chambers.forEach(c => {
      for (let d = 0; d < 8; d++) {
        const wd = (now.getDay() + d) % 7;
        if (!c.weekdays.includes(wd)) continue;
        const s = toMin(c.start), e = toMin(c.end);
        if (d === 0 && mins >= s && mins < e) { if (!best || !best.open) best = { open: true, chamber: c, label: 'Open now', until: time12(c.end), when: 0 }; return; }
        if (d === 0 && mins >= e) continue;
        const when = d * 1440 + s;
        if (!best || (!best.open && when < best.when)) best = { open: false, chamber: c, label: d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dayNames[wd], at: time12(c.start), when };
        return;
      }
    });
    best.text = best.open ? `Open now at ${best.chamber.area}, until ${best.until}` : `Next: ${best.label}, ${best.at} at ${best.chamber.area}`;
    return best;
  }

  /* Left-aligned corporate heading with a gradient rule. light:true for cream sections. */
  function sectionHead(o = {}) {
    const center = o.align === 'center', light = !!o.light;
    return `<div data-reveal="up" class="${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}">
      ${o.eyebrow ? `<p class="${light ? C.eyebrowLight : C.eyebrow} ${center ? 'justify-center' : ''}"><span class="h-px w-8 bg-gradient-to-r ${light ? 'from-seafoam-dark' : 'from-mint'} to-transparent"></span>${o.eyebrow}</p>` : ''}
      <h2 class="${o.eyebrow ? 'mt-3' : ''} ${light ? C.h2Light : C.h2}">${o.title || ''}</h2>
      ${o.text ? `<p class="mt-4 ${light ? C.leadLight : C.lead}">${o.text}</p>` : ''}</div>`;
  }

  /* Inner-page banner: dark gradient, drifting glow, grid, photo in a gradient-bordered glass frame. */
  function pageHeader(o = {}) {
    const ph = o.photo ? `<div class="lg:col-span-5"><div class="${C.ring} mx-auto max-w-md lg:mr-0 animate-zoom-in [animation-delay:200ms]">
        <div class="relative aspect-[4/3] overflow-hidden rounded-[15px] bg-gradient-to-br from-forest to-night">${photo(o.photo, o.photo === 'cutout' ? 'h-full w-full object-contain' : 'h-full w-full object-cover', { eager: true })}
          <div class="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-mint/15 to-transparent animate-scan" aria-hidden="true"></div></div></div></div>` : '';
    return `<section class="relative overflow-hidden bg-gradient-to-br from-night-deep via-night to-forest text-white">
      <div class="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-mint/20 blur-3xl animate-orb" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-seafoam/25 blur-3xl animate-orb [animation-delay:-8s]" aria-hidden="true"></div>
      ${window.Art.grid('pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]')}
      <div class="${C.container} relative grid items-center gap-10 pb-[calc(3.5rem+4vw)] pt-14 sm:pb-[calc(5rem+4vw)] sm:pt-20 lg:grid-cols-12">
        <div class="${o.photo ? 'lg:col-span-7' : 'lg:col-span-9'}">
          ${o.eyebrow ? `<p class="${C.eyebrow} animate-fade-up"><span class="h-px w-10 bg-gradient-to-r from-mint to-transparent"></span>${o.eyebrow}</p>` : ''}
          <h1 class="mt-4 ${C.h1} animate-fade-up [animation-delay:120ms]">${o.title || ''}</h1>
          ${o.text ? `<p class="mt-5 max-w-xl ${C.lead} animate-fade-up [animation-delay:240ms]">${o.text}</p>` : ''}
          ${o.actions || ''}</div>${ph}</div></section>`;
  }

  /* ---------- card renderers (dark by default; pass {light:true} on cream sections) ---------- */
  const K = light => light
    ? { card: C.glassLight, head: 'text-pine', body: 'text-pine/80', muted: 'text-pine/60', chip: C.chipLight, line: 'border-pine/10', link: 'text-seafoam-dark', hover: 'hover:border-seafoam/50' }
    : { card: C.glass, head: 'text-white', body: 'text-mist', muted: 'text-mist/70', chip: C.chip, line: 'border-white/10', link: 'text-mint', hover: 'hover:border-mint/40' };

  function serviceCard(s, i = 0, o = {}) {
    const k = K(o.light);
    return `<article data-reveal="up" data-delay="${i * 90}" class="group relative flex h-full flex-col overflow-hidden p-3 ${k.card} ${k.hover} transition duration-300 hover:-translate-y-1.5">
      <div class="relative aspect-[16/9] overflow-hidden rounded-xl">${window.Art.cover(s.art, 'h-full w-full transition duration-700 group-hover:scale-105')}
        <span class="absolute left-3 top-3 rounded-md bg-night/70 px-2 py-1 text-[11px] font-bold tracking-widest text-mint backdrop-blur-md">${String(i + 1).padStart(2, '0')}</span></div>
      <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
        <span class="${o.light ? C.iconWrapLight : C.iconWrap} !h-11 !w-11">${icon(s.icon, 'h-5 w-5')}</span>
        <h3 class="mt-4 font-heading text-lg font-semibold leading-snug ${k.head}">${s.title}</h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed ${k.body}">${s.short}</p>
        <div class="mt-5 flex items-center justify-between border-t ${k.line} pt-4">
          <span class="text-sm font-semibold ${k.head}">${s.fee}</span>
          <a href="${url.service(s.slug)}" aria-label="${s.title} details" class="inline-flex items-center gap-1.5 text-sm font-semibold ${k.link} after:absolute after:inset-0">Details ${icon('arrow-right', 'h-4 w-4 transition duration-300 group-hover:translate-x-1')}</a></div></div></article>`;
  }

  function postCard(p, i = 0, o = {}) {
    const k = K(o.light);
    return `<article data-reveal="up" data-delay="${i * 90}" class="group relative flex h-full flex-col overflow-hidden p-3 ${k.card} ${k.hover} transition duration-300 hover:-translate-y-1.5">
      <div class="aspect-[16/10] overflow-hidden rounded-xl">${window.Art.cover(p.art, 'h-full w-full transition duration-700 group-hover:scale-105')}</div>
      <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div class="flex flex-wrap items-center gap-2 text-xs ${k.muted}"><span class="rounded-md bg-gradient-to-r from-mint to-seafoam px-2 py-0.5 font-bold text-pine">${p.category}</span><span>${formatDate(p.date)}</span><span>${p.readMin} min read</span></div>
        <h3 class="mt-3 font-heading text-base font-semibold leading-snug ${k.head}">${p.title}</h3>
        <p class="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed ${k.body}">${p.excerpt}</p>
        <a href="${url.post(p.slug)}" aria-label="Read: ${p.title}" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${k.link} after:absolute after:inset-0">Read article ${icon('arrow-right', 'h-4 w-4 transition duration-300 group-hover:translate-x-1')}</a></div></article>`;
  }

  function chamberCard(c, i = 0, o = {}) {
    const k = K(o.light);
    const days = c.days.map(d => `<span class="${k.chip}">${d}</span>`).join('');
    const rows = `<p class="mt-4 flex gap-3 text-sm ${k.body}">${icon('pin', `mt-0.5 h-4 w-4 shrink-0 ${k.link}`)}<span>${c.address}</span></p>
      <p class="mt-2 flex gap-3 text-sm ${k.body}">${icon('clock', `mt-0.5 h-4 w-4 shrink-0 ${k.link}`)}<span>${c.time}</span></p>
      <div class="mt-3 flex flex-wrap gap-1.5">${days}</div>
      <div class="mt-4 grid grid-cols-2 divide-x ${o.light ? 'divide-pine/10 border-pine/10' : 'divide-white/10 border-white/10'} rounded-xl border text-center">
        <p class="p-3"><span class="block text-[11px] font-semibold uppercase tracking-wider ${k.muted}">New patient</span><span class="font-heading text-lg font-bold ${k.head}">${money(c.fee.new)}</span></p>
        <p class="p-3"><span class="block text-[11px] font-semibold uppercase tracking-wider ${k.muted}">Follow-up</span><span class="font-heading text-lg font-bold ${k.head}">${money(c.fee.followup)}</span></p></div>`;
    const actions = `<div class="mt-5 flex flex-wrap gap-2"><a href="${url.appointment({ chamber: c.id })}" class="${C.btnPrimary} !px-5 !py-2.5">Book here</a>
      <a href="${c.mapLink}" target="_blank" rel="noopener" class="${o.light ? C.btnOutlineLight : C.btnGlass} !px-5 !py-2.5">${icon('navigation', 'h-4 w-4')}Directions</a></div>`;
    const head = o.compact
      ? `<div class="flex items-center justify-between"><span class="${o.light ? C.iconWrapLight : C.iconWrap}">${icon('building', 'h-6 w-6')}</span><span class="${k.chip}">${c.city}</span></div>`
      : `<div class="relative aspect-[16/10] overflow-hidden rounded-xl">${window.Art.chamber(c.id, 'h-full w-full transition duration-700 group-hover:scale-105')}<span class="absolute bottom-3 left-3 rounded-md bg-night/70 px-2.5 py-1 text-xs font-semibold text-mint backdrop-blur-md">${c.city}</span></div>`;
    return `<article ${o.compact ? '' : `id="${c.id}"`} data-reveal="up" data-delay="${i * 90}" class="group flex h-full scroll-mt-28 flex-col p-3 ${k.card} ${k.hover} transition duration-300 hover:-translate-y-1.5">
      <div class="${o.compact ? 'px-3 pt-3' : ''}">${head}</div>
      <div class="flex flex-1 flex-col px-3 pb-3 pt-4"><h3 class="font-heading text-lg font-semibold leading-snug ${k.head}">${c.name}</h3><p class="text-sm font-semibold ${k.link}">${c.area}</p>${rows}<div class="flex-1"></div>${actions}</div></article>`;
  }

  function testimonialCard(t, i = 0, o = {}) {
    const k = K(o.light);
    return `<figure data-reveal="up" data-delay="${i * 90}" class="relative flex h-full flex-col p-6 ${k.card} ${k.hover} transition duration-300 hover:-translate-y-1">
      <span class="absolute right-5 top-5 ${o.light ? 'text-seafoam/30' : 'text-mint/25'}">${icon('quote', 'h-9 w-9')}</span>
      ${stars(t.rating)}
      <blockquote class="mt-4 flex-1 text-sm leading-relaxed ${k.body} sm:text-base">${t.text}</blockquote>
      <figcaption class="mt-5 flex items-center gap-3 border-t ${k.line} pt-4">
        <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-mint to-seafoam font-heading text-sm font-bold text-pine">${t.initials}</span>
        <span class="leading-tight"><span class="block text-sm font-bold ${k.head}">${t.name}</span><span class="block text-xs ${k.muted}">${t.area} · ${t.service}</span></span></figcaption></figure>`;
  }

  function faqAccordion(el, items, o = {}) {
    if (!el) return;
    const prefix = o.prefix || 'faq', k = K(o.light);
    const list = items || SITE().faqs;
    el.classList.add('flex', 'flex-col', 'gap-4');
    el.innerHTML = list.map((f, i) => `<div class="overflow-hidden ${k.card} border-l-4 !border-l-transparent transition duration-300" data-faq>
      <h3><button type="button" id="${prefix}-btn-${i}" aria-expanded="false" aria-controls="${prefix}-panel-${i}" class="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-mint/40 sm:px-6">
        <span class="flex-1 font-heading text-base font-semibold ${k.head} sm:text-lg">${f.q}</span>
        <span class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${o.light ? 'bg-pine/10 text-pine' : 'bg-white/10 text-mint'} transition duration-300" data-sq><span data-plus>${icon('plus', 'h-4 w-4')}</span><span data-minus class="hidden">${icon('minus', 'h-4 w-4')}</span></span></button></h3>
      <div id="${prefix}-panel-${i}" role="region" aria-labelledby="${prefix}-btn-${i}" class="grid grid-rows-[0fr] transition-all duration-500 ease-out">
        <div class="overflow-hidden"><p class="px-5 pb-5 text-sm leading-relaxed ${k.body} sm:px-6 sm:pb-6 sm:text-base">${f.a}</p></div></div></div>`).join('');
    const boxes = [...el.querySelectorAll('[data-faq]')];
    const set = (box, open) => {
      const b = box.querySelector('button'), p = box.querySelector('[role=region]'), sq = box.querySelector('[data-sq]');
      b.setAttribute('aria-expanded', open);
      p.classList.toggle('grid-rows-[1fr]', open); p.classList.toggle('grid-rows-[0fr]', !open);
      box.classList.toggle('!border-l-mint', open && !o.light); box.classList.toggle('!border-l-seafoam', open && !!o.light); box.classList.toggle('!border-l-transparent', !open);
      sq.classList.toggle('bg-gradient-to-br', open); sq.classList.toggle('from-mint', open); sq.classList.toggle('to-seafoam', open); sq.classList.toggle('!text-pine', open);
      box.querySelector('[data-plus]').classList.toggle('hidden', open);
      box.querySelector('[data-minus]').classList.toggle('hidden', !open);
    };
    boxes.forEach(box => box.querySelector('button').addEventListener('click', () => {
      const open = box.querySelector('button').getAttribute('aria-expanded') !== 'true';
      boxes.forEach(b2 => set(b2, false)); set(box, open);
    }));
    if (o.openFirst !== false && boxes[0]) set(boxes[0], true);
    if (UI.refresh) UI.refresh(el);
  }

  function mount(target, html) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return null;
    el.innerHTML = html;
    if (UI.refresh) UI.refresh(el);
    return el;
  }

  const UI = { icons, c: C, icon, stars, money, formatDate, time12, url, find, validate, setError, toast, photo, bgFixed, todayStatus, nextOpening, sectionHead, pageHeader, serviceCard, postCard, chamberCard, testimonialCard, faqAccordion, mount };
  window.UI = UI;
})();
