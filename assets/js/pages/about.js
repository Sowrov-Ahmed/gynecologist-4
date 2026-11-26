(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI) return;
  const D = SITE.doctor, c = UI.c, ic = UI.icon;
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';

  mount('#page-head', UI.pageHeader({
    eyebrow: 'About the doctor',
    title: `Meet <span class="${grad}">Dr. Imran Chowdhury</span>`,
    text: D.bio[0],
    photo: 'cutout',
    actions: `<div class="flex flex-wrap gap-3"><a href="appointment.html" class="${c.btnPrimary}">${ic('calendar-check', 'h-5 w-5')} Book Appointment</a><a href="${D.phoneHref}" class="${c.btnGlass}">${ic('phone', 'h-5 w-5')} Call ${D.phone}</a></div>`
  }));

  const values = D.values.map((v, i) => `
    <li class="${c.glassLight} flex gap-4 p-5" data-reveal="up" data-delay="${i * 100}">
      <span class="${c.iconWrapLight} shrink-0">${ic(v.icon, 'h-6 w-6')}</span>
      <div>
        <p class="text-xs font-bold tracking-[0.22em] text-seafoam-dark">0${i + 1}</p>
        <h3 class="${c.h3Light}">${v.title}</h3>
        <p class="mt-1 text-sm leading-relaxed text-pine/80">${v.text}</p>
      </div>
    </li>`).join('');
  const members = D.memberships.map(m => `<li class="flex items-start gap-2 text-sm text-pine/80"><span class="mt-0.5 shrink-0 text-seafoam-dark">${ic('check', 'h-4 w-4')}</span>${m}</li>`).join('');
  const tags = D.expertise.map(e => `<li class="${c.chipLight}">${e}</li>`).join('');

  mount('#about-profile', `
  <section class="${c.sectionLight} ${c.diagTop}" aria-labelledby="profile-title">
    <div class="${c.container}">
      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div class="lg:sticky lg:top-28 lg:col-span-5" data-reveal="left">
          <div class="${c.ring}">
            <div class="relative aspect-[4/5] overflow-hidden rounded-[15px] bg-pine sm:aspect-[4/3] lg:aspect-[4/5]">
              <div class="absolute -inset-y-[10%] inset-x-0" data-parallax="0.1">${UI.photo('listening', 'h-full w-full object-cover')}</div>
              <div class="${c.glassLightStrong} absolute inset-x-4 bottom-4 flex items-start gap-3 p-4">
                <span class="shrink-0 text-seafoam-dark">${ic('quote', 'h-6 w-6')}</span>
                <p class="text-sm font-medium leading-relaxed text-pine">Every patient deserves to understand her diagnosis and every step of her care in plain words.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7">
          <div id="profile-title">${UI.sectionHead({ eyebrow: 'Philosophy', title: 'How he practises', light: true })}</div>
          <ul class="mt-8 flex flex-col gap-4">${values}</ul>
          <div class="mt-10 grid gap-8 sm:grid-cols-2">
            <div data-reveal="up">
              <h3 class="${c.h3Light}">Memberships</h3>
              <ul class="mt-4 flex flex-col gap-2.5">${members}</ul>
            </div>
            <div data-reveal="up" data-delay="100">
              <h3 class="${c.h3Light}">Expertise</h3>
              <ul class="mt-4 flex flex-wrap gap-2">${tags}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`);

  const timeline = (title, icon, rows, offset) => `
    <div class="${c.glass} p-6 sm:p-8">
      <div class="flex items-center gap-3"><span class="${c.iconWrap}">${ic(icon, 'h-6 w-6')}</span><h3 class="${c.h3}">${title}</h3></div>
      <ol class="mt-8">
        ${rows.map((r, i) => `
        <li class="flex" data-reveal="${(i + offset) % 2 ? 'right' : 'left'}" data-delay="${i * 80}">
          <p class="w-16 shrink-0 pt-0.5 font-heading text-sm font-bold text-mint">${r.year}</p>
          <div class="relative min-w-0 pl-6 ${i < rows.length - 1 ? 'pb-7' : ''}">
            <span class="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-mint via-seafoam to-transparent"></span>
            <span class="absolute -left-[4px] top-1.5 h-[9px] w-[9px] rounded-full bg-mint ring-4 ring-mint/20"></span>
            <p class="font-semibold text-white">${r.title}</p>
            <p class="text-sm text-mist">${r.place}</p>
          </div>
        </li>`).join('')}
      </ol>
    </div>`;

  mount('#about-career', `
  <section class="${c.sectionDark}" aria-labelledby="career-title">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-mint/20 blur-3xl animate-orb"></div>
    <div class="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-seafoam/20 blur-3xl animate-orb"></div>
    <div class="${c.container} relative">
      <div id="career-title">${UI.sectionHead({ eyebrow: 'Career', title: 'Experience & education' })}</div>
      <div class="mt-10 grid gap-6 lg:grid-cols-2">
        ${timeline('Experience', 'award', D.experienceList, 0)}
        ${timeline('Education', 'file-text', D.education, 1)}
      </div>
    </div>
  </section>`);

  const S = D.stats;
  const tiles = [
    [S.experience, '+', 'Years of experience', 'calendar'],
    [S.patients, '+', 'Patients treated', 'users'],
    [S.deliveries, '+', 'Safe births', 'heart'],
    [S.surgeries, '+', 'Surgeries performed', 'scissors'],
    [S.publications, '', 'Publications', 'file-text']
  ].map((t, i) => `
    <div class="${c.glassStrong} p-6" data-reveal="up" data-delay="${i * 80}">
      <span class="text-mint">${ic(t[3], 'h-6 w-6')}</span>
      <p class="mt-3 font-heading text-4xl font-bold text-white"><span data-count="${t[0]}" data-suffix="${t[1]}" data-decimals="0">0</span></p>
      <p class="mt-1 text-sm text-mist">${t[2]}</p>
    </div>`).join('');

  mount('#about-numbers', `
  <section class="relative overflow-hidden py-20 sm:py-24 ${UI.bgFixed('reception')}" aria-labelledby="numbers-title">
    <div class="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-night/60"></div>
    <div class="${c.container} relative">
      <div id="numbers-title">${UI.sectionHead({ eyebrow: 'In numbers', title: 'Fifteen years of trusted care' })}</div>
      <div class="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
        ${tiles}
        <div class="${c.glassStrong} p-6" data-reveal="up" data-delay="400">
          <span class="text-mint">${ic('star', 'h-6 w-6')}</span>
          <p class="mt-3 font-heading text-4xl font-bold text-white"><span data-count="${S.rating}" data-decimals="1">0</span></p>
          <div class="mt-1 flex items-center gap-2 text-sm text-mist"><span class="text-amber-400">${UI.stars(S.rating)}</span><span>${S.reviews.toLocaleString('en-US')} reviews</span></div>
        </div>
      </div>
    </div>
  </section>`);
})();
