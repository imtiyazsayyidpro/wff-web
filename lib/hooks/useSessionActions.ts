"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/endpoints/session";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Session } from "@/types/session";

/** Mutations for the session invite lifecycle. Each keeps the cached
 *  `currentSession` (and band-aid balance) in sync. */

export function useInitiateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sessionApi.initiate(),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
    },
  });
}

export function useAcceptSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.accept(id),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
      queryClient.invalidateQueries({ queryKey: queryKeys.partnership });
    },
  });
}

export function useDeclineSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.decline(id),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.currentSession, null);
    },
  });
}

export function useCancelSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.cancel(id),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.currentSession, null);
    },
  });
}

export function usePauseSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.pause(id),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
    },
  });
}

export function useResumeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.resume(id),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
    },
  });
}

export function useCloseSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sessionApi.close(id),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
    },
  });
}

export function useContinueSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (closedSessionId: number) => sessionApi.continue(closedSessionId),
    onSuccess: (session: Session) => {
      queryClient.setQueryData(queryKeys.currentSession, session);
    },
  });
}

export function useSendMessage(sessionId: number | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sessionApi.sendMessage(sessionId!, content),
    // Messages arrive over the socket; here we just sync the turn/status that
    // the mediator's reply produced.
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.currentSession, result.session);
    },
  });
}
