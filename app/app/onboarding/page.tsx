"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import { useLang } from "@/app/providers";
import { getCopy } from "@/lib/i18n";

export default function OnboardingPage() {
  const router = useRouter();
  const qp = useSearchParams();
  const nextUrl = qp.get("next") || "/app/app";
  const { lang, dir } = useLang();
  const t = getCopy(lang);

  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function complete() {
    if (!fullName || !cnic || !consent) return;
    setBusy(true);
    try {
      // Demo: set KYC cookie to “1”, store role & basic profile in localStorage
      document.cookie = `rb-kyc=1; path=/; max-age=${60 * 60 * 24 * 365}`;
      try {
        localStorage.setItem("rb-role", role);
        localStorage.setItem("rb-profile-name", fullName);
        localStorage.setItem("rb-profile-cnic", cnic);
      } catch {}
      router.replace(nextUrl);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir={dir} className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">KYC • Demo</span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h1 className="text-lg font-semibold mb-2">
          {lang === "en" ? "Complete KYC to continue" : "جاری رکھنے کے لیے KYC مکمل کریں"}
        </h1>
        <p className="text-sm opacity-80 mb-4">
          {lang === "en"
            ? "This quick demo collects minimal fields to unlock the app."
            : "یہ ڈیمو ایپ کو کھولنے کے لیے چند لازمی معلومات لیتا ہے۔"}
        </p>

        <div className="grid gap-3">
          <label className="text-sm">
            {lang === "en" ? "I am a" : "میں ہوں"}
            <select
              className="ml-2 bg-transparent border border-white/10 rounded px-2 py-1 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="tenant">{lang === "en" ? "Tenant" : "کرایہ دار"}</option>
              <option value="landlord">{lang === "en" ? "Landlord" : "مالک مکان"}</option>
            </select>
          </label>

          <input
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5"
            placeholder={lang === "en" ? "Full name" : "پورا نام"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5"
            placeholder={lang === "en" ? "CNIC (13 digits)" : "شناختی کارڈ نمبر (13 ہندسے)"}
            value={cnic}
            onChange={(e) => setCnic(e.target.value.replace(/[^0-9]/g, "").slice(0, 13))}
            inputMode="numeric"
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              {lang === "en"
                ? "I consent to data processing for KYC (demo)."
                : "میں KYC (ڈیمو) کے لیے ڈیٹا استعمال کی اجازت دیتا/دیتی ہوں۔"}
            </span>
          </label>

          <div className="flex justify-end">
            <button
              onClick={complete}
              disabled={!fullName || !cnic || !consent || busy}
              className="px-4 py-2 rounded-lg font-semibold border border-emerald-300/30 bg-emerald-600 text-white disabled:opacity-60"
            >
              {busy
                ? lang === "en" ? "Saving…" : "محفوظ ہو رہا ہے…"
                : lang === "en" ? "Finish KYC" : "KYC مکمل کریں"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
