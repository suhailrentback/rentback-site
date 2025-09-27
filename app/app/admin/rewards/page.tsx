// app/app/admin/rewards/page.tsx
import React from "react";

export const dynamic = "force-dynamic";

export default function AdminRewards() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Rewards</h1>
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <div className="text-sm opacity-80">
          Catalog, issuances, redemptions — coming soon.
        </div>
      </div>
    </div>
  );
}
