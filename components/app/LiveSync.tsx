"use client";

import { type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents } from "@/lib/socket/events";
import { queryKeys } from "@/lib/api/queryKeys";

/**
 * Bridges socket events to React Query: when the server reports a band-aid
 * change, avatar change, or session lifecycle event, refetch the affected
 * queries so every open screen stays current.
 */
export function LiveSync({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const invalidatePartnership = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.partnership });
  const invalidateCurrentSession = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.currentSession });
  const invalidateFeedback = () =>
    queryClient.invalidateQueries({ queryKey: ["feedback"] });

  useSocketEvent(SocketEvents.BANDAID_DEDUCTED, invalidatePartnership);
  useSocketEvent(SocketEvents.BANDAID_GRANTED, () => {
    invalidatePartnership();
    invalidateFeedback();
  });
  useSocketEvent(SocketEvents.AVATAR_CHANGED, invalidatePartnership);

  useSocketEvent(SocketEvents.SESSION_INVITE, invalidateCurrentSession);
  useSocketEvent(SocketEvents.SESSION_ACCEPTED, invalidateCurrentSession);
  useSocketEvent(SocketEvents.SESSION_DECLINED, invalidateCurrentSession);
  useSocketEvent(SocketEvents.SESSION_STARTED, invalidateCurrentSession);
  useSocketEvent(SocketEvents.SESSION_CLOSED, invalidateCurrentSession);
  useSocketEvent(SocketEvents.FEEDBACK_INVITED, () => {
    invalidatePartnership();
    invalidateFeedback();
  });

  return <>{children}</>;
}
