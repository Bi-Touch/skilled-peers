import { getClient } from "./client";

const GET_BLOG_POSTS = /* GraphQL */ `
  query GetBlogPosts {
    blogPostCollection(order: date_DESC) {
      items {
        slug
        title
        excerpt
        date
        coverImage {
          url(transform: { format: WEBP, quality: 80 })
          title
        }
      }
    }
  }
`;

export interface BlogPost {
  slug: string; // ✅ required
  title: string;
  excerpt?: string;
  date?: string;
  coverImage?: { url: string; title?: string };
}

interface BlogPostsResponse {
  blogPostCollection: { items: BlogPost[] };
}

export async function fetchBlogPosts(
  preview = false
): Promise<BlogPost[]> {
  const client = getClient(preview);
  const data = await client.request<BlogPostsResponse>(GET_BLOG_POSTS);
  return data.blogPostCollection.items;
}