"use server";

import { redirect } from "next/navigation";
import { setSession, type Role, type Lang, type User } from "@/lib/session";

export async function signIn(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = ((formData.get("lang") as Lang) || "en");
  // We removed KYC choice from sign-in. Start at 0 by default.
  const fullName = (formData.get("fullName") as string) || "Guest";

  const user: User = {
    id: "demo-user",
    roles: [role],
    activeRole: role,
    kycLevel: 0, // always starts at 0
    lang,
    fullName,
  };

  await setSession(user);

  // If KYC=0, middleware will bounce them into /app/onboarding automatically.
  redirect(`/app/${role}`);
}

// Keep the old name to avoid import mismatches:
export async function signInAndRedirect(formData: FormData) {
  return signIn(formData);
}
