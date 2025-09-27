// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TEMP: no auth/kyc gating to unblock navigation
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};

export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}
