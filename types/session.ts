/** Shapes mirrored from wff-backend session formatters. */

export type SessionStatus =
  | "PENDING_ACCEPTANCE"
  | "ACTIVE"
  | "PAUSED"
  | "CLOSED"
  | "DECLINED"
  | "EXPIRED";

export type SessionCloseReason =
  | "RESOLVED"
  | "TIME_LIMIT"
  | "PAUSED_EXPIRED"
  | "MESSAGE_CAP"
  | "ABANDONED";

export type MessageSenderType = "USER" | "MEDIATOR";

/** A counseling session (formatSession). */
export interface Session {
  id: number;
  partnershipId: number;
  status: SessionStatus;
  initiatedByUserId: number;
  currentTurnUserId: number | null;
  inviteExpiresAt: string | null;
  startedAt: string | null;
  closedAt: string | null;
  closeReason: SessionCloseReason | null;
  continuedFromSessionId: number | null;
  counselorAvatarId: number | null;
  elapsedActiveSeconds: number;
  remainingActiveSeconds: number;
  pausedAt: string | null;
  isMyTurn: boolean;
  createdAt: string;
}

/** A transcript message (formatMessage). */
export interface SessionMessage {
  id: number;
  senderType: MessageSenderType;
  senderUserId: number | null;
  content: string;
  createdAt: string;
}

/** POST /sessions/:id/messages result. `mediatorMessage` is absent when the
 *  message capped the session. */
export interface SendMessageResult {
  userMessage: SessionMessage;
  mediatorMessage?: SessionMessage;
  session: Session;
  capped?: boolean;
}

/** A selectable counselor avatar (listCounselorAvatars). */
export interface CounselorAvatar {
  id: number;
  name: string;
  imageUrl: string;
  sortOrder: number;
}
