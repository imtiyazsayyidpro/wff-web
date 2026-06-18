import Link from "next/link";
import { Orb } from "@/components/ui/Orb";
import { buttonVariants } from "@/components/ui/Button";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { HowItWorksCard } from "@/components/marketing/HowItWorksCard";
import { CounselorCarousel } from "@/components/marketing/CounselorCarousel";
import { routes } from "@/config/routes";

const HOW_STEPS = [
  {
    index: "01",
    title: "Invite the one you love",
    body: "Create your account, then invite your partner. You connect privately — just the two of you, no one else in the room.",
  },
  {
    index: "02",
    title: "Take turns, gently guided",
    body: "Your AI counselor helps you take turns, slow down, and truly hear one another — keeping things kind when feelings run high.",
  },
  {
    index: "03",
    title: "One band-aid, one hour",
    body: "Sessions run on band-aids — small acts of repair. One band-aid covers a single one-hour guided conversation. Add more whenever you need them.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <MarketingNav />

      {/* hero */}
      <section className="grid items-center gap-10 px-6 pb-14 pt-6 md:px-[54px] lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 text-[12px] font-bold uppercase tracking-[0.28em] text-blush">
            For the two of you
          </div>
          <h1 className="mb-[22px] font-serif text-[42px] leading-[1.06] tracking-[-0.01em] md:text-[60px]">
            Come back to the same side.
          </h1>
          <p className="mb-8 max-w-[480px] text-[16px] leading-[1.65] text-muted md:text-[18.5px]">
            A calm AI counselor sits between the two of you and gently guides a turn-based
            conversation — one honest exchange at a time — so the hard moments bring you closer
            instead of further apart.
          </p>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Link href={routes.register} className={buttonVariants({ size: "lg" })}>
              Begin together
            </Link>
            <Link
              href={routes.login}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Log in
            </Link>
          </div>
          <div className="flex items-center gap-[10px] text-[13.5px] text-faint">
            <span>Private</span>
            <span className="opacity-50">·</span>
            <span>Just the two of you</span>
            <span className="opacity-50">·</span>
            <span>Free to start</span>
          </div>
        </div>

        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,var(--blush-soft),var(--sage-soft))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,var(--orb-glow),transparent_60%)]"
          />
          <Orb size={160} />
          <div className="absolute inset-x-0 bottom-6 text-center text-[12.5px] uppercase tracking-[0.16em] text-ink/55">
            A steady, gentle presence
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="px-6 py-5 md:px-[54px]">
        <div className="mb-[34px] text-center">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.26em] text-sage">
            How it works
          </div>
          <h2 className="font-serif text-[28px] md:text-[34px]">
            Three small steps back to each other.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {HOW_STEPS.map((step) => (
            <HowItWorksCard key={step.index} {...step} />
          ))}
        </div>
      </section>

      {/* choose your counsellor */}
      <section className="px-6 py-16 md:px-[54px]">
        <div
          className="relative rounded-[28px] bg-[linear-gradient(160deg,var(--sage-soft),var(--blush-soft))] px-4 py-12 md:px-10 md:py-14"
          style={{ overflowX: "clip", overflowClipMargin: "1px" }}
        >
          <div className="mb-2 text-center">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.26em] text-blush">
              Your counselor
            </div>
            <h2 className="mx-auto max-w-[560px] font-serif text-[28px] leading-[1.12] md:text-[34px]">
              Find the presence that feels right.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.6] text-muted md:text-[16px]">
              Six gentle guides, each with their own calm. Drift through and choose the one you&apos;d
              both feel at ease with — you can always change your mind together later.
            </p>
          </div>

          <div className="mt-6">
            <CounselorCarousel />
          </div>
        </div>
      </section>

      {/* band-aid reassurance */}
      <section className="px-6 pt-[30px] md:px-[54px]">
        <div className="flex items-center gap-[18px] rounded-[18px] border border-line bg-panel2 px-[26px] py-5">
          <span className="relative inline-block h-[13px] w-[30px] flex-none rotate-[-42deg]">
            <span className="absolute inset-0 rounded-[7px] bg-blush" />
            <span className="absolute left-1/2 top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-blush-soft" />
          </span>
          <p className="text-[14.5px] leading-[1.6] text-muted">
            <strong className="font-bold text-ink">1 band-aid = one 1-hour session.</strong> No
            subscriptions to wrestle with — you only ever use a band-aid when the two of you sit
            down together.
          </p>
        </div>
      </section>

      {/* closing moment */}
      <section className="px-6 py-10 md:px-[54px]">
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,var(--bg2),var(--blush-soft))] px-10 py-16 text-center">
          <Orb size={54} className="mx-auto mb-[26px]" />
          <p className="mx-auto max-w-[680px] font-serif text-[26px] leading-[1.3] md:text-[36px]">
            The goal was never to win the argument. It&apos;s to stay on the same side.
          </p>
          <Link
            href={routes.register}
            className={buttonVariants({ size: "lg", className: "mt-8" })}
          >
            Begin together
          </Link>
        </div>
      </section>

      {/* footer disclaimer */}
      <footer className="px-6 pb-11 text-center md:px-[54px]">
        <p className="mx-auto max-w-[600px] text-[12.5px] leading-[1.65] text-faint">
          Worth Fighting For offers AI-guided conversations for the two of you. It is{" "}
          <strong className="font-bold text-muted">
            not therapy and not a substitute for professional care
          </strong>{" "}
          from a licensed counselor. If either of you is in crisis or feels unsafe, please contact
          a qualified professional or your local emergency services.
        </p>
      </footer>
    </main>
  );
}
