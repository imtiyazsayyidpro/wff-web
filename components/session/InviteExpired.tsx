"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/Button";
import { routes } from "@/config/routes";

interface InviteExpiredProps {
  role: "initiator" | "invitee";
  partnerName: string;
  onInviteAgain?: () => void;
  isReinviting?: boolean;
}

/** Shown when the invite window elapsed before it was accepted. */
export function InviteExpired({
  role,
  partnerName,
  onInviteAgain,
  isReinviting,
}: InviteExpiredProps) {
  if (role === "initiator") {
    return (
      <div className="animate-fade">
        <div className="mx-auto mb-6 h-[84px] w-[84px] rounded-full bg-[radial-gradient(circle_at_36%_30%,var(--orb1),var(--orb2)_72%)] opacity-50 grayscale" />
        <h1 className="mb-3 font-serif text-[31px] leading-[1.14] text-ink">Your invite expired</h1>
        <p className="mx-auto mb-[26px] max-w-[380px] text-[15.5px] leading-[1.65] text-muted">
          {partnerName} didn&apos;t get the chance to join in time. Nothing was spent — you can send
          it again whenever you&apos;re ready.
        </p>
        <div className="flex justify-center gap-[11px]">
          <Button size="lg" onClick={onInviteAgain} isLoading={isReinviting} loadingText="Sending…">
            Invite again
          </Button>
          <Link href={routes.home} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div className="mx-auto mb-[22px] grid h-16 w-16 place-items-center rounded-full bg-bg2">
        <span className="text-[24px] opacity-50">⏳</span>
      </div>
      <h1 className="mb-3 font-serif text-[30px] leading-[1.14] text-ink">
        This invite has expired
      </h1>
      <p className="mx-auto mb-[26px] max-w-[380px] text-[15.5px] leading-[1.65] text-muted">
        {partnerName}&apos;s invitation timed out before you could answer. Ask them to send a new one
        when you&apos;re both ready — nothing was spent.
      </p>
      <Link href={routes.home} className={buttonVariants({ size: "lg" })}>
        Back home
      </Link>
    </div>
  );
}
