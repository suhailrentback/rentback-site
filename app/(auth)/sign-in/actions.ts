// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

type Role = "tenant" | "landlord" | "admin";
type Lang = "en" | "ur";

/**
 * Server action: creates a dev session and lands user
 * on the correct dashboard based on selected role.
 */
export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";

  // Always start with KYC level 0; onboarding/guards will handle the rest.
  await devLogin({
    roles: [role],
    activeRole: role,
    kycLevel: 0, // 0 | 1 | 2 matches the User type
    lang,
  });

  const dest =
    role === "admin"
      ? "/app/admin"
      : role === "landlord"
      ? "/app/landlord"
      : "/app/tenant";

  redirect(dest);
}
