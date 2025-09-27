// app/app/admin/page.tsx
import React from "react";
import { getUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const user = await getUser(); // guaranteed by middleware
  // Optional: enforce admin role here
  // if (user.activeRole !== "admin") notFound();

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">KYC queue</div>
        <div className="text-sm opacity-80">0 pending</div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">Payments</div>
        <div className="text-sm opacity-80">0 to review</div>
      </div>
    </div>
  );
}
