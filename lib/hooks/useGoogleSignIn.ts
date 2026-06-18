"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { env } from "@/config/env";
import { loadGoogleIdentityServices, type GoogleTokenClient } from "@/lib/google";
import { useGoogleAuth } from "@/lib/hooks/useAuthMutations";
import { getErrorMessage } from "@/lib/utils/apiError";

/**
 * Drives a fully custom "Continue with Google" button via the GIS OAuth token
 * flow (`initTokenClient`). Clicking the button opens Google's account-picker
 * popup and yields an access token, which we exchange with `/auth/google`.
 *
 * This flow is independent of One Tap (`gsi/status`), so it isn't affected by
 * One Tap's dismissal cooldown. When NEXT_PUBLIC_GOOGLE_CLIENT_ID is unset,
 * `isConfigured` is false and the UI shows a gentle "coming soon".
 *
 * The token client is created up-front so the actual `requestAccessToken()`
 * call happens synchronously inside the click handler (avoiding popup blockers).
 */
export function useGoogleSignIn() {
  const isConfigured = Boolean(env.googleClientId);
  const googleAuth = useGoogleAuth();
  const clientRef = useRef<GoogleTokenClient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigured) return;
    let cancelled = false;

    loadGoogleIdentityServices()
      .then((google) => {
        if (cancelled) return;
        clientRef.current = google.accounts.oauth2.initTokenClient({
          client_id: env.googleClientId,
          scope: "openid email profile",
          callback: (response) => {
            if (response.error) {
              setError("Google sign-in didn't complete. Please try again.");
              return;
            }
            if (response.access_token) googleAuth.mutate(response.access_token);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load Google sign-in. Please try again.");
      });

    return () => {
      cancelled = true;
    };
  }, [isConfigured, googleAuth]);

  const signIn = useCallback(() => {
    setError(null);
    if (!isConfigured) {
      setError("Google sign-in isn't available yet. Please use your email for now.");
      return;
    }
    if (!clientRef.current) {
      setError("Google sign-in is still loading — try again in a moment.");
      return;
    }
    clientRef.current.requestAccessToken();
  }, [isConfigured]);

  return {
    signIn,
    isPending: googleAuth.isPending,
    error: error ?? (googleAuth.isError ? getErrorMessage(googleAuth.error) : null),
  };
}
