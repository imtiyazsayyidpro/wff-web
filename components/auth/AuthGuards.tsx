"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useProfile } from "@/lib/hooks/useProfile";
import { routes } from "@/config/routes";
import { Orb } from "@/components/ui/Orb";

/** Full-screen breathing-orb placeholder shown while auth state resolves. */
function AuthLoading() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <Orb size={64} />
    </div>
  );
}

/**
 * Gate for authenticated areas: waits for hydration, then either renders
 * children or bounces unauthenticated visitors to login.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) router.replace(routes.login);
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated) return <AuthLoading />;
  return <>{children}</>;
}

/**
 * For auth screens (login/register/…): sends already-signed-in users into the
 * app instead of showing them a login form again.
 *
 * Exempts the verify-email page: it legitimately signs a user in via the
 * emailed link and drives its own navigation to the welcome screen.
 */
export function RedirectIfAuthenticated({
  children,
  to = routes.home,
}: {
  children: ReactNode;
  to?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isReady, isAuthenticated } = useAuth();
  const exempt = pathname === routes.verifyEmail;

  useEffect(() => {
    if (isReady && isAuthenticated && !exempt) router.replace(to);
  }, [isReady, isAuthenticated, exempt, router, to]);

  if (!isReady) return <AuthLoading />;
  if (isAuthenticated && !exempt) return null;
  return <>{children}</>;
}

/**
 * Within the app: forces users who haven't finished onboarding to do so first.
 * The onboarding screen itself and the post-verify welcome screen are exempt.
 */
export function OnboardingGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile, isLoading } = useProfile();
  const exempt = pathname === routes.onboarding || pathname === routes.entered;
  const mustOnboard = Boolean(profile && !profile.onboardingCompletedAt) && !exempt;

  useEffect(() => {
    if (mustOnboard) router.replace(routes.onboarding);
  }, [mustOnboard, router]);

  if (isLoading || mustOnboard) return <AuthLoading />;
  return <>{children}</>;
}
