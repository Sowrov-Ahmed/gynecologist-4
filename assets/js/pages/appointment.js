(() => {
  const $ = s => document.querySelector(s);
  const setHTML = (s, h) => { const el = $(s); if (el) UI.mount(el, h); };
  if (!window.SITE || !window.UI || !$('#panel')) return;
  const c = UI.c, D = SITE.doctor, MAXDAYS = 90;
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); if (!m) return null; const d = new Date(+m[1], +m[2] - 1, +m[3]); return d.getMonth() === +m[2] - 1 ? d : null; };
  const now0 = new Date();
  const today = new Date(now0.getFullYear(), now0.getMonth(), now0.getDate());
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + MAXDAYS);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const mins = t => { if (typeof t === 'number') return t > 24 ? t : t * 60; const [h, m] = String(t).split(':').map(Number); return h * 60 + (m || 0); };
  const hhmm = m => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  const hash = str => { let h = 7; for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const fmtDate = (s, long) => { const d = parse(s); return d ? d.toLocaleDateString('en-GB', { weekday: long ? 'long' : 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '—'; };
  const STEPS = ['Service', 'Chamber', 'Date', 'Time', 'Details'];
  const TITLES = ['Choose a service', 'Choose a chamber', 'Pick a date', 'Pick a time', 'Your details'];

  const state = { step: 0, max: 0, service: '', chamber: '', date: '', time: '', name: '', phone: '', age: '', visit: 'new', note: '', cur: null };
  const svc = () => SITE.services.find(s => s.slug === state.service);
  const ch = () => SITE.chambers.find(x => x.id === state.chamber);
  const fee = () => { const x = ch(); return x ? x.fee[state.visit === 'new' ? 'new' : 'followup'] : null; };
  const dateOk = (s, x) => { const d = parse(s); return !!(d && x && d >= today && d <= maxDate && x.weekdays.includes(d.getDay())); };
  const firstAvail = x => { for (let i = 0; i <= MAXDAYS; i++) { const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i); if (x.weekdays.includes(d.getDay())) return d; } return today; };

  const slots = () => {
    const x = ch(); if (!x || !state.date) return [];
    const n = new Date(), nm = n.getHours() * 60 + n.getMinutes(), isToday = state.date === iso(today), out = [];
    for (let m = mins(x.start), i = 0; m + x.slotMin <= mins(x.end); m += x.slotMin, i++)
      out.push({ t: hhmm(m), booked: hash(state.date + x.id + i) % 100 < 30, past: isToday && m <= nm });
    return out;
  };

  const stepError = i => {
    if (i === 0 && !svc()) return 'Please choose a service to continue.';
    if (i === 1 && !ch()) return 'Please choose a chamber to continue.';
    if (i === 2 && !dateOk(state.date, ch())) return 'Please select an available date.';
    if (i === 3 && !slots().some(s => s.t === state.time && !s.booked && !s.past)) return 'Please select an available time slot.';
    return '';
  };

  const checkDetails = () => {
    const f = { name: $('#ap-name'), phone: $('#ap-phone'), age: $('#ap-age') };
    const age = +state.age;
    const errs = {
      name: state.name.trim().length < 2 ? 'Enter your full name.' : '',
      phone: UI.validate.phone(state.phone) ? '' : 'Enter a valid Bangladesh mobile number, for example 01712 345678.',
      age: Number.isInteger(age) && age >= 1 && age <= 100 ? '' : 'Enter an age between 1 and 100.'
    };
    let first = null;
    Object.keys(errs).forEach(k => { if (f[k]) UI.setError(f[k], errs[k]); if (errs[k] && !first) first = f[k]; });
    if (first) first.focus();
    return !first;
  };

  const optCard = (on, key, attr, inner) => `<button type="button" ${attr}="${key}" aria-pressed="${on}" class="flex w-full min-h-[44px] items-start gap-4 p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 ${on ? c.glassStrong + ' ring-2 ring-mint' : c.glass + ' hover:-translate-y-0.5 hover:bg-white/10'}">${inner}</button>`;

  const stepBody = () => {
    const x = ch();
    if (state.step === 0) return `<div class="grid gap-3 sm:grid-cols-2">${SITE.services.map((s, i) => optCard(s.slug === state.service, s.slug, 'data-service',
      `<span class="font-heading text-sm font-bold text-mint">0${i + 1}</span><span class="min-w-0"><span class="block text-sm font-semibold text-white">${s.title}</span><span class="mt-1 block text-xs text-mist">${s.duration} &middot; ${s.fee}</span></span>`)).join('')}</div>`;
    if (state.step === 1) return `<div class="grid gap-3">${SITE.chambers.map(k => optCard(k.id === state.chamber, k.id, 'data-chamber',
      `<span class="${c.iconWrap} shrink-0">${UI.icon('pin', 'h-5 w-5')}</span><span class="min-w-0"><span class="block text-sm font-semibold text-white">${k.name}, ${k.area}</span><span class="mt-1 block text-xs text-mist">${k.days.join(', ')} &middot; ${k.time}</span><span class="mt-1 block text-xs font-semibold text-mint">New ${UI.money(k.fee.new)} &middot; Follow-up ${UI.money(k.fee.followup)}</span></span>`)).join('')}</div>`;
    if (state.step === 2 && x) {
      if (!state.cur) { const d = parse(state.date) || firstAvail(x); state.cur = { y: d.getFullYear(), m: d.getMonth() }; }
      const { y, m } = state.cur, first = new Date(y, m, 1), len = new Date(y, m + 1, 0).getDate();
      const canPrev = y * 12 + m > today.getFullYear() * 12 + today.getMonth(), canNext = y * 12 + m < maxDate.getFullYear() * 12 + maxDate.getMonth();
      const nav = (d, on, ic, lbl) => `<button type="button" data-month="${d}" ${on ? '' : 'disabled'} aria-label="${lbl}" class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 disabled:cursor-not-allowed disabled:opacity-30">${UI.icon(ic, 'h-5 w-5')}</button>`;
      let cells = '<span></span>'.repeat(first.getDay());
      for (let d = 1; d <= len; d++) {
        const dt = new Date(y, m, d), k = iso(dt), ok = dateOk(k, x), sel = k === state.date;
        cells += `<button type="button" data-day="${k}" ${ok ? '' : 'disabled'} aria-pressed="${sel}" aria-label="${fmtDate(k, true)}${ok ? '' : ', unavailable'}" class="h-11 rounded-lg text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 ${sel ? 'bg-gradient-to-r from-mint to-seafoam font-bold text-pine' : ok ? 'border border-mint/30 bg-mint/10 font-semibold text-white hover:bg-mint/25' : 'cursor-not-allowed text-mist/35'}">${d}</button>`;
      }
      return `<div class="flex items-center justify-between gap-3">${nav(-1, canPrev, 'chevron-left', 'Previous month')}<p class="font-heading text-base font-semibold text-white" aria-live="polite">${first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>${nav(1, canNext, 'chevron-right', 'Next month')}</div>
        <div class="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-mist">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<span>${d}</span>`).join('')}</div>
        <div class="mt-2 grid grid-cols-7 gap-1">${cells}</div>
        <p class="mt-4 text-xs text-mist">${x.name} sees patients on ${x.days.join(', ')}. Only those days can be booked.</p>`;
    }
    if (state.step === 3) {
      const sl = slots();
      if (!sl.some(s => !s.booked && !s.past)) return '<p class="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-mist">No time slots are left on this date. Please go back and choose another day.</p>';
      return `<p class="mb-4 text-sm text-mist">${fmtDate(state.date, true)} &middot; ${x.name}</p><div class="grid grid-cols-3 gap-2 sm:grid-cols-4">${sl.map(s => {
        const off = s.booked || s.past, sel = s.t === state.time;
        return `<button type="button" data-time="${s.t}" ${off ? 'disabled' : ''} aria-pressed="${sel}" aria-label="${UI.time12(s.t)}${s.booked ? ', booked' : s.past ? ', passed' : ''}" class="min-h-[44px] rounded-lg px-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 ${sel ? 'bg-gradient-to-r from-mint to-seafoam font-bold text-pine' : off ? 'cursor-not-allowed border border-white/5 bg-white/[0.03] text-mist/35 line-through' : 'border border-white/15 bg-white/10 font-semibold text-white hover:bg-white/20'}">${UI.time12(s.t)}</button>`;
      }).join('')}</div><p class="mt-4 text-xs text-mist">Struck-through slots are already booked.</p>`;
    }
    const k = ch() || SITE.chambers[0];
    const radio = (v, t, f) => `<label class="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition duration-300 has-[:checked]:border-mint has-[:checked]:bg-mint/10"><input type="radio" name="ap-visit" value="${v}" ${state.visit === v ? 'checked' : ''} class="h-4 w-4 accent-mint"><span>${t}<span class="block text-xs text-mist">${UI.money(f)}</span></span></label>`;
    return `<div class="grid gap-5 sm:grid-cols-2">
      <div class="sm:col-span-2"><label class="${c.label}" for="ap-name">Full name</label><input id="ap-name" type="text" autocomplete="name" maxlength="60" class="${c.input}" value="${esc(state.name)}"></div>
      <div><label class="${c.label}" for="ap-phone">Mobile number</label><input id="ap-phone" type="tel" inputmode="tel" autocomplete="tel" class="${c.input}" value="${esc(state.phone)}"></div>
      <div><label class="${c.label}" for="ap-age">Age</label><input id="ap-age" type="number" inputmode="numeric" min="1" max="100" class="${c.input}" value="${esc(state.age)}"></div>
      <fieldset class="sm:col-span-2"><legend class="${c.label}">Visit type</legend><div class="grid gap-3 sm:grid-cols-2">${radio('new', 'New patient', k.fee.new)}${radio('followup', 'Follow-up within 30 days', k.fee.followup)}</div></fieldset>
      <div class="sm:col-span-2"><label class="${c.label}" for="ap-note">Note for the doctor (optional)</label><textarea id="ap-note" rows="3" maxlength="300" class="${c.input}">${esc(state.note)}</textarea></div></div>`;
  };

  const renderStepper = () => {
    const el = $('#stepper'); if (!el) return;
    el.innerHTML = STEPS.map((t, i) => {
      const cur = i === state.step, done = i < state.step && !stepError(i), locked = i > state.max;
      return `<li><button type="button" data-step="${i}" ${locked ? 'disabled' : ''} ${cur ? 'aria-current="step"' : ''} aria-label="Step ${i + 1}: ${t}" class="flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5 px-1 py-2 transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 disabled:cursor-not-allowed ${cur ? c.glassStrong + ' ring-2 ring-mint/60' : done ? c.glassMint : c.glass + ' opacity-60'}"><span class="font-heading text-sm font-bold ${cur || done ? 'text-mint' : 'text-mist'}">${done ? UI.icon('check', 'h-4 w-4') : i + 1}</span><span class="hidden text-xs font-semibold text-white sm:block">${t}</span></button></li>`;
    }).join('');
    const bar = $('#ap-progress'); if (bar) bar.style.width = ((state.step + 1) / 5 * 100) + '%';
  };

  const renderPanel = () => {
    const el = $('#panel'); if (!el) return;
    const last = state.step === 4;
    el.innerHTML = `<div class="animate-fade-in"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-mint">Step ${state.step + 1} of 5</p>
      <h2 id="ap-heading" tabindex="-1" class="mt-2 font-heading text-2xl font-bold text-white focus:outline-none">${TITLES[state.step]}</h2><div class="mt-6">${stepBody()}</div>
      <p id="ap-error" role="alert" class="mt-4 min-h-[1.25rem] text-sm font-medium text-rose-400"></p>
      <div class="mt-4 flex flex-wrap justify-between gap-3">${state.step > 0 ? `<button type="button" data-action="back" class="${c.btnGlass}">${UI.icon('arrow-left', 'h-4 w-4')} Back</button>` : '<span></span>'}
      ${last ? `<button type="button" data-action="confirm" class="${c.btnPrimary} lg:hidden">Confirm booking ${UI.icon('check', 'h-4 w-4')}</button>` : `<button type="button" data-action="next" class="${c.btnPrimary}">Next ${UI.icon('arrow-right', 'h-4 w-4')}</button>`}</div></div>`;
  };

  const renderTicket = () => {
    const el = $('#ticket'); if (!el) return;
    const row = (l, v) => `<div class="flex items-start justify-between gap-4 py-2.5 text-sm"><dt class="text-mist">${l}</dt><dd class="text-right font-semibold ${v ? 'text-white' : 'text-mist/50'}">${v || '—'}</dd></div>`;
    const x = ch(), f = fee();
    el.innerHTML = `<div class="${c.glassStrong} p-6"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-mint">Your appointment</p>
      <h3 class="mt-2 font-heading text-xl font-bold text-white">Dr. Imran Chowdhury</h3>
      <dl class="mt-4 divide-y divide-white/10 border-t border-white/10">${row('Service', svc() && svc().title)}${row('Chamber', x && x.name + ', ' + x.area)}${row('Date', state.date && fmtDate(state.date))}${row('Time', state.time && UI.time12(state.time))}${row('Visit', state.visit === 'new' ? 'New patient' : 'Follow-up')}</dl>
      <div class="mt-2 flex items-center justify-between border-t border-dashed border-white/25 pt-4"><span class="text-sm text-mist">Consultation fee</span><span class="font-heading text-2xl font-bold text-mint">${f == null ? '—' : UI.money(f)}</span></div>
      ${state.step === 4 ? `<button type="button" data-action="confirm" class="${c.btnPrimary} mt-5 w-full">Confirm booking ${UI.icon('check', 'h-4 w-4')}</button>` : '<p class="mt-4 text-xs text-mist">Complete the steps to confirm. Pay at the chamber by cash, bKash or Nagad.</p>'}</div>`;
  };

  const render = focus => {
    renderStepper(); renderPanel(); renderTicket();
    const t = focus === 'heading' ? $('#ap-heading') : focus ? $(focus) : null;
    if (t) t.focus();
  };

  const go = (i, focus) => { state.step = Math.max(0, Math.min(4, i)); state.max = Math.max(state.max, state.step); render(focus || 'heading'); };
  const next = () => {
    const e = stepError(state.step), box = $('#ap-error');
    if (e) { if (box) box.textContent = e; return; }
    go(state.step + 1);
  };

  const ics = b => {
    const s = parse(b.date), st = mins(b.time), en = st + (ch() ? ch().slotMin : 15);
    const dt = m => `${s.getFullYear()}${pad(s.getMonth() + 1)}${pad(s.getDate())}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
    const t = v => String(v).replace(/([,;])/g, '\\$1');
    const n = new Date(), stamp = `${n.getUTCFullYear()}${pad(n.getUTCMonth() + 1)}${pad(n.getUTCDate())}T${pad(n.getUTCHours())}${pad(n.getUTCMinutes())}00Z`;
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dr. Imran Chowdhury//Appointments//EN', 'BEGIN:VEVENT', `UID:${b.ref}@drimranchowdhury.com`, `DTSTAMP:${stamp}`, `DTSTART:${dt(st)}`, `DTEND:${dt(en)}`,
      `SUMMARY:${t('Consultation with Dr. Imran Chowdhury')}`, `LOCATION:${t(b.chamberName + ', ' + b.address)}`, `DESCRIPTION:${t(b.serviceTitle + ' (' + (b.visit === 'new' ? 'New patient' : 'Follow-up') + '). Reference ' + b.ref + '. Call ' + D.phone + ' to reschedule.')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  };

  const showSuccess = b => {
    const con = $('#console'), ok = $('#success'); if (!con || !ok) return;
    const row = (l, v) => `<div class="flex justify-between gap-4 py-2.5 text-sm"><dt class="text-mist">${l}</dt><dd class="text-right font-semibold text-white">${v}</dd></div>`;
    con.classList.add('hidden'); ok.classList.remove('hidden');
    UI.mount(ok, `<div class="${c.glassStrong} mx-auto max-w-2xl p-6 text-center sm:p-10">
      <div class="relative mx-auto h-20 w-20"><span class="absolute inset-0 animate-pulse-ring rounded-full bg-mint/40"></span><span class="relative flex h-20 w-20 animate-zoom-in items-center justify-center rounded-full bg-gradient-to-br from-mint to-seafoam text-pine">${UI.icon('check', 'h-10 w-10')}</span></div>
      <h2 id="ap-done" tabindex="-1" class="mt-6 font-heading text-3xl font-bold text-white focus:outline-none">Appointment confirmed</h2>
      <p class="mt-2 text-sm text-mist">Your booking reference</p><p class="mt-1 font-heading text-2xl font-bold tracking-widest text-mint">${b.ref}</p>
      <dl class="mt-6 divide-y divide-white/10 border-y border-white/10 text-left">${row('Patient', esc(b.name))}${row('Service', b.serviceTitle)}${row('Chamber', b.chamberName + ', ' + b.area)}${row('Date', fmtDate(b.date))}${row('Time', UI.time12(b.time))}${row('Fee', UI.money(b.fee))}</dl>
      <p class="mt-5 text-sm text-mist">A confirmation SMS will reach you within 2 hours. Questions? Call <a href="${D.phoneHref}" class="font-semibold text-mint">${D.phone}</a>.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3"><button type="button" data-action="ics" class="${c.btnPrimary}">${UI.icon('calendar-check', 'h-4 w-4')} Add to calendar</button><button type="button" data-action="again" class="${c.btnGlass}">Book another</button></div></div>`);
    const h = $('#ap-done'); if (h) h.focus();
    ok._booking = b;
  };

  const confirm = () => {
    for (let i = 0; i < 4; i++) { const e = stepError(i); if (e) { go(i); const box = $('#ap-error'); if (box) box.textContent = e; return; } }
    if (state.step !== 4) { go(4); return; }
    if (!checkDetails()) return;
    const x = ch(), s = svc();
    const b = { ref: `SH-${pad(today.getFullYear() % 100)}${pad(today.getMonth() + 1)}-${1000 + Math.floor(Math.random() * 9000)}`, service: s.slug, serviceTitle: s.title, chamber: x.id, chamberName: x.name, area: x.area, address: x.address, date: state.date, time: state.time, name: state.name.trim(), phone: state.phone.trim(), age: +state.age, visit: state.visit, fee: fee(), note: state.note.trim(), createdAt: new Date().toISOString() };
    try { localStorage.setItem('sh_last_booking', JSON.stringify(b)); } catch (e) { /* storage unavailable */ }
    showSuccess(b); UI.toast('Appointment confirmed', 'success');
  };

  const reset = () => {
    Object.assign(state, { step: 0, max: 0, service: '', chamber: '', date: '', time: '', age: '', visit: 'new', note: '', cur: null });
    const ok = $('#success'), con = $('#console');
    if (ok) { ok.classList.add('hidden'); ok.innerHTML = ''; }
    if (con) con.classList.remove('hidden');
    render('heading');
  };

  const wizard = $('#wizard');
  if (wizard) {
    wizard.addEventListener('click', e => {
      const t = e.target.closest('button'); if (!t) return;
      const d = t.dataset;
      if (d.service) { state.service = d.service; render(`[data-service="${d.service}"]`); }
      else if (d.chamber) {
        if (state.chamber !== d.chamber) { state.chamber = d.chamber; state.cur = null; if (!dateOk(state.date, ch())) { state.date = ''; state.time = ''; } }
        render(`[data-chamber="${d.chamber}"]`);
      }
      else if (d.day) { if (state.date !== d.day) state.time = ''; state.date = d.day; render(`[data-day="${d.day}"]`); }
      else if (d.time) { state.time = d.time; render(`[data-time="${d.time}"]`); }
      else if (d.month) { const m = state.cur.m + +d.month; state.cur = { y: state.cur.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 }; render(`[data-month="${d.month}"]`); }
      else if (d.step) go(+d.step);
      else if (d.action === 'next') next();
      else if (d.action === 'back') go(state.step - 1);
      else if (d.action === 'confirm') confirm();
    });
    wizard.addEventListener('input', e => {
      const id = e.target.id, v = e.target.value;
      const map = { 'ap-name': 'name', 'ap-phone': 'phone', 'ap-age': 'age', 'ap-note': 'note' };
      if (map[id]) { state[map[id]] = v; if (id !== 'ap-note') UI.setError(e.target, ''); }
      else if (e.target.name === 'ap-visit') { state.visit = v; renderTicket(); }
    });
  }
  const ticket = $('#ticket');
  if (ticket) ticket.addEventListener('click', e => { if (e.target.closest('[data-action="confirm"]')) confirm(); });
  const ok = $('#success');
  if (ok) ok.addEventListener('click', e => {
    const a = e.target.closest('[data-action]'); if (!a) return;
    if (a.dataset.action === 'again') reset();
    else if (a.dataset.action === 'ics' && ok._booking) {
      const url = URL.createObjectURL(new Blob([ics(ok._booking)], { type: 'text/calendar;charset=utf-8' }));
      const l = document.createElement('a'); l.href = url; l.download = `appointment-${ok._booking.ref}.ics`;
      document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  });

  setHTML('#page-head', UI.pageHeader({
    eyebrow: 'Appointment',
    title: 'Book your <span class="bg-gradient-to-r from-mint via-mint-soft to-seafoam bg-clip-text text-transparent">consultation</span>',
    text: 'Choose a service, chamber, date and time in five quick steps. You will receive an SMS confirmation after booking.',
    photo: 'reception'
  }));

  const q = UI.url.param;
  if (q('service') && UI.find.service(q('service'))) state.service = q('service');
  if (q('chamber') && UI.find.chamber(q('chamber'))) state.chamber = q('chamber');
  if (state.chamber && dateOk(q('date'), ch())) state.date = q('date');
  state.name = q('name') || '';
  state.phone = q('phone') || '';
  if (!state.name) { try { const u = JSON.parse(localStorage.getItem('sh_user') || 'null'); if (u && u.name) state.name = u.name; } catch (e) { /* ignore */ } }
  let start = 0; while (start < 3 && !stepError(start)) start++;
  state.step = state.max = start;
  render();
})();
