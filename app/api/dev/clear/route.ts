// app/api/dev/clear/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("rb_session", "", { path: "/", httpOnly: true, maxAge: 0 });
  return res;
}
