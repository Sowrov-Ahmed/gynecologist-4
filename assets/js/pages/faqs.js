(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI) return;
  const c = UI.c, ic = UI.icon, D = SITE.doctor, faqs = SITE.faqs || [];
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const cats = ['All', 'Appointments', 'Pregnancy', 'Treatments', 'Payments'];
  const countOf = k => k === 'All' ? faqs.length : faqs.filter(f => f.cat === k).length;
  let cat = 'All', query = '';

  mount('#page-head', UI.pageHeader({
    eyebrow: 'FAQs',
    title: `Answers to your <span class="${grad}">questions</span>`,
    text: 'Quick answers on booking, pregnancy care, treatments and fees. Cannot find yours? Call or message the team.',
    photo: 'tablet'
  }));

  const catBtns = cats.map(k => `
    <button type="button" data-cat="${k}" aria-pressed="false" class="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30">
      <span>${k}</span><span data-n class="rounded-md bg-pine/10 px-2 py-0.5 text-xs">${countOf(k)}</span>
    </button>`).join('');

  mount('#faq-section', `
  <section class="${c.sectionLight} ${c.diagTop}" aria-labelledby="faq-title">
    <div class="${c.container}">
      <div id="faq-title">${UI.sectionHead({ eyebrow: 'Help centre', title: 'Frequently asked questions', light: true })}</div>
      <div class="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <aside class="lg:sticky lg:top-28 lg:col-span-4" data-reveal="left">
          <nav aria-label="FAQ categories" class="${c.glassLight} flex flex-col gap-1 p-3">${catBtns}</nav>
          <div class="${c.glass} mt-6 !bg-night p-6 text-white">
            <h3 class="${c.h3}">Still have questions?</h3>
            <p class="mt-2 text-sm text-mist">Our team replies within working hours, usually in minutes.</p>
            <div class="mt-5 flex flex-col gap-3">
              <a href="${D.phoneHref}" class="${c.btnPrimary}">${ic('phone', 'h-5 w-5')} Call ${D.phone}</a>
              <a href="${D.whatsapp}" target="_blank" rel="noopener" class="${c.btnGlass}">${ic('whatsapp', 'h-5 w-5')} WhatsApp</a>
              <a href="contact.html" class="${c.btnGlass}">${ic('mail', 'h-5 w-5')} Contact page</a>
            </div>
          </div>
        </aside>
        <div class="min-w-0 lg:col-span-8">
          <div class="relative">
            <label for="faq-search" class="sr-only">Search questions</label>
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pine/50">${ic('search', 'h-5 w-5')}</span>
            <input id="faq-search" type="search" autocomplete="off" placeholder="Search questions and answers" class="${c.inputLight} pl-12 pr-12">
            <button type="button" id="faq-clear" aria-label="Clear search" class="absolute right-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-pine/70 transition duration-300 hover:text-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30">${ic('x', 'h-5 w-5')}</button>
          </div>
          <p id="faq-count" class="mt-4 text-sm font-medium text-pine/80" aria-live="polite"></p>
          <div class="mt-4">
            <div id="faq-list"></div>
          </div>
          <div id="faq-empty" class="${c.glassLight} mt-4 hidden p-10 text-center">
            <span class="mx-auto inline-flex text-seafoam-dark">${ic('search', 'h-8 w-8')}</span>
            <p class="mt-3 font-heading text-lg font-semibold text-pine">No matching questions</p>
            <p class="mt-1 text-sm text-pine/80">Try different words or browse another category.</p>
            <button type="button" id="faq-reset" class="${c.btnOutlineLight} mt-5">Clear filters</button>
          </div>
        </div>
      </div>
    </div>
  </section>`);

  const list = $('#faq-list'), search = $('#faq-search'), clear = $('#faq-clear'),
    count = $('#faq-count'), empty = $('#faq-empty'), reset = $('#faq-reset');

  function render() {
    const q = query.trim().toLowerCase();
    const items = faqs.filter(f => (cat === 'All' || f.cat === cat) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)));
    if (list) UI.faqAccordion(list, items, { prefix: 'faq', light: true, openFirst: !q && items.length > 0 });
    if (empty) empty.classList.toggle('hidden', items.length > 0);
    if (list) list.classList.toggle('hidden', items.length === 0);
    if (count) count.textContent = items.length ? `${items.length} ${items.length === 1 ? 'question' : 'questions'}${cat === 'All' ? '' : ' in ' + cat}` : '';
    if (clear) { clear.classList.toggle('hidden', !query); clear.classList.toggle('flex', !!query); }
    document.querySelectorAll('[data-cat]').forEach(b => {
      const on = b.dataset.cat === cat;
      b.setAttribute('aria-pressed', on);
      b.className = 'flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/30 ' +
        (on ? 'bg-gradient-to-r from-mint to-seafoam text-pine' : 'text-pine hover:bg-pine/5');
    });
  }

  document.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => { cat = b.dataset.cat; render(); }));
  if (search) search.addEventListener('input', () => { query = search.value; render(); });
  const clearAll = () => { query = ''; cat = 'All'; if (search) search.value = ''; render(); };
  if (clear) clear.addEventListener('click', () => { query = ''; if (search) { search.value = ''; search.focus(); } render(); });
  if (reset) reset.addEventListener('click', clearAll);
  render();
})();
