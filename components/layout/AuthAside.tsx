import { Logo } from "@/components/ui/Logo";
import { Orb } from "@/components/ui/Orb";
import { cn } from "@/lib/utils/cn";

interface AuthAsideProps {
  headline: string;
  subcopy: string;
  footer: string;
  /** Gradient direction of the warm/cool wash. */
  gradient?: "blush-sage" | "sage-blush";
}

/**
 * The desktop-only decorative side panel for split auth screens (register /
 * login): brand mark, breathing orb, a warm line of copy.
 */
export function AuthAside({
  headline,
  subcopy,
  footer,
  gradient = "blush-sage",
}: AuthAsideProps) {
  return (
    <div
      className={cn(
        "relative hidden w-[46%] flex-none flex-col overflow-hidden p-[46px] lg:flex",
        gradient === "blush-sage"
          ? "bg-[linear-gradient(165deg,var(--blush-soft),var(--sage-soft))]"
          : "bg-[linear-gradient(165deg,var(--sage-soft),var(--blush-soft))]",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--orb-glow),transparent_58%)]"
      />

      <div className="relative">
        <Logo size="md" />
      </div>

      <div className="relative my-auto">
        <Orb size={96} className="mb-[30px]" />
        <p className="max-w-[380px] font-serif text-[34px] leading-[1.28] text-ink">
          {headline}
        </p>
        <p className="mt-[18px] max-w-[340px] text-[16px] leading-[1.6] text-muted">
          {subcopy}
        </p>
      </div>

      <div className="relative text-[13px] tracking-[0.02em] text-faint">{footer}</div>
    </div>
  );
}
