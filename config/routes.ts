/**
 * Single source of truth for app routes. Import these instead of hard-coding
 * path strings so renames stay cheap and typos surface at compile time.
 */
export const routes = {
  landing: "/",

  // Flow 1 — auth
  register: "/register",
  login: "/login",
  verifyEmail: "/verify-email",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // Flow 2 — connect
  entered: "/welcome",
  onboarding: "/onboarding",
  invite: "/invite",
  requests: "/requests",
  connected: "/connected",

  // Authenticated home (partnered) — the connected dashboard.
  home: "/home",

  // Flow 4 — the session
  session: "/session",
  sessionInvite: "/session/invite",
  // Post-session. Feedback uses the plural path to match the backend email link.
  sessionClosed: (id: number) => `/session/closed/${id}`,
  sessionFeedback: (id: number) => `/sessions/${id}/feedback`,

  // Flow 5 — band-aids
  store: "/store",
  storePurchases: "/store/purchases",
  storeLedger: "/store/ledger",
  storeInvoice: (purchaseId: number) => `/store/invoice/${purchaseId}`,

  // Linked from the dashboard drawer.
  memories: "/memories",
  settings: "/settings",

  // Public legal documents (linked from auth screens).
  legal: "/legal",
  legalTerms: "/legal/terms",
  legalPrivacy: "/legal/privacy",
  legalRefunds: "/legal/refunds",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
