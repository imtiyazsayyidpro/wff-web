"use client";

import { useRouter } from "next/navigation";
import {
  useAcceptRequest,
  useCancelRequest,
  useDeclineRequest,
} from "@/lib/hooks/usePartnership";
import type { ConnectionRequest } from "@/types/partnership";
import { relativeTime } from "@/lib/utils/time";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

/** An invitation someone sent to the current user. */
export function IncomingRequestRow({ request }: { request: ConnectionRequest }) {
  const router = useRouter();
  const accept = useAcceptRequest();
  const decline = useDeclineRequest();
  const { fromUser } = request;
  const name = fromUser.name ?? fromUser.email;

  return (
    <div className="flex items-center gap-[14px] rounded-2xl border border-line bg-panel px-[18px] py-4">
      <Avatar name={fromUser.name} email={fromUser.email} size={44} />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-bold text-ink">{name}</div>
        <div className="truncate text-[13px] text-muted">
          {fromUser.email} · invited you {relativeTime(request.createdAt)}
        </div>
      </div>
      <div className="flex flex-none items-center gap-2">
        <Button
          size="sm"
          onClick={() =>
            accept.mutate(request.id, { onSuccess: () => router.push(routes.connected) })
          }
          isLoading={accept.isPending}
          loadingText="…"
        >
          Accept
        </Button>
        <button
          type="button"
          aria-label="Decline"
          onClick={() => decline.mutate(request.id)}
          disabled={decline.isPending}
          className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line2 text-[15px] text-muted transition-colors hover:bg-blush-soft hover:text-blushd disabled:opacity-60"
        >
          {decline.isPending ? <Spinner size={14} /> : "×"}
        </button>
      </div>
    </div>
  );
}

/** An invitation the current user sent that's still pending. */
export function OutgoingRequestRow({ request }: { request: ConnectionRequest }) {
  const cancel = useCancelRequest();

  return (
    <div className="flex items-center gap-[14px] rounded-2xl border border-line bg-panel px-[18px] py-4">
      <Avatar name={request.toUser?.name} email={request.toEmail} size={44} tone="muted" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14.5px] font-bold text-ink">{request.toEmail}</div>
        <div className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-saged">
          <span className="h-[6px] w-[6px] animate-glow rounded-full bg-saged" />
          Sent {relativeTime(request.createdAt)} · pending
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="flex-none"
        onClick={() => cancel.mutate(request.id)}
        isLoading={cancel.isPending}
        loadingText="…"
      >
        Cancel
      </Button>
    </div>
  );
}
