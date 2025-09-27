"use client";

import * as React from "react";
import Logo from "@/components/Logo";

export default function OnboardingPage() {
  const [busy, setBusy] = React.useState(false);

  async function completeKyc() {
    setBusy(true);
    try {
      // Set a 30-day cookie marking KYC complete
      const d = new Date();
      d.setDate(d.getDate() + 30);
      document.cookie = `rb-kyc=1; path=/; expires=${d.toUTCString()}`;
      // Redirect back to the app home
      window.location.href = "/app/app";
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Logo />
        <span className="text-xs opacity-70">Onboarding</span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h1 className="text-lg font-semibold mb-2">Verify your identity</h1>
        <p className="text-sm opacity-80 mb-4">
          Finish KYC to unlock payments and rewards.
        </p>

        {/* Replace this button with your real steps later */}
        <button
          onClick={completeKyc}
          disabled={busy}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
        >
          {busy ? "Saving..." : "Complete KYC (demo)"}
        </button>
      </div>
    </div>
  );
}
