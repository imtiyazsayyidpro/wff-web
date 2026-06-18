"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { routes } from "@/config/routes";
import { buttonVariants } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";

export default function ConnectedPage() {
  const router = useRouter();
  const { data: partnership, isLoading } = usePartnership();

  useEffect(() => {
    if (!isLoading && !partnership) router.replace(routes.invite);
  }, [isLoading, partnership, router]);

  if (isLoading) return <PageLoader />;
  if (!partnership) return null;

  const partnerName = partnership.partner?.name ?? partnership.partner?.email ?? "your partner";
  const hasBandAid = partnership.bandAidBalance > 0;

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))] px-[26px] py-10 text-center text-ink">
      <div className="max-w-[420px]">
        {/* merging orbs */}
        <div className="relative mx-auto mb-[30px] flex h-24 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
          >
            <div className="h-[150px] w-[150px] animate-glow rounded-full bg-[radial-gradient(circle,var(--orb-glow),transparent_70%)] blur-2xl" />
          </div>
          <div className="relative flex items-center">
            <span
              className="h-[62px] w-[62px] animate-breathe rounded-full border-[3px] border-bg"
              style={{ background: "radial-gradient(circle at 36% 30%, var(--orb1), var(--orb2) 72%)" }}
            />
            <span
              className="-ml-5 h-[62px] w-[62px] animate-breathe rounded-full border-[3px] border-bg [animation-delay:0.4s]"
              style={{ background: "radial-gradient(circle at 36% 30%, var(--sage), #7d9180 80%)" }}
            />
          </div>
        </div>

        <div className="mb-[18px] inline-flex items-center gap-[7px] rounded-full bg-sage-soft px-[14px] py-[6px]">
          <span className="h-[7px] w-[7px] rounded-full bg-saged" />
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-saged">
            Connected
          </span>
        </div>

        <h1 className="mb-[14px] font-serif text-[37px] leading-[1.14]">
          You &amp; {partnerName} are connected.
        </h1>
        <p className="mx-auto mb-[22px] max-w-[360px] text-[16px] leading-[1.65] text-muted">
          From here on, this is your space — just the two of you. Take a breath; there&apos;s no
          rush to begin.
        </p>

        {hasBandAid && (
          <div className="mb-[30px] inline-flex items-center gap-[11px] rounded-2xl border border-line bg-panel px-[18px] py-[13px]">
            <span className="relative inline-block h-[11px] w-[26px] flex-none rotate-[-42deg]">
              <span className="absolute inset-0 rounded-[6px] bg-blush" />
              <span className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-blush-soft" />
            </span>
            <span className="text-left text-[13.5px] leading-[1.4] text-ink">
              We&apos;ve added your <strong className="font-bold">first band-aid</strong> — one hour
              together, on us.
            </span>
          </div>
        )}

        <div>
          <Link href={routes.home} className={buttonVariants({ size: "lg" })}>
            Enter your home
          </Link>
        </div>
      </div>
    </main>
  );
}
