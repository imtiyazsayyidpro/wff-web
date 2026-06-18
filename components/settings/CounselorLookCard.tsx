"use client";

import { usePartnership } from "@/lib/hooks/usePartnership";
import { useCounselorAvatars, useSetAvatar } from "@/lib/hooks/useAvatars";
import { Orb } from "@/components/ui/Orb";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";

export function CounselorLookCard({ onChanged }: { onChanged: (name: string) => void }) {
  const { data: partnership } = usePartnership();
  const { data: avatars, isLoading } = useCounselorAvatars();
  const setAvatar = useSetAvatar();

  const currentId = partnership?.counselorAvatarId ?? null;
  const selected = avatars?.find((a) => a.id === currentId) ?? avatars?.[0] ?? null;

  const choose = (id: number, name: string) => {
    if (id === currentId) return;
    setAvatar.mutate(id, { onSuccess: () => onChanged(name) });
  };

  return (
    <section>
      <h2 className="mx-[2px] mb-1 mt-[6px] font-serif text-[20px]">Your counselor&apos;s look</h2>
      <p className="mx-[2px] mb-[14px] max-w-[460px] text-[13px] leading-[1.55] text-muted">
        Purely how they appear — it changes nothing about how your counselor listens or what they
        remember. Shared with your partner, so whoever picks, you&apos;ll both see it.
      </p>
      <div className="rounded-[18px] border border-line bg-panel p-5">
        <div className="mb-4 flex items-center gap-[13px] border-b border-line pb-4">
          <Orb size={56} imageUrl={selected?.imageUrl} imageAlt={selected?.name} />
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-faint">Currently chosen</div>
            <div className="mt-[2px] font-serif text-[20px]">{selected?.name ?? "—"}</div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid place-items-center py-6">
            <Spinner size={20} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[14px]">
            {avatars?.map((avatar) => {
              const isSelected = avatar.id === currentId;
              const isPending = setAvatar.isPending && setAvatar.variables === avatar.id;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  disabled={setAvatar.isPending}
                  onClick={() => choose(avatar.id, avatar.name)}
                  className="flex flex-col items-center gap-[9px] rounded-[16px] border border-line bg-panel2 px-[6px] py-3 transition-colors hover:bg-bg2 disabled:opacity-60"
                >
                  <span
                    className={cn(
                      "relative grid h-[76px] w-[76px] place-items-center rounded-full p-[3px]",
                      isSelected ? "ring-2 ring-blush" : "",
                    )}
                  >
                    <Orb size={70} imageUrl={avatar.imageUrl} imageAlt={avatar.name} />
                    {isSelected && (
                      <span className="absolute -bottom-[2px] -right-[2px] grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-panel bg-blush text-[11px] text-white">
                        ✓
                      </span>
                    )}
                    {isPending && (
                      <span className="absolute inset-0 grid place-items-center rounded-full bg-panel2/70">
                        <Spinner size={16} />
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-[12.5px] font-semibold",
                      isSelected ? "text-ink" : "text-muted",
                    )}
                  >
                    {avatar.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
