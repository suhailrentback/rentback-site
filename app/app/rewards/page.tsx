// app/app/rewards/page.tsx
"use client";

import KycGate from "@/components/KycGate";
import RewardsScreen from "@/components/RewardsScreen"; // your existing Rewards tab component

export default function RewardsPage() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <KycGate>
        <RewardsScreen />
      </KycGate>
    </div>
  );
}
