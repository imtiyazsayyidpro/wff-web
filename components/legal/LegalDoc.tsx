import type { ReactNode } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Orb } from "@/components/ui/Orb";
import { cn } from "@/lib/utils/cn";
import { routes } from "@/config/routes";

/* ============================================================================
   Shared chrome + prose primitives for the public legal documents.
   Styled to match the "First Light" theme so the policies read as part of
   the app, not a bolted-on wall of text.
   ========================================================================== */

type LegalKey = "terms" | "privacy" | "refunds";

const DOCS: { key: LegalKey; label: string; href: string }[] = [
  { key: "terms", label: "Terms of Service", href: routes.legalTerms },
  { key: "privacy", label: "Privacy Policy", href: routes.legalPrivacy },
  { key: "refunds", label: "Refund Policy", href: routes.legalRefunds },
];

interface LegalShellProps {
  /** Which document this is — used to highlight the cross-doc nav. */
  current: LegalKey;
  /** Small uppercase eyebrow above the title. */
  eyebrow: string;
  title: string;
  /** One or two sentences setting the tone under the title. */
  lead: string;
  /** Human-readable "last updated" date, e.g. "18 June 2026". */
  updated: string;
  children: ReactNode;
}

/** Full page frame for a single legal document. */
export function LegalShell({ current, eyebrow, title, lead, updated, children }: LegalShellProps) {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <MarketingNav />

      <div className="mx-auto w-full max-w-[760px] px-6 pb-20 pt-4 md:px-8">
        {/* header */}
        <header className="animate-rise">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.26em] text-blush">
            {eyebrow}
          </div>
          <h1 className="font-serif text-[34px] leading-[1.1] tracking-[-0.01em] md:text-[44px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-muted md:text-[17px]">
            {lead}
          </p>
          <p className="mt-5 text-[13px] text-faint">Last updated · {updated}</p>
        </header>

        {/* cross-document nav */}
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Legal documents">
          {DOCS.map((doc) => {
            const active = doc.key === current;
            return (
              <Link
                key={doc.key}
                href={doc.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-[14px] py-[7px] text-[13px] font-semibold transition-colors",
                  active
                    ? "border-transparent bg-blush text-white"
                    : "border-line2 bg-panel text-muted hover:text-ink",
                )}
              >
                {doc.label}
              </Link>
            );
          })}
        </nav>

        {/* body */}
        <article className="mt-10 space-y-9">{children}</article>

        {/* footer */}
        <footer className="mt-16 border-t border-line pt-8">
          <div className="flex items-center gap-3 text-[13.5px] text-muted">
            <Orb size={26} />
            <p>
              Questions about this document? Write to us at{" "}
              <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
                info@worthfightingfor.in
              </a>
              .
            </p>
          </div>
          <Link
            href={routes.landing}
            className="mt-6 inline-block text-[13.5px] font-semibold text-blushd no-underline"
          >
            ← Back to Worth Fighting For
          </Link>
        </footer>
      </div>
    </main>
  );
}

/** A numbered/titled section of a document. */
export function Section({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-serif text-[22px] leading-[1.2] text-ink md:text-[25px]">{heading}</h2>
      <div className="mt-3 space-y-[14px]">{children}</div>
    </section>
  );
}

/** A body paragraph. */
export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-[1.75] text-muted">{children}</p>;
}

/** A bulleted list. */
export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-[10px] pl-1">
      {children}
    </ul>
  );
}

export function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-[10px] text-[15px] leading-[1.7] text-muted">
      <span aria-hidden="true" className="mt-[10px] h-[5px] w-[5px] flex-none rounded-full bg-blush" />
      <span>{children}</span>
    </li>
  );
}

/** Inline emphasis that stays on-brand (ink, semibold). */
export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-ink">{children}</strong>;
}

/** A highlighted note. `tone="warn"` for safety/important items, else a soft panel. */
export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[18px] border p-[18px] md:p-5",
        tone === "warn"
          ? "border-blush/40 bg-blush-soft"
          : "border-line2 bg-panel2",
      )}
    >
      {title && <div className="mb-[6px] text-[14.5px] font-bold text-ink">{title}</div>}
      <div className="space-y-[10px] text-[14px] leading-[1.7] text-muted">{children}</div>
    </div>
  );
}
