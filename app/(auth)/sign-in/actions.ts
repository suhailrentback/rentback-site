"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Minimal sign-in action for the demo.
 * - Reads the chosen role from the form
 * - (Optionally) stores a display name in a non-critical cookie
 * - Redirects to the matching dashboard route
 *
 * NOTE: This does NOT do real auth. Wire to your auth later.
 */
export async function signInAction(formData: FormData) {
  const role = (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  const fullName = String(formData.get("fullName") || "");

  // Optional: store display name for UI (non-HTTPOnly so client UI can read it if needed)
  try {
    cookies().set("rb_profile", JSON.stringify({ fullName }), {
      path: "/",
      sameSite: "lax",
    });
  } catch {
    // ignore cookie errors in serverless environments
  }

  // Role-aware landing
  if (role === "admin") redirect("/app/admin");
  if (role === "landlord") redirect("/app/landlord");
  redirect("/app/tenant");
}
