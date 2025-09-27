// app/(auth)/sign-in/actions.ts
"use server";

import { redirect } from "next/navigation";

// Minimal role-only sign-in. No session/KYC for now.
// Reads <input name="role"> from the form and redirects.
export async function signInRedirect(formData: FormData) {
  try {
    const role = String(formData.get("role") || "tenant");
    const rolePath =
      role === "admin" ? "admin" : role === "landlord" ? "landlord" : "tenant";

    // If you later want to set a dev session, do it here.
    // For now, just go to the correct dashboard:
    redirect(`/app/${rolePath}`);
  } catch (err) {
    console.error("signInRedirect failed:", err);
    // Bounce back to show the error banner
    redirect("/sign-in?e=1");
  }
}
