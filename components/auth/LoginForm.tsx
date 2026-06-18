"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import { useLogin } from "@/lib/hooks/useAuthMutations";
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
import { AuthLegalNote } from "@/components/auth/AuthLegalNote";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const google = useGoogleSignIn();

  const {
    register: field,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginValues) => {
    // Land on /home; the app gates funnel to onboarding/invite as needed.
    login.mutate(values, { onSuccess: () => router.push(routes.home) });
  };

  const status = getErrorStatus(login.error);
  const showBadCredentials = status === 401;
  const showGoogleConflict = status === 409 && isGoogleAccountError(login.error);
  const showUnverified = status === 403;

  return (
    <div>
      <h1 className="mb-[10px] font-serif text-[33px] leading-[1.1] text-ink">
        Welcome back
      </h1>
      <p className="mb-6 text-[15.5px] leading-[1.55] text-muted">
        Log in to return to the two of you.
      </p>

      <GoogleButton onClick={google.signIn} isLoading={google.isPending} />
      {google.error && (
        <Alert className="mt-4" variant="error">
          {google.error}
        </Alert>
      )}

      <Divider label="or with email" />

      {showBadCredentials && (
        <Alert className="mb-[18px]" variant="error">
          That email and password don&apos;t match. Please try again, or{" "}
          <Link href={routes.forgotPassword} className="font-bold text-blushd no-underline">
            reset your password
          </Link>
          .
        </Alert>
      )}
      {showGoogleConflict && (
        <Alert className="mb-[18px]" variant="info" icon={<GoogleIcon />}>
          This email signs in with Google. Please use{" "}
          <strong className="font-bold">Continue with Google</strong> above.
        </Alert>
      )}
      {showUnverified && (
        <div className="mb-[18px] animate-rise rounded-2xl border border-line2 bg-panel p-4">
          <div className="mb-3 text-[14.5px] font-bold text-ink">
            Almost there — confirm your email first
          </div>
          <p className="mb-3 text-[13px] leading-[1.5] text-muted">
            This account hasn&apos;t been verified yet, so it can&apos;t open just yet.
            Let&apos;s finish that step together.
          </p>
          <Button
            size="md"
            fullWidth
            onClick={() =>
              router.push(`${routes.verifyEmail}?email=${encodeURIComponent(getValues("email"))}`)
            }
          >
            Go to email verification
          </Button>
        </div>
      )}

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
        <Field
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
          labelRight={
            <Link href={routes.forgotPassword} className="font-semibold text-blushd no-underline">
              Forgot?
            </Link>
          }
        >
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            hasError={!!errors.password}
            {...field("password")}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-[6px]"
          isLoading={login.isPending}
          loadingText="Logging in…"
        >
          Log in
        </Button>
      </form>

      <p className="mt-[22px] text-center text-[14px] text-muted">
        New here?{" "}
        <Link href={routes.register} className="font-bold text-blushd no-underline">
          Create an account
        </Link>
      </p>
      <AuthLegalNote className="mt-6" />
      <Disclaimer className="mt-3" />
    </div>
  );
}
