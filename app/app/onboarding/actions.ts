// /app/app/onboarding/actions.ts
"use server";

import { getUserOrNull, setSession } from "@/lib/session";
import { redirect } from "next/navigation";

// Marks basic KYC complete and forwards to /app
export async function completeBasicKyc() {
  const user = await getUserOrNull();
  if (!user) redirect("/sign-in?e=auth");

  await setSession({ ...user, kycLevel: 1 });
  redirect("/app");
}

// Saves chosen roles and activeRole, then sends to the right dashboard
export async function setRoles(formData: FormData) {
  const rolesStr = (formData.get("roles") as string) || "";
  const roles = rolesStr
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean) as ("tenant" | "landlord" | "admin")[];

  const activeRole =
    (formData.get("activeRole") as "tenant" | "landlord" | "admin") ||
    roles[0] ||
    "tenant";

  const user = await getUserOrNull();
  if (!user) redirect("/sign-in?e=auth");

  await setSession({ ...user, roles, activeRole });
  redirect(`/app/${activeRole}`);
}
