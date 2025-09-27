"use client";

import React from "react";
import { completeBasicKyc } from "./actions";

export default function OnboardingPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Complete basic KYC</h1>
      <p className="text-sm opacity-80 mb-6">
        This is a demo KYC step. Click continue to unlock Pay & Rewards.
      </p>

      <form action={completeBasicKyc}>
        <button
          type="submit"
          className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Continue
        </button>
      </form>

      <div className="mt-4 text-xs opacity-70">
        No real verification is performed in this demo.
      </div>
    </div>
  );
}
