"use client";

import * as React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";
// If you already have a real PayScreen, uncomment next line and replace the stub below
// import PayScreen from "@/components/PayScreen";

function PayStub() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-semibold mb-2">Pay Rent</div>
      <div className="text-sm opacity-80">
        This is a placeholder payment form. Replace with your PayScreen component.
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Pay</span>
      </div>

      <KycGate>
        {/* Replace <PayStub /> with <PayScreen /> when available */}
        <PayStub />
      </KycGate>
    </div>
  );
}
