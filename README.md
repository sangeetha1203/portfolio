# Sangeetha R — Portfolio

A clean, single-page portfolio: AI/CV, Full Stack projects, "How I Build
Products," blog, and a "Say Hello" contact modal. Vanilla HTML/CSS/JS +
GSAP + Lenis (no build step, no framework).

## Run locally

No install needed — just serve the folder (opening `index.html` directly
also works, but a local server avoids any browser file:// quirks):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (free)

**Netlify / Vercel** — drag-and-drop this folder in the dashboard, or:
```bash
npx netlify-cli deploy --prod
# or
npx vercel --prod
```

**GitHub Pages** — push this folder to a repo, then in
Settings → Pages, set the source to the `main` branch / root.

No environment variables or backend are required — it's fully static.

## Before you go live, replace these placeholders

| What | Where | Notes |
|---|---|---|
| Profile photo | `assets/images/profile.svg` | Currently a gradient "S" avatar. Swap in a real photo (`.jpg`/`.png`/`.webp`) and update the two `<img src="assets/images/profile.svg">` tags in `index.html`. |
| Resume | `assets/resume/resume.pdf` | Currently a 1-page placeholder PDF. Replace with your real resume, same filename. |
| Project screenshots | `projects-data.js` | Fill in the `images: { overview, tech, feature }` path for each project — leave blank to keep the placeholder box. |
| GitHub / Live Demo links | `projects-data.js` | Each project has empty `repository.url` / `demo.url` fields — fill these in. |
| Internship details | `index.html` (search `internship-card`) | Company names (TechNest Solutions, CodeSphere Technologies, Webnest Digital) are placeholders — replace with the real company names, and adjust `data-duration` / `data-gained` text to match your actual experience. |
| Design showcase images | `index.html` (search `design-card` and `design-modal-gallery`) | The Designs tab and its "Explore" popup currently use placeholder boxes — swap in real UI screenshots for StyleAI, EmpathAI, and BatterKart (or your own selection). |
| Contact email | `index.html` (search `hello@example.com`), `assets/js/contact.js`, `projects-data.js` | Replace with your real email. |
| Social links | `index.html` (hero, footer, contact modal) | GitHub / LinkedIn / Medium / WordPress currently point to the platform homepages — point them at your actual profiles. |
| Contact form backend | `assets/js/contact.js` | Currently falls back to opening the visitor's email client (`mailto:`) since there's no backend. Swap in Formspree, EmailJS, or your own API endpoint if you want messages delivered without relying on the visitor's mail client. |

## Structure

```
index.html                 One page, all sections
projects-data.js           Edit this to add/update/remove projects
assets/css/                One stylesheet per section
assets/js/                 One script per section (vanilla JS)
assets/images/              Profile placeholder — replace with real photo
assets/resume/resume.pdf   Placeholder — replace with real resume
```

## Notes on what changed from the original upload

The uploaded project referenced 6 CSS files and 5 JS files that didn't
exist, had a duplicated `<header>`, an empty/broken Projects section, and
a non-functional mobile menu. This version fixes all of that and
implements the design brief from `use.txt` (scrollytelling project pages
with Next/Previous flow, "How I Build Products," blog carousel, and the
"Say Hello" contact modal).

## Fixed: Engineering Toolkit content going missing

The skill cards used a scroll-triggered fade-in (GSAP + ScrollTrigger)
that could get stuck at `opacity: 0` if the trigger position was
miscalculated. Two fixes:

1. **GSAP, ScrollTrigger, and Lenis are now self-hosted** in
   `assets/vendor/` instead of loaded from a CDN. This is the more likely
   real-world cause — ad blockers and some corporate networks block
   `jsdelivr.net`/`unpkg.com` by default, which would silently break every
   scroll animation on the page.
2. Added a `ScrollTrigger.refresh()` call after full page load and after
   every tab switch, plus a safety-net script that force-reveals any
   element still stuck invisible a couple of seconds after load.

## New micro-interactions

All in `assets/js/interactions.js` and `assets/js/cursor.js`:
- A real custom cursor (dot + trailing ring) that grows over links/buttons
- Scroll progress bar at the top of the page
- Magnetic buttons — primary/secondary buttons drift slightly toward the cursor
- Tilting cards — skill, experience, design, blog, and internship cards tilt in 3D toward the cursor
- Click ripple on primary buttons
- Stats in the About section count up when scrolled into view

## Projects — restructured into one continuous story

Each project page is now: **Header → Overview → Technology Stack →
Features → Actions → Previous/Next**. The Gallery and separate Metadata
sections are gone — metadata (status, role, platform) now sits inline
under the subtitle in the header, and the two duplicated action button
rows are down to one.

`projects-data.js` now has an `images` object per project instead of
`gallery: 4`:
```js
images: { overview: "path/to/img.jpg", tech: "path/to/img.jpg", feature: "path/to/img.jpg" }
```
Leave any of these empty and that block automatically shows the
placeholder — same if a path is filled in but the file doesn't exist yet
(it fails over gracefully instead of showing a broken image icon). Add
your real screenshots whenever they're ready, no code changes needed.

## Ideas & Insights — renamed and reframed

- Tabs are now **Design Thinking** / **Articles** (was Designs / Blog) —
  reads as problem-solving, not graphic design.
- Design Thinking cards open a modal framed as **Problem → Solution →
  Implementation** instead of a single description paragraph — the way
  an engineer would explain a design decision, not a portfolio piece.
- Article cards now open a **preview modal** (title, date, short preview,
  "Read Full Article →") instead of linking straight out — consistent
  with the Design Thinking click → modal pattern.
- Hover animations follow the same simple pattern throughout: card lifts,
  preview image zooms slightly, arrow icon nudges right.
