"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation/auth";
import { useForgotPassword } from "@/lib/hooks/useAuthMutations";
import { routes } from "@/config/routes";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Orb } from "@/components/ui/Orb";

export function ForgotPasswordForm() {
  const forgot = useForgotPassword();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = ({ email }: ForgotPasswordValues) => {
    forgot.mutate(email, { onSuccess: () => setSentTo(email) });
  };

  // Generic confirmation (we never reveal whether the account exists).
  if (sentTo) {
    return (
      <div className="animate-fade text-center">
        <Orb size={74} className="mx-auto mb-6" />
        <h1 className="mb-[14px] font-serif text-[30px] leading-[1.16] text-ink">
          Check your inbox.
        </h1>
        <p className="mx-auto mb-[26px] max-w-[360px] text-[15.5px] leading-[1.65] text-muted">
          If an account exists for <strong className="text-ink">{sentTo}</strong>, we&apos;ve
          just sent a link to reset your password. It can take a minute or two — and sometimes
          hides in spam.
        </p>
        <Link href={routes.login} className={buttonVariants({ size: "lg", fullWidth: true })}>
          Back to log in
        </Link>
        <p className="mt-[18px] text-[13.5px] text-muted">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="cursor-pointer font-bold text-blushd"
          >
            Try another email
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-3 font-serif text-[33px] leading-[1.12] text-ink">
        Forgot your password?
      </h1>
      <p className="mb-[26px] text-[15.5px] leading-[1.6] text-muted">
        It happens. Enter the email you use to sign in and we&apos;ll send a link to set a new one.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            hasError={!!errors.email}
            {...field("email")}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-1"
          isLoading={forgot.isPending}
          loadingText="Sending…"
        >
          Send reset link
        </Button>
      </form>

      <p className="mt-[22px] text-center text-[14px] text-muted">
        <Link href={routes.login} className="font-bold text-blushd no-underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
