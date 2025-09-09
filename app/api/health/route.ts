// app/api/health/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // avoid caching

export async function GET() {
  const now = new Date().toISOString();
  const env = process.env.NODE_ENV;
  const region = process.env.VERCEL_REGION ?? null;
  const commit =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    null;

  return NextResponse.json(
    { ok: true, time: now, env, region, commit },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
