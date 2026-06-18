"use client";

import type { CSSProperties } from "react";
import type { FloatingHeart } from "@/lib/hooks/useHearts";

/** A soft, rounded heart path (filled), tuned to read well at small sizes. */
const HEART_PATH =
  "M12 21.6c-.5 0-.97-.18-1.34-.5C6.2 17.2 2 13.66 2 8.9 2 5.96 4.28 3.7 7.2 3.7c1.86 0 3.5.96 4.8 2.6 1.3-1.64 2.94-2.6 4.8-2.6C19.72 3.7 22 5.96 22 8.9c0 4.76-4.2 8.3-8.66 12.2-.37.32-.84.5-1.34.5z";

/** Renders the transient hearts floating up over the session. */
export function FloatingHearts({ hearts }: { hearts: FloatingHeart[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[18] overflow-hidden">
      {hearts.map((heart) => {
        const gradId = `wf-heart-grad-${heart.id}`;
        return (
          <span
            key={heart.id}
            className="absolute bottom-[86px]"
            style={
              {
                left: `${heart.left}%`,
                "--hs": heart.scale,
                "--hdrift": `${heart.drift}px`,
                animation: `wf-heart-float ${heart.duration}s cubic-bezier(0.22, 0.6, 0.36, 1) forwards`,
              } as CSSProperties
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              style={{ filter: "drop-shadow(0 4px 7px var(--orb-glow))" }}
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--orb1)" />
                  <stop offset="55%" stopColor="var(--blush)" />
                  <stop offset="100%" stopColor="var(--blushd)" />
                </linearGradient>
              </defs>
              <path d={HEART_PATH} fill={`url(#${gradId})`} />
              {/* soft sheen on the upper-left lobe for a little dimension */}
              <path
                d={HEART_PATH}
                fill="rgba(255,255,255,0.45)"
                style={{
                  transform: "scale(0.4) translate(7px, 8px)",
                  transformOrigin: "center",
                  filter: "blur(1px)",
                }}
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
