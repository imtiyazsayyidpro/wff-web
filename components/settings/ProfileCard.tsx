"use client";

import { useEffect, useRef, useState } from "react";
import { useProfile, useUpdateProfile } from "@/lib/hooks/useProfile";
import { GENDER_OPTIONS } from "@/lib/onboarding";
import type { Gender } from "@/types/auth";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const AUTH_LABEL: Record<string, string> = {
  EMAIL: "Email & password",
  GOOGLE: "Google",
};

export function ProfileCard({ onSaved }: { onSaved: () => void }) {
  const { data: profile } = useProfile();
  const update = useUpdateProfile();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const seeded = useRef(false);

  useEffect(() => {
    if (profile && !seeded.current) {
      setName(profile.name ?? "");
      setAge(profile.age ? String(profile.age) : "");
      setGender(profile.gender ?? null);
      seeded.current = true;
    }
  }, [profile]);

  const save = () => {
    const ageNum = Number(age);
    update.mutate(
      {
        name: name.trim() || undefined,
        age: age && ageNum >= 13 && ageNum <= 120 ? ageNum : undefined,
        gender: gender ?? undefined,
      },
      { onSuccess: onSaved },
    );
  };

  return (
    <section>
      <h2 className="mx-[2px] mb-3 mt-[6px] font-serif text-[20px]">Your profile</h2>
      <div className="flex flex-col gap-4 rounded-[18px] border border-line bg-panel p-5">
        <label className="block">
          <span className="mb-[7px] ml-[2px] block text-[12px] font-bold tracking-[0.04em] text-muted">
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-line2 bg-field px-[15px] py-[13px] text-[15px] text-ink outline-none focus:border-blush focus:shadow-[0_0_0_3px_var(--blush-soft)]"
          />
        </label>

        <label className="block">
          <span className="mb-[7px] ml-[2px] block text-[12px] font-bold tracking-[0.04em] text-muted">
            Age
          </span>
          <input
            type="number"
            min={13}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-[130px] rounded-xl border border-line2 bg-field px-[15px] py-[13px] text-[15px] text-ink outline-none focus:border-blush focus:shadow-[0_0_0_3px_var(--blush-soft)]"
          />
        </label>

        <div>
          <span className="mb-[9px] ml-[2px] block text-[12px] font-bold tracking-[0.04em] text-muted">
            Gender
          </span>
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((option) => {
              const selected = gender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={cn(
                    "rounded-full border px-[15px] py-[9px] text-[13px] font-semibold transition-colors",
                    selected
                      ? "border-blush bg-blush-soft text-ink"
                      : "border-line2 text-muted hover:border-blush",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          size="md"
          className="self-start rounded-xl"
          onClick={save}
          isLoading={update.isPending}
          loadingText="Saving…"
        >
          Save changes
        </Button>

        <div className="flex flex-col gap-[13px] border-t border-line pt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[12px] text-faint">Email</div>
              <div className="mt-[2px] text-[14.5px] text-ink">{profile?.email}</div>
            </div>
            <span className="rounded-full border border-line px-[10px] py-1 text-[11px] text-faint">
              Not editable
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[12px] text-faint">Sign-in method</div>
              <div className="mt-[2px] text-[14.5px] text-ink">
                {profile ? AUTH_LABEL[profile.authMethod] ?? profile.authMethod : ""}
              </div>
            </div>
            <span className="rounded-full border border-line px-[10px] py-1 text-[11px] text-faint">
              Not editable
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
