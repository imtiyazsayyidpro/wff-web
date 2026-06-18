"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

export type Turn = "me" | "partner" | "counselor";

const CHAR_LIMIT = 4000;
const WARN_AT = 3700;
const MAX_TEXTAREA_HEIGHT = 148; // px — grows up to here, then scrolls

/** A soft, rounded heart (matches the floating hearts). */
const HEART_PATH =
  "M12 21.6c-.5 0-.97-.18-1.34-.5C6.2 17.2 2 13.66 2 8.9 2 5.96 4.28 3.7 7.2 3.7c1.86 0 3.5.96 4.8 2.6 1.3-1.64 2.94-2.6 4.8-2.6C19.72 3.7 22 5.96 22 8.9c0 4.76-4.2 8.3-8.66 12.2-.37.32-.84.5-1.34.5z";

function HeartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="wf-heart-btn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orb1)" />
          <stop offset="55%" stopColor="var(--blush)" />
          <stop offset="100%" stopColor="var(--blushd)" />
        </linearGradient>
      </defs>
      <path d={HEART_PATH} fill="url(#wf-heart-btn)" />
    </svg>
  );
}

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onHeart: () => void;
  turn: Turn;
  partnerName: string;
  counselorName: string;
}

export function Composer({
  value,
  onChange,
  onSend,
  onHeart,
  turn,
  partnerName,
  counselorName,
}: ComposerProps) {
  const canSend = turn === "me";
  const trimmed = value.trim();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow the textarea with its content, up to a cap, then let it scroll.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [value]);
  const showCounter = value.length >= WARN_AT;
  const remaining = CHAR_LIMIT - value.length;

  const placeholder = canSend
    ? "Take your time. Say it gently…"
    : turn === "partner"
      ? `Waiting for ${partnerName}…`
      : `${counselorName} is responding…`;

  return (
    <div className="relative z-10 flex-none border-t border-line bg-bg">
    <div className="mx-auto w-full max-w-2xl px-4 pb-4 pt-[11px]">
      <div className="mb-[10px] flex items-center justify-between gap-[10px] px-1">
        <div className="flex items-center gap-2">
          {turn === "me" && (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-blush shadow-[0_0_0_4px_var(--blush-soft)]" />
              <span className="text-[12.5px] font-semibold text-blushd">It&apos;s your turn</span>
            </>
          )}
          {turn === "partner" && (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-saged" />
              <span className="text-[12.5px] font-semibold text-saged">
                {partnerName} is taking their turn
              </span>
            </>
          )}
          {turn === "counselor" && (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--orb2)]" />
              <span className="text-[12.5px] font-semibold text-muted">
                {counselorName} is responding
              </span>
            </>
          )}
        </div>
        {showCounter && (
          <span
            className={cn(
              "text-[11.5px] tabular-nums",
              remaining <= 0 ? "font-bold text-blushd" : "text-muted",
            )}
          >
            {remaining} left
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex items-end gap-[6px] rounded-[24px] border border-line2 py-[6px] pl-2 pr-[6px]",
          canSend ? "bg-panel" : "bg-panel2",
        )}
      >
        <button
          type="button"
          onClick={onHeart}
          title="Send a heart"
          className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full transition-colors hover:bg-blush-soft"
        >
          <HeartIcon />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          onChange={(e) => onChange(e.target.value.slice(0, CHAR_LIMIT))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (canSend && trimmed) onSend();
            }
          }}
          disabled={!canSend}
          maxLength={CHAR_LIMIT}
          placeholder={placeholder}
          className="min-w-0 flex-1 resize-none self-center bg-transparent py-[8px] text-[14px] leading-normal text-ink outline-none placeholder:text-faint disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend || !trimmed}
          title="Send"
          className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
      <div className="mt-[9px] text-center text-[10.5px] text-faint">
        A supportive space — not therapy or a substitute for professional care.
      </div>
    </div>
    </div>
  );
}
