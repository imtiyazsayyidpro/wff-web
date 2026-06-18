"use client";

import { useCounselorAvatars, useSetAvatar } from "@/lib/hooks/useAvatars";
import { Orb } from "@/components/ui/Orb";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";

interface AvatarPickerModalProps {
  open: boolean;
  onClose: () => void;
  currentAvatarId: number | null;
  /** Called with the chosen avatar's name after a successful change. */
  onChanged: (name: string) => void;
}

export function AvatarPickerModal({
  open,
  onClose,
  currentAvatarId,
  onChanged,
}: AvatarPickerModalProps) {
  const { data: avatars, isLoading } = useCounselorAvatars();
  const setAvatar = useSetAvatar();

  if (!open) return null;

  const choose = (id: number, name: string) => {
    if (id === currentAvatarId) return onClose();
    setAvatar.mutate(id, {
      onSuccess: () => {
        onChanged(name);
        onClose();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,15,24,0.42)] px-5 animate-fade"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-[24px] border border-line bg-panel p-6 shadow-[0_30px_70px_-30px_var(--shadow)] animate-rise"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Choose your counselor"
      >
        <div className="mb-1 text-center font-serif text-[24px] text-ink">
          Choose your counselor
        </div>
        <p className="mb-5 text-center text-[14px] leading-[1.5] text-muted">
          A gentle presence to guide your conversations. You can change this anytime.
        </p>

        {isLoading ? (
          <div className="grid place-items-center py-10">
            <Spinner size={22} />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {avatars?.map((avatar) => {
              const selected = avatar.id === currentAvatarId;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  disabled={setAvatar.isPending}
                  onClick={() => choose(avatar.id, avatar.name)}
                  className={cn(
                    "flex items-center gap-[14px] rounded-[16px] border-[1.5px] px-4 py-3 text-left transition-colors disabled:opacity-60",
                    selected ? "border-blush bg-blush-soft" : "border-line2 hover:border-blush",
                  )}
                >
                  <Orb size={56} imageUrl={avatar.imageUrl} imageAlt={avatar.name} />
                  <span className="flex-1 font-serif text-[18px] text-ink">{avatar.name}</span>
                  {selected && (
                    <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-blushd">
                      Current
                    </span>
                  )}
                  {setAvatar.isPending && setAvatar.variables === avatar.id && <Spinner size={16} />}
                </button>
              );
            })}
            {avatars?.length === 0 && (
              <p className="py-6 text-center text-[14px] text-muted">
                No counselors are available right now.
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border border-line2 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:bg-panel2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
