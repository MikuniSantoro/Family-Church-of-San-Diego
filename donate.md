# Family Church of San Diego: Donate Page Prompt

## 1. Goal
Build `/donate` for **Family Church of San Diego**, a short, trustworthy page that makes giving easy by Zelle, cash or check and shows plainly where gifts go. It should feel grateful and warm, never pushy: a washed photo hero, a navy giving card you can copy from in one tap, real photos of what gifts support, and a scripture verse over a parallax photo. No progress bars, no urgency, no guilt.

**Borrowed from the reference sites.** Bay Area Family Church's Giving page gives each way to give as numbered steps, a short stewardship statement about how gifts are used, the scripture 1 Chronicles 29:14, and a few gentle lines about tithing. Chicago Family Church gives the `Donate` button that sits in the header on every page. **Not copied:** Bay Area shows its giving link as raw text repeated several times with no real buttons; Chicago sends people straight to an outside form without explaining anything.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on Vercel with the rest of the site. Everything shared is built once from the master prompt `../PROMPT.md` and reused here unchanged: `church.ts`, `images.ts`, the design tokens, the navbar, mobile menu, service bar, footer with the Sunday Letter band, back to top, the reveal and motion utilities, and the `/api` functions (`/api/calendar`, `/api/live`, `/api/subscribe`, `/api/sermons`). This page adds only what is listed below. If anything here conflicts with `../PROMPT.md`, the master prompt wins.

`lucide-react` only for `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Route: `/donate`.
- Route `/donate`, component `src/pages/Donate.tsx`, sections in `src/sections/donate/`.
- Data: `church.giving` (`zelle`, `payee`) and `church.address`. No payment provider, no server.
- `src/lib/copy.ts`: copy to clipboard with a select text fallback.

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

**Donate section rhythm:** washed photo hero, blue service bar, cream (two ways to give, with the navy giving card), white (where it goes, three photo columns), blue washed photo band (scripture), cream (a note on giving), navy-deep footer.

**Washed photos on this page:** the hero (`hike.jpg`, hero recipe) and the scripture band (`congregation-2026.jpg`, banner recipe). The three photos in where it goes stay clean.

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
- Page specific: the Zelle email on the giving card is Libre Baskerville clamp(24px, 2.6vw, 34px) white with `overflow-wrap: anywhere`; the scripture is Libre Baskerville italic clamp(30px, 3.6vw, 46px) white, centred, max 24ch.

## 5. Signature element
**The giving card.** A `--navy` card with `--panel-radius` and 48px padding, shaped like a well printed cheque: the rings in the top right corner, a `--gold-light` label `GIVE BY ZELLE`, the Zelle email set large in white serif, a thin `--line-dark` rule, and a small row `PAY TO` / `familychurchofsandiego@gmail.com` and `MEMO` / `Donation` in `--sky` label style. At the bottom, a white pill `Copy email` with a copy icon. One tap copies the email; the pill turns to a check and `Copied` for 2 seconds and screen readers hear it. If the clipboard is blocked, the email text is selected and the label reads `Press Ctrl+C` (or `Long press to copy` on touch). Giving by Zelle usually means retyping a long address on a phone; this removes that friction.

## 6. Sections, each a different skeleton
Shared on every page, exactly as on Home (master prompt sections 5 and 6): the 80px white navbar with this page's link active (gold underline and `aria-current="page"`), the full screen navy mobile menu, the blue service bar under the hero (picnic mode and real live status included), the navy-deep footer with the Sunday Letter band, and the back to top button. Do not restyle them. Sections below are the page's own, top to bottom, each a different skeleton from its neighbours.

1. **Page hero, photograph with left aligned statement**: full bleed `hike.jpg` (`object-position: 50% 60%`) with the hero wash recipe. Min height `clamp(440px, 62vh, 620px)`. Label `GIVING` in `--gold-light`, white display headline from one third, lead, then a white pill `Give by Zelle` (to `#ways`) and an outline pill `Where it goes` (to `#where`).
2. **Service bar** (signature C of the master prompt).
3. **Two ways to give, card and ruled column** [`#ways`]: `--cream`. Left (6 of 12 columns): the giving card (section 5), and under it three numbered Zelle steps on hairlines (`--blue` labels `01` to `03`). Right (6 of 12, separated by a vertical hairline): label `CASH OR CHECK`, `Make checks payable to HSA-UWC` in serif 30px `--ink` with `HSA-UWC` in bold, three numbered steps, and the mailing address as a small block on `--white` with 12px corners.
4. **Where it goes, three photo columns** [`#where`]: `--white`. Label column `WHERE IT GOES` and heading, then three equal columns: a clean 4:3 photo (12px corners), a `--blue` numeral label, a name in `--blue-bright` serif 28px, and one sentence. Photos: `christmas-singers.jpg` (Sunday services), `fellowship-dinner.jpg` (families and care), `youth-room-billiards.jpg` (life together). Not an icon grid: real photos of the real church.
5. **Scripture, washed photo band**: `congregation-2026.jpg` with the banner wash recipe, full bleed, 520px tall (380px on mobile), parallax drift. Centred: the rings divider on `--line-dark` hairlines, the verse in white italic serif, the reference as a `--gold-light` label.
6. **A note on giving, split**: `--cream`. Label column `A NOTE ON GIVING`; two short paragraphs, a small `--muted` receipts line, and a text link `Questions? Send us a message` (`/contact#message`).
7. **Footer**.

## 7. Motion
Same tokens and rules as the master prompt.
- **Hero welcome, once:** photo settles; text rises in sequence.
- **Giving card:** rises 12px and fades in on first view; the copy pill presses to 0.97 (160ms) and its icon and label crossfade to the check and `Copied` over 150ms, then back after 2 seconds.
- **Steps and photo columns:** standard reveal with 60ms stagger; photo hover zoom 1.03 on hover devices.
- **Scripture band:** parallax drift; the verse fades in with no movement.
- No progress bars, counters or ticking numbers anywhere.

## 8. Responsive
- **Mobile under 768px:** the giving card and the cash or check column stack (card first) with a horizontal hairline between; photo columns stack; the scripture band is 380px with the verse at 28px.
- **768px to 1199px:** two ways stay side by side; photo columns stay three across with 22px names.
- **Desktop 1200px and up:** as specified.

## 9. Full copy
**Hero** (label `GIVING`)
- Headline: `Give with a *grateful* heart.`
- Lead: `Your generosity keeps our doors open on Sundays, supports families in need, and helps us share God's dream with San Diego. Thank you.`
- Actions: `Give by Zelle`, `Where it goes`

**Giving card**
- Label `GIVE BY ZELLE`; email `familychurchofsandiego@gmail.com`
- Small rows: `PAY TO` `familychurchofsandiego@gmail.com`; `MEMO` `Donation`
- Pill: `Copy email` / `Copied`
- Steps: `01` `Open your bank app and choose Zelle.` / `02` `Send to familychurchofsandiego@gmail.com.` / `03` `Add "Donation" in the memo, or the name of a special offering.`

**Cash or check** (label `CASH OR CHECK`)
- `Make checks payable to HSA-UWC`
- Steps: `01` `Place cash or checks in the offering on any Sunday.` / `02` `Or mail a check to the address below.` / `03` `Write "Family Church of San Diego" in the memo line.`
- Address: `Family Church of San Diego` / `9754 Grosalia Ave` / `La Mesa, CA 91941` [CONFIRM mailing address]

**Where it goes** (label `WHERE IT GOES`; heading `Every gift stays *close* to home.`) [CONFIRM all three]
- `01` **Sunday services.** `The building, the music, the livestream and everything that makes Sunday morning happen.`
- `02` **Families and care.** `Meals, visits and quiet help for members and neighbours going through a hard season.`
- `03` **Life together.** `Picnics, youth nights, outings and the small things that turn a congregation into a family.`

**Scripture**
- `For all things come of thee, and of thine own have we given thee.`
- `1 CHRONICLES 29:14`

**A note on giving** (label `A NOTE ON GIVING`) [CONFIRM with the pastors]
- `Many in our church practise tithing, giving a tenth of what they receive as an offering of thanks to God. Others give what they can, when they can. Every gift, large or small, is received with gratitude.`
- `Please give prayerfully and joyfully, and never from pressure.`
- Small line: `If you would like a receipt for your records, email us and we will send one.` [CONFIRM receipt and tax wording with HSA-UWC]
- Link: `Questions? Send us a message`

## 10. Images
| File | Where | Treatment |
| --- | --- | --- |
| `hike.jpg` | Hero | Hero wash, `object-position: 50% 60%`, eager, `fetchpriority="high"` |
| `christmas-singers.jpg`, `fellowship-dinner.jpg` (`object-position: 50% 80%`), `youth-room-billiards.jpg` | Where it goes | Clean 4:3 |
| `congregation-2026.jpg` | Scripture band | Banner wash, parallax |

## 11. SEO, accessibility and hosting
Same rules as the master prompt section 11: one `h1` per page (the hero headline), visible focus rings (2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds and photos), a `title` on every iframe, a visible label on every field, Open Graph and Twitter tags with `og.jpg`, the canonical URL `https://familychurchofsandiego.org/donate`, and the route's own `<title>` and description below. Lighthouse targets on mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- `<title>`: `Give | Family Church of San Diego`. Description: `Support Family Church of San Diego by Zelle, cash or check. Every gift stays close to home.`
- The navbar `Donate` pill shows a 2px `--gold` underline inside its bottom edge on this page and has `aria-current="page"`.
- The copy pill announces through an `aria-live="polite"` region.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.
- Specific to this page: progress bars, thermometers, urgency or countdowns; pre ticked amounts; a card payment form (giving is by Zelle, cash and check only); bank account or routing numbers; guilt language; photos of children used to imply need.

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
1. Confirm the shared foundation from the master prompt exists.
2. Hero, then the giving card with the copy helper and its tests (clipboard success, clipboard blocked).
3. Cash or check column, where it goes photo columns, scripture band, note on giving.
4. Check every value comes from `church.ts`; 360px to 1440px; reduced motion; Lighthouse.
