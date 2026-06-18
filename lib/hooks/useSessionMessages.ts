"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/endpoints/session";
import { queryKeys } from "@/lib/api/queryKeys";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents } from "@/lib/socket/events";
import type { SessionMessage } from "@/types/session";

/**
 * The transcript for a session: loads history once, then appends MESSAGE_NEW
 * events live (deduping by id, since the sender also receives their own echo).
 */
export function useSessionMessages(sessionId: number | null) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: sessionId ? queryKeys.sessionMessages(sessionId) : ["session", "messages", "none"],
    queryFn: () => sessionApi.listMessages(sessionId!),
    enabled: Boolean(sessionId),
  });

  useSocketEvent<SessionMessage>(SocketEvents.MESSAGE_NEW, (message) => {
    if (!sessionId) return;
    queryClient.setQueryData<SessionMessage[]>(
      queryKeys.sessionMessages(sessionId),
      (prev = []) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]),
    );
  });

  return { messages: query.data ?? [], isLoading: query.isLoading };
}
