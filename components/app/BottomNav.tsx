"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

type IconProps = SVGProps<SVGSVGElement>;

function HomeIcon(props: IconProps) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v8h12v-8" />
    </svg>
  );
}
function BandAidIcon(props: IconProps) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-40 12 12)" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
function MemoriesIcon(props: IconProps) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 9a3.5 3.5 0 0 1 7 1.5C19 15.6 12 20 12 20z" />
    </svg>
  );
}
function AccountIcon(props: IconProps) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

const TABS = [
  { href: routes.home, label: "Home", icon: HomeIcon, match: (p: string) => p === routes.home },
  { href: routes.store, label: "Band-aids", icon: BandAidIcon, match: (p: string) => p.startsWith("/store") },
  { href: routes.memories, label: "Memories", icon: MemoriesIcon, match: (p: string) => p === routes.memories },
  { href: routes.settings, label: "Settings", icon: AccountIcon, match: (p: string) => p === routes.settings },
];

/** App-style bottom tab bar — mobile only. Icon-only, with a soft blush
 *  "pill" gliding behind the active tab. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 rounded-t-[28px] border-t border-line bg-panel shadow-[0_-14px_36px_-20px_var(--shadow)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-[440px] items-center justify-around px-3 py-[10px]">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className="grid place-items-center px-2"
            >
              <span
                className={cn(
                  "grid h-[46px] w-[46px] place-items-center rounded-full transition-all duration-300",
                  active
                    ? "bg-blush-soft text-blushd scale-105"
                    : "text-faint hover:text-muted",
                )}
              >
                <Icon />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
