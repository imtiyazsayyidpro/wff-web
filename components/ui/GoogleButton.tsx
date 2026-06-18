import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

interface GoogleButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children?: string;
  className?: string;
}

/** "Continue with Google" — full-width outline button with the Google mark. */
export function GoogleButton({
  onClick,
  isLoading,
  disabled,
  children = "Continue with Google",
  className,
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "flex w-full items-center justify-center gap-[11px] rounded-full border border-line2",
        "bg-panel px-4 py-[14px] text-[15px] font-bold text-ink",
        "cursor-pointer transition-colors hover:bg-panel2 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {isLoading ? <Spinner size={18} /> : <GoogleIcon />}
      {children}
    </button>
  );
}
