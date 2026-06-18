import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { routes } from "@/config/routes";

/** Public top navigation for the landing page. */
export function MarketingNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 md:px-[54px]">
      <Link href={routes.landing} aria-label="Worth Fighting For home">
        <Logo size="md" />
      </Link>
      <div className="flex items-center gap-[10px]">
        <ThemeToggle />
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
    </nav>
  );
}
