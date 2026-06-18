"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/Button";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { routes } from "@/config/routes";

interface InviteLowBalanceProps {
  partnerName: string;
  onDecline: () => void;
  isDeclining: boolean;
}

/** Invitee view when the shared pool is empty — can't accept without a band-aid. */
export function InviteLowBalance({ partnerName, onDecline, isDeclining }: InviteLowBalanceProps) {
  return (
    <div className="animate-fade">
      <BandAidGlyph width={40} faded className="mb-5" />
      <h1 className="mb-3 font-serif text-[30px] leading-[1.14] text-ink">
        You&apos;ll need a band-aid to accept
      </h1>
      <p className="mx-auto mb-[26px] max-w-[380px] text-[15.5px] leading-[1.65] text-muted">
        Your shared pool is empty right now. Add one and you can jump straight into the session with{" "}
        {partnerName} — no need to start over.
      </p>
      <div className="flex justify-center gap-[11px]">
        <Link href={routes.store} className={buttonVariants({ size: "lg" })}>
          Add band-aids
        </Link>
        <Button variant="secondary" size="lg" onClick={onDecline} isLoading={isDeclining} loadingText="…">
          Not now
        </Button>
      </div>
    </div>
  );
}
