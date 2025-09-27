"use server";

import { redirect } from "next/navigation";
import { devLogin } from "@/lib/session";

type Role = "tenant" | "landlord" | "admin";
type Lang = "en" | "ur";
type KycLevel = 0 | 1 | 2;

function parseKycLevel(input: unknown): KycLevel {
  // Accept "0" | "1" | "2" or numbers; clamp to 0..2 and narrow to union
  const n = typeof input === "string" ? Number(input) : typeof input === "number" ? input : 0;
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return 2;
}

export async function signInAndRedirect(formData: FormData) {
  try {
    const role = (formData.get("role") as Role) || "tenant";
    const lang = (formData.get("lang") as Lang) || "en";
    const safeKyc: KycLevel = parseKycLevel(formData.get("kycLevel"));

    await devLogin({
      roles: [role],
      activeRole: role,
      kycLevel: safeKyc, // now typed as 0|1|2
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
    return redirect("/");
  }
}
