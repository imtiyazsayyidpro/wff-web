"use client";

import { useEffect, useState } from "react";

function secondsUntil(targetIso: string | null): number {
  if (!targetIso) return 0;
  const diffMs = new Date(targetIso).getTime() - Date.now();
  return Math.max(0, Math.floor(diffMs / 1000));
}

/** Formats seconds as "M:SS". */
export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Live countdown to an ISO timestamp. Ticks each second and reports when the
 * target has passed.
 */
export function useCountdown(targetIso: string | null) {
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(targetIso));

  useEffect(() => {
    setSecondsLeft(secondsUntil(targetIso));
    if (!targetIso) return;
    const timer = setInterval(() => setSecondsLeft(secondsUntil(targetIso)), 1000);
    return () => clearInterval(timer);
  }, [targetIso]);

  return {
    secondsLeft,
    label: formatClock(secondsLeft),
    isExpired: Boolean(targetIso) && secondsLeft <= 0,
  };
}
