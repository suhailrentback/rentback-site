// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

type Role = "tenant" | "landlord" | "admin";
type Lang = "en" | "ur";

export async function signInAndRedirect(formData: FormData) {
  try {
    const role = (formData.get("role") as Role) || "tenant";
    const kycRaw = formData.get("kycLevel");
    const lang = (formData.get("lang") as Lang) || "en";

    // Defensive parsing
    const kycLevel = typeof kycRaw === "string" ? Number(kycRaw) : 0;
    const safeKyc = Number.isFinite(kycLevel) ? kycLevel : 0;

    // Minimal session bootstrap for demo
    await devLogin({
      roles: [role],
      activeRole: role,
      kycLevel: safeKyc,
      lang,
    });

    // Route by KYC + role
    if (safeKyc < 1) {
      return redirect("/app/onboarding");
    }
    switch (role) {
      case "landlord":
        return redirect("/app/landlord");
      case "admin":
        return redirect("/app/admin");
      default:
        return redirect("/app/tenant");
    }
  } catch (err) {
    console.error("signInAndRedirect error:", err);
    // Safe fallback so you never hit the opaque error page
    return redirect("/");
  }
}
