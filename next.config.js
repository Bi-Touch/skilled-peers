/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net", // sometimes Contentful serves from here too
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // future support for Unsplash
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // future support for Cloudinary
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;