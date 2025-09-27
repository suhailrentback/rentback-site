// app/app/admin/payments/page.tsx
import React from "react";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-lg font-semibold mb-2">Payments</div>
        <p className="text-sm opacity-80">
          Minimal stub. Later: filterable table (date, user, landlord, amount, method, status).
        </p>
      </div>
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <div className="text-sm opacity-70 mb-1">Exports</div>
        <button className="inline-flex items-center rounded-lg px-3 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
          Download CSV
        </button>
      </div>
    </div>
  );
}
