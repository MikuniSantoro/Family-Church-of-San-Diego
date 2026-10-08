# PROMPT.md, Section by Section

This file explains what each part of `PROMPT.md` does, why it is there, and which reference site it comes from. Paste only `PROMPT.md` into the AI. Keep this file for yourself and for whoever edits the site later.

**Reference sites studied (live theme tokens and computed styles, October 2026)**

| | Chicago Family Church | Bay Area Family Church |
| --- | --- | --- |
| Platform | Squarespace (7.1 theme tokens) | MotoCMS |
| Display font | Libre Baskerville 400 | Poppins 500, wide tracked caps |
| Body font | Work Sans 400 | Helvetica Neue 400, Poppins 300 |
| Brand blue | accent `#1470AF`, nav links `#114C9C` | `#0A79BE`, service bar renders `#096FAF` |
| Dark | section theme navy `#16324F`, light blue accent `#8EB6DC` | footer navy `#052C44`, deep blue `#07598D` |
| Ground | white `#FFFFFF`, light accent `#EAEAEE` | cream `#F8F6F0`, white header |
| Text | headings `#232323`, meta `#707070` | body `#3E4041` |
| Accent | none | gold `#A9964F`, `#BCAC71` |
| Buttons | pills: solid primary, outline secondary, white pill on blue | square blocks |
| Hero | full bleed photo, blue tint 21% plus dark overlay | blue caps on cream above a photo strip |
| Photo bands | black 60% overlay call to action | blue 50% overlay, fixed (parallax) background |
| Motion | every block fades in, 0.9s, `ease` | parallax band, back to top button |
| Signature move | photo bands with tinted overlays | blue "Sunday Service 10:00AM" bar |
| Shared DNA | "God's Dream, One Family" tagline, blue brand colour, service time in the first screen | |

**The blend:** fonts, pill buttons, photo treatment and the white ground from Chicago; cream ground, gold accent, navy footer, service bar and parallax band from Bay Area. Every colour in the prompt is one of the values in this table. Three new elements (the Sundays strip, the Blessing rings, the left aligned hero) give San Diego its own face.

**Page prompts:** `PROMPT.md` covers the design system, the Home page, the shared navbar and footer, and all four backend functions. Every other page has its own full prompt in `pages/` (`about.md`, `sermons.md`, `contact.md`, `donate.md`, `newsletter-confirmed.md`, `privacy.md`), built with exactly the same 14 sections as `PROMPT.md` (Goal through Build order), carrying the same design system and typography word for word, and each with its own signature element, section rhythm and a note in its Goal on what it borrows from each reference site. Every page except Privacy opens with a washed photo hero and the blue service bar, like Home. `pages/README.md` explains the order to run them in.

**Preview:** all seven pages are previewed in `preview/`, built from `preview/src/` by `node preview/build.js` so the navbar, service bar and footer stay identical. Run `node serve.js` and open `http://localhost:5178`.

---

## 1. Goal
**What it does:** Tells the AI what it is building, for whom, and what it should feel like. That feeling ("a well printed Sunday bulletin, not a megachurch advert") becomes the tiebreaker for every small decision the AI makes without asking.

**Why it matters:** An AI with no stated mood falls back to generic church templates: stock photos, centred everything, a three column "Worship / Connect / Serve" grid. The three question test (when, where, what is it like) gives it a measurable target for the first screen.

**Edit this if:** the church's personality differs, for example much younger and louder, or more formal and liturgical.

## 2. Tech Stack
**What it does:** Locks the tools: React, Vite, TypeScript, Tailwind, Motion, and React Router for the five pages. It also sets up the environment variables (Google Calendar, Formspree, Brevo for the newsletter, optional Turnstile), split into the few that are safe to show in a browser and the secret ones only the server sees, plus a single `church.ts` data file. Hosting is fixed to Vercel because the newsletter needs a small server function, and Vercel runs that next to the site for free.

**Why it matters:**
- **Router:** you asked for five pages, so this is a multi page site, not one long scroll.
- **Env vars with fallbacks:** the site has to launch even before someone sets up the calendar or the form. Each feature degrades to something that still looks finished.
- **`church.ts`:** every time, address, link and email lives in one file. When the service moves to 10:30, a volunteer edits one line, not twelve components.
- **YouTube IDs are already filled in.** The channel ID `UCJzineYja9iNlAf5_BwJhMA` was looked up from your channel. Swapping `UC` for `UU` gives the uploads playlist, which always plays the newest sermon first with no API key.
- **`images.ts`:** every photo's file, size, alt text, caption and crop live in one list. If a parent asks for a photo of their child to come down, or a better pastor portrait arrives, it is a one line change rather than a hunt through the code.
- **`skipSundays`:** lets someone mark a cancelled Sunday (for example Christmas week) so the Sundays strip does not lie.

**Edit this if:** you change hosting to WordPress or Squarespace (then this whole prompt becomes a design spec rather than build instructions).

## 3. Design system
**What it does:** Defines every colour as a named CSS variable, says exactly which colour each element uses, and sets the pill buttons, the two photo wash recipes, the section rhythm and the spacing scale.

**Why the palette changed in this version:** the first draft blended the two sites loosely and invented in-between shades (a warm surface `#EFEAE0`, a softened gold, a grey-blue on navy). This version uses only colours read directly from the two sites' live themes, so the San Diego site sits visibly in the same family as both.

**Where each colour comes from and what it does:**
- `--white #FFFFFF` (Chicago) and `--cream #F8F6F0` (Bay Area) alternate as section grounds. Both sites use a white header, so the navbar is white.
- `--mist #EAEAEE` is Chicago's light accent, used for button hover on white, form inputs and loading rows.
- `--ink #232323` (Chicago headings), `--text #3E4041` (Bay Area body) and `--muted #707070` (Chicago dates) are the three text colours.
- `--blue #1470AF` is Chicago's accent. Bay Area's service bar, measured on screen, renders as `#096FAF`, the same blue, so this is the shared FamilyFed blue. It is used for buttons, the service bar and section labels.
- `--blue-bright #0A79BE` is Bay Area's accent, used only for large serif titles such as the value names, the way Bay Area colours "What to Expect".
- `--blue-ink #114C9C` is Chicago's nav link colour, used for nav, logo and text links.
- `--navy #16324F` is Chicago's dark section theme (sermon band, mobile menu, founders). `--navy-deep #052C44` is Bay Area's footer, used for the footer only.
- `--sky #8EB6DC` is Chicago's light blue accent, used for secondary text on navy.
- `--gold #A9964F` and `--gold-light #BCAC71` are Bay Area's golds. Gold fails contrast as small text on light grounds (2.7:1), so on light it appears only as the rings and the nav underline. On navy and photos `--gold-light` carries labels and the italic accent word (5.8:1).
- The contrast numbers are written into the prompt so the AI does not "improve" the palette into something unreadable.

**Buttons:** Chicago uses pill buttons everywhere, and its blue sections flip to a white pill with blue text. The prompt copies that system exactly, plus Bay Area's darker button inside the blue service bar.

**Photo washes:** two recipes, one from each site. The hero uses Chicago's (dark overlay plus 21 per cent blue). The picnic and closing panels use Bay Area's (50 per cent blue). White text stays readable on any photo, and mixed phone photos look like one set.

**Section rhythm:** white and cream alternate, broken by the blue bar, a navy band and a blue washed photo panel, so no two neighbouring sections look the same.

## 4. Typography
**What it does:** Loads two fonts and sets exact sizes, weights, line heights and spacing for every text role.

**Why these fonts:** Libre Baskerville and Work Sans are exactly what Chicago Family Church uses. Matching them makes the two sites feel like relatives. Bay Area's Poppins was left out on purpose: it is one of the most overused web fonts and would make the site look templated.

**The label layer** (12px caps, 0.18em tracking) is Bay Area's "N E W  H E R E ?" look, used only for small labels, dates and buttons, never for headlines.

**One italic word per headline** (`Stay like *family*`) gives each headline a single point of warmth. More than one becomes decoration.

## 5. Signature elements
**What it does:** Describes the three details that make this site recognisably San Diego's and not a copy of either reference.

- **A. The next eight Sundays.** A row of upcoming Sundays, calculated from today's date. The next one is blue. Picnic Sundays carry a gold marker, but only when the church's Google Calendar has a picnic on that day, so a first Sunday without a picnic shows nothing, and a cancelled Sunday is struck through. Volunteers update it by editing the calendar, never the website. This is the element people will remember.
- **B. The Blessing rings.** Two interlocking gold circles, the only ornament on the site. They nod to the Marriage Blessing at the heart of the founders' story without needing a logo or a stock icon. They are kept strictly gold and still so they stay meaningful.
- **C. The service bar.** Taken straight from Bay Area's blue "Sunday Service" strip and placed under every page hero, so the time, place and livestream link are one glance away on every page. The pulsing dot appears only during the live window on Sundays.

**Edit this if:** the pastors would rather not use the rings. Delete B and replace each use with a plain hairline.

## 6. Pages and sections
**What it does:** Lists every page and every section in order, with its background, layout skeleton and content source. "Each a different skeleton" means no two neighbouring sections share a layout, which keeps the page lively without decoration.

**How your requirements map to sections:**

| Your requirement | Where it lives |
| --- | --- |
| Service times: 11 AM every Sunday | Service bar on every page, Home hero lead, Sundays strip |
| Picnic (usually the first Sunday, but not always) | Read from the Google Calendar: gold markers in the Sundays strip, "Next picnic" caption, the dated Home picnic panel, picnic rows in the calendar list (section 16) |
| Values: Faith, Community, Family | Home "Our values" Swiss list |
| Church calendar | The church's Google Calendar, read by `/api/calendar`, feeds the Home "What's happening" rows, the Sundays strip and the picnic panel (section 16) |
| Founders info and FamilyFed text | About "Our founders" navy panel, quoted verbatim |
| Pastoral team | About "Our pastors" ruled rows |
| Live indicator | Green `Live now` dot only when YouTube confirms a live stream (section 17) |
| Sermons, YouTube | Home "Latest sermon" band, Sermons page live and recent players |
| Facebook, Instagram, address, email | Contact details column, footer |
| Contact form | Contact page, Formspree |
| Newsletter sign up by email | Footer band on every page, `/api/subscribe` backend, Brevo double opt in, `/newsletter/confirmed` and `/privacy` pages (section 15) |
| Photos and logos provided | Logo in navbar, mobile menu and footer; hero, picnic panel, Life together mosaic, About photos and gallery; favicon and link preview (section 10) |
| Donate: Zelle, cash and checks to HSA-UWC | Donate page, two ruled columns with a copy button |

**Patterns borrowed:**
- Chicago: photo hero with tagline and service time, latest sermon embed, navy statement band ("God's Dream Then and Today" became "Our roots"), photo call to action band, blue or navy footer with the FamilyFed logo.
- Bay Area: the service bar, the "New here?" content (What to Expect, My Kids, Plan Your Visit became "Your first Sunday" on About), the contact form, and the footer with address, time and email.

**Performance details:** YouTube players load a poster image first and only become a real player when clicked. YouTube embeds are heavy, and this keeps the home page fast on phones.

## 7. Motion
**What it does:** Specifies every animation on the site: what moves, why, how far, how fast, on which curve, and what happens for visitors who have asked their phone for less motion.

**What moves and why:**
- **Hero welcome (once per page load).** The photo settles from a slight zoom and the headline, lead and buttons rise in one after another. This is the one moment of delight, for a first time visitor. It runs as CSS so it stays smooth while the page is still loading.
- **Scroll reveals (once each).** Sections fade up 12px as they arrive, with list rows 60ms apart. This is Chicago's own Squarespace fade, tightened: 0.7s on a stronger ease-out curve instead of 0.9s on plain `ease`, so text is readable sooner.
- **The Sundays strip.** Cells arrive left to right, then blue sweeps into the next Sunday. The motion points at the answer: "this is the day to come".
- **Picnic panel parallax.** Bay Area uses a fixed background photo band. The prompt keeps the depth but does it with CSS scroll driven animation, which is smoother, works on iPhones (where fixed backgrounds break) and simply turns off where unsupported.
- **Feedback.** Every button shrinks very slightly when pressed, so phone users feel the tap land. Hover effects (arrow slides, underlines growing, colour changes) only run on devices with a real mouse, so phones never get stuck in a hover state.
- **Navigation.** The mobile menu fades down and its links follow; page changes fade in quickly with no exit delay; Bay Area's back to top button appears after a scroll and glides you up.
- **Small state changes.** The sermon player fades in only once loaded (no white flash), the Zelle copy button swaps to "Copied", the contact form crossfades to its thank you line, and the live dot pulses only while the service is actually streaming.

**Why these exact numbers:** the curves are standard strong ease-out and ease-in-out curves. Anything a visitor uses repeatedly (buttons, menus, links) stays between 160ms and 250ms so it feels instant; only the one-time hero and the reveals are longer. Only `transform` and `opacity` move, which keeps scrolling smooth on cheap phones.

**What never moves:** the rings, the service bar, body text once it has appeared, the map, and nothing loops except the live dot. No carousels, counters, typing effects or scroll jacking. A church audience spans every age and device, and big motion makes some people feel unwell.

**Reduced motion:** visitors who have turned on "reduce motion" still get gentle fades so content does not pop in, but nothing slides, zooms, drifts or pulses.

**Edit this if:** the pastors find even the reveals distracting. Delete item 2 in the prompt's section 7 and everything appears in place, while the hero welcome and button feedback stay.

## 8. Responsive
**What it does:** Says exactly how each signature element and section rearranges on phones, tablets and desktops.

**Why it matters:** Most visitors will find the church on a phone, often in the car park. The Sundays strip turns into a 4 by 2 grid instead of scrolling sideways, and the service bar stacks so the address stays tappable.

## 9. Full copy
**What it does:** Gives the AI every word on the site so it never invents text or uses lorem ipsum.

**What is yours and what is drafted:**
- **Verbatim from you:** service times, picnic rule, values names, founders' names, the FamilyFed "A Story of Love and Devotion" passage, pastor names and roles, all links, the address, the email, Zelle, and HSA-UWC.
- **Drafted, marked `[CONFIRM]`:** values descriptions, hero lead, "Who we are", pastor bios, "Your first Sunday" details (parking, length, children), picnic details, mailing address for checks, and the receipt note. Have the pastors read these before launch.
- **One deliberate wording choice:** the founders' line in your brief uses "Father & Mother Moon". Ampersands are spelled out as "and" in body copy for a calmer read. Names in headings can keep the ampersand if you prefer.

## 10. Images
**What it does:** Lists every logo and photo the site uses, with its prepared file name, size, where it goes and its alt text, plus what is still missing.

**What was done with the church's asset folder (3 logos, 18 photos):**
- **Prepared copies, originals untouched.** Every file was renamed to something readable (`picnic-wisteria.jpg` instead of `att.mDHigS4N...JPG`), turned upright (the Santoro portrait was stored sideways), and resized from phone camera size (up to 6.6 MB) to web size (100 to 850 KB). They live in `familychurch-sd/public/images`.
- **The logo already matches the palette.** The logo's blue measures `#114C9C`, the exact nav link blue Chicago Family Church uses, which the prompt already had as `--blue-ink`. So the logo sits in the white navbar with no colour clash, and turns white with a CSS filter for the navy menu and footer.
- **The round mark was cut out of the logo** for the footer, the favicon and the phone home screen icon.
- **The YouTube style banner** (blue band, yellow sun, script "San Diego") became the link preview image `og.jpg`, which is what people see when the site is shared in a text or on Facebook. It is not used on the page itself because its script font and painted texture would clash with the page's typography.
- **Every photo got a job.** The bright wisteria picnic is the Home hero (warm, outdoors, faces visible, and it shows "share a meal"). The park picnic carries the "Stay for the picnic" panel. The big congregation photo, youth room, young adults and hike photos became a new **Life together** mosaic on Home, because the first question a visitor has is "what is it like here?". The indoor group photo heads the About page, uncovered, so every face shows. The rest form a gallery on About.
- **Indoor photos are cropped low on purpose.** The fellowship hall ceiling (fans, textured ceiling) fills the top third of most indoor shots, so those photos are positioned to show tables and faces instead.

**Why it matters:** Chicago's site works because of its real, candid photos of members, and this church has good ones. Alt text is written for each photo so screen reader users get the same picture.

**Still missing:** an official founders portrait cleared for use (a logo placeholder stands in), a solo portrait of Walter Frank (his current photo is an event shot with another member in frame), and optionally a year round preaching photo, because the current sermon poster is from Christmas.

## 11. SEO, accessibility and hosting
**What it does:** Makes the site findable on Google and Maps ("church in La Mesa"), shareable with a proper preview image, usable with a keyboard or screen reader, and deployable to Vercel without broken links on refresh.

**Why it matters:** The JSON-LD `Church` schema is what gives Google the address, service time and social links for search results. The `vercel.json` rewrite fixes the common problem where a single page app shows a 404 when someone refreshes `/about`, while still letting `/api/subscribe` reach the newsletter function.

## 12. Never
**What it does:** A list of banned patterns. AI builders drift toward the same generic choices (gradients, icon grids, carousels, shadows), and naming them is the most reliable way to stop that. The newsletter rules (no secrets in the browser, no skipping double opt in, no revealing who is subscribed, no popups) are there because an AI will happily take those shortcuts if not told otherwise.

**Specific to this site:** Poppins is banned even though Bay Area uses it, gold on blue is banned because it fails contrast, and "no stock photographs" protects the main thing Chicago does right.

## 13. Dependencies
**What it does:** Pins the exact packages so the AI does not add a UI kit, a carousel library or a date library. The Sundays strip date logic uses the built in `Intl.DateTimeFormat` with the `America/Los_Angeles` time zone, so no extra package is needed.

## 14. Build order
**What it does:** Gives the AI a sequence: foundations, then shared pieces, then pages, then integrations, then checks. Building the navbar, footer and service bar first means every page inherits them, and testing at four widths with reduced motion on catches most layout bugs before launch.

## 15. Newsletter sign up, frontend and backend
**What it does:** Adds "The Sunday Letter", a weekly email people can sign up for from the footer of every page. It specifies the form (frontend), a small server function that receives sign ups (backend), how the two talk, every error case, the tests, and the setup steps the church does once in Brevo and Vercel.

**How the pieces fit, in plain terms:**
- **The form** sits at the top of the footer, so it is on every page without being a popup. It asks only for an email and an optional first name.
- **The backend** is one small function, `/api/subscribe`, that runs on Vercel next to the website. It exists so the Brevo password (API key) never reaches anyone's browser, and so the church can filter out bots and junk before anything reaches the list.
- **Brevo** does the heavy lifting: it sends the "please confirm" email, keeps the list, adds the unsubscribe link to every issue, and gives volunteers a drag and drop editor for writing each Sunday Letter. It is free for up to 300 emails a day.

**Why each decision:**
- **Double opt in.** Nobody joins the list until they click a link in their own inbox. This stops pranksters signing up other people, keeps the list clean, and keeps the church's emails out of spam folders.
- **No database of our own.** Brevo stores the list, so there is nothing for the church to maintain, back up or secure.
- **Bot protection in layers.** A hidden field only bots fill in, a check that the form was not submitted in under three seconds, a per connection limit, an optional Vercel firewall rule, and optional Cloudflare Turnstile (an invisible "are you human" check, much less annoying than a CAPTCHA).
- **Privacy by default.** The site never says whether an email is already subscribed (so nobody can test whether someone is a member), never logs full email addresses, and gets a short privacy page explaining what is kept and how to leave.
- **Sending from a church address.** Emails go out from `news@familychurchofsandiego.org`, with replies going to the Gmail inbox. Sending bulk email "from" a gmail.com address through another service gets it rejected by Gmail, Yahoo and Outlook, so the domain has to be set up in Brevo once.
- **Tests.** The prompt lists the exact cases to test, so the AI proves the backend handles bad input, bots, duplicates and Brevo outages before anyone relies on it.

**Edit this if:** the church wants a different name or frequency for the newsletter (change `church.newsletter` and the copy in section 9), or wants to ask for more than a first name (add a Brevo attribute and a field, and keep it optional).

## 16. Church calendar, one source of truth
**What it does:** Makes the church's Google Calendar the single place where dates live. A small server function, `/api/calendar`, reads the calendar and the website uses that one feed for three things: the next eight Sundays strip, the "What's happening" list, and the picnic panel.

**Why it was added:** the first draft assumed every first Sunday is a picnic and marked them automatically. That is not always true, so a website that guessed would sometimes invite people to a picnic that is not happening. Now:
- **A picnic shows only when the calendar says so.** Any Sunday event with "Picnic" in its title gets the gold marker, wherever in the month it falls. A first Sunday with no picnic event shows nothing extra.
- **A picnic Sunday is never a service day.** If the calendar has a picnic on a Sunday, the site treats that Sunday as having no 11:00 AM service: no service time in the strip, no livestream, no "next service" highlight (it moves to the following week), and from the Monday before, the blue service bar switches to "This Sunday: Picnic, 12:00 PM" with the picnic location and "No service this week, back on Sunday, {date}". Volunteers only add the picnic; they do not also need a "No service" event. The rule is written in one function the whole site asks, so it cannot be applied in one place and forgotten in another.
- **Cancelled Sundays come from the calendar too.** A "No service" event strikes that Sunday through and moves the "next service" highlight to the following week.
- **Copy never promises a picnic, or a service on a picnic day.** The wording says "most months one Sunday becomes a picnic instead" and points to the calendar; the picnic panel only names a date, time and place when one is on the calendar, and says plainly there is no service that day.
- **Nobody edits the website to change a date.** Volunteers use Google Calendar on their phone; the site picks it up within five minutes.

**Why a server function instead of calling Google from the browser:** it keeps the Google key private, strips out anything personal on the events (attendee emails, descriptions), and lets Vercel cache the answer for five minutes so the site stays fast and Google is not called on every visit. If Google is down, the site keeps showing the last good copy for up to an hour, and if there is no copy at all it falls back to plain Sunday dates with no picnics.

**Edit this if:** the church would rather use a different word than "Picnic" or "No service" in event titles. Change `church.calendar.picnicKeyword` and `cancelledKeyword`.

## 17. Live status, the green dot
**What it does:** Makes the dot on the `Watch live` button turn green, with the label `Live now`, only when YouTube confirms the church channel is streaming at that moment. Clicking it goes straight to the live video.

**Why it changed:** the earlier plan made the dot pulse during the usual service time (Sunday 10:50 AM to 12:45 PM) whether or not anything was streaming. That would say "live" on a Sunday the stream did not start, and say nothing for a special midweek stream. Now the site asks YouTube.

**How it works, simply:**
- A small server function, `/api/live`, asks YouTube "is any of our newest videos live right now?". It uses about 2 of the 10,000 free daily YouTube requests each time.
- The answer is shared by all visitors: at most once a minute on Sunday mornings, once every ten minutes the rest of the week. So even a busy Sunday costs almost nothing.
- Open pages check again every minute during the service window, and stop checking when the tab is in the background.
- **Four states:** green and pulsing `Live now` (streaming), white `Starts at 11:00 AM` (a stream is scheduled within the hour), dim white `Watch live` (nothing on), and the same dim white if YouTube cannot be reached. The site never shows green unless YouTube said so.
- **Real status beats the calendar:** if the church goes live on a picnic Sunday, the green button still appears.
- The green (`#5BE38F`) is one of only three colours not taken from the reference sites, chosen because it stands out clearly on the dark blue button. The label also changes, so people who cannot tell green apart still know.

**Edit this if:** the church would rather use YouTube's red for live. Swap `--live` for a red that passes contrast on `--blue-deep`.

---

## Before you run the prompt
1. Copy `familychurch-sd/public/images` into the new project's `public` folder. Photos and logos are already named, rotated and sized.
2. **Get permission for the photos with children in them.** Several photos (the congregation group, picnics, youth room) show minors. Most churches ask parents before posting children's faces on a public website. If anyone says no, swap that photo or crop it.
3. **Calendar:** make the church's Google Calendar public (Settings, Access permissions, See all event details) and copy its Calendar ID (Settings, Integrate calendar). Create an API key in Google Cloud with only the Calendar API enabled. Add both to Vercel as `GCAL_ID` and `GCAL_API_KEY`. In the same Google Cloud project, create a second API key with only the YouTube Data API v3 enabled and add it as `YOUTUBE_API_KEY` (for the green live dot). Agree on the rules with whoever edits the calendar: put **Picnic** in the title of any Sunday picnic, with its real start time and location (a picnic Sunday automatically has no service, so nothing else is needed), and add a **No service** event on any other Sunday without a service. The AI writes these rules into `docs/calendar-setup.md`.
4. Create a free Formspree form pointed at familychurchofsandiego@gmail.com and copy its ID.
5. **Newsletter:** create a free Brevo account, authenticate the familychurchofsandiego.org domain (two DNS records at the domain registrar), create the `Sunday Letter` list and the confirmation email template, and create an API key. Then add the keys to Vercel. The AI will also write these steps into `docs/newsletter-setup.md` in the project. You will need the domain to be registered before this step.
6. Have the pastors check every `[CONFIRM]` line, including the photo captions, the newsletter name and how often it goes out.
7. Ask the Family Federation for an official founders portrait cleared for use, and a white FamilyFed logo if you want it in the footer.
8. Optional: a solo portrait of Walter Frank and a non Christmas preaching photo.

**Preview locally:** run `node familychurch-sd/serve.js` and open `http://localhost:5178`. All seven pages are linked from the navbar and footer. After editing anything in `preview/src/`, run `node familychurch-sd/preview/build.js`. Address bar switches for testing: `?picnic=this-week`, `?live=now`, `?live=soon`.
