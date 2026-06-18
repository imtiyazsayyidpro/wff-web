import type { ReactNode } from "react";
import { RequireAuth, OnboardingGate } from "@/components/auth/AuthGuards";
import { SocketProvider } from "@/providers/SocketProvider";
import { LiveSync } from "@/components/app/LiveSync";
import { AppChrome } from "@/components/app/AppChrome";

/**
 * Authenticated app area: gate on auth + onboarding, open the realtime socket,
 * keep caches in sync with server events, and add the mobile bottom nav.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <OnboardingGate>
        <SocketProvider>
          <LiveSync>
            <AppChrome>{children}</AppChrome>
          </LiveSync>
        </SocketProvider>
      </OnboardingGate>
    </RequireAuth>
  );
}
