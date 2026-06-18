"use client";

import { useState } from "react";
import Link from "next/link";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { Logo } from "@/components/ui/Logo";
import { LogoutConfirm } from "@/components/layout/LogoutConfirm";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  /** "Maya & Daniel" couple label. */
  coupleLabel: string;
}

export function SideDrawer({ open, onClose, coupleLabel }: SideDrawerProps) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { data: partnership } = usePartnership();

  // Requests are only meaningful before you're connected, so hide that link
  // once you have an active partnership.
  const navItems = [
    { label: "Memories", href: routes.memories },
    { label: "Band-aid store", href: routes.store },
    ...(partnership ? [] : [{ label: "Requests", href: routes.requests }]),
    { label: "Account & settings", href: routes.settings },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-[rgba(20,15,24,0.42)] transition-opacity",
          open ? "animate-fade opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      />
      <aside
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 flex w-[308px] max-w-[86%] flex-col bg-panel shadow-[-34px_0_70px_-34px_var(--shadow)] transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Menu"
      >
        <div className="flex items-start justify-between border-b border-line px-[22px] pb-[18px] pt-6">
          <div>
            <Logo size="sm" className="mb-[14px]" />
            <div className="flex items-center gap-[9px]">
              <span className="flex items-center">
                <span className="z-[2] h-[26px] w-[26px] rounded-full border-2 border-panel bg-[var(--orb2)]" />
                <span className="-ml-[9px] h-[26px] w-[26px] rounded-full border-2 border-panel bg-saged" />
              </span>
              <span className="text-[14px] font-bold text-ink">{coupleLabel}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line2 text-[16px] text-muted transition-colors hover:bg-panel2 hover:text-ink"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-auto p-[14px]">
          <Link
            href={routes.home}
            onClick={onClose}
            className="mb-[6px] flex items-center justify-between rounded-[13px] bg-bg2 px-[14px] py-[13px] text-[15px] font-bold text-ink"
          >
            Home
            <span className="h-[7px] w-[7px] rounded-full bg-blush" />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-[13px] px-[14px] py-[13px] text-[15px] font-semibold text-ink transition-colors hover:bg-panel2"
            >
              {item.label}
              <span className="text-[15px] text-faint">›</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-line px-[18px] pb-[22px] pt-4">
          <button
            type="button"
            onClick={() => setConfirmLogout(true)}
            className="w-full rounded-xl border border-line2 px-[14px] py-[11px] text-left text-[14px] font-semibold text-muted transition-colors hover:bg-panel2 hover:text-ink"
          >
            Log out
          </button>
        </div>
      </aside>

      <LogoutConfirm open={confirmLogout} onClose={() => setConfirmLogout(false)} />
    </>
  );
}
