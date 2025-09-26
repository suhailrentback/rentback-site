// /app/app/onboarding/page.tsx
"use client";
import React, { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pickedRoles, setPickedRoles] = useState<string[]>(["tenant"]);
  const [loading, setLoading] = useState(false);

  async function postAction(action: string, form: any) {
    setLoading(true);
    try {
      const res = await fetch(action, { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error("Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Welcome to RentBack</h1>

      {step === 1 && (
        <form
          action={async (formData) => {
            // Set roles & active role via route action
            const roles = pickedRoles.join(",");
            const active = pickedRoles.includes("tenant") ? "tenant" : pickedRoles[0];
            const fd = new FormData();
            fd.set("roles", roles);
            fd.set("activeRole", active);
            await fetch("/app/onboarding/set-roles", { method: "POST", body: fd });
            setStep(2);
          }}
        >
          <div className="rounded-xl border border-white/10 p-3">
            <div className="font-semibold mb-2">Pick your role</div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={pickedRoles.includes("tenant")}
                onChange={(e) =>
                  setPickedRoles((p) =>
                    e.target.checked ? Array.from(new Set([...p, "tenant"])) : p.filter((x) => x !== "tenant")
                  )
                }
              />
              Tenant
            </label>
            <label className="flex items-center gap-2 text-sm mt-1">
              <input
                type="checkbox"
                checked={pickedRoles.includes("landlord")}
                onChange={(e) =>
                  setPickedRoles((p) =>
                    e.target.checked ? Array.from(new Set([...p, "landlord"])) : p.filter((x) => x !== "landlord")
                  )
                }
              />
              Landlord
            </label>
            <div className="mt-3">
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700"
                disabled={pickedRoles.length === 0 || loading}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          action={async () => {
            await fetch("/app/onboarding/complete-basic-kyc", { method: "POST" });
            setStep(3);
          }}
        >
          <div className="rounded-xl border border-white/10 p-3">
            <div className="font-semibold mb-2">Basic KYC</div>
            <p className="text-sm opacity-80">
              For demo, we’ll mark your KYC as level 1. In production, this step collects & verifies CNIC + selfie.
            </p>
            <div className="mt-3">
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                Complete Basic KYC
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="rounded-xl border border-white/10 p-3">
          <div className="font-semibold mb-2">All set!</div>
          <p className="text-sm opacity-80">
            You can now access the app. We’ll send you to <code>/app</code>.
          </p>
          <a
            href="/app"
            className="inline-block mt-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            Go to app
          </a>
        </div>
      )}
    </div>
  );
}
