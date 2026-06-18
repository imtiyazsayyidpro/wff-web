"use client";

import { cn } from "@/lib/utils/cn";

interface PartnerPresenceCardProps {
  partnerName: string;
  isOnline: boolean;
}

export function PartnerPresenceCard({ partnerName, isOnline }: PartnerPresenceCardProps) {
  return (
    <div className="flex items-center gap-[14px] rounded-[18px] border border-line bg-panel px-[18px] py-4">
      <span className="relative h-12 w-12 flex-none">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft font-serif text-[20px] text-saged">
          {(partnerName[0] ?? "?").toUpperCase()}
        </span>
        <span
          className={cn(
            "absolute -bottom-px -right-px h-[14px] w-[14px] rounded-full border-[2.5px] border-panel",
            isOnline ? "animate-glow bg-saged" : "bg-faint",
          )}
        />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-serif text-[18px] leading-[1.1] text-ink">{partnerName}</div>
        <div className="mt-[2px] text-[13px] text-muted">
          {isOnline ? "Here now" : "Away right now"}
        </div>
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-faint">Partner</span>
    </div>
  );
}
