"use client";

import { Button } from "@/components/ui/Button";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { usePresence } from "@/lib/hooks/usePresence";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { cn } from "@/lib/utils/cn";

interface InvitePromptProps {
  partnerName: string;
  partnerId: number | null;
  balance: number;
  expiresAt: string | null;
  onAccept: () => void;
  onDecline: () => void;
  isAccepting: boolean;
  isDeclining: boolean;
}

/** Invitee view: accept (spends a band-aid) or decline. */
export function InvitePrompt({
  partnerName,
  partnerId,
  balance,
  expiresAt,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
}: InvitePromptProps) {
  const isOnline = usePresence(partnerId);
  const { label } = useCountdown(expiresAt);

  return (
    <div className="animate-fade">
      <span className="relative mb-[22px] inline-block h-[78px] w-[78px]">
        <span className="grid h-[78px] w-[78px] place-items-center rounded-full bg-sage-soft font-serif text-[32px] text-saged">
          {(partnerName[0] ?? "?").toUpperCase()}
        </span>
        <span
          className={cn(
            "absolute bottom-[2px] right-[2px] h-[17px] w-[17px] rounded-full border-[3px] border-bg",
            isOnline ? "animate-glow bg-saged" : "bg-faint",
          )}
        />
      </span>

      <div className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.2em] text-blush">
        Session invite
      </div>
      <h1 className="mb-3 font-serif text-[33px] leading-[1.14] text-ink">
        {partnerName} would like to talk
      </h1>
      <p className="mx-auto mb-6 max-w-[370px] text-[15.5px] leading-[1.65] text-muted">
        A gentle, guided conversation — just the two of you, one honest turn at a time.
      </p>

      <div className="mb-[22px] flex items-center gap-[14px] rounded-[18px] border border-line bg-panel px-5 py-[18px] text-left">
        <BandAidGlyph width={30} />
        <div>
          <div className="mb-[3px] text-[14.5px] font-bold text-ink">
            Accepting uses 1 band-aid from your shared pool
          </div>
          <div className="text-[13px] leading-[1.5] text-muted">
            You&apos;ll have <strong className="font-bold text-ink">{Math.max(0, balance - 1)}</strong>{" "}
            left afterward · one full hour together
          </div>
        </div>
      </div>

      <div className="flex gap-[11px]">
        <Button
          className="flex-1"
          size="lg"
          onClick={onAccept}
          isLoading={isAccepting}
          loadingText="Starting…"
        >
          Accept &amp; begin
        </Button>
        <Button variant="secondary" size="lg" onClick={onDecline} isLoading={isDeclining} loadingText="…">
          Not now
        </Button>
      </div>
      <p className="mt-4 text-[12.5px] text-faint">
        Declining costs nothing · this invite expires in <span className="tabular-nums">{label}</span>
      </p>
    </div>
  );
}
