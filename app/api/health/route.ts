import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "rentback.app",
    env: process.env.VERCEL_ENV || "local",
    ts: new Date().toISOString(),
  });
}
