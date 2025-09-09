import type { MetadataRoute } from "next";

const base = "https://rentback.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/legal/privacy",
    "/legal/terms",
    "/legal/rewards",
    "/legal/complaints",
    "/legal/sandbox",
  ];
  const now = new Date().toISOString();
  return routes.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.5,
  }));
}
