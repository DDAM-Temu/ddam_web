"use client";

import { useEffect, useRef } from "react";

/** Must match the encode's frame rate — see the ffmpeg recipe in README. */
const FPS = 24;

/**
 * A background video whose playhead IS the scroll position: scrolling down runs
 * it forward, scrolling up runs it backward. It never `play()`s — the frame is
 * chosen from where the element sits in the viewport, over the same range the
 * CSS motion system calls `cover`, so the scrub stays in step with the reveals
 * around it.
 *
 * This is the one effect on the page that cannot be pure CSS. A scroll timeline
 * drives an animation, and there is no animatable property behind
 * `HTMLMediaElement.currentTime`.
 *
 * What keeps a scroll-scrubbed video from stuttering is mostly not the loop:
 *
 *   - The source is encoded with a 3-frame GOP. A seek decodes from the
 *     preceding keyframe, so on a normal ~1s GOP an arbitrary seek can cost 30
 *     frames of decode and the playhead visibly lags the wheel.
 *   - Seeks are quantised to the frame grid and de-duplicated, so a flick
 *     scroll asks for at most FPS seeks a second rather than one per rendered
 *     frame — asking for more than the decoder can retire is what makes the
 *     naive version drop to a slideshow.
 *   - The playhead eases toward the scroll target rather than snapping to it,
 *     so a seek that lands a beat late reads as weight, not as a dropped frame.
 *
 * The download and the loop both start only once the section is within a
 * viewport of being seen. It opts out completely — leaving the poster frame in
 * place, which is the first frame of the video — for reduced-motion readers, on
 * data saver, and below `minWidth`, where 2 MB and a decode loop buy the least.
 */
export function ScrollScrubVideo({
  src,
  poster,
  className = "",
  minWidth = 768,
}: {
  src: string;
  poster: string;
  className?: string;
  /** Viewport width, in px, below which the poster simply stands in. */
  minWidth?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (
      saveData === true ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia(`(min-width: ${minWidth}px)`).matches
    ) {
      return;
    }

    let raf = 0;
    let eased = 0; // the playhead we render, in seconds
    let shown = -1; // frame index last written to currentTime
    let settled = false; // false until the first frame seeds `eased`

    const step = () => {
      raf = requestAnimationFrame(step);

      const { duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const rect = video.getBoundingClientRect();
      const view = window.innerHeight;
      // 0 as the top edge reaches the bottom of the viewport, 1 as the bottom
      // edge clears the top: `animation-range: cover`, by hand.
      const progress = Math.min(1, Math.max(0, (view - rect.top) / (view + rect.height)));
      const target = progress * duration;

      // Seeded rather than eased on the first frame, so a reload part-way down
      // the page opens on the right frame instead of winding up to it.
      if (!settled) {
        eased = target;
        settled = true;
      } else {
        eased += (target - eased) * 0.16;
        if (Math.abs(target - eased) < 1 / (FPS * 2)) eased = target;
      }

      const index = Math.round(eased * FPS);
      if (index !== shown && video.readyState >= 1 && !video.seeking) {
        shown = index;
        // The last frame starts one frame short of the duration; seeking to the
        // duration itself lands past the final sample and paints nothing.
        video.currentTime = Math.min(index / FPS, duration - 1 / FPS);
      }
    };

    // iOS will not paint a seek on a video it has never decoded, so give it one
    // frame of playback and take it straight back.
    const prime = () => {
      void video.play().then(() => video.pause()).catch(() => {});
    };
    video.addEventListener("loadeddata", prime, { once: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.preload = "auto";
            video.src = src;
            video.load();
          }
          if (!raf) raf = requestAnimationFrame(step);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      // A viewport of lead time: enough for 2 MB to arrive before it is seen.
      { rootMargin: "100% 0px" },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("loadeddata", prime);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [src, minWidth]);

  return (
    <video
      ref={ref}
      poster={poster}
      // No `src`: it is attached on approach. Until then — and forever, without
      // scripting — the poster is what shows.
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      // Decorative. Everything the globe says, the copy beside it already says.
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
