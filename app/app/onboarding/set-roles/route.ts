// /app/app/onboarding/set-roles/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData();
  const roles = String(form.get("roles") ?? "tenant");
  const activeRole = String(form.get("activeRole") ?? "tenant");

  const jar = await cookies();
  jar.set("rb_roles", roles, { path: "/" });
  jar.set("rb_activeRole", activeRole, { path: "/" });

  return NextResponse.json({ ok: true });
}
