import { getClient } from "./client";

// GraphQL query for HeroBlock
const GET_HERO_BLOCK = `
  query {
    heroBlockCollection(limit: 1) {
      items {
        slug
        headline
        subtext
        ctaText
        ctaLink
        imageUrl {
          url(transform: { format: WEBP, quality: 80 })
          title
          description
        }
      }
    }
  }
`;

// TypeScript interface for HeroBlock
export interface HeroBlock {
  slug: string; // Always include slug for ISR
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: {
    url: string;
    title?: string;
    description?: string;
  };
}

// Fetch HeroBlock entry from Contentful
export async function fetchHeroBlock(
  preview = false
): Promise<HeroBlock | null> {
  try {
    const client = getClient(preview);
    const data = await client.request(GET_HERO_BLOCK);

    if (!data?.heroBlockCollection?.items?.length) {
      return null;
    }

    return data.heroBlockCollection.items[0] as HeroBlock;
  } catch (error) {
    console.error("❌ Error fetching HeroBlock:", error);
    return null;
  }
}