import { cn } from "@/lib/utils/cn";

/** The little rotated band-aid plaster glyph used throughout the app. */
export function BandAidGlyph({
  width = 30,
  className,
  faded = false,
}: {
  width?: number;
  className?: string;
  faded?: boolean;
}) {
  const height = Math.round(width * 0.44);
  const dot = Math.round(width * 0.33);
  return (
    <span
      className={cn("relative inline-block flex-none rotate-[-42deg]", className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <span
        className={cn("absolute inset-0 rounded-full bg-blush", faded && "opacity-50")}
      />
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-blush-soft"
        style={{ width: dot, height: dot }}
      />
    </span>
  );
}
