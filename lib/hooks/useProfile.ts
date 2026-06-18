"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { meApi, type OnboardingPayload, type UpdateProfilePayload } from "@/lib/api/endpoints/me";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";
import type { UserProfile } from "@/types/auth";

/** The authenticated user's profile. Disabled until auth has hydrated. */
export function useProfile() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => meApi.getProfile(),
    enabled: isAuthenticated,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => meApi.updateProfile(payload),
    onSuccess: (profile: UserProfile) => {
      queryClient.setQueryData(queryKeys.profile, profile);
    },
  });
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: OnboardingPayload) => meApi.completeOnboarding(payload),
    onSuccess: (profile: UserProfile) => {
      queryClient.setQueryData(queryKeys.profile, profile);
    },
  });
}
