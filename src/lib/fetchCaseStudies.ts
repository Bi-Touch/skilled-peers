import { getClient } from "./client";

const GET_CASE_STUDIES = /* GraphQL */ `
  query GetCaseStudies {
    caseStudyCollection {
      items {
        slug
        title
        summary
      }
    }
  }
`;

export interface CaseStudy {
  slug: string; // ✅ required
  title: string;
  summary?: string;
}

interface CaseStudiesResponse {
  caseStudyCollection: { items: CaseStudy[] };
}

export async function fetchCaseStudies(
  preview = false
): Promise<CaseStudy[]> {
  const client = getClient(preview);
  const data = await client.request<CaseStudiesResponse>(GET_CASE_STUDIES);
  return data.caseStudyCollection.items;
}