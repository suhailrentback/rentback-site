// app/app/admin/rewards/page.tsx
import React from "react";

export default function AdminRewardsPage() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="text-lg font-semibold mb-2">Rewards Redemptions</div>
      <p className="text-sm opacity-80">
        Minimal stub. Later: list redemptions with status (requested/fulfilled/cancelled), brand, denomination, points.
      </p>
      <ul className="mt-3 text-sm list-disc pl-5 space-y-1 opacity-80">
        <li>Mark fulfilled / cancel with reason</li>
        <li>Export redemptions CSV</li>
        <li>Audit log</li>
      </ul>
    </div>
  );
}
