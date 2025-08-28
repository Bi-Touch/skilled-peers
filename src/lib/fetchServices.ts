import { getClient } from "./client";

const GET_SERVICES = /* GraphQL */ `
  query GetServices {
    serviceCollection {
      items {
        slug
        title
        summary
      }
    }
  }
`;

export interface Service {
  slug: string; // ✅ required
  title: string;
  summary?: string;
}

interface ServicesResponse {
  serviceCollection: { items: Service[] };
}

export async function fetchServices(preview = false): Promise<Service[]> {
  const client = getClient(preview);
  const data = await client.request<ServicesResponse>(GET_SERVICES);
  return data.serviceCollection.items;
}