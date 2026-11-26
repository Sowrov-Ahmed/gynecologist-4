(() => {
  const $ = s => document.querySelector(s);
  const setHTML = (s, h) => { const el = $(s); if (el) el.innerHTML = h; };
  const mount = (s, h) => { if ($(s)) UI.mount(s, h); };
  if (!window.SITE || !window.UI || !$('#blog-grid')) return;

  const posts = SITE.posts || [];
  const featured = posts.find(p => p.featured) || null;
  const cats = ['All', ...new Set(posts.map(p => p.category))];
  const state = { q: '', cat: 'All' };
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Health journal',
    title: 'Advice you can <span class="' + grad + '">trust</span>',
    text: 'Clear, practical guidance on pregnancy, fertility, periods, surgery and menopause, written by Dr. Imran Chowdhury.',
    photo: null
  }));
  setHTML('#blog-search-icon', UI.icon('search', 'h-4 w-4'));

  const tabOn = 'border-seafoam-dark text-pine';
  const tabOff = 'border-transparent text-pine/60 hover:text-pine';
  const renderTabs = () => setHTML('#blog-tabs', cats.map(cat =>
    `<button type="button" data-cat="${cat}" aria-pressed="${cat === state.cat}" class="-mb-px min-h-[44px] whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/20 ${cat === state.cat ? tabOn : tabOff}">${cat}</button>`
  ).join(''));

  const featuredHTML = p => `
    <div class="rounded-2xl bg-gradient-to-br from-mint/60 via-white/10 to-seafoam/50 p-px" data-reveal="up">
      <article class="grid overflow-hidden rounded-[15px] bg-night lg:grid-cols-2">
        <div class="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">${Art.cover(p.art, 'absolute inset-0 h-full w-full')}</div>
        <div class="flex flex-col justify-center gap-4 p-6 sm:p-10">
          <div class="flex flex-wrap items-center gap-2">
            <span class="${UI.c.chip}">${p.category}</span>
            <span class="text-xs text-mist">${UI.formatDate(p.date)} · ${p.readMin} min read</span>
          </div>
          <h3 class="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">${p.title}</h3>
          <p class="text-sm leading-relaxed text-mist sm:text-base">${p.excerpt}</p>
          <div><a href="${UI.url.post(p.slug)}" class="${UI.c.btnPrimary}">Read article ${UI.icon('arrow-right', 'h-4 w-4')}</a></div>
        </div>
      </article>
    </div>`;

  const filtered = () => {
    const q = state.q.trim().toLowerCase();
    return posts.filter(p =>
      (state.cat === 'All' || p.category === state.cat) &&
      (!q || (p.title + ' ' + p.excerpt + ' ' + p.category).toLowerCase().includes(q)));
  };

  const render = () => {
    const active = state.q.trim() !== '' || state.cat !== 'All';
    let list = filtered();
    const showFeatured = !active && featured;
    if (showFeatured) list = list.filter(p => p !== featured);

    const fEl = $('#blog-featured');
    if (fEl) fEl.classList.toggle('hidden', !showFeatured);

    const total = list.length + (showFeatured ? 1 : 0);
    const count = $('#blog-count');
    if (count) count.textContent = total + (total === 1 ? ' article' : ' articles') + (state.cat !== 'All' ? ' in ' + state.cat : '');

    const grid = $('#blog-grid');
    if (grid) {
      grid.classList.toggle('hidden', list.length === 0);
      grid.classList.remove('animate-fade-in');
      void grid.offsetWidth;
      grid.classList.add('animate-fade-in');
      UI.mount(grid, list.map((p, i) => UI.postCard(p, i, { light: true })).join(''));
    }
    const empty = $('#blog-empty');
    if (empty) empty.classList.toggle('hidden', total !== 0);
  };

  if (featured) mount('#blog-featured', featuredHTML(featured));
  renderTabs();
  render();

  const tabs = $('#blog-tabs');
  if (tabs) tabs.addEventListener('click', e => {
    const b = e.target.closest('button[data-cat]');
    if (!b) return;
    state.cat = b.dataset.cat;
    renderTabs();
    render();
  });
  const search = $('#blog-search');
  if (search) search.addEventListener('input', () => { state.q = search.value; render(); });
  const clear = $('#blog-clear');
  if (clear) clear.addEventListener('click', () => {
    state.q = ''; state.cat = 'All';
    if (search) search.value = '';
    renderTabs();
    render();
  });
})();
