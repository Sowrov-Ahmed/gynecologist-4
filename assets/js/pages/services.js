(() => {
  const $ = s => document.querySelector(s);
  const setHTML = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI) return;
  const c = UI.c, list = SITE.services;

  setHTML('#page-head', UI.pageHeader({
    eyebrow: 'Services',
    title: 'Complete care, <span class="bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent">under one roof</span>',
    text: 'Six focused services in obstetrics and gynecology, delivered by one consultant across three chambers in Dhaka and Chattogram.',
    photo: 'diagnostic'
  }));

  setHTML('#all-head', UI.sectionHead({ eyebrow: 'Services', title: 'What we treat', light: true }));
  setHTML('#all-grid', list.map((s, i) => UI.serviceCard(s, i, { light: true })).join(''));
  setHTML('#explore-head', UI.sectionHead({ eyebrow: 'Explore', title: 'Choose a service' }));

  const tabs = $('#svc-tabs'), panel = $('#svc-panel');
  let active = Math.max(0, list.findIndex(s => s.slug === decodeURIComponent(location.hash.slice(1))));

  const renderTabs = () => {
    if (!tabs) return;
    tabs.innerHTML = list.map((s, i) => {
      const on = i === active;
      return `<button type="button" role="tab" id="svc-tab-${i}" data-i="${i}" aria-selected="${on}" aria-controls="svc-panel" tabindex="${on ? 0 : -1}" class="flex min-h-[56px] w-64 shrink-0 items-center gap-4 border-l-4 px-4 py-3 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/30 lg:w-full ${on ? c.glassStrong + ' border-l-mint' : c.glass + ' border-l-transparent hover:bg-white/10'}"><span class="font-heading text-sm font-bold ${on ? 'text-mint' : 'text-mist'}">0${i + 1}</span><span class="text-sm font-semibold text-white">${s.title}</span></button>`;
    }).join('');
  };

  const renderPanel = () => {
    const s = list[active];
    if (!panel || !s) return;
    panel.setAttribute('aria-labelledby', 'svc-tab-' + active);
    panel.innerHTML = `<div class="${c.glassStrong} animate-fade-in overflow-hidden">
      <div class="relative h-48 overflow-hidden sm:h-60">${Art.cover(s.art, 'h-full w-full')}</div>
      <div class="p-6 sm:p-8">
        <h3 class="font-heading text-2xl font-bold text-white">${s.title}</h3>
        <p class="mt-3 leading-relaxed text-mist">${s.overview}</p>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2">${s.includes.map(x => `<li class="flex items-start gap-2.5 text-sm text-mist"><span class="mt-0.5 text-mint">${UI.icon('check', 'h-5 w-5')}</span>${x}</li>`).join('')}</ul>
        <div class="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <span class="${c.chip}">${UI.icon('clock', 'h-4 w-4')}${s.duration}</span>
          <span class="${c.chip}">${UI.icon('file-text', 'h-4 w-4')}${s.fee}</span>
        </div>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="${UI.url.appointment({ service: s.slug })}" class="${c.btnPrimary}">Book this service ${UI.icon('arrow-right', 'h-4 w-4')}</a>
          <a href="${UI.url.service(s.slug)}" class="${c.btnGlass}">Details</a>
        </div></div></div>`;
  };

  const select = (i, focus) => {
    active = (i + list.length) % list.length;
    renderTabs(); renderPanel();
    if (focus) { const t = $('#svc-tab-' + active); if (t) t.focus(); }
  };

  if (tabs) {
    tabs.addEventListener('click', e => {
      const b = e.target.closest('[data-i]');
      if (b) select(+b.dataset.i, false);
    });
    tabs.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowRight') select(active + 1, true);
      else if (k === 'ArrowUp' || k === 'ArrowLeft') select(active - 1, true);
      else if (k === 'Home') select(0, true);
      else if (k === 'End') select(list.length - 1, true);
      else return;
      e.preventDefault();
    });
  }
  select(active, false);

  setHTML('#path-head', UI.sectionHead({ eyebrow: 'Pathway', title: 'How your care works', light: true }));
  const steps = [
    ['01', 'Book', 'Choose a service and chamber online or by phone.', 'calendar-check'],
    ['02', 'Consult', 'A full history, examination and a clear explanation.', 'message'],
    ['03', 'Treat', 'A written plan, investigations and treatment as agreed.', 'activity'],
    ['04', 'Follow-up', 'Review visits and a direct line for your questions.', 'heart']
  ];
  setHTML('#path-steps', '<div class="pointer-events-none absolute left-[12%] right-[12%] top-14 hidden h-px bg-pine/20 lg:block" aria-hidden="true"></div>' +
    steps.map((s, i) => `<div data-reveal="up" data-delay="${i * 120}" class="${c.glassLight} relative p-6">
      <div class="flex items-center justify-between"><span class="${c.iconWrapLight}">${UI.icon(s[3], 'h-5 w-5')}</span><span class="font-heading text-3xl font-bold text-seafoam-dark">${s[0]}</span></div>
      <h3 class="${c.h3Light} mt-5">${s[1]}</h3><p class="mt-2 text-sm text-pine/80">${s[2]}</p></div>`).join(''));

  setHTML('#fee-table', `<div class="overflow-x-auto rounded-xl border border-pine/10 bg-white/50"><table class="w-full min-w-[640px] text-left text-sm text-pine">
    <caption class="sr-only">Service durations and starting fees</caption>
    <thead class="bg-night text-white"><tr><th scope="col" class="px-5 py-4 font-semibold">Service</th><th scope="col" class="px-5 py-4 font-semibold">Duration</th><th scope="col" class="px-5 py-4 font-semibold">Starting fee</th><th scope="col" class="px-5 py-4 font-semibold"><span class="sr-only">Booking</span></th></tr></thead>
    <tbody>${list.map(s => `<tr class="even:bg-pine/5"><th scope="row" class="px-5 py-3 font-semibold">${s.title}</th><td class="px-5 py-3">${s.duration}</td><td class="px-5 py-3 font-semibold">${s.fee}</td><td class="px-5 py-1 text-right"><a href="${UI.url.appointment({ service: s.slug })}" class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-seafoam-dark transition duration-300 hover:text-pine">Book ${UI.icon('arrow-right', 'h-4 w-4')}</a></td></tr>`).join('')}</tbody></table></div>`);
})();
