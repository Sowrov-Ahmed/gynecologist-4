(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { if ($(s)) UI.mount(s, h); };
  if (!window.SITE || !window.UI || !$('#post-root')) return;

  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const slug = UI.url.param('slug');
  const post = slug ? UI.find.post(slug) : null;

  if (!post) {
    document.title = 'Article not found | Dr. Imran Chowdhury';
    mount('#page-head', UI.pageHeader({
      eyebrow: 'Health journal',
      title: 'Article <span class="' + grad + '">not found</span>',
      text: 'The article you are looking for does not exist or has moved.',
      photo: null
    }));
    mount('#post-root', `
      <section class="${UI.c.sectionLight} ${UI.c.diagTop}">
        <div class="${UI.c.container}">
          <div class="mx-auto max-w-xl rounded-2xl border border-white bg-white/80 p-10 text-center shadow-glass-light backdrop-blur-2xl">
            <span class="${UI.c.iconWrapLight}">${UI.icon('file-text', 'h-6 w-6')}</span>
            <h2 class="mt-5 font-heading text-xl font-semibold text-pine sm:text-2xl">We could not find that article</h2>
            <p class="mt-3 text-sm leading-relaxed text-pine/80 sm:text-base">Browse the health journal to read all of our latest articles.</p>
            <a href="blog.html" class="${UI.c.btnDark} mt-6">${UI.icon('arrow-left', 'h-4 w-4')} Back to all articles</a>
          </div>
        </div>
      </section>`);
    return;
  }

  document.title = post.title + ' | Dr. Imran Chowdhury';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', post.excerpt);

  mount('#page-head', UI.pageHeader({
    eyebrow: post.category,
    title: post.title,
    text: UI.formatDate(post.date) + ' · ' + post.readMin + ' min read · By ' + SITE.doctor.name,
    photo: null
  }));

  const doc = SITE.doctor;
  const posts = SITE.posts;
  const idx = posts.findIndex(p => p.slug === post.slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;
  const pageUrl = encodeURIComponent(location.href);
  const waText = encodeURIComponent(post.title + ' ' + location.href);

  const shareBtn = 'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-pine/25 text-pine transition duration-300 hover:bg-pine hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20';
  const shareLinks = (extra) => `
    <button type="button" data-copy class="${shareBtn}" aria-label="Copy article link">${UI.icon('copy', 'h-5 w-5')}</button>
    <a href="https://wa.me/?text=${waText}" target="_blank" rel="noopener noreferrer" class="${shareBtn}" aria-label="Share on WhatsApp">${UI.icon('whatsapp', 'h-5 w-5')}</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" target="_blank" rel="noopener noreferrer" class="${shareBtn}" aria-label="Share on Facebook">${UI.icon('facebook', 'h-5 w-5')}</a>`;

  const paras = post.body.map((t, i) =>
    `<p class="${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-seafoam-dark ' : ''}mt-6 text-base leading-8 text-pine/85 sm:text-lg">${t}</p>`).join('');

  const takeaways = post.takeaways.map(t =>
    `<li class="flex gap-3"><span class="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded bg-seafoam-dark text-white">${UI.icon('check', 'h-3 w-3')}</span><span class="text-sm leading-relaxed text-pine/85 sm:text-base">${t}</span></li>`).join('');

  const navCard = (p, dir) => {
    if (!p) return '<div class="hidden sm:block"></div>';
    const isPrev = dir === 'prev';
    return `<a href="${UI.url.post(p.slug)}" class="group flex min-h-[44px] flex-col gap-2 rounded-2xl border border-white/80 bg-white/60 p-5 shadow-glass-light backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/20 ${isPrev ? '' : 'sm:text-right'}">
      <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-seafoam-dark ${isPrev ? '' : 'sm:justify-end'}">${isPrev ? UI.icon('arrow-left', 'h-4 w-4') + 'Previous article' : 'Next article' + UI.icon('arrow-right', 'h-4 w-4')}</span>
      <span class="font-heading text-base font-semibold text-pine group-hover:text-seafoam-dark">${p.title}</span></a>`;
  };

  const related = [
    ...posts.filter(p => p.slug !== post.slug && p.category === post.category),
    ...posts.filter(p => p.slug !== post.slug && p.category !== post.category)
  ].slice(0, 3);

  mount('#post-root', `
    <section class="${UI.c.sectionLight} ${UI.c.diagTop}" aria-label="Article">
      <div class="${UI.c.container}">
        <div class="relative">
          <aside class="absolute -left-2 top-0 hidden h-full xl:block" aria-label="Share rail">
            <div class="sticky top-32 flex flex-col gap-3">${shareLinks()}</div>
          </aside>
          <article class="mx-auto max-w-3xl">
            <div class="${UI.c.ring}" data-reveal="up"><div class="relative aspect-[16/9] overflow-hidden rounded-[15px] bg-night">${Art.cover(post.art, 'absolute inset-0 h-full w-full')}</div></div>
            ${paras}
            <div class="mt-10 rounded-2xl border border-seafoam/30 bg-seafoam/10 p-6" data-reveal="up">
              <h2 class="font-heading text-lg font-semibold text-pine">Key takeaways</h2>
              <ul class="mt-4 flex flex-col gap-3">${takeaways}</ul>
            </div>
            <div class="${UI.c.glassLight} mt-10 flex flex-col gap-5 p-5 sm:flex-row sm:items-center" data-reveal="up">
              <div class="h-24 w-24 flex-none overflow-hidden rounded-xl">${UI.photo('portrait', 'h-full w-full object-cover object-top')}</div>
              <div class="flex-1">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-seafoam-dark">Written by</p>
                <p class="mt-1 font-heading text-lg font-semibold text-pine">${doc.name}</p>
                <p class="text-sm text-pine/80">${doc.title}</p>
              </div>
              <a href="appointment.html" class="${UI.c.btnDark}">Book appointment</a>
            </div>
            <div class="mt-8 flex flex-wrap items-center gap-3 xl:hidden">
              <span class="mr-1 text-xs font-semibold uppercase tracking-wider text-pine">Share</span>${shareLinks()}
            </div>
            <div class="mt-10 grid gap-4 sm:grid-cols-2">${navCard(prev, 'prev')}${navCard(next, 'next')}</div>
          </article>
        </div>
      </div>
    </section>
    <section class="${UI.c.sectionDark}" aria-labelledby="related-title">
      <div class="${UI.c.container}">
        <div id="related-head"></div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${related.map((p, i) => UI.postCard(p, i)).join('')}</div>
      </div>
    </section>`);
  mount('#related-head', UI.sectionHead({ eyebrow: 'Keep reading', title: 'Related articles' }));
  const rh = $('#related-head h2');
  if (rh) rh.id = 'related-title';

  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      UI.toast('Link copied to clipboard', 'success');
    } catch (e) {
      UI.toast('Could not copy the link', 'error');
    }
  }));
})();
