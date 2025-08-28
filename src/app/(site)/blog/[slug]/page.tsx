import { fetchBlogPosts } from "@/lib/contentful";
import { buildStaticParams, generateSEO } from "@/lib/utils/seo";

export async function generateStaticParams() {
  return buildStaticParams(await fetchBlogPosts());
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  return generateSEO(post, "blog");
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return null;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      {/* Render body rich text */}
    </article>
  );
}