"use client";

import React from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/app/providers";
import { getCopy } from "@/lib/i18n";

export default function SupportPage() {
  const { lang, dir } = useLang();
  const t = getCopy(lang);

  return (
    <div dir={dir} className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">{lang === "en" ? "Support" : "مدد"}</span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h1 className="text-lg font-semibold mb-2">
          {lang === "en" ? "How can we help?" : "ہم کیسے مدد کر سکتے ہیں؟"}
        </h1>
        <p className="text-sm opacity-80 mb-3">
          {lang === "en"
            ? "Email our support team and we’ll get back within 24 hours."
            : "ہماری سپورٹ ٹیم کو ای میل کریں—عام طور پر 24 گھنٹوں میں جواب دیتے ہیں۔"}
        </p>

        <a
          href="mailto:help@rentback.app"
          className="inline-block px-4 py-2 rounded-lg font-semibold border border-emerald-300/30 bg-emerald-600 text-white"
        >
          help@rentback.app
        </a>
      </div>
    </div>
  );
}
