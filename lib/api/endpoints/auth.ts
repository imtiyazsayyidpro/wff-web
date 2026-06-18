import { apiClient } from "@/lib/api/client";
import type { AuthSession, AuthUser } from "@/types/auth";

/** Request/response payloads for the /auth/* endpoints. */

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * The auth API. Register returns no session (the user must verify first);
 * login / verifyEmail / google return a token + user.
 */
export const authApi = {
  register(payload: RegisterPayload) {
    // Drop empty optional name so the backend's `.optional()` is honored.
    const body = payload.name ? payload : { email: payload.email, password: payload.password };
    return apiClient.post<null>("/auth/register", body);
  },

  login(payload: LoginPayload) {
    return apiClient.post<AuthSession>("/auth/login", payload);
  },

  verifyEmail(token: string) {
    return apiClient.post<AuthSession>("/auth/verify-email", { token });
  },

  resendVerification(email: string) {
    return apiClient.post<null>("/auth/resend-verification", { email });
  },

  forgotPassword(email: string) {
    return apiClient.post<null>("/auth/forgot-password", { email });
  },

  resetPassword(token: string, newPassword: string) {
    return apiClient.post<null>("/auth/reset-password", { token, newPassword });
  },

  google(accessToken: string) {
    return apiClient.post<AuthSession>("/auth/google", { accessToken });
  },

  logout() {
    return apiClient.post<null>("/auth/logout");
  },

  me() {
    return apiClient.get<AuthUser>("/auth/me");
  },
};
