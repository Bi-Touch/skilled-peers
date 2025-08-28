import { getClient } from "./client";

const GET_JOBS = /* GraphQL */ `
  query GetJobs {
    jobCollection {
      items {
        slug
        title
        description
        location
      }
    }
  }
`;

export interface Job {
  slug: string; // ✅ required
  title: string;
  description?: string;
  location?: string;
}

interface JobsResponse {
  jobCollection: { items: Job[] };
}

export async function fetchJobs(preview = false): Promise<Job[]> {
  const client = getClient(preview);
  const data = await client.request<JobsResponse>(GET_JOBS);
  return data.jobCollection.items;
}