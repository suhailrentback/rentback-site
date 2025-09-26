// /app/app/onboarding/complete-basic-kyc/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();
  jar.set("rb_kyc", "1", { path: "/" }); // Basic KYC
  return NextResponse.json({ ok: true });
}
