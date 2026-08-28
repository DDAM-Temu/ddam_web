/**
 * Class-name joiner, for components that take `className` overrides.
 *
 * shadcn's `cn` wraps clsx + tailwind-merge so a later class can override an
 * earlier conflicting one. Nothing here needs that: the call sites pass
 * additive classes, not competing ones, and two dependencies to concatenate
 * strings is not a trade worth making. If this project ever adopts shadcn
 * proper, swap the body for `twMerge(clsx(input))` and every call site keeps
 * working.
 */
export function cn(...input: (string | false | null | undefined)[]): string {
  return input.filter(Boolean).join(" ");
}
