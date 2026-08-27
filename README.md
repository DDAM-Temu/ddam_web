# DDAM — corporate website

The rebuild of the Dentsu Data Artist Mongol LLC corporate site.
Next.js (App Router) + Tailwind CSS v4, English, fully static.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export of all 14 routes
```

## Design direction

The homepage is a port of **variant E — "Narrative scroll"**, locked on
2026-08-27 after comparing five directions. The source artboard is
`design/Main.dc.html`; the four rejected directions are kept in
`design/archive/`.

Its vocabulary:

| | |
|---|---|
| Display | Newsreader (serif, light) |
| Body | Instrument Sans |
| Labels | IBM Plex Mono, uppercase, wide tracking |
| Ground | `#07090F` near-black |
| Accent | `#2E6BFF` |
| Brand | Red `#C8102E`, Blue `#003DA5` — 2018 logo guideline |

Tokens live in the `@theme` block at the top of `src/app/globals.css`.

## Motion

Almost all of it is CSS — no animation library, and every effect either
composited or scroll-driven. There is exactly one exception, below.

- Reveals and bar growth use anonymous `animation-timeline: view()`, wrapped in
  `@supports` so browsers without scroll-driven animations simply show the
  content rather than hiding it behind an animation that never runs.
- The progress rail uses `animation-timeline: scroll(root block)`.
- Chapter labels hold with `position: sticky` while their content scrolls past.
- The chapter 05 poster rail is scroll-linked rather than timed, so it always
  opens on the newest poster and walks backwards through time as you descend.
  Below 768px it becomes a swipeable, snapping scroller instead — the track is
  ~7x the viewport there, and scroll-linking it makes it fly.
- The chapter 03 globe is a video scrubbed by scroll position — down the page
  runs it forward, up runs it backward. This is the one effect that cannot be
  CSS: a scroll timeline needs an animatable property, and there is none behind
  `HTMLMediaElement.currentTime`. `src/components/scroll-video.tsx` carries the
  reasoning; the short version is that the encode matters more than the loop
  does, and the encode recipe is under Assets below.
- Everything is guarded by `prefers-reduced-motion: reduce`. The globe opts out
  further — reduced motion, data saver, and anything under 768px keep the
  poster frame, which is the video's own frame 0, so the composition is
  identical either way.

### Named timelines, and why they are not optional

**An anonymous `view()` resolves against the nearest scroll container, not the
document — and `overflow: hidden` makes an element a scroll container.** Two
bugs came out of this, both of which looked fine on a still:

1. `body { overflow-x: hidden }` made the root a scroll container, so every
   reveal on the page pinned at opacity 0. Fixed with `overflow-x: clip`, which
   clips without creating a scroll container.
2. The hero parallax and the globe zoom sit inside clipping sections, so their
   timelines resolved against those sections — which never scroll. Both pinned
   at exactly 50% progress and never moved.

So any clipping section that hosts a scroll-driven child carries `.clip-scope`,
which publishes a named `view-timeline`; the child references that name instead
of `view()`. The poster rail does the same through `.rail-scope`, because its
`.mqwrap` clips too.

If a scroll-driven animation ever looks frozen, check
`el.getAnimations()[0].currentTime` — a constant value across scroll positions
means the timeline resolved against the wrong scrollport.

Two things differ deliberately from the artboard, both for performance:

1. **The conic field** (`.ring`) rotates the element with `transform` instead of
   animating an `@property <angle>` inside the gradient. The artboard version
   repainted a 1180px blurred conic gradient every frame; this version is
   composited.
2. **The grain** translates a single promoted layer via `translate3d` rather
   than re-rasterising the turbulence tile per step.

`html` uses `overflow-x: clip`, not `hidden`. `hidden` would make the root a
scroll container, and every `view()` timeline would resolve against it instead
of the document — freezing all reveals at opacity 0.

The one exception to the no-JS rule is the chapter 05 poster rail
(`src/components/poster-rail.tsx`), the site's only client component. Clicking
a card opens the full uncropped poster in a native `<dialog>`, so Escape, the
focus trap and focus restore come from the platform. Its enter/exit animation
is still pure CSS — `overlay` and `display` transition with `allow-discrete`,
which keeps the dialog in the top layer while it fades out, and
`@starting-style` supplies the entry values. Browsers without either simply
show and hide it instantly.

## Content

`src/lib/content.ts` is the single source of truth, and everything in it is
sourced:

- Headcount and division splits — timesheet Member Workload export, 2026-08-25
  (161 rows less 4 system accounts = **157** people).
- Address, phone, email, founding year — the live ddam.ai contact and about
  pages.
- Brand hex values — `ddam-logo/180808DDAM-Logo-1-1.pdf`.
- News items — nine posters from the Ignition of Curiosity series and the
  company events around it. `NEWS` sorts on `date`, so the rail and the feed
  always run newest-first regardless of declaration order.

  **Every date is read off the poster artwork, not the filename.** Three
  filenames disagree with their own poster: the Jun 2024 file says 25 Jun
  against a 27–28 Jun poster, the Aug 2024 file says 14 Aug against 15–16 Aug,
  and the Sep 2024 file says 28 Sep against 30 Sep. The Japan–Mongolia Student
  Forum poster carries no date at all; 2025.02.22 came from the client.

  `public/img/news/` holds the 520px cards and `public/img/posters/` the
  1200px lightbox renders. Sources are A-series (0.707), which is why the card
  aspect `520/735` shows each poster whole rather than cropping it. The
  Ideathon poster was rasterised from its PDF via `sips`.

Sections the PRD requires but for which no copy exists yet render an
`AwaitingContent` block listing what is outstanding. **No placeholder prose is
shipped anywhere on the site.** The full gap list lives in the project's
discovery notes, which are kept out of this repo.

### Two facts still to confirm before this goes public

- **Founding year.** The site says 2018, from ddam.ai. The July 2024 Town Hall
  poster says "8th Year Anniversary", which does not reconcile.
- **Parent company.** ddam.ai names Data Artist Inc.; the PRD and these designs
  name Dentsu Digital. The real chain is probably
  dentsu → Dentsu Digital → Data Artist → DDAM.

## Assets

`public/img/` holds the web-optimised subset. Two source folders are
**deliberately not in this repo** (see `.gitignore`):

- `DDAM-posters/` — 562 MB of print-resolution artwork.
- `DDAM-GIRLS-2026/` — employee photography with no recorded usage consent.

### The chapter 03 globe

`Earth.mp4` (12 MB, 1800x1080, 30 fps) stays local — see `.gitignore`. What
ships is `public/video/earth-globe.mp4`, 4.8 MB:

```
ffmpeg -i Earth.mp4 -an -vf "fps=24" \
  -c:v libx264 -profile:v high -level 4.2 -preset veryslow -crf 26 \
  -g 3 -keyint_min 3 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart \
  public/video/earth-globe.mp4
```

`-g 3` is the whole trick, and it is not an optimisation. A seek decodes from
the preceding keyframe, so at the source's ~1s GOP an arbitrary scrub costs up
to 30 frames of decode and the globe visibly lags the wheel. At a 3-frame GOP
every seek measures 8-32 ms, backward as cheap as forward, which is what makes
scrolling up work at all. It costs roughly 2x the bitrate of a normal GOP.

Resolution is native and deliberate: the section is full-bleed, so on a 1440px
DPR-2 display it occupies 2880 device pixels and even 1800 is an upscale.
Encoding narrower reads as blurry. The poster is frame 0 at the same width:

```
ffmpeg -i Earth.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 3 public/img/earth-globe.jpg
```

If the frame rate changes, `FPS` in `scroll-video.tsx` must change with it —
seeks are quantised to that grid.

The logo is still raster only. A vector logo is needed before launch; a 520px
PNG in the header will not hold up at 4K.

## Not built yet

- Services mega menu (PRD asks for one; the header currently links straight
  through to `/services`).
- Leadership, timeline, case studies, careers listings, enquiry form.
- CMS. News and Careers both imply ongoing editing by non-developers.
