// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TEMP: disable all gating to unblock navigation
export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Simple matcher (no capturing groups) so Next won't error
export const config = {
  matcher: "/:path*",
};
