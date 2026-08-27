import type { Metadata } from "next";
import { AwaitingContent, PageHeader } from "@/components/page-header";
import { ChapterLabel } from "@/components/narrative";
import { CORPORATE, DIVISIONS, GROUP_CHAIN } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dentsu Data Artist Mongol is a 157-person delivery centre in Ulaanbaatar, inside the dentsu network.",
};

const PEAK = Math.max(...DIVISIONS.map((d) => d.count));

/** Only rows we can source. Capital, CEO and registration are not yet supplied. */
const PROFILE = [
  { label: "Legal name", value: CORPORATE.legalName },
  { label: "Head office", value: `${CORPORATE.address.line1}, ${CORPORATE.address.line2}, ${CORPORATE.address.line3}` },
  { label: "Established", value: CORPORATE.founded },
  { label: "Employees", value: `${CORPORATE.headcount} (August 2026)` },
  { label: "Parent company", value: "Dentsu Digital Inc." },
  { label: "Telephone", value: CORPORATE.phone },
  { label: "Email", value: CORPORATE.email },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        number="01"
        eyebrow="The company"
        title="A hundred and fifty-seven people, in six divisions."
        intro="Not a sales office with delivery somewhere else. The engineers, the analysts and the operators are all in the same building in Ulaanbaatar."
      />

      <section id="vision" className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="01" title="Vision, mission and values" />
          <AwaitingContent
            items={[
              "Vision statement",
              "Mission statement",
              "Company values",
              "“The most comfortable office in Ulaanbaatar” — copy and office photography",
            ]}
          />
        </div>
      </section>

      <section id="people" className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto grid max-w-[1248px] gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="02" title="Specialists" />
            <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              Where the {CORPORATE.headcount} sit.
            </h2>
            <p className="text-[16.5px] leading-[1.74] text-pretty text-soft">
              Division counts are taken from the internal timesheet export of 25 August 2026.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            <dl className="rv flex flex-col gap-[15px] border border-white/10 bg-ink-card px-10 py-9">
              {DIVISIONS.map((d) => (
                <div key={d.name} className="flex items-center gap-4">
                  <dt className="w-[110px] shrink-0 text-[13.5px] text-soft sm:w-[158px]">
                    {d.name}
                  </dt>
                  <div className="h-4 grow bg-white/10">
                    <span
                      className="bar block h-full bg-accent"
                      style={{
                        width: `${(d.count / PEAK) * 100}%`,
                        opacity: 0.52 + 0.48 * (d.count / PEAK),
                      }}
                    />
                  </div>
                  <dd className="w-[30px] shrink-0 text-right font-mono text-[13px] text-paper">
                    {d.count}
                  </dd>
                </div>
              ))}
            </dl>

            <AwaitingContent
              items={[
                "Leadership names, titles and biographies",
                "Expandable CVs (PRD §5.3)",
                "Job titles — the timesheet export carries department labels only",
                "Headshots, plus written photo consent for every person published",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="dentsu" className="border-b border-white/10 bg-ink-raised px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="03" title="The subsidiary advantage" />
          <h2 className="rv font-display text-[length:var(--text-scene)] leading-[1.06] font-light tracking-[-0.026em] text-balance text-chalk">
            Backed by dentsu. Run from Mongolia.
          </h2>
          <dl className="border-b border-white/10">
            {GROUP_CHAIN.map((tier, i) => (
              <div
                key={tier.name}
                className={`rv flex flex-col gap-3 py-[34px] lg:flex-row lg:items-baseline lg:gap-14 ${
                  i === 0 ? "border-t border-white/20" : "border-t border-white/10"
                }`}
              >
                <dt
                  className={`w-[320px] shrink-0 font-display text-[clamp(2rem,3vw,2.625rem)] font-light tracking-[-0.02em] ${
                    tier.accent ? "text-accent" : "text-chalk"
                  }`}
                >
                  {tier.name}
                </dt>
                <span
                  className={`w-[170px] shrink-0 font-mono text-[10.5px] tracking-[0.16em] uppercase ${
                    tier.accent ? "text-accent" : "text-faint"
                  }`}
                >
                  {tier.role}
                </span>
                <dd className="grow text-base leading-[1.7] text-soft">{tier.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="profile" className="px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="04" title="Corporate profile" />
          <dl className="rv border-t border-white/20">
            {PROFILE.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-2 border-b border-white/10 py-6 sm:flex-row sm:gap-14"
              >
                <dt className="w-[220px] shrink-0 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  {row.label}
                </dt>
                <dd className="text-[15.5px] leading-[1.7] text-paper">{row.value}</dd>
              </div>
            ))}
          </dl>
          <AwaitingContent
            items={[
              "Representative director / CEO",
              "Capital",
              "Company registration number",
              "Interactive history timeline (PRD §5.3) — the 2018 founding date still needs confirming against the July 2024 “8th anniversary” poster",
            ]}
          />
        </div>
      </section>
    </>
  );
}
