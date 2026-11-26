# Team Lead Guide: Obstetrics & Gynecology Portfolio, "Midnight Teal Glass" design

## Files
| File | Who gets it |
|---|---|
| `Midnight-Teal-Kit.zip` | **Everyone** (unzip once on your own computer; it is the base project) |
| `Teal-Prompt-1-Home-Auth-404.md` | Member 1 |
| `Teal-Prompt-2-About-Testimonials-Faqs.md` | Member 2 |
| `Teal-Prompt-3-Services-Details-Appointment.md` | Member 3 |
| `Teal-Prompt-4-Chambers-Contact-Terms.md` | Member 4 |
| `Teal-Prompt-5-Blog-Details-Privacy.md` | Member 5 |

## How each member works
1. Open a **new** Claude chat (Sonnet 5.5, medium).
2. Attach **only your prompt file** and send: `Execute the attached prompt completely. Deliver all files as downloads.` (Do not upload the kit or the photos to Claude.)
3. Download the generated files into the unzipped kit folder, keeping the paths Claude used (pages at the root, scripts in `assets/js/pages/`, doc in `docs/`).
4. Serve the folder (VS Code Live Server or `npx serve .`) and check your pages at phone and desktop widths. If Claude stops early, reply `continue`.

## How this design differs from Kit 1 (the other glass design)
| | Kit 1 (light glass) | Kit 4 (Midnight Teal Glass) |
|---|---|---|
| Base | pastel blue/lilac, light | deep teal gradients with cream bands, dark-first |
| Header | floating pill navbar | full-width glass bar with a mint hairline; full-screen mobile menu |
| Home hero | doctor cut-out in an arch with orbiting rings and floating cards | full-viewport photo with **scroll parallax and mouse-depth layers**, giant outlined ghost word, stacked glass stat tiles and a **booking dock** |
| Shapes | rounded-3xl, pills | rounded-lg to 2xl, gradient-bordered frames, diagonal section edges |
| Depth | floating blobs | fixed-background photo bands, layered parallax, glowing orbs, scan lines |
| Layout | centred, airy | left-aligned corporate: numbered items, data tiles, tables, tabs, a wizard, a month calendar |
| Type | Quicksand + Fira Sans | Sora + DM Sans |

**Sections are kept few:** Home has 7 (hero with booking dock, about, services, chambers, appointment band, testimonials marquee, journal + FAQs); inner pages have a banner plus 1 to 3 sections.

## Merge
1. Copy every member's files into the base folder (nothing overlaps).
2. Serve the folder and open `_qa/check.html`: it checks pages, scripts, forbidden patterns (including colors from the other kits) and `<h1>` count.
3. Click through all 15 pages at phone and desktop widths.
4. Delete `_qa/` and `prompts/` before delivery.

## Notes
- **Doctor and specialty:** your new photos show a male doctor, so the kit uses a fictional male doctor, Dr. Imran Chowdhury. You did not restate the specialty, so I kept obstetrics and gynecology and the same 15-page brief. Everything lives in `data.js`, but the prompts also mention services and facts, so a different specialty would need the prompts updated too.
- **Photos:** your eight PNGs are in the kit as optimized WebP (about 40 to 55 KB each instead of about 560 KB). The transparent cut-out is only 369 px wide, so it is used small (About header only). Every photo has assigned pages.
- **Palette and type:** your colors are used as given, plus `seafoam-dark` (#1F6B5B) for accent text on cream, since #3E9D8C is too light there (5.8:1 with the darker shade). Mint is used as text only on dark backgrounds, and text on mint is deep pine (10:1). Fonts are my choice: Sora and DM Sans.
- **Parallax on phones:** fixed-background bands fall back to normal scrolling on touch devices (a browser limitation), and all parallax and mouse effects switch off for visitors who prefer reduced motion.
- **Lessons built in:** `UI.faqAccordion` spaces its items by 16px itself, and every prompt requires null-safe DOM code.
- **Fictional data:** doctor, BMDC number, phone, hospitals and prices are invented; edit `assets/js/data.js` only.
- **Tested:** all kit scripts pass syntax checks and a DOM smoke test (header, footer, all cards in dark and light, accordion, toast). I could not view the pages in a real browser, so do a visual pass after merging.
