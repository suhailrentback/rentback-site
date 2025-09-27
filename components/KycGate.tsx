// components/KycGate.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/** Polls rb_kyc cookie (demo) and re-renders when it flips to "1". */
export default function KycGate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [kyc, setKyc] = useState<0 | 1>(0);

  useEffect(() => {
    // initial read
    const value = Number(readCookie("rb_kyc") || "0");
    setKyc(value === 1 ? 1 : 0);

    // small poll to catch onboarding completion in another tab/window
    const id = setInterval(() => {
      const v = Number(readCookie("rb_kyc") || "0");
      setKyc(v === 1 ? 1 : 0);
    }, 1200);

    return () => clearInterval(id);
  }, []);

  if (kyc < 1) {
    return (
      <div
        className={
          className ??
          "rounded-2xl border bg-white/5 border-white/10 p-4 text-sm"
        }
      >
        <div className="font-semibold mb-1">Complete KYC to continue</div>
        <div className="opacity-80">
          To use payments and rewards, please finish a quick KYC check.
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href="/app/onboarding"
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Go to KYC
          </Link>
          <Link
            href="/app"
            className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
          >
            Back to app
          </Link>
        </div>
        <div className="text-xs opacity-60 mt-3">
          Demo note: We store a lightweight{" "}
          <code className="px-1 rounded bg-black/30">rb_kyc</code> cookie that
          flips to <code>1</code> after onboarding.
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
