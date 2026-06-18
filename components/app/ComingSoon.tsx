import Link from "next/link";
import { Orb } from "@/components/ui/Orb";
import { buttonVariants } from "@/components/ui/Button";
import { routes } from "@/config/routes";

/** Placeholder for routes that are linked but not yet designed/built. */
export function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-12 text-center text-ink">
      <div className="max-w-[380px]">
        <Orb size={72} drift className="mx-auto mb-7" />
        <h1 className="mb-3 font-serif text-[30px] leading-[1.14]">{title}</h1>
        <p className="mb-8 text-[15px] leading-[1.6] text-muted">
          {note ?? "This part of your space is on its way. Check back soon."}
        </p>
        <Link href={routes.home} className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Back home
        </Link>
      </div>
    </main>
  );
}
