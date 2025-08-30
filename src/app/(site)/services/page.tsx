// src/app/(site)/services/page.tsx
import { fetchServices } from "/src/lib/contentful";
import Link from "next/link";
import Image from "next/image";

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Services</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.slug}
            className="p-6 border rounded-lg shadow hover:shadow-md transition"
          >
            {/* Show icon if available */}
            {service.icon?.url && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={service.icon.url}
                  alt={service.icon.title || service.title}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            )}

            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>

            {service.description && (
              <p className="text-gray-600 mb-4">{service.description}</p>
            )}

            <Link
              href={`/services/${service.slug}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}