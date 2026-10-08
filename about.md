# Family Church of San Diego: About Page Prompt

## 1. Goal
Build `/about` for **Family Church of San Diego**, the page that answers "who are these people, what do they believe, and who will I meet?" It must feel as rich as the Home page: a washed photo hero, the blue service bar, a navy band, a story told along a gold timeline, big blue serif names, real faces in a photo mosaic, and a parallax photo panel to close. Warm white and cream paper, FamilyFed blue, deep navy, thin gold rules. It should read like a warm letter from the church, never like a statement of faith pasted from a manual.

**Borrowed from the reference sites.** Bay Area Family Church's About Us gives the order (who we are, founders, staff, then a "Have questions? Contact us" box) and its ruled Mission / Vision / Purpose blocks. Chicago Family Church's About gives the full bleed photo hero with a two part statement, the one sentence mission given its own space, the founders' "story of love and devotion" beside a portrait, and a warm first person pastor introduction. **Not copied:** Bay Area's placeholder staff bios and menu anchors that land on nothing, and Chicago's long plain text runs. Every anchor on this page lands on a real section.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on Vercel with the rest of the site. Everything shared is built once from the master prompt `../PROMPT.md` and reused here unchanged: `church.ts`, `images.ts`, the design tokens, the navbar, mobile menu, service bar, footer with the Sunday Letter band, back to top, the reveal and motion utilities, and the `/api` functions (`/api/calendar`, `/api/live`, `/api/subscribe`, `/api/sermons`). This page adds only what is listed below. If anything here conflicts with `../PROMPT.md`, the master prompt wins.

`lucide-react` only for `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Route: `/about`.
- Route `/about`, component `src/pages/About.tsx`. Sections are components in `src/sections/about/`.
- Data: `church.ts` (names, address), `images.ts` (every photo), `useChurchCalendar()` and `useLiveStatus()` for the shared service bar only.
- New in `church.ts`: `story: { year: string; title: string; text: string }[]` holding the timeline in section 5, so the church can add a milestone without touching layout.

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

**About section rhythm:** washed photo hero, blue service bar, white (who we are and the family photo), navy (mission, vision, purpose), cream (our story timeline), white with the navy inset founders panel, cream (what we believe), white (our pastors), cream (life together mosaic), blue (your first Sunday), blue washed photo panel, navy-deep footer.

**Washed photos on this page:** the hero (`fellowship-dinner.jpg`, hero recipe) and the closing panel (`congregation-2026.jpg`, banner recipe). The family photo, pastor portraits and mosaic photos stay clean.

**On the blue band** (section 11), labels are white at 78 per cent and the italic accent word is white, because gold never sits on blue.

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
- Page specific: the who we are statement is Libre Baskerville 400, clamp(24px, 2.4vw, 30px), line height 1.4, `--ink`. Timeline years are Libre Baskerville 400 clamp(40px, 4.4vw, 56px) `--blue-bright`. Belief names and pastor names are Libre Baskerville clamp(30px, 3vw, 40px).

## 5. Signature element
**Our story, a gold timeline.** A single horizontal hairline runs across the content width with four stops, each a 12px `--gold` ring (the outline of one Blessing ring) sitting on the line. Above each stop, a big `--blue-bright` serif year; below it, a short title in `--ink` serif 22px and one sentence in `--text`. The four stops are 1960 (the founders' Blessing), 1994 (the Family Federation is founded), the year Family Church of San Diego began [CONFIRM], and today in La Mesa. When the section enters view, the hairline draws itself from left to right (`transform: scaleX(0)` to `scaleX(1)`, 900ms `--ease-in-out`, `transform-origin: left`), and each stop's ring and text fade up 12px as the line reaches it (stops at 0ms, 220ms, 440ms, 660ms after the line starts). The last stop's ring is filled solid `--gold`: we are here. On mobile the line runs vertically down the left edge with the stops stacked, drawing from top to bottom.

It tells a newcomer in five seconds that this small church is part of a story more than sixty years old.

## 6. Sections, each a different skeleton
Shared on every page, exactly as on Home (master prompt sections 5 and 6): the 80px white navbar with this page's link active (gold underline and `aria-current="page"`), the full screen navy mobile menu, the blue service bar under the hero (picnic mode and real live status included), the navy-deep footer with the Sunday Letter band, and the back to top button. Do not restyle them. Sections below are the page's own, top to bottom, each a different skeleton from its neighbours.

1. **Page hero, photograph with left aligned statement**: full bleed `fellowship-dinner.jpg` (`object-position: 50% 78%`) with the hero wash recipe. Min height `clamp(460px, 66vh, 660px)`, content anchored to the bottom third. Label `ABOUT US` in `--gold-light`. White display headline starting at one third of the content width (left edge on mobile). Lead in white at 92 per cent, max 52ch. Actions: white pill `Plan your visit` (to `#first-sunday`) and outline pill `Meet our pastors` (to `#pastors`).
2. **Service bar** (signature C of the master prompt, with picnic mode and live status).
3. **Who we are, statement and family photo** [`#who-we-are`]: `--white`. Label column `WHO WE ARE` on the left third. On the right, the first paragraph set large as a statement (the who we are typography above), then the second paragraph as body text. Beneath, across the full content width, an inset 21:9 photo (12px corners) of `congregation-group.jpg`, clean, with a `--muted` label caption `OUR CHURCH FAMILY` under it.
4. **Mission, vision, purpose, navy band** [`#mission`]: `--navy`. The rings divider (on `--line-dark` hairlines), then label `WHAT WE ARE ABOUT` centred in `--gold-light`, then a three column row with vertical `--line-dark` hairlines between columns. Each column: a `--gold-light` label (`MISSION`, `VISION`, `PURPOSE`) and one sentence in white Libre Baskerville 26px. No icons, no cards.
5. **Our story, timeline** [`#story`]: `--cream`. Label column `OUR STORY`, heading on the right, then the timeline (section 5) across the full content width.
6. **Our founders, navy inset panel** [`#founders`]: `--white` ground with a `--navy` panel inset 16px, `--panel-radius`, padding 72px. Left (5 of 12 columns): `founders.jpg` at 4:5 with 12px corners; until the church supplies an official portrait cleared for use, show the round logo mark (`logo-mark.png`, white via `filter: brightness(0) invert(1)`, 58 per cent of the block width) centred in a `--blue` 4:5 block. Right: label `OUR FOUNDERS` in `--gold-light`; the names in white Libre Baskerville clamp(28px, 2.8vw, 36px) with the rings beside them; the line `Affectionately known as Father and Mother Moon, True Parents` in `--gold-light` label style; the heading `A Story of Love and Devotion` in white 26px; the two verbatim paragraphs in `--sky` with a 1px `--gold` rule on their left edge; a text link `From familyfed.org`.
7. **What we believe, Swiss list** [`#beliefs`]: `--cream`. Label column `WHAT WE BELIEVE`. Four stacked rows from one third on hairlines, exactly the Home values skeleton: a `--blue` numeral label (`01` to `04`), the belief name in `--blue-bright` serif, and two sentences to the right on wide screens, beneath below 1200px. Under the rows, a text link `Read more at familyfed.org`.
8. **Our pastors, portrait spread** [`#pastors`]: `--white`. Label `OUR PASTORS` and a heading on the left third, then a two column spread across the remaining two thirds: each column a large 4:5 portrait (12px corners), a `--blue` role label, the name in serif clamp(30px, 3vw, 40px) `--ink`, and the bio. The co-pastors' column is wider (7 of 12), Walter's narrower (5 of 12) and dropped 96px lower to stagger the spread. Under the co-pastors' bio, a text link `Write to our pastors` to `/contact#message`.
9. **Life together, mosaic** [`#gallery`]: `--cream`. Label column `LIFE TOGETHER` and heading, then a six photo mosaic on a 12 column grid with 24px gaps and 12px corners: `picnic-kids.jpg` large (7 columns, two rows), `youth-room-games.jpg` and `christmas-singers.jpg` stacked to its right (5 columns, 16:10 each), then a row of three equal 4:3 photos: `picnic-circle.jpg`, `group-purple.jpg`, `outing-selfie.jpg`. Every photo has a `--muted` label caption beneath. Hover zoom 1.03 inside the frame.
10. **Your first Sunday, blue band** [`#first-sunday`]: `--blue`, white text. Label column `NEW HERE?` (white at 78 per cent) and heading `Your first *Sunday*.` (white, italic word white). Four rows on `--line-dark` hairlines with white 78 per cent markers (`ARRIVE`, `WORSHIP`, `CHILDREN`, `AFTERWARDS`), a white serif row title 26px and one or two sentences in white at 90 per cent. Under them, a white pill `Read the full FAQ` to `/contact#faq`. This echoes Bay Area's blue service bar as a full section.
11. **Closing panel, photograph**: `congregation-2026.jpg` (`object-position: 50% 70%`) with the banner wash recipe, inset 16px, `--panel-radius`, parallax drift as on Home. White heading, one line, a white pill `Contact us` and an outline pill `Get directions`. Bay Area's "Have questions?" box, made warmer.
12. **Footer**.

## 7. Motion
Same tokens and rules as the master prompt (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, transform and opacity only, hover only on hover devices, reduced motion keeps fades and drops movement).
- **Hero welcome, once:** photo settles from `scale(1.06)` to `scale(1)` over 1600ms `--ease-out`; label, headline, lead and actions rise 16px and fade in over 900ms at 100ms, 220ms, 340ms and 460ms. CSS keyframes.
- **Scroll reveals, once:** every label, heading, paragraph, row, column and photo rises 12px and fades in over 700ms `--ease-out` when 15 per cent visible; siblings 60ms apart, capped at the sixth.
- **Mission columns** reveal left to right, 60ms apart, after the rings divider fades in.
- **Timeline:** as described in section 5. Under reduced motion the line and stops simply appear.
- **Founders panel:** fades and rises 12px as one piece; nothing inside moves; the rings never animate.
- **Pastors spread:** the two portraits rise with a 120ms offset, so the staggered layout reads as deliberate.
- **Mosaic and portraits:** hover zoom 1.03 over 300ms `--ease-out`, hover devices only.
- **Closing panel:** parallax drift `translateY(-6%)` to `translateY(6%)` with CSS scroll driven animation inside `@supports (animation-timeline: view())`.
- **Buttons:** press scale 0.97 over 160ms; arrow circles slide 4px on hover.

## 8. Responsive
- **Mobile under 768px:** display at 40px; hero text at the left gutter; the family photo becomes 4:3; mission columns stack with horizontal `--line-dark` hairlines; the timeline turns vertical (section 5); founders portrait above the text at up to 300px wide; belief descriptions beneath their names; pastors stack with no stagger, portraits up to 360px wide; the mosaic becomes one column (large photo 4:3); blue band rows keep markers above titles. No horizontal page scroll at 360px.
- **768px to 1199px:** mission stays three columns with 22px sentences; timeline stays horizontal with years at 40px; pastors stay two columns with a 48px stagger; mosaic keeps its layout.
- **Desktop 1200px and up:** content max width 1200px, gutters 40px, section padding 112px.

## 9. Full copy
All `[CONFIRM]` lines are drafts for the pastors.

**Hero** (label `ABOUT US`)
- Headline: `A small church with a *big* family.`
- Lead: `We are Family Church of San Diego, a congregation of the Family Federation for World Peace and Unification in La Mesa. Here is who we are, what we believe, and who you will meet on a Sunday.`
- Actions: `Plan your visit`, `Meet our pastors`

**Who we are** (label `WHO WE ARE`) [CONFIRM]
- Statement: `We are neighbours, couples, parents, grandparents and young people from many backgrounds and countries, gathered in La Mesa around one hope: that every family can become a place where God's love feels at home.`
- Body: `Our Sundays mix worship, music and a message with plenty of time to talk. Through the week we study together, serve our city and look after one another, and most months one Sunday becomes a picnic in the park instead of a service.`
- Photo caption: `OUR CHURCH FAMILY`

**What we are about** (label `WHAT WE ARE ABOUT`) [CONFIRM all three]
- `MISSION` `To share God's heart, and the teachings and Marriage Blessing of True Parents, with San Diego.`
- `VISION` `Homes across our city where God feels welcome, and a church that feels like one family.`
- `PURPOSE` `To help every person, couple and family grow in love for God and for one another.`

**Our story** (label `OUR STORY`; heading `From one Blessing to one *family*.`)
- `1960` **The first Blessing.** `Rev. Sun Myung Moon and Dr. Hak Ja Han Moon are married, beginning the Marriage Blessing that is at the heart of our movement.`
- `1994` **The Family Federation.** `The Family Federation for World Peace and Unification is founded to bring the Blessing and God-centred family life to people of every faith.`
- `[YEAR]` **Family Church of San Diego.** `Our congregation begins meeting in San Diego.` [CONFIRM year and wording]
- `TODAY` **La Mesa, every Sunday.** `A growing church family at 9754 Grosalia Ave, gathering at 11:00 AM.`

**Our founders** (label `OUR FOUNDERS`)
- Names: `Rev. Sun Myung Moon and Dr. Hak Ja Han Moon`
- Line: `Affectionately known as Father and Mother Moon, True Parents`
- Heading: `A Story of Love and Devotion`
- Paragraph 1 (verbatim from FamilyFed): `The heart of the Unification movement Rev. and Dr. Moon founded is the recreation of God's ideal family. Beginning from their own Marriage Blessing in 1960, Father and Mother Moon are calling men and women to transcend race and religion, rebuilding the family as the vessel of true lasting love, and the cornerstone of world peace through the Marriage Blessing.`
- Paragraph 2 (verbatim): `This tradition of God-centered marriage provides a powerful model for building a family of true love, and expanding in life, to establish a foundation for lasting peace. Unificationists affectionately refer to the Rev. and Dr. Moon as True Parents for their taking on the role of parents to all of humankind.`
- Source: `From familyfed.org`

**What we believe** (label `WHAT WE BELIEVE`) [CONFIRM all four]
- `01` **God is our Heavenly Parent.** `We believe God is not distant but a loving Parent to every person. Our faith is about growing a real, daily relationship with that Parent.`
- `02` **The Divine Principle.** `Our teachings, the Divine Principle, explain God's purpose in creating us, how humanity lost its way, and how the world can be restored. We study it together on Sundays and through the week.`
- `03` **True love begins at home.** `The family is where we first learn to love the way God loves. Healthy marriages and loving homes are the foundation of a peaceful world.`
- `04` **The Marriage Blessing.** `The Blessing is a God-centred marriage ceremony offered to couples of every faith and background, including couples who are already married. It is at the heart of our church.`
- Link: `Read more at familyfed.org`

**Our pastors** (label `OUR PASTORS`; heading `The people who will *greet* you.`)
- `CO-PASTORS` **Jasmine and Mikuni Santoro.** `Jasmine and Mikuni lead Family Church of San Diego together and share the pulpit most Sundays. Their heart is for families: helping couples grow closer, helping young people find their footing in faith, and making sure nobody who visits on a Sunday leaves as a stranger.` [CONFIRM] Link: `Write to our pastors`
- `ASSISTANT PASTOR` **Walter Frank.** `Walter supports the pastoral team in teaching, care and the day to day life of the church, and is often the first face you will see on a Sunday morning.` [CONFIRM]

**Life together** (label `LIFE TOGETHER`; heading `Snapshots from our church *family*.`)
- Captions: `SUNDAY PICNIC`, `GAME AFTERNOON`, `CHRISTMAS SERVICE`, `PRAYING TOGETHER AT THE PARK`, `[CONFIRM caption]` (group-purple), `[CONFIRM caption]` (outing-selfie)

**Your first Sunday** (label `NEW HERE?`; heading `Your first *Sunday*.`)
- `ARRIVE` **Come a little early.** `Service begins at 11:00 AM at 9754 Grosalia Ave in La Mesa. Parking is on site and someone will be at the door to say hello.` [CONFIRM parking]
- `WORSHIP` **Sing, pray, listen.** `We open with music and prayer, then a message for the week ahead. The whole service runs about ninety minutes.` [CONFIRM length]
- `CHILDREN` **Bring the kids.** `Children are welcome in the service. Ask at the door about what is available for younger ones that week.` [CONFIRM]
- `AFTERWARDS` **Stay a while.** `Most people linger to talk after the service. On picnic Sundays there is no service; we meet at the picnic instead, so check the calendar before your first visit.`
- Pill: `Read the full FAQ`

**Closing panel**
- Heading: `Have questions? We would love to *meet* you.`
- Line: `Send us a message, or just come by on a Sunday.`
- Actions: `Contact us`, `Get directions`

## 10. Images
All through `images.ts`, served as described in the master prompt (AVIF and WebP via `vite-imagetools`, explicit sizes, lazy below the first screen). Alt text as in the master prompt's photo table.

| File | Where | Treatment |
| --- | --- | --- |
| `fellowship-dinner.jpg` | Hero | Hero wash, `object-position: 50% 78%`, eager and `fetchpriority="high"` |
| `congregation-group.jpg` | Who we are | Clean, 21:9 (4:3 mobile) |
| `logo-mark.png` | Founders placeholder | White via filter, on `--blue` 4:5 |
| `pastors-santoro.jpg`, `pastor-frank.jpg` | Pastors | Clean 4:5; Walter at `object-position: 22% 30%` |
| `picnic-kids.jpg`, `youth-room-games.jpg`, `christmas-singers.jpg`, `picnic-circle.jpg`, `group-purple.jpg`, `outing-selfie.jpg` | Mosaic | Clean |
| `congregation-2026.jpg` | Closing panel | Banner wash, parallax |

## 11. SEO, accessibility and hosting
Same rules as the master prompt section 11: one `h1` per page (the hero headline), visible focus rings (2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds and photos), a `title` on every iframe, a visible label on every field, Open Graph and Twitter tags with `og.jpg`, the canonical URL `https://familychurchofsandiego.org/about`, and the route's own `<title>` and description below. Lighthouse targets on mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- `<title>`: `About | Family Church of San Diego`. Description: `Meet Family Church of San Diego: our story, our founders, what we believe and the pastors who will greet you in La Mesa.`
- The timeline is an ordered list (`<ol>`) so screen readers hear it in order; years are part of each item's text.
- Anchors: `#who-we-are`, `#mission`, `#story`, `#founders`, `#beliefs`, `#pastors`, `#gallery`, `#first-sunday`, each with `scroll-margin-top: 96px`.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.
- Specific to this page: anchors that land on nothing; placeholder or lorem bios; staff cards with shadows; a belief list styled as an icon grid; text over the family photo or portraits; gold on the blue band; a timeline with invented dates (unconfirmed years stay `[CONFIRM]`).

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
1. Confirm the shared foundation from the master prompt exists (tokens, fonts, navbar, service bar, footer, `images.ts`, `church.ts`, calendar and live hooks).
2. Hero and who we are; then the navy mission band.
3. The timeline component, with its draw animation and vertical mobile version.
4. Founders panel, beliefs, pastors spread, mosaic, blue first Sunday band, closing panel.
5. Check every anchor, then 360px, 768px, 1024px and 1440px, then reduced motion, then Lighthouse.
