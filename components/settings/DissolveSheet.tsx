"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface DissolveSheetProps {
  partnerName: string;
  balance: number;
  isDissolving: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DissolveSheet({
  partnerName,
  balance,
  isDissolving,
  onConfirm,
  onClose,
}: DissolveSheetProps) {
  const [acked, setAcked] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(20,15,24,0.4)] animate-fade"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] rounded-t-[26px] bg-bg px-6 pb-7 pt-[26px] shadow-[0_-24px_60px_-28px_var(--shadow)] animate-slideup"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Dissolve connection"
      >
        <div className="mx-auto mb-5 h-1 w-[42px] rounded-sm bg-line2" />
        <h3 className="mb-2 font-serif text-[23px] leading-[1.2]">
          End your connection with {partnerName}?
        </h3>
        <p className="mb-[18px] text-[14px] leading-[1.6] text-muted">
          This can&apos;t be undone. Take a breath, and read what happens — then decide what&apos;s
          right for you.
        </p>

        <div className="mb-[18px] flex flex-col gap-[13px] rounded-2xl border border-line bg-panel2 p-[18px]">
          {[
            <>
              The <strong className="font-bold">{balance} band-aid{balance === 1 ? "" : "s"}</strong> in
              your shared pool are released — they won&apos;t come back.
            </>,
            <>Any session you have open right now will end.</>,
            <>We&apos;ll let {partnerName} know gently, by email.</>,
          ].map((line, i) => (
            <div key={i} className="flex gap-[11px]">
              <span className="flex-none text-[15px] leading-[1.5] text-blushd">•</span>
              <span className="text-[13.5px] leading-[1.5] text-ink">{line}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAcked((v) => !v)}
          className="mb-[18px] flex w-full items-center gap-3 px-[2px] py-1 text-left"
        >
          <span
            className={cn(
              "grid h-[22px] w-[22px] flex-none place-items-center rounded-[7px] border-[1.5px] text-[13px] font-bold",
              acked ? "border-blushd bg-blushd text-white" : "border-line2 text-transparent",
            )}
          >
            ✓
          </span>
          <span className="text-[13.5px] leading-[1.45] text-ink">
            I understand this is permanent, and the band-aids won&apos;t return.
          </span>
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={!acked || isDissolving}
          className="w-full rounded-[15px] bg-blushd py-4 text-[15.5px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isDissolving ? "Ending…" : "End our connection"}
        </button>
        <div className="mt-3 text-center">
          <button type="button" onClick={onClose} className="text-[13.5px] font-semibold text-muted hover:text-ink">
            Not now — keep our connection
          </button>
        </div>
      </div>
    </div>
  );
}
