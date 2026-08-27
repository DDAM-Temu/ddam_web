import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

/**
 * Sticky header. The mobile disclosure is a native <details> so the whole
 * header stays a server component and the nav works with JavaScript off.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex h-[76px] items-center justify-between px-[var(--gutter)]">
        <Link href="/" className="shrink-0" aria-label={`${"Dentsu Data Artist Mongol"} — home`}>
          <Image
            src="/img/ddam-logo.png"
            alt="Dentsu Data Artist Mongol"
            width={520}
            height={209}
            priority
            className="h-[30px] w-auto"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-[34px] lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14.5px] font-medium text-soft transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="flex items-center gap-2 border-b border-accent pb-1 text-[14.5px] font-medium text-accent transition-colors hover:border-accent-lift hover:text-accent-lift"
          >
            Contact
            <ArrowRight />
          </Link>
        </nav>

        {/* mobile disclosure */}
        <details className="group relative lg:hidden [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer list-none items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-soft uppercase"
            aria-label="Toggle navigation menu"
          >
            <span className="flex h-3 w-5 flex-col justify-between">
              <span className="block h-px w-full bg-current transition-transform duration-300 group-open:translate-y-[5.5px] group-open:rotate-45" />
              <span className="block h-px w-full bg-current transition-opacity duration-200 group-open:opacity-0" />
              <span className="block h-px w-full bg-current transition-transform duration-300 group-open:-translate-y-[5.5px] group-open:-rotate-45" />
            </span>
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>

          <nav
            aria-label="Primary"
            className="absolute right-[calc(var(--gutter)*-1)] left-auto z-30 mt-[19px] flex w-screen flex-col border-y border-white/10 bg-ink/95 px-[var(--gutter)] py-6 backdrop-blur-xl"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/[0.06] py-4 font-display text-2xl font-light text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="flex items-center gap-2 py-4 font-display text-2xl font-light text-accent"
            >
              Contact
              <ArrowRight size={18} />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
