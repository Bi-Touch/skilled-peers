import { getClient } from "./client";

const GET_BLOG_POST = `
  query GetBlogPost($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        excerpt
        content {
          json
        }
        featuredImage {
          url(transform: { format: WEBP, quality: 80 })
          title
          description
        }
        sys {
          publishedAt
        }
      }
    }
  }
`;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: {
    json: any; // If you use rich text typings, replace with correct type
  };
  featuredImage?: {
    url: string;
    title?: string;
    description?: string;
  };
  sys: {
    publishedAt: string;
  };
}

export async function fetchBlogPost(slug: string, preview = false): Promise<BlogPost | null> {
  const client = getClient(preview);
  const data = await client.request(GET_BLOG_POST, { slug });

  if (!data?.blogPostCollection?.items?.length) {
    return null;
  }

  return data.blogPostCollection.items[0] as BlogPost;
}