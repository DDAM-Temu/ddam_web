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

A phone gets a smaller cut of the same thing:

```
ffmpeg -i Earth.mp4 -an -vf "fps=24,scale=900:-2" \
  -c:v libx264 -profile:v high -preset veryslow -crf 30 \
  -g 3 -keyint_min 3 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart \
  public/video/earth-globe-sm.mp4
```

1.29 MB against 4.78. `ScrollScrubVideo` picks between them at mount. The point
is not only bandwidth: seek cost scales with the pixels being decoded, and that
is what decides whether a scrub feels attached to the finger on a phone.

If the frame rate changes, `FPS` in `scroll-video.tsx` must change with it —
seeks are quantised to that grid.

### Chapter 00's office loop

`Site video/` (two 4K/26 Mbps clips, 87 MB) stays local. What ships is
`public/video/office-loop.mp4`, 3.4 MB — both clips, video 2 first, joined and
then closed into a loop:

```
# 1. crossfade clip 2 into clip 1 (offset = len(clip2) - fade)
ffmpeg -i Sitevideo-2.mp4 -i Sitevideo-1.mp4 -an -filter_complex \
"[0:v]scale=1600:900,fps=30,setsar=1[a];[1:v]scale=1600:900,fps=30,setsar=1[b];\
 [a][b]xfade=transition=fade:duration=0.8:offset=12.7667,fps=30[out]" \
 -map "[out]" -c:v libx264 -preset medium -crf 24 joined.mp4

# 2. blend the last second back over the first, so the loop has no cut
ffmpeg -i joined.mp4 -an -filter_complex \
"[0:v]split[a][b];\
 [a]trim=0:24.667,setpts=PTS-STARTPTS,fps=30[main];\
 [b]trim=24.667:25.667,setpts=PTS-STARTPTS,fps=30,format=yuva420p,fade=out:st=0:d=1:alpha=1[over];\
 [main][over]overlay=0:0,format=yuv420p[out]" \
 -map "[out]" -c:v libx264 -profile:v high -preset slow -crf 31 -movflags +faststart \
 public/video/office-loop.mp4
```

Step 2 is the one that is easy to get backwards. The tail goes over the HEAD,
not the head over the tail — the output then starts on a frame that matches its
own last frame. Check it by differencing the first and last frames: 0.9/255
here, against 48.6 for a straight cut.

Note clip 2 carries a DDAM logo baked into the top right, so it is on screen
for the first ~13s of every loop. Measured over the hero's gradients it sits
about 19 levels above its background — faint, but there.

Unlike the chapter 03 globe this one only ever plays, so it takes a normal GOP
and normal compression. It is not scrubbed and does not want that encode.

### The office stills

`Office image/` (fifteen 4K PNGs, 122 MB) stays local; 680 KB ships:

```
cwebp -q 78 -resize 900 0 -m 6 "Office image/N.png" -o public/img/office/office-NN.webp
```

The coverflow loads the first three eagerly and the rest lazily — every card
sits inside the frame's box, so lazy defers the whole set until the section is
approached rather than deferring card by card.

### The opening scene

`preloading/` (6.9 MB of 1024px RGBA PNGs) stays local — see `.gitignore`.
What ships is `public/img/preloader/tree-0{1..6}.webp`, 456 KB for the set:

```
cwebp -q 80 -alpha_q 60 -resize 500 500 -m 6 -sns 90 tree-growth-0N-*.png -o tree-0N.webp

# stage 6 comes from the BLACK-background render and is handled differently
ffmpeg -i tree-growth-06-full-growth-black.png \
  -vf "scale=760:760,lutrgb=r='min(val+7,255)':g='min(val+9,255)':b='min(val+15,255)'" \
  -frames:v 1 lift.png
cwebp -q 84 -m 6 -sns 90 lift.png -o tree-06.webp
```

There are **seven** stages. 6 and 7 are the same artwork at the same rendered
size — 6 the transparent render, 7 the one on black — so the final step is a
dissolve that resolves into focus rather than a movement.

Stages 1-6 are motion and nobody studies them. Stage 7 stops and stays while
the reader reads the statement and scrolls, so it gets two things the others
do not.

**Resolution.** The frames are scaled 0.40 to 1.50, so at 1.50 in a 380px box
it paints at 570 CSS px — 1140 device pixels at DPR 2. It is encoded at the
source's native 1024, as close as the source allows; at 500px it was a 2.3x
upscale and the foliage visibly mushed.

**No alpha.** This is the interesting one. In the transparent artwork the leaf
structure is carried by the *alpha* channel: the canopy is speckled coverage,
averaging 0.40 across values from 0 to 1. Lossy alpha compression destroys
exactly that, which is what made the resting tree look unclear. The
black-background render puts the same structure in RGB, where WebP is far
better tuned — and there is no alpha channel to pay for. It is both sharper and
smaller: 101 KB against 207 KB.

The `lutrgb` step lifts pure black to the page's ground colour. The art is
additive glow on black, so adding #07090F lands the background exactly on the
page and lifts the tree by an imperceptible 3%. The risk with an opaque frame
is that a drifting encode shows it as a rectangle, so it was measured: inside
versus outside the box differs by 0.8 of one level. Re-encode lower than q84
and re-check that before shipping.

If black-background renders of stages 1-6 ever turn up, the same treatment
would make the whole set sharper and smaller.

The scale ladder is `0.40 / 0.72 / 0.97 / 1.07 / 1.26 / 1.50 / 1.50` on
`.intro-frame:nth-child(n)`. Those middle values are uneven on purpose: each is
solved against the blob height the artwork already has at that stage, so what
the eye sees — rendered blob height — climbs in even steps (55, 96, 137, 178,
219, 260 of 256-space). All seven share a ground line at 79% down the box,
which is why `transform-origin` is there: the tree grows up out of fixed soil
instead of swelling from its middle. Verified identical to the pixel across all
seven stages.

The alpha is the whole cost here. Flattening the frames onto `--color-ink`
is four times smaller, but lossy WebP drifts a flat near-black by a level or
two and each frame then reads as a faintly lighter rectangle over the ground.
Keeping transparency avoids it; `-alpha_q 60` keeps that affordable. Do not
drop below roughly `-q 80` — the halo contours into visible bands, and banding
on near-black is the most obvious artifact there is.

Only `tree-01.webp` (26 KB) is needed at 0 ms. The rest have up to 1.3 s of
lead time, which is why the set is not a sprite sheet: staged arrival is a
feature, and a single sheet would be all-or-nothing.

The scene is 100svh at the top of the **home page only**, and it does not
dismiss itself — the reader scrolls past it. Every number it needs lives in one
`:root` block in globals.css (`--logo-h`, `--intro-scale`, `--intro-cx/cy`,
`--intro-fly`, and the four durations).

The logo in the scene is **the header's own logo**, flown out and scaled up,
not a copy. That is the whole trick: its landing state is `transform: none`,
the slot it already occupies, so the arrival cannot drift — measured dx/dy/dh
are all 0.0 against the same logo on a page with no scene. A separate intro
logo would need handing off to the real one at exactly the right pixel, and the
handoff is what always looks wrong. `transform-origin: 0 50%` is what makes the
maths trivial: `scale()` holds the left edge and the vertical centre still, so
the translate is just "where I want them" minus "where they already are".

The logo fills like a vessel because it is drawn as a `mask-image` of the PNG
over a rising white block, not as an `<img>`. Every opaque pixel of the source
is white (242-255 greyscale, checked), so the filled state is pixel-identical
to the PNG — which is what every other page shows, since only
`body:has(.intro)` empties it.

Nothing here needs JavaScript, deliberately: a scene that gates the whole site
behind a script is one that can strand a reader on a blank page.

Two consequences worth knowing. There is no scroll lock, because CSS cannot
release one — scrolling during the fill just skips it, and the "Scroll" cue is
timed to appear when the fill completes rather than gating anything. And
chapter 00 now sits below the scene, so its reveals had to move from
time-based to the section's own view timeline; a load-time animation would be
long over before the reader arrived.

The logo is still raster only. A vector logo is needed before launch; a 520px
PNG in the header will not hold up at 4K.

## Still to be supplied

These were on the page as visible "Awaiting content" panels until 2026-08-31,
when they were hidden. Hiding them does not close them — this list is now the
only record, so keep it honest.

**/about — vision, mission and values**
- Mission statement
- Company values
- "The most comfortable office in Ulaanbaatar" — the claim itself, in copy
  (the office photography now exists)

**/about — specialists**
- Leadership **biographies**. Names, titles and portraits for all four
  management members are published, plus the President's message. No bios yet.
- The President's name is **Hatsumi Imai, 今井初実**. Her surname changed;
  Suzuki (鈴木初実) is the former one, which is why the source portrait is
  filenamed `Hatsumi Suzuki 2.png` and why older hand-offs say Suzuki. Rename
  the source if it is ever passed on.
- Expandable CVs (PRD §5.3)
- Job titles: the timesheet export carries department labels only
- Headshots, **plus written photo consent for every person published** — note
  the office stills and hero footage already shipped do show identifiable
  staff, so this one is outstanding against live content, not future content

**/about — corporate profile**
- Representative director — the President is now listed, but "representative
  director" is a distinct legal role and has not been confirmed as hers
- Capital
- Company registration number
- Interactive history timeline (PRD §5.3) — the 2018 founding date still needs
  confirming against the July 2024 "8th anniversary" poster

**/services/[slug] — all four services**
- Strategy header: the value proposition for this service
- Problem and solution framing
- Strengths and USPs
- Case studies or tooling, where client work is publishable

**/careers**
- Benefits and compensation framework
- Culture and working-environment copy

## Not built yet

- Services mega menu (PRD asks for one; the header currently links straight
  through to `/services`).
- Leadership, timeline, case studies, careers listings, enquiry form.
- CMS. News and Careers both imply ongoing editing by non-developers.
