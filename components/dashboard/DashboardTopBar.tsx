"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";
import { routes } from "@/config/routes";

interface DashboardTopBarProps {
  balance: number;
  onOpenMenu: () => void;
}

export function DashboardTopBar({ balance, onOpenMenu }: DashboardTopBarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-4 md:px-8">
      {/* Desktop: hamburger opens the side drawer. Mobile uses the bottom nav. */}
      <button
        type="button"
        onClick={onOpenMenu}
        className="hidden items-center gap-[10px] rounded-full border border-line2 py-2 pl-[11px] pr-[14px] text-ink transition-colors hover:bg-panel2 md:inline-flex"
      >
        <span className="flex w-[15px] flex-col gap-[3px]" aria-hidden="true">
          <span className="h-[1.7px] rounded-sm bg-current" />
          <span className="h-[1.7px] rounded-sm bg-current" />
          <span className="h-[1.7px] w-[10px] rounded-sm bg-current" />
        </span>
        <span className="text-[13px] font-semibold">Menu</span>
      </button>

      {/* Brand sits on the left on mobile (where the hamburger was), centered on desktop. */}
      <Logo size="sm" withWordmark />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href={routes.store}
          title="Shared band-aids"
          className="inline-flex items-center gap-[9px] rounded-full border border-line2 bg-panel py-[6px] pl-[14px] pr-[6px] text-ink transition-colors hover:bg-panel2"
        >
          <BandAidGlyph width={22} />
          <span className="text-[14.5px] font-bold">{balance}</span>
          <span className="grid h-[23px] w-[23px] place-items-center rounded-full bg-bg2 text-muted">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </Link>
      </div>
      </div>
    </div>
  );
}
