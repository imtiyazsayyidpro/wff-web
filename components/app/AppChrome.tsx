"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/app/BottomNav";

/** The mobile bottom nav belongs on the persistent, partnered "main app"
 *  screens — not on immersive/flow screens (session, onboarding, invite, …). */
function showsBottomNav(pathname: string): boolean {
  return (
    pathname === "/home" ||
    pathname.startsWith("/store") ||
    pathname === "/memories" ||
    pathname === "/settings"
  );
}

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const withNav = showsBottomNav(pathname);

  return (
    <>
      {/* Pad for the fixed bottom nav on mobile only. */}
      <div className={withNav ? "pb-[72px] md:pb-0" : undefined}>{children}</div>
      {withNav && <BottomNav />}
    </>
  );
}
