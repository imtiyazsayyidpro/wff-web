import type { Gender } from "@/types/auth";

/**
 * Onboarding asks for a rough age *range* (gentler UX), but the backend stores
 * a single integer. We map each range to a representative midpoint — "a rough
 * sense is plenty", per the design copy.
 */
export const AGE_RANGES: { label: string; value: number }[] = [
  { label: "13–17", value: 15 },
  { label: "18–24", value: 21 },
  { label: "25–34", value: 30 },
  { label: "35–44", value: 40 },
  { label: "45–54", value: 50 },
  { label: "55–64", value: 60 },
  { label: "65+", value: 70 },
];

/** Friendly gender labels mapped to the backend Gender enum. */
export const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "Woman", value: "FEMALE" },
  { label: "Man", value: "MALE" },
  { label: "Non-binary", value: "NON_BINARY" },
  { label: "Another identity", value: "OTHER" },
  { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
];
