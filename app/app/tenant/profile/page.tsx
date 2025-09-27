"use client";

import React from "react";
import Logo from "@/components/Logo";

export default function TenantProfilePage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Profile & KYC</span>
      </div>

      <div className="grid gap-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="font-semibold mb-2">Basic info</div>
          <div className="grid gap-2 text-sm">
            <div>Name: <span className="opacity-80">Your Name</span></div>
            <div>Phone: <span className="opacity-80">03xx-xxxxxxx</span></div>
            <div>Email: <span className="opacity-80">you@example.com</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="font-semibold mb-2">KYC status</div>
          <div className="text-sm opacity-80 mb-3">
            Basic KYC required to enable Pay & Rewards.
          </div>
          <a
            href="/app/onboarding"
            className="inline-flex items-center rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          >
            Complete KYC
          </a>
        </div>
      </div>
    </div>
  );
}
