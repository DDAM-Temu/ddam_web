import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ChapterLabel } from "@/components/narrative";
import { ArrowRight } from "@/components/icons";
import { CORPORATE, DIVISION_COUNT_WORD, DIVISIONS, HIRING, ROLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineering, analytics and digital marketing roles at Dentsu Data Artist Mongol in Ulaanbaatar.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        number="06"
        eyebrow="Careers"
        title="Build production AI, from Ulaanbaatar."
        intro={`${CORPORATE.headcount} people across ${DIVISION_COUNT_WORD} divisions, delivering for Dentsu Digital and its clients in Japan and across APAC.`}
      />

      <section className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="01" title="Where you would sit" />
          <ul className="rv grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {DIVISIONS.map((d) => (
              <li key={d.name} className="flex flex-col gap-2 bg-ink-card px-8 py-9">
                <span className="pop font-display text-[2.5rem] leading-none font-light tracking-[-0.02em] text-chalk">
                  {d.count}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                  {d.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="life" className="px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="02" title="Open roles" />

          {/* One row per role. Only the rows that link out are links, so a
              pointer cursor always means there is somewhere to go. */}
          <ul className="rv flex flex-col">
            {ROLES.map((role, i) => {
              const body = (
                <>
                  <span className="font-display text-[length:var(--text-service)] leading-[1.15] font-light tracking-[-0.02em] text-chalk">
                    {role.title}
                  </span>
                  {"note" in role && role.note ? (
                    <span className="max-w-[520px] text-[15px] leading-[1.6] text-soft">
                      {role.note}
                    </span>
                  ) : null}
                </>
              );
              const frame = `flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 ${
                i === 0 ? "border-t border-white/20" : "border-t border-white/10"
              }`;

              return (
                <li key={role.title}>
                  {"href" in role && role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`lift group ${frame}`}
                    >
                      <span className="flex flex-col gap-2">{body}</span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
                        Details
                        <ArrowRight size={13} />
                      </span>
                    </a>
                  ) : (
                    <div className={frame}>
                      <span className="flex flex-col gap-2">{body}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Two things about working here that the roles above do not say. */}
          <dl className="rv grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 border border-white/10 bg-ink-card px-8 py-7">
              <dt className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                Languages
              </dt>
              <dd className="text-[15.5px] leading-[1.68] text-pretty text-soft">
                {HIRING.languages}
              </dd>
            </div>
            <div className="flex flex-col gap-3 border border-white/10 bg-ink-card px-8 py-7">
              <dt className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                Levels
              </dt>
              <dd className="text-[15.5px] leading-[1.68] text-pretty text-soft">
                {HIRING.progression}
              </dd>
            </div>
          </dl>

          <p className="max-w-[620px] text-[16px] leading-[1.72] text-soft">
            Applications, and speculative ones for roles not listed here, reach us at the
            address below.
          </p>
          <a
            href={`mailto:${CORPORATE.email}`}
            className="shine flex w-fit items-center gap-2.5 bg-accent px-8 py-[17px] text-[15px] font-semibold text-ink"
          >
            {CORPORATE.email}
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
