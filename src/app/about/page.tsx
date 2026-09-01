import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ChapterLabel } from "@/components/narrative";
import { ManagementTeam } from "@/components/management-team";
import { OfficeCarousel } from "@/components/office-carousel";
import { CORPORATE, DIVISIONS, GROUP_CHAIN, PRESIDENT, VISION } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    `Dentsu Data Artist Mongol is a ${CORPORATE.headcount}-person delivery centre in Ulaanbaatar, inside the dentsu network.`,
};

const PEAK = Math.max(...DIVISIONS.map((d) => d.count));

/** Only rows we can source. Capital, CEO and registration are not yet supplied. */
const PROFILE = [
  { label: "Legal name", value: CORPORATE.legalName },
  { label: "Head office", value: `${CORPORATE.address.line1}, ${CORPORATE.address.line2}, ${CORPORATE.address.line3}` },
  { label: "Established", value: CORPORATE.founded },
  { label: "Employees", value: `${CORPORATE.headcount} (August 2026)` },
  { label: "President", value: `${PRESIDENT.name} — ${PRESIDENT.role}` },
  { label: "Parent company", value: "Dentsu Digital Inc." },
  { label: "Telephone", value: CORPORATE.phone },
  { label: "Email", value: CORPORATE.email },
];

export default function AboutPage() {
  return (
    <>
      {/* The vision opens the page rather than sitting in a section under it.
          There used to be two chapter 01s — this banner and a separate vision
          section — saying different things. The banner's headline and intro
          were also both duplicated from the home page's chapter 01, so folding
          the two together loses nothing and drops a repeat.

          `id="vision"` moves here with the content: the footer links to
          /about#vision.

          No `.rv` on the commitments. The banner is `overflow-hidden`, which
          makes it a scroll container and freezes an anonymous view timeline —
          and a reveal would be pointless on something already on screen. */}
      <PageHeader
        id="vision"
        number="01"
        eyebrow="Vision, mission and values"
        title={VISION.statement}
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {VISION.commitments.map((commitment) => (
            <li
              key={commitment.audience}
              className="flex flex-col gap-4 border border-white/10 bg-ink-card/55 px-8 pt-7 pb-8 backdrop-blur-sm"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                {commitment.audience}
              </span>
              <p className="text-[16.5px] leading-[1.68] text-pretty text-paper">
                {commitment.clause}
              </p>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section id="management" className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-12">
          <div className="flex flex-col gap-[22px]">
            <ChapterLabel number="02" title="Management team" />
            <h2 className="rv font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              Who runs it.
            </h2>
          </div>
          <ManagementTeam />
        </div>
      </section>

      {/* Her words, at the width they want to be read at. The portrait holds
          to the top of the column on wide screens so it stays with the
          attribution rather than drifting away from eight paragraphs. */}
      <section id="president" className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-12">
          <div className="flex flex-col gap-[22px]">
            <ChapterLabel number="03" title="President's message" />
            <h2 className="rv font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              A message from our President.
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
            <figure className="rv hold flex flex-col gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PRESIDENT.portrait}
                alt={`${PRESIDENT.name}, ${PRESIDENT.role} of ${CORPORATE.legalName}`}
                width={760}
                height={1133}
                className="w-full max-w-[300px] border border-white/10 object-cover"
              />
              <figcaption className="flex flex-col gap-1.5">
                <span className="font-display text-[1.35rem] leading-tight font-light text-chalk">
                  {PRESIDENT.name}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
                  {PRESIDENT.role}
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-6">
              {PRESIDENT.message.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="max-w-[660px] text-[16.5px] leading-[1.8] text-pretty text-soft"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="people" className="border-b border-white/10 px-[var(--gutter)] py-24">
        <div className="mx-auto grid max-w-[1248px] gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="04" title="Specialists" />
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

          </div>
        </div>
      </section>

      {/* The section runs full-bleed so the coverflow can; the heading uses
          .col, which resolves to the same left edge as the gutter-plus-max-width
          the sibling sections use. */}
      <section id="office" className="border-b border-white/10 py-24">
        <div className="col mb-12 flex flex-col gap-[22px]">
          <ChapterLabel number="05" title="The office" />
          <h2 className="rv font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
            One floor, in Ulaanbaatar.
          </h2>
        </div>
        <OfficeCarousel />
      </section>

      <section id="dentsu" className="border-b border-white/10 bg-ink-raised px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-10">
          <ChapterLabel number="06" title="The subsidiary advantage" />
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
          <ChapterLabel number="07" title="Corporate profile" />
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
        </div>
      </section>
    </>
  );
}
