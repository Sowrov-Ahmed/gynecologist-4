# Part 3: Services, Service Details, Appointment

## Files delivered
- `services.html` / `assets/js/pages/services.js`: all services, vertical tab explorer, pathway and fee table.
- `service-details.html` / `assets/js/pages/service-details.js`: one service by `?slug=`, with sidebar and related services.
- `appointment.html` / `assets/js/pages/appointment.js`: five-step booking wizard, ticket and success state.
- `docs/PART-3-SERVICES-DETAILS-APPOINTMENT.md`: this file.

## Pages
**services.html** (`data-page="services"`). Input: optional hash `#slug` preselects a tab.
- `#page-head` pageHeader; `#all-head`, `#all-grid` (6 light service cards)
- `#explore-head`, `#svc-tabs` (tablist), `#svc-panel` (tabpanel)
- `#path-head`, `#path-steps` (4 steps), `#fee-table`

**service-details.html** (`data-page="services"`). Input: `?slug=`.
- `#service-root` receives header, detail section (`ring` art, overview, includes, suitable for, process, sticky sidebar) and related section.
- Invalid or missing slug renders a not-found panel with a link to `services.html`; title and meta description are set dynamically.

**appointment.html** (`data-page="appointment"`, `data-no-cta`). Inputs: `?service=&chamber=&date=&name=&phone=`; `sh_user.name` prefill.
- `#page-head`; `#console` containing `#wizard` (`#stepper`, `#ap-progress`, `#panel`) and `#ticket`; `#success` (hidden until confirm).
- Field ids: `ap-name`, `ap-phone`, `ap-age`, `ap-note`, radios `ap-visit`; `#ap-heading`, `#ap-error`, `#ap-done`.

## Kit APIs used
`SITE.doctor/services/chambers`, `UI.c`, `UI.icon`, `UI.mount`, `UI.pageHeader`, `UI.sectionHead`, `UI.serviceCard`, `UI.money`, `UI.time12`, `UI.url.*`, `UI.find.*`, `UI.validate.phone`, `UI.setError`, `UI.toast`, `Art.cover`, `data-reveal`.

## Links this part expects other parts to provide
`chambers.html#banani|#mohammadpur|#khulshi`, `index.html`, plus the kit header and footer. Inbound: `services.html`, `service-details.html?slug=SLUG`, `appointment.html?service=&chamber=&date=`.

## Interactions and edge cases handled
- Tabs: click, Arrow keys, Home and End, roving tabindex, fade on change, horizontal scroll row on mobile.
- Wizard: per-step validation with inline `role="alert"` errors, locked future steps, focus moves to the step heading, `aria-live` panel.
- Calendar: real month grid, past days, off-weekdays and dates beyond 90 days disabled, month navigation bounded, `aria-label` on every day.
- Time slots: generated from chamber `start`/`end`/`slotMin`; booked slots derived from a hash of date, chamber and index (stable per date); past slots disabled today.
- Changing chamber clears an invalid date and time; changing date clears time.
- Prefill from the query string starts the wizard at the first incomplete step.
- Details: name, Bangladesh mobile, age 1-100, visit type (fee updates in the ticket live).
- Confirm: reference like `SH-2611-4821`, saves `sh_last_booking` (try/catch), `.ics` via Blob, "Book another" reset. User text is escaped.
- localStorage reads and writes are guarded; missing containers return early.

## Merge notes
No shared kit file touched. Only the files above were created. Ids are page-scoped; the only storage keys used are `sh_user` (read) and `sh_last_booking` (write).

## QA checklist
- [x] Exact skeleton, correct `data-page`, `data-no-cta` on appointment
- [x] One h1 per page (from `UI.pageHeader`)
- [x] No `<style>`, `style=""`, `href="#"`, remote images, breadcrumbs
- [x] Dark sections use dark tokens; cream sections use light variants
- [x] All dynamic blocks rendered with `UI.mount`
- [x] Every DOM lookup guarded
- [x] Fees in ৳ from `SITE`; exact cross-page hrefs
- [x] Scripts syntax-checked and smoke-tested against stubs (tabs, not-found, full booking)
