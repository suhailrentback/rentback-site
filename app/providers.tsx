"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ur";
export type Theme = "light" | "dark" | "system";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const LangContext = createContext<LangContextType | undefined>(undefined);
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem("rb-lang");
    if (saved === "en" || saved === "ur") return saved;
  } catch {}
  return "en";
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("rb-theme");
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {}
  return "system";
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Persist + reflect language to <html>
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";
  useEffect(() => {
    try {
      localStorage.setItem("rb-lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", dir);
    }
  }, [lang, dir]);

  // Theme resolution (system -> match media)
  const systemPrefersDark =
    typeof window !== "undefined" ? window.matchMedia?.("(prefers-color-scheme: dark)").matches : false;

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  // Persist + reflect theme to <html> (class "dark"/"light" for Tailwind)
  useEffect(() => {
    try {
      localStorage.setItem("rb-theme", theme);
    } catch {}
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.classList.remove("light", "dark");
      html.classList.add(resolvedTheme);
      html.setAttribute("data-theme", resolvedTheme);
    }
  }, [theme, resolvedTheme]);

  // React to system changes when in "system" mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        const html = document.documentElement;
        const rt = mq.matches ? "dark" : "light";
        html.classList.remove("light", "dark");
        html.classList.add(rt);
        html.setAttribute("data-theme", rt);
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [theme]);

  const setLang = (l: Lang) => setLangState(l);
  const setTheme = (t: Theme) => setThemeState(t);

  const langValue = useMemo(() => ({ lang, setLang, dir }), [lang, dir]);
  const themeValue = useMemo(() => ({ theme, setTheme, resolvedTheme }), [theme, resolvedTheme]);

  return (
    <LangContext.Provider value={langValue}>
      <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <AppProviders>");
  return ctx;
}

export function useThemeRB() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeRB must be used within <AppProviders>");
  return ctx;
}
