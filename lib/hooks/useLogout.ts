"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/endpoints/auth";
import { useAuth } from "@/providers/AuthProvider";

/**
 * Logs out: best-effort server-side session invalidation, then always clears
 * the local session and redirects to login (even if the request fails).
 */
export function useLogout() {
  const { signOut } = useAuth();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => signOut(),
  });
}
