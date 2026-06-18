import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the soft elevation shadow used on prominent panels. */
  elevated?: boolean;
}

/** Surface panel: bordered, rounded container on the panel background. */
export function Card({ elevated, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-line bg-panel p-[30px]",
        elevated && "shadow-[0_20px_50px_-38px_var(--shadow)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
