"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

/** Day/Night toggle. Renders a stable placeholder until mounted to avoid
 *  hydration mismatch (the active theme is only known on the client). */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isNight = resolvedTheme === "night";

  return (
    <button
      type="button"
      aria-label={mounted ? (isNight ? "Switch to day" : "Switch to night") : "Switch theme"}
      onClick={() => setTheme(isNight ? "day" : "night")}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-line2 bg-transparent text-ink",
        "cursor-pointer transition-colors hover:bg-panel2",
        className,
      )}
    >
      {/* Until mounted, show a neutral icon to keep SSR/CSR markup aligned. */}
      {mounted && isNight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 13.5A8 8 0 0 1 10.5 4a7 7 0 1 0 9.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
