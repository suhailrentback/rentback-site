// app/app/tenant/page.tsx
import React from "react";
import { getUser } from "@/lib/session";
import KycPrompt from "@/components/KycPrompt";

export const dynamic = "force-dynamic";

export default async function TenantDashboard() {
  const user = await getUser(); // guaranteed by middleware
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Tenant Dashboard</h1>

      {user.kycLevel < 1 && <KycPrompt />}

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">Rent due</div>
        <div className="text-sm opacity-80">No upcoming invoices</div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">Rewards</div>
        <div className="text-sm opacity-80">0 points • redeem soon</div>
      </div>
    </div>
  );
}
