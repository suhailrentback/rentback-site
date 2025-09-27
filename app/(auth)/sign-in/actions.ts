// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session"; // same helper used before

type Role = "tenant" | "landlord" | "admin";
type Lang = "en" | "ur";

/**
 * Signs in with just role + language.
 * We start everyone at kycLevel = 0 so the app pages can prompt/guide KYC.
 * Middleware (or in-page guards) will send users to /app/onboarding until KYC ≥ 1.
 */
export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";
  const fullName = (formData.get("fullName") as string) || "Demo User";

  await devLogin({
    roles: [role],
    activeRole: role,
    kycLevel: 0, // always start at 0 (no KYC)
    lang,
    fullName,
  });

  // Let your middleware/guards handle KYC routing.
  // Send them toward their dashboard; guard will bounce to /app/onboarding if needed.
  const dest =
    role === "tenant"
      ? "/app/tenant"
      : role === "landlord"
      ? "/app/landlord"
      : "/app/admin";

  redirect(dest);
}
