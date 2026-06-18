"use client";

import { useState } from "react";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useBandAidTransactions } from "@/lib/hooks/useBilling";
import { routes } from "@/config/routes";
import { PageLoader } from "@/components/ui/PageLoader";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { StoreSubHeader } from "@/components/store/StoreSubHeader";
import { Pager } from "@/components/store/Pager";
import { LedgerRow } from "@/components/store/LedgerRow";

export default function LedgerPage() {
  const { data: partnership } = usePartnership();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useBandAidTransactions(page);

  if (isLoading && !data) return <PageLoader />;

  const entries = data?.transactions ?? [];

  return (
    <div className="min-h-screen bg-bg text-ink">
      <StoreSubHeader
        title="Band-aid ledger"
        backHref={routes.store}
        right={
          <div className="inline-flex items-center gap-[9px] rounded-full border border-line2 bg-panel2 px-[14px] py-[6px]">
            <BandAidGlyph width={22} />
            <span className="text-[14.5px] font-bold">{partnership?.bandAidBalance ?? 0}</span>
          </div>
        }
      />

      <div className="mx-auto max-w-[960px] px-[22px] py-6 lg:px-8">
        <p className="mx-[2px] mb-5 text-[14px] leading-[1.6] text-muted">
          Every band-aid that&apos;s moved through your shared pool — the gifts, what you&apos;ve
          bought, and the hours you&apos;ve spent together.
        </p>

        {entries.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-line2 px-6 py-11 text-center">
            <h2 className="mb-2 font-serif text-[20px] text-ink">Nothing here yet.</h2>
            <p className="mx-auto max-w-[320px] text-[14px] leading-[1.6] text-muted">
              As band-aids arrive and sessions happen, every change to your pool will show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-9 sm:grid-cols-2">
            {entries.map((entry) => (
              <LedgerRow key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        {data && (
          <Pager
            pagination={data.pagination}
            mode="page"
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
        )}
      </div>
    </div>
  );
}
