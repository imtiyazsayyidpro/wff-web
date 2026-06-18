"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi, type LoginPayload, type RegisterPayload } from "@/lib/api/endpoints/auth";
import { useAuth } from "@/providers/AuthProvider";
import type { AuthSession } from "@/types/auth";

/**
 * React Query mutation hooks for auth. Hooks that establish a session
 * (login / verify / google) persist it via AuthProvider on success; the
 * caller decides where to redirect.
 */

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useLogin() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (session: AuthSession) => signIn(session),
  });
}

export function useVerifyEmail() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: (session: AuthSession) => signIn(session),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerification(email),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (vars: { token: string; newPassword: string }) =>
      authApi.resetPassword(vars.token, vars.newPassword),
  });
}

export function useGoogleAuth() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (accessToken: string) => authApi.google(accessToken),
    onSuccess: (session: AuthSession) => signIn(session),
  });
}
