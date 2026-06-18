"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feedbackApi } from "@/lib/api/endpoints/feedback";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";
import type { FeedbackInput, FeedbackStatus } from "@/types/feedback";

/** First-session feedback status for a given session. */
export function useFeedbackStatus(sessionId: number | null) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: sessionId ? queryKeys.feedback(sessionId) : ["feedback", "none"],
    queryFn: () => feedbackApi.getStatus(sessionId!),
    enabled: isAuthenticated && Boolean(sessionId),
  });
}

export function useSubmitFeedback(sessionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: FeedbackInput) => feedbackApi.submit(sessionId, input),
    onSuccess: (result) => {
      // Reflect the new window state immediately; the reward grant also arrives
      // over the socket (BANDAID_GRANTED) and refreshes the balance.
      queryClient.setQueryData<FeedbackStatus | undefined>(
        queryKeys.feedback(sessionId),
        (prev) =>
          prev
            ? { ...prev, mySubmitted: true, windowState: result.windowState }
            : prev,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.partnership });
    },
  });
}
