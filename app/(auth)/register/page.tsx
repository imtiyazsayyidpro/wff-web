import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { AuthAside } from "@/components/layout/AuthAside";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Begin together · Worth Fighting For" };

export default function RegisterPage() {
  return (
    <AuthShell
      aside={
        <AuthAside
          gradient="blush-sage"
          headline="Fight for each other, not with each other."
          subcopy="It takes courage to begin. By being here, the two of you are choosing to try."
          footer="Private · just the two of you · free to start"
        />
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
