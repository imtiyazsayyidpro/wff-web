"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompleteOnboarding, useProfile } from "@/lib/hooks/useProfile";
import { AGE_RANGES, GENDER_OPTIONS } from "@/lib/onboarding";
import { routes } from "@/config/routes";
import type { Gender } from "@/types/auth";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type Step = "age" | "gender";

export function OnboardingFlow() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const complete = useCompleteOnboarding();

  const [step, setStep] = useState<Step>("age");
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);

  // Already onboarded? Don't show this again.
  useEffect(() => {
    if (profile?.onboardingCompletedAt) router.replace(routes.home);
  }, [profile?.onboardingCompletedAt, router]);

  const finish = () => {
    complete.mutate(
      {
        ...(age !== null ? { age } : {}),
        ...(gender !== null ? { gender } : {}),
      },
      { onSuccess: () => router.replace(routes.home) },
    );
  };

  const isAgeStep = step === "age";

  return (
    <main className="flex min-h-screen flex-col bg-[linear-gradient(170deg,var(--bg),var(--blush-soft))] text-ink">
      <div className="flex items-center justify-between px-6 py-6 md:px-10">
        <Logo size="sm" />
        <button
          type="button"
          onClick={finish}
          disabled={complete.isPending}
          className="cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-semibold text-muted transition-colors hover:text-ink disabled:opacity-60"
        >
          Skip for now
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto px-6 pb-10 pt-2">
        <div className="w-full max-w-[480px]">
          {/* progress */}
          <div className="mb-[26px] flex items-center gap-2">
            <span className="h-1 flex-1 rounded-full bg-blush" />
            <span className={cn("h-1 flex-1 rounded-full", isAgeStep ? "bg-line2" : "bg-blush")} />
            <span className="ml-[6px] whitespace-nowrap text-[12px] text-faint">
              Step {isAgeStep ? 1 : 2} of 2
            </span>
          </div>

          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.22em] text-blush">
            Helps the mediator understand you
          </p>

          {isAgeStep ? (
            <>
              <h1 className="mb-3 font-serif text-[33px] leading-[1.14]">How old are you?</h1>
              <p className="mb-6 max-w-[400px] text-[15.5px] leading-[1.6] text-muted">
                Just a rough sense is plenty — it helps your counselor meet you where you are.
                There&apos;s no pressure, and you can skip it.
              </p>
              <div className="flex flex-wrap gap-[10px]">
                {AGE_RANGES.map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setAge(range.value)}
                    className={cn(
                      "rounded-[14px] border-[1.5px] px-5 py-[13px] text-[15px] font-semibold transition-colors",
                      age === range.value
                        ? "border-blush bg-blush-soft text-ink"
                        : "border-line2 bg-transparent text-ink hover:border-blush",
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-3 font-serif text-[33px] leading-[1.14]">
                How do you describe yourself?
              </h1>
              <p className="mb-6 max-w-[400px] text-[15.5px] leading-[1.6] text-muted">
                Choose whatever fits best. This stays gentle and optional — your counselor learns
                far more from your conversations over time.
              </p>
              <div className="flex flex-col gap-[10px]">
                {GENDER_OPTIONS.map((option) => {
                  const selected = gender === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setGender(option.value)}
                      className={cn(
                        "flex items-center gap-[13px] rounded-[14px] border-[1.5px] px-[18px] py-[15px] text-left text-[15px] font-semibold text-ink transition-colors",
                        selected ? "border-blush bg-blush-soft" : "border-line2 hover:border-blush",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-[18px] w-[18px] flex-none place-items-center rounded-full border-[1.5px]",
                          selected ? "border-blush" : "border-line2",
                        )}
                      >
                        {selected && <span className="h-[9px] w-[9px] rounded-full bg-blush" />}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* nav */}
          <div className="mt-[30px] flex items-center gap-3">
            {!isAgeStep && (
              <Button variant="secondary" onClick={() => setStep("age")}>
                Back
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => (isAgeStep ? setStep("gender") : finish())}
              disabled={complete.isPending}
            >
              {isAgeStep ? "Skip this step" : "Skip"}
            </Button>
            <Button
              className="ml-auto"
              onClick={() => (isAgeStep ? setStep("gender") : finish())}
              isLoading={!isAgeStep && complete.isPending}
              loadingText="Saving…"
            >
              {isAgeStep ? "Continue" : "Finish"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
