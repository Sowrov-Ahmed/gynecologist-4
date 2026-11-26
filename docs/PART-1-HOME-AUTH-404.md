# Part 1: Home, Sign-in/Sign-up, 404

## Files delivered
- `index.html`: Home page (hero as static HTML, six shells filled by script).
- `assets/js/pages/index.js`: renders Home sections 2 to 7, hero stats and booking dock.
- `auth.html`: Sign-in / Create account page with underline tabs.
- `assets/js/pages/auth.js`: tabs, reset view, validation, strength meter, session storage.
- `404.html`: not-found page (no page script).
- `docs/PART-1-HOME-AUTH-404.md`: this file.

## Pages
**Home** (`data-page="home"`): 7 sections.
1. `#hero` (ids `hero-status`, `hero-grid`, `hero-stat-1..3`, `dock`, `dock-chamber`, `dock-service`, `dock-date`, `dock-go`, `hero-call`)
2. `#about` (`about-body`) 3. `#services` (`services-body`) 4. `#chambers` (`chambers-body`)
5. `#appointment` (`appointment-body`, fixed parallax band applied via `UI.bgFixed`)
6. `#stories` (`stories-body`, duplicated marquee track, copy is `inert`)
7. `#journal` (`journal-body`, `faq-head`, `home-faq`, `faq-link`)
JS hooks: `[data-icon]` placeholders, `data-count`, `data-reveal`, `data-parallax`, `data-mouse`, `data-tilt`. Inputs read: none.

**Auth** (`data-page="auth"`, `data-no-cta`): ids `auth-grid`, `auth-photo`, `tab-signin`, `tab-signup`, `tab-bar`, `panel-signin`, `panel-signup`, `signin-form`, `reset-form`, `signup-form`, `si-*`, `su-*`, `rs-email`, `go-reset`, `back-signin`. Reads `?mode=signup`. Writes `localStorage.sh_user = {name,email}`, then redirects to `index.html` after 1.2s.

**404** (`data-page="notfound"`, `data-no-cta`, `noindex`): static; inline SVG grid, glow orbs, four quick links.

## Kit APIs used
`SITE` (doctor, chambers, services, posts, testimonials, faqs), `UI.c`, `UI.icon`, `UI.stars`, `UI.sectionHead`, `UI.serviceCard`, `UI.chamberCard`, `UI.postCard`, `UI.testimonialCard`, `UI.faqAccordion`, `UI.mount`, `UI.photo`, `UI.bgFixed`, `UI.todayStatus`, `UI.nextOpening`, `UI.url.*`, `UI.formatDate`, `UI.validate`, `UI.setError`, `UI.toast`, `Art.grid`, `Art.cover`.

## Links this part expects other parts to provide
`about.html`, `services.html`, `chambers.html`, `contact.html`, `blog.html`, `faqs.html`, `testimonials.html`, `terms.html`, `privacy.html`, `appointment.html` (accepts `?chamber=&service=&date=`), `blog-details.html?slug=`.

## Interactions and edge cases handled
- Null-safe DOM helpers; each Home section renders in its own try/catch.
- Booking dock keeps its link in sync; past dates are ignored; Enter submits.
- Tabs support click and arrow/Home/End keys; reset view swaps in place; focus moves to first invalid field.
- Password show/hide, 4-segment strength meter (rose to mint), confirm match, terms error.
- Submit buttons are disabled with a spinner while submitting.
- Name derived from email local part when signing in; mobile sign-in stores an empty email.
- Storage failures are caught; marquee pauses on hover/focus; no horizontal overflow shells.

## Merge notes
No shared kit file was created or edited. Ids are scoped to this part's pages; the only storage key written is `sh_user`.

## QA checklist
- [x] Only the listed files created, exact names
- [x] Exact skeleton, one `<h1>` per page, correct `data-page`
- [x] No `<style>`, `style=""`, `href="#"`, breadcrumbs, remote images
- [x] Dark/cream contrast rules followed
- [x] Dynamic blocks rendered via `UI.mount`
- [x] All queried ids exist; no spacing utilities on the FAQ container
- [x] Exact cross-page hrefs
