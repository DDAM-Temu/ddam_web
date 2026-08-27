"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from `from` up to `value` the first time it scrolls into view, then
 * stops and stays put. Scrolling back past it does not replay — a figure that
 * re-counts every time it is passed reads as a widget rather than as a fact.
 *
 * Three things this has to get right, none of them the tween:
 *
 *   - **No reflow.** The digits grow from one to three, so an invisible copy of
 *     the final value holds the box open in the same grid cell. Without it the
 *     stat and its neighbours shuffle sideways for the whole animation.
 *   - **No spoken countdown.** A screen reader hearing "one, two, three…" is
 *     noise, so the animated text is `aria-hidden` and the accessible value is
 *     a static `sr-only` copy.
 *   - **Right number without scripting.** The server renders the final value,
 *     and the count only rewinds to `from` once JS has decided it will animate.
 *     No JS, or reduced motion, and the figure is simply correct.
 *
 * The text is written straight to the node rather than through state: this runs
 * a frame at a time, and re-rendering the tree 60 times to change three
 * characters is work with nothing to show for it.
 */
export function CountUp({
  value,
  from = 1,
  duration = 900,
  className = "",
}: {
  value: number;
  from?: number;
  /** ms. Fast enough to feel immediate, slow enough to read as counting. */
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let shown = value;

    const write = (next: number) => {
      if (next === shown) return;
      shown = next;
      node.textContent = String(next);
    };

    // Rewind now, not when the observer fires: the stat sits below the fold, so
    // this lands long before it can be seen.
    write(from);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect(); // once only

        const t0 = performance.now();
        const distance = value - from;
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          // easeOutQuart: quick off the mark, and settles rather than stopping.
          const eased = 1 - Math.pow(1 - t, 4);
          write(Math.round(from + distance * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      // Well inside the viewport, so it is not counting behind the `.rv` fade.
      { threshold: 0.6 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, from, duration]);

  return (
    <span className={`grid ${className}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span
        ref={ref}
        aria-hidden="true"
        className="col-start-1 row-start-1 tabular-nums"
      >
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
