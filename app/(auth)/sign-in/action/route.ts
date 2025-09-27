// app/(auth)/sign-in/action/route.ts
import { NextResponse } from "next/server";
import { signInAndRedirect } from "../actions";

export async function POST(req: Request) {
  const fd = await req.formData();
  // signInAndRedirect will call redirect(), which throws a handled Redirect
  // If it returns (shouldn’t), we just say OK.
  await signInAndRedirect(fd);
  return NextResponse.json({ ok: true });
}
