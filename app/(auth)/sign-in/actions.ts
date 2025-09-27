"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "tenant" | "landlord" | "admin";
type KycLevel = 0 | 1 | 2;

export async function signInAction(formData: FormData) {
  const role = ((formData.get("role") as string) || "tenant") as Role;
  const fullName = ((formData.get("fullName") as string) || "Guest").slice(0, 80);

  // Canonical session shape used across the app
  const session = {
    id: "demo-" + Math.random().toString(36).slice(2),
    roles: [role] as Role[],
    activeRole: role as Role,
    kycLevel: 0 as KycLevel,           // ALWAYS start at 0 here
    lang: "en" as "en" | "ur",
    name: fullName,                    // <- use `name` (NOT fullName)
  };

  // Set cookie so server pages can read it right away
  cookies().set("rb_session", JSON.stringify(session), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    // secure: true,  // (Vercel is HTTPS — ok to add; optional)
  });

  // Role-aware landing
  if (role === "admin") redirect("/app/admin");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/tenant");
}
