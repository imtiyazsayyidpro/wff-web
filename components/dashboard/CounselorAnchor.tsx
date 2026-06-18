"use client";

import { Orb } from "@/components/ui/Orb";

interface CounselorAnchorProps {
  counselorName: string | null;
  counselorImageUrl?: string | null;
  userName: string | null;
  greeting: string;
  onChangeAvatar: () => void;
}

/** The calm centrepiece: the counselor orb (tap to change), name, and greeting. */
export function CounselorAnchor({
  counselorName,
  counselorImageUrl,
  userName,
  greeting,
  onChangeAvatar,
}: CounselorAnchorProps) {
  const name = counselorName ?? "your counselor";
  const who = userName ? `, ${userName}` : "";

  return (
    <div className="rounded-[24px] border border-line bg-panel p-7 text-center shadow-[0_26px_64px_-48px_var(--shadow)]">
      <button
        type="button"
        onClick={onChangeAvatar}
        title="Tap to change your counselor"
        className="relative mx-auto mb-4 block transition-transform hover:scale-[1.03]"
      >
        <Orb size={132} imageUrl={counselorImageUrl} imageAlt={counselorName ?? ""} />
        <span className="absolute bottom-0 right-0 grid h-[30px] w-[30px] place-items-center rounded-full border border-line2 bg-panel text-muted">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </span>
      </button>
      <div className="mb-[7px] text-[11px] uppercase tracking-[0.24em] text-faint">
        Your counselor
      </div>
      <h1 className="mb-2 font-serif text-[30px] leading-[1.1] text-ink">{name}</h1>
      <p className="mx-auto max-w-[360px] text-[15px] leading-[1.6] text-muted">
        {greeting}
        {who}. {counselorName ? `${counselorName} is` : "Your counselor is"} here, calm and ready,
        whenever the two of you are.
      </p>
    </div>
  );
}
