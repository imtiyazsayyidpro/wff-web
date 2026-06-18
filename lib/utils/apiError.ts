import { ApiError } from "@/types/api";

/** Safe, user-facing message from any thrown value. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong."): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

/** HTTP status from an ApiError, or 0 for anything else. */
export function getErrorStatus(error: unknown): number {
  return error instanceof ApiError ? error.statusCode : 0;
}

/** True when the backend error message references Google sign-in. */
export function isGoogleAccountError(error: unknown): boolean {
  return error instanceof ApiError && /google/i.test(error.message);
}
