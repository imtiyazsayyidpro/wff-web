"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useCurrentSession, useSessions } from "@/lib/hooks/useSession";
import { useCounselorAvatars } from "@/lib/hooks/useAvatars";
import { useInitiateSession } from "@/lib/hooks/useSessionActions";
import { useFeedbackStatus } from "@/lib/hooks/useFeedback";
import { usePresence } from "@/lib/hooks/usePresence";
import { getErrorMessage } from "@/lib/utils/apiError";
import { timeGreeting } from "@/lib/utils/greeting";
import { formatDate } from "@/lib/utils/time";
import { routes } from "@/config/routes";
import { PageLoader } from "@/components/ui/PageLoader";
import { Toast } from "@/components/ui/Toast";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SideDrawer } from "@/components/dashboard/SideDrawer";
import { CounselorAnchor } from "@/components/dashboard/CounselorAnchor";
import { ResumeSessionCard } from "@/components/dashboard/ResumeSessionCard";
import { PartnerPresenceCard } from "@/components/dashboard/PartnerPresenceCard";
import { BandAidPoolCard } from "@/components/dashboard/BandAidPoolCard";
import { AvatarPickerModal } from "@/components/dashboard/AvatarPickerModal";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";

const ACTIVE_STATUSES = ["ACTIVE", "PAUSED", "PENDING_ACCEPTANCE"] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: partnership, isLoading: pLoading } = usePartnership();
  const { data: session, isLoading: sLoading } = useCurrentSession();
  const { data: sessions } = useSessions();
  const { data: avatars } = useCounselorAvatars();
  const initiate = useInitiateSession();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [toast, setToast] = useState("");

  const partnerId = partnership?.partner?.id ?? null;
  const isPartnerOnline = usePresence(partnerId);

  const feedbackSessionId = partnership?.feedbackSessionId ?? null;
  const { data: feedback } = useFeedbackStatus(feedbackSessionId);
  // Surface the feedback prompt the whole time the window is open — including
  // after you've shared, so you can get back to the "waiting on partner" card.
  const showFeedbackBanner = Boolean(feedbackSessionId) && feedback?.windowState === "open";
  const feedbackWaiting = Boolean(feedback?.mySubmitted && !feedback?.partnerSubmitted);

  useEffect(() => {
    if (!pLoading && !partnership) router.replace(routes.invite);
  }, [pLoading, partnership, router]);

  if (pLoading || sLoading) return <PageLoader />;
  if (!partnership) return null;

  const partnerName = partnership.partner?.name ?? partnership.partner?.email ?? "your partner";
  const balance = partnership.bandAidBalance;
  const selectedAvatar =
    avatars?.find((a) => a.id === partnership.counselorAvatarId) ?? avatars?.[0] ?? null;

  const hasSession = Boolean(session && ACTIVE_STATUSES.includes(session.status as never));
  // Sessions come newest-first, so the first CLOSED one is the most recent.
  const lastClosed = (sessions ?? []).find((s) => s.status === "CLOSED") ?? null;

  const openSession = () => {
    if (!session) return;
    router.push(session.status === "PENDING_ACCEPTANCE" ? routes.sessionInvite : routes.session);
  };

  const startSession = () => {
    initiate.mutate(undefined, {
      onSuccess: () => router.push(routes.sessionInvite),
      onError: (error) => setToast(getErrorMessage(error)),
    });
  };

  const feedbackBanner = showFeedbackBanner && feedbackSessionId && (
    <Link
      href={routes.sessionFeedback(feedbackSessionId)}
      className="flex items-center gap-3 rounded-[18px] border border-blush bg-blush-soft px-[18px] py-[14px] transition-opacity hover:opacity-90 animate-rise"
    >
      {feedbackWaiting ? (
        <>
          <span className="flex flex-none gap-1" aria-hidden="true">
            {[0, 0.15, 0.3].map((delay, i) => (
              <span
                key={i}
                className="inline-block h-[6px] w-[6px] rounded-full bg-blushd"
                style={{ animation: "wf-glow 1.1s ease-in-out infinite", animationDelay: `${delay}s` }}
              />
            ))}
          </span>
          <span className="flex-1 text-[13.5px] leading-[1.45] text-ink">
            Thanks for sharing — just waiting on {partnerName}. Your free band-aid lands the moment
            they add theirs.
          </span>
        </>
      ) : (
        <>
          <BandAidGlyph width={26} />
          <span className="flex-1 text-[13.5px] leading-[1.45] text-ink">
            Share a word on your first session — a free band-aid lands when you both do.
          </span>
        </>
      )}
      <span className="text-[15px] font-bold text-blushd">→</span>
    </Link>
  );

  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <DashboardTopBar balance={balance} onOpenMenu={() => setDrawerOpen(true)} />

      <div className="mx-auto max-w-[560px] px-[22px] py-7 lg:max-w-[960px] lg:px-8 lg:py-10">
        {/* Priority + announcements span the full width */}
        {(hasSession && session) || feedbackBanner ? (
          <div className="mb-4 flex flex-col gap-4">
            {hasSession && session && (
              <ResumeSessionCard
                session={session}
                currentUserId={user?.id ?? -1}
                partnerName={partnerName}
                onOpen={openSession}
              />
            )}
            {feedbackBanner}
          </div>
        ) : null}

        {/* hero — the counselor and the primary action. Full-width when a
            session card sits above it, otherwise a calm centred column. */}
        <div className={hasSession ? "w-full" : "mx-auto max-w-[620px]"}>
          <CounselorAnchor
            counselorName={selectedAvatar?.name ?? null}
            counselorImageUrl={selectedAvatar?.imageUrl ?? null}
            userName={user?.name ?? null}
            greeting={timeGreeting()}
            onChangeAvatar={() => setPickerOpen(true)}
          />

          {!hasSession && balance > 0 && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={startSession}
                disabled={initiate.isPending}
                className="flex w-full items-center justify-center gap-[10px] rounded-[18px] bg-ink py-[19px] text-[17px] font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {initiate.isPending ? "Starting…" : "Start a session"}
                {!initiate.isPending && <span className="text-[17px]">→</span>}
              </button>
              <div className="mt-[11px] text-[13px] text-muted">
                Either of you can begin · one band-aid, one hour together
              </div>
            </div>
          )}

          {!hasSession && balance === 0 && (
            <div className="mt-4 rounded-[20px] border border-line2 bg-[linear-gradient(160deg,var(--blush-soft),var(--panel))] px-6 py-6 text-center animate-rise">
              <BandAidGlyph width={34} faded className="mb-[14px]" />
              <h2 className="mb-2 font-serif text-[22px] text-ink">
                You&apos;re out of band-aids for now
              </h2>
              <p className="mx-auto mb-[18px] max-w-[360px] text-[14.5px] leading-[1.6] text-muted">
                No rush — whenever you&apos;re ready to sit down together again, add a band-aid to
                your shared pool. One covers a full hour.
              </p>
              <Link
                href={routes.store}
                className="inline-block rounded-full bg-ink px-7 py-[14px] text-[15px] font-bold text-bg transition-opacity hover:opacity-90"
              >
                Add band-aids
              </Link>
            </div>
          )}
        </div>

        {/* the shared status — pool full-width, the rest split below */}
        <div className="mt-7 flex flex-col gap-4">
          <BandAidPoolCard balance={balance} partnerName={partnerName} />

          <div className="grid gap-4 sm:grid-cols-2">
            <PartnerPresenceCard partnerName={partnerName} isOnline={isPartnerOnline} />

            {!hasSession && lastClosed && (
              <Link
                href={routes.sessionClosed(lastClosed.id)}
                className="flex items-center gap-[14px] rounded-[18px] border border-line bg-panel px-[18px] py-4 transition-colors hover:bg-panel2"
              >
                <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-bg2">
                  <span className="h-[14px] w-[14px] rounded-full bg-[radial-gradient(circle_at_36%_30%,var(--orb1),var(--orb2)_72%)]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-ink">Your last session</span>
                  <span className="mt-[2px] block text-[12.5px] text-muted">
                    {formatDate(lastClosed.closedAt ?? lastClosed.createdAt)} · open the recap
                  </span>
                </span>
                <span className="whitespace-nowrap text-[13px] font-bold text-blushd">Open ›</span>
              </Link>
            )}

            {!hasSession && !lastClosed && (
              <div className="flex flex-col justify-center rounded-[18px] border border-dashed border-line2 px-5 py-4 text-center animate-rise">
                <h2 className="mb-1 font-serif text-[16px] leading-[1.25] text-ink">
                  Your first conversation is ahead of you.
                </h2>
                <p className="text-[12.5px] leading-[1.5] text-muted">
                  When it feels right, begin — your counselor will hold the space, gently.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[400px] text-center text-[11.5px] leading-[1.6] text-faint">
          AI-guided conversations — a supportive space, not therapy or a substitute for professional
          care.
        </p>
      </div>

      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        coupleLabel={`${user?.name ?? "You"} & ${partnerName}`}
      />

      <AvatarPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentAvatarId={partnership.counselorAvatarId}
        onChanged={(name) => setToast(`Your counselor is now ${name}`)}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast("")} />}
    </div>
  );
}
