"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { useSocketEvent } from "@/lib/hooks/useSocketEvent";
import { SocketEvents } from "@/lib/socket/events";
import { usePartnership } from "@/lib/hooks/usePartnership";
import { useCurrentSession } from "@/lib/hooks/useSession";
import { useCounselorAvatars } from "@/lib/hooks/useAvatars";
import { usePresence } from "@/lib/hooks/usePresence";
import { useSessionMessages } from "@/lib/hooks/useSessionMessages";
import { useTypingIndicator } from "@/lib/hooks/useTypingIndicator";
import { useHearts } from "@/lib/hooks/useHearts";
import { useSessionTimer } from "@/lib/hooks/useSessionTimer";
import { usePauseSession, useResumeSession, useSendMessage } from "@/lib/hooks/useSessionActions";
import { formatClock } from "@/lib/hooks/useCountdown";
import { queryKeys } from "@/lib/api/queryKeys";
import { routes } from "@/config/routes";
import type { Session } from "@/types/session";
import { PageLoader } from "@/components/ui/PageLoader";
import { SessionHeader } from "@/components/session/SessionHeader";
import { Transcript } from "@/components/session/Transcript";
import { Composer, type Turn } from "@/components/session/Composer";
import { FloatingHearts } from "@/components/session/FloatingHearts";
import {
  PausedOverlay,
  InactivityWarning,
  ClosingOverlay,
} from "@/components/session/SessionOverlays";

export default function SessionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const { data: partnership } = usePartnership();
  const { data: session, isLoading } = useCurrentSession();
  const { data: avatars } = useCounselorAvatars();

  const sessionId = session?.id ?? null;
  const meId = user?.id ?? -1;
  const partner = partnership?.partner ?? null;
  const partnerId = partner?.id ?? null;
  const partnerName = partner?.name ?? partner?.email ?? "your partner";
  const counselorAvatar = avatars?.find((a) => a.id === session?.counselorAvatarId) ?? null;
  const counselorName = counselorAvatar?.name ?? "your counselor";
  const counselorImageUrl = counselorAvatar?.imageUrl ?? null;

  const isPartnerOnline = usePresence(partnerId);
  const { messages } = useSessionMessages(sessionId);
  const { isPartnerTyping, emitTyping } = useTypingIndicator(partnerId);
  const { hearts, sendHeart } = useHearts();
  const remaining = useSessionTimer(session);

  const pause = usePauseSession();
  const resume = useResumeSession();
  const send = useSendMessage(sessionId);

  const [composer, setComposer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [closing, setClosing] = useState(false);
  const [pausedByMe, setPausedByMe] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Join the session room so MESSAGE_NEW / TURN_CHANGED reach us.
  useEffect(() => {
    if (!socket || !isConnected || !sessionId) return;
    socket.emit(SocketEvents.JOIN_SESSION, { sessionId });
    return () => {
      socket.emit(SocketEvents.LEAVE_SESSION);
    };
  }, [socket, isConnected, sessionId]);

  useSocketEvent<{ sessionId: number; currentTurnUserId: number | null }>(
    SocketEvents.TURN_CHANGED,
    (payload) => {
      if (payload.sessionId !== sessionId) return;
      queryClient.setQueryData<Session | null>(queryKeys.currentSession, (prev) =>
        prev
          ? {
              ...prev,
              currentTurnUserId: payload.currentTurnUserId,
              isMyTurn: payload.currentTurnUserId === meId,
            }
          : prev,
      );
    },
  );

  useSocketEvent(SocketEvents.SESSION_PAUSED, () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.currentSession }),
  );
  useSocketEvent(SocketEvents.SESSION_RESUMED, () => {
    setPausedByMe(false);
    queryClient.invalidateQueries({ queryKey: queryKeys.currentSession });
  });
  useSocketEvent(SocketEvents.SESSION_INACTIVITY_WARNING, () => setShowWarning(true));
  useSocketEvent<{ sessionId: number }>(SocketEvents.SESSION_CLOSED, (payload) => {
    setClosing(true);
    // Briefly show the closing screen, then open the recap for the just-closed session.
    setTimeout(() => router.replace(routes.sessionClosed(payload.sessionId)), 2600);
  });

  // Route away when there's no live room to show.
  useEffect(() => {
    if (isLoading || closing) return;
    if (!session) return router.replace(routes.home);
    if (session.status === "PENDING_ACCEPTANCE") return router.replace(routes.sessionInvite);
    if (["CLOSED", "EXPIRED", "DECLINED"].includes(session.status)) router.replace(routes.home);
  }, [isLoading, session, closing, router]);

  const isLive = session?.status === "ACTIVE" || session?.status === "PAUSED";
  if (isLoading || !session || (!isLive && !closing)) return <PageLoader />;

  const lastIsUser = messages.length > 0 && messages[messages.length - 1].senderType === "USER";
  const mediatorThinking = send.isPending || lastIsUser;
  const turn: Turn = mediatorThinking
    ? "counselor"
    : session.currentTurnUserId === meId
      ? "me"
      : session.currentTurnUserId === partnerId
        ? "partner"
        : "counselor";

  const handleComposerChange = (value: string) => {
    setComposer(value);
    emitTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => emitTyping(false), 1500);
  };

  const handleSend = () => {
    const content = composer.trim();
    if (!content || turn !== "me" || send.isPending) return;
    setComposer("");
    emitTyping(false);
    send.mutate(content);
  };

  const handlePause = () => {
    pause.mutate(session.id, { onSuccess: () => setPausedByMe(true) });
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-bg text-ink">
      <SessionHeader
        partnerName={partnerName}
        counselorName={counselorName}
        isPartnerOnline={isPartnerOnline}
        remainingLabel={formatClock(remaining)}
        onLeave={() => router.push(routes.home)}
        onPause={handlePause}
        canPause={session.status === "ACTIVE"}
      />

      <Transcript
        messages={messages}
        meId={meId}
        partnerName={partnerName}
        counselorName={counselorName}
        counselorImageUrl={counselorImageUrl}
        isPartnerTyping={isPartnerTyping}
        mediatorThinking={mediatorThinking}
      />

      <Composer
        value={composer}
        onChange={handleComposerChange}
        onSend={handleSend}
        onHeart={sendHeart}
        turn={turn}
        partnerName={partnerName}
        counselorName={counselorName}
      />

      <FloatingHearts hearts={hearts} />

      {session.status === "PAUSED" && !closing && (
        <PausedOverlay
          remainingLabel={formatClock(remaining)}
          pausedByYou={pausedByMe}
          onResume={() => resume.mutate(session.id)}
          onLeave={() => router.push(routes.home)}
          isResuming={resume.isPending}
        />
      )}

      {showWarning && session.status === "ACTIVE" && !closing && (
        <InactivityWarning onStay={() => setShowWarning(false)} onPause={handlePause} />
      )}

      {closing && <ClosingOverlay />}
    </div>
  );
}
