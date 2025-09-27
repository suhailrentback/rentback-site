"use client";

import React from "react";
import KycGate from "@/components/KycGate";
import Logo from "@/components/Logo";

export default function PayPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Pay</span>
      </div>

      <KycGate>
        {/* Your real Pay UI goes here. Keep it minimal for now. */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="font-semibold mb-2">Pay rent</div>
          <p className="text-sm opacity-80">
            Bank transfer, Card, or Wallet. (Demo UI — replace with live flow later)
          </p>
        </div>
      </KycGate>
    </div>
  );
}
