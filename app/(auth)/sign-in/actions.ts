// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

type Role = "tenant" | "landlord" | "admin";
type Lang = "en" | "ur";

// Where each role lands post-login
function homeForRole(role: Role): string {
  switch (role) {
    case "admin":
      return "/app/admin";
    case "landlord":
      return "/app/landlord";
    default:
      return "/app/tenant";
  }
}

export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";
  const kycDone = formData.get("kycDone") === "on";

  // Create the session for this user
  await devLogin({
    roles: [role],
    activeRole: role,
    kycLevel: kycDone ? 1 : 0,
    lang,
  });

  // If KYC isn’t done, send them to onboarding
  if (!kycDone) {
    redirect("/app/onboarding");
  }

  // Otherwise, go to the role’s home
  redirect(homeForRole(role));
}
