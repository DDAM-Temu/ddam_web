type IconProps = { className?: string; size?: number };

export function ArrowRight({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

export function ScrollHint({ className }: IconProps) {
  return (
    <svg
      width="18" height="30" viewBox="0 0 18 30" fill="none"
      stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden="true"
    >
      <rect x="0.65" y="0.65" width="16.7" height="28.7" rx="8.35" />
      <path d="M9 8v5" strokeLinecap="round" />
    </svg>
  );
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Social glyphs, in the same 24x24 stroke idiom as SERVICE_ICONS so they sit
 * with the rest of the set rather than importing a brand-mark style of their
 * own. Keyed to `SOCIAL[].icon`.
 */
export const SOCIAL_ICONS = {
  instagram: (
    <svg width="19" height="19" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg width="19" height="19" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: (
    <svg width="19" height="19" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
} as const;

export const SERVICE_ICONS = {
  chip: (
    <svg width="30" height="30" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  ),
  database: (
    <svg width="30" height="30" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  ),
  flask: (
    <svg width="30" height="30" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.6 15h8.8" />
    </svg>
  ),
  target: (
    <svg width="30" height="30" viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
} as const;

export type ServiceIcon = keyof typeof SERVICE_ICONS;
