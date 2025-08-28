/**
 * Normalize static params for Next.js ISR
 */
export function buildStaticParams<T extends { slug: string }>(
  items: T[]
): { slug: string }[] {
  return items.map((item) => ({ slug: item.slug }));
}