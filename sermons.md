# Family Church of San Diego: Sermons Page Prompt

## 1. Goal
Build `/sermons` for **Family Church of San Diego**, where anyone can watch this Sunday's service live or catch up on any recent message without leaving the site. It should feel like walking into a small cinema: a washed photo hero, the blue service bar, then a deep navy stage with one big player, a clean list of recent messages that feeds the stage, the faces of the people who preach, and a parallax photo panel inviting people to join live. Nothing here is updated by hand: new uploads and live streams appear on their own.

**Borrowed from the reference sites.** Chicago Family Church's Sermons page gives the full bleed photo hero titled "Sermons and teachings", a feed of the latest sermons as clickable items that play in place, and a "View all sermons" button to YouTube. Bay Area Family Church's Sermons page gives a clear button to past sermons and a separate friendly block for the weekday devotion it runs. **Not copied:** Chicago's feed shows "Loading sermons..." and then an error when its script fails, so ours always has a working fallback; Bay Area sends people off site to watch, so ours plays everything on the page.

## 2. Tech Stack
```
React + Vite + TypeScript + Tailwind CSS + Framer Motion (motion/react) + react-router-dom
```
Hosted on Vercel with the rest of the site. Everything shared is built once from the master prompt `../PROMPT.md` and reused here unchanged: `church.ts`, `images.ts`, the design tokens, the navbar, mobile menu, service bar, footer with the Sunday Letter band, back to top, the reveal and motion utilities, and the `/api` functions (`/api/calendar`, `/api/live`, `/api/subscribe`, `/api/sermons`). This page adds only what is listed below. If anything here conflicts with `../PROMPT.md`, the master prompt wins.

`lucide-react` only for `ArrowRight`, `ArrowUpRight`, `Menu`, `X`, `Copy`, `Check`. Route: `/sermons`.
- Route `/sermons`, component `src/pages/Sermons.tsx`, sections in `src/sections/sermons/`.
- Data: `useSermons()` from `/api/sermons` (section 15 of this file), `useLiveStatus()` from `/api/live`, `useChurchCalendar()` for `nextServiceSunday`.
- New in `church.ts`: `speakers: { name: string; role: string; photo: keyof typeof images; match: string }[]` (the co-pastors and Walter Frank; `match` is the text used to count their messages in titles), and `devotion: null | { name: string; when: string; url: string }` [CONFIRM].
- Uses the existing `YOUTUBE_API_KEY`; no new variables.

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

**Sermons section rhythm:** washed photo hero, blue service bar, navy (the stage), white (recent messages), cream (who you will hear), blue washed photo panel (watch live), white (weekday devotion, only if configured), navy-deep footer.

**Washed photos on this page:** the hero (`sermon-jasmine.jpg`, hero recipe) and the watch live panel (`sermon-mikuni.jpg`, banner recipe), both frames from the church's own sermon videos, so the page shows the real pastors preaching in the real sanctuary. YouTube thumbnails and speaker portraits stay clean.

**Text placement keeps the preacher visible.** In both photos the pastor stands to one side, so on this page (768px and up) the hero statement sits in the **left** 7 of 12 columns (Jasmine stands on the right), and the watch live panel's content sits in the **right** half (Mikuni stands left of centre). On mobile both return to the normal left aligned stack.

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
- Page specific: the stage title is Libre Baskerville clamp(28px, 3vw, 40px) white; list titles are Libre Baskerville 24px `--ink`; speaker names are Libre Baskerville 28px `--blue-bright`; durations use the label layer with tabular numerals.

## 5. Signature element
**The stage.** A full width `--navy` band holding one large 16:9 player with 12px corners. Poster first: the sermon's YouTube thumbnail at 80 per cent opacity on `--navy-deep`, a 96px white play circle with a `--blue` triangle, and a thin `--gold` hairline under the frame. Beneath it, a row with the `--gold-light` date and speaker label, the title in white serif, and on the right a white pill `Watch on YouTube`. Choosing any sermon in the list below slides the page back up to the stage and crossfades the new poster in. On a Sunday morning when `/api/live` reports `live`, the stage becomes the livestream on its own, with a `LIVE NOW` label and the green dot, and the newest recorded sermon moves to the top of the list. It turns the page from a list of links into a place to watch.

## 6. Sections, each a different skeleton
Shared on every page, exactly as on Home (master prompt sections 5 and 6): the 80px white navbar with this page's link active (gold underline and `aria-current="page"`), the full screen navy mobile menu, the blue service bar under the hero (picnic mode and real live status included), the navy-deep footer with the Sunday Letter band, and the back to top button. Do not restyle them. Sections below are the page's own, top to bottom, each a different skeleton from its neighbours.

1. **Page hero, photograph with the statement on the left**: full bleed `sermon-jasmine.jpg` (Co-Pastor Jasmine Santoro preaching, with Blessing photos on the screen behind her; `object-position: 70% 40%`) with the hero wash recipe. Min height `clamp(440px, 62vh, 620px)`. The statement occupies the left 7 of 12 columns so Jasmine, standing on the right, stays visible. Label `SERMONS AND TEACHINGS` in `--gold-light`, white display headline, lead, then a white pill `Watch the latest` (to `#watch`) and an outline pill `Watch live` (to the YouTube live URL; shows the green dot and `Live now` while live).
2. **Service bar** (signature C of the master prompt).
3. **The stage** [`#watch`]: `--navy`, as in section 5. Content max width 1040px, centred.
4. **Recent messages, list rows** [`#recent`]: `--white`. Label column `RECENT MESSAGES`, then up to nine rows on hairlines. Each row: a 16:9 thumbnail 224px wide with 8px corners and a small `--navy-deep` duration chip in its corner (white label, for example `1:02:10`), a `--blue` date label, the title in serif 24px `--ink`, the speaker in `--muted`, and a 48px `--blue` play circle on the right. The row currently on the stage shows `NOW SHOWING` instead of its date and a 3px `--blue` bar on its left edge. Under the list: a blue pill `All sermons on YouTube` and a text link `Subscribe`.
5. **Who you will hear, speakers** [`#speakers`]: `--cream`. Label column `WHO YOU WILL HEAR` and heading, then a row of speaker columns separated by vertical hairlines: a 168px round portrait (clean, from `church.speakers`), the name in `--blue-bright` serif 28px, the role as a `--blue` label, and a line counting their messages in the current list (`4 recent messages`), which links to the list filtered to that speaker. Under the row, one `--muted` line: `We also welcome guest speakers from across the Family Federation.`
6. **Watch live, washed photo panel** [`#live`]: `sermon-mikuni.jpg` (Pastor Mikuni Santoro preaching; `object-position: 40% 32%`) with the banner wash recipe, inset 16px, `--panel-radius`, parallax drift. The content sits in the right half of the panel (left padding of 52 per cent on 768px and up) so Mikuni, left of centre, stays visible; the heading is held to 14ch. White content: label `LIVE ON SUNDAYS`, heading, body, `Next livestream: Sunday, {date}` from `nextServiceSunday` (picnic Sundays are skipped), `Starting at {time}` while a broadcast is `upcoming`, and a white pill `Open the livestream` (or `Live now` with the green dot while live).
7. **Weekday devotion, split** [`#devotion`]: `--white`. Rendered **only if** `church.devotion` is set: label column `DURING THE WEEK`, the devotion name in serif clamp(30px, 3.4vw, 46px), a `--blue` label with when it happens, one paragraph, and a blue pill to the meeting link. If `church.devotion` is `null`, the section is not rendered and the photo panel is followed by the footer.
8. **Footer**.

## 7. Motion
Same tokens and rules as the master prompt.
- **Hero welcome, once:** photo settles from `scale(1.06)`; text rises in sequence (900ms; 100ms, 220ms, 340ms, 460ms).
- **Stage:** fades and rises 12px on first view. Choosing a sermon: smooth scroll to `#watch` (instant under reduced motion), the old poster crossfades to the new one over 250ms `--ease-out`, the label and title crossfade over 150ms, and the `NOW SHOWING` bar moves to the chosen row with a 150ms fade.
- **Live switch:** when status becomes `live`, the stage crossfades to the live player over 300ms and the green dot fades in; the dot pulses only while live.
- **List rows:** reveal with 60ms stagger (capped at six). Hover devices: the thumbnail zooms to 1.03 inside its frame (300ms), the title turns `--blue`, the play circle slides 4px right. Press: the row scales to 0.99.
- **Speakers:** portraits rise 12px with 80ms stagger.
- **Watch live panel:** parallax drift as on Home.
- **Loading:** skeleton rows in `--mist`; no spinners except inside buttons.

## 8. Responsive
- **Mobile under 768px:** the stage stays full width 16:9 with the info row stacked and the pill full width; list rows put the thumbnail on top at full width; speakers stack with 128px portraits; the watch live panel content stacks.
- **768px to 1199px:** thumbnails 176px; speakers stay in a row.
- **Desktop 1200px and up:** as specified.

## 9. Full copy
**Hero** (label `SERMONS AND TEACHINGS`)
- Headline: `Every message, *any* time.`
- Lead: `Watch this Sunday's service live, or catch up on a recent message. Our pastors share most Sundays, with guest speakers along the way.`
- Actions: `Watch the latest`, `Watch live`

**The stage**: label `{DATE} · {SPEAKER}` (date only if there is no speaker), the title, pill `Watch on YouTube`. Live state label: `LIVE NOW`.

**Recent messages** (label `RECENT MESSAGES`): `NOW SHOWING` on the current row; pill `All sermons on YouTube`; link `Subscribe`. Fallback line: `Our recent messages are on YouTube.`

**Who you will hear** (label `WHO YOU WILL HEAR`; heading `The voices from our *pulpit*.`)
- `Jasmine Santoro` `CO-PASTOR`
- `Mikuni Santoro` `CO-PASTOR`
- `Walter Frank` `ASSISTANT PASTOR`
- Count line: `{n} recent messages` (singular `1 recent message`; hidden when zero)
- Note: `We also welcome guest speakers from across the Family Federation.`

**Watch live** (label `LIVE ON SUNDAYS`)
- Heading: `Join us *live* at 11:00 AM.`
- Body: `The livestream starts a few minutes before every Sunday service, Pacific time. There is no livestream on picnic Sundays.`
- Line: `Next livestream: Sunday, {date}`
- Pill: `Open the livestream` (or `Live now`)

**Weekday devotion** (only if configured; label `DURING THE WEEK`) [CONFIRM name, time and link]
- Name: `{church.devotion.name}`, for example `Morning devotion`
- When: `{church.devotion.when}`, for example `Weekdays at 6:00 AM on Zoom`
- Body: `Start the day with a short reading and prayer together. All are welcome, cameras optional.`
- Pill: `Join the devotion`

**Real videos from the channel, for reference** (the site reads them live):
- `"The Reality of a Spirit World that Wants to Help Us"`, Co-Pastor Jasmine Santoro, August 16, 2026 (`7MTtL2mcXF8`)
- `"More to Physical Life"`, Pastor Mikuni Santoro, August 9, 2026 (`CfCvVPRLyN8`)
- `National Parents' Day and "God as Our Heavenly Parent"`, Pastor Jasmine Santoro, July 26, 2026 (`lr6Mkm-LjjA`)
- `"Do You Believe?"`, Pastor Mikuni Santoro, July 19, 2026 (`Z-rgHzTkJEE`)
- `True Parents' Birthday Celebration, Hyojeong Nuri`, February 22, 2026 (`K_Ulk5cGRGg`)

## 10. Images
| File | Where | Treatment |
| --- | --- | --- |
| `sermon-jasmine.jpg` | Hero | Hero wash, `object-position: 70% 40%`, eager, `fetchpriority="high"`. A 1280 by 720 frame from the church's video `lr6Mkm-LjjA`; replace with the original full resolution photo if the church has one |
| YouTube thumbnails (`https://i.ytimg.com/vi/{id}/hqdefault.jpg`) | Stage and list | Clean, lazy, explicit `width`/`height`, `alt` = the sermon title |
| `pastors-santoro.jpg` | Speakers (two portraits from one photo) | Clean, round. The co-pastors share one photo, so each circle zooms onto one face: the image is absolutely positioned at 230 per cent of the circle width; Jasmine at `left: -115%; top: -88%`, Mikuni at `left: -12%; top: -68%`. Store these as `zoom` values on each speaker in `church.ts` |
| `pastor-frank.jpg` | Speakers | Clean, round, zoomed at 170 per cent, `left: -6%; top: -4%` |
| `sermon-mikuni.jpg` | Watch live panel | Banner wash, parallax, `object-position: 40% 32%`. A 1280 by 720 frame from the church's video `CfCvVPRLyN8` |

## 11. SEO, accessibility and hosting
Same rules as the master prompt section 11: one `h1` per page (the hero headline), visible focus rings (2px `--blue` with 3px offset on light grounds, 2px `--gold-light` on dark grounds and photos), a `title` on every iframe, a visible label on every field, Open Graph and Twitter tags with `og.jpg`, the canonical URL `https://familychurchofsandiego.org/sermons`, and the route's own `<title>` and description below. Lighthouse targets on mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- `<title>`: `Sermons | Family Church of San Diego`. Description: `Watch Family Church of San Diego live on Sundays at 11:00 AM, or catch up on recent sermons from our pastors.`
- Each list row is a `<button>` with an accessible name of title, speaker and date; Enter and Space load it into the stage and move focus to the stage's play button.
- The stage iframe has a descriptive `title`; nothing autoplays on page load.

## 12. Never
Glassmorphism, gradients, glow, drop shadowed cards, three column icon grids, emoji, stock photographs or any image not in `/public/images`, recolouring, stretching or redrawing the church logo, text or overlays on any photo other than the three washed panels listed in section 3, image paths hard coded outside `images.ts`, carousels or sliders, autoplaying video or audio, popups, lorem ipsum, em dashes or en dashes in the copy, Poppins, Inter or any font beyond Libre Baskerville and Work Sans, centred body paragraphs longer than two lines, gold text on blue, gold text smaller than 24px on light grounds, colours not listed in section 3, hover effects without a hover media query, `ease-in` curves, `transition: all`, parallax driven by scroll listeners, `100vh` heroes, more than one italic word per headline, identical back to back section layouts, guessing or hard coding picnic dates (they come only from the calendar), showing a service time, a livestream or a "next service" highlight on a picnic Sunday, a green or pulsing live dot without a confirmed live status from `/api/live`, the YouTube API key in the browser, checking picnic titles anywhere except `src/lib/calendar.ts`, any API key or secret with a `VITE_` prefix or anywhere in `src/`, calling Brevo from the browser, adding anyone to the list without double opt in, telling the visitor whether an email was already subscribed, logging full email addresses, newsletter popups or modals.
- Specific to this page: autoplay on load; a modal or lightbox player; "Loading sermons..." with no fallback; sending people to YouTube to watch the newest sermon; a livestream time on a picnic Sunday; an empty devotion section; text over thumbnails.

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
2. `/api/sermons` and `useSermons()` with tests (section 15).
3. Hero, the stage, the recent messages list wired to the stage.
4. Speakers, watch live panel, optional devotion.
5. Test the live switch with a mocked `/api/live`, then 360px to 1440px, reduced motion and Lighthouse.

## 15. Backend, `api/sermons.ts`
A Vercel function (`export async function GET()`, Node.js runtime) using `YOUTUBE_API_KEY`. About 2 quota units per call.
1. If the key is missing, return 503 `{ ok: false, error: "unavailable" }`.
2. `GET https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=UUJzineYja9iNlAf5_BwJhMA&maxResults=15&key=...`, then `GET .../videos?part=snippet,contentDetails&id={ids}&key=...`. 8 second timeout each.
3. Keep only finished videos (`snippet.liveBroadcastContent === "none"`), newest first, at most 12.
4. Map each to `{ id, title, speaker, preachedOn, publishedAt, duration }`:
   - Titles follow `"Sermon title" by Pastor Name - Month D, YYYY` (for example `"More to Physical Life" by Pastor Mikuni Santoro - August 9, 2026`). Parse into `title` (without quotes), `speaker` and `preachedOn`; the dash may have no space before it. Titles that do not match (for example `True Parents' Birthday Celebration - Hyojeong Nuri on February 22, 2026`) keep the full text as `title`, `speaker: null`, and use `publishedAt` for the date.
   - `duration` from ISO 8601 (`PT1H2M10S`) to `1:02:10`.
5. `Cache-Control: public, s-maxage=1800, stale-while-revalidate=86400`.
6. On any YouTube error or timeout: 502 `{ ok: false, error: "upstream" }`, `no-store`, log only the status code.

**Frontend `useSermons()`** in `src/lib/sermons.ts`: one fetch per page view, shared through a module level cache. Loading shows the stage frame in `--navy-deep` and six `--mist` skeleton rows. On error the stage falls back to the uploads playlist embed (`https://www.youtube-nocookie.com/embed/videoseries?list=UUJzineYja9iNlAf5_BwJhMA`, poster first) and the list becomes one line, `Our recent messages are on YouTube.`, with the blue pill. The Home `Latest sermon` band uses the same hook.

**Tests (`vitest`):** title parsing for each real pattern above and a title with no speaker; live and upcoming items excluded; duration formatting; speaker message counts; 503 and 502 paths; cache header.
