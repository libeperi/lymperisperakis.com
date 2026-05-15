"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Mode = "system" | "light" | "dark";
const order: Mode[] = ["system", "light", "dark"];
const next = (m: Mode): Mode => order[(order.indexOf(m) + 1) % order.length];

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (theme as Mode) ?? "system";
  const isDark = mounted && resolvedTheme === "dark";

  // Generic label until mounted to keep SSR/client markup identical.
  const label = mounted
    ? current === "system"
      ? "Theme: system (click to switch)"
      : current === "light"
      ? "Theme: light (click to switch)"
      : "Theme: dark (click to switch)"
    : "Toggle theme";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      suppressHydrationWarning
      onClick={() => setTheme(next(current))}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-md text-ink-soft hover:text-ink hover:bg-[color:var(--bg-surface)] transition-colors"
    >
      <span className="sr-only" suppressHydrationWarning>
        {label}
      </span>
      {/* Mounted-only icon to avoid hydration flicker */}
      <span suppressHydrationWarning className="block">
        {mounted ? (
          current === "system" ? (
            // System: half-moon-half-sun indicator
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              <path
                d="M12 8a4 4 0 0 0 0 8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          ) : isDark ? (
            // Moon (active when explicit dark)
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
            </svg>
          ) : (
            // Sun (active when explicit light)
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          )
        ) : (
          // SSR placeholder — keeps layout stable
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="none" />
          </svg>
        )}
      </span>
    </button>
  );
}
