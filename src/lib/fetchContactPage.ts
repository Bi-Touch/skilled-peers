import { getClient } from "./client";

const GET_CONTACT_PAGE = /* GraphQL */ `
  query GetContactPage {
    contactPageCollection(limit: 1) {
      items {
        slug
        title
        description
      }
    }
  }
`;

export interface ContactPage {
  slug: string;       // keep for consistency with ISR
  title: string;
  description?: string;
}

interface ContactPageResponse {
  contactPageCollection: {
    items: ContactPage[];
  };
}

export async function fetchContactPage(
  preview = false
): Promise<ContactPage | null> {
  try {
    const client = getClient(preview);
    const data = await client.request<ContactPageResponse>(GET_CONTACT_PAGE);

    if (!data?.contactPageCollection?.items?.length) {
      return null;
    }
    return data.contactPageCollection.items[0];
  } catch (err) {
    console.error("❌ Error fetching ContactPage:", err);
    return null;
  }
}