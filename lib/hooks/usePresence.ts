"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents, type PresencePayload } from "@/lib/socket/events";

/**
 * Tracks whether a specific partner is currently online.
 *
 * Two parts:
 *  1. An initial snapshot requested via acknowledgement once we're connected
 *     (reliable — unlike a pushed event, an ack can't arrive before we listen).
 *  2. Live PRESENCE events for ongoing connect/disconnect changes.
 */
export function usePresence(partnerUserId: number | null | undefined) {
  const { socket, isConnected } = useSocket();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected || partnerUserId == null) return;
    socket.emit(SocketEvents.REQUEST_PRESENCE, (response?: { online: number[] }) => {
      if (response?.online) setIsOnline(response.online.includes(partnerUserId));
    });
  }, [socket, isConnected, partnerUserId]);

  useSocketEvent<PresencePayload>(SocketEvents.PRESENCE, (payload) => {
    if (partnerUserId != null && payload.userId === partnerUserId) {
      setIsOnline(payload.online);
    }
  });

  return isOnline;
}
