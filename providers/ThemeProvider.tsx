"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Day/Night theming. The design switches palettes via `data-theme="day|night"`
 * on a container; next-themes writes that attribute on <html> and handles
 * persistence + no-flash hydration for us.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="day"
      enableSystem={false}
      themes={["day", "night"]}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
