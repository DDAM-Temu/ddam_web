"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { NEWS, type NewsItem } from "@/lib/content";

/**
 * The chapter 05 rail. Cards run newest-first (that order comes from `NEWS`,
 * which sorts on `date`) and the rail's travel is tied to scroll position, not
 * to a timer — see the `.rail-scope` block in globals.css. A single track, no
 * duplicate: it no longer loops, so there is nothing to make seamless.
 *
 * Each card opens the full uncropped poster in a native <dialog> — so Escape,
 * the focus trap and focus restore all come from the platform rather than
 * from us.
 *
 * `item` is deliberately never cleared on close. The exit transition keeps the
 * dialog in the top layer while it fades, and unmounting the figure on the
 * `close` event would make the poster pop out a beat before the backdrop.
 */
export function PosterRail() {
  const [item, setItem] = useState<NewsItem | null>(null);
  const seq = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // After the new poster is in the DOM but before paint, so the dialog never
  // opens on the previously viewed image.
  useLayoutEffect(() => {
    if (seq.current > 0) dialogRef.current?.showModal();
  }, [item]);

  const open = useCallback((next: NewsItem) => {
    seq.current += 1;
    // A new object identity every time, so re-opening the same poster still
    // re-runs the layout effect.
    setItem({ ...next });
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const cards = NEWS.map((news) => (
    <button
      key={news.image}
      type="button"
      className="pcard"
      onClick={() => open(news)}
      aria-label={`${news.title}, ${news.date} — view poster`}
    >
      <span className="flex items-center gap-3">
        <span className="border border-white/20 px-2.5 py-[3px] font-mono text-[9.5px] tracking-[0.14em] text-accent uppercase">
          {news.kind}
        </span>
        <span className="font-mono text-xs tracking-[0.06em] text-faint">{news.date}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={news.image}
        alt=""
        loading="lazy"
        decoding="async"
        width={520}
        height={735}
        className="block aspect-[520/735] w-full object-cover"
      />
    </button>
  ));

  return (
    <>
      <div className="rail-scope">
        <div className="mqwrap pslwrap">
          <div className="psl">
            <span>{cards}</span>
          </div>
        </div>
      </div>

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
