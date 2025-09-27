// app/(auth)/sign-in/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Dev-only sign-in that seeds a session cookie and routes the user
 * straight to the correct dashboard based on activeRole + KYC level.
 */
export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  const kycLevel = Number(formData.get("kycLevel") || 0);

  // Give sensible role set based on chosen role
  const roles: Array<"tenant" | "landlord" | "admin"> =
    role === "admin" ? ["tenant", "landlord", "admin"] : [role];

  const user = {
    id: "demo-user",
    fullName: "Demo User",
    roles,
    activeRole: role,
    kycLevel, // 0 → onboarding, 1+ → full access
    lang,
  };

  // Store session (client-readable for demo)
  cookies().set("rb_user", JSON.stringify(user), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  // If KYC not complete, force onboarding first
  if (kycLevel < 1) {
    redirect("/app/onboarding");
  }

  // Otherwise land in the correct dashboard
  if (role === "tenant") redirect("/app/tenant");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/admin");
}
