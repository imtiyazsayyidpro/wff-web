import type { Metadata } from "next";
import { CenteredScreen } from "@/components/layout/CenteredScreen";
import { Logo } from "@/components/ui/Logo";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset your password · Worth Fighting For" };

export default function ForgotPasswordPage() {
  return (
    <CenteredScreen maxWidth={400}>
      <Logo size="sm" className="mb-[34px]" />
      <ForgotPasswordForm />
    </CenteredScreen>
  );
}
