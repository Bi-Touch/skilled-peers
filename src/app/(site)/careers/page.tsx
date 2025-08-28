// src/app/jobs/page.tsx
import Link from "next/link";
import { fetchJobs, Job } from "@/src/lib/contentful";

export const revalidate = 60;

export default async function JobsPage() {
  const jobs: Job[] = await fetchJobs();

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-10">Join Our Team</h1>
      <ul className="space-y-6">
        {jobs.map((job) => (
          <li key={job.slug} className="p-6 border rounded-lg">
            <Link href={`/jobs/${job.slug}`}>
              <h2 className="text-2xl font-semibold">{job.title}</h2>
            </Link>
            {job.location && <p className="mt-2 text-gray-600">{job.location}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}