"use client";

import { cn } from "@/lib/utils/cn";

interface SessionHeaderProps {
  partnerName: string;
  counselorName: string;
  isPartnerOnline: boolean;
  remainingLabel: string;
  onLeave: () => void;
  onPause: () => void;
  canPause: boolean;
}

export function SessionHeader({
  partnerName,
  counselorName,
  isPartnerOnline,
  remainingLabel,
  onLeave,
  onPause,
  canPause,
}: SessionHeaderProps) {
  return (
    <div className="relative z-10 flex-none border-b border-line bg-bg">
    <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
      <button
        type="button"
        onClick={onLeave}
        title="Leave"
        className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-line2 text-muted transition-colors hover:bg-panel2 hover:text-ink"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <span className="relative grid h-[30px] w-[30px] flex-none place-items-center" aria-hidden="true">
        <span className="absolute -inset-[35%] animate-glow rounded-full bg-[radial-gradient(circle,var(--orb-glow),transparent_70%)] blur-[6px]" />
        <span className="h-full w-full animate-breathe rounded-full bg-[radial-gradient(circle_at_36%_30%,var(--orb1),var(--orb2)_72%)]" />
      </span>

      <div className="hidden min-w-0 flex-1 sm:block">
        <div className="truncate text-[14px] font-bold leading-[1.1] text-ink">
          A conversation with {partnerName}
        </div>
        <div className="mt-[2px] flex items-center gap-[6px]">
          <span
            className={cn(
              "h-[7px] w-[7px] rounded-full",
              isPartnerOnline ? "animate-glow bg-saged" : "bg-faint",
            )}
          />
          <span className="text-[12px] text-muted">
            {partnerName} is {isPartnerOnline ? "here" : "away"} · with {counselorName}
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-[7px] rounded-full border border-line bg-panel2 px-[13px] py-[7px]">
        <span className="h-[6px] w-[6px] rounded-full bg-saged" />
        <span className="text-[13px] font-bold tabular-nums text-ink">{remainingLabel}</span>
        <span className="text-[11px] text-muted">left</span>
      </div>

      <button
        type="button"
        onClick={onPause}
        disabled={!canPause}
        title="Pause"
        className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-line2 text-ink transition-colors hover:bg-panel2 disabled:opacity-50"
      >
        <span className="flex gap-[3px]">
          <span className="h-[13px] w-[3px] rounded-sm bg-current" />
          <span className="h-[13px] w-[3px] rounded-sm bg-current" />
        </span>
      </button>
    </div>
    </div>
  );
}
