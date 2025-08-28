import { fetchIndustries } from "@/lib/contentful";
import { buildStaticParams, generateSEO } from "@/lib/utils/seo";

export async function generateStaticParams() {
  return buildStaticParams(await fetchIndustries());
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industries = await fetchIndustries();
  const industry = industries.find((i) => i.slug === params.slug);
  return generateSEO(industry, "industries");
}

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const industries = await fetchIndustries();
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return null;

  return (
    <section>
      <h1>{industry.title}</h1>
      <p>{industry.description}</p>
    </section>
  );
}