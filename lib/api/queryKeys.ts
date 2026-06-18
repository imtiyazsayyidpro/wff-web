/**
 * Centralised React Query keys so invalidation stays consistent across hooks.
 */
export const queryKeys = {
  profile: ["profile"] as const,
  partnership: ["partnership"] as const,
  incomingRequests: ["requests", "incoming"] as const,
  sentRequests: ["requests", "sent"] as const,
  currentSession: ["session", "current"] as const,
  session: (id: number) => ["session", id] as const,
  sessionMessages: (id: number) => ["session", id, "messages"] as const,
  feedback: (id: number) => ["feedback", id] as const,
  avatars: ["avatars"] as const,
  plans: ["plans"] as const,
  purchases: ["purchases"] as const,
  invoice: (id: number) => ["invoice", id] as const,
  transactions: ["transactions"] as const,
  memories: ["memories"] as const,
};
