/**
 * Mirror of wff-backend `SocketEvents`. Keep in sync.
 */
export const SocketEvents = {
  // Server → Client
  SESSION_INVITE: "SESSION_INVITE",
  SESSION_ACCEPTED: "SESSION_ACCEPTED",
  SESSION_DECLINED: "SESSION_DECLINED",
  SESSION_STARTED: "SESSION_STARTED",
  BANDAID_DEDUCTED: "BANDAID_DEDUCTED",
  BANDAID_GRANTED: "BANDAID_GRANTED",
  MESSAGE_NEW: "MESSAGE_NEW",
  TURN_CHANGED: "TURN_CHANGED",
  SESSION_PAUSED: "SESSION_PAUSED",
  SESSION_RESUMED: "SESSION_RESUMED",
  SESSION_CLOSED: "SESSION_CLOSED",
  SESSION_INACTIVITY_WARNING: "SESSION_INACTIVITY_WARNING",
  FEEDBACK_INVITED: "FEEDBACK_INVITED",
  PRESENCE: "PRESENCE",
  TYPING: "TYPING",
  HEART: "HEART",
  AVATAR_CHANGED: "AVATAR_CHANGED",

  // Client → Server
  JOIN_SESSION: "JOIN_SESSION",
  LEAVE_SESSION: "LEAVE_SESSION",
  REQUEST_PRESENCE: "REQUEST_PRESENCE",
} as const;

export type SocketEvent = (typeof SocketEvents)[keyof typeof SocketEvents];

/** Payload shapes for the events the client reads (best-effort typings). */
export interface PresencePayload {
  userId: number;
  online: boolean;
}
export interface TypingPayload {
  userId: number;
  isTyping: boolean;
}
export interface HeartPayload {
  userId: number;
}
export interface BandAidPayload {
  partnershipId: number;
  balance?: number;
}
export interface AvatarChangedPayload {
  partnershipId: number;
  counselorAvatarId: number;
}
