"use client";

import { useLogout } from "@/lib/hooks/useLogout";

interface LogoutConfirmProps {
  open: boolean;
  onClose: () => void;
}

/** A calm confirmation before signing out. Self-contained — handles the logout. */
export function LogoutConfirm({ open, onClose }: LogoutConfirmProps) {
  const logout = useLogout();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(20,15,24,0.42)] px-5 animate-fade"
      onClick={logout.isPending ? undefined : onClose}
    >
      <div
        className="w-full max-w-[380px] rounded-[24px] border border-line bg-panel p-7 text-center shadow-[0_30px_70px_-30px_var(--shadow)] animate-rise"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Log out"
      >
        <span className="mx-auto mb-[18px] grid h-[52px] w-[52px] place-items-center rounded-full border border-line2 bg-panel2 text-muted">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        </span>

        <h3 className="mb-2 font-serif text-[23px] leading-[1.2] text-ink">Log out?</h3>
        <p className="mx-auto mb-6 max-w-[300px] text-[14px] leading-[1.6] text-muted">
          You&apos;ll need to sign back in to return to your conversations. Your shared space stays
          right where you left it.
        </p>

        <button
          type="button"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="w-full rounded-[15px] bg-ink py-[15px] text-[15.5px] font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {logout.isPending ? "Signing out…" : "Log out"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={logout.isPending}
          className="mt-3 text-[13.5px] font-semibold text-muted transition-colors hover:text-ink disabled:opacity-60"
        >
          Stay signed in
        </button>
      </div>
    </div>
  );
}
