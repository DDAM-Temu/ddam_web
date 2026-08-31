import Link from "next/link";
import {
  Aura,
  ChapterLabel,
  ScrollRail,
  TaglineMarquee,
} from "@/components/narrative";
import { PosterCarousel } from "@/components/poster-carousel";
import { ScrollScrubVideo } from "@/components/scroll-video";
import { CountUp } from "@/components/count-up";
import { Intro } from "@/components/intro";
import { SceneReveal } from "@/components/scene-reveal";
import { BackgroundVideo } from "@/components/background-video";
import { ArrowRight, SERVICE_ICONS } from "@/components/icons";
import {
  CORPORATE,
  DIVISIONS,
  GROUP_CHAIN,
  PLATFORM_PARTNERS,
  REACH,
  SERVICES,
} from "@/lib/content";

/** Delivery divisions only — Headquarters (3) is not a delivery function. */
const DELIVERY = DIVISIONS.filter((d) => d.name !== "Headquarters");
const PEAK = Math.max(...DELIVERY.map((d) => d.count));

export default function Home() {
  return (
    <>
      <ScrollRail />

      {/* The scene the reader scrolls past to get here. Home page only — it
          exists to hand the logo to the header and the reader to chapter 00. */}
      <Intro />

      {/* ============ 00 — OPENING SCENE ============ */}
      <section className="hero grain clip-scope relative flex h-[min(88vh,880px)] min-h-[560px] flex-col justify-center overflow-hidden">
        <Aura />
        {/* The office itself, behind the line about it. `.plx` is deliberately
            absent — the footage already moves, and floating it as well gives
            the reader two competing motions to track. The two gradients below
            do the darkening; this opacity only sets how far back it sits. */}
        <BackgroundVideo
          src="/video/office-loop.mp4"
          poster="/img/office-loop.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[50%_45%] opacity-[0.34]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#07090F_6%,rgba(7,9,15,0.88)_46%,rgba(7,9,15,0.34)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,15,0.62)_0%,rgba(7,9,15,0)_30%,#07090F_100%)]"
        />

        <SceneReveal className="col relative">
          <div className="rv-clip mb-[34px]">
            <ChapterLabel
              number="00"
              title={CORPORATE.legalName.replace(" LLC", "")}
              tone="soft"
            />
          </div>

          <h1 className="max-w-[900px] font-display text-[length:var(--text-hero)] leading-[0.98] font-light tracking-[-0.028em] text-balance text-chalk">
            <span className="kw">
              <span className="ki">Intelligence,</span>
            </span>
            <span className="kw">
              <span className="ki">engineered in</span>
            </span>
            <span className="kw">
              <span className="ki">
                <em className="font-light text-accent italic">Ulaanbaatar</em>.
              </span>
            </span>
          </h1>

          <p className="rv-clip mt-9 max-w-[560px] text-lg leading-[1.68] text-pretty text-muted">
            {CORPORATE.headcount} specialists in AI development, data
            engineering and digital marketing — building production systems for
            Dentsu Digital and its clients in Japan and across APAC.
          </p>
        </SceneReveal>
      </section>

      {/* ============ 01 — THE COMPANY ============ */}
      <section className="border-t border-white/10 pt-32 pb-36">
        <div className="col grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="01" title="The company" />
            {/* Deliberately carries no headcount. The number is a fact that
                moves, it is already stated in the hero and counted out in the
                panel beside this — both from CORPORATE.headcount — and a
                spelled-out "a hundred and fifty-seven" in a headline is the one
                copy of it that no one remembers to update. */}
            <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              Every discipline, in one building.
            </h2>
            <p className="text-[16.5px] leading-[1.74] text-pretty text-soft">
              Not a sales office with delivery somewhere else. The engineers,
              the analysts and the operators are all in the same building in
              Ulaanbaatar.
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
                      <CountUp value={d.count} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Every figure in this chapter counts, these three and the division
                counts above. `founded` is a year rather than a quantity, so it
                is the one that reads oddly climbing from 1 — CountUp takes a
                `from` if it should start nearer its own decade instead. */}
            <dl className="rv grid grid-cols-3 border-t border-white/10">
              {[
                { value: CORPORATE.headcount, label: "Specialists" },
                { value: SERVICES.length, label: "Service lines" },
                { value: Number(CORPORATE.founded), label: "Founded" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-2 pt-[30px] pb-2 ${
                    i === 0 ? "pr-7" : i === 1 ? "px-7" : "pl-7"
                  }`}
                >
                  <dd className="pop font-display text-[length:var(--text-chapter)] leading-none font-light tracking-[-0.02em] text-chalk">
                    <CountUp value={stat.value} />
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
      <section className="border-t border-white/10 bg-ink-raised pt-32 pb-36">
        <div className="col grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
          <div className="hold flex flex-col gap-[22px]">
            <ChapterLabel number="02" title="The work" />
            <h2 className="font-display text-[length:var(--text-chapter)] leading-[1.06] font-light tracking-[-0.024em] text-balance text-chalk">
              Four capabilities, one delivery team.
            </h2>
            <p className="text-[16.5px] leading-[1.74] text-pretty text-soft">
              We take work from first prototype to running production system —
              without handing it between vendors.
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
                  <span className="text-accent">
                    {SERVICE_ICONS[service.icon]}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-[length:var(--text-service)] leading-[1.16] font-normal tracking-[-0.02em] text-chalk">
                  {service.name}
                </h3>
                <p className="text-base leading-[1.72] text-pretty text-soft">
                  {service.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03 — THE GEOGRAPHY ============
           The globe is composed with its subject on the right and open space
           on the left, so above lg it runs full-bleed and dissolves leftward
           into the ground colour under the copy. Below lg there is no room
           beside it, so the copy sits ON the globe instead and the fade turns
           downward — see the two scrims further down.

           The globe turns with the scroll — forward down the page, backward up
           it — which is the one effect here that needs scripting; see
           ScrollScrubVideo. Its poster is the video's own first frame, so the
           readers who never get the video (reduced motion, data saver, phones,
           no JS) get the composition unchanged rather than a substitute.

           `min-h` on lg is the globe's, not the copy's: at the height the copy
           alone gives, `object-cover` has to scale a 16:9.6 frame to a ~2:1
           section and the globe is cropped top and bottom. The extra room lets
           it sit whole, and drops the upscale enough to stop it reading soft.
           `.zoom` is deliberately absent for the same reason — it magnified an
           already-upscaled frame, and the scrub is the motion here. */}
      <section className="clip-scope relative overflow-hidden border-t border-white/10 bg-ink-deep lg:flex lg:min-h-[820px] lg:items-center">
        {/* The column, so this copy starts on the same line as every other
            chapter; the text width is constrained inside it rather than on it,
            which keeps the section itself free to run full-bleed. */}
        <div className="col relative z-10 pt-32 pb-16 lg:pb-32">
          <div className="flex flex-col gap-[22px] lg:max-w-[58%]">
            <ChapterLabel number="03" title="The geography" />
            <h2 className="rv font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.026em] text-balance text-chalk">
              Ulaanbaatar to Tokyo, APAC and EMEA.
            </h2>
            <p className="max-w-[560px] text-[17px] leading-[1.74] text-pretty text-soft">
              DDAM delivers from one place. An hour behind Tokyo and inside the
              dentsu network, a full AI, data and marketing team sits in the
              same working day as Japan — and within reach of APAC and EMEA.
            </p>
            <ul className="rv mt-2.5 flex flex-wrap gap-3">
              <li className="border border-accent px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-chalk uppercase">
                Ulaanbaatar · HQ
              </li>
              <li className="border border-white/20 px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-soft uppercase">
                Tokyo · Parent
              </li>
              <li className="border border-white/20 px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-soft uppercase">
                APAC, EMEA &amp; Americas
              </li>
            </ul>

            {/* The markets the work has reached, grouped by region so this and
                the chips above read as the same claim at two levels of detail.
                It says nothing about how the connection was made — the source
                was a travel log, and that framing was explicitly not wanted.
                See REACH in content.ts. */}
            <dl className="rv mt-8 flex flex-col gap-3.5 border-t border-white/10 pt-7">
              {REACH.map((region) => (
                <div key={region.region} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <dt className="w-[76px] shrink-0 pt-[3px] font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    {region.region}
                  </dt>
                  <dd className="text-[14.5px] leading-[1.65] text-muted">
                    {region.markets.map((m) => m.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="absolute inset-0">
          <ScrollScrubVideo
            src="/video/earth-globe.mp4"
            srcSmall="/video/earth-globe-sm.mp4"
            poster="/img/earth-globe.jpg"
            className="absolute inset-0 h-full w-full object-cover object-[68%_42%] lg:object-[right_center]"
          />
          {/* Two scrims for two compositions. Above lg the copy sits BESIDE the
              globe, so the fade runs leftward — opaque under the text, clear
              over the globe. Below lg the copy sits ON it, so the fade has to
              run downward instead: heaviest at the top where the label and
              heading are, lifting toward the bottom so the globe still reads
              as a globe rather than as a texture. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,20,38,0.93)_0%,rgba(9,20,38,0.88)_45%,rgba(9,20,38,0.66)_78%,rgba(9,20,38,0.5)_100%)] lg:hidden"
          />
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
      <section className="border-t border-white/10 bg-ink-raised pt-32 pb-36">
        <div className="col">
          <div className="mb-14 flex flex-col gap-[22px]">
            <ChapterLabel number="04" title="The backing" />
            <h2 className="rv font-display text-[length:var(--text-scene)] leading-[1.06] font-light tracking-[-0.026em] text-balance text-chalk">
              Backed by dentsu. Run from Mongolia.
            </h2>
          </div>

          <dl className="border-b border-white/10">
            {GROUP_CHAIN.map((tier, i) => (
              <div
                key={tier.name}
                className={`rv flex flex-col gap-3 py-[34px] lg:flex-row lg:items-baseline lg:gap-14 ${
                  i === 0
                    ? "border-t border-white/20"
                    : "border-t border-white/10"
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
                <dd className="grow text-base leading-[1.7] text-soft">
                  {tier.note}
                </dd>
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
        <div className="col mb-13">
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

        <PosterCarousel />
      </section>

      {/* ============ CLOSING SCENE ============ */}
      <section className="grain relative overflow-hidden border-t border-white/10 pt-32 pb-36">
        <Aura className="opacity-[0.38]" />
        <div className="ring" aria-hidden="true" />
        <div className="col relative">
          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-[26px] text-center">
            <span className="font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
              End of the story — start of yours
            </span>
            <h2 className="font-display text-[length:var(--text-scene)] leading-[1.04] font-light tracking-[-0.028em] text-balance text-chalk">
              Tell us what you&rsquo;re trying to build.
            </h2>
            <p className="max-w-[620px] text-[17px] leading-[1.7] text-pretty text-soft">
              Send us the problem, not a specification. We&rsquo;ll come back
              with how we&rsquo;d approach it, who would work on it, and what a
              first phase looks like.
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
        </div>
      </section>
    </>
  );
}
