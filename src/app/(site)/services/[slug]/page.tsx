import { fetchService } from "/src/lib/fetchService";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

// Generate metadata dynamically from Contentful
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Skilled Peers",
      description: "This service does not exist.",
    };
  }

  const ogImageUrl = service.ogImage?.url || "/default-og-image.jpg"; // fallback

  return {
    title: `${service.title} | Skilled Peers`,
    description: service.description || "Learn more about this service.",
    openGraph: {
      title: service.title,
      description: service.description || "",
      url: `https://yourdomain.com/services/${service.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: service.ogImage?.title || service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description || "",
      images: [ogImageUrl],
    },
  };
}

// Page component
export default async function ServicePage({ params }: Props) {
  const service = await fetchService(params.slug);

  if (!service) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p>The service you’re looking for does not exist.</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>

      {service.description && (
        <p className="text-lg text-gray-700 mb-6">{service.description}</p>
      )}

      {service.content?.json && (
        <div className="prose max-w-none">
          {documentToReactComponents(service.content.json)}
        </div>
      )}
    </section>
  );
}