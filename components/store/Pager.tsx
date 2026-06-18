import type { Pagination } from "@/types/store";

interface PagerProps {
  pagination: Pagination;
  onPrev: () => void;
  onNext: () => void;
  /** "Showing 1–10 of 24" vs "Page 1 of 3". */
  mode?: "range" | "page";
}

export function Pager({ pagination, onPrev, onNext, mode = "range" }: PagerProps) {
  const { page, limit, total, totalPages } = pagination;
  if (totalPages <= 1) return null;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const btn =
    "grid h-9 w-9 place-items-center rounded-[10px] border border-line2 text-[16px] text-ink transition-colors enabled:hover:bg-panel2 disabled:opacity-40";

  return (
    <div className="mt-[18px] flex items-center justify-between gap-3">
      <span className="text-[12.5px] text-faint">
        {mode === "range" ? `Showing ${from}–${to} of ${total}` : `Page ${page} of ${totalPages}`}
      </span>
      <div className="flex gap-2">
        <button type="button" onClick={onPrev} disabled={page <= 1} className={btn} aria-label="Previous">
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={page >= totalPages}
          className={btn}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
