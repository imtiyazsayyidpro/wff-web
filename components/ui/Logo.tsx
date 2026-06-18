import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { mark: number; text: string }> = {
  sm: { mark: 26, text: "text-[12.5px]" },
  md: { mark: 30, text: "text-[14px]" },
  lg: { mark: 36, text: "text-[16px]" },
};

interface LogoProps {
  size?: LogoSize;
  /** Show the "WORTH FIGHTING FOR" wordmark next to the mark. */
  withWordmark?: boolean;
  /** Hide the wordmark on phones (below the `sm` breakpoint) to save space in crowded headers. */
  hideWordmarkOnMobile?: boolean;
  className?: string;
}

/** The hands-heart brand mark with optional wordmark. */
export function Logo({
  size = "md",
  withWordmark = true,
  hideWordmarkOnMobile = false,
  className,
}: LogoProps) {
  const { mark, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      <BrandMark size={mark} />
      {withWordmark && (
        <span
          className={cn(
            "font-serif tracking-[0.05em] text-ink whitespace-nowrap",
            hideWordmarkOnMobile && "hidden sm:inline",
            text,
          )}
        >
          WORTH FIGHTING FOR
        </span>
      )}
    </div>
  );
}

/**
 * The hands-heart app mark. Both day/night images are rendered and toggled via
 * CSS on the `[data-theme]` attribute — no JS, no hydration flash.
 */
export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex flex-none"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/assets/images/logo-day.png"
        alt=""
        width={size}
        height={size}
        className="block night:hidden"
      />
      <Image
        src="/assets/images/logo-night.png"
        alt=""
        width={size}
        height={size}
        className="hidden night:block"
      />
    </span>
  );
}
