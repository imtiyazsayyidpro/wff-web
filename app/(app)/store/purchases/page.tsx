"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { usePurchases } from "@/lib/hooks/useBilling";
import { formatMoney } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/time";
import { routes } from "@/config/routes";
import type { Purchase } from "@/types/store";
import { PageLoader } from "@/components/ui/PageLoader";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { StoreSubHeader } from "@/components/store/StoreSubHeader";
import { Pager } from "@/components/store/Pager";

export default function PurchasesPage() {
  const { user } = useAuth();
  const { data: partnership } = usePartnership();
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePurchases(page);

  if (isLoading && !data) return <PageLoader />;

  const purchases = data?.purchases ?? [];
  const partnerName = partnership?.partner?.name ?? partnership?.partner?.email ?? "your partner";

  const purchaserLabel = (p: Purchase) =>
    p.purchasedByUserId === user?.id ? "you" : partnerName;
  const planLabel = (p: Purchase) =>
    p.planName ?? `${p.bandAidQuantity} band-aid${p.bandAidQuantity === 1 ? "" : "s"}`;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <StoreSubHeader title="Purchase history" backHref={routes.store} />

      <div className="mx-auto max-w-[960px] px-[22px] py-6 lg:px-8">
        <p className="mx-[2px] mb-5 text-[14px] leading-[1.6] text-muted">
          Everything the two of you have bought for your pool. Shared between you and {partnerName}.
        </p>

        {purchases.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-line2 px-6 py-11 text-center">
            <h2 className="mb-2 font-serif text-[20px] text-ink">No purchases yet.</h2>
            <p className="mx-auto mb-5 max-w-[320px] text-[14px] leading-[1.6] text-muted">
              When either of you tops up the pool, it&apos;ll show up here with an invoice.
            </p>
            <Link
              href={routes.store}
              className="inline-block rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-bg transition-opacity hover:opacity-90"
            >
              Top up band-aids
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {purchases.map((p) => (
              <Link
                key={p.id}
                href={routes.storeInvoice(p.id)}
                className="flex items-center gap-[14px] rounded-[14px] border border-line bg-panel px-[18px] py-4 transition-colors hover:bg-panel2"
              >
                <BandAidGlyph width={26} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-bold text-ink">{planLabel(p)}</span>
                  <span className="mt-[2px] block text-[12.5px] text-muted">
                    {formatDate(p.createdAt)} · by {purchaserLabel(p)}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-[14.5px] font-bold text-ink">
                    {formatMoney(p.amountPaise, p.currency)}
                  </span>
                  <span className="mt-[2px] block text-[11.5px] text-faint">
                    {p.invoiceNumber ? "Invoice ›" : "Receipt ›"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}

        {data && (
          <Pager
            pagination={data.pagination}
            mode="range"
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
        )}
      </div>
    </div>
  );
}
