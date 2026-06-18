import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { AuthAside } from "@/components/layout/AuthAside";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Welcome back · Worth Fighting For" };

export default function LoginPage() {
  return (
    <AuthShell
      aside={
        <AuthAside
          gradient="sage-blush"
          headline="Welcome back. Take a breath — you're here."
          subcopy="Whatever brought you back, you don't have to carry it alone."
          footer="Private · just the two of you"
        />
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
