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
} as const;

/**
 * The official accounts, given by the client on 2026-08-27.
 *
 * Two corrections are baked in here, so do not "restore" either from the old
 * site. The live ddam.ai footer links `linkedin.com/company/ddam`, which is not
 * the company page; and there are two Instagram accounts, which that footer
 * does not mention at all.
 *
 * Each is identified by `handle` rather than by a role, because which of the two
 * Instagram accounts is the corporate one and which is the AI one is not
 * documented anywhere we can cite — and the handle tells a reader apart from a
 * second identical glyph without us inventing a label for it.
 */
export const SOCIAL = [
  {
    network: "Instagram",
    handle: "@dentsu.data.artist.mongol",
    href: "https://www.instagram.com/dentsu.data.artist.mongol/",
    icon: "instagram",
  },
  {
    network: "Instagram",
    handle: "@dentsu.ai.mongol",
    href: "https://www.instagram.com/dentsu.ai.mongol/",
    icon: "instagram",
  },
  {
    network: "Facebook",
    handle: "@DDAMongol",
    href: "https://www.facebook.com/DDAMongol",
    icon: "facebook",
  },
  {
    network: "LinkedIn",
    handle: "Dentsu Data Artist Mongol LLC",
    href: "https://www.linkedin.com/company/dentsu-data-artist-mongol-llc/",
    icon: "linkedin",
  },
] as const;

/** Timesheet Member Workload export, 2026-08-25 — 161 rows less 4 system accounts. */
export const DIVISIONS = [
  { name: "Digital Marketing", count: 68 },
  { name: "Solution", count: 41 },
  { name: "Platform", count: 17 },
  { name: "Global", count: 17 },
  { name: "Operation", count: 11 },
  { name: "Headquarters", count: 3 },
] as const;

/**
 * Small-number words, so prose can say "six divisions" and still be derived
 * from DIVISIONS rather than typed out. A headcount or a division count in
 * hand-written copy is a fact that goes stale silently — the number belongs in
 * one place and nowhere else.
 */
const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
] as const;

export const DIVISION_COUNT_WORD: string =
  NUMBER_WORDS[DIVISIONS.length] ?? String(DIVISIONS.length);

/**
 * The official vision, supplied by the client on 2026-08-27.
 *
 * The wording is theirs and is left alone: "Solution" is singular, and the
 * mid-sentence capitals (Society, Business, Opportunities, Members) are as
 * given — this reads as deliberate, and "Solution" is also the name of a
 * division. The one edit is the apostrophe in "clients' Business", which the
 * source was missing.
 *
 * `audience` is NOT part of the statement. It is the noun each clause is
 * already about, lifted out so the three read as three audiences — society,
 * clients, staff — rather than as three similar sentences.
 */
export const VISION = {
  statement: "Always to create high value",
  commitments: [
    { audience: "Society", clause: "by leading AI implementation in Society" },
    { audience: "Our clients", clause: "by bringing Solution to our clients' Business" },
    { audience: "Our members", clause: "by providing Opportunities to our Members" },
  ],
} as const;

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
    // BPO sits inside this service rather than beside it — confirmed with the
    // client 2026-08-31, after the President's message listed it as a separate
    // capability. There is no fifth service line to add.
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
    // "Delivery centre" stays: the President's message calls DDAM an AI
    // development hub, but as an ambition ("our ambition is to become"), and
    // the client confirmed 2026-08-31 that the label should not change yet.
    name: "DDAM",
    role: "Delivery centre",
    note: `${CORPORATE.headcount} specialists in Ulaanbaatar covering AI, data, platform operations and digital marketing.`,
    accent: true,
  },
] as const;

/**
 * Where DDAM's work has reached, supplied by the client on 2026-08-28.
 *
 * The source was a travel log — a count of business trips and the places they
 * went. It is deliberately NOT presented that way: the client asked for the
 * connection, not the itinerary, so the site shows the markets and says
 * nothing about how many times anyone flew there.
 *
 * The nature of each connection is not documented, so the copy claims nothing
 * beyond reach. Do not upgrade this to "clients" or "projects" without
 * confirmation — that is a stronger claim than the source supports.
 *
 * The source also named cities (London, New York, Bangalore, Goa, Hyderabad);
 * they are kept here in `cities` so the detail is not lost, even though the
 * section currently renders the market alone.
 */
export const REACH = [
  {
    region: "APAC",
    markets: [
      { name: "Japan" },
      { name: "Singapore" },
      { name: "Taiwan" },
      { name: "Vietnam" },
      { name: "Indonesia" },
      { name: "India", cities: "Bangalore, Goa, Hyderabad" },
    ],
  },
  {
    region: "EMEA",
    markets: [{ name: "France" }, { name: "United Kingdom", cities: "London" }],
  },
  {
    region: "Americas",
    markets: [{ name: "United States", cities: "New York" }],
  },
] as const;

/**
 * Open roles, from the client on 2026-08-31.
 *
 * One wording call to review: the source said "IT engineer (backend
 * frontend)" and flagged it as a title they were unsure about, so it is
 * rendered as Software Engineer with a front-end/back-end note. That is a
 * suggestion rather than a decision — change it here.
 *
 * `href` is an external posting. Only the Digital Marketing Officer has one;
 * the rest route to the address on the page.
 *
 * The descriptions are DRAFTS and want checking by someone who knows the
 * roles. There is no job spec behind them — each one is built from what this
 * site already says the company does, so nothing in them is invented, but
 * "grounded in our own marketing copy" is not the same as "accurate about the
 * job". PoC, the largest-division claim and the same-working-day-as-Tokyo line
 * come from the Proof of Concept & R&D service, DIVISIONS and the chapter 03
 * copy respectively.
 */
export const ROLES = [
  {
    title: "AI / ML Engineer",
    note: "AI agents, LLM applications and workflow automation — PoC through to production support.",
  },
  {
    title: "Content Creator",
    note: "Creative production for campaign work: Photoshop, AI-generated image and video, banners and posters.",
  },
  {
    title: "Scrum Master",
    note: "Project management — keeping delivery moving across teams working in the same day as Tokyo.",
  },
  {
    title: "Digital Marketing Officer",
    note: "Ad operations and reporting across Google, Amazon, Meta and the major platforms, in the largest division in the company.",
    href: "https://zangia.mn/job/_mcacrr136l",
  },
  {
    title: "Software Engineer",
    note: "Front-end and back-end, across the Solution and Platform teams.",
  },
] as const;

/**
 * How hiring and progression actually work here, from the same conversation.
 *
 * Deliberately worded as a welcome rather than a requirement: the client said
 * they welcome people who speak Japanese and English, which is not the same as
 * demanding both, and a careers page that overstates its own bar turns away
 * the people it wants.
 */
export const HIRING = {
  languages:
    "Japanese and English speakers are especially welcome — much of the work runs in the same day as Tokyo.",
  progression:
    "Two performance reviews a year, in June and December, moving you through five levels. Five is the highest.",
} as const;

/**
 * The management team, supplied 2026-08-31, in order of seniority.
 *
 * THE PRESIDENT'S NAME is 今井初実, Hatsumi Imai — confirmed 2026-08-31.
 *
 * Her surname changed; Suzuki (鈴木初実) is the former one. That is why the
 * source portrait is filenamed "Hatsumi Suzuki 2.png" and why anything handed
 * over before this date says Suzuki. Neither is a typo to propagate — the
 * current name is Imai, and it is the only one that should appear anywhere.
 *
 * `native` is the member's name in their own script where the client gave one.
 * Khandmaa Batbayar has none here — Mongolian Cyrillic exists (Б.Хандмаа, from
 * the portrait filename) but was not supplied in the list, and a name is not
 * something to lift from a filename.
 */
export const MANAGEMENT = [
  {
    name: "Hatsumi Imai",
    native: "今井初実",
    role: "President and Executive Officer, AI Executive Member",
    portrait: "/img/leadership/hatsumi-imai.webp",
  },
  {
    name: "Makito Tsukahara",
    native: "塚原牧人",
    role: "Executive Vice President",
    portrait: "/img/leadership/makito-tsukahara.webp",
  },
  {
    name: "Yoshiki Miyamoto",
    native: "宮本良樹",
    role: "Corporate Planning and Administration Division, Executive Officer",
    portrait: "/img/leadership/yoshiki-miyamoto.webp",
  },
  {
    name: "Khandmaa Batbayar",
    role: "BPO Executive Member",
    portrait: "/img/leadership/khandmaa-batbayar.webp",
  },
] as const;

/**
 * The President's message, supplied 2026-08-31. Reproduced verbatim — it is a
 * signed statement, so it is not ours to tighten, and the paragraph breaks are
 * hers.
 *
 * Spread from MANAGEMENT[0] rather than restated, so her name, role and
 * portrait cannot drift between the team section and the message beneath it.
 *
 * Three things in it sit apart from the rest of the site. All were put to the
 * client on 2026-08-31 and all were deliberately left standing — do not
 * "correct" them:
 *   - it states a vision ("an indispensable AI development hub...") alongside
 *     VISION below ("Always to create high value"). The company vision is
 *     unchanged; hers is her framing of it, and the two coexist on purpose.
 *   - its list of regions includes China and omits Japan, France and the US,
 *     where REACH above has the reverse. Left as written.
 *   - it says "Dentsu Data Artist Mongolia" where CORPORATE.legalName is
 *     "Dentsu Data Artist Mongol LLC". The legal name is the one the site
 *     uses; whether her sentence should follow it is the one point still open.
 */
export const PRESIDENT = {
  ...MANAGEMENT[0],
  message: [
    "We are living in an era where generative AI is rapidly transforming the way businesses operate, create value, and compete on a global scale. As technology continues to evolve at an unprecedented speed, companies are expected not only to adopt new tools, but also to rethink how they work, collaborate, and deliver meaningful impact.",
    "At Dentsu Data Artist Mongolia (DDAM), our ambition is to become a global AI development hub for the dentsu group. Based in Mongolia, DDAM brings together strong capabilities in digital advertising, BPO, data, engineering, and AI development. By combining operational excellence with advanced technology, we support business transformation and contribute to the growth of Dentsu Digital, dentsu Japan, and the broader dentsu group.",
    "Mongolia has the potential to serve as a strategic hub connecting global teams across regions such as the UK, Singapore, India, Taiwan, China, Indonesia, and Vietnam. By leveraging this unique position, DDAM will continue to strengthen cross-border collaboration and develop scalable AI solutions that create value beyond any single market.",
    "Our greatest strength is our people. DDAM is a team of talented and ambitious members who bring speed, creativity, and commitment to every challenge. As we continue to grow, we are also building the culture, systems, and governance needed to become a stronger and more sustainable organization. I believe that when each member feels proud to be part of DDAM, understands our shared vision, and continues to learn and grow, we can create even greater value together.",
    "As President, I place great importance on staying close to the frontline, listening to our members, and communicating openly. Understanding not only what we do, but why we do it, is essential to building trust and moving forward as one team. Differences in culture and ways of working are not obstacles; they are opportunities to broaden our perspectives and create new possibilities.",
    "Looking ahead, DDAM will continue to pursue both business growth and operational excellence. While revenue growth is an important measure of our contribution to the dentsu group, sustainable growth can only be achieved when our people, culture, and operations grow together.",
    "Our vision is clear: to make DDAM an indispensable AI development hub for the dentsu group and a source of innovation from Mongolia to the world.",
    "Together, we will continue to challenge ourselves, strengthen our capabilities, and create the future through technology, collaboration, and people.",
  ],
};

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
