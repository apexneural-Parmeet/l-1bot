/**
 * cn: Simple class name merger (optional; Tailwind can use template literals).
 * Use for conditional classes.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
