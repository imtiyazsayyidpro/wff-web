import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type AlertVariant = "error" | "info";

interface AlertProps {
  variant?: AlertVariant;
  /** Override the leading icon (e.g. the Google mark). */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const surfaces: Record<AlertVariant, string> = {
  error: "bg-blush-soft border-blush",
  info: "bg-sage-soft border-sage",
};

function DefaultIcon({ variant }: { variant: AlertVariant }) {
  if (variant === "error") {
    return (
      <span className="mt-px grid h-[18px] w-[18px] flex-none place-items-center rounded-full border-[1.5px] border-blushd text-[12px] font-bold text-blushd">
        !
      </span>
    );
  }
  return (
    <span className="mt-[6px] h-[7px] w-[7px] flex-none rounded-full bg-saged" />
  );
}

/** Inline contextual message — form errors, confirmations, hints. */
export function Alert({ variant = "error", icon, children, className }: AlertProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-[11px] rounded-[14px] border px-[15px] py-[14px] animate-rise",
        surfaces[variant],
        className,
      )}
    >
      <span className="flex-none">{icon ?? <DefaultIcon variant={variant} />}</span>
      <div className="text-[13.5px] leading-[1.5] text-ink">{children}</div>
    </div>
  );
}
