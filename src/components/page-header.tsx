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
