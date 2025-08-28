// src/pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

// Get secret from env
const WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET;

// Helper: resolve Contentful payload to path
function resolvePathFromPayload(body: any): string {
  const contentType = body?.sys?.contentType?.sys?.id;
  const slug = body?.fields?.slug?.["en-US"];

  switch (contentType) {
    case "blogPost":
      return `/blog/${slug}`;
    case "caseStudy":
      return `/case-studies/${slug}`;
    case "aboutPage":
      return `/about`;
    case "heroBlock":
      return `/`;
    case "job":
      return `/jobs/${slug}`;
    case "industry":
      return `/industries/${slug}`;
    case "service":
      return `/services/${slug}`;
    default:
      return `/${contentType}/${slug || ""}`; // fallback
  }
}

// Validate Vercel webhook signature
function verifySignature(req: NextApiRequest): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn("⚠️ Missing CONTENTFUL_WEBHOOK_SECRET env var. Skipping signature verification.");
    return true; // allow through in dev
  }

  const signature = req.headers["x-vercel-signature"] as string | undefined;
  if (!signature) return false;

  const rawBody = JSON.stringify(req.body);
  const expected = crypto
    .createHmac("sha1", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  return signature === expected;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // --- Debug mode: manual GET check
    if (req.method === "GET" && req.query.debug === "true") {
      return res.status(200).json({
        debug: true,
        examplePayload: {
          sys: { contentType: { sys: { id: "blogPost" } } },
          fields: { slug: { "en-US": "my-test-slug" } },
        },
        resolvedPath: "/blog/my-test-slug",
      });
    }

    // --- Only POST allowed for webhooks
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // --- Verify webhook signature
    if (!verifySignature(req)) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const body = req.body;
    const path = resolvePathFromPayload(body);

    console.log("🔄 Revalidating path:", path);

    if (!path) {
      return res.status(400).json({ revalidated: false, message: "Invalid payload", body });
    }

    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err: any) {
    console.error("❌ Revalidation error:", err);
    return res.status(500).json({ revalidated: false, error: err.message });
  }
}