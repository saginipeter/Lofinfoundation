# LOFIN Foundation delivery outcomes

Blueprint is the approved plan. Reference style: Walton Family Foundation, full-bleed documentary
photography with a dark scrim headline panel, warm bone background, deep spruce/terracotta palette,
hairline-ruled section headings, asymmetric story grid (one large feature plus smaller cards),
serif quote block, and a "Stay Connected" email band.

All copy, statistics, names, addresses and stories are **placeholder content**, marked so a
stakeholder can see what is real and what still needs replacing.

## Delivered

### 1. Rethemeable foundation: tokens, wordmark, chrome (done)
- Warm-bone page background, deep spruce ink text, terracotta signature accent, sage and gold
  supporting tones, declared as CSS custom properties in `client/src/index.css` only;
  `--terracotta-deep` added for accessible button fills.
- Fraunces display serif for headlines, Public Sans for body/UI; wide-tracked two-line
  "LOFIN / FOUNDATION" wordmark with an original drawn SVG arc-and-seed mark, plus `favicon.svg`.
- Sticky header with nav (About Us, Our Work, Impact, Stories, Get Involved), Donate button,
  active-state `aria-current`, and a mobile drawer rendered as a sibling of the header so the
  header's `backdrop-filter` cannot clip it; `role="dialog"`, `aria-modal`, Escape to close,
  focus moved into the panel and returned to the toggle, top offset measured from the real header.
- Dismissible "Preview draft" ribbon (visible on first paint, storage access guarded); footer
  with four link columns including a Programmes list, social row and legal row; skip-to-content
  link on every page.

### 2. Homepage (done)
- Full-bleed hero carousel, three documentary slides, dark scrim right-aligned headline, dot and
  arrow controls, 6s auto-advance with separate hover / focus-within / hidden-tab / explicit
  pause-button states, first slide eager-loaded, Ken Burns scale suppressed under
  `prefers-reduced-motion`; inactive slides `inert` and hidden from assistive tech.
- Single `<h1>` per page, mission block with Donate and Get involved CTAs, four-program stat card.
- Four program-area cards linking to `/our-work/:slug`.
- Impact band with four count-up figures (starting at zero, no flash of the final value) plus an
  "Illustrative figures" marker.
- Recent Stories: one large feature left, four compact rows right, "All stories" link.
- Serif quote band; flagship initiative strip; shared support band.
- Stay Connected email band with client-side validation and a labelled placeholder state.

### 3. About Us (done)
- Purpose / vision / approach columns, organisational story, four value cards.
- History timeline built from `<ol>`/`<li>` semantics, founding year to current, labelled illustrative.
- `#leadership` staff, board and advisory groups using numbered monograms (no invented faces).
- "Finances at a glance" table (grant expenditure, operating costs, endowment, auditor) with a
  placeholder marker, plus annual report / grant register / governance policy callouts.

### 4. Our Work (done)
- Index with sticky explainer column, the four program cards with correct 01–04 numbering, and
  three strategy figures.
- `/our-work/:slug` detail: standfirst, three focus areas, two figures, sample grants table,
  enquiry and funding CTAs, related story from that program, page-specific title and description;
  unknown slug renders the 404 page.

### 5. Impact (done)
- Totals band with count-ups and an explicit "Illustrative data, not real" marker.
- Allocation bars by program area, outcomes-against-baseline semantic `<table>`, and a three-part
  method/transparency section on dark ground.

### 6. Stories (done)
- `/stories` index with program-area filter chips driven by `?area=`; the URL is the single source
  of truth so back/forward and shared links always match the visible list.
- `/stories/:slug` article: scrim hero with category, byline, date, computed reading time, body,
  pull quote, "about this story" aside, related stories, page-specific title and `og:url`;
  unknown slug renders the 404 page.

### 7. Get Involved (done)
- Four pathway cards (volunteer, partner, give, careers) with their own CTAs.
- `#volunteer` placements as a semantic table with commitment, location and closing date.
- `#partner` four partner types; `#give` four ways to give (monthly, one-off, employer matching,
  legacy); `#careers` three roles with published salary-band placeholders; three placeholder events.

### 8. Donate (non-functional preview) (done)
- Monthly/one-time toggle, four presets per frequency, custom amount, designation select,
  disabled state on invalid amount, impact ladder of what each gift buys.
- Prominent "Preview only. No payment provider is linked" notice, `aria-live` status, and a
  submit state that explains checkout would open and that nothing was charged or stored.
- "Other ways to give" points at `/get-involved#give` where that content now exists.

### 9. Contact (done)
- Details column with placeholder address, email, phone, hours, registration note and an
  unconfirmed-data marker; `#faq` block fed from the content file.
- Front-end-only form: name, organisation, email, topic select, message, consent checkbox,
  per-field validation with `aria-required` / `aria-invalid` / `aria-describedby` and a polite
  live region; success panel states nothing was sent or stored.
- Reads `?topic=` from the URL, so "Send an enquiry" from a program page arrives pre-sorted.

### 10. Swap-out ergonomics (done)
- Every piece of copy, figure, program, story, person, pathway, event, document and contact value
  lives in `client/src/content/site.ts`; `IMAGES` is the single image registry.
- Ten generated photographs are committed as local assets in `client/public/images` (managed
  `/manus-storage/` URLs are not reachable from the static dev server or a static publish);
  `scripts/fetch-images.mjs` re-downloads them if new images are generated.
- Route table and `client/public/manus-routes.json` match (`/404` is deliberately left out of the
  manifest because 404-only routes are excluded); `pnpm check` (tsc) clean; browser console clean;
  static production build succeeds; all ten routes verified serving.
- Project logo generated from the wordmark and registered in `app.config.ts`.

## Still open

### 11. Real content pass
- Needs the user's mission, program areas, figures, stories, photographs, named people,
  registration details and contacts. Structural placeholders are marked in the UI.

### 12. Optional next build steps (not requested yet)
- Stripe Checkout on `/donate`; enquiry storage plus spam protection on `/contact`; a real
  newsletter endpoint; publishing the site.

## Housekeeping

- Removed unreferenced starter demo files: `ComponentShowcase.tsx`, `Map.tsx`, `AIChatBox.tsx`,
  `DashboardLayout.tsx`, `DashboardLayoutSkeleton.tsx`.

## Kenyan pass (delivered 2026-11-12) (checkpoints `c10543a`, `8c0723f`, `51086e5`)

**Kenyan grounding.** Currency is Kenyan shillings through `currency`/`money()` in the content file;
the donate ladder, presets, minimum-gift note and bank copy all read KSh. M-Pesa paybill and
bank-transfer instruction panels added to `/donate`. Contact block moved to Nairobi with a `+254`
number and East Africa Time. Registration lines read NGO Coordination Board number, KRA PIN and
Public Benefits Organisation status. Programmes, stories and figures are placed in named counties;
visible copy uses "programme". A Kiswahili strapline sits under the English one in the footer.

**Photography.** Ten documentary photographs of Kenyan communities replaced the earlier set, and the
African imagery is now the only imagery: no non-African photograph remains in the site, its content
registry or the repository tree at `client/public/images/`. Filenames carry a `-ke` suffix so a
cached copy of the superseded draft photography cannot appear under the same name. Each photograph
is used once inside a list, so no two story cards repeat the same frame; the riverbank-planting image
that had gone unused now carries the quarry-town river story, and the seedling nursery image carries
the field-conservation story, whose American slogan title became "A season of not planting the poor
ground". Alt text describes what each photograph actually shows.

**Repository.** `README.md` replaces the starter notes with routes, commands, the single content
file, image specifications, Kenyan framing, accessibility notes and a seven-point launch list. The
site is pushed to https://github.com/saginipeter/Lofinfoundation (`main` at `51086e5`) using the
session's GitHub connector without storing credentials or touching global git config; the pushed
tree holds 180 files, the ten Kenyan photographs and no environment file. `pnpm check` and
`pnpm build:static` both pass, and the static output carries the renamed images.

## Brand colour and voice pass (done 2026-11-12, this round)

**Deep navy is the primary background and brand colour.** `client/src/index.css` now defines
`--navy #0A1F3C` (page ground), `--navy-raise #102A4D` (alternating bands), `--navy-deep #06152B`
(footer, hero scrim, quote, history, method and events bands), `--panel #0E2646` (cards, tables,
forms), `--paper #EDF3FA` (text and reversed fills), `--ink #071A33` (text on gold), plus
`--terracotta #E4794A`, `--terracotta-deep #C4551F`, `--gold #E8B656` and `--sage #8FB6DE`.
269 colour classes were remapped across components and pages, so no cream or teal token remains in
`client/src`, `client/index.html`, `client/public`, or the built CSS. The `.dark` block mirrors
`:root` deliberately so a system dark preference cannot half-retheme the site.

**Contrast, measured.** paper on navy 14.76, on navy-deep 16.39, on panel 13.53; mist `#A9C0DA`
8.82; gold on navy 8.83; terracotta on navy 5.60; white on terracotta-deep 4.50 (AA, bold uppercase
labels only); navy on gold 8.83. Header Donate and newsletter submit are gold with ink text, which
keeps one accent for money actions.

**No em dashes in website copy.** 51 removed from the content file, pages, components, `const.ts`,
`useAuth.ts` and `client/index.html`. Replacements are commas, colons, full stops or "to", so copy
reads like desk-written prose; document titles now use a pipe separator, for example
"About us | LOFIN Foundation". `grep -o "—" dist/public` returns zero. The requirements brief and
the CEO email draft were also swept: the PDF text layer contains no em dashes.

**Other results of this round.** `client/public/favicon.svg` and the `theme-color` meta recoloured to
navy; the platform logo in `app.config.ts` regenerated as a full-bleed navy wordmark tile; the donate
page no longer repeats "What happens next, when this goes live" twice, because the lead-in now lives
only in the component; allocation bars use gold; programme index chips over photographs use paper at
90 per cent with navy numerals.
