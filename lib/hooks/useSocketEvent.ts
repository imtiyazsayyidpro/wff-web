"use client";

import { useEffect, useRef } from "react";
import { useSocket } from "@/providers/SocketProvider";

/**
 * Subscribe to a socket event for the lifetime of the calling component.
 * The handler is kept in a ref so updating it doesn't re-subscribe.
 */
export function useSocketEvent<T = unknown>(
  event: string,
  handler: (payload: T) => void,
) {
  const { socket } = useSocket();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!socket) return;
    const listener = (payload: T) => handlerRef.current(payload);
    socket.on(event, listener);
    return () => {
      socket.off(event, listener);
    };
  }, [socket, event]);
}
