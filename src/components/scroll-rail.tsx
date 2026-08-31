"use client";

import { useCallback, useRef } from "react";

/**
 * Fixed scroll-progress rail. Hidden below 1280px.
 *
 * At the foot of the page the mark arrives below the rail and links back to
 * chapter 00. Tapping it launches it: it flies the length of the bar and burns
 * out at the top, where the blue fill ends, while the page returns.
 *
 * The launch is the one thing here that needs a script, and only just. CSS can
 * animate on `:active`, but `:active` ends the moment the button is released —
 * the rocket would stop dead a few pixels up. So a click sets an attribute,
 * the animation runs off that, and `animationend` clears it so the next visit
 * to the foot of the page gets a fresh one. Navigation is left entirely to the
 * anchor; nothing here preventDefaults, so the link still behaves like a link
 * for middle-clicks, modifiers and keyboards.
 *
 * The rail is decoration and says so element by element, but the link is not —
 * hence `aria-hidden` on the pips and the bar rather than on the container,
 * and the rail's `pointer-events: none` lifted for the link alone.
 */
export function ScrollRail() {
  const ref = useRef<HTMLAnchorElement>(null);

  const launch = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.launch = "";
  }, []);

  const land = useCallback(() => {
    delete ref.current?.dataset.launch;
  }, []);

  return (
    <div className="rail">
      <b aria-hidden="true" />
      <u aria-hidden="true" />
      <b aria-hidden="true" />
      <a
        ref={ref}
        className="rail-top"
        href="#chapter-00"
        aria-label="Back to the top"
        onClick={launch}
        onAnimationEnd={land}
      >
        <span className="rail-mark" aria-hidden="true" />
        <span className="rail-trail" aria-hidden="true" />
      </a>
    </div>
  );
}
