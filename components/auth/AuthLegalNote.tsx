import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { routes } from "@/config/routes";

/**
 * Quiet consent line shown beneath the auth forms. Blends with the foot-of-page
 * Disclaimer: same faint weight, links to the public legal documents.
 */
export function AuthLegalNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "mx-auto max-w-[340px] text-center text-[11.5px] leading-[1.6] text-faint",
        className,
      )}
    >
      By continuing, you agree to our{" "}
      <Link href={routes.legalTerms} className="font-semibold text-muted underline decoration-line2 underline-offset-2 hover:text-ink">
        Terms
      </Link>
      ,{" "}
      <Link href={routes.legalPrivacy} className="font-semibold text-muted underline decoration-line2 underline-offset-2 hover:text-ink">
        Privacy Policy
      </Link>{" "}
      &amp;{" "}
      <Link href={routes.legalRefunds} className="font-semibold text-muted underline decoration-line2 underline-offset-2 hover:text-ink">
        Refund Policy
      </Link>
      .
    </p>
  );
}
