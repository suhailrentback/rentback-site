"use server";

import { requireUser, setSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function completeBasicKyc() {
  const user = await requireUser();
  // Mark as KYC Level 1
  await setSession({ ...user, kycLevel: 1 });
  // Send them to their role dashboard
  redirect(`/app/${user.activeRole}`);
}
