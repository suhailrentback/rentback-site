// app/app/admin/kyc/page.tsx
import React from "react";
import { adminStore } from "@/lib/adminStore";
import { approveKycAction, rejectKycAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminKycPage() {
  const pending = adminStore.kyc.filter(k => k.status === "pending");
  const processed = adminStore.kyc.filter(k => k.status !== "pending");

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-xl font-semibold mb-4">KYC Queue</h1>

      {/* Pending */}
      <div className="rounded-2xl border border-white/10 p-4 mb-6">
        <div className="font-medium mb-3">Pending ({pending.length})</div>
        <div className="space-y-3">
          {pending.length === 0 && (
            <div className="text-sm opacity-70">No pending applications.</div>
          )}
          {pending.map(app => (
            <div
              key={app.id}
              className="rounded-xl border border-white/10 p-3 flex items-center justify-between gap-3"
            >
              <div>
                <div className="font-medium">{app.fullName}</div>
                <div className="text-xs opacity-70">
                  {app.role} • submitted {new Date(app.submittedAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <form action={approveKycAction}>
                  <input type="hidden" name="id" value={app.id} />
                  <input
                    type="hidden"
                    name="notes"
                    value="Verified basic checks"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                  >
                    Approve
                  </button>
                </form>

                <form action={rejectKycAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={app.id} />
                  <input
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    className="px-2 py-1 text-sm rounded border border-white/10 bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm"
                  >
                    Reject
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processed */}
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="font-medium mb-3">Processed ({processed.length})</div>
        <div className="space-y-3">
          {processed.length === 0 && (
            <div className="text-sm opacity-70">Nothing processed yet.</div>
          )}
          {processed.map(app => (
            <div
              key={app.id}
              className="rounded-xl border border-white/10 p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{app.fullName}</div>
                <div className="text-xs opacity-70">
                  {app.role} • {app.status.toUpperCase()} • {app.notes || "—"}
                </div>
              </div>
              <div className="text-xs opacity-60">
                {new Date(app.submittedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
