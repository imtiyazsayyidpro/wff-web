/** Shapes mirrored from wff-backend feedback service. */

export type FeedbackWindowState = "open" | "granted" | "lapsed" | "none";

export interface FeedbackStatus {
  windowState: FeedbackWindowState;
  feedbackRewardExpiresAt: string | null;
  mySubmitted: boolean;
  /** What I submitted (so the waiting recap survives a reload). */
  myLiked: string | null;
  myDisliked: string | null;
  partnerSubmitted: boolean;
  freeFeedbackGranted: boolean;
}

export interface SubmitFeedbackResult {
  recorded: boolean;
  granted: boolean;
  balanceAfter?: number;
  windowState: FeedbackWindowState;
}

export interface FeedbackInput {
  liked?: string;
  disliked?: string;
}
