"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAcceptRequest } from "@/lib/hooks/usePartnership";
import type { ConnectionRequest } from "@/types/partnership";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/ui/Avatar";
import { Button, buttonVariants } from "@/components/ui/Button";

/** "They already invited you" — offers to accept their pending invitation. */
export function ReciprocalBanner({ request }: { request: ConnectionRequest }) {
  const router = useRouter();
  const accept = useAcceptRequest();
  const inviter = request.fromUser;
  const name = inviter.name ?? inviter.email;

  return (
    <div className="relative mb-5 overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,var(--sage-soft),var(--blush-soft))] p-[30px] animate-fade">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--orb-glow),transparent_55%)]"
      />
      <div className="relative">
        <div className="mb-[14px] inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em] text-saged">
          <span className="h-[7px] w-[7px] rounded-full bg-saged" />
          Good news
        </div>
        <div className="mb-[14px] flex items-center gap-[13px]">
          <Avatar name={inviter.name} email={inviter.email} size={46} className="bg-panel" />
          <div>
            <h2 className="font-serif text-[22px] text-ink">{name} already invited you</h2>
            <p className="text-[13.5px] text-muted">{inviter.email} is waiting for you</p>
          </div>
        </div>
        <p className="mb-5 max-w-[400px] text-[14.5px] leading-[1.6] text-ink/85">
          There&apos;s no need to send your own — just accept theirs and the two of you will be
          connected.
        </p>
        <div className="flex gap-[11px]">
          <Button
            className="flex-1"
            size="lg"
            onClick={() =>
              accept.mutate(request.id, { onSuccess: () => router.push(routes.connected) })
            }
            isLoading={accept.isPending}
            loadingText="Connecting…"
          >
            Accept &amp; connect
          </Button>
          <Link href={routes.requests} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            View request
          </Link>
        </div>
      </div>
    </div>
  );
}
