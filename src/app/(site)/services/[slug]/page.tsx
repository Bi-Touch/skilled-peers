import { fetchServices, Service } from "@/src/lib/contentful";
import { notFound } from "next/navigation";
import { buildStaticParams } from "@/src/lib/staticParams";
import { generateSEO } from "@/src/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

// ✅ Pre-build params
export async function generateStaticParams() {
  const services = await fetchServices();
  return buildStaticParams(services);
}

// ✅ Auto SEO from helper
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const services = await fetchServices();
  const service = services.find((s) => s.slug === params.slug);
  return generateSEO(service, "services");
}

export default async function ServiceDetailPage({ params }: Props) {
  const services = await fetchServices();
  const service = services.find((s) => s.slug === params.slug);

  if (!service) return notFound();

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: service.body }}
      />
    </main>
  );
}