// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rentback.app";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/app`, lastModified },
    { url: `${base}/legal/privacy`, lastModified },
    { url: `${base}/legal/terms`, lastModified },
    { url: `${base}/legal/sandbox`, lastModified },
  ];
}
