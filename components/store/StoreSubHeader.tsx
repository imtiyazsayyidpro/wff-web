import type { ReactNode } from "react";
import Link from "next/link";

interface StoreSubHeaderProps {
  title: string;
  backHref: string;
  /** Optional right-aligned content (e.g. a balance pill). */
  right?: ReactNode;
  /** Header background (the invoice page uses bg2). */
  background?: "bg" | "bg2";
}

export function StoreSubHeader({ title, backHref, right, background = "bg" }: StoreSubHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-20 border-b border-line ${
        background === "bg2" ? "bg-bg2" : "bg-bg"
      }`}
    >
      {/* Centred to the app-shell width so the back arrow + title align with content. */}
      <div className="mx-auto flex max-w-[960px] items-center gap-3 px-5 py-4 md:px-8">
        <Link
          href={backHref}
          className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border border-line2 text-[18px] text-muted transition-colors hover:bg-panel2 hover:text-ink"
        >
          ‹
        </Link>
        <div className="flex-1 font-serif text-[18px]">{title}</div>
        {right}
      </div>
    </div>
  );
}
