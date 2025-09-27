"use server";

import { redirect } from "next/navigation";
import { setSession, type Role, type Lang, type User } from "@/lib/session";

export async function signInAndRedirect(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";
  const fullName = (formData.get("fullName") as string) || "Guest";

  const user: User = {
    id: "demo-user",
    roles: [role],
    activeRole: role,
    kycLevel: 0, // start with 0; middleware will send them to onboarding
    lang,
    fullName,
  };

  await setSession(user);
  redirect(`/app/${role}`);
}
