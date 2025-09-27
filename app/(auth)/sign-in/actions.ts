// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";
import { writeUser, type RBRole, type Lang } from "@/lib/session";
import crypto from "node:crypto";

export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as RBRole) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";
  const fullName = (formData.get("fullName") as string) || "Guest";

  writeUser({
    id: crypto.randomUUID(),
    roles: [role],
    activeRole: role,
    kycLevel: 0, // always start at 0; KYC prompt happens inside tenant/landlord
    lang,
    fullName,
  });

  if (role === "admin") redirect("/app/admin");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/tenant");
}
