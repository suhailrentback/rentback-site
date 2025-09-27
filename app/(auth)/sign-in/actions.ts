"use server";

import { redirect } from "next/navigation";
import { Role, Lang, User, setSession } from "@/lib/session";

export async function signInAction(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const lang = (formData.get("lang") as Lang) || "en";

  const user: User = {
    id: "demo-user",
    roles: [role],
    activeRole: role,
    kycLevel: 0, // always start at 0 (we’ll complete KYC later)
    lang,
  };

  await setSession(user);

  // land in the correct dashboard right away
  if (role === "tenant") redirect("/app/tenant");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/admin");
}
