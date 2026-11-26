# Part 2: About, Testimonials, FAQs

## Files delivered
- `about.html`, `assets/js/pages/about.js`: doctor profile, career timelines, numbers band.
- `testimonials.html`, `assets/js/pages/testimonials.js`: rating summary, filterable review grid.
- `faqs.html`, `assets/js/pages/faqs.js`: searchable, category-filtered FAQ accordion.
- `docs/PART-2-ABOUT-TESTIMONIALS-FAQS.md`: this file.

## Pages
**about** (`data-page="about"`): `#page-head` (pageHeader), `#about-profile` (philosophy, memberships, expertise), `#about-career` (experience and education timelines), `#about-numbers` (fixed-parallax counters and rating tile). No query or hash inputs.

**testimonials** (`data-page="testimonials"`): `#page-head`, `#reviews` containing `#rating-bars`, `#review-tabs`, `#review-count`, `#review-grid`, `#review-empty`, `#review-more`. No query or hash inputs.

**faqs** (`data-page="faqs"`): `#page-head`, `#faq-section` containing `#faq-search`, `#faq-clear`, `#faq-count`, `#faq-list`, `#faq-empty`, `#faq-reset`; category buttons use `data-cat`. No query or hash inputs.

## Kit APIs used
`SITE.doctor`, `SITE.testimonials`, `SITE.faqs`; `UI.c`, `UI.icon`, `UI.mount`, `UI.pageHeader`, `UI.sectionHead`, `UI.photo`, `UI.bgFixed`, `UI.stars`, `UI.testimonialCard`, `UI.faqAccordion`; kit motion attributes `data-reveal`, `data-parallax`, `data-count`; `animate-orb`.

## Links this part expects other parts to provide
`appointment.html`, `contact.html`; kit-provided header and footer. Phone and WhatsApp links come from `SITE.doctor`.

## Interactions and edge cases handled
- About: timeline rows reveal alternately left and right; counters animate; sticky photo column on desktop only.
- Testimonials: tab filter built from unique services with `aria-selected`; animated re-render; "Showing X of Y stories"; load more in steps of 6 and hidden when all shown; empty state with reset; distribution bars fill when scrolled into view (IntersectionObserver with fallback).
- FAQs: live search over questions and answers, category counts, clear button, combined filters, empty state with "Clear filters", first item open only when not searching.
- Every container lookup is null-guarded; a missing element never stops the rest of the script.

## Merge notes
No shared kit file was created or edited. Ids are page-scoped (`about-*`, `review-*`, `faq-*`, `rating-bars`); the only shared id is `page-head`, which exists once per page. No localStorage keys used. Accordion prefix is `faq`.

## QA checklist
- [x] Only listed files created, exact names
- [x] Exact skeleton, correct `data-page`, one `<h1>` (from pageHeader)
- [x] No `<style>`, `style=""`, `href="#"`, breadcrumbs, pill buttons, foreign colors
- [x] Dark sections use dark tokens; cream sections use light variants and contrast rules
- [x] All dynamic HTML rendered via `UI.mount`
- [x] No spacing utilities on the accordion container
- [x] Orbs and wide elements inside `overflow-hidden` parents
- [x] Content from `window.SITE`; exact hrefs
