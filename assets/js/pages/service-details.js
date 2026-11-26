(() => {
  const $ = s => document.querySelector(s);
  const root = $('#service-root');
  if (!root || !window.SITE || !window.UI) return;
  const c = UI.c, D = SITE.doctor;
  const slug = UI.url.param('slug');
  const s = slug ? UI.find.service(slug) : null;
  const setMeta = (t, d) => {
    document.title = t + ' | Dr. Imran Chowdhury';
    const m = $('meta[name="description"]');
    if (m) m.setAttribute('content', d);
  };
  const grad = t => `<span class="${c.gradientText}">${t}</span>`;

  if (!s) {
    setMeta('Service not found', 'This service could not be found. Browse all services by Dr. Imran Chowdhury.');
    UI.mount(root, UI.pageHeader({ eyebrow: 'Service', title: 'Service ' + grad('not found'), text: 'The service you opened is not available. It may have been renamed or the link may be incomplete.', photo: null }) +
      `<section class="${c.sectionLight} ${c.diagTop}"><div class="${c.container}"><div class="${c.glassLight} mx-auto max-w-xl p-8 text-center">
        <span class="${c.iconWrapLight}">${UI.icon('search', 'h-5 w-5')}</span>
        <h2 class="${c.h2Light} mt-5">Choose from our six services</h2>
        <p class="mt-3 text-pine/80">Every service has its own page with details, fees and booking.</p>
        <a href="services.html" class="${c.btnDark} mt-6">${UI.icon('arrow-left', 'h-4 w-4')} Back to services</a></div></div></section>`);
    return;
  }

  setMeta(s.title, s.short);
  const others = SITE.services.filter(x => x.slug !== s.slug);
  const idx = SITE.services.findIndex(x => x.slug === s.slug);
  const related = [1, 2, 3].map(n => SITE.services[(idx + n) % SITE.services.length]);

  const header = UI.pageHeader({
    eyebrow: 'Service', title: s.title, text: s.short, photo: null,
    actions: `<div class="flex flex-wrap gap-3"><a href="${UI.url.appointment({ service: s.slug })}" class="${c.btnPrimary}">Book this service ${UI.icon('arrow-right', 'h-4 w-4')}</a><a href="${D.phoneHref}" class="${c.btnGlass}">${UI.icon('phone', 'h-4 w-4')} Call ${D.phone}</a></div>`
  });

  const main = `<div class="min-w-0">
    <div class="${c.ring}" data-reveal="up"><div class="relative h-56 overflow-hidden rounded-2xl bg-night sm:h-80">${Art.cover(s.art, 'h-full w-full')}</div></div>
    <h2 class="${c.h2Light} mt-10">Overview</h2>
    <p class="${c.leadLight} mt-4">${s.overview}</p>
    <div class="${c.glassLight} mt-8 p-6" data-reveal="up">
      <h3 class="${c.h3Light}">What's included</h3>
      <ul class="mt-4 grid gap-3 sm:grid-cols-2">${s.includes.map(x => `<li class="flex items-start gap-2.5 text-sm text-pine/80"><span class="mt-0.5 text-seafoam-dark">${UI.icon('check', 'h-5 w-5')}</span>${x}</li>`).join('')}</ul>
    </div>
    <h3 class="${c.h3Light} mt-8">Suitable for</h3>
    <div class="mt-3 flex flex-wrap gap-2">${s.suitableFor.map(x => `<span class="${c.chipLight}">${UI.icon('check', 'h-3.5 w-3.5')}${x}</span>`).join('')}</div>
    <h3 class="${c.h3Light} mt-10">How it works</h3>
    <ol class="mt-4 grid gap-4 sm:grid-cols-3">${s.process.map((p, i) => `<li class="${c.glassLight} p-5" data-reveal="up" data-delay="${i * 120}"><span class="font-heading text-3xl font-bold text-seafoam-dark">0${i + 1}</span><h4 class="${c.h3Light} mt-3">${p.t}</h4><p class="mt-2 text-sm text-pine/80">${p.d}</p></li>`).join('')}</ol>
  </div>`;

  const side = `<aside class="min-w-0 space-y-6 lg:self-start">
    <div class="rounded-2xl bg-night"><div class="${c.glassStrong} p-6 text-white">
      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-mint">Starting fee</p>
      <p class="mt-2 font-heading text-3xl font-bold text-white">${s.fee}</p>
      <p class="mt-2 flex items-center gap-2 text-sm text-mist">${UI.icon('clock', 'h-4 w-4')} ${s.duration}</p>
      <ul class="mt-5 space-y-3 border-t border-white/10 pt-5">${SITE.chambers.map(ch => `<li><a href="${UI.url.chamber(ch.id)}" class="block rounded-lg transition duration-300 hover:text-mint"><span class="block text-sm font-semibold text-white">${ch.name}, ${ch.area}</span><span class="block text-xs text-mist">${ch.days.join(', ')} &middot; New patient ${UI.money(ch.fee.new)}</span></a></li>`).join('')}</ul>
      <a href="${UI.url.appointment({ service: s.slug })}" class="${c.btnPrimary} mt-6 w-full">Book this service ${UI.icon('arrow-right', 'h-4 w-4')}</a>
    </div></div>
    <div class="${c.glassLight} p-6"><h3 class="${c.h3Light}">Other services</h3>
      <ul class="mt-3 divide-y divide-pine/10">${others.map(o => `<li><a href="${UI.url.service(o.slug)}" class="flex min-h-[44px] items-center justify-between gap-3 py-2 text-sm font-medium text-pine transition duration-300 hover:text-seafoam-dark">${o.title}${UI.icon('chevron-right', 'h-4 w-4')}</a></li>`).join('')}</ul></div>
  </aside>`;

  UI.mount(root, header +
    `<section class="${c.sectionLight} ${c.diagTop}"><div class="${c.container}"><div class="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">${main}${side}</div></div></section>` +
    `<section class="${c.sectionDark}"><div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-orb rounded-full bg-mint/15 blur-3xl" aria-hidden="true"></div><div class="relative ${c.container}">${UI.sectionHead({ eyebrow: 'Related', title: 'Other services' })}<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${related.map((r, i) => UI.serviceCard(r, i)).join('')}</div></div></section>`);
})();
