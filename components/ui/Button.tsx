import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans cursor-pointer " +
  "transition-[opacity,background-color,color] disabled:cursor-not-allowed disabled:opacity-60 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-bg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-bg font-bold hover:opacity-90",
  secondary:
    "border border-line2 bg-transparent text-ink font-semibold hover:bg-panel2",
  ghost: "bg-transparent text-muted font-semibold hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-[18px] py-[10px] text-[13.5px]",
  md: "px-[22px] py-[13px] text-[14.5px]",
  lg: "px-8 py-[15px] text-[15.5px]",
};

/** Generate button classes for non-button elements (e.g. a styled link). */
export function buttonVariants({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Shows a spinner and disables the button. */
  isLoading?: boolean;
  /** Text shown next to the spinner while loading (defaults to children). */
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth,
      isLoading = false,
      loadingText,
      className,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {isLoading && <Spinner size={16} />}
        {isLoading ? (loadingText ?? children) : children}
      </button>
    );
  },
);

Button.displayName = "Button";
