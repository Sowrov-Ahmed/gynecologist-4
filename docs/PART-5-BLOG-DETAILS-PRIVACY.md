# Part 5: Blog, Blog Details, Privacy

## Files delivered
- `blog.html`: article listing page shell
- `assets/js/pages/blog.js`: header, featured card, tabs, search, grid, empty state
- `blog-details.html`: single article page shell
- `assets/js/pages/blog-details.js`: article, takeaways, author, share, prev/next, related
- `privacy.html`: legal layout shell
- `assets/js/pages/privacy.js`: policy content, table of contents, scroll-spy, print
- `docs/PART-5-BLOG-DETAILS-PRIVACY.md`: this file

## Pages
**blog.html** (`data-page="blog"`): `#page-head`, `#blog-tabs`, `#blog-search`, `#blog-featured`, `#blog-count`, `#blog-grid`, `#blog-empty`, `#blog-clear`. Hooks: tab clicks, search input, clear button. Inputs: none.

**blog-details.html** (`data-page="blog"`): `#page-head`, `#post-root` (article section, related section, `#related-head`). Hooks: `[data-copy]` buttons. Reads `?slug=`.

**privacy.html** (`data-page="privacy"`): `#page-head`, `#toc-chips` (mobile), `#toc-list` (lg), `#policy` (sections `#s1` to `#s10`), `#print-btn`. Hooks: IntersectionObserver scroll-spy, `window.print()`. Inputs: none (hash links `#sN`).

## Kit APIs used
`SITE.posts`, `SITE.doctor`; `UI.pageHeader`, `UI.sectionHead`, `UI.postCard`, `UI.mount`, `UI.photo`, `UI.icon`, `UI.formatDate`, `UI.url.post`, `UI.url.param`, `UI.find.post`, `UI.toast`, `UI.c.*`; `Art.cover`.

## Links this part expects other parts to provide
`appointment.html`, `blog.html`, `blog-details.html?slug=SLUG` (own), plus the kit header and footer links to `privacy.html`.

## Interactions and edge cases handled
- Search plus category filter combine; the featured card hides while either is active and returns on clear.
- Result count, live region, animated grid re-render and an empty state with a Clear button.
- Missing or invalid `?slug=` shows a not-found panel with a link to `blog.html` (no redirect).
- `document.title` and the meta description are set from the post.
- Copy link uses the clipboard and shows a success or error toast; WhatsApp and Facebook links open in a new tab with `noopener`.
- Previous and next cards follow the order in `SITE.posts`; missing ends render an empty spacer.
- Related articles list the same category first, then others, up to 3.
- Privacy scroll-spy highlights the active item; mobile chips scroll horizontally and follow the active one.
- Every container lookup is guarded and scripts return early when the main container is missing.

## Merge notes
No shared kit file was touched. Ids are page-local. No localStorage keys are read or written.

## QA checklist
- [x] Only the listed files were created
- [x] Exact skeleton, correct `data-page`, one `<h1>` (from `UI.pageHeader`)
- [x] No `<style>`, `style=""`, remote images, `href="#"` or breadcrumbs
- [x] Cream sections use light tokens; dark section uses dark tokens
- [x] Dynamic blocks rendered with `UI.mount`
- [x] Guarded DOM lookups
- [x] Content from `window.SITE`; exact hrefs
- [x] 44px touch targets and visible focus states
- [x] Wide elements contained (`overflow-x-auto` rows, `min-w-0` grid children)
