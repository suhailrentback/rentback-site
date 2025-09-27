"use client";

import * as React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

export default function AppHomePage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Dashboard</span>
      </div>

      {/* Always-visible card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4">
        <h1 className="text-lg font-semibold mb-2">Welcome to RentBack</h1>
        <p className="text-sm opacity-80">
          Pay rent, earn rewards, and track your history.
        </p>
      </div>

      {/* Money widgets gated by KYC */}
      <KycGate>
        <div className="grid gap-3">
          <a
            href="/app/app/pay"
            className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10"
          >
            <div className="font-semibold">Pay Rent</div>
            <div className="text-sm opacity-75">Bank Transfer, Card, Wallet</div>
          </a>

          <a
            href="/app/app/rewards"
            className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10"
          >
            <div className="font-semibold">Rewards</div>
            <div className="text-sm opacity-75">
              Redeem perks on Pakistani brands
            </div>
          </a>
        </div>
      </KycGate>
    </div>
  );
}
