"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping video used as a section background.
 *
 * Distinct from ScrollScrubVideo, which maps a playhead to scroll position.
 * This one just plays — so it wants a normal GOP and normal compression rather
 * than that component's expensive all-but-intra encode.
 *
 * It plays only while on screen. A background loop running behind a section
 * nobody is looking at is pure battery, and pausing it is two lines. It also
 * loads only on approach: the section sits below the opening scene, so there
 * is no reason for it to compete with anything above it.
 *
 * Reduced motion gets the poster and no video at all — this is decoration, and
 * a moving background is exactly what that setting is asking us not to do.
 */
export function BackgroundVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
            video.load();
          }
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      // No `src`: attached on approach. Until then the poster stands in, and
      // without scripting it stands in permanently.
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
