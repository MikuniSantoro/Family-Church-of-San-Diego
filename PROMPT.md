# Family Church of San Diego: Church Website Prompt

## 1. Goal
Build a warm, unhurried website for **Family Church of San Diego**, a Family Federation (FFWPU) congregation in La Mesa, California, at `https://familychurchofsandiego.org`. White and cream paper, FamilyFed blue, deep navy, thin gold rules, pill buttons, the church's own logo, its own photographs of its own members (all prepared in `/public/images`, see section 10), and a quiet serif. It belongs to the same family as Chicago Family Church and Bay Area Family Church, but it is warmer than either. It should feel like a well printed Sunday bulletin handed to you at the door, not a megachurch advert.

A first time visitor must be able to answer three questions within five seconds of landing: **when** (Sunday, 11:00 AM), **where** (9754 Grosalia Ave, La Mesa), and **what is it like** (photographs, the latest sermon, the values).

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on **Vercel**: the Vite app is the static frontend, and four small serverless functions in `/api` are the backend: `/api/subscribe` for the newsletter (section 15), `/api/calendar` for the church's Google Calendar (section 16), `/api/live` for real YouTube live status (section 17) and `/api/sermons` for the recent sermons list (`pages/sermons.md`).

Five main routes: `/`, `/about`, `/sermons`, `/contact`, `/donate`, plus two small ones for the newsletter: `/newsletter/confirmed` and `/privacy`. No CMS, no component libraries, no carousel, no popups. `lucide-react` only for these glyphs: `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Social networks are written as words, never as logos.

External services, all configured through environment variables in the Vercel dashboard (and `.env.local` for local work; commit only `.env.example`):
```
# Browser side (VITE_ prefix means it ships in the bundle; never put a secret here)
VITE_FORMSPREE_ID=           # Formspree form ID for the contact form
VITE_TURNSTILE_SITE_KEY=     # optional Cloudflare Turnstile site key for the newsletter form

# Server side only (read by /api/subscribe, never exposed to the browser)
BREVO_API_KEY=               # Brevo API v3 key
BREVO_LIST_ID=               # numeric id of the "Sunday Letter" list in Brevo
BREVO_DOI_TEMPLATE_ID=       # numeric id of the double opt-in confirmation template
SITE_URL=https://familychurchofsandiego.org
GCAL_ID=                     # the church's public Google Calendar ID (section 16)
GCAL_API_KEY=                # Google API key with only the Calendar API enabled
YOUTUBE_API_KEY=             # Google API key with only the YouTube Data API v3 enabled (live status and sermons list)
TURNSTILE_SECRET_KEY=        # optional; when set, the API requires a valid Turnstile token
```
If a browser side variable is missing, the related feature falls back to a graceful static state (described per section). If the calendar variables are missing, `/api/calendar` answers 503 and every calendar driven part of the site falls back as described in section 16. If the Brevo variables are missing, the newsletter form still renders but the API answers 503 and the form shows the email fallback message. The site must build and look finished with none of them set.

Constants live in one file, `src/data/church.ts`, so a volunteer can change a time or an email in one place:
```ts
export const church = {
  name: "Family Church of San Diego",
  shortName: "Family Church",
  tagline: "God's Dream, One Family",
  domain: "https://familychurchofsandiego.org",
  service: { day: "Sunday", time: "11:00 AM", startHour: 11, durationMin: 90, tz: "America/Los_Angeles" },
  picnic: { usually: "first Sunday of the month", replacesService: true }, // RULE: a picnic Sunday is never a service day. Real picnic dates come from the Google Calendar (section 16)
  calendar: {
    publicUrl: "https://calendar.google.com/calendar/embed?src=<GCAL_ID>&ctz=America/Los_Angeles", // [CONFIRM] link for "See the full calendar"
    picnicKeyword: "picnic",          // an event on a Sunday whose title contains this marks that Sunday as a picnic
    cancelledKeyword: "no service",   // an event on a Sunday whose title contains this marks the service as cancelled
  },
  address: { street: "9754 Grosalia Ave", city: "La Mesa", state: "CA", zip: "91941" },
  email: "familychurchofsandiego@gmail.com",
  phone: null, // [CONFIRM] add a number or leave null to hide it
  facebook: "https://www.facebook.com/profile.php?id=61580314035399",
  instagram: "https://www.instagram.com/familychurchofsandiego/",
  youtube: {
    handle: "https://www.youtube.com/@FamilyChurchofSanDiego",
    channelId: "UCJzineYja9iNlAf5_BwJhMA",
    uploadsPlaylist: "UUJzineYja9iNlAf5_BwJhMA",
    live: "https://www.youtube.com/@FamilyChurchofSanDiego/live",
  },
  giving: { zelle: "familychurchofsandiego@gmail.com", payee: "HSA-UWC" },
  newsletter: { name: "The Sunday Letter", frequency: "weekly", sender: "news@familychurchofsandiego.org" }, // [CONFIRM]
  devotion: null as null | { name: string; when: string; url: string }, // [CONFIRM] set this if the church runs a weekday devotion (pages/sermons.md)
};
```

Every photo and logo is referenced through one map, `src/data/images.ts`, never by a hard coded path inside a component. Each entry holds the file name, width, height, alt text, caption and `object-position` from section 10. Swapping a photo (for example when a parent asks for a child's photo to come down) is then a one line change.
```ts
export const images = {
  hero:        { src: "picnic-wisteria.jpg",   w: 2048, h: 1152, pos: "50% 55%", alt: "Church families gathered around a picnic table of food under a wisteria arbor" },
  picnicPanel: { src: "picnic-park.jpg",       w: 2400, h: 1350, pos: "50% 60%", alt: "Church members gathered under a pine tree at a park picnic with tables of food" },
  // ...one entry per row of the photo table in section 10
} as const;
```

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

**Home section rhythm:** white nav, photo hero, blue service bar, cream (Sundays), white (values), navy (sermon), cream (calendar), white (life together), cream (roots), blue washed photo panel, navy-deep footer. White and cream alternate so no two neighbouring light sections share a ground. Hairlines and tints instead of boxes and shadows.

**Photos never carry text unless they are washed.** Portraits, mosaics, galleries, thumbnails and group photos without a wash are shown clean, so faces stay visible. On Home, two photos carry text over a wash: the hero (`picnic-wisteria.jpg`) and the picnic panel (`picnic-park.jpg`). Every other page opens with its own washed photo hero (hero recipe) and lists its washed photos in its own prompt.

Spacing: 8px base unit. Section padding 112px desktop, 88px tablet, 72px mobile. Content max width 1200px, gutters 40px desktop, 20px mobile. Inset panels sit 16px from the viewport edge.

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

## 5. Signature elements

**A. The next eight Sundays.** A strip of eight equal cells drawn only with hairlines, one per upcoming Sunday, computed from today's date in `America/Los_Angeles`. The strip sits on `--white` inside a `--cream` section. Each cell shows the month as a `--muted` label (`OCT`) and the day as an `--ink` Libre Baskerville numeral at 44px. Rules:
- The next Sunday (today counts until 12:30 PM Pacific) is filled with `--blue`, white text, and the label `THIS SUNDAY` or `NEXT SUNDAY` above, `11:00 AM` below.
- **Rule: a picnic Sunday is not a service day.** If the calendar has a picnic on a Sunday, there is no 11:00 AM service that Sunday, no livestream, and the site must never show or imply one. The picnic replaces the service. Volunteers do not need to add a separate `No service` event for picnic Sundays. This rule is enforced in one place, `isServiceSunday()` in `src/lib/calendar.ts` (section 16), and every part of the site asks that function rather than deciding for itself.
- **Picnics come from the Google Calendar, not from the date.** A Sunday gets the small gold rings glyph (B) and the label `PICNIC` in `--ink` only when the church calendar has an event on that day whose title contains `picnic` (any case). Below the numeral, instead of a service time, it shows the picnic's start time from the event (for example `12:00 PM`) and a second small line `NO SERVICE`. The date itself is not struck through, because people are still gathering. A first Sunday with no picnic event shows nothing extra. A picnic moved to a different Sunday shows on that Sunday. The gold lives in the rings, never in the small text.
- **Cancellations come from the calendar too.** A Sunday with an event whose title contains `no service` shows a muted strikethrough on the date and the label `NO SERVICE`, and if it is the next Sunday, the blue fill moves to the following Sunday that does have a service.
- **The blue fill always marks the next real service.** Picnic Sundays and `No service` Sundays are both skipped. If the coming Sunday is a picnic, the strip shows the picnic cell with its gold rings first, and the blue `NEXT SERVICE` cell is the following service Sunday. The top label on the blue cell reads `THIS SUNDAY` only when the next service really is this Sunday, otherwise `NEXT SERVICE`.
- Other events that fall on a Sunday (a guest speaker, a holiday service) are not shown in the strip; they appear in the calendar rows below.
- While the calendar is loading, the strip renders immediately with dates only (no picnic or cancellation labels) and the labels fade in when the data arrives (200ms). If the calendar cannot be reached, the strip stays dates only.
- Its entrance is specified in section 7.
- Caption beneath in `--muted`: `Service is at 11:00 AM on Sundays. On picnic Sundays (gold rings) there is no service; we meet at the picnic instead.` When the next picnic is known, a second line adds `Next picnic: Sunday, November 1, 12:00 PM at Lake Murray Park.` using the event's time and location. If the calendar shows no picnic in the eight weeks, or cannot be reached, the caption is only `Service is at 11:00 AM on Sundays.`

It answers "when can I come?" without anyone ever updating the site. No icons in the cells, no shadow, no hover lift.

**B. The Blessing rings.** Two interlocking circles drawn as a single inline SVG, stroke `--gold`, 1.25px, 32 by 18px, no fill. This is the only ornament on the site, a quiet nod to the Marriage Blessing. Uses:
- Section divider: hairline, 24px gap, rings, 24px gap, hairline, centred, max width 320px.
- Beside the founders' names on the About page.
- At 14px inside picnic Sunday cells of the strip.
- In the footer beside the copyright line.
Never animate it, never colour it anything but gold, never use it as a bullet.

**C. The service bar.** Bay Area's signature, a full width `--blue` band directly beneath every page hero, 96px tall on desktop. Left: label `SUNDAY SERVICE` (white at 78 per cent) above `11:00 AM` in Libre Baskerville 28px. Middle: label `WHERE` above `9754 Grosalia Ave, La Mesa` as an underlined link to Google Maps directions. Right: a `--blue-deep` pill `Watch live` linking to the YouTube live URL, with an 8px dot before the text. **The dot is driven only by real YouTube live status (section 17), never by the clock:** white at 55 per cent and still when nothing is streaming; `--live` green with a gentle pulse, the label `Live now` and a link straight to the live video when YouTube confirms the channel is live; solid white with `Starts at 11:00 AM` when a broadcast is scheduled within the hour.

**When the coming Sunday is a picnic** (from Monday through the end of that Sunday), the bar changes so nobody turns up at 11:00 AM expecting a service: left becomes label `THIS SUNDAY` above `Picnic, 12:00 PM` (the event's start time); middle becomes label `WHERE` above the event's location linked to Google Maps (or the church address if the event has none); right becomes a small line `NO SERVICE THIS WEEK. BACK ON SUNDAY, NOVEMBER 8.` in place of the `Watch live` pill (unless YouTube reports the channel is actually live, in which case the green `Live now` pill shows instead). When the coming Sunday is a `No service` Sunday, the bar shows `THIS SUNDAY` above `No service` and the same `Back on Sunday, {date}` line. While the calendar is loading or unavailable, the bar shows the normal service content. On mobile the three parts stack with `--line-dark` hairlines between them.

## 6. Pages and sections, each a different skeleton

### Global
1. **Skip link** to `#main`, visible on focus.
2. **Navbar**: 80px, `--white` (both reference sites use a white header), sticky. The hairline beneath is invisible at the top of the page and fades in after 40px of scroll. Logo left (`/images/logo.png`, the church's own mark and wordmark, 44px tall, about 178px wide; its blue is exactly `--blue-ink`). Links right in Work Sans 16px `--blue-ink`: Home, About, Sermons, Contact. The active route has a 1px `--gold` underline, and the same underline grows from the left on hover. Then a small `--blue` pill `Donate` with a round arrow circle. Under 900px: logo plus a `Menu` button that opens a full screen `--navy` sheet with the logo in white at 36px (`logo.png` with `filter: brightness(0) invert(1)`), links in white Libre Baskerville 40px, a white Donate pill, and the service time (`--gold-light` label) and address (`--sky`) at the bottom. Escape and the close button both close it, focus moves into the sheet on open and back to the menu button on close, and the page behind does not scroll.
3. **Footer**: `--navy-deep` (Bay Area's footer colour), white headings, `--sky` links that turn white on hover. It opens with the **newsletter band** on every page (section 15): a split row, label `THE SUNDAY LETTER` and a white serif heading on the left third, the sign up form on the right two thirds, then a `--line-dark` hairline. Beneath it, four columns: the round logo mark (`logo-mark.png`, 56px, turned white with `filter: brightness(0) invert(1)`), then the church name set in Libre Baskerville italic 24px in `--gold-light` (Bay Area sets its footer name in gold italic), with the tagline label `GOD'S DREAM, ONE FAMILY` beneath; Visit (address, `Sundays at 11:00 AM`, `Get directions`); Contact (email, Facebook, Instagram, YouTube as words); Pages (Home, About, Sermons, Contact, Donate, Privacy). Column labels in `--gold-light`. Beneath: a `--line-dark` hairline, then `© 2026 Family Church of San Diego. A community of the Family Federation for World Peace and Unification.`, and the rings on the right. (Add the official FamilyFed logo beside the rings only if the church supplies a white version; none is in the asset folder.)
4. **Back to top**: a 48px round `--blue` button fixed bottom right (Bay Area has one). It appears only after the visitor has scrolled one and a half screens.

### Home `/`
1. **Hero, photograph with left aligned statement**: full bleed `picnic-wisteria.jpg` (`object-position: 50% 55%`) with the hero wash recipe. Min height `clamp(560px, 78vh, 760px)`, content anchored to the bottom third. Label `GOD'S DREAM, ONE FAMILY` in `--gold-light`. White display headline starting at one third of the content width on desktop (left edge on mobile). Lead paragraph beneath in white at 92 per cent, max 52ch. Two actions: white pill `Plan your visit` and outline pill `Watch the latest sermon`.
2. **Service bar** (signature C).
3. **The next eight Sundays**: `--cream`. Label column `WHEN WE GATHER` on the left third, heading and strip (signature A) across the remaining two thirds, caption under the strip.
4. **Our values, Swiss list**: `--white`. Label column `OUR VALUES`. Three stacked rows from one third, separated by hairlines. Each row: a `--blue` roman numeral label (`I`, `II`, `III`), the value name in Libre Baskerville clamp(34px, 3.2vw, 44px) `--blue-bright`, and a two sentence description in `--text` to the right on wide screens, beneath it below 1200px. Not a three column card grid.
5. **Latest sermon**: `--navy`, white headings, `--sky` body. Left column: label `LATEST MESSAGE`, heading, short paragraph, links `All sermons` and `Subscribe on YouTube`. Right column: the newest sermon from `/api/sermons` (see `pages/sermons.md`): a 16:9 poster button first (its YouTube thumbnail at 75 per cent opacity on `--navy-deep`, with a white play circle holding a `--blue` triangle), and its date, speaker and title beneath in `--sky` and white. Only mount the iframe (`https://www.youtube-nocookie.com/embed/{id}?autoplay=1`, 12px corners, a descriptive `title`) on click, to keep the page fast. If `/api/sermons` is unavailable, the poster uses `christmas-singers.jpg` and the iframe is the uploads playlist embed (`videoseries?list=UUJzineYja9iNlAf5_BwJhMA`).
6. **What's happening, calendar rows** [`#calendar`]: `--cream`. Label `CHURCH CALENDAR`. Up to six upcoming events from `/api/calendar` (section 16), the same data the Sundays strip and picnic panel use, fetched once per page view. Each row on a hairline: date block (`--blue` month label over a 36px `--ink` serif day) / event title in `--ink` serif 22px / time and location in `--muted` / `--blue` `ArrowUpRight` linking to the event's `htmlLink`. Picnic events show the gold rings glyph before their title and `NO SERVICE THIS SUNDAY` after their time and place. Cancelled services show `NO SERVICE` in place of the time. Under the list: `See the full calendar` in `--blue-ink` linking to `church.calendar.publicUrl`. Loading state: six skeleton rows filled with `--mist`. If the request fails, show only the next four Sunday services (computed from the date, no picnics, since picnics are never guessed) with the note `The full calendar is coming soon.`
7. **Life together, photo mosaic**: `--white`. Label column `LIFE TOGETHER`, heading and one sentence from one third. Beneath, full content width, a mosaic of four photos with 12px corners and a 24px gap: `congregation-2026.jpg` large on the left (7 of 12 columns, spanning two rows), `youth-room-billiards.jpg` and `young-adults.jpg` stacked on the right (16:10), and `hike.jpg` as a 21:8 strip across the bottom. Each has a `--muted` label caption beneath (`SUNDAY FAMILY, FEBRUARY 2026`, `THE YOUTH ROOM`, `YOUNG ADULTS`, `HIKING DAY`). On mobile the four stack in one column. This is the section that answers "what is it like?".
8. **Our roots, founders teaser**: `--cream`. The rings divider, then a centred `--ink` Libre Baskerville line at 34px, a short paragraph, and a `--blue-ink` text link `Meet our founders` to `/about#founders`.
9. **First visit panel, photograph**: `picnic-park.jpg` (`object-position: 50% 60%`) with the banner wash recipe, inset 16px, `--panel-radius`. White headline, one line of body, a white pill `Plan your visit` and an outline pill `Get directions`. The headline depends on the calendar: when a picnic is coming up in the next eight weeks it names the date; otherwise it uses the general invitation (both in section 9). It never promises a picnic the calendar does not show.
10. **Footer**.

### Other pages
Each other page has its own full prompt in `pages/`, written in exactly the same structure as this file (1 Goal to 14 Build order), carrying the same design system and typography word for word. Every page has the same richness as Home: a washed photo hero, the blue service bar, its own signature element, light and dark bands in rhythm, and real photographs. The page file is the source of truth for that page's sections and copy.
- `pages/about.md`: `/about`. Signature: a gold timeline from the founders' 1960 Blessing to La Mesa today. Also a navy mission band, the founders panel, beliefs, a pastors portrait spread, a six photo mosaic and a blue first Sunday band.
- `pages/sermons.md`: `/sermons`. Signature: the navy stage player fed by the recent messages list, which becomes the livestream on its own. Also speakers with portraits and a washed watch live panel. Contains the `/api/sermons` backend.
- `pages/contact.md`: `/contact`. Signature: the blue Sunday card that always tells the truth about this Sunday and adds it to your calendar. Also the message form, map, navy coming up rows and the FAQ.
- `pages/donate.md`: `/donate`. Signature: the navy giving card with one tap copy. Also cash or check, three photo columns of where gifts go, and a scripture verse over a parallax photo.
- `pages/newsletter-confirmed.md`: `/newsletter/confirmed`. Signature: a thank you hero that invites people to this Sunday.
- `pages/privacy.md`: `/privacy`. Signature: a reading column with a quiet sticky index.

## 7. Motion
Motion here does three jobs: welcome a first time visitor once, show where each section begins as it arrives, and confirm every tap. Anything a person uses repeatedly stays fast and quiet. Chicago's own Squarespace theme fades every block in over 0.9s, and Bay Area uses a parallax photo band and a back to top button. This keeps those ideas and makes them smoother.

**Tokens.** Use exactly these curves, nothing hand rolled:
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* every entrance, reveal and press */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* movement on screen: the Sundays fill */
```
Hover colour changes use plain `ease`. Never `ease-in`, never `transition: all`, never `scale(0)`. Only `transform` and `opacity` move (plus colour transitions).

**1. Hero welcome, once per page load.** CSS keyframes, not JavaScript, so it stays smooth while fonts and images load.
- Photo settles from `scale(1.06)` to `scale(1)`, 1600ms `--ease-out`.
- Label, headline, lead and actions rise 16px and fade in, 900ms `--ease-out`, starting 100ms, 220ms, 340ms and 460ms after load.
- The service bar does not animate. It is the anchor the eye lands on.

**2. Scroll reveals, once each.** Section labels, headings, paragraphs, rows and panels start at `opacity: 0; translateY(12px)` and settle to rest over 700ms `--ease-out` when 15 per cent visible (IntersectionObserver with `rootMargin: 0px 0px -60px 0px`, unobserve after firing). Siblings in a group stagger 60ms apart, capped at the sixth item so a long list never makes anyone wait. Hide content only after JavaScript has loaded (add a `js` class to `<html>` first), so the site is fully readable if scripts fail. In React use `motion/react` with `useInView(ref, { once: true, margin: "-60px" })` and animate `transform` strings, not the `x` and `y` shorthands.

**3. The next eight Sundays.** When the strip enters view, cells rise 12px and fade in one by one, 60ms apart, left to right (600ms `--ease-out` each). 150ms after the last cell lands, the blue fill wipes into the next Sunday's cell from the left with `transform: scaleX(0)` to `scaleX(1)`, 600ms `--ease-in-out`, and that cell's text turns white 250ms into the wipe. Once only.

**4. Picnic panel parallax (Bay Area's photo band).** The photo drifts from `translateY(-6%)` to `translateY(6%)` as the panel crosses the viewport, using CSS scroll driven animation (`animation-timeline: view(); animation-range: cover`) inside `@supports (animation-timeline: view())`. The image box extends 8 per cent beyond the panel so no edge shows. Browsers without support simply show a still photo. Do not use `background-attachment: fixed` (it breaks on iPhones) and do not drive it with scroll listeners.

**5. Feedback on every press and hover.**
- Every button and the sermon poster: `:active` scales to 0.97 over 160ms `--ease-out` (the poster to 0.99 because it is large). Not gated, because a tap is a real press on phones.
- Hover, only inside `@media (hover: hover) and (pointer: fine)` so phones never get stuck hover states: arrow circles slide 4px right (200ms `--ease-out`); pill backgrounds change colour (200ms `ease`); text link underlines grow from 30 per cent to full width from the left (250ms `--ease-out`); nav underlines grow from the left; calendar row titles turn `--blue` and their arrow moves 3px up and right; the poster play circle grows to 1.06; mosaic and gallery photos zoom to 1.03 inside their rounded frame (300ms `--ease-out`); footer links turn white.
- No lifts, no shadows, no glows.

**6. Navigation.**
- Navbar hairline fades in after 40px of scroll, 200ms `ease`.
- Mobile menu sheet: opacity and `translateY(-8px)` to rest over 250ms `--ease-out`; links follow, 40ms apart starting at 80ms. Closing reverses over the same path. Use CSS transitions toggled by a class, not keyframes, so tapping open and shut quickly never jumps.
- Route changes: the new page fades in over 200ms `--ease-out` and the window scrolls to the top instantly. No exit animation, so navigation never waits.
- Back to top button: fades in and rises 8px over 200ms when it appears; clicking scrolls smoothly to the top.

**7. Small state changes.**
- Sermon poster to player: the iframe fades in over 300ms once it has loaded, so there is no white flash.
- Copy button on Donate: the `Copy` icon and label crossfade to `Check` and `Copied` over 150ms, then back after 2 seconds.
- Contact form and newsletter form: on success the form fades out and the thank you message fades in, 250ms `--ease-out`. While submitting, the button label changes to `Signing up` and the arrow circle is replaced by a small spinner (a 16px ring rotating with `linear` timing, the one allowed loop besides the live dot, removed under reduced motion). Error text fades in under the field over 200ms; the field itself never shakes.
- Live dot: when the status changes to `live`, the dot's colour transitions from white to `--live` over 300ms `ease` and the label crossfades to `Live now` (150ms); then an opacity pulse (1 to 0.4, 1600ms `ease-in-out`, infinite) runs only while the status stays `live`. When the stream ends it fades back to white and stops. Under reduced motion the dot is solid green with no pulse.

**Never animate:** the rings, the service bar, body text after it has appeared, prices or numbers, the map, anything on a timer or loop other than the live dot and the submit spinner. No carousels, no typing effects, no counters, no scroll jacking, no mouse following.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, keep the gentle fades and drop the movement: hero text fades in over 400ms with no rise, reveals fade over 300ms with no translate, the photo does not settle or drift, the Sundays fill appears instantly, presses do not scale, the live dot is solid and still, and smooth scrolling becomes an instant jump.

## 8. Responsive
- **Mobile under 768px:** display at 40px, all label columns sit above their content, hero text aligned to the left gutter. The Sundays strip becomes four columns by two rows. The service bar stacks into three rows. The Life together mosaic stacks into one column (the large photo at 4:3, the strip at 16:10). The About group photo panel changes from 21:9 to 4:3 so faces stay a usable size, the fellowship dinner photo moves beneath "Who we are", each pastor portrait sits above its name and bio, and the gallery becomes one column. Founders portrait (or its logo placeholder) sits above the text. Contact form goes beneath the details. The newsletter band stacks: heading, then the name field, the email field and a full width button, each on its own row. No horizontal page scroll at 360px.
- **Tablet and small laptop, 768px to 1199px:** Sundays strip stays eight columns with day numerals at 34px and 10px cell padding. Values rows put the description beneath the name (the two thirds column is too narrow for name and description side by side below 1200px). Calendar rows keep all four parts.
- **Desktop 1024px and up:** content max width 1200px, gutters 40px, section padding 112px, label column one third.

## 9. Full copy

All copy marked `[CONFIRM]` is a draft for the pastors to check before launch.

**Meta:** title `Family Church of San Diego | Sundays at 11 AM in La Mesa`. Description `A Family Federation church in La Mesa, California. Join us on Sundays at 11:00 AM for worship, a message, and time together as one family.`

**Nav:** Home, About, Sermons, Contact. Button: `Donate`

**Service bar:** `SUNDAY SERVICE` / `11:00 AM` · `WHERE` / `9754 Grosalia Ave, La Mesa` · `Watch live`. While YouTube reports live: `Live now`. While a broadcast is scheduled within the hour: `Starts at {time}`.

### Home
**Hero** (label `GOD'S DREAM, ONE FAMILY`)
- Headline: `Come as you are. Stay like *family*.`
- Lead: `Family Church of San Diego is a home for anyone who wants to know God as a loving Heavenly Parent. We gather in La Mesa on Sundays at 11:00 AM to worship and learn, and most months we swap the service for a picnic together.`
- Actions: `Plan your visit` (to `/about#first-sunday`), `Watch the latest sermon` (to `/sermons`)

**The next eight Sundays** (label `WHEN WE GATHER`)
- Heading: `Sundays at eleven.`
- Caption: `Service is at 11:00 AM on Sundays. On picnic Sundays (gold rings) there is no service; we meet at the picnic instead.` Second line when known: `Next picnic: Sunday, {date}, {time} at {location}.` Fallback: `Service is at 11:00 AM on Sundays.`

**Our values** (label `OUR VALUES`)
- `I` **Faith.** `We believe God is our Heavenly Parent, close enough to talk to and real enough to change how we live on a Tuesday. Our faith grows through prayer, study and the teachings of True Parents.` [CONFIRM]
- `II` **Community.** `Church is the people, not the building. We cook, serve, sing, pray and celebrate together, and we make room for whoever walks in next.` [CONFIRM]
- `III` **Family.** `Everything comes back to the family. We support marriages, raise our children together, and work toward homes where love is the first language.` [CONFIRM]

**Latest sermon** (label `LATEST MESSAGE`)
- Heading: `Missed a Sunday? Catch *up* here.`
- Paragraph: `Every message is recorded and posted to our YouTube channel. Watch the newest one here, or browse them all.`
- Links: `All sermons`, `Subscribe on YouTube`

**Calendar** (label `CHURCH CALENDAR`)
- Heading: `What's happening.`
- Link: `See the full calendar`
- Fallback note: `The full calendar is coming soon.`

**Life together** (label `LIFE TOGETHER`)
- Heading: `More than a *Sunday*.`
- Sentence: `Picnics, game nights, hikes and holiday music. Most of what makes us a family happens around the edges of the service.`
- Captions: `SUNDAY FAMILY, FEBRUARY 2026`, `THE YOUTH ROOM`, `YOUNG ADULTS`, `HIKING DAY` [CONFIRM]

**Our roots**
- Line: `God's dream has always been one family centered on true love.`
- Paragraph: `Our church grew from the life and work of Rev. Sun Myung Moon and Dr. Hak Ja Han Moon, who began the Marriage Blessing in 1960 and spent their lives inviting people of every race and religion into one family under God.`
- Link: `Meet our founders`

**First visit band**
- Headline when a picnic is on the calendar: `Picnic Sunday, {date}. Come for the *food*.` Body: `There is no service that day. We meet at {location} at {time} instead. Bring your appetite and your family; newcomers are always welcome at the table.`
- Headline when none is on the calendar: `Come for the service. Stay for the *people*.` Body: `There is always coffee and conversation after the service. Most months one Sunday becomes a picnic instead; check the calendar for the next one.`
- Actions: `Plan your visit`, `Get directions` [CONFIRM picnic wording]
- Actions: `Plan your visit`, `Get directions`

Copy for the other pages lives in each file in `pages/`.

### Newsletter (footer band on every page)
- Label `THE SUNDAY LETTER`. Heading: `One email a week from your church *family*.`
- Body: `This Sunday's message, what is coming up, and a reminder before every picnic. No spam, and you can unsubscribe in one click.` [CONFIRM frequency and contents]
- Fields: `First name` with the hint `Optional`, and `Email`. Button: `Sign me up`.
- Small print under the button: `We will send one email to confirm. See our privacy note.` (`privacy note` links to `/privacy`)
- Success: `Almost there. We just sent a confirmation link to {email}. Open it to start receiving the Sunday Letter.` Under it a text link `Use a different email` that resets the form.
- Error, invalid email: `Please enter a full email address, like name@example.com.`
- Error, too many tries: `Too many tries from this connection. Please wait a minute and try again.`
- Error, anything else: `Something went wrong on our side. Please try again, or email us at familychurchofsandiego@gmail.com and we will add you.`

### Confirmation email (set up in Brevo, not in the code)
- Subject: `Please confirm your email for the Sunday Letter`
- Body: `Hello {{ contact.FIRSTNAME | default : "friend" }}, thank you for signing up for the Sunday Letter from Family Church of San Diego. Please confirm your email so we know it is really you.` Button `Yes, sign me up` linking to `{{ doubleoptin }}`. Footer line: `If you did not sign up, ignore this email and you will not hear from us.`

### Footer (every page)
`GOD'S DREAM, ONE FAMILY`, `9754 Grosalia Ave, La Mesa, CA 91941`, `Sundays at 11:00 AM`, `Get directions`, `familychurchofsandiego@gmail.com`, `Facebook`, `Instagram`, `YouTube`, Pages: `Home`, `About`, `Sermons`, `Contact`, `Donate`, `Privacy`, then `© 2026 Family Church of San Diego. A community of the Family Federation for World Peace and Unification.`

## 10. Images
Every image the site needs is already prepared in `/public/images`: renamed, rotated upright, resized to at most 2400px wide and saved as JPEG at quality 82. The church's original files are untouched in the `Website Resources` folder. Use `vite-imagetools` to generate AVIF and WebP versions at build time and serve them through `<picture>` with the JPEG as fallback, explicit `width` and `height` to prevent layout shift, and `loading="lazy"` on everything below the first screen. The Home hero photo is the one exception: `loading="eager"`, `fetchpriority="high"`, and a `<link rel="preload" as="image">` for it in `index.html`. Use the alt text given here, through the `images.ts` map from section 2.

Several photos show children (the congregation photos, the picnics, the youth room). Parental consent is being collected [CONFIRM]; any photo may need to be swapped before launch, which is why every path goes through `images.ts`.

**Logos and icons**

| File | Size | Where | Notes |
| --- | --- | --- | --- |
| `logo.png` | 2000 x 496, transparent | Navbar at 44px tall; mobile menu in white | The church's own logo: the family mark plus FAMILY CHURCH OF SAN DIEGO in condensed caps. Its blue is `#114C9C`, the same as `--blue-ink`. Make it white with `filter: brightness(0) invert(1)`; never recolour it any other way. |
| `logo-mark.png` | 512 x 512, transparent | Footer at 56px (white); founders placeholder | The round family mark cropped from the logo. |
| `logo-mark.webp` | 192 x 192 | Spare | The church's own small mark file. |
| `favicon-32.png`, `apple-touch-icon.png` | 32 and 180 | `<head>` | Made from the mark. |
| `og.jpg` | 1200 x 630 | Open Graph and Twitter preview image | Cropped from the church's YouTube style banner (blue band, yellow sun, FAMILY CHURCH San Diego). The banner itself is not used on the site: its script font and painted texture belong to social media, not to this page. |

**Photographs**

| File | Size | Where | Alt text |
| --- | --- | --- | --- |
| `picnic-wisteria.jpg` | 2048 x 1152 | Home hero | Church families gathered around a picnic table of food under a wisteria arbor |
| `picnic-park.jpg` | 2400 x 1350 | Home first visit panel | Church members gathered under a pine tree at a park picnic with tables of food |
| `congregation-2026.jpg` | 2400 x 1350 | Home mosaic (large); About closing panel | The whole congregation together for a group photo after Sunday service, with children holding balloons |
| `youth-room-billiards.jpg` | 2000 x 1125 | Home mosaic | A father and daughter playing pool in the church youth room |
| `young-adults.jpg` | 1600 x 1200 | Home mosaic | Three young adults from the church smiling for a selfie in a park |
| `hike.jpg` | 2000 x 1125 | Home mosaic (strip) | Two church members walking a rocky mountain trail on a sunny day |
| `christmas-singers.jpg` | 2000 x 1500 | Sermon poster on Home and Sermons; About gallery | Four church members singing at the front of the sanctuary during a Christmas service |
| `congregation-group.jpg` | 2048 x 1152 | About header panel | Church members of every age standing together for a group photo in the sanctuary |
| `fellowship-dinner.jpg` | 2400 x 1350 | About, beside "Who we are" | Church members talking over dinner at long tables in the fellowship hall |
| `pastors-santoro.jpg` | 1400 x 2100 (portrait) | About pastors | Co-pastors Jasmine and Mikuni Santoro smiling side by side |
| `pastor-frank.jpg` | 1106 x 869 | About pastors | Assistant Pastor Walter Frank speaking into a microphone with his arm around a church member |
| `picnic-kids.jpg` | 2000 x 1125 | About gallery | Children sharing snacks on a picnic blanket in the park |
| `picnic-circle.jpg` | 2000 x 1125 | About gallery | Church members standing in a circle under a pine tree at a park gathering |
| `youth-room-games.jpg` | 2000 x 1125 | About gallery | Children playing video games together in the decorated youth room |
| `group-purple.jpg` | 2000 x 1199 | About gallery | Church members, several in matching purple jackets, standing together in the sanctuary [CONFIRM what the occasion was] |
| `outing-selfie.jpg` | 1600 x 1200 | About gallery | Five church members smiling for a selfie on a sunny lawn |
| `sermon-jasmine.jpg` | 1280 x 720 | Sermons hero | Co-Pastor Jasmine Santoro preaching at the front of the sanctuary |
| `sermon-mikuni.jpg` | 1280 x 720 | Sermons watch live panel | Pastor Mikuni Santoro preaching at the front of the sanctuary |

**Still needed from the church:**
- `founders.jpg`: an official portrait of Rev. Sun Myung Moon and Dr. Hak Ja Han Moon, cleared for use. Until then the founders panel shows the logo mark.
- A solo portrait of Walter Frank in the same light and framing as the Santoro photo, to replace the cropped event photo.
- Optional: full resolution originals of the two preaching photos (`sermon-jasmine.jpg`, `sermon-mikuni.jpg` are 1280 by 720 frames taken from the church's own YouTube videos), and a non Christmas photo of someone preaching for the Home sermon poster fallback.
- Optional: an exterior photo of the building at 9754 Grosalia Ave, for the Contact page.

## 11. SEO, accessibility and hosting
- `index.html` sets `lang="en"`, the meta title and description, Open Graph and Twitter tags using `og.jpg`, `favicon-32.png` and `apple-touch-icon.png`, and the canonical URL `https://familychurchofsandiego.org`.
- Each route sets its own `<title>` (`About | Family Church of San Diego`, and so on).
- JSON-LD `Church` schema with name, URL, `logo` (`https://familychurchofsandiego.org/images/logo-mark.png`), `image` (`og.jpg`), address, email, the Facebook, Instagram and YouTube URLs in `sameAs`, and an `Event` for the next service Sunday (`nextServiceSunday`, so a picnic Sunday is never published as a service) plus one `Event` for the next picnic when there is one.
- `public/robots.txt` and `public/sitemap.xml` listing the five main routes and `/privacy`. `/newsletter/confirmed` gets `<meta name="robots" content="noindex">` and is left out of the sitemap.
- One `h1` per page. Visible focus rings: 2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds. Every iframe has a `title`. Every form field has a visible label.
- Hosting is Vercel. `vercel.json` rewrites every path except the API to the app, so refreshing `/about` works and `/api/subscribe` still reaches the function:
```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }],
  "headers": [
    { "source": "/api/(.*)", "headers": [{ "key": "Cache-Control", "value": "no-store" }] }
  ]
}
```
- Local development runs with `vercel dev` (it serves the Vite app and the `/api` function together on one port).
- Lighthouse targets: Performance 90+, Accessibility 100, Best Practices 100, SEO 100 on mobile.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.

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
1. Scaffold Vite, Tailwind, the router and the five empty routes. Add `church.ts`, `images.ts` and the CSS tokens. Copy the prepared `public/images` folder in as is.
2. Navbar, footer, service bar, rings SVG.
3. Home, in section order, from this file.
4. The `/api/calendar` function and the shared `useChurchCalendar` hook (section 16), then the Sundays strip, calendar rows and picnic panel on top of it. Formspree form, copy button, each with its fallback.
5. Newsletter: shared validation in `src/lib/newsletter.ts`, the `/api/subscribe` function, its tests, the footer band component, `/newsletter/confirmed` and `/privacy` (section 15). Run the tests.
6. Live status: `/api/live`, `useLiveStatus`, and the dot states in the service bar (section 17), with tests. Then `/api/sermons` and `useSermons` (from `pages/sermons.md`) so the Home sermon band shows the newest message.
6b. The other pages, one at a time, each from its own file in `pages/`: about, sermons, contact, donate, newsletter-confirmed, privacy.
7. SEO files, JSON-LD, `vercel.json`.
8. Check at 360px, 768px, 1024px and 1440px. At each width confirm every photo crop shows faces, not ceilings or empty sky, and adjust `pos` in `images.ts` if not. Check with reduced motion on. Run Lighthouse.

## 15. Newsletter sign up, frontend and backend
**The Sunday Letter** is a weekly email. People sign up in the footer of any page. The browser posts to our own serverless function at `/api/subscribe`, which checks the request and hands the address to **Brevo** using double opt in. Brevo sends the confirmation email, stores the list, handles unsubscribes, and is where volunteers write and send each newsletter. The church never runs a database or a mail server.

### How it flows
1. Visitor fills in the footer form and presses `Sign me up`.
2. Browser sends `POST /api/subscribe` with JSON `{ email, firstName, company, startedAt, turnstileToken }`.
3. The function checks origin, rate, honeypot, timing, email format and (if enabled) Turnstile.
4. The function calls Brevo `POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation`. Nothing is added to the list yet.
5. Brevo emails the visitor the confirmation template. The form shows "Almost there, check your inbox".
6. The visitor clicks the link. Brevo adds them to the Sunday Letter list and redirects to `https://familychurchofsandiego.org/newsletter/confirmed`.
7. Volunteers send each issue from Brevo Campaigns to that list. Every issue carries Brevo's one click unsubscribe link and header.

### Files
```
api/subscribe.ts                 # the backend: Vercel function, POST only
src/lib/newsletter.ts            # shared: normaliseEmail, isValidEmail, limits, response types (imported by both sides)
src/components/NewsletterBand.tsx# the frontend form inside the footer
src/pages/NewsletterConfirmed.tsx
src/pages/Privacy.tsx
api/subscribe.test.ts            # vitest, Brevo and Turnstile mocked
src/lib/newsletter.test.ts
docs/newsletter-setup.md         # written by you for the church: the Brevo and Vercel steps below, in plain language
.env.example                     # every variable from section 2, no values
```

### Shared rules, `src/lib/newsletter.ts`
```ts
export const EMAIL_MAX = 254;
export const NAME_MAX = 80;
export const MIN_FILL_MS = 3000; // faster than this is a bot

export function normaliseEmail(raw: unknown): string {
  return String(raw ?? "").trim().toLowerCase();
}
export function isValidEmail(email: string): boolean {
  return email.length > 0 && email.length <= EMAIL_MAX && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
export function cleanName(raw: unknown): string {
  return String(raw ?? "").replace(/[<>]/g, "").trim().slice(0, NAME_MAX);
}

export type SubscribeError = "invalid_email" | "rate_limited" | "verification_failed" | "unavailable" | "upstream" | "bad_request" | "forbidden";
export type SubscribeResponse = { ok: true } | { ok: false; error: SubscribeError };
```

### Backend, `api/subscribe.ts`
A Vercel function on the Node.js runtime using the Web handler signature (`export async function POST(request: Request): Promise<Response>`). Any other method gets 405 with an `Allow: POST` header. Every response is JSON with `Cache-Control: no-store`.

Checks, in this order:
1. **Configuration.** If `BREVO_API_KEY`, `BREVO_LIST_ID` or `BREVO_DOI_TEMPLATE_ID` is missing, return 503 `unavailable`.
2. **Origin.** The `Origin` header must be `SITE_URL`, its `www.` form, `http://localhost:<any port>`, or (only when `VERCEL_ENV` is not `production`) an `https://*.vercel.app` preview. Otherwise 403 `forbidden`.
3. **Body.** `Content-Type` must be `application/json` and the body at most 2 KB. Otherwise 400 `bad_request`.
4. **Rate.** Best effort in memory limit of 5 requests per IP per 10 minutes (first address in `x-forwarded-for`), 429 `rate_limited` when exceeded. This resets when the function cold starts, so also add a Vercel Firewall rate limit rule on `/api/subscribe` (documented in the setup doc).
5. **Bot traps.** If the hidden `company` field has any value, or `startedAt` is missing or less than `MIN_FILL_MS` ago, return 200 `{ ok: true }` and do nothing. Bots learn nothing.
6. **Email.** Normalise, then validate with the shared rules. Invalid gives 400 `invalid_email`.
7. **Turnstile.** Only when `TURNSTILE_SECRET_KEY` is set: POST the token and IP to `https://challenges.cloudflare.com/turnstile/v0/siteverify` (form encoded `secret`, `response`, `remoteip`). If `success` is not true, 400 `verification_failed`.
8. **Brevo.** Call the double opt in endpoint with an 8 second timeout (`AbortSignal.timeout(8000)`):
```ts
const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
  method: "POST",
  headers: { "api-key": process.env.BREVO_API_KEY!, "content-type": "application/json", accept: "application/json" },
  body: JSON.stringify({
    email,
    attributes: firstName ? { FIRSTNAME: firstName } : undefined,
    includeListIds: [Number(process.env.BREVO_LIST_ID)],
    templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID),
    redirectionUrl: `${process.env.SITE_URL}/newsletter/confirmed`,
  }),
  signal: AbortSignal.timeout(8000),
});
```
   - 201 or 204: return 200 `{ ok: true }`.
   - 400 with Brevo `code` of `duplicate_parameter` (already a contact): also return 200 `{ ok: true }`. The visitor must never be able to find out whether an address is already on the list.
   - Anything else, a network error or the timeout: return 502 `upstream`.
9. **Logging.** Log only the outcome, the HTTP status and Brevo's error `code`, plus the first 8 characters of a SHA-256 hash of the email for tracing (`crypto.subtle`). Never log the address, the name, the IP or the API key.

| Situation | Status | Body |
| --- | --- | --- |
| Accepted, already subscribed, or caught by a bot trap | 200 | `{ "ok": true }` |
| Bad JSON, wrong content type, body too big | 400 | `bad_request` |
| Email fails validation | 400 | `invalid_email` |
| Turnstile failed | 400 | `verification_failed` |
| Origin not allowed | 403 | `forbidden` |
| Not POST | 405 | none, `Allow: POST` |
| Rate limit hit | 429 | `rate_limited` |
| Brevo variables missing | 503 | `unavailable` |
| Brevo error or timeout | 502 | `upstream` |

### Frontend, `NewsletterBand.tsx`
- Lives at the top of the footer on every page except `/newsletter/confirmed`. Layout, colours and copy in sections 6 and 9: label and heading on the left third; on the right, `First name` and `Email` fields side by side with the white pill `Sign me up` after them on desktop, stacked on mobile.
- Fields have visible labels in `--gold-light` label style. Inputs are white at 8 per cent on `--navy-deep` with a 1px `--line-dark` bottom rule that turns `--gold-light` on focus, white text, 50px tall to match the button. `type="email"`, `inputMode="email"`, `autoComplete="email"`, `required` on the email; `autoComplete="given-name"` on the name.
- A honeypot input named `company`, positioned off screen, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`.
- `startedAt` is captured with `useRef(Date.now())` when the component mounts.
- Turnstile, only if `VITE_TURNSTILE_SITE_KEY` is set: load `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit` the first time the band scrolls into view (not on page load), render it with `appearance: "interaction-only"` so most people never see it, and send its token.
- States: `idle`, `submitting`, `success`, `error`. Validate with the shared `isValidEmail` on submit, then on every change once an error has shown. While `submitting` the button is disabled, shows `Signing up` and the spinner, and a second submit is ignored. Requests time out after 10 seconds and count as `upstream`.
- Map responses to the copy in section 9: `invalid_email` to the invalid message; `rate_limited` to the too many tries message; everything else, including a network failure, to the generic message with the church email. Keep what the visitor typed after an error.
- Errors appear under the email field in `--error-on-dark`, linked with `aria-describedby` and `aria-invalid="true"`; the invalid field's bottom rule also turns `--error-on-dark`. A visually hidden `aria-live="polite"` region announces success and errors. On success, the form is replaced by the success message and focus moves to it (`tabIndex={-1}`).
- No popup, no modal, no checkbox wall, no pre ticked anything.

### Tests, `vitest`
- `newsletter.test.ts`: valid and invalid emails (missing `@`, spaces, 255 characters, uppercase gets lowercased), name cleaning and truncation.
- `subscribe.test.ts` with `fetch` mocked:
  - 405 for GET.
  - 403 for a foreign origin; allowed for `SITE_URL`, `www.` and localhost.
  - 400 for bad JSON and for an invalid email.
  - Honeypot filled, or `startedAt` too recent: 200 and Brevo is never called.
  - Brevo 201 and 204: 200 `ok`. Brevo 400 `duplicate_parameter`: 200 `ok`. Brevo 500 or timeout: 502.
  - The Brevo request carries the list id, template id, redirect URL and `FIRSTNAME`, and the `api-key` header.
  - Sixth request from one IP in ten minutes: 429.
  - Turnstile set and failing: 400, Brevo never called.
  - Missing Brevo variables: 503.
  - Nothing written to `console` contains the test email address.

### Owner setup (write this into `docs/newsletter-setup.md` in plain language)
1. Create a free Brevo account with familychurchofsandiego@gmail.com.
2. **Authenticate the domain** in Brevo (Senders, Domains): add the DKIM and DMARC records it gives you at the domain registrar for familychurchofsandiego.org. Then add the sender `news@familychurchofsandiego.org` with the name `Family Church of San Diego`, and set reply to `familychurchofsandiego@gmail.com`. Do not send from the Gmail address itself: email providers reject bulk mail that claims to come from gmail.com but is sent by another service.
3. Contacts, Lists: create a list named `Sunday Letter`. Its number is `BREVO_LIST_ID`.
4. Templates: create the confirmation email with the copy from section 9, tag it `optin`, and make sure the button links to `{{ doubleoptin }}`. Its number is `BREVO_DOI_TEMPLATE_ID`.
5. Settings, SMTP and API: create an API key named `website`. That is `BREVO_API_KEY`. Keep it secret.
6. In Vercel, Project Settings, Environment Variables: add every variable from section 2 for Production and Preview. Redeploy.
7. Optional: in Vercel Firewall add a rate limit rule for the path `/api/subscribe` (for example 10 requests per minute per IP). Optional: create a Cloudflare Turnstile widget for the domain and add its two keys.
8. Test: sign up with your own address, confirm, check you land on `/newsletter/confirmed` and appear in the list.
9. To send an issue: Brevo, Campaigns, create an email campaign to the `Sunday Letter` list. Use the logo, `#1470AF` for buttons and the same friendly tone as the website.

## 16. Church calendar, one source of truth
The church's public **Google Calendar** is the only place anyone edits dates. Volunteers add, move or cancel events in Google Calendar on their phone, and within five minutes the website shows the change everywhere: the next eight Sundays strip, the calendar rows, the picnic panel. Nothing about picnics or cancellations is hard coded, because the first Sunday is not always a picnic.

### Conventions for whoever edits the calendar
Written into `docs/calendar-setup.md` in plain language:
- **Picnic:** add an event on the Sunday with `Picnic` anywhere in the title, for example `Church picnic`, with its real start time and the place in Location. **A picnic Sunday automatically has no service**: the site removes the 11:00 AM service, the livestream and the "next service" highlight for that day. Do not also add a `No service` event. No picnic event on a first Sunday means a normal service is shown.
- **No service:** add an event on the Sunday titled `No service` (all day is fine), for example for a holiday or a retreat. The strip strikes that Sunday through.
- **Anything else** (guest speaker, workshop, youth night, Christmas service) is a normal event with a clear title, a start time and a location. It appears in the calendar rows.
- **The regular 11:00 AM Sunday service does not need to be entered.** The site always assumes it, unless a `No service` event says otherwise. If the church does keep a recurring service event, the site ignores events titled `Sunday Service` in the rows so they do not crowd out everything else.
- The calendar must be set to **public** (Settings, Access permissions, Make available to public, See all event details).

### Backend, `api/calendar.ts`
A Vercel function (`export async function GET(request: Request)`, Node.js runtime) that reads Google Calendar server side so the API key never ships to browsers and Google is called at most once every few minutes, not once per visitor.
1. If `GCAL_ID` or `GCAL_API_KEY` is missing, return 503 `{ ok: false, error: "unavailable" }`.
2. Call `https://www.googleapis.com/calendar/v3/calendars/{encodeURIComponent(GCAL_ID)}/events` with `key`, `singleEvents=true`, `orderBy=startTime`, `timeMin` = start of today in `America/Los_Angeles`, `timeMax` = 63 days later (covers eight Sundays plus the rows), `maxResults=100`, `timeZone=America/Los_Angeles`, and an 8 second timeout.
3. Map each event to a small shape and drop everything else (no attendee emails, no descriptions, no creator):
```ts
type ChurchEvent = {
  id: string;
  title: string;             // summary, trimmed, max 120 characters
  start: string;             // ISO; date only ("2026-11-01") for all day events
  end: string;
  allDay: boolean;
  location: string | null;
  url: string;               // htmlLink
  kind: "picnic" | "no-service" | "service" | "event";
};
```
   `kind` is `picnic` when the title contains `picnic`, `no-service` when it contains `no service`, `service` when it is exactly `Sunday Service` (any case), otherwise `event`. Keyword matching lives in `src/lib/calendar.ts` and is shared with the tests.
4. Respond `200 { ok: true, events: ChurchEvent[], fetchedAt }` with `Cache-Control: public, s-maxage=300, stale-while-revalidate=3600`, so Vercel's edge serves a cached copy for five minutes and keeps serving the last good copy for up to an hour if Google is slow.
5. If Google errors or times out, return 502 `{ ok: false, error: "upstream" }` with `Cache-Control: no-store`. Log only the status code.

### Frontend, `useChurchCalendar()` in `src/lib/calendar.ts`
- One fetch of `/api/calendar` per page view, shared by every component through a tiny module level cache (a promise kept in a variable). No polling.
- Returns `{ status: "loading" | "ready" | "error", events, picnicSundays: Set<string>, cancelledSundays: Set<string>, isServiceSunday(date): boolean, nextServiceSunday: string, nextPicnic: ChurchEvent | null }`, where the sets hold `YYYY-MM-DD` dates in Pacific time.
- **The rule lives here and only here:** `isServiceSunday(date)` returns `false` when the date is in `picnicSundays` or in `cancelledSundays`, otherwise `true`. `nextServiceSunday` is the first Sunday from `nextSundays()` for which `isServiceSunday` is true. The strip, the service bar's picnic mode, the "Next livestream" line and the JSON-LD all call these (the live dot and live player use real YouTube status instead, section 17); none of them check picnic titles themselves. While the calendar is `loading` or `error`, `isServiceSunday` returns `true` (the normal schedule), because picnics are never guessed.
- Helpers, all pure and unit tested: `nextSundays(today, count)` (honours the 12:30 PM cut off), `isPicnic(event)`, `isCancelled(event)`, `sundayKey(event)` (works for both all day and timed events), `rowsFor(events)` (drops `service` events, keeps the first six).
- Consumers:
  - **Sundays strip** (signature A): dates render immediately; picnic and `NO SERVICE` labels appear when `status` is `ready`.
  - **Calendar rows** (Home section 6): the first six non `service` events.
  - **Picnic panel** (Home section 9): headline from `nextPicnic`.
  - **Footer and copy** never mention a specific picnic date unless it came from here.

### Fallbacks
| Situation | Strip | Rows | Picnic panel |
| --- | --- | --- | --- |
| Loading | dates and next service, no labels | six skeleton rows | general headline |
| Ready, picnic coming | gold rings on that Sunday | events listed | dated headline |
| Ready, no picnic in eight weeks | no rings | events listed | general headline |
| Error or not configured | dates only | next four Sunday services and `The full calendar is coming soon.` | general headline |

### Tests, `vitest`
- `nextSundays`: Saturday night, Sunday 10:00 AM (counts this Sunday), Sunday 1:00 PM (skips to next week), across a month end and across the November daylight saving change.
- Keyword matching: `Church picnic`, `PICNIC`, `Picnic at Lake Murray` are picnics; `No service this week` is cancelled; `Sunday Service` is filtered from rows.
- A first Sunday with no picnic event produces no picnic marker; a picnic on the third Sunday does.
- A cancelled next Sunday moves the "next service" highlight to the following week.
- **Picnic rule:** a picnic Sunday gives `isServiceSunday() === false` even with no `No service` event; the next service skips it; the service bar switches to picnic mode from the Monday before; `Next livestream` names the following service Sunday.
- `/api/calendar`: 503 without variables, 200 with mapped events and the cache header, 502 on a Google error, and no attendee or description fields in the output.

## 17. Live status, the green dot
The `Watch live` dot is **green only when YouTube says the church channel is live right now**. It never turns green from the clock or the calendar. If nothing is streaming, it stays a quiet white dot, so the site never tells someone "we are live" when they would click through to an empty page.

### States
| State | How we know | Dot | Button label | Button links to |
| --- | --- | --- | --- | --- |
| `live` | YouTube reports a broadcast with `liveBroadcastContent: "live"` | `--live` green, solid, gentle pulse | `Live now` | that video's watch URL |
| `upcoming` | a scheduled broadcast (`"upcoming"`) starting within the next 60 minutes | white, solid, no pulse | `Starts at 11:00 AM` (its scheduled time) | that video's watch URL |
| `offline` | neither of the above | white at 55 per cent, still | `Watch live` | `church.youtube.live` |
| `unknown` | the check failed or is not configured | same as `offline` | `Watch live` | `church.youtube.live` |

Colour is never the only signal: the label changes too, and the button's accessible name becomes `Live now on YouTube` while live. Real live status always wins: if the church goes live on a picnic Sunday or midweek, the green `Live now` pill appears (in picnic mode it takes the place of the "No service this week" line). If YouTube says offline during the usual service time, the dot stays white.

### Backend, `api/live.ts`
A Vercel function (`export async function GET()`, Node.js runtime) using the YouTube Data API v3 with `YOUTUBE_API_KEY` (server side only). It costs about 2 quota units per check, far inside the free 10,000 a day.
1. If `YOUTUBE_API_KEY` is missing, return 503 `{ ok: false, error: "unavailable" }`.
2. `GET https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=UUJzineYja9iNlAf5_BwJhMA&maxResults=5&key=...` to get the five newest video IDs on the channel (live and scheduled broadcasts appear here).
3. `GET https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id={ids}&key=...`.
4. Pick the first video with `snippet.liveBroadcastContent === "live"`; otherwise the soonest `"upcoming"` one whose `liveStreamingDetails.scheduledStartTime` is within 60 minutes.
5. Respond `200 { ok: true, status: "live" | "upcoming" | "offline", videoId?: string, title?: string, startsAt?: string, checkedAt }`. Titles are trimmed to 120 characters; nothing else from YouTube is passed through.
6. Cache with `Cache-Control: public, s-maxage=60, stale-while-revalidate=30` during the service window (Sundays 10:30 AM to 1:30 PM Pacific) and `s-maxage=600, stale-while-revalidate=300` the rest of the week, so YouTube is asked at most once a minute on Sunday mornings no matter how many people visit.
7. Each YouTube call has an 8 second timeout. On any error return 502 `{ ok: false, error: "upstream" }` with `no-store`, and log only the status code.

### Frontend, `useLiveStatus()` in `src/lib/live.ts`
- Fetches `/api/live` once on page load, shared by every component through a module level cache.
- Polls again every 60 seconds **only** while the page is visible (`document.visibilityState === "visible"`) and the Pacific time is inside the service window, or while the last answer was `live` or `upcoming` (so it notices when a stream ends or starts). Outside those times it does not poll. It stops polling when the tab is hidden and checks once when it becomes visible again.
- Returns `{ status, videoId, startsAt }`. `unknown` until the first answer, and on any error.
- Consumers: the service bar button (signature C), the Sermons page `Watch live` panel, and the Home `Latest sermon` band.

### Tests, `vitest`
- `api/live`: live video gives `live` with its id; an upcoming broadcast 30 minutes away gives `upcoming`, 3 hours away gives `offline`; only finished videos gives `offline`; missing key gives 503; a YouTube error gives 502; both cache headers by time of day.
- `useLiveStatus`: polls inside the window, does not poll outside it, stops when hidden, keeps polling while `live`.
- Service bar: `live` shows the green dot, `Live now` and the video link; `offline` and `unknown` never show green; `live` on a picnic Sunday still shows the pill.
