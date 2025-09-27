// app/app/pay/page.tsx
"use client";

import KycGate from "@/components/KycGate";
import PayScreen from "@/components/PayScreen"; // your existing Pay tab component

export default function PayPage() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <KycGate>
        <PayScreen />
      </KycGate>
    </div>
  );
}
