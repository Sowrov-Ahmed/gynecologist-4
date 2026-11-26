# Part 4: Chambers, Contact, Terms

## Files delivered
- `chambers.html`: chambers page shell with containers.
- `assets/js/pages/chambers.js`: header, tabs, detail panel, weekly table.
- `contact.html`: contact page shell (`data-no-cta`).
- `assets/js/pages/contact.js`: header, info rows, form, map tabs.
- `terms.html`: Terms & Conditions page shell.
- `assets/js/pages/terms.js`: header, contents list, 10 sections, scroll-spy.
- `docs/PART-4-CHAMBERS-CONTACT-TERMS.md`: this file.

## Pages
**Chambers** (`data-page="chambers"`): `#page-head`, `#locations` (`#chamber-tabs`, `#chamber-panel`), `#schedule` (`#sched-head`, `#sched-table`). Reads hash `#banani|#mohammadpur|#khulshi`; tab choice updates the hash.
**Contact** (`data-page="contact"`, no CTA): `#page-head`, `#reach` (`#reach-info`, `#reach-form`, form `#contact-form`, fields `#c-name #c-phone #c-email #c-subject #c-message`, counter `#c-count`, success `#form-done`, `#send-another`), `#map-section` (`#map-head`, `#map-tabs`, `#map-panel`). No query inputs.
**Terms** (`data-page="terms"`): `#page-head` (Print button `#print-btn`), `#legal` (`#toc`, `#legal-body`, sections `#s1`..`#s10`). Uses the shared legal layout spec.

## Kit APIs used
`SITE.doctor`, `SITE.chambers`; `UI.c`, `UI.icon`, `UI.mount`, `UI.pageHeader`, `UI.sectionHead`, `UI.nextOpening`, `UI.todayStatus`, `UI.money`, `UI.time12`, `UI.url.appointment`, `UI.validate.phone|email`, `UI.setError`, `UI.toast`.

## Links this part expects other parts to provide
`appointment.html?chamber=ID` (Book here). Header, footer and CTA come from the kit. Footer may link to `terms.html`; `privacy.html` is Member 5's.

## Interactions and edge cases handled
- Chamber tabs: click, arrow keys, deep-link hash, hashchange, fade between panels, `aria-selected` kept in sync.
- Schedule: Saturday to Friday rows, today highlighted with a mint left border and badge, dash for closed days, table scrolls inside its own wrapper.
- Contact form: trimmed validation, error focus, live 500 counter, inline success panel with toast, reset via Send another.
- Map tabs swap a lazy iframe; WhatsApp link accepts a full URL or a bare number.
- Terms: scroll-spy via IntersectionObserver (graceful without it), mobile chip row follows active section.
- Every container lookup is guarded; one missing element does not stop other blocks.

## Merge notes
No shared kit file was created or edited. Ids are page-local; no new localStorage keys are used. Only the files listed above were created.

## QA checklist
- [x] Exact skeleton, correct `data-page`, one `<h1>` (from `UI.pageHeader`)
- [x] No `<style>`, `style=""`, `href="#"`, breadcrumbs or placeholder wording
- [x] Dark sections use dark tokens, cream sections use light variants
- [x] Dynamic blocks rendered through `UI.mount`
- [x] Queried ids exist in the HTML or are guarded
- [x] Content from `window.SITE`; fees in ৳; exact hrefs
- [x] Overflow contained (orbs inside `overflow-hidden`, tables in `overflow-x-auto`)
- [x] 44px touch targets and visible focus states
