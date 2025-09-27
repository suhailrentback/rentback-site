// app/app/admin/page.tsx
import React from "react";

export default function AdminOverviewPage() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70 mb-1">Sandbox Status</div>
        <div className="text-lg font-semibold">Demo mode</div>
        <div className="text-xs opacity-70 mt-1">No real payments processed.</div>
      </div>
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70 mb-1">KYC Pending</div>
        <div className="text-lg font-semibold">—</div>
        <div className="text-xs opacity-70 mt-1">Hook to provider later.</div>
      </div>
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70 mb-1">Payments Today</div>
        <div className="text-lg font-semibold">—</div>
        <div className="text-xs opacity-70 mt-1">Wire to sheet/backend later.</div>
      </div>
    </div>
  );
}
