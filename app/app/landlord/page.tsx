// app/app/landlord/page.tsx
import React from "react";
import { getUser } from "@/lib/session";
import KycPrompt from "@/components/KycPrompt";

export const dynamic = "force-dynamic";

export default async function LandlordDashboard() {
  const user = await getUser(); // guaranteed by middleware
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Landlord Dashboard</h1>

      {user.kycLevel < 1 && <KycPrompt />}

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">Incoming payments</div>
        <div className="text-sm opacity-80">No payments yet</div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
        <div className="font-medium">Tenants overview</div>
        <div className="text-sm opacity-80">No tenants onboarded</div>
      </div>
    </div>
  );
}
