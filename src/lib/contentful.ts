import { getClient } from "./client";

// GraphQL query for HeroBlock
const GET_HERO_BLOCK = /* GraphQL */ `
  query GetHeroBlock {
    heroBlockCollection(limit: 1) {
      items {
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

// Image type
export interface HeroImage {
  url: string;
  title?: string;
  description?: string;
}

// Strongly typed HeroBlock
export interface HeroBlockData {
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: HeroImage;
}

// GraphQL response typing
interface HeroBlockResponse {
  heroBlockCollection: {
    items: HeroBlockData[];
  };
}

// Fetch HeroBlock entry from Contentful
export async function fetchHeroBlock(
  preview = false
): Promise<HeroBlockData | null> {
  try {
    const client = getClient(preview);
    const data = await client.request<HeroBlockResponse>(GET_HERO_BLOCK);

    if (!data?.heroBlockCollection?.items?.length) {
      return null;
    }

    return data.heroBlockCollection.items[0];
  } catch (error) {
    console.error("❌ Error fetching HeroBlock:", error);
    return null;
  }
}