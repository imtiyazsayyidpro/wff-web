import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { routes } from "@/config/routes";

/** Public top navigation for the landing page. */
export function MarketingNav() {
  return (
    <nav className="flex items-center justify-between gap-3 px-4 py-6 md:px-[54px]">
      <Link href={routes.landing} aria-label="Worth Fighting For home" className="min-w-0">
        <Logo size="md" hideWordmarkOnMobile />
      </Link>
      <div className="flex items-center gap-2 sm:gap-[10px]">
        <ThemeToggle />
        {/* Auth CTAs are hidden on phones; the page body provides the mobile entry points. */}
        <div className="hidden items-center gap-[10px] sm:flex">
          <Link
            href={routes.login}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Log in
          </Link>
          <Link
            href={routes.register}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Begin together
          </Link>
        </div>
      </div>
    </nav>
  );
}
