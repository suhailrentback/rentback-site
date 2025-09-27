"use client";

import React from "react";
import Logo from "@/components/Logo";

export default function LandlordHome() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Landlord</span>
      </div>

      <div className="grid gap-3">
        <a href="/app/landlord/properties" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Properties</div>
          <div className="text-sm opacity-75">Units, addresses, rent amounts</div>
        </a>
        <a href="/app/landlord/tenants" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Tenants</div>
          <div className="text-sm opacity-75">Contacts, rent status</div>
        </a>
        <a href="/app/landlord/payments" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Payments</div>
          <div className="text-sm opacity-75">Incoming rent & receipts</div>
        </a>
      </div>
    </div>
  );
}
