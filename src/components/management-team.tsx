"use client";

import { TeamShowcase } from "@/components/ui/team-showcase";
import { MANAGEMENT } from "@/lib/content";

/**
 * Chapter 02 on /about. Four people, so the wall runs two staggered columns
 * rather than the three the component defaults to — three would leave a
 * lopsided 2/1/1.
 */
const MEMBERS = MANAGEMENT.map((person) => ({
  id: person.name,
  name: person.name,
  role: person.role,
  image: person.portrait,
  native: "native" in person ? person.native : undefined,
}));

export function ManagementTeam() {
  return <TeamShowcase members={MEMBERS} columns={2} />;
}
