"use client";

import * as React from "react";
import { useThemeRB } from "@/app/providers";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeRB(); // { theme: "light" | "dark", setTheme }
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex items-center gap-2 border border-border px-2 py-1 rounded text-sm"
      aria-label="Toggle theme"
    >
      {/* simple icon */}
      <span aria-hidden className="inline-block w-4 h-4">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
