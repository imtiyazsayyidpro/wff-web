"use client";

import { useCallback, useRef, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents } from "@/lib/socket/events";

export interface FloatingHeart {
  id: number;
  left: number;
  /** Size multiplier so the cluster feels organic rather than uniform. */
  scale: number;
  /** Horizontal drift, in px, applied across the rise. */
  drift: number;
  /** Float duration in seconds. */
  duration: number;
}

const LIFETIME_MS = 3400;

/**
 * Little floating hearts. Spawns one on every received HEART event and one
 * locally whenever we send, then auto-clears each after its animation.
 */
export function useHearts() {
  const { socket } = useSocket();
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const nextId = useRef(0);

  const spawn = useCallback(() => {
    const id = ++nextId.current;
    const left = 14 + Math.random() * 68; // % from the left
    const scale = 0.8 + Math.random() * 0.6; // 0.8–1.4
    const drift = (Math.random() - 0.5) * 70; // ±35px sway
    const duration = 2.8 + Math.random() * 0.9; // 2.8–3.7s
    setHearts((prev) => [...prev, { id, left, scale, drift, duration }]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), LIFETIME_MS);
  }, []);

  useSocketEvent(SocketEvents.HEART, () => spawn());

  const sendHeart = useCallback(() => {
    spawn();
    socket?.emit(SocketEvents.HEART);
  }, [socket, spawn]);

  return { hearts, sendHeart };
}
