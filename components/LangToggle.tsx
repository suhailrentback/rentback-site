"use client";

import { useLang } from "@/app/providers";
import { getCopy } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const t = getCopy(lang);

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ur" : "en")}
      className="border border-white/10 px-2 py-1 rounded text-sm hover:bg-white/5"
      aria-label="Toggle language"
      title="Toggle language"
    >
      {lang === "en" ? t.toggle.ur : t.toggle.en}
    </button>
  );
}
