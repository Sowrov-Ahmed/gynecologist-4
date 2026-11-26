(() => {
  const $ = s => document.querySelector(s);
  const mount = (s, h) => { if ($(s)) UI.mount(s, h); };
  if (!window.SITE || !window.UI || !$('#policy')) return;

  const d = SITE.doctor;
  const grad = 'bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent';
  const S = [
    ['Information we collect', ['We collect only what we need to care for you and manage your appointments.'],
      ['Your name, age and contact details', 'Appointment details such as chamber, date and reason for visit', 'Messages you send through our forms, email or WhatsApp', 'Basic device data when you browse this website']],
    ['How we use it', ['Your information is used to run our practice and look after you.'],
      ['Confirm, change or remind you of appointments by SMS or call', 'Reply to your questions and requests', 'Improve this website and our services']],
    ['Medical confidentiality', [`Your health information is confidential. Only ${d.name} and the treating team can see your clinical records.`, 'We never discuss your care with others unless you ask us to.']],
    ['Cookies and analytics', ['This website uses small cookies to remember your preferences, such as keeping you signed in.', 'We use simple, anonymous analytics to see which pages are useful. You can block cookies in your browser settings without losing access to the site.']],
    ['Sharing of information', ['We never sell your personal information.'],
      ['Shared only with the treating team, such as labs or the hospital where you are cared for', 'Disclosed when required by law or a medical authority', 'Shared with others only with your written consent']],
    ['Data security', ['We use access controls and secure systems to protect your information.', 'Paper records stay in locked storage at our chambers. No method of transmission over the internet is completely secure, so please avoid sending sensitive details by open message.']],
    ['Retention', ['Medical records are kept for as long as clinical practice and Bangladesh regulations require.', 'Enquiry messages that do not lead to treatment are deleted after 12 months.']],
    ['Your rights', ['You can ask us at any time to:'],
      ['See the personal information we hold about you', 'Correct anything that is wrong or out of date', 'Delete your information, where the law allows']],
    ["Children's privacy", ['This website is meant for adults. We collect information about a child only from a parent or legal guardian, and only for the child\'s care.', 'A parent can ask to see or delete their child\'s information at any time.']],
    ['Contact for privacy questions', ['For any privacy question or request, write to us or call during chamber hours.'],
      [`Email: <a href="mailto:${d.email}" class="font-semibold text-seafoam-dark underline underline-offset-4 hover:text-pine">${d.email}</a>`, `Phone: <a href="tel:${d.phoneHref || d.phone}" class="font-semibold text-seafoam-dark underline underline-offset-4 hover:text-pine">${d.phone}</a>`]]
  ];

  mount('#page-head', UI.pageHeader({
    eyebrow: 'Legal',
    title: 'Privacy <span class="' + grad + '">Policy</span>',
    text: 'Last updated: 1 November 2026',
    actions: `<div><button type="button" id="print-btn" class="${UI.c.btnGlass}">${UI.icon('printer', 'h-4 w-4')} Print</button></div>`
  }));
  const print = $('#print-btn');
  if (print) print.addEventListener('click', () => window.print());

  const bullet = 'relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:bg-seafoam';
  const pCls = 'mt-3 text-sm leading-relaxed text-pine/80 sm:text-base';
  const html = S.map(([t, ps, li], i) => `
    <section id="s${i + 1}" class="scroll-mt-28${i ? ' mt-8 border-t border-pine/10 pt-8' : ''}">
      <h2 class="font-heading text-xl font-semibold text-pine sm:text-2xl"><span class="text-seafoam-dark">${i + 1}.</span> ${t}</h2>
      ${ps.map(p => `<p class="${pCls}">${p}</p>`).join('')}
      ${li ? `<ul class="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-pine/80 sm:text-base">${li.map(x => `<li class="${bullet}">${x}</li>`).join('')}</ul>` : ''}
    </section>`).join('');
  mount('#policy', html);

  const off = 'text-pine/80 hover:bg-pine/5';
  const on = 'bg-gradient-to-r from-mint to-seafoam text-pine font-semibold';
  const list = $('#toc-list');
  if (list) list.innerHTML = S.map(([t], i) =>
    `<li><a href="#s${i + 1}" data-toc="s${i + 1}" class="flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/20 ${off}"><span class="font-heading text-xs font-semibold">${String(i + 1).padStart(2, '0')}</span>${t}</a></li>`).join('');
  const chips = $('#toc-chips');
  if (chips) chips.innerHTML = S.map(([t], i) =>
    `<a href="#s${i + 1}" data-toc="s${i + 1}" class="inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded-md border border-pine/10 bg-white/70 px-3 text-xs font-medium text-pine transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-seafoam/20">${i + 1}. ${t}</a>`).join('');

  const links = [...document.querySelectorAll('[data-toc]')];
  const activate = id => links.forEach(a => {
    const isOn = a.dataset.toc === id;
    on.split(' ').forEach(c => a.classList.toggle(c, isOn));
    if (a.closest('#toc-list')) off.split(' ').forEach(c => a.classList.toggle(c, !isOn));
    if (isOn) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
    if (isOn && a.closest('#toc-chips')) {
      const row = a.parentElement;
      if (row.scrollWidth > row.clientWidth) {
        row.scrollTo({ left: a.offsetLeft - (row.clientWidth - a.clientWidth) / 2, behavior: 'smooth' });
      }
    }
  });
  activate('s1');

  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('#policy > section')];
    const visible = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
      const current = sections.find(s => visible.has(s.id));
      if (current) activate(current.id);
    }, { rootMargin: '-15% 0px -70% 0px' });
    sections.forEach(s => io.observe(s));
  }
})();
