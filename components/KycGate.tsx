"use client";

import * as React from "react";

function hasKycCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("rb-kyc=1"));
}

/**
 * Wrap any money/privileged UI in <KycGate>.
 * If KYC cookie is missing, shows the fallback.
 */
export default function KycGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(hasKycCookie());
  }, []);

  if (!ready) return (
    fallback ?? (
      <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4">
        <div className="font-semibold mb-1">Complete KYC to continue</div>
        <a href="/app/app/onboarding" className="underline">Go to onboarding</a>
      </div>
    )
  );

  return <>{children}</>;
}
