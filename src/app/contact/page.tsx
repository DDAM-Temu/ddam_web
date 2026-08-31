import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHeader } from "@/components/page-header";
import { CORPORATE, SOCIAL } from "@/lib/content";

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
              {/* The handle is shown, not just the network: there are two
                  Instagram accounts, and this is the page a reader comes to
                  when they want to know which one they are following. */}
              <dd className="flex flex-col gap-2.5 text-[16px] text-paper">
                {SOCIAL.map((account) => (
                  <a
                    key={account.href}
                    className="group flex flex-wrap items-baseline gap-x-3 gap-y-1"
                    href={account.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <span className="transition-colors group-hover:text-accent">
                      {account.network}
                    </span>
                    <span className="font-mono text-[12.5px] text-dim transition-colors group-hover:text-soft">
                      {account.handle}
                    </span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="rv flex flex-col gap-8">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              Start a conversation
            </h2>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
