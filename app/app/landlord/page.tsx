// app/app/landlord/page.tsx
import React from "react";
import { getUserOrNull } from "@/lib/session";

function KycPrompt() {
  return (
    <div className="mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm">
      Complete KYC to accept tenant payments. Go to{" "}
      <a href="/app/onboarding" className="underline">Onboarding</a>.
    </div>
  );
}

export default async function LandlordHome() {
  const user = await getUserOrNull(); // never throws

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Landlord • Dashboard</h1>

      {!user && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          You’re not signed in.{" "}
          <a className="underline" href="/sign-in">Sign in</a>.
        </div>
      )}

      {user && (
        <>
          {user.kycLevel < 1 && <KycPrompt />}

          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm opacity-70">Incoming payments</div>
              <div className="text-lg font-semibold mt-1">PKR 0.00</div>
              <a
                href="/app/landlord/payments"
                className="inline-flex items-center rounded-lg px-3 py-1.5 border border-white/10 hover:bg-white/10 text-sm mt-2"
              >
                View payments
              </a>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm opacity-70">Properties</div>
              <div className="text-lg font-semibold mt-1">0 active</div>
              <a
                href="/app/landlord/properties"
                className="inline-flex items-center rounded-lg px-3 py-1.5 border border-white/10 hover:bg-white/10 text-sm mt-2"
              >
                Manage properties
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
