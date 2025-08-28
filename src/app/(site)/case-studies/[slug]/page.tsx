import { fetchCaseStudies } from "@/lib/contentful";
import { buildStaticParams, generateSEO } from "@/lib/utils/seo";

export async function generateStaticParams() {
  return buildStaticParams(await fetchCaseStudies());
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cases = await fetchCaseStudies();
  const study = cases.find((c) => c.slug === params.slug);
  return generateSEO(study, "case-studies");
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cases = await fetchCaseStudies();
  const study = cases.find((c) => c.slug === params.slug);
  if (!study) return null;

  return (
    <article>
      <h1>{study.title}</h1>
      <p>{study.excerpt}</p>
    </article>
  );
}