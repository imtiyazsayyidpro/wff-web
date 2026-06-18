"use client";

import { useEffect, useState } from "react";
import type { Session } from "@/types/session";

/**
 * Live remaining-seconds counter. Ticks down only while ACTIVE, and reseeds
 * from the server whenever the session's remaining time or status changes
 * (e.g. after a pause/resume refetch).
 */
export function useSessionTimer(session: Session | null | undefined) {
  const seed = session?.remainingActiveSeconds ?? 0;
  const status = session?.status;
  const [remaining, setRemaining] = useState(seed);

  useEffect(() => {
    setRemaining(seed);
  }, [seed, status]);

  useEffect(() => {
    if (status !== "ACTIVE") return;
    const timer = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(timer);
  }, [status]);

  return remaining;
}
