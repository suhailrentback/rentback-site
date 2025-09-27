"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "tenant" | "landlord" | "admin";

export async function signInAction(formData: FormData) {
  const role = (formData.get("role") as Role) || "tenant";
  const fullName = (formData.get("fullName") as string) || "Guest";

  // Write a simple demo session the rest of the app can read.
  // If your app already has getUser() reading `rb_session`, this will plug right in.
  const session = {
    id: "demo-" + Math.random().toString(36).slice(2),
    roles: [role],
    activeRole: role,
    kycLevel: 0 as 0 | 1 | 2, // start without KYC
    lang: "en" as "en" | "ur",
    name: fullName,
  };

  // HTTPOnly so only server reads it; pages use getUser()
  cookies().set("rb_session", JSON.stringify(session), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  // Role-aware landing
  if (role === "admin") redirect("/app/admin");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/tenant");
}
