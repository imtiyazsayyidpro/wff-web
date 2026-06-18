import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

interface AuthShellProps {
  /** The decorative desktop side panel (AuthAside). */
  aside: ReactNode;
  /** The form column content. */
  children: ReactNode;
}

/**
 * Split-screen layout for register/login: decorative aside on the left
 * (desktop only), centred form column on the right with a mobile logo header.
 */
export function AuthShell({ aside, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen bg-bg text-ink">
      {aside}
      <div className="flex flex-1 items-center justify-center overflow-auto px-[26px] py-10">
        <div className="w-full max-w-[392px]">
          <div className="mb-[30px] lg:hidden">
            <Logo size="sm" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
