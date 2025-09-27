"use client";

import * as React from "react";

function hasKycCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("rb-kyc=1"));
}

/** Wrap any money/privileged UI in <KycGate>. */
export default function KycGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    setOk(hasKycCookie());
  }, []);

  if (!ok)
    return (
      fallback ?? (
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4">
          <div className="font-semibold mb-1">Complete KYC to continue</div>
          <a className="underline" href="/app/app/onboarding">
            Go to onboarding
          </a>
        </div>
      )
    );

  return <>{children}</>;
}
