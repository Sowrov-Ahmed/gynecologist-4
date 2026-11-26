(function () {
  'use strict';
  if (!window.SITE || !window.UI) return;
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); return el; };
  const D = window.SITE.doctor || {}, K = UI.c;
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Legal',
    title: `Terms &amp; <span class="${grad}">Conditions</span>`,
    text: 'Last updated: 1 November 2026',
    photo: null,
    actions: `<div><button type="button" id="print-btn" class="${K.btnGlass}">${UI.icon('printer', 'h-4 w-4')}Print</button></div>`
  }));
  const pb = $('#print-btn');
  if (pb) pb.addEventListener('click', () => window.print());

  const S = [
    ['Acceptance of terms', ['By booking an appointment or using this website you agree to these terms. If you do not agree, please do not use our services.', 'We may update these terms from time to time. The date above shows the latest version.']],
    ['Medical information disclaimer', ['Content on this website is educational and is not a substitute for a consultation with a doctor.', 'Never delay or avoid care because of something you read here.', 'In an emergency, go to the nearest hospital or call 999.']],
    ['Appointments and cancellations', ['Appointments are confirmed by SMS. Please arrive 15 minutes early.', ['Cancel or reschedule at least 12 hours before your slot.', 'Late cancellations or missed visits may be charged a booking fee.', 'Slots may be moved if the doctor is called to an urgent delivery.']]],
    ['Fees and payments', ['All fees are in Bangladeshi Taka (৳) and are listed for each chamber on the Chambers page. Fees for procedures are explained before treatment.', 'We accept cash, bKash, Nagad and major debit and credit cards.']],
    ['Patient responsibilities', [['Give accurate and complete medical history.', 'Bring previous reports, prescriptions and scans.', 'Follow the treatment plan and attend follow-up visits.', 'Treat staff and other patients with respect.']]],
    ['Website use and accounts', ['You are responsible for keeping your account details private and for activity under your account.', 'Do not misuse the website, attempt unauthorised access or submit false information.']],
    ['Intellectual property', ['All text, photographs, graphics and design on this website belong to Dr. Imran Chowdhury or are used with permission.', 'You may not copy, reproduce or redistribute them without written consent.']],
    ['Limitation of liability', ['We take care to keep information accurate but do not guarantee it is always complete or current.', 'We are not liable for losses from reliance on website content or from temporary interruptions to the site. Nothing here limits liability that cannot be excluded by law.']],
    ['Governing law', ['These terms are governed by the laws of Bangladesh. Any dispute is subject to the courts of Dhaka.']],
    ['Contact', [`Questions about these terms? Email ${D.email || 'appointments@drimranchowdhury.com'} or call ${D.phone || '+880 1912-558204'}.`]]
  ];

  const body = $('#legal-body'), toc = $('#toc');
  if (!body) return;
  const block = b => Array.isArray(b)
    ? `<ul class="mt-3 space-y-2">${b.map(i => `<li class="flex items-start gap-3 text-sm leading-relaxed text-pine/80 sm:text-base"><span class="mt-2 h-2 w-2 shrink-0 bg-seafoam" aria-hidden="true"></span>${i}</li>`).join('')}</ul>`
    : `<p class="mt-3 text-sm leading-relaxed text-pine/80 sm:text-base">${b}</p>`;
  UI.mount(body, S.map(([t, c], i) => `<section id="s${i + 1}" class="scroll-mt-28 ${i ? 'mt-8 border-t border-pine/10 pt-8' : ''}">
    <h2 class="font-heading text-xl font-semibold text-pine sm:text-2xl"><span class="text-seafoam-dark">${i + 1}.</span> ${t}</h2>${c.map(block).join('')}</section>`).join(''));

  if (!toc) return;
  const idle = 'text-pine/80 hover:bg-pine/5', active = ['bg-gradient-to-r', 'from-mint', 'to-seafoam', 'text-pine', 'font-semibold'];
  const link = (t, i) => `<a href="#s${i + 1}" data-toc="s${i + 1}" class="block min-h-11 shrink-0 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30 lg:whitespace-normal ${idle}">${i + 1}. ${t}</a>`;
  UI.mount(toc, `<div class="${K.glassLight} p-2 lg:p-4"><p class="hidden px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-seafoam-dark lg:block">Contents</p>
    <div class="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">${S.map(([t], i) => link(t, i)).join('')}</div></div>`);

  const links = [...toc.querySelectorAll('[data-toc]')];
  const setActive = id => links.forEach(a => {
    const on = a.dataset.toc === id;
    active.forEach(k => a.classList.toggle(k, on));
    idle.split(' ').forEach(k => a.classList.toggle(k, !on));
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  setActive('s1');
  if ('IntersectionObserver' in window) {
    const sections = [...body.querySelectorAll('section[id]')];
    const visible = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
      const current = sections.find(s => visible.has(s.id));
      if (current) {
        setActive(current.id);
        const a = toc.querySelector(`[data-toc="${current.id}"]`), row = a && a.parentElement;
        if (row && row.scrollWidth > row.clientWidth) row.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      }
    }, { rootMargin: '-15% 0px -70% 0px' });
    sections.forEach(s => io.observe(s));
  }
})();
