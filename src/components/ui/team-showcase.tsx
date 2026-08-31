"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  /** The member's name in their own script, where there is one. */
  native?: string;
}

export interface TeamShowcaseProps {
  members: TeamMember[];
  /** Staggered photo columns. Two reads better for four people than three. */
  columns?: number;
  className?: string;
}

/**
 * A team as a staggered wall of portraits beside a list of names, the two
 * cross-linked by hover: point at either and the other answers.
 *
 * The portraits sit in greyscale and come up to colour on hover. That is not
 * only a effect — these are studio shots on a light grey backdrop, and a wall
 * of them at full saturation fights a near-black page. Desaturated they read
 * as one set; the hover then does the work of picking one out.
 *
 * Everything the section has to say — every name, every role — is on the page
 * without hovering. Hover only changes emphasis, so a reader who cannot hover
 * loses nothing. There is nothing to activate, so nothing here is focusable:
 * it would be a tab stop that does nothing.
 *
 * The upstream version carried social links via react-icons. None of these
 * four have any, so that dependency is not installed; add it back only if
 * social handles ever arrive.
 */
export function TeamShowcase({ members, columns = 2, className }: TeamShowcaseProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const cols = Array.from({ length: columns }, (_, c) =>
    members.filter((_, i) => i % columns === c),
  );
  /** Each column after the first hangs a little lower than the last. */
  const drop = ["", "mt-8 sm:mt-12", "mt-4 sm:mt-6"];

  return (
    <div
      className={cn(
        "flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-16",
        className,
      )}
    >
      <div className="flex shrink-0 gap-3">
        {cols.map((col, c) => (
          <div key={c} className={cn("flex flex-col gap-3", drop[c % drop.length])}>
            {col.map((member) => (
              <Portrait
                key={member.id}
                member={member}
                hovered={hovered}
                onHover={setHovered}
              />
            ))}
          </div>
        ))}
      </div>

      <ul className="flex w-full flex-1 flex-col gap-7 pt-1">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </ul>
    </div>
  );
}

function Portrait({
  member,
  hovered,
  onHover,
}: {
  member: TeamMember;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const active = hovered === member.id;
  const dimmed = hovered !== null && !active;

  return (
    <div
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "w-[104px] shrink-0 overflow-hidden border transition-[opacity,border-color] duration-500 sm:w-[132px] lg:w-[148px]",
        active ? "border-accent" : "border-white/10",
        dimmed ? "opacity-45" : "opacity-100",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt=""
        width={760}
        height={1133}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block aspect-[3/4] w-full select-none object-cover object-top transition-[filter] duration-500"
        style={{ filter: active ? "none" : "grayscale(1) brightness(0.8)" }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hovered,
  onHover,
}: {
  member: TeamMember;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const active = hovered === member.id;
  const dimmed = hovered !== null && !active;

  return (
    <li
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      className={cn("transition-opacity duration-300", dimmed ? "opacity-45" : "opacity-100")}
    >
      <div className="flex items-baseline gap-3.5">
        <span
          aria-hidden="true"
          className={cn(
            "mt-[0.62em] block h-px shrink-0 transition-all duration-300",
            active ? "w-11 bg-accent" : "w-6 bg-white/25",
          )}
        />
        <div className="flex flex-col gap-1.5">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span
              className={cn(
                "font-display text-[length:clamp(1.5rem,2vw,1.95rem)] leading-tight font-light tracking-[-0.018em] transition-colors duration-300",
                active ? "text-chalk" : "text-paper",
              )}
            >
              {member.name}
            </span>
            {member.native ? (
              <span className="text-[15px] text-dim">{member.native}</span>
            ) : null}
          </span>
          {/* These are full job titles, not the short labels the mono style
              was built for — "Corporate Planning and Administration Division,
              Executive Officer" at 10px with wide tracking was unreadable.
              Same idiom, sized to be read: bigger, and tracked in less. */}
          <span className="font-mono text-[12.5px] leading-[1.65] tracking-[0.1em] text-soft uppercase">
            {member.role}
          </span>
        </div>
      </div>
    </li>
  );
}
