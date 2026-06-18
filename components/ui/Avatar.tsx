import { cn } from "@/lib/utils/cn";

type AvatarTone = "blush" | "muted";

interface AvatarProps {
  /** Used to derive the initial (name preferred, else email). */
  name?: string | null;
  email?: string | null;
  size?: number;
  tone?: AvatarTone;
  className?: string;
}

const tones: Record<AvatarTone, string> = {
  blush: "bg-blush-soft text-blushd",
  muted: "bg-bg2 text-muted",
};

function initialOf(name?: string | null, email?: string | null) {
  const source = (name?.trim() || email?.trim() || "?")[0];
  return source.toUpperCase();
}

/** Circular initial avatar. */
export function Avatar({ name, email, size = 30, tone = "blush", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "grid flex-none place-items-center rounded-full font-serif",
        tones[tone],
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      {initialOf(name, email)}
    </span>
  );
}
