import Image from "next/image";
import Link from "next/link";
import { Aura, ChapterLabel, ScrollRail, TaglineMarquee } from "@/components/narrative";
import { PosterRail } from "@/components/poster-rail";
import { ArrowRight, SERVICE_ICONS } from "@/components/icons";
import { CORPORATE, DIVISIONS, GROUP_CHAIN, PLATFORM_PARTNERS, SERVICES } from "@/lib/content";

/** Delivery divisions only — Headquarters (3) is not a delivery function. */
const DELIVERY = DIVISIONS.filter((d) => d.name !== "Headquarters");
const PEAK = Math.max(...DELIVERY.map((d) => d.count));

export default function Home() {
  return (
    <>
      <ScrollRail />

      {/* ============ 00 — OPENING SCENE ============ */}
      <section className="grain clip-scope relative flex h-[min(88vh,880px)] min-h-[560px] flex-col justify-center overflow-hidden px-[var(--gutter)]">
        <Aura />
        <Image
          src="/img/hero-network.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="plx object-cover object-[50%_32%] opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#07090F_6%,rgba(7,9,15,0.88)_46%,rgba(7,9,15,0.34)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,15,0.62)_0%,rgba(7,9,15,0)_30%,#07090F_100%)]"
        />

        <div className="relative">
          <div className="mb-[34px]">
            <ChapterLabel number="00" title={CORPORATE.legalName.replace(" LLC", "")} tone="soft" />
          </div>

          <h1 className="max-w-[900px] font-display text-[length:var(--text-hero)] leading-[0.98] font-light tracking-[-0.028em] text-balance text-chalk">
            <span className="kw">
              <span className="ki" style={{ animationDelay: "0.10s" }}>
                Intelligence,
              </span>
            </span>
            <span className="kw">
              <span className="ki" style={{ animationDelay: "0.24s" }}>
                engineered in
              </span>
            </span>
            <span className="kw">
              <span className="ki" style={{ animationDelay: "0.38s" }}>
                <em className="font-light text-accent italic">Ulaanbaatar</em>.
              </span>
            </span>
          </h1>

          <p className="mt-9 max-w-[560px] text-lg leading-[1.68] text-pretty text-muted">
            {CORPORATE.headcount} specialists in AI development, data engineering and digital
            marketing — building production systems for Dentsu Digital and its clients in Japan
            and across APAC.
          </p>
        </div>
      </section>

      {/* ============ 01 — THE COMPANY ============ */}
      <section className="border-t border-white/10 px-[var(--gutter)] pt-32 pb-36">
        <div className="mx-auto grid max-w-[1248px] gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="01" title="The company" />
            <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              A hundred and fifty-seven people, in six divisions.
            </h2>
            <p className="text-[16.5px] leading-[1.74] text-pretty text-soft">
              Not a sales office with delivery somewhere else. The engineers, the analysts and the
              operators are all in the same building in Ulaanbaatar.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            <div className="rv flex flex-col gap-[22px] border border-white/10 bg-ink-card px-10 pt-9 pb-10">
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                Headcount by delivery division
              </h3>
              <dl className="flex flex-col gap-[15px]">
                {DELIVERY.map((d) => (
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

            <dl className="rv grid grid-cols-3 border-t border-white/10">
              {[
                { value: CORPORATE.headcount, label: "Specialists" },
                { value: SERVICES.length, label: "Service lines" },
                { value: CORPORATE.founded, label: "Founded" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-2 pt-[30px] pb-2 ${
                    i === 0 ? "pr-7" : i === 1 ? "px-7" : "pl-7"
                  }`}
                >
                  <dd className="pop font-display text-[length:var(--text-chapter)] leading-none font-light tracking-[-0.02em] text-chalk">
                    {stat.value}
                  </dd>
                  <dt className="font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 02 — THE WORK ============ */}
      <section className="border-t border-white/10 bg-ink-raised px-[var(--gutter)] pt-32 pb-36">
        <div className="mx-auto grid max-w-[1248px] gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="02" title="The work" />
            <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              Four capabilities, one delivery team.
            </h2>
            <p className="text-[16.5px] leading-[1.74] text-pretty text-soft">
              We take work from first prototype to running production system — without handing it
              between vendors.
            </p>
          </div>

          <div className="flex flex-col">
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`rv lift flex flex-col gap-4 ${
                  i === 0 ? "pb-13" : "border-t border-white/10 py-13"
                } ${i === SERVICES.length - 1 ? "pb-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-accent">{SERVICE_ICONS[service.icon]}</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-[length:var(--text-service)] leading-[1.16] font-normal tracking-[-0.02em] text-chalk">
                  {service.name}
                </h3>
                <p className="text-base leading-[1.72] text-pretty text-soft">{service.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03 — THE GEOGRAPHY ============
           The globe is composed with its subject on the right and open space
           on the left, so it runs full-bleed and dissolves leftward into the
           ground colour under the copy. Below lg the copy cannot sit on top of
           it legibly, so the globe drops into its own band underneath. */}
      <section className="clip-scope relative overflow-hidden border-t border-white/10 bg-ink-deep">
        <div className="relative z-10 flex flex-col gap-[26px] px-[var(--gutter)] pt-32 pb-16 lg:max-w-[54%] lg:pb-32">
          <ChapterLabel number="03" title="The geography" />
          <h2 className="rv font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.026em] text-balance text-chalk">
            Ulaanbaatar to Tokyo, APAC and EMEA.
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.74] text-pretty text-soft">
            DDAM delivers from one place. An hour behind Tokyo and inside the dentsu network, a
            full AI, data and marketing team sits in the same working day as Japan — and within
            reach of APAC and EMEA.
          </p>
          <ul className="rv mt-2.5 flex flex-wrap gap-3">
            <li className="border border-accent px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-chalk uppercase">
              Ulaanbaatar · HQ
            </li>
            <li className="border border-white/20 px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-soft uppercase">
              Tokyo · Parent
            </li>
            <li className="border border-white/20 px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-soft uppercase">
              APAC &amp; EMEA
            </li>
          </ul>
        </div>

        <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
          <Image
            src="/img/geography-globe.jpg"
            alt="A globe showing network connections between Ulaanbaatar, Japan, APAC and EMEA"
            fill
            sizes="100vw"
            className="zoom object-cover object-[62%_50%] lg:object-[right_center]"
          />
          {/* the leftward fade — opaque under the copy, clear over the globe */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-[linear-gradient(90deg,#091426_0%,#091426_20%,rgba(9,20,38,0.94)_34%,rgba(9,20,38,0.58)_52%,rgba(9,20,38,0.14)_74%,rgba(9,20,38,0)_92%)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,20,38,0.62)_0%,rgba(9,20,38,0)_26%,rgba(9,20,38,0)_74%,rgba(9,20,38,0.72)_100%)]"
          />
        </div>
      </section>

      {/* ============ 04 — THE BACKING ============ */}
      <section className="border-t border-white/10 bg-ink-raised px-[var(--gutter)] pt-32 pb-36">
        <div className="mx-auto max-w-[1248px]">
          <div className="mb-11">
            <ChapterLabel number="04" title="The backing" />
          </div>

          <h2 className="rv mb-14 font-display text-[length:var(--text-scene)] leading-[1.06] font-light tracking-[-0.026em] text-balance text-chalk">
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

          <div className="mt-11 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-11">
            <h3 className="shrink-0 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
              Platform partners
            </h3>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {PLATFORM_PARTNERS.map((partner) => (
                <li key={partner} className="text-lg font-medium text-dim">
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ KINETIC DIVIDER ============ */}
      <TaglineMarquee />

      {/* ============ 05 — THE LATEST ============ */}
      <section className="border-t border-white/10 pt-32 pb-36">
        <div className="mx-auto mb-13 max-w-[1440px] px-[var(--gutter)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-[22px]">
              <ChapterLabel number="05" title="The latest" />
              <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-chalk">
                What we&rsquo;ve been building
              </h2>
            </div>
            <Link
              href="/news"
              className="flex items-center gap-2 pb-2.5 text-[14.5px] font-medium text-accent transition-colors hover:text-accent-lift"
            >
              All news
              <ArrowRight />
            </Link>
          </div>
        </div>

        <PosterRail />
      </section>

      {/* ============ CLOSING SCENE ============ */}
      <section className="grain relative overflow-hidden border-t border-white/10 px-[var(--gutter)] pt-33 pb-35">
        <Aura className="opacity-[0.38]" />
        <div className="ring" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-[26px] text-center">
          <span className="font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            End of the story — start of yours
          </span>
          <h2 className="font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.028em] text-balance text-chalk">
            Tell us what you&rsquo;re trying to build.
          </h2>
          <p className="max-w-[620px] text-[17px] leading-[1.7] text-pretty text-soft">
            Send us the problem, not a specification. We&rsquo;ll come back with how we&rsquo;d
            approach it, who would work on it, and what a first phase looks like.
          </p>
          <div className="mt-5 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="shine flex items-center justify-center gap-2.5 bg-accent px-8 py-[17px] text-[15px] font-semibold text-ink"
            >
              Contact us
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/careers"
              className="flex items-center justify-center border border-white/20 px-8 py-[17px] text-[15px] font-medium text-paper transition-colors hover:border-white/40"
            >
              See open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
