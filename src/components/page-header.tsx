import type { ReactNode } from "react";
import { Aura, ChapterLabel } from "@/components/narrative";

/**
 * The banner every inner page opens on.
 *
 * `children` render under the intro, for a page whose opening statement needs
 * more than a paragraph — /about hangs the three vision commitments there.
 * Note the section is `overflow-hidden`, which makes it a scroll container, so
 * an anonymous `view()` inside it resolves against the section rather than the
 * document and pins at a constant progress. Nothing in here should carry `.rv`
 * — and nothing needs to, since a page header is on screen at load.
 */
export function PageHeader({
  eyebrow,
  number,
  title,
  intro,
  id,
  children,
}: {
  eyebrow: string;
  number: string;
  title: string;
  intro?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className="grain relative overflow-hidden border-b border-white/10 px-[var(--gutter)] pt-24 pb-24"
    >
      <Aura className="opacity-30" />
      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-6">
        <ChapterLabel number={number} title={eyebrow} />
        <h1 className="max-w-[900px] font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.026em] text-balance text-chalk">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-[620px] text-[17px] leading-[1.74] text-pretty text-soft">{intro}</p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </section>
  );
}
