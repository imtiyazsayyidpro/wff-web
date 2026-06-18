/** Shapes mirrored from wff-backend partnership formatters. */

export interface UserSummary {
  id: number;
  name: string | null;
  email: string;
}

export type ConnectionRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "SUPERSEDED";

/** A connection request (formatRequest). For incoming, the other party is
 *  `fromUser`; for outgoing it's `toUser` (or `toEmail` if not yet registered). */
export interface ConnectionRequest {
  id: number;
  fromUser: UserSummary;
  toEmail: string;
  toUser: UserSummary | null;
  status: ConnectionRequestStatus;
  createdAt: string;
  respondedAt: string | null;
}

/** An active partnership (formatPartnership). */
export interface Partnership {
  id: number;
  bandAidBalance: number;
  counselorAvatarId: number | null;
  createdAt: string;
  /** The other member, or null if somehow solo. */
  partner: UserSummary | null;
  /** Session that opened the first-session feedback window, or null. */
  feedbackSessionId: number | null;
}
