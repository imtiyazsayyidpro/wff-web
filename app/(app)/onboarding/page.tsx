import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export const metadata: Metadata = { title: "Set things up · Worth Fighting For" };

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
