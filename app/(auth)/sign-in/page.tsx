// app/(auth)/sign-in/page.tsx
"use client";

import React, { useState } from "react";
import { loginAction } from "./actions";

export default function SignInPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [roles, setRoles] = useState<string[]>(["tenant"]);
  const [busy, setBusy] = useState(false);

  function toggleRole(r: "tenant" | "landlord" | "admin") {
    setRoles((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  }

  return (
    <html lang={lang} dir={lang === "ur" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-[#0b0b0b] text-white">
        {/* Header */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-white/10 bg-[#0b0b0bcc] backdrop-blur">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span className="text-lg">🏠</span> RentBack
          </div>
          <a
            href="/"
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
          >
            Back
          </a>
        </header>

        {/* Card */}
        <main className="max-w-md mx-auto px-4">
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
            <h1 className="text-xl font-bold">Sign in</h1>
            <p className="text-sm opacity-80 mt-1">
              Pick your language and role(s). In production this will be email/OTP
              or phone/OTP—this screen uses a safe demo session so you can test now.
            </p>

            {/* Language */}
            <div className="mt-5">
              <div className="text-sm font-medium mb-1">Language</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    lang === "en"
                      ? "bg-emerald-600 border-emerald-500"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ur")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    lang === "ur"
                      ? "bg-emerald-600 border-emerald-500"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* Roles */}
            <div className="mt-5">
              <div className="text-sm font-medium mb-1">Choose your role(s)</div>
              <div className="grid grid-cols-1 gap-2">
                {(["tenant", "landlord", "admin"] as const).map((r) => (
                  <label
                    key={r}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer ${
                      roles.includes(r)
                        ? "bg-emerald-900/30 border-emerald-700"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <span className="capitalize">{r}</span>
                    <input
                      type="checkbox"
                      checked={roles.includes(r)}
                      onChange={() => toggleRole(r)}
                    />
                  </label>
                ))}
              </div>
              <div className="text-xs opacity-70 mt-1">
                You can switch roles later in the app header.
              </div>
            </div>

            {/* Form submit via server action */}
            <form
              action={async (formData: FormData) => {
                setBusy(true);
                try {
                  formData.set("lang", lang);
                  roles.forEach((r) => formData.append("roles", r));
                  await loginAction(formData);
                } finally {
                  setBusy(false);
                }
              }}
              className="mt-6"
            >
              <button
                type="submit"
                disabled={busy || roles.length === 0}
                className="w-full px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Sign in & continue"}
              </button>
              <div className="text-[11px] opacity-70 mt-2">
                By continuing, you agree to our demo terms. No real payments are processed.
              </div>
            </form>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs opacity-70">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              KYC-first onboarding
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              Pakistan-focused rewards
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
