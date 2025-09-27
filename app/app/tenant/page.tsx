import React from "react";
import { getUserOrNull } from "@/lib/session";

function KycPrompt() {
  return (
    <div className="mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm">
      Complete KYC to unlock payments & rewards. Go to{" "}
      <a href="/app/onboarding" className="underline">Onboarding</a>.
    </div>
  );
}

export default async function TenantHome() {
  const user = await getUserOrNull();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Tenant • Dashboard</h1>

      {!user && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          You’re not signed in. <a className="underline" href="/sign-in">Sign in</a>.
        </div>
      )}

      {user && (
        <>
          {user.kycLevel < 1 && <KycPrompt />}
          <div className="mt-4 grid gap-3">
            <a href="/app/pay" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
              <div className="text-sm opacity-70">Rent due</div>
              <div className="text-lg font-semibold mt-1">PKR 0.00</div>
            </a>
            <a href="/app/rewards" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
              <div className="text-sm opacity-70">Rewards</div>
              <div className="text-lg font-semibold mt-1">0 points</div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
