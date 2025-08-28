// src/app/services/page.tsx
import Link from "next/link";
import { fetchServices, Service } from "@/src/lib/contentful";

export const revalidate = 60;

export default async function ServicesPage() {
  const services: Service[] = await fetchServices();

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-10">Our Services</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              {service.description && <p className="mt-2 text-gray-600">{service.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}