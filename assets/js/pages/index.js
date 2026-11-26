(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI) return;
  const { doctor: d, chambers, services, posts, testimonials, faqs } = window.SITE;
  const c = UI.c;
  const run = fn => { try { fn(); } catch (e) { console.error(e); } };
  const ico = (n, cls) => UI.icon(n, cls || 'h-4 w-4');
  const wa = /^https?:/.test(d.whatsapp) ? d.whatsapp : 'https://wa.me/' + String(d.whatsapp).replace(/\D/g, '');
  const reviews = d.stats.reviews.toLocaleString('en-US');
  const bodyWrap = 'relative ' + c.container;

  run(() => document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = ico(el.dataset.icon, el.dataset.cls); }));
  run(() => { if (window.Art) mount('#hero-grid', Art.grid('h-full w-full')); });

  run(() => {
    const st = $('#hero-status'); if (st) st.textContent = UI.todayStatus().text;
    const call = $('#hero-call'); if (call) call.href = d.phoneHref;
  });

  run(() => {
    const stats = [
      ['award', d.stats.experience, '+', 0, 'Years of experience'],
      ['users', d.stats.patients, '+', 0, 'Patients treated'],
      ['star', d.stats.rating, '', 1, 'Average rating']
    ];
    stats.forEach((s, i) => mount('#hero-stat-' + (i + 1), `
      <div class="${c.glassStrong} flex items-center gap-4 p-5" data-reveal="right" data-delay="${300 + i * 150}">
        <span class="${c.iconWrap}">${ico(s[0], 'h-6 w-6')}</span>
        <div><p class="font-heading text-3xl font-bold text-white"><span data-count="${s[1]}" data-suffix="${s[2]}" data-decimals="${s[3]}">${s[1].toLocaleString('en-US')}</span></p>
        <p class="text-xs font-semibold uppercase tracking-wider text-mist">${s[4]}</p></div>
      </div>`));
  });

  run(() => {
    const ch = $('#dock-chamber'), sv = $('#dock-service'), dt = $('#dock-date'), go = $('#dock-go');
    if (!ch || !sv || !dt || !go) return;
    const opt = 'class="bg-night text-white"';
    ch.innerHTML = `<option value="" ${opt}>Any chamber</option>` + chambers.map(x => `<option value="${x.id}" ${opt}>${x.name}, ${x.area}</option>`).join('');
    sv.innerHTML = `<option value="" ${opt}>Any service</option>` + services.map(x => `<option value="${x.slug}" ${opt}>${x.title}</option>`).join('');
    dt.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const sync = () => {
      const o = {};
      if (ch.value) o.chamber = ch.value;
      if (sv.value) o.service = sv.value;
      if (dt.value && dt.value >= dt.min) o.date = dt.value;
      go.href = UI.url.appointment(o);
    };
    [ch, sv, dt].forEach(el => el.addEventListener('change', sync));
    go.addEventListener('click', sync);
    $('#dock')?.addEventListener('submit', e => { e.preventDefault(); sync(); location.href = go.href; });
    sync();
  });

  run(() => mount('#about-body', `
    <div class="${bodyWrap} grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
      <div class="relative mx-auto w-full max-w-md pb-6 lg:mx-0">
        <div class="${c.ring}"><div class="relative aspect-[4/5] overflow-hidden rounded-[15px] bg-forest">
          <div class="absolute inset-0 scale-110" data-parallax="0.06">${UI.photo('portrait', 'h-full w-full object-cover')}</div></div></div>
        <div class="${c.glassLightStrong} absolute bottom-0 right-2 px-4 py-3 sm:-right-4" data-reveal="up">
          <p class="text-xs font-semibold uppercase tracking-wider text-seafoam-dark">BMDC Reg. ${d.bmdc}</p>
          <p class="mt-1 flex items-center gap-2 text-sm font-semibold text-pine">${UI.stars(d.stats.rating)} <span>${d.stats.rating} / ${reviews} reviews</span></p>
        </div>
      </div>
      <div>
        ${UI.sectionHead({ eyebrow: 'About the doctor', title: 'Meet ' + d.name, light: true })}
        <p class="${c.leadLight}" data-reveal="up">${d.bio[0]}</p>
        <ul class="mt-6 space-y-3">${d.points.map((p, i) => `<li class="flex items-start gap-3 text-pine/80" data-reveal="up" data-delay="${i * 100}"><span class="mt-0.5 text-seafoam-dark">${ico('check', 'h-5 w-5')}</span>${p}</li>`).join('')}</ul>
        <div class="mt-6 flex flex-wrap gap-2">${d.expertise.map(x => `<span class="${c.chipLight}">${x}</span>`).join('')}</div>
        <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">${[[d.stats.experience, '+', 'Years of practice'], [d.stats.patients, '+', 'Patients treated'], [d.stats.deliveries, '+', 'Births attended'], [d.stats.surgeries, '+', 'Surgeries']].map((s, i) => `
          <div class="${c.glassLight} p-4 text-center" data-reveal="up" data-delay="${i * 100}"><p class="font-heading text-2xl font-bold text-pine"><span data-count="${s[0]}" data-suffix="${s[1]}" data-decimals="0">${s[0].toLocaleString('en-US')}</span></p><p class="mt-1 text-xs font-medium text-pine/70">${s[2]}</p></div>`).join('')}</div>
        <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="about.html" class="${c.btnDark}">Know more ${ico('arrow-right')}</a>
          <a href="${d.phoneHref}" class="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-seafoam-dark transition hover:underline">${ico('phone')} ${d.phone}</a>
        </div>
      </div>
    </div>`));

  run(() => mount('#services-body', `
    <div class="${c.container}">
      ${UI.sectionHead({ eyebrow: 'Services', title: 'Specialist care for every stage' })}
      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${services.slice(0, 3).map((s, i) => `<div data-tilt="5">${UI.serviceCard(s, i)}</div>`).join('')}</div>
      <div class="mt-10"><a href="services.html" class="${c.btnGlass}">View all services ${ico('arrow-right')}</a></div>
    </div>`));

  run(() => mount('#chambers-body', `
    <div class="${c.container}">
      ${UI.sectionHead({ eyebrow: 'Chambers', title: 'Three convenient locations', light: true })}
      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${chambers.map((x, i) => UI.chamberCard(x, i, { compact: true, light: true })).join('')}</div>
      <div class="mt-10"><a href="chambers.html" class="${c.btnOutlineLight}">See all chambers ${ico('arrow-right')}</a></div>
    </div>`));

  run(() => {
    const sec = $('#appointment');
    if (sec) sec.classList.add(...UI.bgFixed('diagnostic').split(' ').filter(Boolean));
    const pts = ['Same-week slots across three chambers', 'Confirmation by SMS within minutes', 'Pay at the chamber by cash, bKash or Nagad'];
    mount('#appointment-body', `
    <div class="${c.container} grid items-center gap-12 lg:grid-cols-2">
      <div>
        ${UI.sectionHead({ eyebrow: 'Appointment', title: 'Same-week consultations, booked in a minute' })}
        <ul class="space-y-3">${pts.map((p, i) => `<li class="flex items-center gap-3 text-mist" data-reveal="left" data-delay="${i * 100}"><span class="text-mint">${ico('check', 'h-5 w-5')}</span>${p}</li>`).join('')}</ul>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="appointment.html" class="${c.btnPrimary}">Book online ${ico('arrow-right')}</a>
          <a href="${d.phoneHref}" class="${c.btnGlass}">${ico('phone')} Call</a>
          <a href="${wa}" target="_blank" rel="noopener" class="${c.btnGlass}">${ico('whatsapp')} WhatsApp</a>
        </div>
      </div>
      <div class="${c.glassStrong} p-6 sm:p-8" data-reveal="right">
        <h3 class="${c.h3}">Next available</h3>
        <ul class="mt-4 divide-y divide-white/10">${chambers.map((x, i) => `
          <li class="flex flex-wrap items-center justify-between gap-3 py-4" data-reveal="up" data-delay="${200 + i * 150}">
            <div><p class="font-heading font-semibold text-white">${x.name}</p><p class="text-sm text-mist">${x.area}</p></div>
            <div class="flex items-center gap-4"><span class="text-sm font-semibold text-mint">${UI.nextOpening(x).text}</span>
            <a href="${UI.url.appointment({ chamber: x.id })}" class="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20">Book<span class="sr-only"> at ${x.name}</span></a></div>
          </li>`).join('')}</ul>
      </div>
    </div>`);
  });

  run(() => {
    const cards = testimonials.map(t => `<div class="w-[22rem] shrink-0">${UI.testimonialCard(t, 0)}</div>`).join('');
    mount('#stories-body', `
    <div class="${c.container}">
      ${UI.sectionHead({ eyebrow: 'Patient stories', title: 'Trusted by thousands of women' })}
      <p class="flex flex-wrap items-center gap-2 text-sm font-medium text-mist">${UI.stars(d.stats.rating)} <span>${d.stats.rating} from ${reviews} reviews</span></p>
    </div>
    <div class="mt-10 overflow-hidden hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
      <div class="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        <div class="flex gap-5 pr-5">${cards}</div>
        <div class="flex gap-5 pr-5" aria-hidden="true" inert>${cards}</div>
      </div>
    </div>
    <div class="${c.container} mt-8"><a href="testimonials.html" class="${c.btnGlass}">Read all stories ${ico('arrow-right')}</a></div>`);
  });

  run(() => {
    const featured = [...posts].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))[0];
    mount('#journal-body', `
      <div class="mb-6">${UI.sectionHead({ eyebrow: 'Health journal', title: 'Latest articles', light: true })}</div>
      ${UI.postCard(featured, 0, { light: true })}
      <div class="mt-8"><a href="blog.html" class="${c.btnOutlineLight}">Read all articles ${ico('arrow-right')}</a></div>`);
  });

  run(() => {
    mount('#faq-head', `<div class="mb-6">${UI.sectionHead({ eyebrow: 'FAQs', title: 'Common questions', light: true })}</div>`);
    const box = $('#home-faq');
    if (box) UI.faqAccordion(box, faqs.slice(0, 5), { prefix: 'home-faq', light: true, openFirst: true });
    mount('#faq-link', `<a href="faqs.html" class="${c.btnOutlineLight}">More questions ${ico('arrow-right')}</a>`);
  });
})();
