"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterValues } from "@/lib/validation/auth";
import { useRegister } from "@/lib/hooks/useAuthMutations";
import { useGoogleSignIn } from "@/lib/hooks/useGoogleSignIn";
import { getErrorStatus, isGoogleAccountError } from "@/lib/utils/apiError";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { Divider } from "@/components/ui/Divider";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function RegisterForm() {
  const router = useRouter();
  const register = useRegister();
  const google = useGoogleSignIn();

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: RegisterValues) => {
    register.mutate(
      { email: values.email, password: values.password, name: values.name || undefined },
      {
        onSuccess: () =>
          router.push(`${routes.verifyEmail}?email=${encodeURIComponent(values.email)}`),
      },
    );
  };

  // Both "taken" cases return 409; distinguish by message.
  const isConflict = getErrorStatus(register.error) === 409;
  const showGoogleConflict = isConflict && isGoogleAccountError(register.error);
  const showExistsConflict = isConflict && !showGoogleConflict;

  return (
    <div>
      <h1 className="mb-[10px] font-serif text-[33px] leading-[1.1] text-ink">
        Begin together
      </h1>
      <p className="mb-6 text-[15.5px] leading-[1.55] text-muted">
        Create your account, then invite the one you&apos;re here for.
      </p>

      <GoogleButton onClick={google.signIn} isLoading={google.isPending} />
      {google.error && (
        <Alert className="mt-4" variant="error">
          {google.error}
        </Alert>
      )}

      <Divider label="or with email" />

      {showExistsConflict && (
        <Alert className="mb-[18px]" variant="error">
          This email already has an account. Please{" "}
          <Link href={routes.login} className="font-bold text-blushd no-underline">
            log in
          </Link>{" "}
          with the method you used when you first joined.
        </Alert>
      )}
      {showGoogleConflict && (
        <Alert className="mb-[18px]" variant="info" icon={<GoogleIcon />}>
          This email is already set up with Google. Please use{" "}
          <strong className="font-bold">Continue with Google</strong> above to sign in.
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]">
        <Field
          label="Your name"
          htmlFor="name"
          labelRight="Optional"
          error={errors.name?.message}
        >
          <Input id="name" type="text" autoComplete="name" {...field("name")} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            hasError={!!errors.email}
            {...field("email")}
          />
        </Field>
        <Field
          label="Password"
          htmlFor="password"
          hint="At least 8 characters."
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            hasError={!!errors.password}
            {...field("password")}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-[6px]"
          isLoading={register.isPending}
          loadingText="Creating your account…"
        >
          Create account
        </Button>
      </form>

      <p className="mt-[22px] text-center text-[14px] text-muted">
        Already have an account?{" "}
        <Link href={routes.login} className="font-bold text-blushd no-underline">
          Log in
        </Link>
      </p>
      <Disclaimer className="mt-6" />
    </div>
  );
}
