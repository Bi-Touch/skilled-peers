import { getClient } from "./client";

const GET_INDUSTRIES = /* GraphQL */ `
  query GetIndustries {
    industryCollection {
      items {
        slug
        name
        description
      }
    }
  }
`;

export interface Industry {
  slug: string; // ✅ required
  name: string;
  description?: string;
}

interface IndustriesResponse {
  industryCollection: { items: Industry[] };
}

export async function fetchIndustries(preview = false): Promise<Industry[]> {
  const client = getClient(preview);
  const data = await client.request<IndustriesResponse>(GET_INDUSTRIES);
  return data.industryCollection.items;
}