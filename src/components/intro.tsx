import type { CSSProperties } from "react";
import { ScrollHint } from "@/components/icons";
import { VISION } from "@/lib/content";

/**
 * The seven growth stages, in order. 6 and 7 are the same artwork at the same
 * rendered size — 6 is the transparent render, 7 the one on black — so the last
 * step is a straight dissolve that resolves into focus rather than a movement.
 * Only 7 comes to rest, so only 7 carries the display resolution.
 */
const STAGES = [1, 2, 3, 4, 5, 6, 7];
const RESTING = 7;

/**
 * The opening scene: the tree grows while the logo fills like a vessel and the
 * vision statement types itself. Then it stops and waits — the reader scrolls
 * past it into the page. Nothing fades out on a timer, and nothing dissolves
 * into the page behind it; the scene is opaque and simply scrolls away.
 *
 * It is 100svh at the top of the HOME page only. Everywhere else the header's
 * logo is an ordinary logo — see the `body:has(.intro)` rules in globals.css,
 * which is how the header knows whether a scene is present to fly out of.
 *
 * The logo you see here is NOT in this component. It is the header's own logo,
 * flown out to a viewport-anchored position and scaled up. That is deliberate:
 * a separate intro logo would have to be handed off to the real one at exactly
 * the right pixel, and the handoff is what always looks wrong. Flying the real
 * one means its landing position is `transform: none` — the header slot it
 * already lives in — so the arrival cannot drift. The layout below is anchored
 * to the same `--intro-*` custom properties the flight reads, so the scene and
 * the flight agree by construction rather than by tuning.
 *
 * All of it is CSS. A scene that gates the whole site behind a script is a
 * scene that can strand the reader on a blank page.
 *
 * Stages 1-6 keep their alpha; stage 7 does not, and the difference is the
 * point. In the transparent artwork the leaf structure is carried by the ALPHA
 * channel — the canopy is speckled coverage, averaging 0.40 with values from 0
 * to 1 — and lossy alpha compression destroys precisely that detail, which is
 * what made the resting tree read as mush. Stage 7 comes from a render on
 * black, so the same structure sits in RGB where WebP is far better tuned, and
 * there is no alpha channel to pay for: sharper AND smaller for the same
 * pixels.
 *
 * Its background is lifted from pure black to the ground colour rather than
 * keyed to transparency (the art is additive glow on black, so adding #07090F
 * lands the background exactly on the page and lifts the tree ~3%). An opaque
 * frame risks reading as a rectangle if the encode drifts the flat near-black,
 * so this was measured, not assumed: inside vs outside the box differs by 0.8
 * of one level. Re-encode at a lower quality and that is the thing to re-check.
 *
 * For stages 1-6, where only alpha versions exist, keep q at 80 or above —
 * below that the glow contours into visible bands, which on near-black is the
 * worst artifact available.
 *
 * Because the stages fade in over one another and never fade out, each new
 * stage simply covers the one before it — no cross-fade dip to manage, and DOM
 * order is the stacking order.
 */
export function Intro() {
  const line = VISION.statement.toUpperCase();

  return (
    <section
      className="intro"
      aria-label="Introduction"
      // Drives the typing steps and the caret's travel, so the reveal lands
      // exactly one character at a time however long the statement gets.
      style={{ "--intro-chars": line.length } as CSSProperties}
    >
      <div className="intro-tree" aria-hidden="true">
        {STAGES.map((stage) => (
          /* Plain <img>: next/image would add a wrapper and its own loading
             behaviour to the images that have to paint first, and these are
             already WebP at exactly this box's size. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={stage}
            src={`/img/preloader/tree-0${stage}.webp`}
            alt=""
            /* Stage 7 is encoded at the source's native 1024 — it is the only
               frame that stops, and at scale 1.5 it paints at 570 CSS px
               (1140 device px at DPR 2). The transients stay at 500: they
               change every quarter second, and nobody can assess the sharpness
               of something that is still moving. */
            width={stage === RESTING ? 1024 : 500}
            height={stage === RESTING ? 1024 : 500}
            /* Stage 1 is on screen at 0ms; the rest have up to 1.3s of lead
               time, so only the first is worth contending for bandwidth. */
            fetchPriority={stage === 1 ? "high" : "auto"}
            decoding="async"
            className="intro-frame"
          />
        ))}
      </div>

      {/* The logo sits above this line, flown in from the header. */}
      <p className="intro-copy">
        <span className="intro-type-wrap">
          <span className="intro-type">{line}</span>
          <i className="intro-caret" aria-hidden="true" />
        </span>
      </p>

      {/* The scene no longer dismisses itself, so it has to say so. Appears
          only once the logo has finished filling. */}
      <div className="intro-cue" aria-hidden="true">
        <span>Scroll</span>
        <ScrollHint />
      </div>
    </section>
  );
}
