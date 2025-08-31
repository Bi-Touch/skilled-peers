import { fetchIndustries } from "/src/lib/fetchIndustries";
import { fetchIndustry } from "/src/lib/fetchIndustry";
import { buildStaticParams, generateSEO } from "/src/lib/seo";
import renderRichText from "/src/lib/renderRichText";

export async function generateStaticParams() {
  const industries = await fetchIndustries();
  return buildStaticParams(industries);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = await fetchIndustry(params.slug);
  if (!industry) return {};
  return generateSEO(industry, "industries");
}

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = await fetchIndustry(params.slug);
  if (!industry) return <p>Industry not found.</p>;

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{industry.title}</h1>

      {/* Optional description */}
      {industry.description && (
        <p className="text-lg text-gray-600 mb-8">{industry.description}</p>
      )}

      {/* Rich text content */}
      {industry.content?.json && (
        <div className="prose max-w-none">
          {renderRichText(industry.content.json)}
        </div>
      )}

      {/* Optional category */}
      {industry.category && (
        <p className="text-sm text-gray-500 mt-8">
          Category: {industry.category}
        </p>
      )}
    </section>
  );
}