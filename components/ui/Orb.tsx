import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface OrbProps {
  /** Diameter in px. */
  size?: number;
  /** Adds the gentle floating drift (used on threshold / hero moments). */
  drift?: boolean;
  /** Optional counsellor image rendered inside the orb, clipped to the circle. */
  imageUrl?: string | null;
  /** Alt text for the counsellor image (their name). */
  imageAlt?: string;
  /** Optional centred contents (e.g. an icon inside the orb). */
  children?: ReactNode;
  className?: string;
}

/**
 * The mediator's "abstract glowing presence" — a breathing orb with a soft
 * radial glow halo. Used throughout as the brand's emotional centrepiece.
 * When an `imageUrl` is supplied, the counsellor's portrait sits inside the orb.
 */
export function Orb({ size = 84, drift = false, imageUrl, imageAlt = "", children, className }: OrbProps) {
  return (
    <div
      className={cn("relative grid place-items-center", drift && "animate-drift", className)}
      style={{ width: size, height: size } as CSSProperties}
    >
      {/* glow halo */}
      <span
        aria-hidden="true"
        className="absolute rounded-full animate-glow"
        style={{
          inset: "-45%",
          background:
            "radial-gradient(circle, var(--orb-glow), transparent 70%)",
          filter: "blur(16px)",
        }}
      />
      {/* the orb itself */}
      <span
        aria-hidden="true"
        className="relative grid h-full w-full place-items-center overflow-hidden rounded-full animate-breathe"
        style={{
          background:
            "radial-gradient(circle at 36% 30%, var(--orb1), var(--orb2) 72%)",
          boxShadow: "0 12px 40px -8px var(--orb-glow)",
        }}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={size * 2}
              height={size * 2}
              className="absolute inset-0 h-full w-full rounded-full object-cover"
              style={{
                // melt the portrait's edges into the orb's glow so it stays spherical
                maskImage:
                  "radial-gradient(circle at 50% 50%, #000 64%, transparent 97%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, #000 64%, transparent 97%)",
              }}
            />
            {/* glass body — top sheen, a curved rim light, and a shadow pooling
                at the base so the scene reads as if held inside a glass globe */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.30), rgba(255,255,255,0) 38%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.18))",
                boxShadow:
                  "inset 0 1.5px 3px rgba(255,255,255,0.6), inset 0 -14px 28px -12px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.22)",
              }}
            />
            {/* crisp specular highlight — light catching the curve of the glass */}
            <span
              className="pointer-events-none absolute rounded-full"
              style={{
                top: "9%",
                left: "16%",
                width: "42%",
                height: "27%",
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.85), rgba(255,255,255,0) 68%)",
                transform: "rotate(-22deg)",
                filter: `blur(${Math.max(1, size * 0.015)}px)`,
              }}
            />
          </>
        ) : (
          children
        )}
      </span>
    </div>
  );
}
