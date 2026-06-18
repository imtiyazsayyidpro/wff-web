"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useInvoice, usePurchases } from "@/lib/hooks/useBilling";
import { formatMoney } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/time";
import { routes } from "@/config/routes";
import { Logo } from "@/components/ui/Logo";
import { PageLoader } from "@/components/ui/PageLoader";
import { StoreSubHeader } from "@/components/store/StoreSubHeader";

export function InvoiceView({ purchaseId }: { purchaseId: number }) {
  const { user } = useAuth();
  const { data: partnership } = usePartnership();
  const { data: invoice, isLoading, isError } = useInvoice(purchaseId);
  const { data: purchasesData } = usePurchases();

  const partnerName = partnership?.partner?.name ?? partnership?.partner?.email ?? "your partner";
  const purchase = purchasesData?.purchases.find((p) => p.id === purchaseId);
  const by = purchase
    ? purchase.purchasedByUserId === user?.id
      ? "you"
      : partnerName
    : null;

  if (isLoading) return <PageLoader />;

  const planLabel =
    invoice?.planName ??
    (invoice ? `${invoice.bandAidQuantity} band-aid${invoice.bandAidQuantity === 1 ? "" : "s"}` : "");

  return (
    <div className="min-h-screen bg-bg2 text-ink">
      <StoreSubHeader title="Invoice" backHref={routes.storePurchases} background="bg2" />

      <div className="mx-auto max-w-[480px] px-[22px] py-6">
        {isError || !invoice ? (
          <div className="rounded-[18px] border border-line bg-panel px-6 py-10 text-center">
            <p className="mb-4 text-[14.5px] text-muted">
              This invoice isn&apos;t available. It may still be processing.
            </p>
            <Link
              href={routes.storePurchases}
              className="text-[13.5px] font-semibold text-blushd hover:text-ink"
            >
              Back to purchases
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-[20px] border border-line bg-panel px-[26px] py-7 shadow-[0_24px_54px_-36px_var(--shadow)]">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-[18px]">
                <Logo size="md" />
                <span className="rounded-full border border-saged bg-sage-soft px-[10px] py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-saged">
                  Paid
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 py-5">
                <div>
                  <div className="mb-[5px] text-[10px] uppercase tracking-[0.16em] text-faint">
                    Invoice no.
                  </div>
                  <div className="text-[15px] font-bold tabular-nums">{invoice.number}</div>
                </div>
                <div className="text-right">
                  <div className="mb-[5px] text-[10px] uppercase tracking-[0.16em] text-faint">Issued</div>
                  <div className="text-[15px] font-bold">{formatDate(invoice.issuedAt)}</div>
                </div>
              </div>

              <div className="mb-[5px] text-[10px] uppercase tracking-[0.16em] text-faint">Billed to</div>
              <div className="mb-5 text-[14px] text-ink">
                Your shared partnership{by ? ` · purchased by ${by}` : ""}
              </div>

              <div className="border-t border-line pt-[14px]">
                <div className="mb-[10px] flex items-center justify-between gap-3">
                  <span className="text-[14.5px]">
                    {planLabel}{" "}
                    <span className="text-[12.5px] text-faint">
                      · {invoice.bandAidQuantity} × one-hour session
                    </span>
                  </span>
                  <span className="text-[14.5px] font-semibold">
                    {formatMoney(invoice.amountPaise, invoice.currency)}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line2 pt-[14px]">
                <span className="text-[15px] font-bold">Total paid</span>
                <span className="font-serif text-[22px]">
                  {formatMoney(invoice.amountPaise, invoice.currency)}
                </span>
              </div>

              <p className="mt-5 text-center text-[12px] leading-[1.6] text-faint">
                A receipt was emailed to both partners. Simulated payment — no card was charged.
              </p>
            </div>

            <div className="mt-[18px] text-center">
              <Link
                href={routes.storePurchases}
                className="text-[13.5px] font-semibold text-muted hover:text-ink"
              >
                Back to purchases
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
