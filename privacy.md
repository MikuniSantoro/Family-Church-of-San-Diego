# Family Church of San Diego: Privacy Page Prompt

## 1. Goal
Build `/privacy` for **Family Church of San Diego**, a short, plain language note about what the site collects and how to leave. It exists because the site collects email addresses (the Sunday Letter and the contact form). It should read like a note from a friend who takes your privacy seriously, set with the same care as the rest of the site: a navy header band with the rings, then a calm reading column with a small index beside it.

**Borrowed from the reference sites.** Bay Area Family Church links a privacy policy from its footer; Chicago Family Church has none. Ours keeps Bay Area's footer link and is short enough to actually read.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on Vercel with the rest of the site. Everything shared is built once from the master prompt `../PROMPT.md` and reused here unchanged: `church.ts`, `images.ts`, the design tokens, the navbar, mobile menu, service bar, footer with the Sunday Letter band, back to top, the reveal and motion utilities, and the `/api` functions (`/api/calendar`, `/api/live`, `/api/subscribe`, `/api/sermons`). This page adds only what is listed below. If anything here conflicts with `../PROMPT.md`, the master prompt wins.

`lucide-react` only for `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Route: `/privacy`.
- Route `/privacy`, component `src/pages/Privacy.tsx`. Static content, no data.

## 3. Design system
Every colour below was read from the live theme of one of the two reference sites (Chicago runs a Squarespace theme, Bay Area runs MotoCMS). Do not invent new shades. Tints are made with opacity on these values.
```css
:root {
  /* grounds */
  --white: #FFFFFF;        /* Chicago page ground; both sites use a white header */
  --cream: #F8F6F0;        /* Bay Area page ground */
  --mist: #EAEAEE;         /* Chicago lightAccent: white button hover, skeleton rows, input fill */

  /* text */
  --ink: #232323;          /* Chicago heading colour */
  --text: #3E4041;         /* Bay Area body colour */
  --muted: #707070;        /* Chicago date and meta colour */

  /* blues */
  --blue: #1470AF;         /* Chicago accent. Bay Area's service bar renders as #096FAF, the same blue. Buttons, service bar, labels */
  --blue-bright: #0A79BE;  /* Bay Area accent. Text 24px and larger only, e.g. value names */
  --blue-deep: #07598D;    /* Bay Area dark blue. Hover state, the Watch live button */
  --blue-ink: #114C9C;     /* Chicago nav link colour. Nav, logo, text links on light grounds */
  --navy: #16324F;         /* Chicago dark section theme. Sermon band, mobile menu, founders panel */
  --navy-deep: #052C44;    /* Bay Area footer colour. Footer only */
  --sky: #8EB6DC;          /* Chicago darkAccent. Secondary text and links on navy */

  /* gold, from Bay Area */
  --gold: #A9964F;         /* rings ornament, active nav underline. Never small text on light */
  --gold-light: #BCAC71;   /* gold text on navy and photos: labels, italic accent word, footer church name */

  /* functional, the only colours not taken from the references: form errors and the live dot */
  --error: #B3261E;        /* error text on white or cream (6.5:1 and 6.1:1) */
  --error-on-dark: #F2B8B5;/* error text and invalid field rule on navy-deep (8.5:1), used by the newsletter band */
  --live: #5BE38F;         /* the live dot only, shown only when YouTube confirms a stream is live (4.6:1 on blue-deep, 8:1 on navy) */

  --line: rgba(35, 35, 35, 0.12);
  --line-dark: rgba(255, 255, 255, 0.16);
  --panel-radius: 20px;    /* inset photo and navy panels */
  --pill: 999px;           /* every button is a pill, as on Chicago Family Church */
}
```
**Contrast, checked:** ink on white 15.7:1, text on cream 9.7:1, muted on cream 4.6:1, blue on white 5.3:1 and on cream 4.9:1, blue-ink on cream 7.7:1, white on blue 5.3:1, white on blue-deep 7.4:1, gold-light on navy 5.8:1, sky on navy 6.2:1. Blue-bright on cream is only 4.3:1, so it is for 24px text and larger. Gold on cream is 2.7:1, so gold never carries small text on a light ground, and gold is never placed on blue.

**Which colour goes where:**
- Section labels on light grounds are `--blue` (Bay Area sets its letterspaced subheads in blue). On navy and photos they are `--gold-light`.
- Section headings are `--ink`. Value names and other large serif row titles are `--blue-bright`, like Bay Area's "What to Expect" titles.
- Nav links and text links on light grounds are `--blue-ink`, as on Chicago.

**Buttons, Chicago's pill system.** Height 50px, label 14px caps at 0.08em, a 38px round circle holding the arrow.
- Primary on light: `--blue` pill, white text, circle in white at 18 per cent. Hover `--blue-deep`.
- Primary on photos: white pill, `--blue` text, `--blue` circle with a white arrow (Chicago's "bright" section button). Hover `--mist`.
- Secondary on photos and navy: outline pill, 1px white at 75 per cent, white text.
- Inside the service bar: `--blue-deep` pill (Bay Area puts a darker block button inside its blue bar).

**Photo washes, two recipes, both taken from the references.** Each is flat layers stacked above the image. No gradients.
- **Hero recipe (Chicago):** black at 40 per cent, then `#1470AF` at 21 per cent.
- **Banner recipe (Bay Area):** black at 18 per cent, then `#0A79BE` at 50 per cent. Used for inset photo panels and full bleed photo bands (the Home picnic panel, and panels on the other pages).

**Photos never carry text unless they are washed.** Portraits, mosaics, galleries, thumbnails and group photos without a wash are shown clean, so faces stay visible. Each page lists which of its photos are washed.

Spacing: 8px base unit. Section padding 112px desktop, 88px tablet, 72px mobile. Content max width 1200px, gutters 40px desktop, 20px mobile. Inset panels sit 16px from the viewport edge.

**Section rhythm:** navy header band, white (the note), navy-deep footer. This is the one page without a photo hero, on purpose: it is a page for reading.

## 4. Typography
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
- **Display:** Libre Baskerville 400, clamp(40px, 5.6vw, 76px), line height 1.08, letter spacing -0.02em. Sentence case.
- **Section heading:** Libre Baskerville 400, clamp(30px, 3.4vw, 46px), line height 1.15, letter spacing -0.015em.
- **Card title / row name:** Libre Baskerville 400, 24px, line height 1.3.
- **Lead:** Work Sans 300, 20px, line height 1.6.
- **Body:** Work Sans 400, 17px, line height 1.65, max 64ch.
- **Label layer:** Work Sans 500, 12px, uppercase, letter spacing 0.18em. Used for section labels, dates, times, the tagline, and button text (14px, 0.08em). This is the Bay Area "N E W  H E R E ?" spacing, used with restraint.
- At most one italic word per headline. On navy and photos the italic word is `--gold-light`, on light grounds it is `--blue`.
- Numerals in dates and times use `font-variant-numeric: tabular-nums lining-nums`.
- Page specific: note subheadings are Libre Baskerville 26px `--ink`; the index is the label layer in `--blue-ink`.

## 5. Signature element
**The reading column with a quiet index.** On desktop a sticky index on the left third lists the four sections as `--blue-ink` label links with a 1px `--gold` bar beside the one currently in view (updated with an IntersectionObserver). The note itself sits in a single 64ch column on the right with hairlines between sections. It makes a short legal page feel considered rather than an afterthought.

## 6. Sections, each a different skeleton
Shared on every page, exactly as on Home (master prompt sections 5 and 6): the 80px white navbar with this page's link active (gold underline and `aria-current="page"`), the full screen navy mobile menu, the blue service bar under the hero (picnic mode and real live status included), the navy-deep footer with the Sunday Letter band, and the back to top button. Do not restyle them. Sections below are the page's own, top to bottom, each a different skeleton from its neighbours.

1. **Header, navy band**: `--navy`, padding 112px top and 88px bottom. The rings, label `PRIVACY` in `--gold-light`, white display headline, and a `--sky` label `LAST UPDATED {MONTH YEAR}`.
2. **The note, index and column**: `--white`. Left third: the sticky index (`top: 112px`). Right two thirds: four sections, each with an `id`, a serif subheading and one or two paragraphs, hairlines between.
3. **Footer**.

## 7. Motion
Same tokens and rules as the master prompt.
- Header text rises once on load.
- The index's gold bar slides between items with `transform: translateY` over 250ms `--ease-out`.
- The note itself does not animate; it is meant to be read.

## 8. Responsive
- **Mobile under 768px:** the index becomes a horizontal list of four label links under the header (wrapping, not scrolling); the column is full width.
- **768px and up:** as specified.

## 9. Full copy
**Header** (label `PRIVACY`): headline `Your *privacy*.` Label `LAST UPDATED OCTOBER 2026`.

**Index:** `The Sunday Letter`, `The contact form`, `Videos, maps and calendar`, `Leaving, or asking a question`

**The Sunday Letter**
`When you sign up for the Sunday Letter we keep your email address and, if you give it, your first name. We use them only to send you church news. We never sell or share them.`
`Our emails are sent through Brevo, an email service based in the European Union, which stores your address on our behalf. Every email has an unsubscribe link, and unsubscribing removes you straight away.`

**The contact form**
`When you send a message through our contact form, it is delivered to our church inbox through Formspree. We use your details only to reply to you.`

**Videos, maps and calendar**
`Our sermon videos are played from YouTube in its privacy enhanced mode, and our map is provided by Google Maps. These services may set their own cookies when you play a video or use the map.`
`Our calendar and sermon list are fetched by our own server, so simply visiting the site does not share anything about you with Google. The website itself does not use advertising or tracking cookies.`

**Leaving, or asking a question**
`Email familychurchofsandiego@gmail.com and we will remove you from every list and delete your details. If you have any question about your information, write to the same address.`
[CONFIRM all wording with the pastors]

## 10. Images
None. The rings are the only ornament.

## 11. SEO, accessibility and hosting
Same rules as the master prompt section 11: one `h1` per page (the hero headline), visible focus rings (2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds and photos), a `title` on every iframe, a visible label on every field, Open Graph and Twitter tags with `og.jpg`, the canonical URL `https://familychurchofsandiego.org/privacy`, and the route's own `<title>` and description below. Lighthouse targets on mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- `<title>`: `Privacy | Family Church of San Diego`. Linked from the footer and the newsletter small print.
- The index is a `<nav aria-label="On this page">`; the current item has `aria-current="location"`.
- Every service the site uses (Brevo, Formspree, YouTube, Google Maps, Google Calendar through our server, Vercel hosting) is covered, and nothing is claimed that the site does not do.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.
- Specific to this page: legal boilerplate copied from a template; cookie banners (the site sets no tracking cookies); claims the site does not keep.

## 13. Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.0.0",
  "motion": "^12.0.0",
  "lucide-react": "^0.460.0",
  "clsx": "^2.1.0"
}
```
Dev (the calendar also needs no runtime package, only `fetch`): `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `@tailwindcss/vite`, `vite-imagetools` (AVIF and WebP from the prepared JPEGs), `vercel` (CLI, for `vercel dev`), `vitest` (API and validation tests).

The newsletter backend needs no extra runtime packages: it uses the platform `fetch` and `Request`/`Response` on the Vercel Node.js runtime (Node 20 or later). No Brevo SDK, no Express, no database.

## 14. Build order
1. Confirm the shared foundation exists.
2. Header band, then the index and column with the active section tracking.
3. Read the final text against the services actually configured.
