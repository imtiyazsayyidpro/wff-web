import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Orb } from "@/components/ui/Orb";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Legal · Worth Fighting For" };

const DOCS = [
  {
    href: routes.legalTerms,
    title: "Terms of Service",
    body: "The agreement between you and us — who can use Worth Fighting For, how band-aids work, and the limits of what this is.",
  },
  {
    href: routes.legalPrivacy,
    title: "Privacy Policy",
    body: "What we collect, why, how your conversations are handled, and the choices you have over your data.",
  },
  {
    href: routes.legalRefunds,
    title: "Refund Policy",
    body: "How payments and band-aids work, and how we make things right if something goes wrong on our side.",
  },
];

export default function LegalHubPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <MarketingNav />

      <div className="mx-auto w-full max-w-[760px] px-6 pb-20 pt-4 md:px-8">
        <header className="animate-rise">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.26em] text-blush">
            The fine print, gently
          </div>
          <h1 className="font-serif text-[34px] leading-[1.1] tracking-[-0.01em] md:text-[44px]">
            Our promises, in writing.
          </h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-muted md:text-[17px]">
            We&apos;ve tried to keep these readable. They explain how Worth Fighting For works,
            how we look after your data, and what to do if something isn&apos;t right.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {DOCS.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="group rounded-[22px] border border-line bg-panel p-[26px] transition-colors hover:border-line2"
            >
              <h2 className="font-serif text-[21px] text-ink md:text-[23px]">{doc.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.65] text-muted">{doc.body}</p>
              <span className="mt-4 inline-block text-[13.5px] font-semibold text-blushd">
                Read →
              </span>
            </Link>
          ))}
        </div>

        <footer className="mt-14 flex items-center gap-3 border-t border-line pt-8 text-[13.5px] text-muted">
          <Orb size={26} />
          <p>
            Anything unclear? Reach us at{" "}
            <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
              info@worthfightingfor.in
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
