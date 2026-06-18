"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/endpoints/session";
import { queryKeys } from "@/lib/api/queryKeys";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useSessionMessages } from "@/lib/hooks/useSessionMessages";
import { useFeedbackStatus } from "@/lib/hooks/useFeedback";
import { useContinueSession } from "@/lib/hooks/useSessionActions";
import { useCounselorAvatars } from "@/lib/hooks/useAvatars";
import { routes } from "@/config/routes";
import type { SessionCloseReason } from "@/types/session";
import { Orb } from "@/components/ui/Orb";
import { Button, buttonVariants } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";

const REASON_COPY: Record<
  SessionCloseReason,
  { badge: string; title: string; sub: string }
> = {
  RESOLVED: {
    badge: "Resolved",
    title: "You found your way through.",
    sub: "You stayed on the same side tonight — that was always the whole point.",
  },
  TIME_LIMIT: {
    badge: "Time complete",
    title: "Your hour together is complete.",
    sub: "An hour well spent. Carry this gentleness with you into the days ahead.",
  },
  MESSAGE_CAP: {
    badge: "Wrapped up",
    title: "You've shared a lot tonight.",
    sub: "You both gave this real words. Let them settle before you pick it up again.",
  },
  PAUSED_EXPIRED: {
    badge: "Closed",
    title: "This session has closed.",
    sub: "It was paused for a while, so we gently wrapped it up. Nothing was lost.",
  },
  ABANDONED: {
    badge: "Ended",
    title: "This session ended.",
    sub: "The conversation closed early. Whenever you're ready, you can begin again.",
  },
};

export function SessionRecap({ sessionId }: { sessionId: number }) {
  const router = useRouter();
  const { data: partnership } = usePartnership();
  const { data: avatars } = useCounselorAvatars();
  const { messages } = useSessionMessages(sessionId);
  const feedback = useFeedbackStatus(sessionId);
  const continueSession = useContinueSession();

  const sessionQuery = useQuery({
    queryKey: queryKeys.session(sessionId),
    queryFn: () => sessionApi.get(sessionId),
  });
  const session = sessionQuery.data;

  // A recap is only meaningful for a closed session.
  useEffect(() => {
    if (session && session.status !== "CLOSED") router.replace(routes.home);
  }, [session, router]);

  if (sessionQuery.isLoading || !session) return <PageLoader />;
  if (session.status !== "CLOSED") return null;

  const reason: SessionCloseReason = session.closeReason ?? "RESOLVED";
  const copy = REASON_COPY[reason];
  const isAbandoned = reason === "ABANDONED";
  const counselorName =
    avatars?.find((a) => a.id === session.counselorAvatarId)?.name ?? "Your counselor";

  const closingNote = [...messages].reverse().find((m) => m.senderType === "MEDIATOR");
  const balance = partnership?.bandAidBalance ?? 0;

  const showFeedbackCta =
    feedback.data?.windowState === "open" && !feedback.data.mySubmitted;

  return (
    <main className="flex min-h-screen flex-col justify-center bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))] px-6 py-12 text-ink">
      <div className="mx-auto w-full max-w-[460px] text-center animate-rise">
        <Orb size={74} drift className="mx-auto mb-[22px]" />

        <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-line bg-panel px-[14px] py-[6px]">
          <span className="h-[6px] w-[6px] rounded-full bg-saged" />
          <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-muted">
            {copy.badge}
          </span>
        </div>

        <h1 className="mb-[10px] font-serif text-[32px] leading-[1.14] tracking-[-0.01em]">
          {copy.title}
        </h1>
        <p className="mx-auto max-w-[380px] text-[15px] leading-[1.6] text-muted">{copy.sub}</p>

        {!isAbandoned && closingNote && (
          <div className="mx-auto mt-[26px] max-w-[444px] rounded-[22px] border border-line bg-panel px-[26px] pb-6 pt-[26px] text-left shadow-[0_24px_54px_-34px_var(--shadow)]">
            <div className="mb-[14px] flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_36%_30%,var(--orb1),var(--orb2)_72%)]" />
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-faint">
                A closing note from {counselorName}
              </span>
            </div>
            <p className="font-serif text-[18px] leading-[1.5] text-ink">{closingNote.content}</p>
          </div>
        )}

        {isAbandoned && (
          <div className="mx-auto mt-[26px] max-w-[420px] rounded-[18px] border border-line bg-panel2 px-[22px] py-5 text-left">
            <p className="text-[14.5px] leading-[1.62] text-muted">
              The conversation closed before it could find a natural end. That happens — and
              there&apos;s no harm done. Begin again whenever it feels right.
            </p>
          </div>
        )}

        <div className="mx-auto mt-[30px] max-w-[444px]">
          {showFeedbackCta && (
            <Link
              href={routes.sessionFeedback(sessionId)}
              className="mb-3 flex items-center gap-3 rounded-[16px] border border-blush bg-blush-soft px-4 py-[14px] text-left transition-opacity hover:opacity-90"
            >
              <BandAidGlyph width={26} />
              <span className="flex-1 text-[13.5px] leading-[1.45] text-ink">
                Share a word on your first session — a free band-aid lands when you both do.
              </span>
              <span className="text-[15px] font-bold text-blushd">→</span>
            </Link>
          )}

          {!isAbandoned && balance > 0 && (
            <>
              <Button
                size="lg"
                fullWidth
                className="rounded-2xl"
                onClick={() =>
                  continueSession.mutate(sessionId, {
                    onSuccess: () => router.push(routes.sessionInvite),
                  })
                }
                isLoading={continueSession.isPending}
                loadingText="Starting…"
              >
                Continue in a new session
              </Button>
              <p className="mt-3 px-2 text-left text-[12.5px] leading-[1.5] text-muted">
                Carries this session&apos;s summary forward, so you pick up where you left off. One
                band-aid, spent only when your partner accepts.
              </p>
            </>
          )}

          {!isAbandoned && balance === 0 && (
            <div className="rounded-[18px] border border-line bg-panel p-[22px] text-center">
              <p className="mb-[5px] text-[14.5px] font-bold text-ink">You&apos;re out of band-aids</p>
              <p className="mb-4 text-[13.5px] leading-[1.6] text-muted">
                A new session needs one in your shared pool. Top up whenever you&apos;re ready — this
                session&apos;s summary will be waiting.
              </p>
              <Link href={routes.store} className={buttonVariants({ size: "lg", fullWidth: true })}>
                Top up band-aids
              </Link>
            </div>
          )}

          <div className="mt-5">
            <Link
              href={routes.home}
              className="text-[14px] font-semibold text-muted transition-colors hover:text-ink"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
