(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const on = (s, ev, fn) => { const el = $(s); if (el) el.addEventListener(ev, fn); };
  if (!window.UI) return;
  const S = window.SITE;

  $$('[data-icon]').forEach(el => { el.innerHTML = UI.icon(el.dataset.icon, el.dataset.cls || 'h-5 w-5'); });
  if (window.Art) { const g = $('#auth-grid'); if (g) UI.mount(g, Art.grid('h-full w-full')); }
  if (S) {
    const ph = $('#auth-photo'); if (ph) UI.mount(ph, UI.photo('portrait', 'h-full w-full object-cover', { eager: true }));
    const n = $('#auth-name'); if (n) n.textContent = S.doctor.name;
    const r = $('#auth-role'); if (r) r.textContent = S.doctor.title;
  }

  const copy = {
    signin: ['Welcome back', 'Sign in to manage appointments and visit history.'],
    signup: ['Create your account', 'Book faster and keep your visit history in one place.'],
    reset: ['Reset your password', 'We will email you a secure link.']
  };
  const tabs = { signin: $('#tab-signin'), signup: $('#tab-signup') };
  let view = 'signin';

  function show(v) {
    view = v;
    const tab = v === 'signup' ? 'signup' : 'signin';
    Object.entries(tabs).forEach(([k, el]) => {
      if (!el) return;
      const sel = k === tab;
      el.setAttribute('aria-selected', sel);
      el.tabIndex = sel ? 0 : -1;
      el.classList.toggle('text-white', sel);
      el.classList.toggle('text-mist', !sel);
    });
    $('#tab-bar')?.classList.toggle('translate-x-full', tab === 'signup');
    $('#panel-signin')?.classList.toggle('hidden', tab !== 'signin');
    $('#panel-signup')?.classList.toggle('hidden', tab !== 'signup');
    $('#signin-form')?.classList.toggle('hidden', v === 'reset');
    $('#reset-form')?.classList.toggle('hidden', v !== 'reset');
    const t = $('#auth-title'), s = $('#auth-sub');
    if (t) t.textContent = copy[v][0];
    if (s) s.textContent = copy[v][1];
  }

  Object.entries(tabs).forEach(([k, el]) => {
    if (!el) return;
    el.addEventListener('click', () => show(k));
    el.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'ArrowLeft' || e.key === 'Home' ? 'signin' : 'signup';
      show(next); tabs[next]?.focus();
    });
  });
  on('#go-reset', 'click', () => { show('reset'); $('#rs-email')?.focus(); });
  on('#back-signin', 'click', () => { show('signin'); $('#si-id')?.focus(); });
  show(UI.url.param('mode') === 'signup' ? 'signup' : 'signin');

  $$('[data-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.toggle);
    if (!input) return;
    const hide = input.type === 'password';
    input.type = hide ? 'text' : 'password';
    btn.setAttribute('aria-pressed', hide);
    btn.setAttribute('aria-label', hide ? 'Hide password' : 'Show password');
    btn.innerHTML = UI.icon(hide ? 'eye-off' : 'eye', 'h-5 w-5');
  }));

  const score = v => {
    if (!v) return 0;
    const s = (v.length >= 8) + (/[a-z]/.test(v) && /[A-Z]/.test(v)) + /\d/.test(v) + /[^A-Za-z0-9]/.test(v);
    return Math.max(1, s);
  };
  const levels = [['Too weak', 'bg-rose-400'], ['Weak', 'bg-rose-300'], ['Good', 'bg-mint-soft'], ['Strong', 'bg-mint']];
  on('#su-pass', 'input', e => {
    const n = score(e.target.value), segs = $$('[data-seg]');
    segs.forEach((el, i) => {
      el.className = 'h-1.5 flex-1 rounded-full transition-colors duration-300 ' + (i < n ? levels[n - 1][1] : 'bg-white/10');
    });
    const out = $('#su-strength');
    if (out) out.textContent = n ? 'Password strength: ' + levels[n - 1][0] : 'Use 8+ characters with letters, numbers and a symbol.';
  });

  const val = {
    required: (el, msg) => { const ok = el && el.value.trim() !== ''; UI.setError(el, ok ? '' : msg); return ok; },
    email: el => { const ok = UI.validate.email(el.value.trim()); UI.setError(el, ok ? '' : 'Enter a valid email address'); return ok; },
    phone: el => { const ok = UI.validate.phone(el.value.trim()); UI.setError(el, ok ? '' : 'Enter a valid Bangladesh mobile number'); return ok; },
    pass: el => { const v = el.value, ok = v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v); UI.setError(el, ok ? '' : 'Use at least 8 characters with letters and numbers'); return ok; }
  };
  const busy = (form, on) => {
    const b = form.querySelector('button[type="submit"]'); if (!b) return;
    b.disabled = on;
    b.querySelector('[data-spin]')?.classList.toggle('hidden', !on);
  };
  const nameFrom = id => id.split('@')[0].split(/[._-]+/).filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join(' ') || 'Patient';
  const finish = (name, email) => {
    try { localStorage.setItem('sh_user', JSON.stringify({ name, email })); } catch (e) { /* storage unavailable */ }
    UI.toast('Welcome, ' + name.split(' ')[0] + '!', 'success');
    setTimeout(() => { location.href = 'index.html'; }, 1200);
  };
  const submit = (form, check, done, delay) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!check()) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
      busy(form, true);
      setTimeout(done, delay || 900);
    });
  };

  const si = $('#signin-form');
  if (si) submit(si, () => {
    const id = $('#si-id'), pw = $('#si-pass');
    const v = id.value.trim();
    const okId = v !== '' && (UI.validate.email(v) || UI.validate.phone(v));
    UI.setError(id, okId ? '' : 'Enter a valid email or mobile number');
    const okPw = val.required(pw, 'Enter your password');
    return okId && okPw;
  }, () => {
    const v = $('#si-id').value.trim(), isMail = UI.validate.email(v);
    finish(isMail ? nameFrom(v) : 'Patient', isMail ? v : '');
  });

  const rs = $('#reset-form');
  if (rs) submit(rs, () => val.email($('#rs-email')), () => {
    busy(rs, false); rs.reset(); show('signin');
    UI.toast('Reset link sent to your email', 'success');
  });

  const su = $('#signup-form');
  if (su) submit(su, () => {
    const terms = $('#su-terms'), err = $('#su-terms-err');
    const ok = [val.required($('#su-name'), 'Enter your full name'), val.phone($('#su-phone')), val.email($('#su-email')), val.pass($('#su-pass'))];
    const pw = $('#su-pass').value, cf = $('#su-confirm');
    const match = cf.value !== '' && cf.value === pw;
    UI.setError(cf, match ? '' : 'Passwords do not match');
    const agreed = terms.checked;
    err?.classList.toggle('hidden', agreed);
    return ok.every(Boolean) && match && agreed;
  }, () => finish($('#su-name').value.trim(), $('#su-email').value.trim()));
})();
