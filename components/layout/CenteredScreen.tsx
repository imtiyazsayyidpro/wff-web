import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ScreenBackground = "plain" | "blush" | "sage";

const backgrounds: Record<ScreenBackground, string> = {
  plain: "bg-bg",
  blush: "bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))]",
  sage: "bg-[linear-gradient(170deg,var(--bg),var(--sage-soft))]",
};

interface CenteredScreenProps {
  children: ReactNode;
  /** Background wash. */
  background?: ScreenBackground;
  /** Max width of the centred column in px. */
  maxWidth?: number;
  className?: string;
}

/** Full-height, vertically + horizontally centred single-column screen. */
export function CenteredScreen({
  children,
  background = "plain",
  maxWidth = 400,
  className,
}: CenteredScreenProps) {
  return (
    <main
      className={cn(
        "flex min-h-screen items-center justify-center px-[26px] py-10 text-ink",
        backgrounds[background],
      )}
    >
      <div className={cn("w-full", className)} style={{ maxWidth }}>
        {children}
      </div>
    </main>
  );
}
