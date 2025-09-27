// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { setUser, type RBRole, type Lang } from "@/lib/session";
import crypto from "node:crypto";

export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as RBRole) || "tenant";
  const fullName = (formData.get("fullName") as string) || "Guest";
  const lang = ((formData.get("lang") as Lang) || "en");
  // always start at KYC 0; we’ll prompt in tenant/landlord pages
  const user = {
    id: crypto.randomUUID(),
    roles: [role] as RBRole[],
    activeRole: role,
    kycLevel: 0 as 0,
    lang,
    fullName,
  };

  setUser(user);

  // role-aware landing
  if (role === "admin") return redirect("/app/admin");
  if (role === "landlord") return redirect("/app/landlord");
  return redirect("/app/tenant");
}
