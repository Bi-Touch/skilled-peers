// src/app/industries/page.tsx
import Link from "next/link";
import { fetchIndustries, Industry } from "@/src/lib/contentful";

export const revalidate = 60;

export default async function IndustriesPage() {
  const industries: Industry[] = await fetchIndustries();

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-10">Industries We Serve</h1>
      <ul className="grid gap-6 md:grid-cols-2">
        {industries.map((industry) => (
          <li key={industry.slug} className="p-6 border rounded-lg">
            <Link href={`/industries/${industry.slug}`}>
              <h2 className="text-2xl font-semibold">{industry.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}