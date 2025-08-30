import { getClient } from "./client";
import { gql } from "graphql-request";

export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: String!) {
    servicesCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        description
        content {
          json
        }
        icon {
          url
          title
        }
        ogImage {
          url
          title
        }
      }
    }
  }
`;

export type Service = {
  slug: string;
  title: string;
  description?: string;
  content?: {
    json: any; // Rich Text JSON
  };
  icon?: {
    url: string;
    title: string;
  };
  ogImage?: {
    url: string;
    title: string;
  };
};

type ServiceResponse = {
  servicesCollection: {
    items: Service[];
  };
};

export async function fetchService(slug: string): Promise<Service | null> {
  const client = getClient(false);
  const data = await client.request<ServiceResponse>(
    GET_SERVICE_BY_SLUG,
    { slug }
  );
  return data.servicesCollection.items[0] || null;
}