import { TAGLINES, NEWS } from "@/lib/content";

/** The "00 — Dentsu Data Artist Mongol" eyebrow that opens every chapter. */
export function ChapterLabel({
  number,
  title,
  tone = "faint",
}: {
  number: string;
  title: string;
  tone?: "faint" | "soft";
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.22em] text-accent">{number}</span>
      <span aria-hidden="true" className="block h-px w-11 bg-white/25" />
      <span
        className={`font-mono text-[11px] font-medium tracking-[0.22em] uppercase ${
          tone === "soft" ? "text-soft" : "text-faint"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

/** Blurred colour field. Decorative only. */
export function Aura({ className = "" }: { className?: string }) {
  return (
    <div className={`aura ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

/** Fixed scroll-progress rail. Hidden below 1280px. */
export function ScrollRail() {
  return (
    <div className="rail" aria-hidden="true">
      <b />
      <u />
      <b />
    </div>
  );
}

/** Seamless marquee: the track is rendered twice and translated -50%. */
export function TaglineMarquee() {
  const items = TAGLINES.map((line) => (
    <span key={line} className="flex items-center gap-14">
      <span className="font-display text-[30px] font-light tracking-[-0.02em] whitespace-nowrap text-paper">
        {line}
      </span>
      <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
    </span>
  ));

  return (
    <section className="overflow-hidden border-y border-white/10 bg-ink-raised py-[46px]">
      <h2 className="sr-only">What we work on</h2>
      <div className="mqwrap">
        <div className="mq">
          <span>{items}</span>
          <span aria-hidden="true">{items}</span>
        </div>
      </div>
    </section>
  );
}

/** Poster rail for chapter 05. Pauses on hover and on keyboard focus. */
export function PosterRail() {
  const items = NEWS.map((item) => (
    <span key={item.image} className="pcard">
      <span className="flex items-center gap-3">
        <span className="border border-white/20 px-2.5 py-[3px] font-mono text-[9.5px] tracking-[0.14em] text-accent uppercase">
          {item.kind}
        </span>
        <span className="font-mono text-xs tracking-[0.06em] text-faint">{item.date}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        width={520}
        height={735}
        className="block aspect-[520/735] w-full object-cover"
      />
    </span>
  ));

  return (
    <div className="mqwrap pslwrap">
      <div className="psl">
        <span>{items}</span>
        <span aria-hidden="true">{items}</span>
      </div>
    </div>
  );
}
