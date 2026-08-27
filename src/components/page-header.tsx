import { Aura, ChapterLabel } from "@/components/narrative";

export function PageHeader({
  eyebrow,
  number,
  title,
  intro,
}: {
  eyebrow: string;
  number: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-white/10 px-[var(--gutter)] pt-24 pb-20">
      <Aura className="opacity-30" />
      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-6">
        <ChapterLabel number={number} title={eyebrow} />
        <h1 className="max-w-[900px] font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.026em] text-balance text-chalk">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-[620px] text-[17px] leading-[1.74] text-pretty text-soft">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Honest placeholder. The PRD requires these sections but the copy does not
 * exist yet — so the page says what is outstanding rather than shipping
 * invented text.
 */
export function AwaitingContent({ items }: { items: string[] }) {
  return (
    <div className="rv border border-dashed border-white/15 bg-ink-card p-8 sm:p-10">
      <h2 className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
        Awaiting content
      </h2>
      <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-soft">
        This section is specified in the PRD but the source material has not been supplied yet.
        It is left empty on purpose — nothing here is placeholder prose.
      </p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-dim">
            <span aria-hidden="true" className="mt-[0.6em] block h-px w-4 shrink-0 bg-white/25" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
