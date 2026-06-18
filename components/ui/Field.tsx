import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FieldProps {
  label: string;
  /** Associates the label with the control. */
  htmlFor?: string;
  /** Right-aligned label affordance, e.g. an "Optional" note or "Forgot?" link. */
  labelRight?: ReactNode;
  /** Helper text shown below the control when there's no error. */
  hint?: string;
  /** Error message; when present it replaces the hint and is announced. */
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Labelled form field: label row + control (children) + hint/error. */
export function Field({
  label,
  htmlFor,
  labelRight,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("block", className)}>
      <div className="mb-[7px] flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-semibold text-ink"
        >
          {label}
        </label>
        {labelRight && (
          <span className="text-[13px] font-medium text-faint">{labelRight}</span>
        )}
      </div>

      {children}

      {error ? (
        <p role="alert" className="mt-[7px] text-[12px] text-blushd">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-[7px] text-[12px] text-faint">{hint}</p>
      ) : null}
    </div>
  );
}
