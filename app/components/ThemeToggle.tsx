"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "adt_theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  if (theme === "light") el.setAttribute("data-theme", "light");
  else el.removeAttribute("data-theme");
}

function applyFavicon(theme: Theme) {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (link) {
    link.href = theme === "dark" ? "/favicon_dark.png" : "/favicon_light.png";
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
    applyFavicon(theme);
  }, [theme]);

  const nextTheme = useMemo<Theme>(() => (theme === "dark" ? "light" : "dark"), [theme]);

  return (
    <button
      type="button"
      onClick={() => {
        const t = nextTheme;
        setTheme(t);
        window.localStorage.setItem(STORAGE_KEY, t);
        applyTheme(t);
      }}
      className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-2 sm:px-3 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
