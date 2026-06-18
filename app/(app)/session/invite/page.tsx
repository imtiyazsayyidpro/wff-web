"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useCurrentSession } from "@/lib/hooks/useSession";
import {
  useAcceptSession,
  useCancelSession,
  useDeclineSession,
  useInitiateSession,
} from "@/lib/hooks/useSessionActions";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { getErrorStatus } from "@/lib/utils/apiError";
import { routes } from "@/config/routes";
import { CenteredScreen } from "@/components/layout/CenteredScreen";
import { PageLoader } from "@/components/ui/PageLoader";
import { InviteWaiting } from "@/components/session/InviteWaiting";
import { InvitePrompt } from "@/components/session/InvitePrompt";
import { InviteLowBalance } from "@/components/session/InviteLowBalance";
import { InviteExpired } from "@/components/session/InviteExpired";

export default function SessionInvitePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: partnership } = usePartnership();
  const { data: session, isLoading } = useCurrentSession();

  const accept = useAcceptSession();
  const decline = useDeclineSession();
  const cancel = useCancelSession();
  const initiate = useInitiateSession();

  const meId = user?.id ?? -1;
  const partner = partnership?.partner ?? null;
  const partnerName = partner?.name ?? partner?.email ?? "your partner";
  const balance = partnership?.bandAidBalance ?? 0;

  const isPending = session?.status === "PENDING_ACCEPTANCE";
  const role: "initiator" | "invitee" =
    session?.initiatedByUserId === meId ? "initiator" : "invitee";

  // Remember role/partner so the expired screen survives the session
  // disappearing from the server once the invite window lapses.
  const lastRole = useRef<"initiator" | "invitee">("invitee");
  if (isPending) lastRole.current = role;

  const [expired, setExpired] = useState(false);
  const { isExpired } = useCountdown(isPending ? session!.inviteExpiresAt : null);
  useEffect(() => {
    if (isExpired) setExpired(true);
  }, [isExpired]);

  // Into the live room once accepted/active.
  useEffect(() => {
    if (session && (session.status === "ACTIVE" || session.status === "PAUSED")) {
      router.replace(routes.session);
    }
  }, [session, router]);

  // Nothing pending and not showing an expiry — back home.
  useEffect(() => {
    if (!isLoading && !session && !expired) router.replace(routes.home);
  }, [isLoading, session, expired, router]);

  const handleAccept = () => {
    if (!session) return;
    accept.mutate(session.id, {
      onSuccess: () => router.replace(routes.session),
      onError: (error) => {
        if (getErrorStatus(error) === 410) setExpired(true);
      },
    });
  };

  const handleDecline = () => {
    if (!session) return;
    decline.mutate(session.id, { onSuccess: () => router.replace(routes.home) });
  };

  const handleWithdraw = () => {
    if (!session) return;
    cancel.mutate(session.id, { onSuccess: () => router.replace(routes.home) });
  };

  const handleInviteAgain = () => {
    initiate.mutate(undefined, { onSuccess: () => setExpired(false) });
  };

  const body = (() => {
    if (expired) {
      return (
        <InviteExpired
          role={lastRole.current}
          partnerName={partnerName}
          onInviteAgain={handleInviteAgain}
          isReinviting={initiate.isPending}
        />
      );
    }

    if (isPending && role === "initiator") {
      return (
        <InviteWaiting
          partnerName={partnerName}
          expiresAt={session!.inviteExpiresAt}
          onWithdraw={handleWithdraw}
          isWithdrawing={cancel.isPending}
        />
      );
    }

    if (isPending && role === "invitee") {
      return balance < 1 ? (
        <InviteLowBalance
          partnerName={partnerName}
          onDecline={handleDecline}
          isDeclining={decline.isPending}
        />
      ) : (
        <InvitePrompt
          partnerName={partnerName}
          partnerId={partner?.id ?? null}
          balance={balance}
          expiresAt={session!.inviteExpiresAt}
          onAccept={handleAccept}
          onDecline={handleDecline}
          isAccepting={accept.isPending}
          isDeclining={decline.isPending}
        />
      );
    }

    return null;
  })();

  if (!body) return <PageLoader />;

  return (
    <CenteredScreen background="blush" maxWidth={440} className="text-center">
      {body}
    </CenteredScreen>
  );
}
