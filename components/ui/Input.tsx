import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders an error ring/border when true (wired up by Field). */
  hasError?: boolean;
}

/**
 * Bare styled text input. Prefer <Field> for labelled inputs with errors;
 * use this directly only when you need a standalone control.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-[14px] border bg-field px-4 py-[14px] text-[15px] text-ink",
          "outline-none transition-[border-color,box-shadow] placeholder:text-faint",
          "focus:border-blush focus:shadow-[0_0_0_3px_var(--blush-soft)]",
          "disabled:opacity-60",
          hasError ? "border-blush" : "border-line2",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
