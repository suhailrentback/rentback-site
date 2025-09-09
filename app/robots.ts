import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const isProd = process.env.VERCEL_ENV === "production";
  const body = isProd
    ? [
        "User-agent: *",
        "Allow: /",
        "Sitemap: https://rentback.app/sitemap.xml",
      ].join("\n")
    : [
        "User-agent: *",
        "Disallow: /",
      ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
