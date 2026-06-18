import { cn } from "@/lib/utils/cn";

/** The recurring "not therapy" safety note shown at the foot of auth screens. */
export function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "mx-auto max-w-[340px] text-center text-[11.5px] leading-[1.55] text-faint",
        className,
      )}
    >
      AI-guided conversations — not therapy or a substitute for professional care.
    </p>
  );
}
