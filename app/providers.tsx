"use client";

import * as React from "react";

// ---------- Lang Provider ----------
type Lang = "en" | "ur";
type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = React.createContext<LangCtx | undefined>(undefined);

export function LangProvider({
  initialLang = "en",
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLang] = React.useState<Lang>(initialLang);

  React.useEffect(() => {
    // keep <html> correct for a11y + Tailwind RTL
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

// ---------- Theme Provider ----------
type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = React.createContext<ThemeCtx | undefined>(undefined);

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}
function writeCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; expires=${d.toUTCString()}`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    // 1) cookie
    const c = readCookie("rb-theme");
    if (c === "light" || c === "dark") return c;
    // 2) system
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    writeCookie("rb-theme", t);
  }, []);

  React.useEffect(() => {
    // Toggle `.dark` on <html> for Tailwind’s dark mode classes
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// (Optional) small helper components if you want quick toggles later
export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border px-2 py-1 rounded text-sm"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
