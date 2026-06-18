"use client";

import { useCallback, useRef, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents, type TypingPayload } from "@/lib/socket/events";

/**
 * Two-way typing indicator: reports whether the partner is typing, and gives
 * an `emitTyping` to broadcast our own state. Includes a safety timeout so a
 * dropped "stopped typing" event doesn't leave the dots stuck on.
 */
export function useTypingIndicator(partnerId: number | null) {
  const { socket } = useSocket();
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useSocketEvent<TypingPayload>(SocketEvents.TYPING, (payload) => {
    if (partnerId == null || payload.userId !== partnerId) return;
    setIsPartnerTyping(payload.isTyping);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    if (payload.isTyping) {
      clearTimer.current = setTimeout(() => setIsPartnerTyping(false), 5000);
    }
  });

  const emitTyping = useCallback(
    (isTyping: boolean) => socket?.emit(SocketEvents.TYPING, { isTyping }),
    [socket],
  );

  return { isPartnerTyping, emitTyping };
}
