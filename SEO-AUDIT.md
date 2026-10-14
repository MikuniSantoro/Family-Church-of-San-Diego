# SEO and indexing audit — October 14, 2026

Scope: repository source, local HTTP serving, deployment artifact, and Chromium desktop/mobile checks. Requests to the public domain were blocked by the execution environment's egress proxy (HTTP CONNECT 403). That is an environment access restriction, not evidence that the website returns 403 to Google. Live HTTP status, redirects, TLS certificate, robots response, sitemap response, Core Web Vitals, external link health, and Google indexing remain unverified.

## Implemented

- Root index.html contains the complete homepage instead of a meta-refresh stub. Deployment copies the current home-preview.html into index.html, keeping both synchronized. Navigation Home links resolve to the root.
- Six indexable canonical pages: /, /about.html, /sermons.html, /contact.html, /donate.html, /privacy.html. Each has a unique title and description, absolute HTTPS canonical, and Open Graph metadata. home-preview.html canonicals to / to consolidate the duplicate homepage.
- robots.txt permits crawling and declares the sitemap URL. sitemap.xml contains only the six indexable canonical pages; no fabricated modification dates.
- Newsletter confirmation retains its intentional noindex tag and is excluded from the sitemap. No main public page has noindex in its HTML. Live X-Robots-Tag response headers could not be inspected.
- Church JSON-LD on the homepage uses only existing published details: church name, La Mesa address, email, logo, photo, and known social links. No invented phone number, ratings, coordinates, service opening hours, or business identifiers.
- Important section labels upgraded to H2 without changing their label styling. Every public page has exactly one H1. Existing displayed wording otherwise retained.
- Informative sermon/donation photos have descriptive alt text. Decorative footer logo marks retain empty alt attributes, correctly avoiding repeated screen-reader text.
- Local images include intrinsic dimensions and asynchronous decoding. The main hero image is prioritized. Existing deferred below-fold images and embeds are retained. These reduce avoidable layout shift and help loading priority; they do not establish a live Lighthouse score or Core Web Vitals pass. Large JPEGs and third-party Google/YouTube embeds remain performance costs.
- Explicit deployment file list excludes prompt documents, obsolete numbered HTML drafts, template fragments, and server/build scripts. SEO files are included. Sitemap and robots are served with appropriate local MIME types.
- A YouTube API failure no longer blocks unrelated website/SEO deployments. The workflow first attempts to reuse previously published public sermon metadata, then tries to refresh it. Failed refreshes remain visible in Actions; absent data falls back to the playable playlist and link.

## Validation

Run `python3 scripts/check-seo.py` from the repository root. It passed metadata, one-H1, noindex, local file/fragment link, image alt attribute, sitemap and JSON-LD checks for eight HTML files. All checked internal links and fragments resolve. Six main pages passed local Chromium layout checks at 1280px and 375px. Homepage content is present with JavaScript disabled. Deployment staging verified current root HTML and SEO assets, excluding draft pages. Remote external links and cross-origin playback were not verified in this environment.

There is no React application or SPA router. Pages are actual .html documents discoverable through links and the sitemap. Use those existing URLs rather than nonexistent /about or /sermons routes. GitHub Pages does not require SPA fallback configuration for this site.

## Publication and Google indexing

1. Confirm the latest `Sync sermons and publish website` Actions run successfully deploys the artifact. Pages Source must be GitHub Actions for this explicit file list. Confirm the production custom domain is familychurchofsandiego.org and HTTPS is enabled after certificate issuance.
2. In a private browser, check /, /about.html, /sermons.html, /contact.html, /donate.html, /privacy.html, /robots.txt and /sitemap.xml on https://familychurchofsandiego.org/. Check www redirects consistently to the apex domain and HTTP redirects to HTTPS. Inspect any failure before requesting indexing. Live behavior was not verified here.
3. In Google Search Console, add a Domain property for familychurchofsandiego.org. Add exactly the google-site-verification TXT record Google supplies in Squarespace DNS; preserve existing records. Verify ownership. No verification token was supplied, invented, or committed.
4. Submit https://familychurchofsandiego.org/sitemap.xml in Search Console > Sitemaps.
5. Use URL Inspection on the homepage, About and Contact URLs. Run Test Live URL, inspect crawl/indexing blockers, and request indexing where available. Submission is a request, not a guarantee. Review Page indexing reports for Google's actual result.

## Local discovery and remaining limitations

- Claim or update an eligible Google Business Profile using the actual church name, address, category and contact details. Point the website field to the canonical domain. Avoid keyword stuffing the business name. Verify ownership using Google's process. A profile was not inspected, created, or verified here.
- Keep name/address/contact details consistent across Google, the website, Facebook and other directories. Only add service hours and phone numbers when confirmed. Invite genuine reviews without incentives.
- The site already identifies its Family Federation for World Peace and Unification affiliation. The About metadata adds the user-requested Unification Church San Diego search context without rewriting visible doctrinal content. Metadata improves relevance; it cannot guarantee rankings for any query.
- Rankings for general La Mesa church searches depend on proximity, relevance, public profile completeness, links and reputation as well as technical SEO.
- Third-party embeds, sample calendar-driven text, simulated contact/newsletter handlers, and the incomplete build.js source layout are pre-existing application limitations. They are not repaired by SEO metadata. Make sure publicly displayed events and functional claims reflect actual services.
- No Google Search Console access or live search-engine results were available. Indexing, rankings, live deployment and certificate readiness have not been claimed as verified.
