"use client";

import React from "react";
import Logo from "@/components/Logo";

export default function LandlordOverviewPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Landlord • Overview</h1>
        <Logo />
      </div>

      <div className="grid gap-4">
        <a href="/app/landlord/properties" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Properties</div>
          <div className="text-sm opacity-75">Add, edit, and manage your properties.</div>
        </a>

        <a href="/app/landlord/tenants" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Tenants</div>
          <div className="text-sm opacity-75">View tenant list and rent status.</div>
        </a>

        <a href="/app/landlord/payments" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Payments</div>
          <div className="text-sm opacity-75">Incoming payments and receipts.</div>
        </a>

        <a href="/app/landlord/payouts" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Payouts</div>
          <div className="text-sm opacity-75">Withdraw funds to your bank account.</div>
        </a>
      </div>
    </div>
  );
}
