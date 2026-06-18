"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useIncomingRequests } from "@/lib/hooks/usePartnership";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogoutConfirm } from "@/components/layout/LogoutConfirm";
import { routes } from "@/config/routes";

interface AppHeaderProps {
  /** Show the "Requests" button with an incoming-count badge. */
  showRequests?: boolean;
}

/** Authenticated top bar: brand, optional requests button, user + logout. */
export function AppHeader({ showRequests = true }: AppHeaderProps) {
  const { user } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { data: incoming } = useIncomingRequests();
  const incomingCount = incoming?.length ?? 0;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
        <Link href={routes.home} aria-label="Home" className="min-w-0">
          <Logo size="md" hideWordmarkOnMobile />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {showRequests && (
            <Link
              href={routes.requests}
              className="relative inline-flex items-center gap-2 rounded-full border border-line2 px-4 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:bg-panel2"
            >
              Requests
              {incomingCount > 0 && (
                <span className="grid h-[19px] min-w-[19px] place-items-center rounded-full bg-blush px-[5px] text-[11px] font-bold text-white">
                  {incomingCount}
                </span>
              )}
            </Link>
          )}

          <ThemeToggle />

          <div className="flex items-center gap-[9px] border-l border-line pl-3 md:pl-5">
            <Avatar name={user?.name} email={user?.email} />
            <span className="hidden text-[14px] font-semibold text-ink sm:inline">
              {user?.name ?? user?.email}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="cursor-pointer text-[13.5px] text-muted transition-colors hover:text-ink"
          >
            Log out
          </button>
        </div>
      </div>

      <LogoutConfirm open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </header>
  );
}
