"use client";

import { Orb } from "@/components/ui/Orb";
import { Button } from "@/components/ui/Button";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { useCountdown } from "@/lib/hooks/useCountdown";

interface InviteWaitingProps {
  partnerName: string;
  expiresAt: string | null;
  onWithdraw: () => void;
  isWithdrawing: boolean;
}

/** Initiator view: invite sent, waiting for the partner to accept. */
export function InviteWaiting({ partnerName, expiresAt, onWithdraw, isWithdrawing }: InviteWaitingProps) {
  const { label } = useCountdown(expiresAt);

  return (
    <div className="animate-fade">
      <Orb size={96} className="mx-auto mb-[26px]" />

      <div className="mb-[18px] inline-flex items-center gap-2 rounded-full bg-sage-soft px-[14px] py-[6px]">
        <span className="h-[7px] w-[7px] animate-glow rounded-full bg-saged" />
        <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-saged">Invite sent</span>
      </div>

      <h1 className="mb-3 font-serif text-[33px] leading-[1.14] text-ink">Waiting for {partnerName} to accept</h1>
      <p className="mx-auto mb-[22px] max-w-[380px] text-[15.5px] leading-[1.65] text-muted">We&apos;ve let &nbsp;{partnerName} know you&apos;d like to talk. Your session begins the moment they join you.</p>

      <div className="mb-[18px] inline-flex items-center gap-[9px] rounded-full border border-line bg-panel px-[18px] py-[10px]">
        <span className="h-[9px] w-[9px] animate-spin rounded-full border-2 border-blush border-t-transparent" />
        <span className="text-[13.5px] text-ink">
          Expires in <strong className="font-bold tabular-nums">{label}</strong>
        </span>
      </div>

      <div className="mb-6 flex items-start gap-[9px] rounded-[14px] border border-line bg-panel2 px-4 py-[13px] text-left">
        <BandAidGlyph width={24} className="mt-[3px]" />
        <span className="text-[13.5px] leading-[1.55] text-muted">No band-aid is spent yet — one is only used the moment {partnerName} accepts.</span>
      </div>

      <Button variant="secondary" onClick={onWithdraw} isLoading={isWithdrawing} loadingText="Withdrawing…">
        Withdraw invite
      </Button>
    </div>
  );
}
