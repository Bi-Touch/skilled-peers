import { getClient } from "./client";

const GET_BLOG_POST = /* GraphQL */ `
  query GetBlogPost($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        content
        date
        coverImage {
          url(transform: { format: WEBP, quality: 80 })
          title
        }
      }
    }
  }
`;

export interface BlogPostDetail {
  slug: string; // ✅ required
  title: string;
  content?: string;
  date?: string;
  coverImage?: { url: string; title?: string };
}

interface BlogPostResponse {
  blogPostCollection: { items: BlogPostDetail[] };
}

export async function fetchBlogPost(
  slug: string,
  preview = false
): Promise<BlogPostDetail | null> {
  const client = getClient(preview);
  const data = await client.request<BlogPostResponse>(GET_BLOG_POST, { slug });
  return data.blogPostCollection.items[0] || null;
}