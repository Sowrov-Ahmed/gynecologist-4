(function () {
  'use strict';
  if (!window.SITE || !window.UI) return;
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); return el; };
  const S = window.SITE, D = S.doctor, C = S.chambers || [], K = UI.c;
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const tel = p => 'tel:' + String(p).replace(/[^\d+]/g, '');

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Contact',
    title: `We are here <span class="${grad}">to help</span>`,
    text: 'Questions about appointments, reports or care? Call, message or write to us. Our team replies within one working day.',
    photo: 'hallway'
  }));

  const row = (icon, label, value, href, ext) => {
    const inner = `<span class="${K.iconWrapLight} shrink-0">${UI.icon(icon, 'h-5 w-5')}</span>
      <span class="min-w-0"><span class="block text-xs font-semibold uppercase tracking-wider text-pine/70">${label}</span>
      <span class="mt-0.5 block break-words text-sm font-semibold text-pine sm:text-base">${value}</span></span>`;
    const cls = `${K.glassLight} flex items-center gap-4 p-4`;
    return href
      ? `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} class="${cls} min-h-11 transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30">${inner}</a>`
      : `<div class="${cls}">${inner}</div>`;
  };
  const wa = D.whatsapp ? (/^https?:/.test(D.whatsapp) ? D.whatsapp : 'https://wa.me/' + String(D.whatsapp).replace(/\D/g, '')) : '';
  const today = UI.todayStatus();
  const soc = Object.entries(D.social || {}).filter(([, u]) => u).map(([n, u]) =>
    `<a href="${u}" target="_blank" rel="noopener" aria-label="${n[0].toUpperCase() + n.slice(1)}" class="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-pine text-mint transition duration-300 hover:-translate-y-0.5 hover:bg-forest focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30">${UI.icon(n, 'h-5 w-5')}</a>`).join('');

  mount('#reach-info', `<div class="flex flex-col gap-3">
    ${UI.sectionHead({ eyebrow: 'Reach us', title: 'Talk to the team', light: true })}
    <div class="mt-4 flex flex-col gap-3">
      ${row('phone', 'Call', D.phone, D.phoneHref || tel(D.phone))}
      ${row('whatsapp', 'WhatsApp', D.phone, wa, true)}
      ${row('mail', 'Email', D.email, 'mailto:' + D.email)}
      ${row('clock', 'Today at the chambers', today.text)}
    </div>
    <p class="mt-2 flex items-start gap-3 rounded-2xl border border-seafoam/30 bg-seafoam/10 p-4 text-sm text-pine"><span class="mt-0.5 shrink-0 text-seafoam-dark">${UI.icon('alert', 'h-5 w-5')}</span>For obstetric emergencies go to the nearest hospital or call 999.</p>
    <div class="mt-2 flex flex-wrap gap-3">${soc}</div></div>`);

  const field = (id, label, control, extra = '') => `<div class="${extra}"><label for="${id}" class="${K.labelLight}">${label}</label>${control}</div>`;
  const subjects = ['Appointment help', 'Report query', 'Feedback', 'Other'];
  mount('#reach-form', `<div class="${K.glassLightStrong} p-6 sm:p-8">
    <div id="form-wrap">
      <h2 class="font-heading text-2xl font-bold text-pine">Send a message</h2>
      <p class="mt-1 text-sm text-pine/80">We will reply by phone or email.</p>
      <form id="contact-form" novalidate class="mt-6 grid gap-5 sm:grid-cols-2">
        ${field('c-name', 'Full name', `<input id="c-name" name="name" type="text" autocomplete="name" required class="${K.inputLight}" placeholder="Your full name">`)}
        ${field('c-phone', 'Mobile number', `<input id="c-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required class="${K.inputLight}" placeholder="01XXX-XXXXXX">`)}
        ${field('c-email', 'Email', `<input id="c-email" name="email" type="email" autocomplete="email" required class="${K.inputLight}" placeholder="you@example.com">`)}
        ${field('c-subject', 'Subject', `<select id="c-subject" name="subject" class="${K.inputLight}">${subjects.map(s => `<option>${s}</option>`).join('')}</select>`)}
        ${field('c-message', 'Message', `<textarea id="c-message" name="message" rows="5" maxlength="500" required class="${K.inputLight} resize-y" placeholder="How can we help?"></textarea><p id="c-count" class="mt-1 text-right text-xs text-pine/70" aria-live="polite">0 / 500</p>`, 'sm:col-span-2')}
        <div class="sm:col-span-2"><button type="submit" class="${K.btnPrimary} w-full sm:w-auto">${UI.icon('message', 'h-4 w-4')}Send message</button></div>
      </form>
    </div>
    <div id="form-done" class="hidden text-center" role="status">
      <span class="${K.iconWrapLight} mx-auto">${UI.icon('check', 'h-6 w-6')}</span>
      <h2 class="mt-4 font-heading text-2xl font-bold text-pine">Message sent</h2>
      <p id="done-text" class="mt-2 text-sm text-pine/80"></p>
      <button type="button" id="send-another" class="${K.btnOutlineLight} mt-6">Send another</button>
    </div></div>`);

  const form = $('#contact-form'), wrap = $('#form-wrap'), done = $('#form-done');
  const msg = $('#c-message'), count = $('#c-count');
  const upd = () => { if (msg && count) count.textContent = msg.value.length + ' / 500'; };
  if (msg) msg.addEventListener('input', upd);
  const check = (el, ok, m) => { if (el) UI.setError(el, ok ? '' : m); return ok; };

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = id => $(id), v = id => (f(id) ? f(id).value.trim() : '');
      const r = [
        check(f('#c-name'), v('#c-name').length >= 3, 'Please enter your full name.'),
        check(f('#c-phone'), UI.validate.phone(v('#c-phone')), 'Enter a valid Bangladesh mobile number.'),
        check(f('#c-email'), UI.validate.email(v('#c-email')), 'Enter a valid email address.'),
        check(f('#c-message'), v('#c-message').length >= 10, 'Please write at least 10 characters.')
      ];
      if (r.includes(false)) {
        const bad = form.querySelector('[aria-invalid="true"]') || form.querySelector('input,textarea');
        if (bad) bad.focus();
        return;
      }
      const dt = $('#done-text');
      if (dt) dt.textContent = `Thank you, ${v('#c-name').split(' ')[0]}. Our team will contact you about "${v('#c-subject')}" within one working day.`;
      if (wrap) wrap.classList.add('hidden');
      if (done) { done.classList.remove('hidden'); done.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      UI.toast('Your message has been sent.', 'success');
    });
  }
  const again = $('#send-another');
  if (again) again.addEventListener('click', () => {
    if (form) { form.reset(); form.querySelectorAll('input,textarea').forEach(el => UI.setError(el, '')); }
    upd();
    if (done) done.classList.add('hidden');
    if (wrap) wrap.classList.remove('hidden');
    const n = $('#c-name'); if (n) n.focus();
  });

  mount('#map-head', UI.sectionHead({ eyebrow: 'Find us', title: 'Chamber locations', text: 'Pick a chamber to see its map and hours.' }));
  const tabs = $('#map-tabs'), panel = $('#map-panel');
  if (tabs && panel && C.length) {
    const act = 'border-mint bg-mint text-pine', idle = 'border-white/20 bg-white/10 text-white hover:bg-white/20';
    UI.mount(tabs, C.map(x => `<button type="button" role="tab" data-id="${x.id}" aria-selected="false" class="inline-flex min-h-11 items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40">${UI.icon('pin', 'h-4 w-4')}${x.area}</button>`).join(''));
    let t = 0;
    const show = id => {
      const x = C.find(c => c.id === id) || C[0];
      tabs.querySelectorAll('button').forEach(b => {
        const a = b.dataset.id === x.id;
        b.setAttribute('aria-selected', String(a));
        (a ? idle : act).split(' ').forEach(k => b.classList.remove(k));
        (a ? act : idle).split(' ').forEach(k => b.classList.add(k));
      });
      clearTimeout(t);
      panel.classList.add('opacity-0');
      t = setTimeout(() => {
        UI.mount(panel, `<div class="lg:col-span-3 ${K.ring}"><div class="aspect-[4/3] overflow-hidden rounded-[15px] bg-forest"><iframe src="${x.mapEmbed}" title="Map of ${x.name}" loading="lazy" class="h-full w-full"></iframe></div></div>
          <div class="lg:col-span-2 ${K.glassStrong} p-6 sm:p-8">
            <h3 class="font-heading text-xl font-semibold text-white">${x.name}</h3>
            <p class="mt-3 flex items-start gap-2 text-sm text-mist"><span class="mt-0.5 shrink-0 text-mint">${UI.icon('pin', 'h-4 w-4')}</span>${x.address}</p>
            <div class="mt-4 flex flex-wrap gap-2">${x.days.map(d => `<span class="${K.chip}">${d}</span>`).join('')}</div>
            <p class="mt-4 flex items-center gap-2 text-sm text-white"><span class="text-mint">${UI.icon('clock', 'h-4 w-4')}</span>${x.time}</p>
            <a href="${tel(x.phone)}" class="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-mint"><span class="text-mint">${UI.icon('phone', 'h-4 w-4')}</span>${x.phone}</a>
            <div class="mt-5 flex flex-wrap gap-3"><a href="${UI.url.appointment({ chamber: x.id })}" class="${K.btnPrimary}">Book here</a><a href="${x.mapLink}" target="_blank" rel="noopener" class="${K.btnGlass}">${UI.icon('navigation', 'h-4 w-4')}Directions</a></div>
          </div>`);
        panel.classList.remove('opacity-0');
      }, 200);
    };
    tabs.addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) show(b.dataset.id); });
    show(C[0].id);
  }
})();
