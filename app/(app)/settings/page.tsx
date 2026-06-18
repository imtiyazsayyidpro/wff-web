"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePartnership, useDissolvePartnership } from "@/lib/hooks/usePartnership";
import { routes } from "@/config/routes";
import { StoreSubHeader } from "@/components/store/StoreSubHeader";
import { Toast } from "@/components/ui/Toast";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { CounselorLookCard } from "@/components/settings/CounselorLookCard";
import { DissolveSheet } from "@/components/settings/DissolveSheet";
import { LogoutConfirm } from "@/components/layout/LogoutConfirm";

export default function SettingsPage() {
  const router = useRouter();
  const { data: partnership } = usePartnership();
  const dissolve = useDissolvePartnership();

  const [toast, setToast] = useState("");
  const [dissolveOpen, setDissolveOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const partnerName = partnership?.partner?.name ?? partnership?.partner?.email ?? "your partner";

  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <StoreSubHeader title="Settings" backHref={routes.home} />

      <div className="mx-auto flex max-w-[960px] flex-col gap-[18px] px-[22px] py-6 lg:px-8">
        <div className="grid gap-[18px] lg:grid-cols-2 lg:items-start">
          <ProfileCard onSaved={() => setToast("Your profile is saved")} />
          <CounselorLookCard onChanged={(name) => setToast(`Your counselor is now ${name}`)} />
        </div>

        <section>
          <h2 className="mx-[2px] mb-3 mt-[6px] font-serif text-[20px] text-blushd">
            Ending your connection
          </h2>
          <div className="rounded-[18px] border border-blush bg-panel p-5">
            <p className="mb-4 text-[14px] leading-[1.6] text-muted">
              If the two of you decide to part ways here, you can dissolve your connection.
              It&apos;s permanent — so we&apos;ll walk you through exactly what happens before
              anything is final.
            </p>
            <button
              type="button"
              onClick={() => setDissolveOpen(true)}
              className="rounded-xl border border-blush bg-transparent px-[22px] py-[13px] text-[14.5px] font-bold text-blushd transition-colors hover:bg-blush-soft"
            >
              Dissolve connection with {partnerName}
            </button>
          </div>
        </section>

        <div className="mt-[6px] border-t border-line pt-5 text-center">
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="rounded-xl border border-line2 px-7 py-3 text-[14.5px] font-bold text-ink transition-colors hover:bg-panel2"
          >
            Sign out
          </button>
        </div>
      </div>

      {dissolveOpen && (
        <DissolveSheet
          partnerName={partnerName}
          balance={partnership?.bandAidBalance ?? 0}
          isDissolving={dissolve.isPending}
          onClose={() => setDissolveOpen(false)}
          onConfirm={() =>
            dissolve.mutate(undefined, {
              onSuccess: () => {
                setDissolveOpen(false);
                router.replace(routes.invite);
              },
            })
          }
        />
      )}

      <LogoutConfirm open={logoutOpen} onClose={() => setLogoutOpen(false)} />

      {toast && <Toast message={toast} onDismiss={() => setToast("")} />}
    </div>
  );
}
