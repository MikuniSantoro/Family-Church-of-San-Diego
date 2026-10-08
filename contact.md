# Family Church of San Diego: Contact Page Prompt

## 1. Goal
Build `/contact` for **Family Church of San Diego**, the page for someone deciding whether to visit or wanting to ask a question. It should feel like a friendly person at the door: a washed photo hero, the blue service bar, a bold blue card that tells the truth about this Sunday, warm reassurances, a simple message form, a map, a navy band of what is coming up, and honest answers to the questions people are often too shy to ask.

**Borrowed from the reference sites.** Chicago Family Church's Connect page gives the "Visit us!" block with a photo, the address, the Sunday time and three short reassurances (everyone is welcome, free refreshments, free parking), followed by "Let's get in touch". Bay Area Family Church's Contact page gives the two column layout of a "Send us a message" form beside labelled contact details, and its FAQ gives the questions (location, time, parking, children, what a service looks like, getting involved) with a "More questions? Contact us" prompt. **Not copied:** Bay Area's contact page has no map, a social link pointing at the wrong site, and an FAQ contact button that goes nowhere.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on Vercel with the rest of the site. Everything shared is built once from the master prompt `../PROMPT.md` and reused here unchanged: `church.ts`, `images.ts`, the design tokens, the navbar, mobile menu, service bar, footer with the Sunday Letter band, back to top, the reveal and motion utilities, and the `/api` functions (`/api/calendar`, `/api/live`, `/api/subscribe`, `/api/sermons`). This page adds only what is listed below. If anything here conflicts with `../PROMPT.md`, the master prompt wins.

`lucide-react` only for `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Route: `/contact`.
- Route `/contact`, component `src/pages/Contact.tsx`, sections in `src/sections/contact/`.
- Data: `useChurchCalendar()` (this Sunday card and coming up rows), Formspree via `VITE_FORMSPREE_ID` (message form), `church.ts` (address, links, phone).
- `src/lib/ics.ts`: builds a one event `.ics` file in the browser for the `Add to my calendar` button (no server).

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

**Contact section rhythm:** washed photo hero, blue service bar, cream (visit us with the blue Sunday card), white (message and details), the map inset on white, navy (coming up), cream (questions), navy-deep footer.

**Washed photos on this page:** the hero (`picnic-circle.jpg`, hero recipe). The visit photo stays clean.

**On the blue Sunday card**, labels are white at 78 per cent and nothing gold is used.

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
- Page specific: the Sunday card date numeral is Libre Baskerville 400 clamp(96px, 11vw, 148px), line height 0.9, white, tabular numerals. FAQ questions are Libre Baskerville 24px `--ink`.

## 5. Signature element
**The Sunday card.** A `--blue` panel with `--panel-radius` and 40px padding, always telling the truth about the coming Sunday from the calendar. Top: label `THIS SUNDAY` (or `NEXT SUNDAY` from Monday on). Centre: the month as a white label above the date as one huge white serif numeral. Then one line in white serif 26px: `Sunday service, 11:00 AM` on a service Sunday; `Church picnic, 12:00 PM` with the place beneath and a small `NO SERVICE THIS WEEK` label on a picnic Sunday; `No service this week` and `Back on Sunday, {date}` on a cancelled Sunday. Bottom: a white pill `Add to my calendar` that downloads a one event `.ics` file for exactly what is happening, and a text link `Get directions` (to the picnic location on a picnic Sunday). While the calendar is loading it shows the normal service; if the calendar cannot be reached it also shows the normal service. Nobody arrives at 11:00 AM to an empty room.

## 6. Sections, each a different skeleton
Shared on every page, exactly as on Home (master prompt sections 5 and 6): the 80px white navbar with this page's link active (gold underline and `aria-current="page"`), the full screen navy mobile menu, the blue service bar under the hero (picnic mode and real live status included), the navy-deep footer with the Sunday Letter band, and the back to top button. Do not restyle them. Sections below are the page's own, top to bottom, each a different skeleton from its neighbours.

1. **Page hero, photograph with left aligned statement**: full bleed `picnic-circle.jpg` (`object-position: 50% 45%`) with the hero wash recipe. Min height `clamp(440px, 62vh, 620px)`. Label `CONTACT` in `--gold-light`, white display headline from one third, lead, then a white pill `Send a message` (to `#message`) and an outline pill `Get directions`.
2. **Service bar** (signature C of the master prompt).
3. **Visit us, facts and the Sunday card** [`#visit`]: `--cream`. Left (7 of 12 columns): label `VISIT US`, heading, the address as a serif 26px link to directions, `Sundays at 11:00 AM`, then three reassurance rows on hairlines (a `--blue` label and one line each, Chicago's perks in our words), then `outing-selfie.jpg` clean, 16:9, 12px corners. Right (5 of 12): the Sunday card (section 5), sticky at `top: 104px` on desktop while the left column scrolls.
4. **Message and details, two columns** [`#message`]: `--white`. Left: heading and labelled detail rows on hairlines (`ADDRESS`, `SERVICE`, `EMAIL`, `FACEBOOK`, `INSTAGRAM`, `YOUTUBE`, and `PHONE` only if set), each value in `--blue-ink`. Right: the message form posting to `https://formspree.io/f/${VITE_FORMSPREE_ID}` with fields Name, Email, Message (visible labels; Email and Message required), a hidden honeypot `_gotcha`, and a blue pill `Send message`. Inputs: `--cream` fill, 1px `--line` bottom rule that turns `--blue` on focus, errors in `--error` linked by `aria-describedby`. States: sending (button text `Sending` with the small spinner), success (the form is replaced by a serif thank you line and focus moves to it), error (message under the button, typed text kept). Without `VITE_FORMSPREE_ID`, render only an email pill.
5. **Map**: on `--white`, inset 16px, `--panel-radius`, 440px tall (320px on mobile) Google Maps embed `https://www.google.com/maps?q=9754+Grosalia+Ave,+La+Mesa,+CA+91941&output=embed`, `loading="lazy"`, `title="Map to Family Church of San Diego"`, no border.
6. **Coming up, navy rows** [`#coming-up`]: `--navy`. Label column `COMING UP` in `--gold-light` and a white heading, then the next four events from `/api/calendar` as rows on `--line-dark` hairlines: date block (`--gold-light` month label over a 36px white serif day), title in white serif 22px (picnics with the gold rings), time and place in `--sky`, and a `--sky` arrow. Under them, a text link `See the full calendar`. On error: the next two Sunday services and `The full calendar is coming soon.`
7. **Questions, accordion** [`#faq`]: `--cream`. Label column `QUESTIONS` and heading, then nine questions on hairlines as buttons with `aria-expanded`, each with a 36px round `+` that turns into `×`. Under the list: `Still wondering about something?` and a blue pill `Send us a message` to `#message`.
8. **Footer**.

## 7. Motion
Same tokens and rules as the master prompt.
- **Hero welcome, once:** photo settles; text rises in sequence.
- **Sunday card:** on first view it rises 12px and fades in, and the date numeral fades in 150ms after the card (numbers never count or tick). When the calendar arrives and changes the card (for example to picnic mode), the content crossfades over 200ms.
- **Reassurance rows and detail rows:** standard reveal, 60ms stagger.
- **Form:** spinner, crossfade to thank you over 250ms, error text fades in over 200ms; fields never shake.
- **Coming up rows:** reveal with 60ms stagger; hover devices: title turns `--gold-light`, arrow moves 3px up and right.
- **Accordion:** the answer opens with `grid-template-rows: 0fr` to `1fr` and opacity, 250ms `--ease-out`; the `+` rotates 45 degrees in 200ms. Instant under reduced motion.
- **Map:** no motion.

## 8. Responsive
- **Mobile under 768px:** the Sunday card moves directly under the hero text block (above the facts) and is not sticky; the visit photo follows the reassurances; details go under the form; coming up rows put time and place under the title; FAQ questions keep a 56px minimum tap height.
- **768px to 1199px:** visit becomes 6 and 6 columns, card not sticky; two column message layout stays.
- **Desktop 1200px and up:** as specified, card sticky.

## 9. Full copy
**Hero** (label `CONTACT`)
- Headline: `We would love to *hear* from you.`
- Lead: `Questions about visiting, the Blessing, or anything else? Send a message and one of our pastors will write back.`
- Actions: `Send a message`, `Get directions`

**Visit us** (label `VISIT US`; heading `Come and *visit*.`)
- Address: `9754 Grosalia Ave, La Mesa, CA 91941`
- Time: `Sundays at 11:00 AM`
- Reassurances [CONFIRM all three]: `EVERYONE` `Whatever your faith or background, you are welcome here.` / `REFRESHMENTS` `Coffee, tea and something to eat after the service.` / `PARKING` `Free parking on site.`

**Sunday card**
- Labels: `THIS SUNDAY` or `NEXT SUNDAY`
- Service: `Sunday service, 11:00 AM`
- Picnic: `Church picnic, {time}`, place line `{location}`, label `NO SERVICE THIS WEEK`
- Cancelled: `No service this week`, `Back on Sunday, {date}`
- Actions: `Add to my calendar`, `Get directions`

**Message and details** (heading `Send us a *message*.`)
- Labels: `ADDRESS`, `SERVICE`, `EMAIL`, `FACEBOOK`, `INSTAGRAM`, `YOUTUBE`
- Fields: `Your name`, `Email`, `Message`. Button: `Send message`
- Success: `Thank you. We will write back within a few days.`
- Error: `Something went wrong. Please email us directly at familychurchofsandiego@gmail.com.`

**Coming up** (label `COMING UP`; heading `What is *happening*.`): link `See the full calendar`; fallback `The full calendar is coming soon.`

**Questions** (label `QUESTIONS`; heading `Things people often *ask*.`) [CONFIRM every answer]
1. **Where are you, and is there parking?** `We are at 9754 Grosalia Ave in La Mesa. Parking is free and on site.`
2. **When is the service, and how long is it?** `Sundays at 11:00 AM. The service runs about ninety minutes, and most people stay a while afterwards to talk.`
3. **Is there a service every Sunday?** `Almost. Most months one Sunday is a picnic instead of a service, and now and then a Sunday is cancelled for a holiday or retreat. The Sunday card at the top of this page always shows what is happening this week.`
4. **What happens in a service?** `We begin with music and prayer, then one of our pastors or a guest gives a message, and we close with prayer and announcements. It is relaxed and friendly.`
5. **What should I wear?** `Whatever you are comfortable in. You will see everything from jeans to Sunday best.`
6. **Can I bring my children?** `Yes, please do. Children are welcome in the service. Ask at the door about what is on for younger ones that week.`
7. **Do I need to be a member, or a Unificationist?** `No. Everyone is welcome, whatever your faith or background. Come as often as you like and ask anything.`
8. **What is the Marriage Blessing?** `The Blessing is a God-centred marriage ceremony offered to couples of every faith and background, including couples who are already married. Ask one of our pastors if you would like to know more.`
9. **How can I get involved?** `Come on a Sunday, sign up for the Sunday Letter at the bottom of this page, or send us a message. There is always a picnic to cook for, a room to set up, or a neighbour to help.`
- After the list: `Still wondering about something?` Pill: `Send us a message`

## 10. Images
| File | Where | Treatment |
| --- | --- | --- |
| `picnic-circle.jpg` | Hero | Hero wash, `object-position: 50% 45%`, eager, `fetchpriority="high"` |
| `outing-selfie.jpg` | Visit us | Clean, 16:9 |

## 11. SEO, accessibility and hosting
Same rules as the master prompt section 11: one `h1` per page (the hero headline), visible focus rings (2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds and photos), a `title` on every iframe, a visible label on every field, Open Graph and Twitter tags with `og.jpg`, the canonical URL `https://familychurchofsandiego.org/contact`, and the route's own `<title>` and description below. Lighthouse targets on mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- `<title>`: `Contact | Family Church of San Diego`. Description: `Visit Family Church of San Diego at 9754 Grosalia Ave, La Mesa. Sundays at 11:00 AM. Send us a message or read our answers to common questions.`
- The Sunday card is an `aria-live="polite"` region so its update from the calendar is announced once.
- Each FAQ button controls its answer region (`aria-controls`), which is labelled by the button.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.
- Specific to this page: a contact button that goes nowhere; social links to the wrong account; a map without a title; CAPTCHA puzzles; a phone row with no number; an FAQ or Sunday card that promises a service on a picnic Sunday; gold on the blue card; animating the date numeral.

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
2. Hero, then the Sunday card component wired to `useChurchCalendar()`, with the `.ics` helper and its tests (service, picnic and cancelled Sundays).
3. Visit us layout with the sticky card, then message form and details, map, coming up rows, accordion.
4. Submit a real test message through Formspree; check every state.
5. 360px to 1440px, reduced motion, Lighthouse.
