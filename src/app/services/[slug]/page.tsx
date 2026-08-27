import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AwaitingContent, PageHeader } from "@/components/page-header";
import { ArrowRight, SERVICE_ICONS } from "@/components/icons";
import { SERVICES } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.blurb };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = SERVICES[index];
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <>
      <PageHeader
        number={String(index + 1).padStart(2, "0")}
        eyebrow="Service"
        title={service.name}
        intro={service.blurb}
      />

      <section className="px-[var(--gutter)] py-24">
        <div className="mx-auto flex max-w-[1248px] flex-col gap-16">
          <div className="text-accent">{SERVICE_ICONS[service.icon]}</div>

          {/* PRD §5.2 requires all four of these per service. None exist yet. */}
          <AwaitingContent
            items={[
              "Strategy header — the value proposition for this service",
              "Problem and solution framing",
              "Strengths and USPs",
              "Case studies or tooling, where client work is publishable",
            ]}
          />

          <Link
            href={`/services/${next.slug}`}
            className="lift flex items-baseline justify-between border-t border-white/10 pt-8"
          >
            <span className="flex flex-col gap-2">
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                Next service
              </span>
              <span className="font-display text-[length:var(--text-service)] font-normal tracking-[-0.02em] text-chalk">
                {next.name}
              </span>
            </span>
            <ArrowRight size={20} className="text-accent" />
          </Link>
        </div>
      </section>
    </>
  );
}
