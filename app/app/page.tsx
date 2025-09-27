// /app/app/page.tsx
import React from "react";
import Logo from "@/components/Logo";
import { getUserOrNull } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppHomePage() {
  const user = await getUserOrNull(); // may be null

  const kycDone = (user?.kycLevel ?? 0) >= 1;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Dashboard</span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4">
        <h1 className="text-lg font-semibold mb-2">Welcome to RentBack</h1>
        <p className="text-sm opacity-80">
          Pay rent, earn rewards, and track your history.
        </p>
      </div>

      {!kycDone ? (
        <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 mb-4">
          <div className="font-medium mb-1">Complete KYC to continue</div>
          <div className="text-sm opacity-80 mb-3">
            Unlock payments and rewards by completing a quick verification.
          </div>
          <a
            href="/app/onboarding"
            className="inline-flex items-center rounded-lg px-3 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          >
            Start KYC
          </a>
        </div>
      ) : (
        <div className="grid gap-3">
          <a
            href="/app/pay"
            className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10"
          >
            <div className="font-semibold">Pay Rent</div>
            <div className="text-sm opacity-75">Bank Transfer, Card, Wallet</div>
          </a>

          <a
            href="/app/rewards"
            className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10"
          >
            <div className="font-semibold">Rewards</div>
            <div className="text-sm opacity-75">Redeem perks on Pakistani brands</div>
          </a>
        </div>
      )}
    </div>
  );
}
