import type { Plan } from "@/types/store";
import { formatMoney } from "@/lib/utils/money";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { cn } from "@/lib/utils/cn";

interface PlanCardProps {
  plan: Plan;
  popular?: boolean;
  onBuy: () => void;
  disabled?: boolean;
}

export function PlanCard({ plan, popular, onBuy, disabled }: PlanCardProps) {
  const qty = plan.bandAidQuantity;
  const qtyLabel = `${qty} band-aid${qty === 1 ? "" : "s"}`;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[18px] border bg-panel p-[18px]",
        popular ? "border-blush" : "border-line",
      )}
    >
      {popular && (
        <span className="absolute -top-[9px] left-[18px] rounded-full bg-blush px-[9px] py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">
          Best value
        </span>
      )}
      <div className="mb-[6px] flex items-center gap-[9px]">
        <BandAidGlyph width={24} />
        <span className="font-serif text-[20px] text-ink">{qtyLabel}</span>
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-serif text-[26px] text-ink">
          {formatMoney(plan.pricePaise, plan.currency)}
        </span>
        {qty > 1 && (
          <span className="text-[11.5px] text-faint">
            {formatMoney(Math.round(plan.pricePaise / qty), plan.currency)} each
          </span>
        )}
      </div>
      <p className="mb-4 flex-1 text-[12.5px] leading-[1.5] text-muted">
        {qty} guided {qty === 1 ? "hour" : "hours"} together — they never expire.
      </p>
      <button
        type="button"
        onClick={onBuy}
        disabled={disabled}
        className="w-full rounded-xl border border-ink bg-ink py-3 text-[14px] font-bold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:border-line2 disabled:bg-panel2 disabled:text-faint disabled:hover:opacity-100"
      >
        {disabled ? "Coming soon" : "Buy"}
      </button>
    </div>
  );
}
