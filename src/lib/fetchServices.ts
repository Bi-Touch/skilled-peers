import { getClient } from "./client";
import { gql } from "graphql-request";

export const GET_SERVICES = gql`
  query GetServices($limit: Int = 10) {
    servicesCollection(limit: $limit) {
      total
      items {
        slug
        title
        description
        icon {
          url
          title
        }
      }
    }
  }
`;

export type ServiceListItem = {
  slug: string;
  title: string;
  description?: string;
  icon?: {
    url: string;
    title: string;
  };
};

type ServicesResponse = {
  servicesCollection: {
    total: number;
    items: ServiceListItem[];
  };
};

export async function fetchServices(limit = 10): Promise<ServiceListItem[]> {
  const client = getClient(false);
  const data = await client.request<ServicesResponse>(GET_SERVICES, { limit });
  return data.servicesCollection.items;
}