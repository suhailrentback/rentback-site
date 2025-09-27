"use client";

import React from "react";

export default function LandlordPayoutsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Payouts</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-medium">No payout account linked</div>
        <div className="text-sm opacity-75">Link a bank account to withdraw available balance.</div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
            Link Bank
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
