import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://rentback.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const routes = [
    "",
    "/app",
    "/legal/privacy",
    "/legal/terms",
    "/legal/sandbox",
  ];

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
