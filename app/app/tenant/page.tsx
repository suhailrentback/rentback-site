"use client";

import React from "react";
import Logo from "@/components/Logo";

export default function TenantHome() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Tenant</span>
      </div>

      <div className="grid gap-3">
        <a href="/app/pay" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Pay rent</div>
          <div className="text-sm opacity-75">Bank Transfer, Card, Wallet</div>
        </a>
        <a href="/app/rewards" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Rewards</div>
          <div className="text-sm opacity-75">Redeem perks on Pakistani brands</div>
        </a>
        <a href="/app/support" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
          <div className="font-semibold">Support</div>
          <div className="text-sm opacity-75">help@rentback.app</div>
        </a>
      </div>
    </div>
  );
}
