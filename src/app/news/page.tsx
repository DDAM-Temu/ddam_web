import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { NEWS } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description:
    "Ignition of Curiosity sessions, company events and announcements from Dentsu Data Artist Mongol.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        number="05"
        eyebrow="The latest"
        title="What we’ve been building"
        intro="Ignition of Curiosity sessions with clients and partners, plus the events that run inside the company."
      />

      <section className="px-[var(--gutter)] py-24">
        <ul className="mx-auto grid max-w-[1248px] gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((item) => (
            <li key={item.image} className="card rv flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <span className="border border-white/20 px-2.5 py-[3px] font-mono text-[9.5px] tracking-[0.14em] text-accent uppercase">
                  {item.kind}
                </span>
                <span className="font-mono text-xs tracking-[0.06em] text-faint">{item.date}</span>
              </div>
              <Image
                src={item.image}
                alt=""
                width={520}
                height={735}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block aspect-[520/735] w-full object-cover opacity-90"
              />
              <h2 className="font-display text-xl leading-[1.25] font-normal text-chalk">
                {item.title}
              </h2>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-16 max-w-[620px] text-center text-sm leading-[1.7] text-faint">
          Items are drawn from the 2023–2026 poster archive. Article pages and an editorial
          process for keeping this feed current are still to be decided.
        </p>
      </section>
    </>
  );
}
