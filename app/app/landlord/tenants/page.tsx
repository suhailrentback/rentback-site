"use client";

import React from "react";

export default function LandlordTenantsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Tenants</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-medium">No tenants yet</div>
        <div className="text-sm opacity-75">Invite tenants once a property is set up.</div>
        <div className="mt-3">
          <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm">
            Invite Tenant
          </button>
        </div>
      </div>
    </div>
  );
}
