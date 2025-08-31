import type { Metadata } from "next";
import type {
  BlogPost,
  Service,
  CaseStudy,
  Job,
  Industry,
  AboutPage,
  HeroBlock,
} from "@/src/lib/contentful";

type ContentWithSEO =
  | BlogPost
  | Service
  | CaseStudy
  | Job
  | Industry
  | AboutPage
  | HeroBlock;

interface SEOOptions {
  baseUrl?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Build static params for Next.js dynamic routes
 * Example: [{ slug: "finance" }, { slug: "healthcare" }]
 */
export function buildStaticParams(items: { slug: string }[]) {
  return items.map((item) => ({ slug: item.slug }));
}

/**
 * Generate Metadata for any Contentful type with slug/title/excerpt/body.
 */
export function generateSEO(
  item: ContentWithSEO | undefined,
  contentType: string,
  options: SEOOptions = {}
): Metadata {
  const baseUrl = options.baseUrl || "https://your-domain.com";
  const defaultTitle = options.defaultTitle || "Skilled Peers";
  const defaultDescription =
    options.defaultDescription ||
    "Professional services, industries, and case studies from Skilled Peers.";

  if (!item) {
    return {
      title: `Not Found | ${defaultTitle}`,
      description: `The requested ${contentType} could not be found.`,
    };
  }

  const title = (item as any).title || defaultTitle;
  const slug = (item as any).slug;
  const excerpt =
    (item as any).excerpt ||
    (item as any).subtext ||
    (item as any).description ||
    (item as any).body?.substring(0, 150) ||
    defaultDescription;

  return {
    title: `${title} | ${defaultTitle}`,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `${baseUrl}/${contentType}/${slug}`,
      type: "article",
      images: (item as any).ogImage
        ? [{ url: (item as any).ogImage.url }]
        : [],
    },
  };
}