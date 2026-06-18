import { apiClient } from "@/lib/api/client";
import type { Gender, UserProfile } from "@/types/auth";

export interface OnboardingPayload {
  age?: number;
  gender?: Gender;
}

export interface UpdateProfilePayload {
  name?: string;
  age?: number;
  gender?: Gender;
}

/** The authenticated user's own profile. */
export const meApi = {
  getProfile() {
    return apiClient.get<UserProfile>("/me/profile");
  },

  updateProfile(payload: UpdateProfilePayload) {
    return apiClient.put<UserProfile>("/me/profile", payload);
  },

  completeOnboarding(payload: OnboardingPayload) {
    return apiClient.post<UserProfile>("/me/onboarding/complete", payload);
  },
};
