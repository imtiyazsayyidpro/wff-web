import type { SessionMessage } from "@/types/session";
import { Orb } from "@/components/ui/Orb";

interface MessageBubbleProps {
  message: SessionMessage;
  meId: number;
  partnerName: string;
  counselorName: string;
  counselorImageUrl?: string | null;
}

/** A single transcript entry, styled by sender (mediator / partner / you). */
export function MessageBubble({
  message,
  meId,
  partnerName,
  counselorName,
  counselorImageUrl,
}: MessageBubbleProps) {
  if (message.senderType === "MEDIATOR") {
    return (
      <div className="flex animate-rise flex-col items-center self-stretch py-2">
        <Orb size={52} imageUrl={counselorImageUrl} imageAlt={counselorName} />
        <span className="mb-[14px] mt-3 text-[10px] uppercase tracking-[0.24em] text-faint">
          {counselorName} · your counselor
        </span>
        <div
          className="relative max-w-[92%] rounded-[22px] border border-blush/25 px-7 py-[22px] text-center"
          style={{
            background:
              "radial-gradient(120% 130% at 50% -10%, var(--blush-soft), var(--panel2) 78%)",
            boxShadow:
              "0 14px 44px -18px var(--orb-glow), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <p className="font-serif text-[18.5px] leading-[1.66] tracking-[0.005em] text-ink">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  const isMine = message.senderUserId === meId;

  if (isMine) {
    return (
      <div className="max-w-[80%] animate-rise self-end">
        <div className="mb-[5px] mr-1 text-right text-[9.5px] uppercase tracking-[0.12em] text-faint">
          You
        </div>
        <div className="rounded-[18px_4px_18px_18px] bg-ink px-4 py-3 text-[14px] leading-[1.5] text-bg">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[80%] animate-rise self-start">
      <div className="mb-[5px] ml-1 text-[9.5px] uppercase tracking-[0.12em] text-faint">
        {partnerName}
      </div>
      <div className="rounded-[4px_18px_18px_18px] bg-blush-soft px-4 py-3 text-[14px] leading-[1.5] text-ink">
        {message.content}
      </div>
    </div>
  );
}
