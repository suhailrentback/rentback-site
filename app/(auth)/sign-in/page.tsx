// app/(auth)/sign-in/page.tsx
"use client";

import React, { useState } from "react";
import { loginAction } from "./actions";
import BrandLogo from "@/components/BrandLogo";

export default function SignInPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [roles, setRoles] = useState<string[]>(["tenant"]);
  const [busy, setBusy] = useState(false);
  const isLight = theme === "light";

  function toggleRole(r: "tenant" | "landlord" | "admin") {
    setRoles((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  }

  return (
    <html lang={lang} dir={lang === "ur" ? "rtl" : "ltr"}>
      <body
        className={
          isLight
            ? "min-h-screen bg-white text-slate-900"
            : "min-h-screen bg-[#0b0b0b] text-white"
        }
      >
        {/* Header */}
        <header
          className={
            "sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b " +
            (isLight
              ? "bg-white/85 backdrop-blur border-slate-200"
              : "bg-[#0b0b0bcc] backdrop-blur border-white/10")
          }
        >
          <div className="flex items-center gap-2 font-bold">
            <BrandLogo stroke={isLight ? "#059669" : "#34d399"} />
            <span className={isLight ? "text-emerald-600" : "text-emerald-400"}>
              RentBack
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className={
                "px-3 py-1.5 rounded-lg text-sm border " +
                (isLight ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/5")
              }
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
            <button
              onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
              className={
                "px-3 py-1.5 rounded-lg text-sm border " +
                (isLight ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/5")
              }
            >
              {isLight ? "🌙 Dark" : "☀️ Light"}
            </button>
            <a
              href="/"
              className={
                "px-3 py-1.5 rounded-lg text-sm " +
                (isLight
                  ? "border border-slate-200 hover:bg-slate-50"
                  : "border border-white/10 hover:bg-white/5")
              }
            >
              Back
            </a>
          </div>
        </header>

        {/* Card */}
        <main className="max-w-md mx-auto px-4">
          <div
            className={
              "mt-10 rounded-2xl p-5 shadow-xl border " +
              (isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10")
            }
          >
            <h1 className="text-xl font-bold">
              {lang === "en" ? "Sign in" : "سائن اِن"}
            </h1>
            <p className="text-sm opacity-80 mt-1">
              {lang === "en"
                ? "Pick your language and role(s). In production this will be email/OTP or phone/OTP—this screen uses a safe demo session so you can test now."
                : "اپنی زبان اور کردار منتخب کریں۔ پروڈکشن میں یہ ای میل/او ٹی پی یا فون/او ٹی پی ہوگا—یہ اسکرین ڈیمو سیشن استعمال کرتی ہے تاکہ آپ ابھی ٹیسٹ کر سکیں۔"}
            </p>

            {/* Language */}
            <div className="mt-5">
              <div className="text-sm font-medium mb-1">
                {lang === "en" ? "Language" : "زبان"}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    lang === "en"
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : isLight
                      ? "border-slate-200 hover:bg-slate-50"
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
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : isLight
                      ? "border-slate-200 hover:bg-slate-50"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* Roles */}
            <div className="mt-5">
              <div className="text-sm font-medium mb-1">
                {lang === "en" ? "Choose your role(s)" : "اپنا کردار منتخب کریں"}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(["tenant", "landlord", "admin"] as const).map((r) => (
                  <label
                    key={r}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer ${
                      roles.includes(r)
                        ? isLight
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-emerald-900/30 border-emerald-700"
                        : isLight
                        ? "bg-white border-slate-200 hover:bg-slate-50"
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
                {lang === "en"
                  ? "You can switch roles later in the app header."
                  : "آپ بعد میں ایپ ہیڈر سے کردار تبدیل کر سکتے ہیں۔"}
              </div>
            </div>

            {/* Submit via server action */}
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
                className={
                  "w-full px-4 py-2 rounded-xl font-semibold disabled:opacity-60 " +
                  (isLight
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700")
                }
              >
                {busy
                  ? lang === "en"
                    ? "Signing in…"
                    : "لاگ اِن ہو رہا ہے…"
                  : lang === "en"
                  ? "Sign in & continue"
                  : "سائن اِن کر کے آگے بڑھیں"}
              </button>
              <div className="text-[11px] opacity-70 mt-2">
                {lang === "en"
                  ? "By continuing, you agree to our demo terms. No real payments are processed."
                  : "آگے بڑھ کر آپ ہماری ڈیمو شرائط سے اتفاق کرتے ہیں۔ کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔"}
              </div>
            </form>
          </div>
        </main>
      </body>
    </html>
  );
}
