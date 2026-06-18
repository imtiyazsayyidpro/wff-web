/**
 * Shapes mirrored from the backend auth/me payloads.
 * Keep these in sync with wff-backend `buildAuthUser` / `formatUserProfile`.
 */

export type AuthMethod = "EMAIL" | "GOOGLE";

export type Gender =
  | "MALE"
  | "FEMALE"
  | "NON_BINARY"
  | "OTHER"
  | "PREFER_NOT_TO_SAY";

/** The lightweight user returned alongside a session token (login/verify/google). */
export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  emailVerified: boolean;
  isActive: boolean;
}

/** The fuller profile from GET /me/profile. */
export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  age: number | null;
  gender: Gender | null;
  emailVerified: boolean;
  authMethod: AuthMethod;
  onboardingCompletedAt: string | null;
  createdAt: string;
}

/** Returned by login / verify-email / google. */
export interface AuthSession {
  token: string;
  user: AuthUser;
}
