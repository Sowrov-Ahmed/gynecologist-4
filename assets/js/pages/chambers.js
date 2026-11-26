(function () {
  'use strict';
  if (!window.SITE || !window.UI) return;
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); return el; };
  const S = window.SITE, C = S.chambers || [], K = UI.c;
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const on = 'bg-gradient-to-br from-mint/60 via-white/10 to-seafoam/50'.split(' ');
  const tabs = $('#chamber-tabs'), panel = $('#chamber-panel');
  const tel = p => 'tel:' + String(p).replace(/[^\d+]/g, '');

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Chambers',
    title: `Consult at a chamber <span class="${grad}">near you</span>`,
    text: 'Three chambers across Dhaka and Chattogram, each with fixed weekly hours. Choose the location and day that suit you.',
    photo: 'hallway'
  }));
  mount('#sched-head', UI.sectionHead({ eyebrow: 'Schedule', title: 'Weekly availability', text: 'Every chamber runs on fixed days. Today is highlighted.' }));

  const tabHTML = x => `<div data-wrap="${x.id}" class="rounded-2xl p-px transition duration-300">
    <button type="button" role="tab" id="tab-${x.id}" data-id="${x.id}" aria-controls="chamber-panel" aria-selected="false" class="${K.glassLight} block min-h-11 w-full p-5 text-left transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30">
      <span class="${K.chipLight}">${UI.icon('pin', 'h-3.5 w-3.5')}${x.city}</span>
      <span class="mt-3 block font-heading text-lg font-semibold text-pine">${x.name}</span>
      <span class="mt-1 block text-sm text-pine/70">${x.area}</span>
    </button></div>`;

  const detail = x => `<div class="grid gap-6 lg:grid-cols-2">
    <div class="${K.ring}"><div class="aspect-[4/4] overflow-hidden rounded-[15px] bg-forest"><iframe src="${x.mapEmbed}" title="Map of ${x.name}" loading="lazy" class="h-full w-full"></iframe></div></div>
    <div class="${K.glassLightStrong} p-6 sm:p-8">
      <h2 class="font-heading text-2xl font-bold text-pine">${x.name}</h2>
      <p class="mt-2 flex items-start gap-2 text-sm text-pine/80"><span class="mt-0.5 shrink-0 text-seafoam-dark">${UI.icon('pin', 'h-4 w-4')}</span>${x.address}</p>
      <div class="mt-4 flex flex-wrap gap-2">${x.days.map(d => `<span class="${K.chipLight}">${d}</span>`).join('')}</div>
      <p class="mt-4 flex items-center gap-2 text-sm font-semibold text-pine"><span class="text-seafoam-dark">${UI.icon('clock', 'h-4 w-4')}</span>${x.time}</p>
      <p class="mt-1 text-sm text-seafoam-dark">Next: ${UI.nextOpening(x).text}</p>
      <div class="mt-5 grid grid-cols-2 gap-3">
        <div class="rounded-xl bg-pine/5 p-4"><p class="text-xs font-semibold uppercase tracking-wider text-pine/70">New patient</p><p class="mt-1 font-heading text-xl font-bold text-pine">${UI.money(x.fee.new)}</p></div>
        <div class="rounded-xl bg-pine/5 p-4"><p class="text-xs font-semibold uppercase tracking-wider text-pine/70">Follow-up</p><p class="mt-1 font-heading text-xl font-bold text-pine">${UI.money(x.fee.followup)}</p></div>
      </div>
      <ul class="mt-5 grid gap-2 sm:grid-cols-2">${x.features.map(f => `<li class="flex items-start gap-2 text-sm text-pine/80"><span class="mt-0.5 shrink-0 text-seafoam-dark">${UI.icon('check', 'h-4 w-4')}</span>${f}</li>`).join('')}</ul>
      <p class="mt-4 rounded-xl border border-seafoam/30 bg-seafoam/10 p-3 text-sm text-pine">${x.note}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="${UI.url.appointment({ chamber: x.id })}" class="${K.btnPrimary}">${UI.icon('calendar-check', 'h-4 w-4')}Book here</a>
        <a href="${x.mapLink}" target="_blank" rel="noopener" class="${K.btnOutlineLight}">${UI.icon('navigation', 'h-4 w-4')}Directions</a>
        <a href="${tel(x.phone)}" class="${K.btnOutlineLight}">${UI.icon('phone', 'h-4 w-4')}Call</a>
      </div>
    </div></div>`;

  let cur = null, timer = 0;
  function select(id, o = {}) {
    if (!panel || !tabs) return;
    const x = C.find(c => c.id === id) || C[0];
    if (!x) return;
    tabs.querySelectorAll('[data-wrap]').forEach(w => {
      const a = w.dataset.wrap === x.id;
      on.forEach(k => w.classList.toggle(k, a));
      const b = w.querySelector('button');
      if (b) { b.setAttribute('aria-selected', String(a)); b.tabIndex = a ? 0 : -1; }
    });
    panel.setAttribute('aria-labelledby', 'tab-' + x.id);
    const draw = () => { UI.mount(panel, detail(x)); panel.classList.remove('opacity-0'); };
    clearTimeout(timer);
    if (cur === null) draw();
    else if (cur !== x.id) { panel.classList.add('opacity-0'); timer = setTimeout(draw, 200); }
    cur = x.id;
    if (o.push) history.replaceState(null, '', '#' + x.id);
    if (o.scroll) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
  }

  if (tabs && panel && C.length) {
    UI.mount(tabs, C.map(tabHTML).join(''));
    tabs.addEventListener('click', e => {
      const b = e.target.closest('[data-id]');
      if (b) select(b.dataset.id, { push: true });
    });
    tabs.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = C.findIndex(c => c.id === cur), n = C[(i + (e.key === 'ArrowRight' ? 1 : C.length - 1)) % C.length];
      select(n.id, { push: true });
      const b = $('#tab-' + n.id); if (b) b.focus();
    });
    const h = location.hash.slice(1), valid = C.some(c => c.id === h);
    select(valid ? h : C[0].id, { scroll: valid });
    window.addEventListener('hashchange', () => {
      const id = location.hash.slice(1);
      if (C.some(c => c.id === id)) select(id, { scroll: true });
    });
  }

  const wrap = $('#sched-table');
  if (wrap && C.length) {
    const days = [[6, 'Saturday'], [0, 'Sunday'], [1, 'Monday'], [2, 'Tuesday'], [3, 'Wednesday'], [4, 'Thursday'], [5, 'Friday']];
    const today = new Date().getDay();
    const head = C.map(x => `<th scope="col" class="px-5 py-4 text-left font-heading text-sm font-semibold text-white">${x.name}<span class="mt-0.5 block text-xs font-normal text-mist">${x.area}, ${x.city}</span></th>`).join('');
    const rows = days.map(([d, n]) => {
      const t = d === today;
      const cells = C.map(x => `<td class="px-5 py-4">${x.weekdays.includes(d)
        ? `<span class="inline-flex whitespace-nowrap rounded-md bg-mint/10 px-3 py-1.5 text-sm font-semibold text-mint">${UI.time12(x.start)} – ${UI.time12(x.end)}</span>`
        : '<span class="text-mist/40" aria-label="Closed">—</span>'}</td>`).join('');
      return `<tr class="border-t border-white/10 ${t ? 'bg-white/5' : ''}"><th scope="row" class="whitespace-nowrap border-l-4 px-5 py-4 text-left text-sm font-semibold ${t ? 'border-mint text-white' : 'border-transparent text-mist'}">${n}${t ? ' <span class="ml-2 rounded-md bg-mint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pine">Today</span>' : ''}</th>${cells}</tr>`;
    }).join('');
    UI.mount(wrap, `<div class="${K.glass} overflow-x-auto"><table class="w-full min-w-[640px] border-collapse"><caption class="sr-only">Weekly chamber availability</caption><thead><tr class="border-b border-white/15 bg-white/10 backdrop-blur-2xl"><th scope="col" class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mist">Day</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`);
  }
})();
