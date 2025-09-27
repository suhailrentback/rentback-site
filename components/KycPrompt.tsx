// components/KycPrompt.tsx
"use client";

import React from "react";

export default function KycPrompt({ lang = "en" }: { lang?: "en" | "ur" }) {
  const copy =
    lang === "en"
      ? {
          text: "Complete KYC to unlock payments & rewards.",
          cta: "Start KYC",
        }
      : {
          text: "ادائیگیوں اور انعامات کے لیے KYC مکمل کریں۔",
          cta: "KYC شروع کریں",
        };

  return (
    <div className="mb-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3">
      <div className="text-sm">{copy.text}</div>
      <a
        href="/app/onboarding"
        className="mt-2 inline-flex rounded-lg px-3 py-1.5 bg-emerald-600 text-white text-sm hover:bg-emerald-700"
      >
        {copy.cta}
      </a>
    </div>
  );
}
