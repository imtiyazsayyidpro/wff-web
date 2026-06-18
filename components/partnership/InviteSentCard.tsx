"use client";

import { useCancelRequest, useInvitePartner } from "@/lib/hooks/usePartnership";
import type { ConnectionRequest } from "@/types/partnership";
import { Card } from "@/components/ui/Card";
import { Orb } from "@/components/ui/Orb";
import { Button } from "@/components/ui/Button";

/** Shown while an outgoing invitation is pending acceptance. */
export function InviteSentCard({ request }: { request: ConnectionRequest }) {
  const cancel = useCancelRequest();
  const resend = useInvitePartner();

  return (
    <Card elevated className="px-[30px] py-[38px] text-center animate-fade">
      <Orb size={74} className="mx-auto mb-[22px]" />
      <h2 className="mb-[10px] font-serif text-[25px] text-ink">
        Your invitation is on its way
      </h2>
      <p className="mx-auto mb-[18px] max-w-[380px] text-[15px] leading-[1.6] text-muted">
        We&apos;ve emailed <strong className="text-ink">{request.toEmail}</strong>. The moment they
        accept, the two of you can begin together.
      </p>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-[9px] text-[13.5px] font-semibold text-saged">
        <span className="h-[7px] w-[7px] animate-glow rounded-full bg-saged" />
        Waiting for them to accept
      </div>
      <div className="flex justify-center gap-[10px]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => cancel.mutate(request.id)}
          isLoading={cancel.isPending}
          loadingText="Cancelling…"
        >
          Cancel invitation
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => resend.mutate(request.toEmail)}
          isLoading={resend.isPending}
          loadingText="Resending…"
        >
          Resend
        </Button>
      </div>
    </Card>
  );
}
