import Image from "next/image";
import Link from "next/link";
import { SOCIAL_ICONS } from "@/components/icons";
import { CORPORATE, SERVICES, SOCIAL } from "@/lib/content";

const COLUMNS = [
  {
    heading: "Services",
    links: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    heading: "About us",
    links: [
      { label: "Vision & values", href: "/about#vision" },
      { label: "Our Dentsu relationship", href: "/about#dentsu" },
      { label: "Leadership & specialists", href: "/about#people" },
      { label: "Corporate profile", href: "/about#profile" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Life at DDAM", href: "/careers#life" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-[var(--gutter)] pt-[72px] pb-[38px]">
      <div className="mx-auto max-w-[1248px]">
        <div className="grid gap-12 border-b border-white/10 pb-[52px] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col gap-[22px]">
            <Image
              src="/img/ddam-logo.png"
              alt="Dentsu Data Artist Mongol"
              width={520}
              height={209}
              className="h-[38px] w-auto self-start"
            />
            <address className="max-w-[300px] text-sm leading-[1.74] text-dim not-italic">
              {CORPORATE.legalName}
              <br />
              {CORPORATE.address.line1}
              <br />
              {CORPORATE.address.line2}
              <br />
              {CORPORATE.address.line3}
              <br />
              <a className="hover:text-paper" href={CORPORATE.phoneHref}>
                {CORPORATE.phone}
              </a>{" "}
              ·{" "}
              <a className="hover:text-paper" href={`mailto:${CORPORATE.email}`}>
                {CORPORATE.email}
              </a>
            </address>

            {/* Two of the four are Instagram, so the glyph alone cannot tell
                them apart — the handle carries the accessible name and the
                tooltip. The contact page lists them with the handle visible. */}
            <ul className="flex items-center gap-[18px]">
              {SOCIAL.map((account) => (
                <li key={account.href}>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${account.network} — ${account.handle}`}
                    title={`${account.network} — ${account.handle}`}
                    className="block text-dim transition-colors hover:text-paper"
                  >
                    {SOCIAL_ICONS[account.icon]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-[15px]">
              <h2 className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                {col.heading}
              </h2>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-soft transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11.5px] text-faint">
            © {new Date().getFullYear()} {CORPORATE.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[11.5px] tracking-[0.16em] text-faint uppercase">
            {CORPORATE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
