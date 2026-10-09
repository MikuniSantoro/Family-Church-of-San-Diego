// Builds the static preview pages from src/*.html plus shared partials.
// Run: node preview/build.js   (from familychurch-sd) or node build.js (from preview)
const fs = require("fs"), path = require("path");
const dir = __dirname;
const IMG = ".";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=9754+Grosalia+Ave,+La+Mesa,+CA+91941";

const pages = [
  { src: "home.html", out: "home-preview.html", title: "Family Church of San Diego | Sundays at 11 AM in La Mesa", active: "home", bar: false /* home places its bar inside src */ },
  { src: "about.html", out: "about.html", title: "About | Family Church of San Diego", active: "about" },
  { src: "sermons.html", out: "sermons.html", title: "Sermons | Family Church of San Diego", active: "sermons" },
  { src: "contact.html", out: "contact.html", title: "Contact | Family Church of San Diego", active: "contact" },
  { src: "donate.html", out: "donate.html", title: "Give | Family Church of San Diego", active: "donate" },
  { src: "newsletter-confirmed.html", out: "newsletter-confirmed.html", title: "You are on the list | Family Church of San Diego", active: "", noNewsletter: true, noindex: true },
  { src: "privacy.html", out: "privacy.html", title: "Privacy | Family Church of San Diego", active: "" },
];
const href = { home: "home-preview.html", about: "about.html", sermons: "sermons.html", contact: "contact.html", donate: "donate.html", privacy: "privacy.html" };

const arrow = `<span class="circ"><svg width="16" height="16"><use href="#arrow"/></svg></span>`;
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="rings" viewBox="0 0 32 18"><circle cx="11" cy="9" r="7.4" fill="none" stroke="#A9964F" stroke-width="1.25"/><circle cx="21" cy="9" r="7.4" fill="none" stroke="#A9964F" stroke-width="1.25"/></symbol>
  <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="arrow-ur" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
</svg>`;

const nav = (active) => {
  const l = (k, t) => `<a class="l${active === k ? " active" : ""}" href="${href[k]}"${active === k ? ' aria-current="page"' : ""}>${t}</a>`;
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav" id="nav">
  <div class="wrap">
    <a class="logo" href="${href.home}"><img src="${IMG}/logo.png" alt="Family Church of San Diego" width="178" height="44" style="height:44px;width:auto" /></a>
    <nav class="links" aria-label="Main">
      ${l("home", "Home")}${l("about", "About")}${l("sermons", "Sermons")}${l("contact", "Contact")}
      <a class="btn btn-blue sm${active === "donate" ? " current" : ""}" href="${href.donate}"${active === "donate" ? ' aria-current="page"' : ""}>Donate ${arrow}</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="sheet"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
  </div>
</header>

<div class="sheet dark" id="sheet" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="sheet-top">
    <img class="logo-white" src="${IMG}/logo.png" alt="Family Church of San Diego" style="height:36px;width:auto" />
    <button class="close-btn" id="closeBtn" aria-label="Close menu"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
  </div>
  <nav aria-label="Mobile">
    <a href="${href.home}">Home</a><a href="${href.about}">About</a><a href="${href.sermons}">Sermons</a><a href="${href.contact}">Contact</a>
  </nav>
  <div style="margin-top:32px"><a class="btn btn-white" href="${href.donate}">Donate ${arrow}</a></div>
  <div class="foot"><p class="label">Sundays at 11:00 AM</p><p>9754 Grosalia Ave, La Mesa</p></div>
</div>`;
};

const bar = `<div class="bar">
    <div class="wrap">
      <div><p class="label">Sunday service</p><p class="t num">11:00 AM</p></div>
      <div><p class="label">Where</p><a class="addr" href="${MAPS}" target="_blank" rel="noopener">9754 Grosalia Ave, La Mesa</a></div>
      <div><a class="btn btn-deep plain" id="liveBtn" href="https://www.youtube.com/@FamilyChurchofSanDiego/live" target="_blank" rel="noopener"><span class="dot" id="liveDot"></span> <span id="liveLabel">Watch live</span></a></div>
    </div>
  </div>`;

const newsletter = `<div class="nl split">
      <div>
        <p class="label">The Sunday Letter</p>
        <h2 class="h2 nl-h">One email a week from your church <em>family</em>.</h2>
      </div>
      <div class="nl-right">
        <p class="nl-body">This Sunday's message, what is coming up, and a reminder before every picnic. No spam, and you can unsubscribe in one click.</p>
        <form class="nl-form" id="nlForm" novalidate>
          <div class="nl-field">
            <label class="label" for="nlName">First name <span class="opt">Optional</span></label>
            <input id="nlName" name="firstName" type="text" autocomplete="given-name" maxlength="80" />
          </div>
          <div class="nl-field">
            <label class="label" for="nlEmail">Email</label>
            <input id="nlEmail" name="email" type="email" inputmode="email" autocomplete="email" required aria-describedby="nlErr" />
          </div>
          <input class="hp" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button class="btn btn-white nl-btn" type="submit"><span class="nl-btn-text">Sign me up</span> <span class="circ"><svg class="arr" width="16" height="16"><use href="#arrow"/></svg><span class="spin" aria-hidden="true"></span></span></button>
          <p class="nl-err" id="nlErr"></p>
          <p class="nl-small">We will send one email to confirm. See our <a href="${href.privacy}">privacy note</a>.</p>
        </form>
        <div class="nl-done" id="nlDone" tabindex="-1" hidden>
          <p class="nl-done-h">Almost there.</p>
          <p class="nl-body">We just sent a confirmation link to <b id="nlAddr"></b>. Open it to start receiving the Sunday Letter.</p>
          <button class="tlink nl-reset" id="nlReset" type="button">Use a different email</button>
        </div>
        <p class="sr-only" aria-live="polite" id="nlLive"></p>
      </div>
    </div>`;

const footer = (noNewsletter) => `<footer class="dark">
  <div class="wrap">
    ${noNewsletter ? "" : newsletter}
    <div class="fgrid">
      <div>
        <img class="logo-white" src="${IMG}/logo-mark.png" alt="" width="56" height="56" style="margin-bottom:18px" /><p class="fname">Family Church of San Diego</p>
        <p class="label" style="margin-top:20px">God's Dream, One Family</p>
      </div>
      <div><p class="label">Visit</p><ul><li>9754 Grosalia Ave<br>La Mesa, CA 91941</li><li>Sundays at 11:00 AM</li><li><a href="${MAPS}" target="_blank" rel="noopener">Get directions</a></li></ul></div>
      <div><p class="label">Contact</p><ul><li><a href="mailto:familychurchofsandiego@gmail.com">familychurchofsandiego@gmail.com</a></li><li><a href="https://www.facebook.com/profile.php?id=61580314035399" target="_blank" rel="noopener">Facebook</a></li><li><a href="https://www.instagram.com/familychurchofsandiego/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.youtube.com/@FamilyChurchofSanDiego" target="_blank" rel="noopener">YouTube</a></li></ul></div>
      <div><p class="label">Pages</p><ul><li><a href="${href.home}">Home</a></li><li><a href="${href.about}">About</a></li><li><a href="${href.sermons}">Sermons</a></li><li><a href="${href.contact}">Contact</a></li><li><a href="${href.donate}">Donate</a></li><li><a href="${href.privacy}">Privacy</a></li></ul></div>
    </div>
    <div class="fbottom">
      <p>© 2026 Family Church of San Diego. A community of the Family Federation for World Peace and Unification.</p>
      <div class="rings-div"><svg width="32" height="18"><use href="#rings"/></svg></div>
    </div>
  </div>
</footer>

<button class="totop" id="totop" aria-label="Back to top"><svg width="20" height="20"><use href="#up"/></svg></button>`;

for (const pg of pages) {
  let body = fs.readFileSync(path.join(dir, "src", pg.src), "utf8");
  body = body.replace(/\{\{BAR\}\}/g, bar).replace(/\{\{ARROW\}\}/g, arrow).replace(/\{\{IMG\}\}/g, IMG).replace(/\{\{MAPS\}\}/g, MAPS)
    .replace(/\{\{HREF:(\w+)\}\}/g, (_, k) => href[k]);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${pg.title}</title>${pg.noindex ? '\n<meta name="robots" content="noindex" />' : ""}
<link rel="icon" href="${IMG}/favicon-32.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<script>document.documentElement.classList.add("js")</script>
<link rel="stylesheet" href="site.css?v=home-layout-3" />
<link rel="stylesheet" href="pages.css?v=calendar-2" />
</head>
<body>
<!-- Generated by build.js from src/${pg.src}. Edit the source, then run: node build.js -->
${sprite}

${nav(pg.active)}

${body.trim()}

${footer(pg.noNewsletter)}

<script src="site.js?v=home-layout-3"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, pg.out), html);
  console.log("built", pg.out);
}
