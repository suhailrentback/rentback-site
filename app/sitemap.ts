// No "use client"
import type { MetadataRoute } from "next";

const origin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.rentback.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${origin}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/app`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/legal/privacy`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${origin}/legal/terms`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${origin}/legal/sandbox`, lastModified, changeFrequency: "weekly", priority: 0.4 },
  ];
}
