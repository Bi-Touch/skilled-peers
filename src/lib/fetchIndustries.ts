import { getClient } from "./client";
import { gql } from "graphql-request";

export const GET_INDUSTRIES = gql`
  query GetIndustries($limit: Int = 10) {
    industryCollection(limit: $limit) {
      total
      items {
        slug
        title
        description
        category
        ogImage {
          url
          title
        }
      }
    }
  }
`;

export interface IndustryListItem {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  ogImage?: {
    url: string;
    title: string;
  };
}

interface IndustriesResponse {
  industryCollection: {
    total: number;
    items: IndustryListItem[];
  };
}

export async function fetchIndustries(limit = 10): Promise<IndustryListItem[]> {
  const client = getClient(false);
  const data = await client.request<IndustriesResponse>(GET_INDUSTRIES, { limit });
  return data.industryCollection.items;
}