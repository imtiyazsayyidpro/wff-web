"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validation/auth";
import { useResetPassword } from "@/lib/hooks/useAuthMutations";
import { getErrorStatus } from "@/lib/utils/apiError";
import { routes } from "@/config/routes";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Orb } from "@/components/ui/Orb";

export function ResetPasswordForm({ token }: { token?: string }) {
  const reset = useResetPassword();
  const [done, setDone] = useState(false);
  // Treat a missing token, or a 400 from the server, as an expired link.
  const [invalid, setInvalid] = useState(!token);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = ({ newPassword }: ResetPasswordValues) => {
    if (!token) return setInvalid(true);
    reset.mutate(
      { token, newPassword },
      {
        onSuccess: () => setDone(true),
        onError: (error) => {
          if (getErrorStatus(error) === 400) setInvalid(true);
        },
      },
    );
  };

  if (invalid) {
    return (
      <div className="animate-fade text-center">
        <div className="mx-auto mb-[22px] grid h-16 w-16 place-items-center rounded-full bg-blush-soft">
          <span className="text-[26px] font-bold leading-none text-blushd">!</span>
        </div>
        <h1 className="mb-[14px] font-serif text-[29px] leading-[1.16] text-ink">
          This link has expired.
        </h1>
        <p className="mx-auto mb-[26px] max-w-[350px] text-[15.5px] leading-[1.65] text-muted">
          For your safety, reset links only work once and for a short while. No harm done —
          request a fresh one and we&apos;ll send it right over.
        </p>
        <Link href={routes.forgotPassword} className={buttonVariants({ size: "lg", fullWidth: true })}>
          Request a new link
        </Link>
        <p className="mt-[18px] text-[13.5px] text-muted">
          <Link href={routes.login} className="font-bold text-blushd no-underline">
            Back to log in
          </Link>
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="animate-fade text-center">
        <Orb size={74} className="mx-auto mb-6">
          <span
            className="block h-[13px] w-6 -translate-y-[3px] rotate-[-45deg] border-b-[2.4px] border-l-[2.4px] border-white/90"
            aria-hidden="true"
          />
        </Orb>
        <h1 className="mb-[14px] font-serif text-[30px] leading-[1.16] text-ink">
          Your password&apos;s all set.
        </h1>
        <p className="mx-auto mb-[26px] max-w-[340px] text-[15.5px] leading-[1.65] text-muted">
          You can sign in with your new password now. Welcome back — we&apos;re glad you&apos;re here.
        </p>
        <Link href={routes.login} className={buttonVariants({ size: "lg", fullWidth: true })}>
          Continue to log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-3 font-serif text-[33px] leading-[1.12] text-ink">
        Set a new password
      </h1>
      <p className="mb-[26px] text-[15.5px] leading-[1.6] text-muted">
        Choose something only you would know. Once it&apos;s set, you can sign right back in.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]">
        <Field
          label="New password"
          htmlFor="newPassword"
          hint="At least 8 characters."
          error={errors.newPassword?.message}
        >
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            hasError={!!errors.newPassword}
            {...field("newPassword")}
          />
        </Field>
        <Field
          label="Confirm new password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            hasError={!!errors.confirmPassword}
            {...field("confirmPassword")}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-1"
          isLoading={reset.isPending}
          loadingText="Saving…"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
}
