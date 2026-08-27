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
    accent: true,
  },
  {
    name: "DDAM",
    role: "Delivery centre",
    note: "157 specialists in Ulaanbaatar covering AI, data, platform operations and digital marketing.",
    accent: false,
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
 * From the poster archive. Partners are named only where the archive names
 * them. Declared newest-first for readability; `NEWS` below sorts on `date`
 * so the order cannot drift from the data.
 */
const NEWS_SOURCE: NewsItem[] = [
  { date: "2025.12.29", kind: "Event", title: "New Year 2026",
    image: "/img/news-ny2026.jpg",    poster: "/img/posters/ny2026.jpg",    posterWidth: 1200, posterHeight: 1692 },
  { date: "2025.12.27", kind: "IoC",   title: "Ignition of Curiosity — Amplifi",
    image: "/img/news-amplify.jpg",   poster: "/img/posters/amplify.jpg",   posterWidth: 1200, posterHeight: 1699 },
  { date: "2025.12.22", kind: "IoC",   title: "Ignition of Curiosity",
    image: "/img/news-mse.jpg",       poster: "/img/posters/mse.jpg",       posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.12.17", kind: "IoC",   title: "Ignition of Curiosity",
    image: "/img/news-6mk.jpg",       poster: "/img/posters/6mk.jpg",       posterWidth: 1200, posterHeight: 1700 },
  { date: "2025.10.20", kind: "IoC",   title: "Ignition of Curiosity — Panasonic",
    image: "/img/news-panasonic.jpg", poster: "/img/posters/panasonic.jpg", posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.09.21", kind: "Event", title: "AI Business Ideathon 2025",
    image: "/img/news-ideathon.jpg",  poster: "/img/posters/ideathon.jpg",  posterWidth: 495,  posterHeight: 800 },
  { date: "2025.08.15", kind: "Event", title: "E-Sport Cup 2025",
    image: "/img/news-esport.jpg",    poster: "/img/posters/esport.jpg",    posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.07.28", kind: "IoC",   title: "Ignition of Curiosity — AWS",
    image: "/img/news-aws.jpg",       poster: "/img/posters/aws.jpg",       posterWidth: 1200, posterHeight: 1697 },
  { date: "2025.05.21", kind: "IoC",   title: "Ignition of Curiosity — Creative × AI",
    image: "/img/news-creative.jpg",  poster: "/img/posters/creative.jpg",  posterWidth: 842,  posterHeight: 1190 },
];

/** Newest first. `YYYY.MM.DD` sorts correctly as a plain string. */
export const NEWS: NewsItem[] = [...NEWS_SOURCE].sort((a, b) => b.date.localeCompare(a.date));

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
] as const;
