// app/app/onboarding/page.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeBasicKycAction, setActiveRoleAction } from "../actions";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type Role = "tenant" | "landlord";

function isDigits(s: string, len: number) {
  return new RegExp(`^\\d{${len}}$`).test(s);
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);

  // Step 1: role
  const [role, setRole] = useState<Role>("tenant");

  // Step 2: personal
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");

  // Step 3: CNIC
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");

  // Step 4: selfie (placeholder)
  const [selfiePicked, setSelfiePicked] = useState<File | null>(null);

  // Step 5: address proof (placeholder)
  const [addressDoc, setAddressDoc] = useState<File | null>(null);

  // Step 6: consent
  const [consent, setConsent] = useState(false);

  const [busy, startTransition] = useTransition();
  const router = useRouter();

  // Validation per step
  const canNext = useMemo(() => {
    if (busy) return false;
    switch (step) {
      case 1:
        return role === "tenant" || role === "landlord";
      case 2:
        return fullName.trim().length >= 2 && contact.trim().length >= 6;
      case 3:
        return isDigits(cnic, 13) && !!dob;
      case 4:
        return !!selfiePicked;
      case 5:
        return !!addressDoc;
      case 6:
        return consent;
      default:
        return true;
    }
  }, [step, role, fullName, contact, cnic, dob, selfiePicked, addressDoc, consent, busy]);

  const next = () => setStep((s) => Math.min(((s + 1) as Step), 6));
  const back = () => setStep((s) => Math.max(((s - 1) as Step), 1));

  async function finish() {
    startTransition(async () => {
      // 1) Set active role cookie
      const fd = new FormData();
      fd.set("role", role);
      await setActiveRoleAction(fd);

      // 2) Mark basic KYC complete (cookie rb_kyc=1)
      await completeBasicKycAction();

      // (Optional) You could persist the collected fields to a backend here.

      // 3) Go to app
      router.replace("/app");
    });
  }

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pt-6 pb-24 max-w-xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-emerald-400">RentBack — Onboarding</div>
        <div className="text-xs opacity-70">Demo flow (no real KYC)</div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-xs mb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 ${
              i <= step ? "bg-emerald-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="rounded-2xl border p-4 bg-white/5 border-white/10">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold">Choose your role</h2>
            <p className="text-sm opacity-80 mt-1">
              You can switch later from the header menu.
            </p>
            <div className="grid gap-2 mt-4">
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
            <h2 className="text-lg font-bold">Basic information</h2>
            <p className="text-sm opacity-80 mt-1">
              Tell us who you are. This helps us set up your account.
            </p>
            <div className="grid gap-2 mt-4">
              <input
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
                placeholder="Email or phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold">CNIC details</h2>
            <p className="text-sm opacity-80 mt-1">
              Enter your 13-digit CNIC and date of birth.
            </p>
            <div className="grid gap-2 mt-4">
              <input
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
                placeholder="CNIC (13 digits)"
                inputMode="numeric"
                value={cnic}
                onChange={(e) =>
                  setCnic(e.target.value.replace(/[^0-9]/g, "").slice(0, 13))
                }
              />
              <input
                type="date"
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <div className="text-xs opacity-70">
                Demo only — we’re not sending this anywhere.
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold">Selfie verification (demo)</h2>
            <p className="text-sm opacity-80 mt-1">
              In production we’ll use a verified KYC provider. For the demo,
              upload any image file.
            </p>
            <div className="grid gap-2 mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelfiePicked(e.target.files?.[0] ?? null)}
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
              />
              {selfiePicked ? (
                <div className="text-xs opacity-80">
                  Picked: <b>{selfiePicked.name}</b> ({Math.round(selfiePicked.size / 1024)} KB)
                </div>
              ) : (
                <div className="text-xs opacity-70">No file selected.</div>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold">Proof of address (demo)</h2>
            <p className="text-sm opacity-80 mt-1">
              Upload a recent utility bill or tenancy document (demo file).
            </p>
            <div className="grid gap-2 mt-4">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setAddressDoc(e.target.files?.[0] ?? null)}
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5"
              />
              {addressDoc ? (
                <div className="text-xs opacity-80">
                  Picked: <b>{addressDoc.name}</b> ({Math.round(addressDoc.size / 1024)} KB)
                </div>
              ) : (
                <div className="text-xs opacity-70">No file selected.</div>
              )}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-lg font-bold">Review & consent</h2>
            <p className="text-sm opacity-80 mt-1">
              We’ll mark your KYC Level as <b>1</b> so you can start paying rent
              and earning rewards.
            </p>
            <div className="mt-3 rounded-lg border border-white/10 p-3">
              <div className="text-sm">
                <div>
                  Role: <b className="capitalize">{role}</b>
                </div>
                <div>
                  Name: <b>{fullName || "—"}</b>
                </div>
                <div>
                  Contact: <b>{contact || "—"}</b>
                </div>
                <div>
                  CNIC: <b>{cnic || "—"}</b> • DOB: <b>{dob || "—"}</b>
                </div>
                <div>
                  Selfie: <b>{selfiePicked?.name || "—"}</b>
                </div>
                <div>
                  Address doc: <b>{addressDoc?.name || "—"}</b>
                </div>
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I confirm the above details are correct (demo).
              </label>
            </div>
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

        {step < 6 ? (
          <button
            onClick={next}
            disabled={!canNext}
            className={`px-3 py-2 rounded-lg font-semibold ${
              canNext
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-emerald-600/40 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={!canNext}
            className={`px-3 py-2 rounded-lg font-semibold ${
              canNext
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-emerald-600/40 cursor-not-allowed"
            }`}
          >
            {busy ? "Finishing…" : "Finish onboarding"}
          </button>
        )}
      </div>

      <div className="text-xs opacity-70 mt-3">
        Demo only — no real verification is performed.
      </div>
    </div>
  );
}
