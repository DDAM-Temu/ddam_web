import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowRight, SERVICE_ICONS } from "@/components/icons";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI solution development, data engineering and analytics, proof of concept and R&D, and digital marketing — delivered by one team in Ulaanbaatar.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        number="02"
        eyebrow="The work"
        title="Four capabilities, one delivery team."
        intro="We take work from first prototype to running production system — without handing it between vendors."
      />

      <section className="px-[var(--gutter)] py-24">
        <div className="mx-auto max-w-[1248px]">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`rv lift group grid gap-6 py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24 ${
                i === 0 ? "" : "border-t border-white/10"
              }`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="text-accent">{SERVICE_ICONS[service.icon]}</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="font-display text-[length:var(--text-service)] leading-[1.16] font-normal tracking-[-0.02em] text-chalk">
                  {service.name}
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6">
                <p className="text-[16.5px] leading-[1.72] text-pretty text-soft">
                  {service.blurb}
                </p>
                <span className="flex items-center gap-2 text-[14.5px] font-medium text-accent">
                  Read more
                  <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
