import { fetchJobs } from "@/lib/contentful";
import { buildStaticParams, generateSEO } from "@/lib/utils/seo";

export async function generateStaticParams() {
  return buildStaticParams(await fetchJobs());
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j.slug === params.slug);
  return generateSEO(job, "jobs");
}

export default async function JobPage({ params }: { params: { slug: string } }) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j.slug === params.slug);
  if (!job) return null;

  return (
    <article>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </article>
  );
}