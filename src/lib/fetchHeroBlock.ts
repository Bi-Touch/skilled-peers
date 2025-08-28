import { getClient } from "./client";

const GET_HERO_BLOCK = /* GraphQL */ `
  query GetHeroBlock {
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

export interface HeroImage {
  url: string;
  title?: string;
  description?: string;
}

export interface HeroBlockData {
  slug: string; // ✅ enforced
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: HeroImage;
}

interface HeroBlockResponse {
  heroBlockCollection: { items: HeroBlockData[] };
}

export async function fetchHeroBlock(
  preview = false
): Promise<HeroBlockData | null> {
  try {
    const client = getClient(preview);
    const data = await client.request<HeroBlockResponse>(GET_HERO_BLOCK);
    return data.heroBlockCollection.items[0] || null;
  } catch (err) {
    console.error("❌ Error fetching HeroBlock:", err);
    return null;
  }
}