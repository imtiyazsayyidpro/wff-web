"use client";

interface DeleteMemoryDialogProps {
  text: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteMemoryDialog({
  text,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteMemoryDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,15,24,0.3)] px-[22px] animate-fade"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[360px] rounded-[22px] border border-line bg-panel p-6 text-center shadow-[0_30px_60px_-30px_var(--shadow)] animate-rise"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Remove memory"
      >
        <h3 className="mb-[10px] font-serif text-[21px] text-ink">Remove this memory?</h3>
        <p className="mb-[6px] line-clamp-2 text-[13.5px] italic leading-[1.55] text-muted">
          &ldquo;{text}&rdquo;
        </p>
        <p className="mb-5 text-[13.5px] leading-[1.6] text-muted">
          Your counselor won&apos;t bring it into future sessions. You can always add it again later.
        </p>
        <div className="flex gap-[10px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-[13px] border border-line2 py-[13px] text-[14.5px] font-bold text-ink transition-colors hover:bg-panel2"
          >
            Keep it
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-[13px] bg-blushd py-[13px] text-[14.5px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isDeleting ? "Removing…" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
