"use client";

import React from "react";
import KycGate from "@/components/KycGate";
import Logo from "@/components/Logo";

export default function RewardsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Rewards</span>
      </div>

      <KycGate>
        {/* Your real Rewards UI goes here. Keep it minimal for now. */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="font-semibold mb-2">Rewards</div>
          <p className="text-sm opacity-80">
            Pakistan-focused perks and redemptions. (Demo UI — replace with live catalogue)
          </p>
        </div>
      </KycGate>
    </div>
  );
}
