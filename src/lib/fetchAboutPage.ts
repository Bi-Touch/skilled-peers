import { getClient } from "./client";

const GET_ABOUT_PAGE = /* GraphQL */ `
  query GetAboutPage {
    aboutPageCollection(limit: 1) {
      items {
        slug
        title
        content
      }
    }
  }
`;

export interface AboutPage {
  slug: string; // ✅ required
  title: string;
  content?: string;
}

interface AboutPageResponse {
  aboutPageCollection: { items: AboutPage[] };
}

export async function fetchAboutPage(
  preview = false
): Promise<AboutPage | null> {
  const client = getClient(preview);
  const data = await client.request<AboutPageResponse>(GET_ABOUT_PAGE);
  return data.aboutPageCollection.items[0] || null;
}