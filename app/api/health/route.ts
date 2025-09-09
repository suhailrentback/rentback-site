// Server route (App Router)
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "rentback",
    env: process.env.VERCEL_ENV ?? "dev",
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    time: new Date().toISOString(),
  });
}

// Optional – respond to HEAD quickly for uptime checks
export async function HEAD() {
  return new Response(null, { status: 200 });
}
