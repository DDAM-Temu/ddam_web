"use client";

import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

/**
 * The office, as a coverflow. Same component as chapter 05's posters, set
 * landscape and without captions — these are rooms, not events, and a label
 * under each one would be describing what the reader can already see.
 *
 * The shots carry `alt=""` deliberately. They are decorative: everything they
 * say, the section around them already says, and fifteen variations on "the
 * DDAM office" read to a screen reader as noise rather than information. The
 * carousel itself is labelled, so the region is still announced.
 */
const SHOTS = Array.from({ length: 15 }, (_, i) => ({
  src: `/img/office/office-${String(i + 1).padStart(2, "0")}.webp`,
  alt: "",
}));

export function OfficeCarousel() {
  return (
    <CoverflowCarousel
      slides={SHOTS}
      cardAspect={16 / 9}
      cardWidth="clamp(250px, 34vw, 460px)"
      showNavigation
      label="Inside the DDAM office in Ulaanbaatar"
      cardClassName="border border-white/10"
    />
  );
}
