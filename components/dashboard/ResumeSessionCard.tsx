"use client";

import type { Session } from "@/types/session";

interface ResumeSessionCardProps {
  session: Session;
  currentUserId: number;
  partnerName: string;
  onOpen: () => void;
}

/** The priority card at the top of the dashboard when a session is live,
 *  paused, or a pending invite — adapts its copy to the situation. */
export function ResumeSessionCard({
  session,
  currentUserId,
  partnerName,
  onOpen,
}: ResumeSessionCardProps) {
  const initiatedByMe = session.initiatedByUserId === currentUserId;

  const content = (() => {
    switch (session.status) {
      case "ACTIVE":
        return {
          badge: "In session",
          title: "Your conversation is underway",
          sub: `You and ${partnerName} are in a session with your counselor. Step back in whenever you're ready.`,
          cta: "Return to session",
        };
      case "PAUSED":
        return {
          badge: "Paused",
          title: "Your session is paused",
          sub: "The clock is frozen. Pick up exactly where the two of you left off.",
          cta: "Resume session",
        };
      case "PENDING_ACCEPTANCE":
        return initiatedByMe
          ? {
              badge: "Invite sent",
              title: `Waiting for ${partnerName} to accept`,
              sub: "Your session begins the moment they join you. No band-aid is spent until then.",
              cta: "View invite",
            }
          : {
              badge: "Invite for you",
              title: `${partnerName} would like to talk`,
              sub: "A gentle, guided conversation — just the two of you, one honest turn at a time.",
              cta: "Respond",
            };
      default:
        return null;
    }
  })();

  if (!content) return null;

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,var(--sage-soft),var(--blush-soft))] px-[26px] py-6 animate-rise">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,var(--orb-glow),transparent_56%)]"
      />
      <div className="relative">
        <div className="mb-[15px] inline-flex items-center gap-2 rounded-full bg-panel px-[13px] py-[5px]">
          <span className="h-[7px] w-[7px] animate-glow rounded-full bg-saged" />
          <span className="text-[11px] font-bold uppercase tracking-[0.09em] text-saged">
            {content.badge}
          </span>
        </div>
        <h2 className="mb-[9px] font-serif text-[25px] leading-[1.15] text-ink">
          {content.title}
        </h2>
        <p className="mb-5 max-w-[420px] text-[14.5px] leading-[1.6] text-ink/[0.78]">
          {content.sub}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-[10px] rounded-full bg-ink px-[26px] py-[14px] text-[15px] font-bold text-bg transition-opacity hover:opacity-90"
        >
          {content.cta} <span className="text-[16px]">→</span>
        </button>
      </div>
    </div>
  );
}
