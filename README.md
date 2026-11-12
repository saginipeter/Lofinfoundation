# LOFIN Foundation — website

Marketing website for **LOFIN Foundation**, a Kenyan foundation. Built as a fast static site with
React and Vite: no database, no server-side code, no accounts.

> **Status: preview draft.** Every sentence, statistic, programme name, story, biography, address,
> paybill number and grant amount is placeholder content written so the layout could be judged
> honestly. An amber ribbon saying so is shown on every page until real content is approved. Do not
> treat any figure on the site as a claim about the foundation.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero carousel, mission, four programme areas, impact figures, stories, founder quote |
| `/about` | Purpose, vision, values, history timeline, people, governance documents, finances at a glance |
| `/our-work` | Programme index |
| `/our-work/:slug` | Programme detail: focus areas, figures, sample grants, related story |
| `/impact` | Totals, allocation split, outcomes against baseline, measurement method |
| `/stories` | Story index with URL-driven category filter |
| `/stories/:slug` | Article page with pull quote and related stories |
| `/get-involved` | Volunteer, partner, give and careers pathways, openings and events |
| `/donate` | KSh amount picker, M-Pesa and bank-transfer instructions, monthly versus one-off. **No payment provider is connected** |
| `/contact` | Nairobi contact block, front-end-only enquiry form, FAQ |
| `/404` | Branded not-found page |

## Stack

- React 18, TypeScript, Vite, React Router
- Tailwind CSS 4 with a design-token layer in `client/src/index.css`
- No backend: `features.server` and `features.database` are both off, and the build output is static

## Commands

```bash
pnpm install          # once
pnpm dev:static       # development server on PORT (default 3000)
pnpm build:static     # production build into dist/public
pnpm check            # tsc --noEmit
```

## Where the content lives

**`client/src/content/site.ts` is the only file that needs editing for content.** Pages read from it:
organisation details and legal lines, navigation, hero slides, mission, programme list, story list,
people, values, history, governance documents, financial summary, pathways, placements, partner
types, job openings, ways to give, events, FAQ, impact statistics and indicators, allocation,
donation presets and giving instructions, contact details, footer columns and per-route page titles
and descriptions.

Currency is centralised too:

```ts
export const currency = { code: "KES", symbol: "KSh", locale: "en-KE" } as const;
export const money = (value: number | string) => `${currency.symbol} ${…}`;
```

Anything that displays an amount uses `money()`; no page hard-codes a currency symbol.

### Editing workflow for a non-developer

1. Change the string in `site.ts`.
2. Keep lengths near the guidance in the requirements brief (summaries 35–45 words, detail 150–200).
3. Run `pnpm check` and `pnpm dev:static` to look at the page.

## Images

Ten documentary photographs of Kenyan communities live in `client/public/images/` and are registered
at the top of `site.ts` under `IMAGES`. Filenames carry a `-ke` suffix so that replacing a
photograph cannot be masked by a cached copy served under the old name.

Specifications to aim for when real photography arrives:

| Asset | Requirement |
| --- | --- |
| Hero | 1920×1080 or larger, landscape, WEBP or JPEG, under 600 KB, uncluttered left third for the headline |
| Story lead / programme | 1600×1000 landscape, under 400 KB, one image each, no collages |
| Headshot | 800×1000 portrait or 800×800 square, under 250 KB. Where none exist, monogram avatars are used deliberately |
| Logo | SVG preferred, 512 px transparent PNG fallback, plus a single-colour version for dark backgrounds |
| Documents | PDF, text-searchable, under 5 MB, named `lofin-type-year` |

Alt text is written from the caption for every meaningful image; decorative images are marked as
such. `scripts/fetch-images.mjs` is the one-off helper that pulled generated imagery into this
folder; it is not needed once real photographs exist — drop them in and update `IMAGES`.

## Kenyan framing

- Amounts in Kenyan shillings, including the donation ladder and grant examples
- Giving by M-Pesa (paybill / STK push) and bank transfer, shown as instructions plus a preview form
- Registration lines refer to the NGO Coordination Board, KRA PIN and Public Benefits Organisation
  status; privacy references point at the Data Protection Act 2019
- Contact block assumes a Nairobi office, `+254` numbers and East Africa Time
- Programmes and stories are placed in named counties; the strapline appears in English and Kiswahili

## Accessibility and sharing

- Skip link to main content, visible focus states, single `h1` per page, labelled tables and forms,
  `aria-live` for form feedback, pause control and inert hidden slides in the hero carousel
- Colour pairings meet WCAG 2.2 AA on the used backgrounds; a WCAG 2.2 AA target with an external
  audit is the working assumption
- Per-route document titles and descriptions via `usePageMeta`, plus Open Graph tags and a route
  manifest at `client/public/manus-routes.json`

## Deployment

The published output is the static build in `dist/public` (`index.html` at its root). The build
command used by the hosting platform is:

```
npx --yes pnpm@10.18.0 install --frozen-lockfile && npx --yes pnpm@10.18.0 build:static
```

## Before launch

1. Replace placeholder identity lines: registered name, NGO Board number, company number, KRA PIN,
   PBO status, published address and `+254` number.
2. Confirm the mission statement as approved by the board, and the Kiswahili wording.
3. Replace every figure on `/impact` with sourced data, or delete the block.
4. Decide the giving route and connect it: M-Pesa Daraja, a card gateway, or a link to a platform.
5. Wire the enquiry and newsletter forms to a real mailbox and mailing-list tool.
6. Complete the photograph consent checklist, including minors and sensitive locations.
7. Remove the preview ribbon in `client/src/components/site/Chrome.tsx` once all of the above is done.
