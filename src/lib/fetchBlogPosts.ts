import { getClient } from "./client";

const GET_BLOG_POSTS = `
  query GetBlogPosts {
    blogPostCollection(order: sys_publishedAt_DESC) {
      items {
        slug
        title
        excerpt
        featuredImage {
          url(transform: { format: WEBP, quality: 80 })
          title
          description
        }
        sys {
          id
          publishedAt
        }
      }
    }
  }
`;

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    title?: string;
    description?: string;
  };
  sys: {
    id: string;
    publishedAt: string;
  };
}

export async function fetchBlogPosts(preview = false): Promise<BlogPostSummary[]> {
  const client = getClient(preview);
  const data = await client.request(GET_BLOG_POSTS);

  return data?.blogPostCollection?.items ?? [];
}