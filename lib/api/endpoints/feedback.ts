import { apiClient } from "@/lib/api/client";
import type { FeedbackInput, FeedbackStatus, SubmitFeedbackResult } from "@/types/feedback";

/** First-session feedback endpoints (under /sessions/:id/feedback). */
export const feedbackApi = {
  getStatus(sessionId: number) {
    return apiClient.get<FeedbackStatus>(`/sessions/${sessionId}/feedback`);
  },

  submit(sessionId: number, input: FeedbackInput) {
    return apiClient.post<SubmitFeedbackResult>(`/sessions/${sessionId}/feedback`, input);
  },
};
