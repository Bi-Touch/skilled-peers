import { getClient } from "./client";
import { gql } from "graphql-request";

export const GET_INDUSTRY_BY_SLUG = gql`
  query GetIndustryBySlug($slug: String!) {
    industryCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        description
        category
        content {
          json
        }
        ogImage {
          url
          title
        }
      }
    }
  }
`;

export interface Industry {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  content?: {
    json: any; // Rich Text JSON
  };
  ogImage?: {
    url: string;
    title: string;
  };
}

interface IndustryResponse {
  industryCollection: {
    items: Industry[];
  };
}

export async function fetchIndustry(slug: string): Promise<Industry | null> {
  const client = getClient(false);
  const data = await client.request<IndustryResponse>(
    GET_INDUSTRY_BY_SLUG,
    { slug }
  );
  return data.industryCollection.items[0] || null;
}