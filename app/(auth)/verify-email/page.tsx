import type { Metadata } from "next";
import { CenteredScreen } from "@/components/layout/CenteredScreen";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = { title: "Verify your email · Worth Fighting For" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  return (
    <CenteredScreen background="blush" maxWidth={440}>
      <VerifyEmailForm email={first(params.email)} token={first(params.token)} />
    </CenteredScreen>
  );
}
