// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

export async function loginAction(formData: FormData) {
  // Collect roles from checkboxes (can be multiple)
  const roles = formData.getAll("roles").map(String) as Array<
    "tenant" | "landlord" | "admin"
  >;
  const lang = (formData.get("lang") as "en" | "ur") || "en";

  // Default: if none chosen (shouldn’t happen), make them tenant
  const selected = roles.length ? roles : (["tenant"] as const);
  const activeRole = (selected.includes("tenant") ? "tenant" : selected[0]) as
    | "tenant"
    | "landlord"
    | "admin";

  // Start at KYC Level 0 → onboarding will bump to 1
  await devLogin({
    roles: selected,
    activeRole,
    kycLevel: 0,
    lang,
  });

  redirect("/app/onboarding");
}
