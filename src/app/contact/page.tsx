import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";
import { CORPORATE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `${CORPORATE.legalName} — Altan Joloo Tower 6F, Seoul Street, Ulaanbaatar. ${CORPORATE.phone}`,
};

const DETAILS = [
  {
    label: "Head office",
    lines: [CORPORATE.address.line1, CORPORATE.address.line2, CORPORATE.address.line3],
  },
  { label: "Telephone", lines: [CORPORATE.phone], href: CORPORATE.phoneHref },
  { label: "Email", lines: [CORPORATE.email], href: `mailto:${CORPORATE.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        number="—"
        eyebrow="Contact"
        title="Tell us what you’re trying to build."
        intro="Send us the problem, not a specification. We’ll come back with how we’d approach it, who would work on it, and what a first phase looks like."
      />

      <section className="px-[var(--gutter)] py-24">
        <div className="mx-auto grid max-w-[1248px] gap-14 lg:grid-cols-2 lg:gap-24">
          <dl className="flex flex-col">
            {DETAILS.map((detail, i) => (
              <div
                key={detail.label}
                className={`rv flex flex-col gap-3 py-8 sm:flex-row sm:gap-14 ${
                  i === 0 ? "border-t border-white/20" : "border-t border-white/10"
                }`}
              >
                <dt className="w-[150px] shrink-0 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  {detail.label}
                </dt>
                <dd className="text-[16px] leading-[1.72] text-paper">
                  {detail.href ? (
                    <a className="transition-colors hover:text-accent" href={detail.href}>
                      {detail.lines[0]}
                    </a>
                  ) : (
                    detail.lines.map((line) => <span key={line} className="block">{line}</span>)
                  )}
                </dd>
              </div>
            ))}
            <div className="rv flex flex-col gap-3 border-t border-white/10 py-8 sm:flex-row sm:gap-14">
              <dt className="w-[150px] shrink-0 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                Social
              </dt>
              <dd className="flex gap-6 text-[16px] text-paper">
                <a className="transition-colors hover:text-accent" href={CORPORATE.social.linkedin} rel="noreferrer noopener" target="_blank">
                  LinkedIn
                </a>
                <a className="transition-colors hover:text-accent" href={CORPORATE.social.facebook} rel="noreferrer noopener" target="_blank">
                  Facebook
                </a>
              </dd>
            </div>
          </dl>

          <div className="rv flex flex-col gap-6 border border-white/10 bg-ink-card p-10">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              Start a conversation
            </h2>
            <p className="text-[16px] leading-[1.72] text-soft">
              An enquiry form needs a destination inbox, a spam strategy and a privacy notice —
              none of which are decided yet. Until then, email reaches the same people directly.
            </p>
            <a
              href={`mailto:${CORPORATE.email}`}
              className="shine flex w-fit items-center gap-2.5 bg-accent px-8 py-[17px] text-[15px] font-semibold text-ink"
            >
              Email {CORPORATE.shortName}
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
