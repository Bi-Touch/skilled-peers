import Link from "next/link";
import Image from "next/image";
import { fetchIndustries } from "/src/lib/fetchIndustries";

export const revalidate = 60; // ISR: revalidate every 60s (adjust as needed)

export default async function IndustriesPage() {
  const industries = await fetchIndustries();

  if (!industries || industries.length === 0) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-center text-gray-500">No industries available.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Industries We Serve</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="block border rounded-xl shadow-sm hover:shadow-md transition p-6 bg-white"
          >
            {/* OG Image if available */}
            {industry.ogImage?.url && (
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={industry.ogImage.url}
                  alt={industry.ogImage.title || industry.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-2">{industry.title}</h2>

            {industry.description && (
              <p className="text-gray-600 line-clamp-3">{industry.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}