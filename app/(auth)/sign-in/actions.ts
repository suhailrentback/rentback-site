// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

/**
 * Minimal sign-in: pick a role + (optional) language.
 * We always start at kycLevel = 0. KYC is now prompted on the dashboard pages.
 */
export async function signInAction(formData: FormData) {
  const role = (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  const next = (formData.get("next") as string) || "";

  // Create a simple session for demo/dev
  await devLogin({
    roles: [role],
    activeRole: role,
    kycLevel: 0,       // always start with no KYC
    lang,              // remember their language choice
  });

  // Prefer explicit "next" if present, else land on role dashboard
  const landing =
    next && next.startsWith("/app")
      ? next
      : role === "tenant"
      ? "/app/tenant"
      : role === "landlord"
      ? "/app/landlord"
      : "/app/admin";

  redirect(landing);
}
