import { GraphQLClient } from "graphql-request";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;

// Support both naming styles
const CDA_TOKEN =
  process.env.CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_DELIVERY_TOKEN;
const CPA_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;

if (!SPACE_ID) {
  throw new Error("❌ Missing CONTENTFUL_SPACE_ID in environment variables");
}
if (!CDA_TOKEN) {
  throw new Error(
    "❌ Missing Contentful Delivery Access Token (set CONTENTFUL_ACCESS_TOKEN or CONTENTFUL_DELIVERY_TOKEN)"
  );
}
if (!CPA_TOKEN) {
  console.warn(
    "⚠️ Missing CONTENTFUL_PREVIEW_TOKEN — preview mode will not work"
  );
}

export function getClient(preview = false) {
  const token = preview && CPA_TOKEN ? CPA_TOKEN : CDA_TOKEN;
  const host = preview
    ? "preview.contentful.com"
    : "graphql.contentful.com";

  return new GraphQLClient(
    `https://${host}/content/v1/spaces/${SPACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}