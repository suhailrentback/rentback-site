"use client";

import React, { useState } from "react";
import { approveKycAction, rejectKycAction } from "../actions";

// Demo list
const demoApplicants = [
  { id: "u_001", name: "Ayesha Khan", role: "tenant", submittedAt: "2025-09-26" },
  { id: "u_002", name: "Ali Raza", role: "landlord", submittedAt: "2025-09-26" },
];

export default function AdminKycPage() {
  const [openRejectFor, setOpenRejectFor] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">KYC Review</h1>

      <div className="grid gap-3">
        {demoApplicants.map((u) => (
          <div key={u.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs opacity-70">{u.role} • submitted {u.submittedAt}</div>
              </div>

              <div className="flex items-center gap-2">
                <form action={approveKycAction}>
                  <input type="hidden" name="userId" value={u.id} />
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                    Approve
                  </button>
                </form>

                <button
                  onClick={() => setOpenRejectFor(u.id)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm"
                >
                  Reject
                </button>
              </div>
            </div>

            {openRejectFor === u.id && (
              <div className="mt-3 rounded-lg border border-white/10 p-3">
                <form action={rejectKycAction} className="grid gap-2">
                  <input type="hidden" name="userId" value={u.id} />
                  <input
                    name="reason"
                    placeholder="Reason (optional)"
                    className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm">
                      Confirm reject
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenRejectFor(null)}
                      className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
