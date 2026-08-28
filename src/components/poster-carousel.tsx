"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { NEWS, type NewsItem } from "@/lib/content";

/** 520 x 736 card crops — A-series posters, not squares. */
const POSTER_ASPECT = 520 / 736;

const SLIDES = NEWS.map((news) => ({
  src: news.image,
  alt: `${news.title} — event poster`,
  title: news.title,
  subtitle: `${news.kind} · ${news.date}`,
}));

/**
 * Chapter 05, as a coverflow. Cards run newest-first — that order comes from
 * `NEWS`, which sorts on `date` — so it opens on the most recent and turns back
 * through time.
 *
 * The carousel itself is the generic component in components/ui. What lives
 * here is the part that is specific to posters: clicking the centre card opens
 * the full uncropped artwork in a native `<dialog>`, so Escape, the focus trap
 * and focus restore all come from the platform rather than from us. That
 * matters more with a coverflow than it did with the old rail — the cards are
 * cropped and raked away from the reader, so the lightbox is the only place the
 * poster can actually be read.
 *
 * `item` is deliberately never cleared on close. The exit transition keeps the
 * dialog in the top layer while it fades, and unmounting the figure on the
 * `close` event would make the poster pop out a beat before the backdrop.
 */
export function PosterCarousel() {
  const [item, setItem] = useState<NewsItem | null>(null);
  const seq = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // After the new poster is in the DOM but before paint, so the dialog never
  // opens on the previously viewed image.
  useLayoutEffect(() => {
    if (seq.current > 0) dialogRef.current?.showModal();
  }, [item]);

  const open = useCallback((index: number) => {
    seq.current += 1;
    // A new object identity every time, so re-opening the same poster still
    // re-runs the layout effect.
    setItem({ ...NEWS[index] });
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  return (
    <>
      <CoverflowCarousel
        slides={SLIDES}
        cardAspect={POSTER_ASPECT}
        cardWidth="clamp(190px, 26vw, 320px)"
        onActivate={open}
        showCaption
        showNavigation
        label="Recent events and initiatives"
        cardClassName="border border-white/10"
      />
      <p className="mt-5 text-center font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
        Drag, or use the arrow keys — click the centre poster to open it
      </p>

      <dialog
        ref={dialogRef}
        className="pv"
        aria-label={item ? `${item.title} poster` : undefined}
      >
        {item ? (
          <div
            className="flex h-full w-full items-center justify-center p-4 sm:p-8"
            // The wrapper fills the dialog, so this — not the dialog — is what
            // a click beside the poster actually lands on.
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <figure className="pv-figure flex max-h-full flex-col items-center gap-4">
              <Image
                src={item.poster}
                alt={`${item.title} — event poster`}
                width={item.posterWidth}
                height={item.posterHeight}
                sizes="(max-width: 640px) 92vw, min(70vh, 640px)"
                priority
                className="max-h-[78vh] w-auto max-w-full object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]"
              />
              <figcaption className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <span className="border border-white/25 px-2.5 py-[3px] font-mono text-[9.5px] tracking-[0.14em] text-accent uppercase">
                  {item.kind}
                </span>
                <span className="font-mono text-xs tracking-[0.06em] text-faint">{item.date}</span>
                <span className="text-sm text-soft">{item.title}</span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={close}
              aria-label="Close poster"
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-white/15 text-soft transition-colors hover:border-white/40 hover:text-paper sm:top-8 sm:right-8"
            >
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
