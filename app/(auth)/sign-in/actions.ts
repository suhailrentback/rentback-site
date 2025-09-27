"use server";

import { redirect } from "next/navigation";
import { devLogin, Role, Lang, KycLevel, User } from "@/lib/session";

function parseKycLevel(x: unknown): KycLevel {
  const n =
    typeof x === "string" ? Number(x) :
    typeof x === "number" ? x : 1;
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return 2;
}

export async function signInAndRedirect(formData: FormData) {
  try {
    const role = (formData.get("role") as Role) || "tenant";
    const lang = (formData.get("lang") as Lang) || "en";
    const kycLevel = parseKycLevel(formData.get("kycLevel"));

    const user: User = {
      roles: [role],
      activeRole: role,
      kycLevel,
      lang,
    };

    await devLogin(user);

    if (kycLevel < 1) return redirect("/app/onboarding");
    if (role === "landlord") return redirect("/app/landlord");
    if (role === "admin") return redirect("/app/admin");
    return redirect("/app/tenant");
  } catch (err) {
    console.error("signInAndRedirect failed:", err);
    return redirect("/sign-in?e=1");
  }
}
