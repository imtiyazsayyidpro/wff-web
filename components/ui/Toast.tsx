"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
  /** Auto-dismiss after this many ms (default 3000). */
  duration?: number;
}

/** A single transient toast pinned near the bottom of its positioned parent. */
export function Toast({ message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[88px] z-[60] flex justify-center px-5 md:bottom-7">
      <div className="max-w-[86%] rounded-full bg-ink px-[22px] py-3 text-center text-[13.5px] font-semibold text-bg shadow-[0_18px_44px_-18px_var(--shadow)] animate-rise">
        {message}
      </div>
    </div>
  );
}
