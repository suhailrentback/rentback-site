"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * RentBack • Onboarding Wizard (client-only, compile-safe)
 * - 6 steps: Role → Basic Info → CNIC/DOB → Docs → Consent → Review & Finish
 * - No external deps. Uses localStorage to simulate KYC and user profile.
 * - Redirects to /app after "Finish".
 *
 * You can swap the storage bits with real server actions later.
 */

// ---------------- Types ----------------
type Role = "tenant" | "landlord";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type Profile = {
  fullName: string;
  contact: string; // email or phone
  cnic: string;
  dob: string; // ISO yyyy-mm-dd
  role: Role;
};

// ---------------- Utils ----------------
const clampStep = (n: number): Step => {
  const x = Math.max(1, Math.min(6, Math.trunc(n)));
  return x as Step;
};

const isCNIC = (s: string) => /^[0-9]{5}-?[0-9]{7}-?[0-9]$/.test(s.trim());
const isPhone = (s: string) => /^(\+?92|0)?[0-9]{10}$/.test(s.replace(/\D/g, ""));
const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

// simple logo to avoid extra imports
const RentBackLogo: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = "#10b981",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={
      "rounded-2xl border border-white/10 bg-white/5 p-4 " + (className || "")
    }
  >
    {children}
  </div>
);

// ---------------- Page ----------------
export default function OnboardingPage() {
  const router = useRouter();

  // Wizard state
  const [step, setStep] = useState<Step>(1);

  // Profile fields
  const [role, setRole] = useState<Role>("tenant");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");

  // Docs (demo placeholders)
  const [selfiePicked, setSelfiePicked] = useState<File | null>(null);
  const [addressDoc, setAddressDoc] = useState<File | null>(null);

  // Consent
  const [consent, setConsent] = useState(false);

  // Busy UX
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill from localStorage if user returns to onboarding
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rb-onboarding-draft");
      if (saved) {
        const d = JSON.parse(saved);
        if (d.role) setRole(d.role);
        if (d.fullName) setFullName(d.fullName);
        if (d.contact) setContact(d.contact);
        if (d.cnic) setCnic(d.cnic);
        if (d.dob) setDob(d.dob);
      }
    } catch {}
  }, []);

  // Draft save
  useEffect(() => {
    const draft = { role, fullName, contact, cnic, dob };
    try {
      localStorage.setItem("rb-onboarding-draft", JSON.stringify(draft));
    } catch {}
  }, [role, fullName, contact, cnic, dob]);

  const profile: Profile = useMemo(
    () => ({ role, fullName, contact, cnic, dob }),
    [role, fullName, contact, cnic, dob]
  );

  // Navigation helpers (typed)
  const next = () => setStep((s) => clampStep(s + 1));
  const back = () => setStep((s) => clampStep(s - 1));

  // Validation per-step
  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return role === "tenant" || role === "landlord";
      case 2:
        return fullName.trim().length >= 3 && (isPhone(contact) || isEmail(contact));
      case 3:
        return isCNIC(cnic) && /^\d{4}-\d{2}-\d{2}$|^\d{4}\-\d{2}\-\d{2}$|^\d{4}\d{2}\d{2}$/.test(
          dob.replace(/\./g, "-")
        );
      case 4:
        return !!selfiePicked && !!addressDoc;
      case 5:
        return consent;
      case 6:
        return true;
      default:
        return false;
    }
  }, [step, role, fullName, contact, cnic, dob, selfiePicked, addressDoc, consent]);

  // Finish → simulate KYC=1 and send to /app
  const finish = async () => {
    setError(null);
    setBusy(true);
    try {
      // Simulate writing a user record
      localStorage.setItem(
        "rb-user",
        JSON.stringify({
          roles: [role],
          activeRole: role,
          kycLevel: 1, // mark as completed
          lang: (typeof window !== "undefined" &&
          document?.documentElement?.getAttribute("lang") === "ur")
            ? "ur"
            : "en",
          profile,
        })
      );
      // Also keep compat with your app shell
      localStorage.setItem("rb-kyc-level", "1");
      localStorage.setItem("rb-role", role);

      // Clear onboarding draft
      localStorage.removeItem("rb-onboarding-draft");

      // Navigate to app
      router.push("/app");
    } catch (e: any) {
      setError("Something went wrong while saving. Please try again.");
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  // ------------- UI -------------
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-3 bg-[#0b0b0bcc] backdrop-saturate-150 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-emerald-400">
          <RentBackLogo />
          RentBack
        </div>
        <div className="text-sm opacity-80">Onboarding</div>
      </header>

      {/* Progress */}
      <div className="max-w-xl mx-auto px-3 pt-3">
        <div className="text-xs opacity-70">Step {step} of 6</div>
        <div className="mt-1 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-2 bg-emerald-500"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <main className="max-w-xl mx-auto p-3 pb-24 space-y-3">
        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
            {error}
          </div>
        ) : null}

        {step === 1 && (
          <Card>
            <div className="font-semibold">Choose your role</div>
            <div className="text-xs opacity-70">
              You can switch later inside the app.
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("tenant")}
                className={
                  "px-3 py-3 rounded-xl border font-semibold " +
                  (role === "tenant"
                    ? "border-emerald-500 bg-emerald-900/20"
                    : "border-white/10 hover:bg-white/5")
                }
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => setRole("landlord")}
                className={
                  "px-3 py-3 rounded-xl border font-semibold " +
                  (role === "landlord"
                    ? "border-emerald-500 bg-emerald-900/20"
                    : "border-white/10 hover:bg-white/5")
                }
              >
                Landlord
              </button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <div className="font-semibold">Basic information</div>
            <div className="grid gap-2 mt-3">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email or Pakistani phone"
                className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none"
              />
              <div className="text-xs opacity-70">
                Use +92 or 0 for phone numbers, e.g. +923001234567
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <div className="font-semibold">Identity details</div>
            <div className="grid gap-2 mt-3">
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="CNIC (xxxxx-xxxxxxx-x)"
                className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none"
              />
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                placeholder="Date of Birth"
                className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none"
              />
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <div className="font-semibold">Upload documents (demo)</div>
            <div className="text-xs opacity-70">
              Selfie and address proof (e.g., utility bill).
            </div>
            <div className="grid gap-2 mt-3">
              <label className="block">
                <span className="text-sm opacity-80">Selfie</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelfiePicked(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Address proof</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setAddressDoc(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm"
                />
              </label>
              <div className="text-xs opacity-70">
                Note: This is a demo. Files are not uploaded anywhere.
              </div>
            </div>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <div className="font-semibold">Consent</div>
            <div className="text-sm opacity-80 mt-2">
              I agree to the processing of my information for KYC and compliance
              purposes as described in the Privacy Policy.
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent" className="text-sm">
                I agree
              </label>
            </div>
          </Card>
        )}

        {step === 6 && (
          <Card>
            <div className="font-semibold">Review & Finish</div>
            <div className="mt-3 text-sm space-y-1">
              <div>
                <span className="opacity-70">Role:</span>{" "}
                <b className="uppercase">{role}</b>
              </div>
              <div>
                <span className="opacity-70">Full name:</span> <b>{fullName}</b>
              </div>
              <div>
                <span className="opacity-70">Contact:</span> <b>{contact}</b>
              </div>
              <div>
                <span className="opacity-70">CNIC:</span> <b>{cnic}</b>
              </div>
              <div>
                <span className="opacity-70">DOB:</span> <b>{dob}</b>
              </div>
              <div className="opacity-70 text-xs mt-2">
                You can edit these in your Profile later.
              </div>
            </div>
          </Card>
        )}

        {/* Nav Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={back}
            disabled={step === 1 || busy}
            className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-60"
          >
            Back
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canNext || busy}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold disabled:opacity-60"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              disabled={!canNext || busy}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold disabled:opacity-60"
            >
              {busy ? "Finishing…" : "Finish & Go to App"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
