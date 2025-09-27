// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { devLogin, type Role, type Lang } from "@/lib/session";

export async function signInAction(formData: FormData) {
  const role = ((formData.get("role") as Role) || "tenant") as Role;
  const lang = ((formData.get("lang") as Lang) || "en") as Lang;
  const next = (formData.get("next") as string) || "";

  await devLogin({
    roles: [role],
    activeRole: role,
    kycLevel: 0, // always start with no KYC; dashboards will prompt
    lang,
  });

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
