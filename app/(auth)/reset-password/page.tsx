import type { Metadata } from "next";
import { CenteredScreen } from "@/components/layout/CenteredScreen";
import { Logo } from "@/components/ui/Logo";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Set a new password · Worth Fighting For" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return (
    <CenteredScreen maxWidth={400}>
      <Logo size="sm" className="mb-[34px]" />
      <ResetPasswordForm token={first(params.token)} />
    </CenteredScreen>
  );
}
