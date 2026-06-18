"use client";

import { useState } from "react";

const MAX = 2000;

interface MemoryEditorSheetProps {
  title: string;
  initialValue: string;
  isSaving: boolean;
  onSave: (content: string) => void;
  onClose: () => void;
}

/** Bottom-sheet add/edit editor for a memory. */
export function MemoryEditorSheet({
  title,
  initialValue,
  isSaving,
  onSave,
  onClose,
}: MemoryEditorSheetProps) {
  const [draft, setDraft] = useState(initialValue);
  const canSave = draft.trim().length > 0 && !isSaving;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(20,15,24,0.34)] animate-fade"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] rounded-t-[26px] bg-bg px-6 pb-7 pt-6 shadow-[0_-24px_60px_-28px_var(--shadow)] animate-slideup"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title}
      >
        <div className="mx-auto mb-5 h-1 w-[42px] rounded-sm bg-line2" />
        <h3 className="mb-[14px] font-serif text-[22px] text-ink">{title}</h3>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, MAX))}
          maxLength={MAX}
          autoFocus
          placeholder="Write it however feels natural — a sentence, or a few lines about what matters."
          className="min-h-[138px] w-full resize-none rounded-[14px] border border-line2 bg-field px-4 py-[14px] text-[15px] leading-[1.6] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-blush focus:shadow-[0_0_0_3px_var(--blush-soft)]"
        />
        <div className="mx-[2px] mb-[18px] mt-[9px] flex items-center justify-between gap-3">
          <span className="text-[12px] text-faint">
            Your counselor will see this at the start of each session.
          </span>
          <span className="text-[11.5px] tabular-nums text-faint">
            {draft.length}/{MAX}
          </span>
        </div>
        <button
          type="button"
          onClick={() => canSave && onSave(draft.trim())}
          disabled={!canSave}
          className="w-full rounded-[15px] bg-ink py-4 text-[15.5px] font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Save memory"}
        </button>
        <div className="mt-3 text-center">
          <button type="button" onClick={onClose} className="text-[13px] text-muted hover:text-ink">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
