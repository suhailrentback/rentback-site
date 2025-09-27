"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycPrompt from "@/components/KycPrompt";

export default function TenantOverviewPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Tenant • Overview</h1>
        <Logo />
      </div>

      {/* KYC reminder */}
      <KycPrompt />

      <div className="grid gap-4 mt-4">
        <a href="/app/pay" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Rent Due</div>
          <div className="text-sm opacity-75">Pay via bank transfer, card, or wallet.</div>
        </a>

        <a href="/app/rewards" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Rewards Summary</div>
          <div className="text-sm opacity-75">Track points and redeem perks on Pakistani brands.</div>
        </a>
      </div>
    </div>
  );
}
