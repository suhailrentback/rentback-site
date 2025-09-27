"use client";

import React from "react";

export default function LandlordPaymentsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Payments</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-medium">No payments yet</div>
        <div className="text-sm opacity-75">You’ll see incoming rent here once tenants pay.</div>
      </div>
    </div>
  );
}
