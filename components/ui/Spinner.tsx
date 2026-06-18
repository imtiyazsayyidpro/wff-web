import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  /** Diameter in px. */
  size?: number;
  className?: string;
}

/** Small circular loading spinner. Inherits ring color from currentColor. */
export function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current/30 border-t-current",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
