/**
 * Verified site content.
 *
 * Every value here traces to a source: the timesheet export (2026-08-25),
 * the 2018 logo guideline, the poster archive, or the live ddam.ai contact
 * block. Nothing here is invented — where a fact is missing the section is
 * omitted rather than filled.
 */

export const CORPORATE = {
  legalName: "Dentsu Data Artist Mongol LLC",
  shortName: "DDAM",
  tagline: "Data Driven Artistic Mongol",
  address: {
    line1: "Altan Joloo Tower 6F, Seoul Street",
    line2: "5th khoroolol, 3rd khoroo, Sukhbaatar District",
    line3: "Ulaanbaatar 14252, Mongolia",
  },
  phone: "+976 77 11 33 26",
  phoneHref: "tel:+97677113326",
  email: "ddam@group.data-artist.com",
  founded: "2018",
  headcount: 157,
  social: {
    facebook: "https://facebook.com/DDAMongol",
    linkedin: "https://linkedin.com/company/ddam",
  },
} as const;

/** Timesheet Member Workload export, 2026-08-25 — 161 rows less 4 system accounts. */
export const DIVISIONS = [
  { name: "Digital Marketing", count: 68 },
  { name: "Solution", count: 41 },
  { name: "Platform", count: 17 },
  { name: "Global", count: 17 },
  { name: "Operation", count: 11 },
  { name: "Headquarters", count: 3 },
] as const;

export const SERVICES = [
  {
    slug: "ai-solution-development",
    name: "AI Solution Development",
    blurb:
      "AI agents, LLM applications and workflow automation, built and operated by our AI Center and AINT groups — from first prototype through to production support.",
    icon: "chip",
  },
  {
    slug: "data-engineering-analytics",
    name: "Data Engineering & Analytics",
    blurb:
      "Pipelines, reporting infrastructure and analytics that turn campaign and business data into decisions leaders can act on — at the scale Japanese enterprise accounts demand.",
    icon: "database",
  },
  {
    slug: "poc-and-rd",
    name: "Proof of Concept & R&D",
    blurb:
      "A standing R&D group that prototypes what is next, so a technology is tested against your real constraints before anyone commits a budget to it.",
    icon: "flask",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    blurb:
      "Ad operations, reporting and AI-assisted creative production across Google, Amazon, Meta and the major social platforms — run by the largest team in the company.",
    icon: "target",
  },
] as const;

export const GROUP_CHAIN = [
  {
    name: "dentsu",
    role: "Global network",
    note: "One of the world's largest advertising and marketing networks.",
    accent: false,
  },
  {
    name: "Dentsu Digital",
    role: "Parent company",
    note: "Japan's leading digital marketing company. We build and operate alongside their teams every day, not at arm's length.",
    accent: false,
  },
  {
    // DDAM is the subject of the page, so it carries the accent — not the parent.
    name: "DDAM",
    role: "Delivery centre",
    note: "157 specialists in Ulaanbaatar covering AI, data, platform operations and digital marketing.",
    accent: true,
  },
] as const;

export const PLATFORM_PARTNERS = [
  "Amazon Ads",
  "AWS",
  "Google",
  "Meta",
  "OpenAI",
  "Shopify",
] as const;

/** Recurring taglines mined from the 2023–2026 poster archive. */
export const TAGLINES = [
  "Connected Intelligence",
  "Beyond Intelligence",
  "Unleashing AI Potential",
  "AI Business Ideathon",
  "Empower Vision",
  "Build with AI · Operate with Agents",
  "Agentic AI Revo",
  "Commerce AI",
  "Creative × AI",
  "The Future Begins With A Connection",
] as const;

export type NewsItem = {
  /** YYYY.MM.DD — the event date, and the sort key for the rail and the feed. */
  date: string;
  kind: "Event" | "IoC";
  title: string;
  /** 520x735 card crop. */
  image: string;
  /** Full uncropped poster, for the lightbox. */
  poster: string;
  posterWidth: number;
  posterHeight: number;
};

/**
 * The Ignition of Curiosity series and the company events around it.
 *
 * Every date below is the one printed on the poster artwork itself, not the
 * filename — several filenames disagree with their own poster (the Jun 2024
 * file is dated 25 Jun but the poster reads 27–28 Jun; the Aug 2024 file reads
 * 14 Aug against a 15–16 Aug poster; the Sep 2024 file reads 28 Sep against a
 * 30 Sep poster). Titles are the posters' own display titles.
 *
 * The one exception is the Japan–Mongolia Student Forum, whose poster carries
 * no date; 2025.02.22 was supplied by the client.
 *
 * Declared newest-first for readability; `NEWS` sorts on `date` so the order
 * cannot drift from the data.
 */
const NEWS_SOURCE: NewsItem[] = [
  { date: "2025.12.27", kind: "IoC",   title: "Beyond Intelligence — Connected Minds, Global Impact",
    image: "/img/news/beyond-intelligence-2025.jpg",   poster: "/img/posters/beyond-intelligence-2025.jpg",   posterWidth: 1200, posterHeight: 1699 },
  { date: "2025.09.21", kind: "Event", title: "AI Business Ideathon 2025",
    image: "/img/news/ideathon-2025.jpg",              poster: "/img/posters/ideathon-2025.jpg",              posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.07.28", kind: "IoC",   title: "Connected Intelligence — Global Collaboration Transforming Tomorrow",
    image: "/img/news/connected-intelligence-2025.jpg", poster: "/img/posters/connected-intelligence-2025.jpg", posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.05.21", kind: "IoC",   title: "Creative × AI — Inspired by people. Powered by AI.",
    image: "/img/news/creative-ai-2025.jpg",           poster: "/img/posters/creative-ai-2025.jpg",           posterWidth: 842,  posterHeight: 1190 },
  { date: "2025.02.22", kind: "Event", title: "3rd Japan–Mongolia Student Forum",
    image: "/img/news/student-forum-2025.jpg",         poster: "/img/posters/student-forum-2025.jpg",         posterWidth: 1200, posterHeight: 1698 },
  { date: "2024.09.30", kind: "IoC",   title: "Commerce AI",
    image: "/img/news/commerce-ai-2024.jpg",           poster: "/img/posters/commerce-ai-2024.jpg",           posterWidth: 841,  posterHeight: 1190 },
  { date: "2024.08.15", kind: "IoC",   title: "Play Your Life — Incubation of Concept with GDO",
    image: "/img/news/gdo-2024.jpg",                   poster: "/img/posters/gdo-2024.jpg",                   posterWidth: 1200, posterHeight: 1693 },
  { date: "2024.07.04", kind: "Event", title: "Town Hall Meeting — 8th Year Anniversary",
    image: "/img/news/town-hall-2024.jpg",             poster: "/img/posters/town-hall-2024.jpg",             posterWidth: 1200, posterHeight: 1697 },
  { date: "2024.06.27", kind: "IoC",   title: "Collaboration — Big Tech & Dentsu",
    image: "/img/news/collaboration-2024.jpg",         poster: "/img/posters/collaboration-2024.jpg",         posterWidth: 1200, posterHeight: 1697 },
];

/** Newest first. `YYYY.MM.DD` sorts correctly as a plain string. */
export const NEWS: NewsItem[] = [...NEWS_SOURCE].sort((a, b) => b.date.localeCompare(a.date));

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
] as const;
