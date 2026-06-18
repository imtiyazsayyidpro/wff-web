"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { usePlans, useCreatePurchase } from "@/lib/hooks/useBilling";
import { getErrorMessage } from "@/lib/utils/apiError";
import { routes } from "@/config/routes";
import type { CreatePurchaseResult, Plan } from "@/types/store";
import { PageLoader } from "@/components/ui/PageLoader";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { PlanCard } from "@/components/store/PlanCard";
import { BuySheet, type BuyState } from "@/components/store/BuySheet";

export default function StorePage() {
  const router = useRouter();
  const { data: partnership, isLoading: pLoading } = usePartnership();
  const { data: plans, isLoading: plansLoading } = usePlans();
  const create = useCreatePurchase();

  const [selected, setSelected] = useState<Plan | null>(null);
  const [buyState, setBuyState] = useState<BuyState>("review");
  const [result, setResult] = useState<CreatePurchaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pLoading && !partnership) router.replace(routes.invite);
  }, [pLoading, partnership, router]);

  // Best per-band-aid value gets the "Best value" tag.
  const bestValueId = useMemo(() => {
    if (!plans || plans.length < 2) return null;
    return plans.reduce((best, p) =>
      p.pricePaise / p.bandAidQuantity < best.pricePaise / best.bandAidQuantity ? p : best,
    ).id;
  }, [plans]);

  if (pLoading || plansLoading) return <PageLoader />;
  if (!partnership) return null;

  const balance = partnership.bandAidBalance;
  const partnerName = partnership.partner?.name ?? partnership.partner?.email ?? "your partner";

  const pickPlan = (plan: Plan) => {
    setSelected(plan);
    setBuyState("review");
    setResult(null);
    setError(null);
  };

  const confirmBuy = () => {
    if (!selected) return;
    setBuyState("pending");
    create.mutate(selected.id, {
      onSuccess: (res) => {
        setResult(res);
        setBuyState("done");
      },
      onError: (e) => {
        setError(getErrorMessage(e));
        setBuyState("review");
      },
    });
  };

  const closeBuy = () => {
    setSelected(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <div className="sticky top-0 z-20 border-b border-line bg-bg">
        <div className="mx-auto flex max-w-[960px] items-center gap-3 px-5 py-4 md:px-8">
          <Link
            href={routes.home}
            className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-line2 text-[18px] text-muted transition-colors hover:bg-panel2 hover:text-ink"
          >
            ‹
          </Link>
          <div className="flex-1 font-serif text-[18px]">Band-aids</div>
          <div className="inline-flex items-center gap-[9px] rounded-full border border-line2 bg-panel2 px-[14px] py-[6px]">
            <BandAidGlyph width={22} />
            <span className="text-[14.5px] font-bold">{balance}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-[22px] py-6 lg:px-8 lg:py-9">
        <div className="pb-[22px] pt-2 text-center">
          <h1 className="mb-[10px] font-serif text-[28px] leading-[1.14]">Your shared pool</h1>
          <p className="mx-auto max-w-[460px] text-[14.5px] leading-[1.62] text-muted">
            Band-aids are how the two of you begin a session — one band-aid, one hour together. They
            live in a pool you both own, and either of you can top it up.
          </p>
        </div>

        {/* balance banner */}
        <div className="mx-auto mb-7 flex max-w-[620px] items-center justify-between gap-4 rounded-[20px] border border-line bg-[linear-gradient(150deg,var(--panel),var(--blush-soft))] px-6 py-5">
          <div className="flex items-center gap-4">
            <BandAidGlyph width={42} />
            <div>
              <div className="font-serif text-[32px] leading-none">
                {balance} <span className="text-[16px] text-muted">in your pool</span>
              </div>
              <div className="mt-1 text-[12.5px] text-muted">
                Shared between you and {partnerName}
              </div>
            </div>
          </div>
          <span className="hidden items-center sm:flex">
            <span className="z-[2] h-[28px] w-[28px] rounded-full border-2 border-panel bg-[var(--orb2)]" />
            <span className="-ml-[10px] h-[28px] w-[28px] rounded-full border-2 border-panel bg-saged" />
          </span>
        </div>

        {/* payments-not-live notice */}
        <div className="mx-auto mb-7 max-w-[620px] rounded-[18px] border border-line bg-panel px-[20px] py-[18px] text-center">
          <div className="mb-[6px] text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
            Payments coming soon
          </div>
          <p className="mx-auto max-w-[480px] text-[13.5px] leading-[1.6] text-muted">
            We&apos;re not accepting payments just yet — checkout is on its way and goes live very
            soon. In the meantime, if your shared pool is running low, email us at{" "}
            <a
              href="mailto:info@worthfightingfor.in"
              className="font-bold text-ink underline underline-offset-2 hover:opacity-80"
            >
              info@worthfightingfor.in
            </a>{" "}
            and we&apos;ll get you more band-aids.
          </p>
        </div>

        {/* plans — up to three across */}
        <div className="mx-[2px] mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
          Top up
        </div>
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                popular={plan.id === bestValueId}
                onBuy={() => pickPlan(plan)}
                disabled
              />
            ))}
          </div>
        ) : (
          <p className="rounded-[18px] border border-dashed border-line2 py-8 text-center text-[14px] text-muted">
            No plans are available right now.
          </p>
        )}

        {/* secondary links — half and half */}
        <div className="mt-5 grid grid-cols-1 gap-[12px] sm:grid-cols-2">
          <Link
            href={routes.storePurchases}
            className="flex items-center justify-between gap-3 rounded-[14px] border border-line bg-panel px-[18px] py-4 transition-colors hover:bg-panel2"
          >
            <span>
              <span className="block text-[14.5px] font-bold text-ink">Purchase history</span>
              <span className="mt-[2px] block text-[12.5px] text-muted">
                Everything bought for your pool
              </span>
            </span>
            <span className="text-[18px] text-faint">›</span>
          </Link>
          <Link
            href={routes.storeLedger}
            className="flex items-center justify-between gap-3 rounded-[14px] border border-line bg-panel px-[18px] py-4 transition-colors hover:bg-panel2"
          >
            <span>
              <span className="block text-[14.5px] font-bold text-ink">Band-aid ledger</span>
              <span className="mt-[2px] block text-[12.5px] text-muted">
                Every band-aid in and out of your pool
              </span>
            </span>
            <span className="text-[18px] text-faint">›</span>
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-[420px] text-center text-[12px] leading-[1.6] text-faint">
          No subscriptions, ever. Band-aids don&apos;t expire — buy when it helps, not on a clock.
        </p>
      </div>

      {selected && (
        <BuySheet
          plan={selected}
          state={buyState}
          currentBalance={balance}
          partnerName={partnerName}
          result={result}
          error={error}
          onConfirm={confirmBuy}
          onClose={closeBuy}
          onViewInvoice={() =>
            result && router.push(routes.storeInvoice(result.purchaseId))
          }
        />
      )}
    </div>
  );
}
