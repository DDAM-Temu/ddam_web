"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays chapter 00's arrival once, on a clock, when it comes into view.
 *
 * Everything else on this site reveals on a scroll timeline, and for fading
 * copy that is right — park half way through a fade and you are looking at
 * slightly faint text, which is fine. The headline is not that. Its lines rise
 * out of a clip, so a half-played state is letters cut through the middle, and
 * because a scroll timeline is scrubbed the reader can hold that state for as
 * long as they like. Scrolling slowly onto the section left the headline
 * sitting there sliced. No amount of tuning the range fixes it; the reveal has
 * to be something that finishes on its own.
 *
 * So this is a clock, started once by an observer and never rewound. It
 * arms in an effect rather than in the markup: the server renders no
 * attribute, so with no JavaScript — or with reduced motion, where it returns
 * before arming — nothing is ever hidden and the scene is simply there.
 */
export function SceneReveal({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Arm: from here the CSS holds the lines below their clip.
    el.dataset.scene = "";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect(); // once, and it stays played
        el.dataset.scene = "play";
      },
      // Enough of it on screen that the reader is looking at it, not catching
      // it in the corner of the viewport.
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
