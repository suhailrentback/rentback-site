"use client";

import { useThemeRB } from "@/app/providers";
import { useLang } from "@/app/providers";
import { getCopy } from "@/lib/i18n";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useThemeRB();
  const { lang } = useLang();
  const t = getCopy(lang);

  return (
    <div className="flex items-center gap-1">
      <label className="text-xs opacity-70">{t.toggle.theme}</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="bg-transparent border border-white/10 px-2 py-1 rounded text-sm"
        title="Theme"
      >
        <option value="light">{t.toggle.light}</option>
        <option value="dark">{t.toggle.dark}</option>
        <option value="system">{t.toggle.system}</option>
      </select>
      <span className="text-[11px] opacity-60 px-1">{resolvedTheme}</span>
    </div>
  );
}
