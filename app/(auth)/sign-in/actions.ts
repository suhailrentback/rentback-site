// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

export async function loginAction(formData: FormData) {
  // Collect roles from checkboxes
  const roles = formData.getAll("roles").map(String) as Array<
    "tenant" | "landlord" | "admin"
  >;
  const lang = (formData.get("lang") as "en" | "ur") || "en";

  // Ensure a mutable array
  const selected: Array<"tenant" | "landlord" | "admin"> =
    roles.length ? [...roles] : ["tenant"];

  const activeRole = (selected.includes("tenant") ? "tenant" : selected[0]) as
    | "tenant"
    | "landlord"
    | "admin";

  // Start at KYC Level 0 → onboarding will bump to 1
  await devLogin({
    roles: selected,      // <-- now mutable, type-safe
    activeRole,
    kycLevel: 0,
    lang,
  });

  redirect("/app/onboarding");
}
