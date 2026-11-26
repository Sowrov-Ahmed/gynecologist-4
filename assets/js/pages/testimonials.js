(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI) return;
  const c = UI.c, ic = UI.icon, PAGE = 6;
  const all = SITE.testimonials || [];
  const services = [...new Set(all.map(t => t.service))];
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const tabOn = 'border-seafoam-dark bg-gradient-to-r from-mint to-seafoam text-pine shadow-sm';
  const tabOff = 'border-transparent bg-pine/5 text-pine/70 hover:bg-pine/10 hover:text-pine';
  let filter = 'All', shown = PAGE;

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Patient stories',
    title: `Trusted by <span class="${grad}">22,000+ patients</span>`,
    text: 'Honest words from women and families he has cared for, from first visit to safe delivery and recovery.',
    photo: 'listening'
  }));

  const tabs = ['All', ...services].map(s => `
    <button type="button" role="tab" data-filter="${s}" aria-selected="false" class="inline-flex min-h-[44px] shrink-0 items-center rounded-lg border px-4 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30 ${tabOff}">${s}</button>`).join('');

  mount('#reviews', `
  <section class="${c.sectionLight} ${c.diagTop}" aria-labelledby="reviews-title">
    <div class="${c.container}">
      <div id="reviews-title">${UI.sectionHead({ eyebrow: 'Reviews', title: 'What patients say', light: true })}</div>
      <div class="mt-10">
        <div id="review-tabs" role="tablist" aria-label="Filter by service" class="flex flex-wrap gap-2">${tabs}</div>
        <p id="review-count" class="mt-5 text-sm font-medium text-pine/80" aria-live="polite"></p>
      </div>
      <div id="review-grid" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
      <div id="review-empty" class="${c.glassLight} mt-8 hidden p-10 text-center">
        <span class="mx-auto inline-flex text-seafoam-dark">${ic('search', 'h-8 w-8')}</span>
        <p class="mt-3 font-heading text-lg font-semibold text-pine">No stories for this service yet</p>
        <button type="button" data-filter="All" class="${c.btnOutlineLight} mt-5">Show all stories</button>
      </div>
      <div class="mt-10 text-center"><button type="button" id="review-more" class="${c.btnOutlineLight} hidden">Load more stories</button></div>
    </div>
  </section>`);

  const grid = $('#review-grid'), count = $('#review-count'), more = $('#review-more'), empty = $('#review-empty');

  function render(animate) {
    if (!grid) return;
    const list = filter === 'All' ? all : all.filter(t => t.service === filter);
    const slice = list.slice(0, shown);
    const html = slice.map((t, i) => UI.testimonialCard(t, i, { light: true })).join('');
    const apply = () => {
      UI.mount(grid, html);
      grid.classList.remove('opacity-0');
    };
    if (animate) { grid.classList.add('opacity-0', 'transition-opacity', 'duration-200'); setTimeout(apply, 200); } else apply();
    if (count) count.textContent = list.length ? `Showing ${slice.length} of ${list.length} stories` : '';
    if (empty) empty.classList.toggle('hidden', list.length > 0);
    if (more) more.classList.toggle('hidden', slice.length >= list.length);
    document.querySelectorAll('#review-tabs [data-filter]').forEach(b => {
      const on = b.dataset.filter === filter;
      b.setAttribute('aria-selected', on);
      b.classList.remove(...tabOn.split(' '), ...tabOff.split(' '));
      b.classList.add(...(on ? tabOn : tabOff).split(' '));
    });
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-filter]');
    if (!b || !b.closest('#reviews')) return;
    filter = b.dataset.filter; shown = PAGE; render(true);
  });
  if (more) more.addEventListener('click', () => { shown += PAGE; render(false); });
  render(false);
})();
