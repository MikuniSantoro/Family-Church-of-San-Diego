# Page prompts

`../PROMPT.md` is the master prompt: the shared design system, the Home page, the global navbar and footer, and all backend functions. Each file in this folder is the full prompt for one other page and is the source of truth for that page's sections and copy.

| File | Route | Reference inspiration |
| --- | --- | --- |
| `about.md` | `/about` | Bay Area's Who we are, founders, staff and closing contact box; Chicago's mission line, founders and pastor bio |
| `sermons.md` | `/sermons` | Chicago's sermon feed that plays in place; Bay Area's past sermons button and weekday devotion block |
| `contact.md` | `/contact` | Chicago's "Visit us!" with three reassurances; Bay Area's form beside contact details, and its FAQ |
| `donate.md` | `/donate` | Bay Area's numbered giving steps, stewardship note, scripture and tithing note; Chicago's always visible Donate button |
| `newsletter-confirmed.md` | `/newsletter/confirmed` | Neither site has one; one clear next step in the style of both |
| `privacy.md` | `/privacy` | Bay Area's footer privacy link, kept short |

**How to run them:** give an AI `../PROMPT.md` first and build the foundation and Home (build order steps 1 to 4). Then give it one page file at a time, with `../PROMPT.md` still in context, in the order above. Each page file says which sections of the master prompt it relies on.

**Preview:** every page has a static preview in `../preview/` (start with `node ../serve.js` and open `http://localhost:5178`). Previews use sample calendar, sermon and live data.
