"use client";

import { Orb } from "@/components/ui/Orb";
import { Button } from "@/components/ui/Button";

/** Full-screen "paused" state. */
export function PausedOverlay({
  remainingLabel,
  pausedByYou,
  onResume,
  onLeave,
  isResuming,
}: {
  remainingLabel: string;
  pausedByYou: boolean;
  onResume: () => void;
  onLeave: () => void;
  isResuming: boolean;
}) {
  return (
    <div className="absolute inset-0 z-30 flex animate-fade items-center justify-center bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))] px-8 text-center">
      <div className="max-w-[340px]">
        <Orb size={80} className="mx-auto mb-6" />
        <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-line bg-panel px-[14px] py-[6px]">
          <span className="flex gap-[3px]">
            <span className="h-[11px] w-[3px] rounded-sm bg-muted" />
            <span className="h-[11px] w-[3px] rounded-sm bg-muted" />
          </span>
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-muted">Paused</span>
        </div>
        <h2 className="mb-3 font-serif text-[29px] leading-[1.15] text-ink">
          Your session is paused
        </h2>
        <p className="mx-auto mb-5 max-w-[320px] text-[15px] leading-[1.65] text-muted">
          Take all the time you need. The clock is frozen — pick up exactly where you left off,
          whenever you&apos;re both ready.
        </p>
        <div className="mb-2 inline-flex items-center gap-[9px] rounded-full border border-line bg-panel px-4 py-[9px]">
          <span className="text-[14px] font-bold tabular-nums text-ink">{remainingLabel}</span>
          <span className="text-[12px] text-muted">remaining · frozen</span>
        </div>
        <p className="mb-[22px] text-[12.5px] text-faint">
          {pausedByYou ? "You paused this session" : "Your partner paused this session"}
        </p>
        <div>
          <Button size="lg" onClick={onResume} isLoading={isResuming} loadingText="Resuming…">
            Resume session
          </Button>
        </div>
        <div className="mt-[14px]">
          <button
            type="button"
            onClick={onLeave}
            className="text-[13px] text-muted transition-colors hover:text-ink"
          >
            Leave for now
          </button>
        </div>
      </div>
    </div>
  );
}

/** Inactivity nudge that appears before the session auto-pauses. */
export function InactivityWarning({
  onStay,
  onPause,
}: {
  onStay: () => void;
  onPause: () => void;
}) {
  return (
    <div className="absolute inset-0 z-[32] flex animate-fade items-end justify-center bg-[rgba(20,15,24,0.26)] px-4 pb-[92px]">
      <div className="w-full max-w-[380px] rounded-[22px] border border-line bg-panel p-6 text-center shadow-[0_30px_60px_-30px_var(--shadow)] animate-rise">
        <Orb size={46} className="mx-auto mb-4" />
        <h3 className="mb-[9px] font-serif text-[23px] text-ink">Still there?</h3>
        <p className="mx-auto mb-5 max-w-[300px] text-[14.5px] leading-[1.6] text-muted">
          It&apos;s been quiet for a little while. We&apos;ll gently pause your session in a moment,
          so nothing&apos;s lost.
        </p>
        <div className="flex gap-[10px]">
          <Button className="flex-1" onClick={onStay}>
            We&apos;re still here
          </Button>
          <Button variant="secondary" onClick={onPause}>
            Pause now
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Shown while the server wraps up a finished session. */
export function ClosingOverlay() {
  return (
    <div className="absolute inset-0 z-[36] flex animate-fade items-center justify-center bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))] px-8 text-center">
      <div className="max-w-[330px]">
        <Orb size={78} className="mx-auto mb-6" />
        <span className="mx-auto mb-[18px] block h-[18px] w-[18px] animate-spin rounded-full border-2 border-blush border-t-transparent" />
        <h2 className="mb-3 font-serif text-[27px] leading-[1.18] text-ink">
          Bringing your session to a gentle close
        </h2>
        <p className="mx-auto max-w-[300px] text-[15px] leading-[1.65] text-muted">
          We&apos;re saving everything the two of you shared. Take a breath — there&apos;s nothing
          more you need to do.
        </p>
      </div>
    </div>
  );
}
