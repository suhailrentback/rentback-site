"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

export default function LandlordHome() {
  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Landlord</span>
      </div>

      {/* Quick sections */}
      <div className="grid gap-3">
        <a
          href="/app/landlord/properties"
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          <div className="font-semibold">Properties</div>
          <div className="text-sm opacity-75">Units, addresses, rent settings</div>
        </a>

        <a
          href="/app/landlord/tenants"
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          <div className="font-semibold">Tenants</div>
          <div className="text-sm opacity-75">Invites, active leases, statuses</div>
        </a>

        <a
          href="/app/landlord/payments"
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          <div className="font-semibold">Incoming payments</div>
          <div className="text-sm opacity-75">Latest rent, settlement status</div>
        </a>

        <a
          href="/app/landlord/payouts"
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          <div className="font-semibold">Payouts</div>
          <div className="text-sm opacity-75">Withdrawals to your bank</div>
        </a>

        <a
          href="/app/support"
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          <div className="font-semibold">Support</div>
          <div className="text-sm opacity-75">help@rentback.app</div>
        </a>
      </div>

      {/* Money features behind KYC */}
      <div className="mt-4">
        <KycGate>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="font-semibold mb-1">Fast payouts (demo)</div>
            <div className="text-sm opacity-80">
              Once verified, payouts to your bank are enabled.
            </div>
          </div>
        </KycGate>
      </div>
    </div>
  );
}
