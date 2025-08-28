import { fetchAboutPage } from "/scr/lib/contentful";
import { generateSEO } from "/scr/lib/utils/seo";

export async function generateMetadata() {
  const about = await fetchAboutPage();
  return generateSEO(about, "about");
}

export default async function AboutPage() {
  const about = await fetchAboutPage();
  if (!about) return null;

  return (
    <section>
      <h1>{about.title}</h1>
      <p>{about.content}</p>
    </section>
  );
}