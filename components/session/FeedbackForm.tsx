"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useFeedbackStatus, useSubmitFeedback } from "@/lib/hooks/useFeedback";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { routes } from "@/config/routes";
import { Orb } from "@/components/ui/Orb";
import { Button, buttonVariants } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";

function windowLabel(secondsLeft: number): string {
  if (secondsLeft >= 3600) {
    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    return `${h}h ${m}m`;
  }
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const TEXTAREA =
  "w-full min-h-[74px] resize-none rounded-[14px] border border-line2 bg-field px-[15px] py-[13px] text-[14.5px] leading-[1.55] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-blush focus:shadow-[0_0_0_3px_var(--blush-soft)]";

export function FeedbackForm({ sessionId }: { sessionId: number }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: status, isLoading } = useFeedbackStatus(sessionId);
  const { data: partnership } = usePartnership();
  const submit = useSubmitFeedback(sessionId);

  const myInitial = (user?.name?.trim() || user?.email?.trim() || "?")[0].toUpperCase();
  const partner = partnership?.partner;
  const partnerInitial = (partner?.name?.trim() || partner?.email?.trim() || "?")[0].toUpperCase();

  const [liked, setLiked] = useState("");
  const [disliked, setDisliked] = useState("");
  const [editing, setEditing] = useState(false);
  const seeded = useRef(false);

  const { secondsLeft } = useCountdown(status?.feedbackRewardExpiresAt ?? null);

  // Seed the form/recap from what I already submitted, once (survives reload).
  useEffect(() => {
    if (status && !seeded.current && status.mySubmitted) {
      setLiked(status.myLiked ?? "");
      setDisliked(status.myDisliked ?? "");
      seeded.current = true;
    }
  }, [status]);

  // No feedback window for this session — nothing to show.
  useEffect(() => {
    if (status && status.windowState === "none") router.replace(routes.home);
  }, [status, router]);

  if (isLoading || !status) return <PageLoader />;
  if (status.windowState === "none") return null;

  const showForm = status.windowState === "open" && (!status.mySubmitted || editing);
  const showWaiting = status.windowState === "open" && status.mySubmitted && !editing;
  const canSubmit = liked.trim().length > 0 || disliked.trim().length > 0;
  const balance = partnership?.bandAidBalance ?? 0;

  // Each state gets its own header (matching the design).
  const fbState: "open" | "waiting" | "granted" | "lapsed" =
    status.windowState === "granted"
      ? "granted"
      : status.windowState === "lapsed"
        ? "lapsed"
        : showWaiting
          ? "waiting"
          : "open";

  const header = {
    open: {
      title: "How did that first one feel?",
      sub: "You just wrapped your very first session. Before anything else — how was it, honestly?",
    },
    waiting: {
      title: "Thank you for sharing.",
      sub: "You've done your part.",
    },
    granted: {
      title: "That means a lot.",
      sub: "Truly — thank you, both.",
    },
    lapsed: {
      title: "This window has closed.",
      sub: "It was a one-time, first-session window.",
    },
  }[fbState];

  return (
    <main className="flex min-h-screen flex-col bg-bg px-6 py-12 text-ink">
      <div className="mx-auto w-full max-w-[460px]">
        <div className="text-center">
          <Orb size={60} className="mx-auto mb-[18px]" />
          <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-faint">
            Your first session
          </div>
          <h1 className="mb-[9px] font-serif text-[30px] leading-[1.16]">{header.title}</h1>
          {header.sub && (
            <p className="mx-auto max-w-[400px] text-[14.5px] leading-[1.62] text-muted">
              {header.sub}
            </p>
          )}
        </div>

        {showForm && (
          <div className="mt-[22px]">
            <div className="mb-5 flex items-center justify-center gap-2">
              <span className="h-[6px] w-[6px] rounded-full bg-sage" />
              <span className="text-[13px] text-muted">
                Open for <strong className="font-bold tabular-nums text-ink">{windowLabel(secondsLeft)}</strong> — no rush
              </span>
            </div>

            <div className="flex flex-col gap-[14px]">
              <div>
                <label className="mb-[7px] ml-[2px] block text-[13px] font-bold text-ink">
                  What landed well?
                </label>
                <textarea
                  value={liked}
                  onChange={(e) => setLiked(e.target.value.slice(0, 2000))}
                  placeholder="Something that helped, or felt good…"
                  className={TEXTAREA}
                />
              </div>
              <div>
                <label className="mb-[7px] ml-[2px] block text-[13px] font-bold text-ink">
                  What didn&apos;t?
                </label>
                <textarea
                  value={disliked}
                  onChange={(e) => setDisliked(e.target.value.slice(0, 2000))}
                  placeholder="Something that didn't sit right, or got in the way…"
                  className={TEXTAREA}
                />
              </div>
            </div>
            <p className="mx-[2px] mt-[10px] text-[12.5px] text-faint">
              This isn&apos;t a review or a rating — just the honest truth.
            </p>

            <div className="my-[18px] flex items-center gap-3 rounded-[14px] border border-blush bg-blush-soft px-4 py-[13px]">
              <BandAidGlyph width={26} />
              <p className="text-[13px] leading-[1.5] text-ink">
                When you <strong className="font-bold">both</strong> share, a free band-aid lands in
                your shared pool — once, on us.
              </p>
            </div>

            <Button
              size="lg"
              fullWidth
              className="rounded-[15px]"
              disabled={!canSubmit}
              isLoading={submit.isPending}
              loadingText="Sharing…"
              onClick={() =>
                submit.mutate(
                  {
                    liked: liked.trim() || undefined,
                    disliked: disliked.trim() || undefined,
                  },
                  { onSuccess: () => setEditing(false) },
                )
              }
            >
              Share my impressions
            </Button>
            <div className="mt-3 text-center">
              <Link href={routes.home} className="text-[13px] text-muted hover:text-ink">
                Maybe later
              </Link>
            </div>
          </div>
        )}

        {showWaiting && (
          <div className="mt-[22px]">
            <div className="rounded-[18px] border border-line bg-panel px-[22px] py-6 text-center">
              <div className="mb-4 flex items-center justify-center gap-[11px]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[13px] font-bold text-bg">
                  {myInitial}
                </span>
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <span
                      key={i}
                      className="inline-block h-[6px] w-[6px] rounded-full bg-blushd"
                      style={{ animation: "wf-glow 1.1s ease-in-out infinite", animationDelay: `${delay}s` }}
                    />
                  ))}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-dashed border-line2 text-[13px] font-bold text-faint">
                  {partnerInitial}
                </span>
              </div>
              <p className="mb-[6px] text-[16px] font-bold text-ink">Shared — thank you.</p>
              <p className="mx-auto max-w-[330px] text-[13.5px] leading-[1.62] text-muted">
                We&apos;re just waiting on your partner to add theirs. The moment they do, your free
                band-aid drops in — no nudging needed.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-[14px] py-[7px]">
                <span className="h-[6px] w-[6px] rounded-full bg-sage" />
                <span className="text-[12.5px] text-muted">
                  Window open for{" "}
                  <strong className="font-bold tabular-nums text-ink">{windowLabel(secondsLeft)}</strong>
                </span>
              </div>
            </div>

            {(liked || disliked) && (
              <div className="mt-[14px] rounded-[16px] border border-line bg-panel2 px-[18px] py-4">
                <div className="mb-[11px] flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-faint">
                    What you shared
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-[12.5px] font-bold text-blushd hover:text-ink"
                  >
                    Edit
                  </button>
                </div>
                {liked && (
                  <div className="mb-[10px]">
                    <div className="mb-[2px] text-[11px] font-bold text-saged">Landed well</div>
                    <p className="text-[13.5px] leading-[1.55] text-ink">{liked}</p>
                  </div>
                )}
                {disliked && (
                  <div>
                    <div className="mb-[2px] text-[11px] font-bold text-blushd">Didn&apos;t</div>
                    <p className="text-[13.5px] leading-[1.55] text-ink">{disliked}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-center">
              <Link href={routes.home} className="text-[13px] text-muted hover:text-ink">
                Back home
              </Link>
            </div>
          </div>
        )}

        {status.windowState === "granted" && (
          <div className="mt-6 text-center animate-rise">
            <div className="mb-[22px] inline-flex items-center gap-[13px] rounded-[18px] border border-saged bg-sage-soft px-[22px] py-[17px]">
              <BandAidGlyph width={34} />
              <div className="text-left">
                <div className="text-[15px] font-bold leading-[1.2] text-ink">+1 band-aid</div>
                <div className="mt-[2px] text-[12.5px] text-muted">added to your shared pool</div>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-[380px] text-[15px] leading-[1.65] text-muted">
              You both showed up and told us the truth — that&apos;s the only thanks we needed. Your
              pool now holds <strong className="font-bold text-ink">{balance}</strong>.
            </p>
            <Link href={routes.home} className={buttonVariants({ size: "lg" })}>
              Back home
            </Link>
          </div>
        )}

        {status.windowState === "lapsed" && (
          <div className="mt-6 text-center">
            <div className="mx-auto mb-6 max-w-[400px] rounded-[18px] border border-line bg-panel2 p-[22px]">
              <p className="text-[14.5px] leading-[1.65] text-muted">
                The window has quietly closed. No worries at all — life happens, and this was always
                optional. Thank you for giving that first session a try.
              </p>
            </div>
            <Link href={routes.home} className={buttonVariants({ size: "lg" })}>
              Back home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
