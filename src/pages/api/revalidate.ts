import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { sys, fields } = req.body; // Contentful webhook payload

    if (!sys?.contentType?.sys?.id) {
      return res.status(400).json({ message: "Invalid payload: missing content type" });
    }

    const contentType = sys.contentType.sys.id;
    const slug = fields?.slug?.["en-US"]; // assumes your default locale is en-US

    console.log(`🔔 Revalidate request for type: ${contentType}, slug: ${slug}`);

    switch (contentType) {
      case "blogPost":
        if (slug) {
          await res.revalidate(`/blog/${slug}`);
          console.log(`✅ Revalidated /blog/${slug}`);
        }
        break;

      case "heroBlock":
        await res.revalidate(`/`);
        console.log("✅ Revalidated /");
        break;

      default:
        console.log(`⚠️ Unknown content type: ${contentType}, revalidating /`);
        await res.revalidate(`/`);
        break;
    }

    return res.json({ revalidated: true });
  } catch (err) {
    console.error("❌ Error revalidating:", err);
    return res.status(500).json({ message: "Error revalidating", error: err });
  }
}