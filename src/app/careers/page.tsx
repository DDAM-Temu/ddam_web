import type { Metadata } from "next";
import { AwaitingContent, PageHeader } from "@/components/page-header";
import { ChapterLabel } from "@/components/narrative";
import { ArrowRight } from "@/components/icons";
import { CORPORATE, DIVISION_COUNT_WORD, DIVISIONS } from "@/lib/content";

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
          <ChapterLabel number="02" title="Open roles and life at DDAM" />
          <AwaitingContent
            items={[
              "Current vacancies and the application route",
              "Benefits and compensation framework",
              "Culture and working-environment copy",
              "Office photography — the PRD promises “the most comfortable office in Ulaanbaatar”",
            ]}
          />
          <p className="max-w-[620px] text-[16px] leading-[1.72] text-soft">
            Until the listings are published, speculative applications reach us at the address
            below.
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
