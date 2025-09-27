// app/app/onboarding/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeBasicKycAction } from "../actions";
import BrandLogo from "@/components/BrandLogo";

type Step = 1 | 2 | 3 | 4 | 5;

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [busy, startTransition] = useTransition();
  const router = useRouter();

  const next = () => setStep((s) => Math.min((s + 1) as Step, 5));
  const back = () => setStep((s) => Math.max((s - 1) as Step, 1));

  const complete = () => {
    startTransition(async () => {
      await completeBasicKycAction();
      router.replace("/app"); // send to main app shell
    });
  };

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pt-6 pb-24 max-w-xl mx-auto">
      {/* Header inside page for context */}
      <div className="flex items-center gap-2 font-bold text-emerald-400 mb-4">
        <BrandLogo />
        RentBack — Onboarding
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-xs mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 ${
              i <= step ? "bg-emerald-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="rounded-2xl border p-4 bg-white/5 border-white/10">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold">Choose your role</h2>
            <p className="text-sm opacity-80 mt-1">
              You can switch later from the app header.
            </p>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {(["tenant", "landlord"] as const).map((r) => (
                <label
                  key={r}
                  className={`px-3 py-2 rounded-lg border cursor-pointer flex items-center justify-between ${
                    role === r
                      ? "bg-emerald-900/30 border-emerald-700"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="capitalize">{r}</span>
                  <input
                    type="radio"
                    name="role"
                    checked={role === r}
                    onChange={() => setRole(r)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold">Basic info</h2>
            <p className="text-sm opacity-80 mt-1">
              Add your name and contact details.
            </p>
            <div className="grid gap-2 mt-4">
              <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5" placeholder="Full name" />
              <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5" placeholder="Email or phone" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold">CNIC & selfie (demo)</h2>
            <p className="text-sm opacity-80 mt-1">
              In production, we’ll use a verified KYC provider. This step is a safe demo.
            </p>
            <div className="grid gap-2 mt-4">
              <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5" placeholder="CNIC (13 digits)" />
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5">
                Upload selfie (placeholder)
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold">Proof of address (demo)</h2>
            <p className="text-sm opacity-80 mt-1">
              Upload a utility bill or tenancy document. (Demo placeholder)
            </p>
            <div className="grid gap-2 mt-4">
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5">
                Upload document (placeholder)
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold">Review & finish</h2>
            <p className="text-sm opacity-80 mt-1">
              We’ll mark your KYC Level as <b>1</b> so you can start using payments & rewards.
            </p>
            <ul className="text-sm mt-3 list-disc pl-5 space-y-1 opacity-90">
              <li>Role: <b className="capitalize">{role}</b></li>
              <li>CNIC/selfie: demo upload</li>
              <li>Address proof: demo upload</li>
            </ul>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={back}
          disabled={step === 1 || busy}
          className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-60"
        >
          Back
        </button>

        {step < 5 ? (
          <button
            onClick={next}
            disabled={busy}
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={complete}
            disabled={busy}
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            {busy ? "Finishing…" : "Finish onboarding"}
          </button>
        )}
      </div>

      <div className="text-xs opacity-70 mt-3">
        Demo only — no real KYC checks happen here.
      </div>
    </div>
  );
}
