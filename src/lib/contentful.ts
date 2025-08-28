// ========================================================
// Barrel file to re-export all Contentful fetchers and types
// ========================================================

// Hero Block
export type { HeroImage, HeroBlockData } from "./fetchHeroBlock";
export { fetchHeroBlock } from "./fetchHeroBlock";

// Blog
export type { BlogPostDetail } from "./fetchBlogPost";
export { fetchBlogPost } from "./fetchBlogPost";

export type { BlogPost } from "./fetchBlogPosts";
export { fetchBlogPosts } from "./fetchBlogPosts";

// Case Studies
export type { CaseStudy } from "./fetchCaseStudies";
export { fetchCaseStudies } from "./fetchCaseStudies";

// Industries
export type { Industry } from "./fetchIndustries";
export { fetchIndustries } from "./fetchIndustries";

// Services
export type { Service } from "./fetchServices";
export { fetchServices } from "./fetchServices";

// Jobs
export type { Job } from "./fetchJobs";
export { fetchJobs } from "./fetchJobs";

// About Page
export type { AboutPage } from "./fetchAboutPage";
export { fetchAboutPage } from "./fetchAboutPage";

// Contact Page
export type { ContactPage } from "./fetchContactPage";
export { fetchContactPage } from "./fetchContactPage";

// ========================================================
// Optional: Generic ContentfulEntry type for ISR revalidation
// ========================================================
export type ContentfulEntry =
  | { __typename: "HeroBlock"; slug: string }
  | { __typename: "BlogPost"; slug: string }
  | { __typename: "CaseStudy"; slug: string }
  | { __typename: "Industry"; slug: string }
  | { __typename: "Service"; slug: string }
  | { __typename: "Job"; slug: string }
  | { __typename: "AboutPage"; slug: string }
  | { __typename: "ContactPage"; slug: string };