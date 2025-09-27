// app/(auth)/sign-in/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Logo from "@/components/Logo";
import { signInAction } from "./actions";

type Lang = "en" | "ur";

const COPY = {
  en: {
    title: "Sign in to RentBack",
    subtitle: "Pick your role to continue.",
    role: "Choose role",
    roles: { tenant: "Tenant", landlord: "Landlord", admin: "Admin" },
    cta: "Continue",
    langToggle: "اردو",
  },
  ur: {
    title: "RentBack میں سائن اِن",
    subtitle: "جاری رکھنے کے لیے اپنا رول منتخب کریں۔",
    role: "رول منتخب کریں",
    roles: { tenant: "کرایہ دار", landlord: "مالک مکان", admin: "ایڈمن" },
    cta: "جاری رکھیں",
    langToggle: "English",
  },
} as const;

export const dynamic = "force-static"; // server action still works

export default function SignInPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => COPY[lang], [lang]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        <button
          onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
          className="text-xs border border-black/10 dark:border-white/20 rounded px-2 py-1"
          aria-label="Toggle language"
        >
          {t.langToggle}
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <p className="opacity-70 mt-1">{t.subtitle}</p>

        {/* The form MUST post to the server action */}
        <form action={signInAction} className="mt-6 space-y-5">
          {/* preserve ?next=/app/... if present */}
          <input
            type="hidden"
            name="next"
            value={typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") ?? "" : ""}
          />
          {/* send chosen language to the server so we store it in session */}
          <input type="hidden" name="lang" value={lang} />

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">{t.role}</legend>
            <div className="grid grid-cols-3 gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 p-3 cursor-pointer">
                <input type="radio" name="role" value="tenant" defaultChecked />
                <span className="text-sm">{t.roles.tenant}</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 p-3 cursor-pointer">
                <input type="radio" name="role" value="landlord" />
                <span className="text-sm">{t.roles.landlord}</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 p-3 cursor-pointer">
                <input type="radio" name="role" value="admin" />
                <span className="text-sm">{t.roles.admin}</span>
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {t.cta}
          </button>
        </form>

        <p className="text-xs opacity-60 mt-4">
          Demo preview — no real payments are processed.
        </p>
      </main>
    </div>
  );
}
