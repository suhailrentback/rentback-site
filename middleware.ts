// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only run on /app/* to keep the landing/sign-in clean
export const config = {
  matcher: ["/app/:path*"],
};

export function middleware(_req: NextRequest) {
  // TEMP: Allow everything through. We’ll re-enable KYC/admin gating after sign-in is solid.
  return NextResponse.next();
}
