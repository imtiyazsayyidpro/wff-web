"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  useIncomingRequests,
  usePartnership,
  useSentRequests,
} from "@/lib/hooks/usePartnership";
import { routes } from "@/config/routes";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageLoader } from "@/components/ui/PageLoader";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { InviteForm } from "@/components/partnership/InviteForm";
import { InviteSentCard } from "@/components/partnership/InviteSentCard";
import { ReciprocalBanner } from "@/components/partnership/ReciprocalBanner";

/** Unpartnered home: invite a partner, see if they've already invited you,
 *  or watch a pending invitation. Partnered users are sent to /home. */
export default function InvitePage() {
  const router = useRouter();
  const { user } = useAuth();
  const partnership = usePartnership();
  const incoming = useIncomingRequests();
  const sent = useSentRequests();

  useEffect(() => {
    if (partnership.data) router.replace(routes.home);
  }, [partnership.data, router]);

  if (partnership.isLoading || incoming.isLoading || sent.isLoading) return <PageLoader />;
  if (partnership.data) return null; // redirecting to /home

  const reciprocal = incoming.data?.[0];
  const pendingSent = sent.data?.[0];

  return (
    <div className="min-h-screen bg-bg text-ink">
      <AppHeader />
      <main className="mx-auto max-w-[560px] px-[22px] py-9 md:py-[34px]">
        <div className="mb-7">
          <h1 className="mb-2 font-serif text-[33px] leading-[1.12]">
            You&apos;re all set{user?.name ? `, ${user.name}` : ""}.
          </h1>
          <p className="text-[15.5px] leading-[1.6] text-muted">
            Worth Fighting For is meant for two. When you&apos;re ready, invite the person you want
            to walk through this with — it all begins the moment they join you.
          </p>
        </div>

        {reciprocal ? (
          <ReciprocalBanner request={reciprocal} />
        ) : pendingSent ? (
          <InviteSentCard request={pendingSent} />
        ) : (
          <InviteForm />
        )}

        <p className="mt-[18px] text-center text-[13.5px] text-muted">
          Someone may have invited you already.{" "}
          <Link href={routes.requests} className="font-bold text-blushd no-underline">
            Check your requests
          </Link>
        </p>
        <Disclaimer className="mt-8" />
      </main>
    </div>
  );
}
