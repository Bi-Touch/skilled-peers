import { getClient } from "./client";

const GET_SERVICES = /* GraphQL */ `
  query GetServices {
    servicesCollection {
      items {
        slug
        title
        description
      }
    }
  }
`;

export interface Service {
  slug: string; // ✅ required
  title: string;
  description?: string;
}

interface ServicesResponse {
  serviceCollection: { items: Service[] };
}

export async function fetchServices(preview = false): Promise<Service[]> {
  const client = getClient(preview);
  const data = await client.request<ServicesResponse>(GET_SERVICES);
  return data.servicesCollection.items;
}