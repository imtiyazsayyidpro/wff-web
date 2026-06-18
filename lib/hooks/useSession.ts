"use client";

import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/endpoints/session";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

/** The caller's current live/pending session (null when none). */
export function useCurrentSession() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.currentSession,
    queryFn: () => sessionApi.getCurrent(),
    enabled: isAuthenticated,
  });
}

/** All sessions for the partnership (used to detect history on the dashboard). */
export function useSessions() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionApi.list(),
    enabled: isAuthenticated,
  });
}
