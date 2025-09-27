"use client";

import * as React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";
// If you already have a real RewardsScreen, uncomment next line and use it
// import RewardsScreen from "@/components/RewardsScreen";

function RewardsStub() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-semibold mb-2">Rewards</div>
      <div className="text-sm opacity-80">
        This is a placeholder rewards screen. Replace with your RewardsScreen component.
      </div>
    </div>
  );
}

export default function RewardsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Rewards</span>
      </div>

      <KycGate>
        {/* Replace <RewardsStub /> with <RewardsScreen /> when available */}
        <RewardsStub />
      </KycGate>
    </div>
  );
}
