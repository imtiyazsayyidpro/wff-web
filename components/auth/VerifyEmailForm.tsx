"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResendVerification, useVerifyEmail } from "@/lib/hooks/useAuthMutations";
import { routes } from "@/config/routes";
import { Logo } from "@/components/ui/Logo";
import { Orb } from "@/components/ui/Orb";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";

interface VerifyEmailFormProps {
  email?: string;
  token?: string;
}

export function VerifyEmailForm({ email, token }: VerifyEmailFormProps) {
  const router = useRouter();
  const verify = useVerifyEmail();
  const resend = useResendVerification();
  const [resent, setResent] = useState(false);
  const attempted = useRef(false);

  // If the user arrived via the emailed link, verify automatically (once).
  useEffect(() => {
    if (token && !attempted.current) {
      attempted.current = true;
      verify.mutate(token, { onSuccess: () => router.replace(routes.entered) });
    }
  }, [token, verify, router]);

  const handleResend = () => {
    if (!email) return;
    resend.mutate(email, { onSuccess: () => setResent(true) });
  };

  const linkFailed = Boolean(token) && verify.isError;

  return (
    <div className="text-center">
      <div className="mb-9 flex items-center justify-center">
        <Logo size="sm" />
      </div>

      <Orb size={84} drift className="mx-auto mb-7">
        <span
          aria-hidden="true"
          className="relative block h-6 w-[34px] overflow-hidden rounded-[4px] border-[1.8px] border-white/85"
        >
          <span className="absolute left-px right-px top-px h-[14px] -translate-y-[3px] -skew-y-[12deg] border-b-[1.8px] border-white/85" />
        </span>
      </Orb>

      <h1 className="mb-[14px] font-serif text-[34px] leading-[1.14] text-ink">
        One last step — check your inbox.
      </h1>
      <p className="mx-auto mb-2 max-w-[380px] text-[16px] leading-[1.65] text-muted">
        We&apos;ve sent a verification link to
      </p>
      <p className="mb-[22px] text-[17px] font-bold text-ink">{email ?? "your email"}</p>
      <p className="mx-auto mb-[30px] max-w-[400px] text-[15px] leading-[1.65] text-muted">
        Open it to confirm this is you, and your space will be ready. Verifying keeps your account
        — and the private conversations inside it — safe.
      </p>

      <Card elevated className="p-6 text-left">
        {linkFailed && (
          <Alert className="mb-4" variant="error">
            That link didn&apos;t work or has expired. Request a fresh one below.
          </Alert>
        )}
        {resent && (
          <Alert className="mb-4" variant="info">
            If that email needs a link, a fresh one is on its way. It can take a minute or two —
            be sure to check spam.
          </Alert>
        )}
        <p className="mb-[14px] text-[13.5px] leading-[1.55] text-muted">
          Didn&apos;t get it? It can take a moment, and sometimes it hides in spam.
        </p>
        <Button
          variant="secondary"
          fullWidth
          onClick={handleResend}
          isLoading={resend.isPending}
          loadingText="Sending…"
          disabled={!email}
        >
          Resend verification email
        </Button>
        <Button
          variant="primary"
          fullWidth
          className="mt-[10px]"
          onClick={() => router.push(routes.login)}
        >
          I&apos;ve verified — continue
        </Button>
      </Card>

      <p className="mt-6 text-[13.5px] text-muted">
        Wrong address, or want to start over?{" "}
        <Link href={routes.register} className="font-bold text-blushd no-underline">
          Use a different email
        </Link>
      </p>
      <p className="mt-[10px] text-[13px] text-faint">
        <Link href={routes.login} className="text-muted no-underline hover:text-ink">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
