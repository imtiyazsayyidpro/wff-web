import type { BandAidTransaction, BandAidTransactionType } from "@/types/store";
import { formatDate } from "@/lib/utils/time";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { cn } from "@/lib/utils/cn";

const META: Record<BandAidTransactionType, { text: string; tag: string }> = {
  FREE_GRANT_INITIAL: { text: "A free band-aid to begin", tag: "Gift" },
  FREE_GRANT_FEEDBACK: { text: "A free band-aid for sharing your feedback", tag: "Gift" },
  PURCHASE: { text: "Topped up your shared pool", tag: "Purchase" },
  SESSION_SPEND: { text: "A session together", tag: "Session" },
  ADJUSTMENT: { text: "Adjustment to your pool", tag: "Adjustment" },
};

export function LedgerRow({ entry }: { entry: BandAidTransaction }) {
  const meta = META[entry.type];
  const isCredit = entry.amount > 0;
  const text = entry.type === "ADJUSTMENT" ? entry.note ?? meta.text : meta.text;
  const amountLabel = isCredit ? `+${entry.amount}` : `${entry.amount}`;

  return (
    <div className="flex items-center gap-[14px] border-b border-line px-1 py-[15px]">
      <span
        className={cn(
          "grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px]",
          isCredit ? "bg-sage-soft" : "bg-bg2",
        )}
      >
        <BandAidGlyph width={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] leading-[1.4] text-ink">{text}</span>
        <span className="mt-[3px] block text-[11.5px] text-faint">
          {meta.tag} · {formatDate(entry.createdAt)}
        </span>
      </span>
      <span
        className={cn(
          "text-[16px] font-bold tabular-nums",
          isCredit ? "text-saged" : "text-muted",
        )}
      >
        {amountLabel}
      </span>
    </div>
  );
}
