"use client";

import * as React from "react";

/* ===================== Language ===================== */

export type Lang = "en" | "ur";
type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
};

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
    const root = document.documentElement;
    const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
  }, [lang]);

  const value = React.useMemo<LangCtx>(
    () => ({ lang, setLang, dir: lang === "ur" ? "rtl" : "ltr" }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx; // { lang, setLang, dir }
}

/* ===================== Theme ===================== */

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
    const c = readCookie("rb-theme");
    if (c === "light" || c === "dark") return c;
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

/* Back-compat alias for components/ThemeToggle.tsx */
export function useThemeRB() {
  return useTheme();
}

/* ===================== AppProviders Wrapper ===================== */

export function AppProviders({
  initialLang = "en",
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LangProvider initialLang={initialLang}>{children}</LangProvider>
    </ThemeProvider>
  );
}
