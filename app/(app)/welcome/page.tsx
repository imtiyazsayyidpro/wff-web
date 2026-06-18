"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useLogout } from "@/lib/hooks/useLogout";
import { Orb } from "@/components/ui/Orb";
import { buttonVariants } from "@/components/ui/Button";
import { routes } from "@/config/routes";

export default function WelcomePage() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(170deg,var(--bg),var(--sage-soft))] px-[26px] py-10 text-center text-ink">
      <div className="max-w-[400px]">
        <Orb size={96} drift className="mx-auto mb-[30px]" />

        <div className="mb-[18px] inline-flex items-center gap-[7px] rounded-full bg-sage-soft px-[14px] py-[6px]">
          <span className="h-[7px] w-[7px] rounded-full bg-saged" />
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-saged">
            Verified
          </span>
        </div>

        <h1 className="mb-[14px] font-serif text-[38px] leading-[1.14]">
          You&apos;re in. Welcome{user?.name ? `, ${user.name}` : ""}.
        </h1>
        <p className="mx-auto mb-[30px] max-w-[340px] text-[16px] leading-[1.65] text-muted">
          Your account is confirmed and your space is ready. Let&apos;s take a quiet moment to set
          things up.
        </p>

        <Link href={routes.onboarding} className={buttonVariants({ size: "lg" })}>
          Let&apos;s begin
        </Link>

        <p className="mt-6 text-[13px] text-faint">
          Not you?{" "}
          <button
            type="button"
            onClick={() => logout.mutate()}
            className="cursor-pointer font-semibold text-muted hover:text-ink"
          >
            Log out
          </button>
        </p>
      </div>
    </main>
  );
}
