// middleware.ts — SAFE NO-OP
import { NextResponse } from "next/server";

// Only run on /app/* if you later re-enable logic.
// Right now this returns NextResponse.next() and never throws.
export const config = {
  matcher: ["/app/:path*"],
};

export default function middleware() {
  return NextResponse.next();
}
