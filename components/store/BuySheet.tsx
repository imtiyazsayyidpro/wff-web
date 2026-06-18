"use client";

import type { Plan, CreatePurchaseResult } from "@/types/store";
import { formatMoney } from "@/lib/utils/money";
import { Spinner } from "@/components/ui/Spinner";
import { Alert } from "@/components/ui/Alert";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";

export type BuyState = "review" | "pending" | "done";

interface BuySheetProps {
  plan: Plan;
  state: BuyState;
  currentBalance: number;
  partnerName: string;
  result: CreatePurchaseResult | null;
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
  onViewInvoice: () => void;
}

/** Bottom-sheet buy flow: review → (pending) → done. */
export function BuySheet({
  plan,
  state,
  currentBalance,
  partnerName,
  result,
  error,
  onConfirm,
  onClose,
  onViewInvoice,
}: BuySheetProps) {
  const priceLabel = formatMoney(plan.pricePaise, plan.currency);
  const planLabel = `${plan.bandAidQuantity} band-aid${plan.bandAidQuantity === 1 ? "" : "s"}`;
  const after = currentBalance + plan.bandAidQuantity;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(20,15,24,0.34)] animate-fade"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] rounded-t-[26px] bg-bg px-6 pb-8 pt-[26px] shadow-[0_-24px_60px_-28px_var(--shadow)] animate-slideup"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Buy band-aids"
      >
        {state === "review" && (
          <>
            <div className="mx-auto mb-[22px] h-1 w-[42px] rounded-sm bg-line2" />
            <div className="mb-5 text-center">
              <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-faint">
                Top up your pool
              </div>
              <div className="inline-flex items-center gap-[11px]">
                <BandAidGlyph width={32} />
                <span className="font-serif text-[26px] text-ink">{planLabel}</span>
              </div>
            </div>

            {error && (
              <Alert className="mb-3" variant="error">
                {error}
              </Alert>
            )}

            <div className="mb-[14px] rounded-2xl border border-line bg-panel px-[18px] py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] text-muted">{planLabel}</span>
                <span className="text-[15px] font-bold text-ink">{priceLabel}</span>
              </div>
            </div>
            <p className="mb-[18px] text-center text-[12.5px] leading-[1.55] text-faint">
              Either of you can buy — band-aids are shared. Payment is simulated for now; an invoice
              is issued and a receipt emailed to you both.
            </p>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-[15px] bg-ink py-4 text-[15.5px] font-bold text-bg transition-opacity hover:opacity-90"
            >
              Confirm · {priceLabel}
            </button>
            <div className="mt-3 text-center">
              <button type="button" onClick={onClose} className="text-[13px] text-muted hover:text-ink">
                Not now
              </button>
            </div>
          </>
        )}

        {state === "pending" && (
          <div className="px-0 pb-2 pt-[18px] text-center">
            <Spinner size={30} className="mx-auto mb-5 border-blush/40 border-t-blush" />
            <h3 className="mb-2 font-serif text-[22px] text-ink">Completing your payment…</h3>
            <p className="mx-auto max-w-[300px] text-[13.5px] leading-[1.6] text-muted">
              Hold tight for just a moment. Secure checkout will live right here once payments go
              live.
            </p>
          </div>
        )}

        {state === "done" && (
          <div className="pt-[6px] text-center">
            <div className="mx-auto mb-4 grid h-[54px] w-[54px] place-items-center rounded-full border border-saged bg-sage-soft text-[24px] leading-none text-saged">
              ✓
            </div>
            <h3 className="mb-2 font-serif text-[24px] text-ink">{planLabel} added</h3>
            <p className="mx-auto mb-4 max-w-[320px] text-[14px] leading-[1.6] text-muted">
              They&apos;ve landed in your shared pool — it now holds{" "}
              <strong className="font-bold text-ink">{result?.bandAidBalance ?? after}</strong>.{" "}
              {partnerName} can see them too.
            </p>
            {result?.invoice && (
              <div className="mb-[22px] inline-flex items-center gap-2 rounded-xl border border-line bg-panel2 px-[15px] py-[9px]">
                <span className="text-[12.5px] text-muted">
                  Invoice <strong className="font-bold text-ink">{result.invoice.number}</strong> ·
                  receipt emailed
                </span>
              </div>
            )}
            <div className="flex gap-[10px]">
              <button
                type="button"
                onClick={onViewInvoice}
                disabled={!result?.invoice}
                className="flex-1 rounded-[14px] border border-line2 py-[14px] text-[14.5px] font-bold text-ink transition-colors hover:bg-panel2 disabled:opacity-50"
              >
                View invoice
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[14px] bg-ink py-[14px] text-[14.5px] font-bold text-bg transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
