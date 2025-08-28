// src/app/case-studies/page.tsx
import Link from "next/link";
import { fetchCaseStudies, CaseStudy } from "@/src/lib/contentful";

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const caseStudies: CaseStudy[] = await fetchCaseStudies();

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-10">Case Studies</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {caseStudies.map((cs) => (
          <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
            <div className="p-6 border rounded-lg hover:shadow-lg">
              <h2 className="text-2xl font-semibold">{cs.title}</h2>
              {cs.summary && <p className="mt-2 text-gray-600">{cs.summary}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}